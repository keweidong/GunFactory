import PlatformBase, { LoginResult, LoginDataSaveKey, ShareParms } from "./PlatformBase";
import App from "../../core/App";
import { AdEvent, AdState } from "../module/AD/ADManageBase";
import { AdType } from "../module/AD/ADController";
import Toast from '../../core/utils/Toast';
import { ViewConst } from "../consts/ViewConst";
import { ControllerConst } from "../consts/ControllerConst";
import { GameRecorderConst } from "../module/ToutiaoGameRecorder/GameRecorderConst"
import WorldScene from "../module/GameMain/object/scene/WorldScene"
import { GameConst } from "../module/GameMain/GameConst"
import GameUIController from "../module/GameUI/GameUIController";
import { GameUIConst } from "../module/GameUI/GameUIConst";
import { NotificationConst } from "../consts/NotificationConst";
import { CostType } from "../module/bag/BagController";

// https://suvadmin.gzqidong.cn/Interface/
export default class qqGamePlatform extends PlatformBase {
    protected _launchOptions: qq.OnShowResultParams;
    public appid: string = "1110760668";//烧烤

    private isLaunch: boolean = true;
    protected isShare: boolean = false;
    protected isShareSuccess: boolean = false;
    public world: WorldScene;
    /** 分享失败文案 */
    protected failedTexts = [
        "奖励获取失败，请分享到不同好友试试",
        "奖励获取失败，请分享到不同的群试试",
        "奖励获取失败，请分享到群试试"
    ];
    /** 增加分享时间在多少秒前完成会失效 */
    protected lastShareTime: number = -1;
    /**
     *
     */
    constructor() {
        super();
        this._launchOptions = qq.getLaunchOptionsSync();
        qq.onShow(this.qqGameOnShow.bind(this));
        this.LightingFrom();

    }
    /**
     * 
    * 初始化广告
    */
    public initAd() {
        super.initAd();
        if (qq.getSystemInfoSync().platform == "devtools") {
            // App.ViewManager.open(ViewConst.DebugUI)
            Log.trace("QQ开发者工具");
            return;
        }
        let obj = new qqGameVideo(App.ConfigManager.gameConf.WXadUnitId || "9ee3a8ac1d96ac638d318410d48edd1c");
        this._videoManage.setAdObj(obj);
    }


    /**
     * 小游戏回到前台的事件的回调函数
     */
    protected qqGameOnShow(res: qq.OnShowResultParams) {
        this._launchOptions = res;
        this.isLaunch = false;
        if (this.isShare) {//是不是分享回来
            if (this.checkRandom()) {
                App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
                    code: 0
                }, true);
            } else {
                App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
                    code: 1
                }, true);
                Toast.launch(App.RandomUtils.randomArray(this.failedTexts), 1)
            }
        }
        this.isShareSuccess = this.isShare = false;
    }
    /** 60%的成功率 */
    public checkRandom() {
        let random = Math.random();
        Log.warn("分享成功概率:", random, random > 0.4);
        return random > 0.4;
    }
    protected loginQQ(): Promise<qq.DefaultResult> {
        Log.trace("QQ登录1");
        return new Promise((resolve, reject) => {
            qq.login({
                success: (res) => {
                    Log.trace("qq登陆成功", res);
                    resolve(res);
                },
                fail: (res) => {
                    Log.trace("qq登陆成功", res);
                    reject();
                }
            })
        })
    }

    public getAccountInfoSync() {
        return qq.getAccountInfoSync();
    }
    /**
      * 获取场景值
      */
    public getSenceCode() {
        let startData = this._launchOptions;
        if (startData.scene != null || startData.scene != undefined) {
            return startData.scene;
        } else {
            return -1;
        }
    }

    public checkIsNotch() {
        // let windowSize = cc.view.getVisibleSize();
        // cc.log("width=" + windowSize.width + ",height=" + windowSize.height);;
        let windowSize = cc.winSize;//推荐  原因  短
        cc.log("屏幕width=" + windowSize.width + ",height=" + windowSize.height);
        if (windowSize.height / windowSize.width >= 2) {
            return true;
        }
        return false;
    }
    /**
     * 主动拉起微信小游戏的分享
     * @param {ShareParms} shareInfo 分享参数
     */
    public share(type: AdType, shareInfo: ShareParms) {
        // this.shareType = type;
        return new Promise((resolve, reject) => {
            this.isShareSuccess = this.isShare = true;
            let queryStr: string = "";
            for (let key in shareInfo.paramList) {
                queryStr += key + "=" + shareInfo.paramList[key] + "&";
            }
            //去掉结尾多余的一个"&"
            queryStr = queryStr.substr(0, queryStr.length - 1);
            this.lastShareTime = Date.now();
            let imageUrl = ''
            if (shareInfo.url.indexOf('http') == -1) {
                imageUrl = App.ConfigManager.gameConf.serverInfos.interface + "/" + shareInfo.url;
            } else {
                imageUrl = shareInfo.url;
            }
            qq.shareAppMessage({
                title: shareInfo.title,
                imageUrl: imageUrl,
                query: queryStr,
            });
        })
    }

    public getLaunchOptions() {
        let launchOption = this._launchOptions;
        let chl: string;
        let serverid: string;
        let upplayerid: string;
        let sourceAppid: string = "";
        let shareid: number = 0;
        if (launchOption.query && launchOption.query["chl"]) {
            let query = launchOption.query;
            chl = query["chl"] ? query["chl"] : App.ConfigManager.gameConf.channel;
            serverid = query["serverid"] ? query["serverid"] : App.ConfigManager.gameConf.serverInfos.serverid;
            upplayerid = query["playerid"] ? query["playerid"] : "";
            shareid = query["shareType"] ? query["shareType"] : 0;
            return { chl, serverid, upplayerid, sourceAppid, shareid };//, share_img_id 
        } else if (launchOption.referrerInfo && launchOption.referrerInfo.appId) {
            sourceAppid = launchOption.referrerInfo.appId;
        }
        chl = App.ConfigManager.gameConf.channel;
        serverid = App.ConfigManager.gameConf.serverInfos.serverid;
        // upplayerid = "";
        return { chl, serverid, upplayerid, sourceAppid, shareid };//, share_img_id 
    }
    async login(): Promise<LoginResult> {
        if (this.loginInfo.token) {//如果本地缓存有登陆信息,直接用本地的
            return Promise.resolve({ code: 0, loginKey: this.loginInfo.token });
        }
        let { code } = await this.loginQQ();
        let launchOption = this.getLaunchOptions();
        let senceCode = this.getSenceCode();
        //请求管理后台解析并且返回用户数据
        Log.trace(">>>>>>>>>>>>>>>login");
        let resultStr = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/qq_mini.php", {
            serverid: launchOption.serverid,
            appid: this.appid,
            code: code,
            upplayerid: launchOption.upplayerid,
            other_appid: launchOption.sourceAppid,
            chl: launchOption.chl,
            scene: senceCode,
            encryptedData: "",
            iv: "",
            platform: 1,
            rawData: "",
            signature: ""
        });
        Log.trace(">>>>>>>>>>>>>>>", App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/qq_mini.php");
        Log.trace(">>>>>>>>>>>>>>>", resultStr);
        let result: {
            unionid: string;
            playerid: number;
            token: string;
            code: number;
            timestamp: number;
        } = JSON.parse(resultStr);
        this.loginInfo.unionid = result.unionid;
        this.loginInfo.playerid = result.playerid;
        this.loginInfo.token = result.token;
        App.SaveManage.save(LoginDataSaveKey.loginCache);
        if (result.code === 0) {
            return { code: result.code, loginKey: result.token }
        } else {
            return { code: result.code, loginKey: null };
        }
    }

    public getUserInfo() {
        // 查看是否授权
        qq.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称")
                    qq.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })
    }

    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    }

    /**屏幕常亮 */
    public LightingFrom() {
        qq.setKeepScreenOn({
            keepScreenOn: true,
        });
    }

    /**分享按钮 */
    public async Stransmit(isTouch?: boolean) {
        let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/share/getShareList.php", {});
        var resultObj = JSON.parse(result);
        qq.shareAppMessage({
            title: resultObj[0].content,
            imageUrl: resultObj[0].sharePic,
            success(res) {
                // Log.trace("分享成功>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res);
                
                // qq.getShareInfo({

                // })
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.UPDATE_SUPER_CASH, isTouch);
            },
        })
        // qq.showShareMenu({
        //     showShareItems: ['qq'/*, 'qzone', 'wechatFriends', 'wechatMoment'*/],
        //     success() {
        //         App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.UPDATE_SUPER_CASH, isTouch);
        //     },
        // })
    }
}






class qqGameVideo implements IAdObject {
    /**广告加载完毕调用 */
    onLoadAdComplete: Function = null;
    /**广告加载失败调用 */
    onLoadAdFail: Function = null;
    /**广告展示完毕调用 */
    // onShowAdComplete: Function = null;
    onShowAdComplete?: (result: {
        /**播放广告结果，code为0表示播放成功 */
        code: number;
    }) => void;
    /**
     * 广告id
     */
    protected id: string;
    /**
     * 微信视频广告缓存
     */
    private adVideo: qq.RewardedVideoAd;
    adState: AdState = AdState.none;
    constructor(id: string) {
        this.id = id;
    }
    /**
     * 拉取激励广告成功回调
     */
    private addADLoadSuccessCallBack() {
        this.onLoadAdComplete();
        App.SoundManager.setEffectVolume(App.SoundManager.getEffectVolume());
        App.SoundManager.setBgVolume(App.SoundManager.getBgVolume());
        // this.dispatchEventWith(ADManage.ADManageBase.LOAD_AD_COMPLETE);
    }
    /**
     * 拉取激励广告失败回调
     */
    private addADloadFailCallBack(error) {
        cc.log("addADloadFailCallBack error", error)
        this.onLoadAdFail(error);
        // this.dispatchEventWith(ADManage.ADManageBase.LOAD_AD_FAIL, false, error);
    }
    /**
     * 给微信的广告组件添加关闭回调
     */
    private addADCloesCallBack(res: { isEnded: boolean }): void {
        let data = {
            code: 1
        }
        //小于 2.1.0 的基础库版本，关闭按钮 是在激励式视频播放结束后才出现，所以触发 onClose 时已经播放结束，onClose 触发时可以认为用户已经看完了广告。
        //大于等于 2.1.0 的基础库版本，关闭按钮 将会常驻.回调函数会传入一个参数 res，res.isEnded 描述广告被关闭时的状态。
        if (res && res.isEnded || res === undefined) {
            data.code = 0;
        }
        this.onShowAdComplete(data)
        // this.dispatchEventWith(ADManage.ADManageBase.SHOW_AD_RESULT, false, data);
    }
    public init() {
        this.initAd();
    }

    public initAd() {
        cc.log("adUnitId:", this.id)
        let adVideo = this.adVideo = qq.createRewardedVideoAd({ adUnitId: this.id })
        adVideo.onLoad(this.addADLoadSuccessCallBack.bind(this));
        adVideo.onError(this.addADloadFailCallBack.bind(this));
        adVideo.onClose(this.addADCloesCallBack.bind(this));
        this.adState = AdState.loading;
    }

    /**
     * 加载广告
     */
    public load() {
        cc.log("加载广告")
        return this.adVideo.load();
    }
    /**
     * 播放广告
     */
    public show() {
        return this.adVideo.show();
    }

}