import { IGameTick } from "../../object/scene/role/const";
import { BaseCondition, register } from "../B3Tree";
/**
 * 是否有烹饪好的菜式需要配送
 */
export default class HasFinishOrder extends BaseCondition {
    tick(tick: IGameTick): b3.STATE {
        return tick.target.roleMsr.scene.orderMsr.waitDeliverOrders.length ? b3.SUCCESS : b3.FAILURE;
    }
}
register(HasFinishOrder, "HasFinishOrder");