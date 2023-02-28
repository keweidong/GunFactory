/*
 * @Author: He 
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-13 15:59:31
 * 结束交互动作
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAHideMask extends BaseAction {
    properties: {

    };

    open(tick: NGTick): void {
        tick.target.hideMask();
    }
    tick(tick: NGTick): b3.STATE {
        return b3.SUCCESS;

    }
    close(tick: NGTick): void {

    }
}
register(NGAHideMask, "NGAHideMask");