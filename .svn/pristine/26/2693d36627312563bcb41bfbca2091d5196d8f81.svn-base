import { NativeBridge } from "../NativeBridge";

export default class QDSDK {
    protected _classPath: string = "org/cocos2dx/javascript/SDK/GameBridge";
    // public appId: string = "";
    protected syncFunc: { [key: string]: Function } = {};

    public nativeCallSync(key: string, str: string) {
        Log.trace("QDSDK调用nativeCallSync", key, "::", str);
        NativeBridge.QDSDK.syncFunc[key](str);
    }

    callSync(key: string): Promise<string> {
        return new Promise((resole, reject) => {
            if (cc.sys.platform == cc.sys.ANDROID) {
                Log.trace("调用QDSDK android");
                jsb.reflection.callStaticMethod(this._classPath, key, "()V");
            } else {

            }
            this.syncFunc[key] = resole;
        });
    }

    constructor() {

    }

    public SetUUID(): string {

        let uuid: string;
        if (cc.sys.platform == cc.sys.ANDROID) {
            cc.log("调用微信登录android");
            uuid = jsb.reflection.callStaticMethod(this._classPath, "SetUUID", "()V");
        } else {

        }
        return uuid;

    }
}
