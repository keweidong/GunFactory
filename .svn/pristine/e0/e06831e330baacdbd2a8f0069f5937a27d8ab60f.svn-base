import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { BaseAction, register } from "../B3Tree";

let tempPos = cc.v2();
/**
 * 这个动作会移动到送餐处,并且送菜上桌
 */
export default class DeliverFood extends BaseAction {
    properties: {
        /**移动的时候播放的动画 */
        aniName?: string;
    };
    open(tick: IWaiterTick): void {
        let customer = tick.target.order.customer;
        let mapMsr = customer.roleMsr.mapMsr;
        let tablePosData = customer.tablePosData;//拿到座位数据
        GameUtils.convertXYToCell(tablePosData.tempPos.x, tablePosData.tempPos.y, tempPos);
        //起始位置
        let pos = GameUtils.convertXYToCell(tick.target.node.x, tick.target.node.y);
        //查找从队伍终点到座位的路径
        let paths = mapMsr.silzAstar.find(pos.x, pos.y, tempPos.x, tempPos.y);
        paths.shift();
        let movePaths = [];
        for (const iterator of paths) {
            movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()));
        }
        movePaths.push(cc.v2(tablePosData.waiter.x, tablePosData.waiter.y));//把椅子的最终坐标放入路径
        let move: MoveComponent = tick.target.move;
        move.stopMove();//先调用一次停止移动方法,防止有残余的路径点存在
        move.Sp = tick.target.data.speed;
        move.moveByPaths(movePaths);
        tick.blackboard.set('move', move, tick.tree.id, this.id);
        move.enabled = true;
        tick.target.playAnimation(this.properties.aniName || "walk_order", 0, move.Sp / tick.target.data.baseSpeed);
    }
    tick(tick: IWaiterTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (move.enabled) {
                return b3.RUNNING;
            } else {
                tick.target.roleMsr.scene.orderMsr.deliverFood(tick.target.order);
                return b3.SUCCESS;
            }
        } else {
            return b3.FAILURE;
        }
    }
}
register(DeliverFood, "DeliverFood");