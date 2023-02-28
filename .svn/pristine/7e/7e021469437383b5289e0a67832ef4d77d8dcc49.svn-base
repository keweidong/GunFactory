import MoveComponent from "../../object/scene/role/component/MoveComponent";
import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseAction, register } from "../B3Tree";
const moveCnt = 330 / 5;
/**
 * 移动到队列下一个位置
 */
export default class MoveToNextRankPos extends BaseAction {
    /**
    * 打断动作
    */
    // onInterrupt(tick: ICustomerTick) {
    //     let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
    //     move && (move.stopMove());
    // }
    open(tick: ICustomerTick): void {
        let rankIndex = tick.target.roleMsr.rankList.indexOf(tick.target);//
        if (tick.target.curRankIndex !== rankIndex) {//如果有人从队伍中移动到餐桌,那么自身的排队位置会变化,如果当前位置不是目标位置,那么移动过去
            tick.target.nextRankIndex = rankIndex;
            let move: MoveComponent = tick.target.move;
            tick.blackboard.set('move', move, tick.tree.id, this.id);
            move.Sp = tick.target.data.speed;
            let pos = tick.target.roleMsr.gameView.getRankPos();
            move.moveTo(pos.x - (4 - rankIndex) * moveCnt, pos.y);
            move.enabled = true;
            tick.target.playAnimation("walk", 0, move.Sp / tick.target.data.baseSpeed);
        }
    }
    tick(tick: ICustomerTick): b3.STATE {
        let move: MoveComponent = tick.blackboard.get('move', tick.tree.id, this.id);
        if (move) {
            if (move.enabled) {
                return b3.RUNNING;
            } else {
                tick.target.curRankIndex = tick.target.nextRankIndex;
                tick.blackboard.set('move', null, tick.tree.id, this.id);
                return b3.SUCCESS;
            }
        } else {
            return b3.FAILURE;
        }
    }
    // close(tick: ICustomerTick): void {
    //     //     this.onInterrupt(tick);
    //     this.log("移动结束", tick.target.uuid, tick.target.curRankIndex);

    // }
}
register(MoveToNextRankPos, "MoveToNextRankPos");