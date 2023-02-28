import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseAction, register } from "../B3Tree";
const moveCnt = 30;
/**
 * 进入排队队列
 */
export default class EnterQueue extends BaseAction {
    tick(tick: ICustomerTick): b3.STATE {
        tick.target.roleMsr.enterCellQueue(tick.target);
        tick.target.resetAngryTime();
        return b3.SUCCESS;
    }
}
register(EnterQueue, "EnterQueue");