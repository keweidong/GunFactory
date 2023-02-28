import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { BaseCondition, register } from "../B3Tree";
/**
 * 是否有顾客等待点单
 */
export default class HasCustomerOrder extends BaseCondition {
    tick(tick: IWaiterTick): b3.STATE {
        return tick.target.roleMsr.waitOrderList.length ? b3.SUCCESS : b3.FAILURE;
    }
}
register(HasCustomerOrder, "HasCustomerOrder");