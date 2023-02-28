import TTFullScreenVideoAd from "./TTFullScreenVideoAd";
import { TTInteractionExpressAd } from "./TTInteractionExpressAd";
import { TTRewardVideoAd } from "./TTRewardVideoAd";
/**
 * 穿山甲广告SDK
 */
export default class TTSDK {
    protected _classPath: string = "org/cocos2dx/javascript/SDK/TTAD/TTSDK";
    public rewardVideo: TTRewardVideoAd = null;
    public fullScreenVideo: TTFullScreenVideoAd = null;
    /**插屏广告 */
    public interactionAd: TTInteractionExpressAd = null;
    constructor(protected appId: string) {
        //初始化广告sdk
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "initTTSDK", "(Ljava/lang/String;ZZ)V", this.appId, false, false);
        } else {
            jsb.reflection.callStaticMethod("AppController", "initTTSDK:", this.appId);
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