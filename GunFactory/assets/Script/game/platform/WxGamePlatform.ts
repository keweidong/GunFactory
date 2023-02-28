import App from "../../core/App";
import Toast from "../../core/utils/Toast";
import { AdType } from "../module/AD/ADController";
import { AdEvent, AdState } from "../module/AD/ADManageBase";
import PlatformBase, { LoginDataSaveKey, LoginResult, ShareParms } from "./PlatformBase";




// https://suvadmin.gzqidong.cn/Interface/
export default class WxGamePlatform extends PlatformBase {
    protected _launchOptions: wx.OnShowResultParams;
    public appid: string = "wxdfbc1a2fff9e71e6";//极限越野

    protected systemInfo: wx.SystemInfoSync;

    private isLaunch: boolean = true;
    protected isShare: boolean = false;
    protected isShareSuccess: boolean = false;
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
        this._launchOptions = wx.getLaunchOptionsSync();
        this.systemInfo = wx.getSystemInfoSync();
        wx.onShow(this.wxGameOnShow.bind(this));
    }
    /**
    * 初始化广告
    */
    public initAd() {
        super.initAd();
        let obj = new WxgameVideo(App.ConfigManager.gameConf.WXadUnitId || "adunit-19b3efc159047992");
        this._videoManage.setAdObj(obj);
    }
    /**
     * 同步存档数据
     */
    // public async syncData() {
    // let gameDataMsr = App.GameDataMsr;
    // try {
    //     let playerInfo = gameDataMsr.playerInfo;
    //     //如果玩家数据没有账号信息,说明本地没有存档
    //     if (!playerInfo.id) {
    //         Log.trace("获取登陆信息")
    //         //获取登陆信息
    //         let loginInfo = await this.login();
    //         playerInfo.account = this.loginInfo.unionid;
    //         Log.trace("向管理后台请求用户数据")
    //         //向管理后台请求存档
    //         let requestData = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/get_user_info.php", { token: loginInfo.loginKey });
    //         let userInfo: {
    //             code: number,
    //             photo: string,
    //             free: string,
    //             playerid: string,
    //             time: number,
    //             timestamp: number,
    //             is_saved: string,
    //             nick: string,
    //             file: string,
    //         } = JSON.parse(requestData);
    //         playerInfo.id = userInfo.playerid;
    //         playerInfo.head = userInfo.photo;
    //         playerInfo.nickName = userInfo.nick;
    //         playerInfo.token = loginInfo.loginKey;
    //         Log.trace("向管理后台请求用户数据成功!!!")
    //         if (userInfo.file) {
    //             Log.trace("同步用户数据")
    //             let syncData = JSON.parse(userInfo.file);
    //             //同步存档数据
    //             App.SaveManage.syncByData(syncData);
    //             //保存本地
    //             App.SaveManage.autoSave();
    //             Log.trace("同步用户数据完毕")
    //         } else {
    //             Log.trace("保存用户数据")
    //             gameDataMsr.savePlayerInfo();
    //         }
    //     }
    // } catch (error) {
    //     //如果没有成功跟管理后台同步数据,那么每隔一段时间跟管理后台尝试同步一次
    //     throw "同步数据失败";
    // } finally {
    //     gameDataMsr.tempData.isSyncDataByServer = true;
    // }

    // }
    /**
     * 小游戏回到前台的事件的回调函数
     */
    protected wxGameOnShow(res: wx.OnShowResultParams) {
        Log.warn("wxGameOnShow")
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
                Toast.launch(App.RandomUtils.randomArray(this.failedTexts))
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
    protected loginWx(): Promise<wx.DefaultResult> {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res);
                },
                fail: () => {
                    reject();
                }
            })
        })
    }

    public getAccountInfoSync() {
        return wx.getAccountInfoSync();
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
            wx.shareAppMessage({
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
        let { code } = await this.loginWx();
        let launchOption = this.getLaunchOptions();
        let senceCode = this.getSenceCode();
        //请求管理后台解析并且返回用户数据
        let resultStr = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/mini_program.php", {
            appid: this.appid,
            code: code,
            upplayerid: launchOption.upplayerid,
            other_appid: launchOption.sourceAppid,
            chl: launchOption.chl,
            scene: senceCode,
        });
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

    isShowDebugUI() {
        // return false;
        // return true;
        return this.systemInfo.enableDebug || this.systemInfo.brand === "devtools";
        // && versionInfo.packVersion.includes("test");
    }
}
class WxgameVideo implements IAdObject {
    /**广告加载完毕调用 */
    onLoadAdComplete: Function = null;
    /**广告加载失败调用 */
    onLoadAdFail: Function = null;
    /**广告展示完毕调用 */
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
    private adVideo: wx.RewardedVideoAd;
    adState: AdState = AdState.none;
    constructor(id: string) {
        this.id = id;
    }
    /**
     * 拉取激励广告成功回调
     */
    private addADLoadSuccessCallBack() {
        this.onLoadAdComplete();
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
        let adVideo = this.adVideo = wx.createRewardedVideoAd({ adUnitId: this.id })
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
