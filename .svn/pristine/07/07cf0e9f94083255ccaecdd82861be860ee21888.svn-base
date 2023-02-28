/*
 * @Author: ke 
 * @Date: 2020-03-14 17:55:40 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-26 16:23:28
 */
/**
 * 滑动
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAWait extends BaseAction {
    properties: {
        /** 延迟时间 */
        delay: number,
        /** 监听事件 */
        notificationConst: string
    };

    open(tick: NGTick): void {
        tick.blackboard.set("first", true, tick.tree.id, this.id);
        let pro = this.properties;
        if (pro.notificationConst || pro.delay) {
            tick.target.wait(pro.delay, pro.notificationConst);
        } else {
            tick.target.waitTouch();
        }
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
register(NGAWait, "NGAWait");