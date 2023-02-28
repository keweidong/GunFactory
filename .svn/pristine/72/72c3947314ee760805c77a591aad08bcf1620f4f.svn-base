// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 热云统计SDK
*/
export default class RYSDK {
    protected _classPath: string = "org.cocos2dx.javascript.SDK.REYUN.RYSDK";
    constructor() {
        //初始化广告sdk
        //jsb.reflection.callStaticMethod(this._classPath, "initTTSDK", "(Ljava/lang/String;ZZ)V", this.appId, false, false);
    }
    //登录
    register() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "register", "()V");
        } else {
            jsb.reflection.callStaticMethod("AppController", "reyunRegister");
        }
    }

    //注册
    newUser() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            jsb.reflection.callStaticMethod(this._classPath, "newUser", "()V");
        } else {
            jsb.reflection.callStaticMethod("AppController", "reyunNewUser");
        }
    }
    setEvent(eventName: string) {
        if (cc.sys.platform == cc.sys.ANDROID) {
            // jsb.reflection.callStaticMethod(this._classPath, "setEvent", "(Ljava/lang/String;)V", eventName);
        } else {
            //     jsb.reflection.callStaticMethod("AppController", "reyunNewUser");
        }
    }

}
