/*
 * @Author: He 
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-26 16:20:33
 * 结束交互动作
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAWaitTouch extends BaseAction {
    properties: {
        /** 点击路径 */
        args: string
        /** 等待时间 */
        time: number
        /** 是否显示手指 */
        isShowFinger: number,
    };

    open(tick: NGTick): void {
        tick.blackboard.set("first", true, tick.tree.id, this.id);
        tick.target.waitTouch();
    }
    tick(tick: NGTick): b3.STATE {
        let isFinish = tick.blackboard.get("first", tick.tree.id, this.id);
        if (isFinish) {
            tick.blackboard.set("first", false, tick.tree.id, this.id);
            return b3.RUNNING;
        }
        tick.target.godGuide.reset();
        return b3.SUCCESS;
    }
    close(tick: NGTick): void {

    }
}
register(NGAWaitTouch, "NGAWaitTouch");