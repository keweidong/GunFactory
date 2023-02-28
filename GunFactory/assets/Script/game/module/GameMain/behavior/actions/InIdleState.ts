import { GameUtils } from "../../GameUtils";
import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { IGameTick } from "../../object/scene/role/const";
import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { register } from "../B3Tree";
import MoveAction from "./MoveAction";
// let tempPos = cc.v2(750, 570);
/**
 * 当没有工作的时候,服务员会进入闲置状态
 */
export default class InIdleState extends MoveAction {
    open(tick: IWaiterTick): void {
        if (tick.target.roleMsr.idleWaiters.indexOf(tick.target) === -1) {
            let tempPos = tick.target.roleMsr.gameView.getWaiterRankPos();
            let index = tick.target.roleMsr.idleWaiters.indexOf(null);//找到一个空的位置
            let pos = GameUtils.convertXYToCell(tempPos.x - index * 60, tempPos.y);
            tick.target.roleMsr.idleWaiters[index] = tick.target;
            this.properties.aniName = "walk";
            this.properties.x = pos.x;
            this.properties.y = pos.y;
            this.properties.sp = tick.target.data.speed;
            super.open(tick);
            let move = tick.target.move;
            move.moveTo(tempPos.x - index * 60, tempPos.y);
        }
    }
    tick(tick: IGameTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (!move.enabled) {
                tick.blackboard.set('move', null, tick.tree.id, this.id);
                tick.target.node.scaleX = -1;
                tick.target.playAnimation("idle", 0)
            }
        }
        return b3.RUNNING;
    }

    protected interrupt(tick) {
        let index = tick.target.roleMsr.idleWaiters.indexOf(tick.target);
        if (index > -1) {
            tick.target.roleMsr.idleWaiters[index] = null;
        }
    }

}
register(InIdleState, "InIdleState");