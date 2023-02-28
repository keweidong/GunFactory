import { BaseAction, register } from "../B3Tree1";

export default class NGAExecuteFunc extends BaseAction {
    /**属性参数*/
    properties: {
        funcName: string;
    };
    open(tick: NGTick): void {
    }
    tick(tick: NGTick): b3.STATE {

        return tick.target.onExecuteFunc(this.properties.funcName);;
    }
    close(tick: NGTick): void {
    }
}
register(NGAExecuteFunc, "NGAExecuteFunc");