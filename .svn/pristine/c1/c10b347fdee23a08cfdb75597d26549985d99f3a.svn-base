/*
 * @Author: ke 
 * @Date: 2020-03-14 17:55:40 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-13 15:51:18
 */
/**
 * 移动主界面
 */
import { NGTick } from "../../../../core/behavior/BehaviorTree";
import GuideController from "../../guide/GuideController";
import { BaseAction, register } from "../B3Tree1";

export default class NGAScrollView extends BaseAction {
    properties: {
        x: number,
        y: number,
        time: number,
    };

    open(tick: NGTick): void {
        let pro = this.properties;
        tick.blackboard.set("isFinish", false, tick.tree.id, this.id);
        (tick.target as GuideController).scrollMainView(pro.x, pro.y, pro.time, () => {
            tick.blackboard.set("isFinish", true, tick.tree.id, this.id);
        })
    }
    tick(tick: NGTick): b3.STATE {
        let isFinish = tick.blackboard.get("isFinish", tick.tree.id, this.id);
        if (isFinish) {
            return b3.SUCCESS
        }
        else {
            return b3.RUNNING;
        }
    }
    close(tick: NGTick): void {

    }
}
register(NGAScrollView, "NGAScrollView");