/*
 * @Author: He 
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-26 11:21:17
 * 用于调用模块事件或者全局事件的action
 */
import App from "../../../../core/App";
import { ControllerConst } from "../../../consts/ControllerConst";
import { BaseAction, register } from "../B3Tree1";
export default class NGASpecial extends BaseAction {
    properties: {
        controller: string;
        key: string;
        notification: string;
        param: any;
    };

    open(tick: b3.Tick): void {
        if (typeof this.properties.controller === "string" && this.properties.controller != "" && this.properties.key) {
            App.ControllerManager.applyFunc2(ControllerConst[this.properties.controller], this.properties.key, this.properties.param);
        }
        if (this.properties.notification && this.properties.notification !== "") {
            App.NotificationCenter.dispatch(this.properties.notification, this.properties.param);
        }
    }

    tick(tick: b3.Tick): b3.STATE {
        return b3.SUCCESS;
    }
    close(tick: b3.Tick): void {

    }
}
register(NGASpecial, "NGASpecial");