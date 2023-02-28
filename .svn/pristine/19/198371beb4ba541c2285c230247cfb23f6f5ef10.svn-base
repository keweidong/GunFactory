/*
 * @Author: He
 * @Date: 2019-12-26 20:17:56
 * @Last Modified by: He
 * @Last Modified time: 2020-05-15 14:42:16
 * 结束交互动作
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAHideTip extends BaseAction {
    properties: {

    };

    open(tick: NGTick): void {
        tick.target.hideTip();
    }
    tick(tick: NGTick): b3.STATE {
        return b3.SUCCESS;
    }
    close(tick: NGTick): void {

    }
}
register(NGAHideTip, "NGAHideTip");