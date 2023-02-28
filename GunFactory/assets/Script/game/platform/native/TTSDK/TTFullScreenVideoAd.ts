import App from "../../../../core/App";
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
 * 穿山甲广告全屏广告
 */
export default class TTFullScreenVideoAd implements IAdObject {
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
    isSkin: boolean = false;
    constructor(id: string) {
        this.id = id;
    }
    /**
     * 拉取全屏广告成功回调
     */
    private addADLoadSuccessCallBack() {
        //CC_DEBUG && Log.trace("全屏广告拉取成功广告")
        this.onLoadAdComplete();
    }
    /**
     * 拉取全屏广告失败回调
     */
    private addADloadFailCallBack(error) {
        cc.log("全屏addADloadFailCallBack error", error)
        //CC_DEBUG && Log.trace("全屏广告拉取失败广告")
        this.onLoadAdFail(error);
    }
    /**
     * 给微信的广告组件添加关闭回调
     */
    private addADCloesCallBack(res: number): void {
        let resTemp = res;
        if (this.isSkin) {
            resTemp = 1;
        }
        //CC_DEBUG && Log.trace("全屏ios给微信的广告组件添加关闭回调")
        if (cc.sys.platform == cc.sys.IPHONE) {
            App.SoundManager.resumeEffect();
            App.SoundManager.resumeMusic();
        }
        App.TimerManager.setTimeOut(100, () => {//从后台回来的时候,如果进行了切换纹理的操作会导致纹理混乱,所以延迟100毫秒后再进行通知播放结果
            this.onShowAdComplete({
                code: resTemp
            });
        }, this)
    }

    //广告跳过回调
    private addADSkinCallBack(isSkin: boolean): void {
        this.isSkin = isSkin;
        //CC_DEBUG && Log.trace("全屏广告-跳过");
    }




    public init() {
        this.initAd();
    }

    public initAd() {
        //CC_DEBUG && Log.trace("全屏广告adUnitId:", this.id)
        //初始化激励广告, 参数1 广告id 参数2 预加载广告数量
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "initFullScreenVideoAd", "(Ljava/lang/String;I)V", this.id, 1);
        } else {
            jsb.reflection.callStaticMethod("BUDFullScreenVideoAdViewController", "initFullScreenVideoAd");
        }
    }
    /**
     * 加载广告
     */
    public load() {
        //CC_DEBUG && Log.trace("全屏广告加载广告")
        if (cc.sys.platform == cc.sys.ANDROID) {
            var result = jsb.reflection.callStaticMethod(this._classPath, "loadFullScreenVideoAd", "()V");
        } else {
            var result = jsb.reflection.callStaticMethod("BUDFullScreenVideoAdViewController", "loadFullScreenVideoAd");
        }
        this.isSkin = false;
    }

    /**
     * 播放广告
     */
    public show() {
        CC_DEBUG && Log.trace("全屏广告播放广告")
        if (cc.sys.platform == cc.sys.ANDROID) {
            var result = jsb.reflection.callStaticMethod(this._classPath, "showFullScreenVideoAd", "()V");
        } else {
            App.SoundManager.pauseMusic();
            App.SoundManager.pauseEffect();
            var result = jsb.reflection.callStaticMethod("BUDFullScreenVideoAdViewController", "showFullScreenVideoAd");
        }
    }
}
