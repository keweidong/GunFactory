// import WxGamePlatform from './WxGamePlatform';
import DebugPlatform from "./DebugPlatform";
import NativeDebugPlatform from "./NativeDebugPlatform";
import NativeIOSPlatform from "./NativeIOSPlatform";
import NativePlatform from "./NativePlatform";
import oppoGamePlatform from "./oppoGamePlatform";
import PlatformBase from "./PlatformBase";
import qqGamePlatform from './qqGamePlatform';
import ToutiaoGamePlatform from './ToutiaoGamePlatform';
import WxGamePlatform from "./WxGamePlatform";

const { ccclass, property } = cc._decorator;
export namespace Platform {
    export let instance: PlatformBase;
    export function init() {
        cc.log("Platform:", cc.sys.platform, cc.sys.os);
        Log.trace("获取到平台为: " + cc.sys.platform);
        // cc.log("cc.sys.DESKTOP_BROWSER::",cc.sys.DESKTOP_BROWSER);
        // cc.log("cc.sys.EDITOR_PAGE::",cc.sys.EDITOR_PAGE);
        // cc.log("cc.sys.MOBILE_BROWSER::",cc.sys.MOBILE_BROWSER);
        // cc.log("cc.sys.WECHAT_GAME::",cc.sys.WECHAT_GAME);
        // cc.log("cc.sys.ANDROID::",cc.sys.ANDROID);
        // cc.log("cc.sys.MACOS::",cc.sys.MACOS);
        switch (cc.sys.platform) {
            case cc.sys.EDITOR_PAGE://
            case cc.sys.DESKTOP_BROWSER://
            case cc.sys.MOBILE_BROWSER://
                instance = new DebugPlatform();
                break;
            case cc.sys.WECHAT_GAME://微信小游戏
                Log.trace("WexinGame")
                instance = new WxGamePlatform();
                break;
            case cc.sys.QQ_GAME:
                Log.trace("QQgame")
                instance = new qqGamePlatform();
                break;
            case cc.sys.TOUTIAO_GAME:
                Log.trace("ToutaioGame")
                instance = new ToutiaoGamePlatform();
                break;
            case cc.sys.OPPO_GAME:
                Log.trace("oppo小游戏")
                instance = new oppoGamePlatform();
                break;
            case cc.sys.ANDROID:
                if (versionInfo.packVersion.indexOf("test") > -1) {
                    instance = new NativeDebugPlatform();
                } else {
                    instance = new NativePlatform();
                }
                Log.warn("安卓平台");
                // NativeDebugPlatform
                break;
            case cc.sys.IPHONE:
                Log.warn("ios平台");
                instance = new NativeIOSPlatform();
                break;
            default:
                cc.log("cc.sys.default::");
                instance = new DebugPlatform();
                break;
        }
    }
    export interface OtherGameConfData {
        img: string;
        name: string;
        jId: string;
        jPath: string;
        jImg?: string;
    }
}