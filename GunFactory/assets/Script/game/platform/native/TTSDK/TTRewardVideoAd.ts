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
 * 穿山甲广告激励广告
 */
export class TTRewardVideoAd implements IAdObject {
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
    /**
     * 拉取激励广告成功回调
     */
    private addADLoadSuccessCallBack() {
        // CC_DEBUG && Log.trace("全屏广告拉取成功广告")
        Log.trace("加载广告成功")
        this.onLoadAdComplete();
    }
    /**
     * 拉取激励广告失败回调
     */
    private addADloadFailCallBack(error) {
        cc.log("addADloadFailCallBack error", error)
        Log.trace("加载广告失败")
        // CC_DEBUG && Log.trace("全屏广告拉取失败广告")
        this.onLoadAdFail(error);
    }
    /**是否完整观看广告 */
    protected _isShowComplete = false;
    /**
     * 完整观看广告回调
     */
    protected onShowAdCompleteCb() {
        Log.trace("完整观看广告回调")
        this._isShowComplete = true;
    }
    /**
     * 给广告组件添加关闭回调
     */
    private addADCloesCallBack(res: number): void {
        if (cc.sys.platform == cc.sys.IPHONE) {
            App.SoundManager.resumeEffect();
            App.SoundManager.resumeMusic();
            this._isShowComplete = true;
        }
        Log.trace("广告播放完毕,", res);
        App.TimerManager.setTimeOut(100, () => {//从后台回来的时候,如果进行了切换纹理的操作会导致纹理混乱,所以延迟100毫秒后再进行通知播放结果
            // if (res === -1) {//为了兼容旧包,新包回调会返回-1,如果返回-1会根据_isShowComplete决定给不给奖励
            this.onShowAdComplete({
                code: res != 1 ? 0 : 1/**this._isShowComplete ? 0 : 1*/
            });
            // } else {
            //     this.onShowAdComplete({
            //         code: Date.now() - this.showTime < 8000 ? 1 : res//观看时间低于15秒的广告绝对是观看失败或者跳过的
            //     });
            // }
        }, this)
        if (cc.sys.platform == cc.sys.IPHONE) {
            this._isShowComplete = false;
        }
    }
    public init() {
        this.initAd();
    }

    public initAd() {
        // CC_DEBUG && Log.trace("全屏广告adUnitId:", this.id)
        //初始化激励广告, 参数1 广告id 参数2 预加载广告数量
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "initRewardVideoAd", "(Ljava/lang/String;I)V", this.id, 1);
        } else {
            jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "initRewardVideoAd:", this.id);
        }
    }
    /**
     * 加载广告
     */
    public load() {
        // CC_DEBUG && Log.trace("全屏广告加载广告")
        if (cc.sys.platform == cc.sys.ANDROID) {
            var result = jsb.reflection.callStaticMethod(this._classPath, "loadRewardVideoAd", "()V");
        } else {
            cc.log("ios加载广告")
            var result = jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "loadRewardVideoAd:", this.id);
        }
    }
    protected showTime = -1;
    /**
     * 播放广告
     */
    public show() {
        this._isShowComplete = false;
        this.showTime = Date.now();
        // CC_DEBUG && Log.trace("全屏广告播放广告")
        if (cc.sys.platform == cc.sys.ANDROID) {
            var result = jsb.reflection.callStaticMethod(this._classPath, "showRewardVideoAd", "()V");
        } else {
            App.SoundManager.pauseMusic();
            App.SoundManager.pauseEffect();
            cc.log("ios播放广告")
            var result = jsb.reflection.callStaticMethod("BUDRewardedVideoAdViewController", "showRewardVideoAd", "()V");
        }
    }
}