import { AdState } from "../../../module/AD/ADManageBase";
import { Platform } from "../../Platform";
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
 * topon插屏广告
 */
export class TopOnInterAd implements IAdObject {
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
    protected id: string[];
    protected _classPath: string = "org/cocos2dx/javascript/SDK/TopOn/TopOnSDK";
    adState: AdState = AdState.none;

    public isShow: boolean = false;

    constructor(id: string[]) {
        this.id = id;
    }
    public init() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            // jsb.reflection.callStaticMethod(this._classPath, "initInterAd", "()V");
            jsb.reflection.callStaticMethod(this._classPath, "initInterAd", "(Ljava/lang/String;Ljava/lang/String;)V", this.id[0], this.id[1]);

        } else {
            jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "initInterAd:", this.id[0]);
        }
    }

    public load() {

    }
    /**
     * 播放广告
     */
    public show(index: number) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            var result = jsb.reflection.callStaticMethod(this._classPath, "showInterAd", "(I)V", index);
        } else {
            var result = jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "showInterAd", this.id[0]);
        }
    }

    /**广告点击 */
    protected onClickAD() {
        //向后台发送插屏广告统计
        // Platform.instance.recordInteractionAd(Daily_AD_TYPE.Interstitial_AD_Click);
    }
}