import { AdState } from "../../../module/AD/ADManageBase";
/**
 * 方法签名稍微有一点复杂，最简单的方法签名是 ()V，它表示一个没有参数没有返回值的方法。其他一些例子：

(I)V 表示参数为一个int，没有返回值的方法
(I)I 表示参数为一个int，返回值为int的方法
(IF)Z 表示参数为一个int和一个float，返回值为boolean的方法
现在有一些理解了吧，括号内的符号表示参数类型，括号后面的符号表示返回值类型。因为 Java 是允许函数重载的，可以有多个方法名相同但是参数返回值不同的方法，方法签名正是用来帮助区分这些相同名字的方法的。
int	I
float	F
boolean	Z
String	Ljava/lang/String;
 */
/**
 * 穿山甲信息流广告
 */
export class TTInteractionExpressAd implements IAdObject {
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
    protected _classPath: string = "org/cocos2dx/javascript/SDK/TTAD/TTSDK";
    adState: AdState = AdState.none;
    constructor(id: string) {
        this.id = id;
    }
    public init() {
        // CC_DEBUG && Log.trace("全屏广告adUnitId:", this.id)
        //初始化信息流广告, 参数1 广告id 参数2 广告宽度 参数3 广告高度,0为自动适配
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "initInteractionExpressAd", "(Ljava/lang/String;III)V", this.id, 1, 350, 350);
        } else {
            // jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "initExpressAd:", this.id);
        }
    }
    /**
     * 加载广告
     */
    public load() {
        // CC_DEBUG && Log.trace("全屏广告加载广告")
        // if (cc.sys.platform == cc.sys.ANDROID) {
        //     var result = jsb.reflection.callStaticMethod(this._classPath, "loadExpressAd", "()V");
        // } else {
        //     cc.log("ios加载广告")
        //     var result = jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "loadRewardVideoAd:", this.id);
        // }
    }
    /**
     * 播放广告
     */
    public show() {
        // CC_DEBUG && Log.trace("全屏广告播放广告")
        if (cc.sys.platform == cc.sys.ANDROID) {
            var result = jsb.reflection.callStaticMethod(this._classPath, "showInteractionExpressAd", "()V");
        } else {
            // App.SoundManager.pauseMusic();
            // App.SoundManager.pauseEffect();
            // cc.log("ios播放广告")
            // var result = jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "showRewardVideoAd");
        }
    }
}