import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { ICustomerTick } from "../../object/scene/role/Customer";
import { register } from "../B3Tree";
import MoveAction from "./MoveAction";
let tempPos = cc.v2();
const moveCnt = 330 / 5;
/**
 * 移动到空闲的位置
 * 人物会先移动到排队队伍的终点,然后再寻路移动目标位置
 */
export default class MoveToEmptyPos extends MoveAction {
    open(tick: ICustomerTick): void {
        let customer = tick.target;
        let mapMsr = customer.roleMsr.mapMsr;

        let tableMsr = tick.target.roleMsr.scene.tableMsr;
        customer.roleMsr.removeRankCus(customer);//从排队列表移除
        tableMsr.orderPos(customer);//将空位置先预定了,防止被多个顾客同时跑到同个位置

        let tablePosData = customer.tablePosData;//拿到座位数据
        GameUtils.convertXYToCell(tablePosData.tempPos.x, tablePosData.tempPos.y, tempPos);
        let ranPos = customer.roleMsr.gameView.getRankPos();
        let x = ranPos.x - 400;
        let pos = GameUtils.convertXYToCell(x, ranPos.y);//队伍终点位置
        // this.log("队伍终点:", pos.x, pos.y);
        // this.log("目标地点:", tempPos.x, tempPos.y);
        let paths = mapMsr.silzAstar.find(pos.x, pos.y, tempPos.x, tempPos.y);//查找从队伍终点到座位的路径
        paths.pop();
        let movePaths = [];
        for (const iterator of paths) {
            movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()));
        }
        movePaths.push(cc.v2(tablePosData.tempPos.x, tablePosData.tempPos.y))
        movePaths.splice(0, 1, cc.v2(x, ranPos.y));//由于路径是基于格子查找的,所以第一个路径点的位置是基于格子算出来的,这里把它替换为精准的坐标
        movePaths.push(cc.v2(tablePosData.sit.x, tablePosData.sit.y));//把椅子的最终坐标放入路径
        let move: MoveComponent = customer.move;
        move.stopMove();//先调用一次停止移动方法,防止有残余的路径点存在
        move.Sp = customer.data.speed;
        move.moveByPaths(movePaths);
        tick.blackboard.set('move', move, tick.tree.id, this.id);
        move.enabled = true;
        customer.playAnimation("walk", 0, move.Sp / tick.target.data.baseSpeed);
        // this.log("开始移动")

    }
    // tick(tick: ITick): b3.STATE {
    //     return b3.SUCCESS;
    // }
    // close(tick: ITick): void {
    // }
}
register(MoveToEmptyPos, "MoveToEmptyPos");