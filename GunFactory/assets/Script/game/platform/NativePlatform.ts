import App from "../../core/App";
import { GameText } from "../../core/lang/GameText";
import Toast from "../../core/utils/Toast";
import { NotificationConst } from "../consts/NotificationConst";
import { ViewConst } from "../consts/ViewConst";
import { GameDataSaveKey } from "../GameDataMsr";
import { AdType } from "../module/AD/ADController";
import { AdEvent } from "../module/AD/ADManageBase";
import { TIPSTATE } from "../module/GameUI/GameUIConst";
import { NativeBridge } from "./native/NativeBridge";
import RYSDK from "./native/RYSDK/RYSDK";
import { TTInteractionExpressAd } from "./native/TTSDK/TTInteractionExpressAd";
import { TTRewardVideoAd } from "./native/TTSDK/TTRewardVideoAd";
import TTSDK from "./native/TTSDK/TTSDK";
import WXSDK from "./native/WXSDK/WXSDK";
import PlatformBase, { LoginDataSaveKey, LoginResult, ShareParms } from "./PlatformBase";


export default class NativePlatform extends PlatformBase {

    /**
     *
     */
    constructor() {
        super();
        NativeBridge.RYSDK = new RYSDK();
        // versionInfo.packVersion = "wencong";
    }
    init() {
        super.init();

        // Log.trace("平台为1---------", cc.sys.platform);
        // if (cc.sys.platform == cc.sys.ANDROID) {
        //     //测试
        //     // App.ConfigManager.gameConf.serverInfos.interface = "http://192.168.0.200/suvapi";
        // } else {
        //     App.ConfigManager.gameConf.serverInfos.interface = "https://foodstreet.gzqidong.cn/Ios";
        // }
        //    App.ConfigManager.gameConf.serverInfos.interface = "https://www.gzqidong.cn/smallgame";
    }
    /**
     * 退出游戏
     */
    public exitGame() {
        cc.game.end();
    }
    // public isGetRemoteRes() {
    //     // return CC_BUILD;
    //     return true;
    // }
    public getAdId(): {
        appid: string,
        rewardId: string,
        fullScreen: string;
        InteractionAd: string;
    } {
        const idMap = {
            default: {
                appid: "5078305",
                rewardId: "945245399",
                fullScreen: "943766663",
                banner: "936167655",
                expressAd: "945085880",
                InteractionAd: "945279331",
            },
            bbqgame3: {
                appid: "5078305",
                rewardId: "945369892",
                fullScreen: "943766663",
                banner: "936167655",
                expressAd: "945085880",
                InteractionAd: "945279331",
            }
            // ,
            // cjkg2: {
            //     appid: "5043038",
            //     rewardId: "942652428",
            //     fullScreen: "943998703"
            // },
            // cjkg3: {
            //     appid: "5045241",
            //     rewardId: "945009147",
            //     fullScreen: "945053444"
            // }

        }
        return idMap[NativeBridge.getChannel()] || idMap.default
    }
    public setEvent(eventName: string) {
        if (NativeBridge.RYSDK) {
            NativeBridge.RYSDK.setEvent(eventName);
        }
    }
    /**
    * 是否允许自动弹出插屏广告
    */
    public isAutoShowInteractionAd() {
        return NativeBridge.isAutoShowInteractionAd();
    }
    // getAdState(): any {
    //     return AdState.fail;
    // }
    /**
     * 初始化广告
     */
    public initAd() {
        super.initAd();

        let idObj = this.getAdId();
        //NativeBridge.TTSDK = new TTSDK("5036167");
        //微信
        NativeBridge.WXSDK = new WXSDK();
        NativeBridge.TTSDK = new TTSDK(idObj.appid);
        let obj1 = new TTRewardVideoAd(idObj.rewardId);
        NativeBridge.TTSDK.rewardVideo = obj1;
        this._videoManage.setAdObj(obj1);

        NativeBridge.TTSDK.interactionAd = new TTInteractionExpressAd(idObj.InteractionAd);
        NativeBridge.TTSDK.interactionAd.init();
        // InteractionAd
    }
    public showInteractionAd() {
        if (NativeBridge.TTSDK.interactionAd) {
            NativeBridge.TTSDK.interactionAd.show();

        }
    }
    // getAdState(): any {
    //     return AdState.success;
    // }
    // public showAD(adType?: AdType, extraParam?: any) {
    //     App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
    //         code: 0
    //     }, true);
    // }
    public getChannel() {
        return NativeBridge.getChannel();
    }
    public async syncData() {
        let func = () => {
            return new Promise((resolve: any, reject: Function) => {
                App.ViewManager.open(ViewConst.TipView, {
                    curState: TIPSTATE.SURE,
                    leftBtnText: GameText.getText(lang.common_sure),//"确定",
                    leftFunc: () => {
                        resolve();
                    },
                    leftThisObj: this,
                    tipsStr: GameText.getText(lang.common_login_fail_tip),//`登陆游戏失败,请检查网络后,重新尝试!`,
                } as COMMON_BOX);
            });
        }
        do {
            let result = await super.syncData();
            if (result) {
                return true;
            } else {
                await func();
            }
        } while (true);
    }

    public share(type: AdType, shareInfo: ShareParms) {
        Log.trace("原生平台类分享");
        App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
            code: 0
        }, true);
    }

    /**
    * 是否允许分享
    */
    public isCanShare() {
        return false;//不允许分享
    }
    // async login(): Promise<LoginResult> {///huoq
    //     // return this.tourist();
    //     if (this.loginInfo.token) {//如果本地缓存有登陆信息,直接用本地的
    //         return Promise.resolve({ code: 0, loginKey: this.loginInfo.token });
    //     }
    //     let result = await this.wxLogin();
    //     if (result) {
    //         return { code: 0, loginKey: this.loginInfo.token }
    //     } else {
    //         throw "微信登陆失败";
    //     }
    // }
    public getPackVersion() {
        return versionInfo.packVersion;
    }


    public syncDataCallBack() {
        cc.log("热云统计");
        this.reYunNewUser();
        try {
            NativeBridge.TTSDK.requestPermissionIfNecessary();
        } catch (error) {

        }
    }

    //热云统计注册
    public reYunNewUser() {
        if (NativeBridge.RYSDK) {
            NativeBridge.RYSDK.newUser();
            NativeBridge.RYSDK.register();
        }
    }
    public checkIsNotch() {
        return NativeBridge.checkNotch();
    }

    /**
     * 震动
     * @param time 多少毫秒
     */
    public vibrator(time: number = 1000) {
        NativeBridge.vibrator(time);
    }
    //强制广告
    public showCompelAD(adIndex?: number, adType?: AdType, extraParam?: any) {
        // this.compelADVideoManage.show();
    }

    public async isWXLogin() {
        Log.trace("检测是否微信授权>>>>>>>>>>>>>>>>>>>>>")
        if (this.loginInfo.isRegist) {
            Log.trace("已经微信授权")
            return true;
        } else {
            ///let result = 
            Log.trace("微信正在授权")
            let result = await this.wxLogin();
            Log.trace("微信授权结果", result);
            if (result) {
                // App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_LEFTPOPUP_HEAD, App.GameDataMsr.playerInfo.nickName, App.GameDataMsr.playerInfo.head, App.GameDataMsr.playerInfo.id);
                this.loginInfo.isRegist = true;
                Log.trace("微信授权成功")
                return true;
            } else {
                Log.trace("微信授权失败")
                this.loginInfo.isRegist = false;
                return false;
            }
        }
    }
    login(): Promise<LoginResult> {///huoq
        return this.tourist();
    }
    public async wxLogin() {
        let isWXAppInstalled = await NativeBridge.WXSDK.isWXAppInstalled();
        Log.trace("是否安装微信isWXAppInstalled:", isWXAppInstalled);
        if (isWXAppInstalled) {
            let sdkLoginResultStr: string = await NativeBridge.WXSDK.callSync("wxLogin");
            Log.trace("QD_DEBUG", "微信登录返回结果", sdkLoginResultStr);
            let sdkLoginResult: {
                result: number;
                code: string;
            } = JSON.parse(sdkLoginResultStr);
            Log.trace("微信返回结果:");
            if (sdkLoginResult.result == 0) {
                let chl = this.getChannel();
                Log.trace("QD_DEBUG", "微信注册渠道", chl);
                let upplayerid = "";
                let loginUrl = App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/App_Login.php";
                let resultStr = await App.Http.requestAsync(loginUrl, {//获得到code后去将code发送到管理后台获取用户数据
                    code: sdkLoginResult.code,
                    appid: NativeBridge.WXSDK.appId,
                    chl: chl,
                    serverid: App.ConfigManager.gameConf.serverInfos.serverid,
                    upplayerid: upplayerid,
                    bind_from_unionid: this.loginInfo.unionid,
                    bind_use_current: 0
                });
                Log.trace("微信注册返回结果result", resultStr);
                let result: {
                    code: number;
                    openid: string;
                    unionid: string;
                    nick: string;
                    headimgurl: string;
                    sex: number;
                    playerid: number;
                    serverid: string;
                    type: number;
                    token: string
                } = JSON.parse(resultStr);
                let playerInfo = App.GameDataMsr.playerInfo;
                if (result.code === 0) {
                    this.loginInfo.playerid = result.playerid;
                    this.loginInfo.token = result.token;
                    playerInfo.account = result.unionid;
                    // Log.warn("微信结果数据", "App.StringUtil.atob(result.nick):", App.StringUtil.atob(result.nick));
                    //playerInfo.nickName = App.StringUtil.utf8ToUtf16(App.StringUtil.atob(result.nick));
                    playerInfo.nickName = result.nick;
                    playerInfo.head = result.headimgurl;
                    playerInfo.id = result.playerid.toString();
                    playerInfo.token = result.token;
                    this.loginInfo.unionid = result.unionid;
                    this.loginInfo.isRegist = true;
                    App.SaveManage.save(LoginDataSaveKey.loginCache);
                    App.SaveManage.save(GameDataSaveKey.PLAYER_INFO);
                    //防止没有读到
                    // if (!playerInfo.nickName) {
                    //     Toast.launch("未读取到信息，请重新尝试");
                    //     return false;
                    // }
                    Log.warn("微信登录成功----读取到头像和名字");
                    //设置左侧弹窗和主界面头像和名字

                    //Log.warn("微信登录成功-----设置头像和名字");
                    //设置主界面
                    App.NotificationCenter.dispatch(NotificationConst.UPDATE_USER_INFO);
                    return true;
                } else {
                    Log.warn("微信登录失败-----设置");
                    Toast.launch("微信登录失败!请重新尝试！");
                    return false;
                    // return { code: result.code, loginKey: null };
                }
            } else {
                Log.trace("微信登录失败");
                Toast.launch("微信登录失败！请重新尝试！");
                return false;
            }
        } else {
            Log.warn("游客登录")
            // Toast.launch("未安装微信，请安装微信后重新登录！");
            return false;
        }
    }


}