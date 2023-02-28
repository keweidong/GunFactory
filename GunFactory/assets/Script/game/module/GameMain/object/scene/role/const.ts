import { ITick } from "../../../behavior/B3Tree";
import GameObject from "./GameObject";

let FlagOfset = 0;
export enum RoleState {
    /**闲置状态 */
    IDLE = 1 << FlagOfset++,
    /**移动中 */
    MOVE = 1 << FlagOfset++,
    /**排队中 */
    RANK = 1 << FlagOfset++,
    /**等待订单 */
    WAITE_ORDER = 1 << FlagOfset++,
    /**等待食物 */
    WAITE_FOOD = 1 << FlagOfset++,
    /**进食中 */
    EATING = 1 << FlagOfset++,
    /**愤怒状态 */
    ANGRY = 1 << FlagOfset++,
}

export interface IGameTick extends ITick {
    /**执行ai动画的对象 */
    target: GameObject;
}
