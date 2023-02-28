import PlatformBase, { LoginResult, LoginDataSaveKey, ShareParms } from "./PlatformBase";
import App from "../../core/App";
import { AdState, AdEvent } from "../module/AD/ADManageBase";
import { AdType } from "../module/AD/ADController";
// https://suvadmin.gzqidong.cn/Interface/
export default class oppoGamePlatform extends PlatformBase {
    //protected _launchOptions: wx.OnShowResultParams;
    public appid: string = "30318723";//
    // public gamename: string = "com.gzqidong.bbqgame.nearme.gamecenter";//游戏包名
    public gamename: string = "com.gzqidong.bbqgame";
    // public appid: string = "wx8375ef0fa411d523";//过山车

    protected isShare: boolean = false;
    protected isShareSuccess: boolean = false;

    constructor() {
        super();
        //this._launchOptions = wx.getLaunchOptionsSync();
        //wx.onShow(this.wxGameOnShow.bind(this));
    }
    /**
     * 
    * 初始化广告
    */
    public initAd() {
        super.initAd();
        let obj = new oppoGameVideo(App.ConfigManager.gameConf.WXadUnitId || "217013");
        this._videoManage.setAdObj(obj);
    }


    protected loginOppo(): Promise<qg.DefaultResult> {
        return new Promise((resolve, reject) => {
            qg.login({
                pkgName: this.gamename,
                success: (res) => {
                    console.log("登入游戏成功", res);
                    resolve(res);
                },
                fail: (res) => {
                    console.log("登入游戏失败", res);
                    reject(res);
                },
                complete: () => {
                    console.log("登录游戏complete");
                },
            })
        })
    }
    /**
         * 震动
         * @param time 多少毫秒
         */
    public vibrator(time: number = 1000) {
        qg.vibrateLong(
            {
                success: (res) => {
                    console.log("游戏震动成功", res);

                },
                fail: (res) => {
                    console.log("游戏震动失败", res);

                },
                complete: () => {
                    console.log("游戏震动");
                },
            }
        );
    }
    /*public getAccountInfoSync(){
        return wx.getAccountInfoSync();
    }*/
    /**
      * 获取场景值
      */
    /*public getSenceCode() {
        let startData = this._launchOptions;
        if (startData.scene != null || startData.scene != undefined) {
            return startData.scene;
        } else {
            return -1;
        }
    }*/

    public getLaunchOptions() {
        console.log("getLaunchOptions");
        let launchOption = qg.getLaunchOptionsSync;
        let chl: string;
        let serverid: string;
        let upplayerid: string;
        let sourceAppid: string = "";
        let shareid: number = 0;
        if (launchOption && launchOption["chl"]) {
            chl = launchOption["chl"] ? launchOption["chl"] : App.ConfigManager.gameConf.channel;
            serverid = launchOption["serverid"] ? launchOption["serverid"] : App.ConfigManager.gameConf.serverInfos.serverid;
            upplayerid = launchOption["playerid"] ? launchOption["playerid"] : "";
            shareid = launchOption["shareType"] ? launchOption["shareType"] : 0;
            return { chl, serverid, upplayerid, sourceAppid, shareid };//, share_img_id 
        }
        chl = App.ConfigManager.gameConf.channel;
        serverid = App.ConfigManager.gameConf.serverInfos.serverid;
        return { chl, serverid, upplayerid, sourceAppid, shareid };//, share_img_id 
    }
    async login(): Promise<LoginResult> {
        if (this.loginInfo.token) {//如果本地缓存有登陆信息,直接用本地的
            return Promise.resolve({ code: 0, loginKey: this.loginInfo.token });
        }
        let { uid, nickName, sex, avatar } = await this.loginOppo();
        let launchOption = this.getLaunchOptions();
        let phoneNum = "";
        //let senceCode = this.getSenceCode();
        //请求管理后台解析并且返回用户数据
        let resultStr = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/oppo.php", {
            serverid: launchOption.serverid,
            appid: this.appid,
            openid: uid,
            nick: nickName,
            sex: sex,
            headimgurl: avatar,
            upplayerid: launchOption.upplayerid,
            other_appid: launchOption.sourceAppid,
            chl: launchOption.chl,
            phoneNum: phoneNum,
            //scene: senceCode,
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

    /*public getUserInfo()
    {
        // 查看是否授权
        tt.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称")
                  tt.getUserInfo({
                       success: function(res) {
                       console.log(res.userInfo)
                       return res;
                    }
                  })
                }
              }
            })
        }
        bindGetUserInfo (e) {
        console.log(e.detail.userInfo)
    }*/
    protected getUserInfo(): Promise<tt.GetUserInfoResult> {
        return new Promise((resolve, reject) => {
            tt.getUserInfo({
                withCredentials: true,
                lang: "zh_CN",
                success: (res) => {
                    Log.trace("getUserInfo成功信息", res);
                    resolve(res);
                },
                fail: () => {
                    Log.trace("getUserInfo失败!", reject);
                    // reject();
                    resolve();
                }
            });

        })
    }
    public share(type: AdType, shareInfo: ShareParms) {
        Log.trace("oppo平台类分享");
        App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
            code: 0
        }, true);
    }
}
class oppoGameVideo implements IAdObject {
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
    /**oppo视频广告缓存*/
    // private insertAD: qg.BannerAd;
    /**
     * 广告id
     */
    protected id: string;
    /**
     * OPPO插屏广告id
     */
    // protected oppoADId: string;
    /**
     * 微信视频广告缓存
     */
    private adVideo: qg.VideoAd;
    adState: AdState = AdState.none;
    constructor(id: string, oppoadid?: string) {
        this.id = id;
        // this.oppoADId = oppoadid;
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
        // this.initInsertAD();
    }

    /**
     * 初始化广告组件相关功能
     * 此方法请勿重复调用!!!
     */
    public initAd() {
        Log.trace("adUnitId:", this.id)
        let adVideo = this.adVideo = qg.createRewardedVideoAd({ adUnitId: this.id })
        adVideo.onLoad(this.addADLoadSuccessCallBack.bind(this));
        adVideo.onError(this.addADloadFailCallBack.bind(this));
        adVideo.onClose(this.addADCloesCallBack.bind(this));
        this.adState = AdState.loading;
    }

    /**
     * 初始化插屏广告组件相关功能
     * 此方法请勿重复调用!!!
     */
    protected initInsertAD() {
        // Log.trace("初始化插屏广告组件相关功能1" + this.oppoADId);
        // let insertAD = this.insertAD = qg.createBannerAd({
        //     adUnitId: this.oppoADId, style: {
        //         left: 128,
        //         top: 128,
        //         width: 128,
        //         height: 128,
        //     }
        // })
        // insertAD.onLoad(this.insertADLoadSuccessCallBack.bind(this));
        // insertAD.onError(this.insertADloadFailCallBack.bind(this));
        // //insertAD.onShow(this.insertADloadrewaredCallBack.bind(this));
    }

    /**
     * 拉取插屏广告成功回调
     */
    private insertADLoadSuccessCallBack() {
        Log.trace("拉取插屏广告成功!!!");
    }
    /**
     * 拉取插屏广告失败回调
     */
    private insertADloadFailCallBack(error) {
        // this.insertAD.onLoad(function () {
        //     Log.trace("拉取插屏广告失败!!!", error);
        // });
    }

    /**
     * 显示插屏广告
     */
    public showInsertAD() {
        // if (this.insertAD) {
        //     Log.trace("显示插屏广告");
        //     this.insertAD.show();
        // }
        // else {

        // }
    }

    /**
     * 拉取插屏广告发放奖励回调
     */
    private insertADloadrewaredCallBack() {
        Log.trace("插屏广告发放奖励");
    }

    /**
     * 加载广告
     */
    public load() {
        Log.trace("加载广告")
        return this.adVideo.load();
    }
    /**
     * 播放广告
     */
    public show() {
        return this.adVideo.show();
    }
}