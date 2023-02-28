import App from "../../core/App";
import { ViewConst } from "../consts/ViewConst";
import { AdType } from "../module/AD/ADController";
import { AdEvent, ADManageBase } from "../module/AD/ADManageBase";
import { TIPSTATE } from "../module/GameUI/GameUIConst";
import { NativeBridge } from "./native/NativeBridge";
import RYSDK from "./native/RYSDK/RYSDK";
import { TTRewardVideoAd } from "./native/TTSDK/TTRewardVideoAd";
import TTSDK from "./native/TTSDK/TTSDK";
import NativePlatform from "./NativePlatform";
import { LoginResult, ShareParms } from "./PlatformBase";
import { TopOnRewardVideoAd } from "./native/TopOnSDK/TopOnRewardVideoAd";
import TopOnSDK from "./native/TopOnSDK/TopOnSDK";
import { TopOnInterAd } from "./native/TopOnSDK/TopOnInterAd";


export default class NativeIOSPlatform extends NativePlatform {

    constructor() {
        super();
        Log.trace("初始化原生平台类 当前机型：：", cc.sys.platform);
    }
    init() {
        super.init();
        // App.ConfigManager.gameConf.serverInfos.interface = "https://foodstreet.gzqidong.cn/Ios";
    }
    /**
     * 退出游戏
     */
    public exitGame() {
        cc.game.end();
    }
    public getAdId() {
        const idMap = {
            cjkg: {
                // 鲸旗广告id
                appid: "5100291",
                rewardId: "945426843",
                fullScreen: ""

                //岂动测试id
                // appid: "5077591",
                // rewardId: "945240376",
                // fullScreen: ""

                // appid: "5036167",
                // rewardId: "936167584",
                // fullScreen: ""
            }

        }
        return idMap[NativeBridge.getChannel()]
    }
    public getTopOnAdId() {
        const idMap = {
            cjkg: {
                // 鲸旗TopOn广告id
                appid: "a5f572b8d09ee7",
                rewardId: "b5f572b9f31c3f",
                fullScreen: ""

                //岂动测试id
                // appid: "5077591",
                // rewardId: "945240376",
                // fullScreen: ""

                // appid: "5036167",
                // rewardId: "936167584",
                // fullScreen: ""
            }

        }
        return idMap[NativeBridge.getChannel()]
    }


    /**
   * 初始化广告
   */
    public initAd() {
        // super.initAd();
        this._videoManage = new ADManageBase();
        // let idObj = this.getAdId();
        // NativeBridge.TTSDK = new TTSDK(idObj.appid);
        NativeBridge.RYSDK = new RYSDK();

        // let obj1 = new TTRewardVideoAd(idObj.rewardId);
        // NativeBridge.TTSDK.rewardVideo = obj1;
        // this._videoManage.setAdObj(obj1);

        this.initTopOnRewardVideoSDK();

        // this.initTTRewardVideoSDK();
    }
    public initTopOnRewardVideoSDK() {
        Log.trace("TOPOn_IOS广告")
        let idObj = this.getTopOnAdId();
        NativeBridge.TopOnSdk = new TopOnSDK(idObj.appid);

        let obj2 = new TopOnRewardVideoAd(idObj.rewardId);
        NativeBridge.TopOnSdk.rewardVideo = obj2;
        this._videoManage.setAdObj(obj2);

        NativeBridge.TopOnSdk.interactionAd = new TopOnInterAd(idObj.InteractionAd);
        NativeBridge.TopOnSdk.interactionAd.init();
    }
    public isAutoShowInteractionAd() {
        return false;
    }
    public initTTRewardVideoSDK() {
        Log.trace("穿山甲广告")
        let idObj = this.getAdId();
        NativeBridge.TTSDK = new TTSDK(idObj.appid);

        let obj1 = new TTRewardVideoAd(idObj.rewardId);
        NativeBridge.TTSDK.rewardVideo = obj1;
        this._videoManage.setAdObj(obj1);
    }

    public getChannel() {
        return NativeBridge.getChannel();
    }
    public async syncData() {
        let func = () => {
            return new Promise((resolve: any, reject: Function) => {
                App.ViewManager.open(ViewConst.TipView, {
                    curState: TIPSTATE.SURE,
                    leftBtnText: "确定",
                    leftFunc: () => {
                        resolve();
                    },
                    leftThisObj: this,
                    tipsStr: `登陆游戏失败,请检查网络后,重新尝试!`,
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
    async login(): Promise<LoginResult> {///huoq
        return this.tourist();
    }
    public getPackVersion() {
        return versionInfo.packVersion;
    }
    public getVersionStr(): string {
        return `v ${versionInfo.packVersion}_${versionInfo.version}`;
    }

    public syncDataCallBack() {
        cc.log("热云统计");
        this.reYunNewUser();
        // try {
        //     NativeBridge.TTSDK.requestPermissionIfNecessary();
        // } catch (error) {
        //     Log.trace("错误", error);
        // }
    }

    public showInteractionAd() {
        if (NativeBridge.TTSDK.interactionAd) {
            NativeBridge.TTSDK.interactionAd.show();

        }
        if (NativeBridge.TopOnSdk.interactionAd) {
            NativeBridge.TopOnSdk.interactionAd.show();

        }

    }
    //热云统计注册
    public reYunNewUser() {
        if (NativeBridge.RYSDK) {
            NativeBridge.RYSDK.newUser();
            NativeBridge.RYSDK.register();
        }
    }
    /**
     * 检查是否是刘海屏
     */
    public checkIsNotch() {
        return NativeBridge.checkNotch();
    }
}