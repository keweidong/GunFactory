import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { register } from "../B3Tree";
import MoveAction from "./MoveAction";

let tempPos = cc.v2();
/**
 * 前往给顾客下单,这个过程有可能被玩家点击下单从而被打断
 */
export default class MoveToOrder extends MoveAction {
    open(tick: IWaiterTick): void {
        let waiter = tick.target;
        let customer = waiter.roleMsr.waitOrderList.shift();//获取一个等待下单的顾客
        waiter.order = customer.order;
        customer.order.waiter = waiter;
        let mapMsr = customer.roleMsr.mapMsr;
        let tablePosData = customer.tablePosData;//拿到座位数据
        GameUtils.convertXYToCell(tablePosData.tempPos.x, tablePosData.tempPos.y, tempPos);
        let pos = GameUtils.convertXYToCell(waiter.node.x, waiter.node.y);//队伍终点位置
        let paths = mapMsr.silzAstar.find(pos.x, pos.y, tempPos.x, tempPos.y);//查找从队伍终点到座位的路径
        let movePaths = [];
        for (const iterator of paths) {
            movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()));
        }
        movePaths.push(cc.v2(tablePosData.waiter.x, tablePosData.waiter.y));//把椅子的最终坐标放入路径
        let move: MoveComponent = waiter.move;
        move.stopMove();//先调用一次停止移动方法,防止有残余的路径点存在
        move.Sp = tick.target.data.speed;
        move.moveByPaths(movePaths);
        tick.blackboard.set('move', move, tick.tree.id, this.id);
        move.enabled = true;
        waiter.playAnimation("walk", 0, move.Sp / tick.target.data.baseSpeed);
    }
    tick(tick: IWaiterTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (move.enabled) {
                if (tick.target.order) {
                    return b3.RUNNING;
                } else {//如果没有订单,说明
                    CC_DEBUG && this.log("订单被打断");
                    this.onInterrupt(tick);
                    return b3.FAILURE;
                }
            } else {
                if (tick.target.order) {
                    tick.target.node.scaleX = tick.target.order.customer.tablePosData.isLeft ? 1 : -1;
                    tick.target.roleMsr.scene.orderMsr.order(tick.target.order);
                }
                return b3.SUCCESS;
            }
        } else {
            return b3.FAILURE;
        }
    }

}
register(MoveToOrder, "MoveToOrder");