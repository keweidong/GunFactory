/*
 * @Author: He 
 * @Date: 2019-12-25 11:30:40 
 * @Last Modified by: He
 * @Last Modified time: 2020-06-10 21:20:58
 * 移动到某个固定的位置
 */

import App from "../../../../../core/App";
import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { IGameTick } from "../../object/scene/role/const";
import { BaseAction, register } from "../B3Tree";

export default class MoveAction extends BaseAction {
    properties: {
        x: number;
        y: number;
        rx?: number;
        ry?: number;
        /**移动的时候播放的动画 */
        aniName?: string;
        /**移动结束的时候播放的动画*/
        endAni?: string;
        /**
         *  移动速度
         */
        sp: number;
    };
    enter(tick: IGameTick): void {
    }
    /**
     * 打断动作
     */
    onInterrupt(tick: IGameTick) {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        move && (move.stopMove());
    }
    open(tick: IGameTick): void {
        let move: MoveComponent = tick.target.move;
        if (this.properties.sp) {
            move.Sp = this.properties.sp;
        } else {
            move.Sp = tick.target.data.speed;
        }
        tick.blackboard.set('move', move, tick.tree.id, this.id);
        if (this.properties.rx || this.properties.ry) {
            var cellX = App.RandomUtils.limitInteger(this.properties.x, this.properties.rx);
            var cellY = App.RandomUtils.limitInteger(this.properties.y, this.properties.ry);
        } else {
            var cellX = this.properties.x;
            var cellY = this.properties.y;
        }
        let mapMsr = tick.target.roleMsr.mapMsr;
        let pos = GameUtils.convertXYToCell(tick.target.node.x, tick.target.node.y);
        let paths = mapMsr.silzAstar.find(pos.x, pos.y, cellX, cellY);
        let movePaths = [];
        move.stopMove();
        if (paths && paths.length) {//如果找得到移动过去的路径
            paths.shift();
            for (const iterator of paths) {
                movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()))
            }
            move.moveByPaths(movePaths);
        } else {//找不到路径就直接穿过去
            move.moveToCell(cellX, cellY);
        }
        move.enabled = true;
        tick.target.playAnimation(this.properties.aniName || "walk", 0, move.Sp / tick.target.data.baseSpeed);
    }
    tick(tick: IGameTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (move.enabled) {
                return b3.RUNNING;
            } else {
                return b3.SUCCESS;
            }
        } else {
            return b3.FAILURE;
        }
    }
    close(tick: IGameTick): void {
        // this.log("移动结束", this.properties.endAni);
        // this.onInterrupt(tick);
        tick.blackboard.set('move', null, tick.tree.id, this.id);
        if (this.properties.endAni) {
            tick.target.playAnimation(this.properties.endAni, 0);
        }
    }
}

register(MoveAction, "MoveAction");