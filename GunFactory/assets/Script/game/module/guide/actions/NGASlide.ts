/*
 * @Author: ke 
 * @Date: 2020-03-14 17:55:40 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-13 17:27:03
 */
/**
 * 滑动
 */
import GuideController from "../../guide/GuideController";
import { BaseAction, register } from "../B3Tree1";
export default class NGASlide extends BaseAction {
    properties: {
        /** 移动坐标点 y1-yn */
        x1: number,
        /** 移动坐标点 y1-yn */
        y1: number,
        /** 移动所需时间 */
        moveTime: number,
        /** 是否循环 */
        isLoop: number,
        /** 监听事件 */
        notificationConst: string
        /** 点击路径 */
        args1: string
        args2: string
    };


    open(tick: NGTick): void {
        tick.blackboard.set("isFinish", false, tick.tree.id, this.id);
        let pro = this.properties;
        if (pro.args1 && pro.args1 != "" && pro.args1 != " ") {
            (tick.target as GuideController).slideNode(pro.args1, pro.args2, pro.notificationConst, () => {
                (tick.target as GuideController).slideEnd();
                tick.blackboard.set("isFinish", true, tick.tree.id, this.id);
            })
            return;
        }
        let posList: cc.Vec2[] = [];
        for (let i = 1; i < 100; i++) {
            if (pro[`x${i}`] && pro[`y${i}`]) {
                posList.push(cc.v2({ x: pro[`x${i}`], y: pro[`y${i}`] }));
            }
            else {
                break;
            }
        }
        (tick.target as GuideController).slideArea(posList, pro.moveTime, pro.isLoop ? true : false, pro.notificationConst, () => {
            (tick.target as GuideController).slideEnd();
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
register(NGASlide, "NGASlide");