import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { TablePosData } from "../../object/scene/table/CusTableComp";
import { register } from "../B3Tree";
import MoveAction from "./MoveAction";

let tempPos = cc.v2();
/**
 * 服务员前往清理桌子位置,这个动作是可以被用户操作打断的,有可能在前往的路上,就被用户手动点击餐盘清理掉
 */
export default class MoveToClearPos extends MoveAction {
    protected tablePosData: TablePosData;
    open(tick: IWaiterTick): void {
        let tablePosData = tick.target.roleMsr.scene.tableMsr.waitCleanPos.pop();
        if (tablePosData) {
            tick.target.tablePosData = tablePosData;
            GameUtils.convertXYToCell(tablePosData.tempPos.x, tablePosData.tempPos.y, tempPos);
            //起始位置
            let pos = GameUtils.convertXYToCell(tick.target.node.x, tick.target.node.y);
            //查找从队伍终点到座位的路径
            let paths = tick.target.roleMsr.scene.mapMsr.silzAstar.find(pos.x, pos.y, tempPos.x, tempPos.y);
            paths.shift();
            let movePaths = [];
            for (const iterator of paths) {
                movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()));
            }
            movePaths.push(cc.v2(tablePosData.waiterClear.x, tablePosData.waiterClear.y));//把椅子的最终坐标放入路径
            let move: MoveComponent = tick.target.move;
            move.stopMove();//先调用一次停止移动方法,防止有残余的路径点存在
            move.Sp = tick.target.data.speed;
            move.moveByPaths(movePaths);
            tick.blackboard.set('move', move, tick.tree.id, this.id);
            move.enabled = true;
            tick.target.playAnimation("walk", 0, move.Sp / tick.target.data.baseSpeed);
        }
    }
    tick(tick: IWaiterTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (move.enabled) {
                if (tick.target.tablePosData.needClean) {
                    return b3.RUNNING;
                } else {//盘子已经被清理了
                    tick.target.tablePosData = null;
                    return b3.FAILURE;
                }
            } else {
                // tick.target.roleMsr.scene.tableMsr.cleanTable(tick.target.tablePosData);
                // tick.target.tablePosData = null;
                return b3.SUCCESS;
            }
        } else {
            return b3.FAILURE;
        }
    }
}
register(MoveToClearPos, "MoveToClearPos");