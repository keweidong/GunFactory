import App from "../../core/App";
import LayerManager from "../LayerManager";
import { AdType } from "../module/AD/ADController";
import { AdEvent, AdState } from "../module/AD/ADManageBase";
import PlatformBase, { LoginResult, ShareParms } from "./PlatformBase";

export default class DebugPlatform extends PlatformBase {

    protected expressAdNode: cc.Node = null;
    constructor() {
        super();
        if (typeof window["versionInfo"] === "undefined") {
            window["versionInfo"] = {
                /**
                 * 资源版本
                 */
                version: "",
                /**
                 * 包体版本
                */
                packVersion: "wencong"
                // packVersion: "operateTest"
            };
        }
        // if (this.isGetRemoteRes() && CC_DEV) {

        // }
    }
    init() {
        Log.trace("平台为3---------", cc.sys.platform);
        // App.ConfigManager.gameConf.serverInfos.interface = "http://192.168.0.200/suvapi";
        App.ConfigManager.gameConf.serverInfos.interface = "https://skewer.gzqidong.cn/App";
    }

    /**
    * 是否允许自动弹出插屏广告
    */
    public isAutoShowInteractionAd() {
        return false;
    }

    /**
  * 展示插屏广告
  */
    public async showInteractionAd() {
        if (!this.expressAdNode) {
            let node = this.expressAdNode = new cc.Node();
            node.width = cc.winSize.width;
            node.height = cc.winSize.height;
            // node.width = node.height = 350;
            let width = 350;
            // node.color = cc.Color.RED;
            LayerManager.getLayer(LayerManager.UI_Guide).addChild(this.expressAdNode);
            let sprite = node.addComponent(cc.Graphics);
            sprite.fillColor = cc.color(0, 0, 0, 150);
            sprite.fillRect(-cc.winSize.width / 2, -cc.winSize.height / 2, cc.winSize.width, cc.winSize.height);
            sprite.fillColor = cc.Color.RED;
            sprite.fillRect(-width / 2, -width / 2, width, width);
            let labelNode = new cc.Node();
            labelNode.addComponent(cc.Label);
            node.addChild(labelNode);
            labelNode.color = cc.Color.YELLOW;
            labelNode.x = 200;
            labelNode.y = 200;
            this.expressAdNode.addComponent(cc.BlockInputEvents)

            // sprite.spriteFrame = await App.ResManager.getResAsync("Texture/game/GukeEveent/baidi", cc.SpriteFrame);
        }
        let index = 5;
        const lab = this.expressAdNode.getComponentInChildren(cc.Label);
        lab.string = index-- + "";
        App.TimerManager.doTimer(1000, 5, () => {
            lab.string = index-- + "";
        }, this, () => {
            this.expressAdNode.active = false;
        });
        this.expressAdNode.active = true;
    }
    getAdState(): any {
        return AdState.success;
    }
    public showAD(adType?: AdType, extraParam?: any) {
        App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
            code: 0
        }, true);
    }
    public isGetRemoteRes() {
        // return CC_BUILD;
        // return true;
        return false
    }
    // public async syncData() {
    //     let gameDataMsr = App.GameDataMsr;
    //     gameDataMsr.tempData.isSyncDataByServer = true;
    //     return true;
    // }
    /**
    * 是否允许分享
    */
    public isCanShare() {
        return true;
    }
    public share(type: AdType, shareInfo: ShareParms) {
        App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, {
            code: 0
        }, true);
    }
    login(): Promise<LoginResult> {///huoq
        return this.tourist();
    }

}