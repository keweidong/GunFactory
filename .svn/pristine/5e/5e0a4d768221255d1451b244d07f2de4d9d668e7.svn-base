import { NativeBridge } from "../NativeBridge";



export let shareUrl = "https://cudeadmin.gzqidong.cn/wxweb/public/index.php/main/login/index";
export default class WXSDK {
    protected _classPath: string = "org/cocos2dx/javascript/SDK/WXSDK/WXSDK";
    public appId: string = "wx915b9535bfe872d0";
    protected syncFunc: { [key: string]: Function } = {};

    public nativeCallSync(key: string, str: string) {
        Log.trace("原生调用nativeCallSync", key, "::", str);
        NativeBridge.WXSDK.syncFunc[key](str);
    }

    callSync(key: string): Promise<string> {
        return new Promise((resole, reject) => {
            if (cc.sys.platform == cc.sys.ANDROID) {
                Log.trace("调用微信登录android");
                jsb.reflection.callStaticMethod(this._classPath, key, "()V");
            } else {

            }
            this.syncFunc[key] = resole;
        });
    }

    constructor() {

    }

    public wxLogin(): string {
        let logininfo: string;
        if (cc.sys.platform == cc.sys.ANDROID) {
            cc.log("调用微信登录android");
            logininfo = jsb.reflection.callStaticMethod(this._classPath, "wxLogin", "()V");
        } else {

        }
        return logininfo;
    }


    public async isWXAppInstalled() {
        let isWXAppInstalled: boolean;
        if (cc.sys.platform == cc.sys.ANDROID) {
            cc.log("调用 检测是否安装微信 android");
            isWXAppInstalled = await jsb.reflection.callStaticMethod(this._classPath, "isWXAppInstalled", "()Z");
        } else {

        }
        return isWXAppInstalled;
    }
    // public goToWX() {
    //     if (cc.sys.platform == cc.sys.ANDROID) {
    //         cc.log("调用 跳转到小程序或公众号 android");
    //         jsb.reflection.callStaticMethod(this._classPath, "goToWX", "(Ljava/lang/String;)V", App.GameDataMsr.playerInfo.id);
    //     } else {

    //     }
    // }
    // /**
    // 	 * 微信分享
    // 	 */
    // public async share(type: AdType, shareInfo: ShareParms, shareType: string = "txt") {
    //     let queryStr: string = "";
    //     for (let key in shareInfo.paramList) {
    //         queryStr += key + "=" + shareInfo.paramList[key] + "&";
    //     }
    //     //去掉结尾多余的一个"&"
    //     queryStr = queryStr.substr(0, queryStr.length - 1);
    //     // if (document.location.href.indexOf("debug") > -1) {
    //     queryStr += "&debug=1";
    //     // }
    //     if (cc.sys.platform == cc.sys.ANDROID) {
    //         cc.log("调用 分享 android");
    //         jsb.reflection.callStaticMethod(this._classPath, "shareWx", "(Ljava/lang/String;)V", JSON.stringify({
    //             /**
    //             * 分享链接
    //             */
    //             url: shareUrl + "?" + queryStr,
    //             /**
    //              * 分享的内容
    //              */
    //             title: shareInfo.title,
    //             /**
    //              * 分享的描述
    //              */
    //             description: shareInfo.description,
    //             type: shareType,
    //             scene: 0
    //         }));
    //     } else {

    //     }

    // }
}
