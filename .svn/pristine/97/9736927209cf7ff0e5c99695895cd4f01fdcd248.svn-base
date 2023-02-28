import RYSDK from "./RYSDK/RYSDK";
import TTSDK from "./TTSDK/TTSDK";
import WXSDK from "./WXSDK/WXSDK";
import QDSDK from './QDSDK/QDSDK';
import TopOnSDK from './TopOnSDK/TopOnSDK';
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
const classPath = "org/cocos2dx/javascript/SDK/GameBridge"
// export const NativeBridge: {
//     /**
//      * 穿山甲广告sdk
//      */
//     TTSDK: TTSDK
// } = {
//     TTSDK: null,

// }
/**
 * 调用GameBridge类的静态方法
 */
export class NativeBridge {
    static TTSDK: TTSDK = null;
    static RYSDK: RYSDK = null;
    static WXSDK: WXSDK = null;
    static TopOnSdk: TopOnSDK = null;
    static QDSDK: QDSDK = null;

    public static checkNotch() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            return jsb.reflection.callStaticMethod(classPath, "checkNotch", "()Z");
        } else {
            // return jsb.reflection.callStaticMethod("AppController", "checkNotch");
            // var size = cc.view.getFrameSize();
            // var isIphoneX = (size.width == 2436 && size.height == 1125)
            //     || (size.width == 1125 && size.height == 2436);
            // return isIphoneX;
            let windowSize = cc.winSize;//推荐  原因  短
            // console.log("屏幕width=" + windowSize.width + ",height=" + windowSize.height);

            if (windowSize.height / windowSize.width >= 2) {
                Log.trace("全面屏 :true ");

                return true;
            }
            // Log.trace("全面屏 : ", isIphoneX);
            Log.trace("全面屏 :false ");
            return false;
        }
    }
    /**
     * 震动
     * @param time 多少毫秒
     */
    public static vibrator(time: number) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(classPath, "vibrator", "(I)V", time);
        } else {
            // jsb.reflection.callStaticMethod("AppController", "vibrator", "()V");
        }
    }

    public static isAutoShowInteractionAd() {
        return jsb.reflection.callStaticMethod(classPath, "isAutoShowInteractionAd", "()Z");
    }
    // static callStaticMethod(path: string, className: string, paramsStr: string, params: { [key: string]: string | number | boolean }) {
    //     let keys = Object.keys(params);
    //     let paramsList = [];
    //     if (cc.sys.platform == cc.sys.ANDROID) {
    //         for (const key in params) {
    //             paramsList.push(params[key]);
    //         }
    //         jsb.reflection.callStaticMethod(path + className, keys[0], paramsStr, ...paramsList);
    //     } else {
    //         let funcName = "";
    //         for (const key in params) {
    //             funcName += key + ":";
    //             paramsList.push(params[key]);
    //         }
    //         jsb.reflection.callStaticMethod(className, funcName, ...paramsList);
    //     }
    // }

    /**
     * 退出游戏
     */
    static exitGame() {
        jsb.reflection.callStaticMethod(classPath, "exitGame", "()V");
    }
    /**
     * 打开链接
     */
    static openUrl(url: string) {
        jsb.reflection.callStaticMethod(classPath, "openUrl", "(Ljava/lang/String;)V", url);
    }
    static getChannel() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            return jsb.reflection.callStaticMethod(classPath, "getChannel", "()Ljava/lang/String;") || "cjkg";
        } else {
            return "cjkg";
        }
    }

}
window["NativeBridge"] = NativeBridge;