import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { register } from "../B3Tree";
import MoveAction from "./MoveAction";

let tempPos = cc.v2();
/**
 * 这个动作会移动到取餐处,并且拿到需要配送的菜式
 */
export default class GetFood extends MoveAction {
    open(tick: IWaiterTick): void {
        let roleMsr = tick.target.roleMsr;
        let order = roleMsr.scene.orderMsr.waitDeliverOrders.shift();//取到一个待配送的菜式
        order.waiter = tick.target;
        tick.target.order = order;
        //取到获取食物的位置
        let x = roleMsr.gameView.tablePos.waiterGetFoodPos.x;
        let y = roleMsr.gameView.tablePos.waiterGetFoodPos.y;
        GameUtils.convertXYToCell(x, y, tempPos);
        let pos = GameUtils.convertXYToCell(tick.target.node.x, tick.target.node.y);//队伍终点位置
        let paths = roleMsr.scene.mapMsr.silzAstar.find(pos.x, pos.y, tempPos.x, tempPos.y);//查找从队伍终点到座位的路径
        paths.shift();
        let movePaths = [];
        for (const iterator of paths) {
            movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()));
        }
        movePaths.push(cc.v2(x, y));//把椅子的最终坐标放入路径
        let move: MoveComponent = tick.target.move;
        move.stopMove();//先调用一次停止移动方法,防止有残余的路径点存在
        move.Sp = tick.target.data.speed;
        move.moveByPaths(movePaths);
        tick.blackboard.set('move', move, tick.tree.id, this.id);
        move.enabled = true;
        tick.target.playAnimation("walk", 0, move.Sp / tick.target.data.baseSpeed);
    }
    tick(tick: IWaiterTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (move.enabled) {
                return b3.RUNNING;
            } else {
                tick.target.roleMsr.getFood(tick.target.order);
                return b3.SUCCESS;
            }
        } else {
            return b3.FAILURE;
        }
    }
}
register(GetFood, "GetFood");