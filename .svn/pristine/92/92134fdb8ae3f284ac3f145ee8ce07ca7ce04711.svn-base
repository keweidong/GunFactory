/*
 * @Author: He 
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-26 18:25:38
 * 结束交互动作
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAShowTip extends BaseAction {
    properties: {
        str: string;
        pos: string;
        ani: string;
    };
    open(tick: NGTick): void {
        // tick.blackboard.set("first", this.properties.isTouchNext, tick.tree.id, this.id);
        tick.target.showTip(this.properties);
    }
    tick(tick: NGTick): b3.STATE {
        // let isFinish = tick.blackboard.get("first", tick.tree.id, this.id);
        // if (isFinish) {
        //     tick.blackboard.set("first", 0, tick.tree.id, this.id);
        //     return b3.RUNNING;
        // }
        return b3.SUCCESS;
    }
    close(tick: NGTick): void {

    }
}
register(NGAShowTip, "NGAShowTip");