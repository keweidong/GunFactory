import { TopOnRewardVideoAd } from "./TopOnRewardVideoAd";
import { TopOnInterAd } from "./TopOnInterAd";

/**
 * TopOn聚合广告SDK
 */
export default class TopOnSDK {
    protected _classPath: string = "org/cocos2dx/javascript/SDK/TopOn/TopOnSDK";
    public rewardVideo: TopOnRewardVideoAd = null;
    // public fullScreenVideo: TTFullScreenVideoAd = null;
    /**插屏广告 */
    public interactionAd: TopOnInterAd = null;
    constructor(protected appId: string) {
        //初始化广告sdk
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "initTopOnSDK", "(Ljava/lang/String;ZZ)V", this.appId, false, false);
        } else {
            jsb.reflection.callStaticMethod("AppController", "initTopOnSDK:", this.appId);
        }
    }
    /**
     * 请求权限
     */
    requestPermissionIfNecessary() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "requestPermissionIfNecessary", "()V");
        } else {
            // jsb.reflection.callStaticMethod("AppController", "initTTSDK:", this.appId);
        }
    }
}