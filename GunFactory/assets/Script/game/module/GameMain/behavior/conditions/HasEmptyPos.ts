import { ICustomerTick } from "../../object/scene/role/Customer";
import Star from "../../object/scene/role/Star";
import { BaseCondition, register } from "../B3Tree";
/**
 * 餐桌是否有空位
 */
export default class HasEmptyPos extends BaseCondition {
    properties: {

    };
    tick(tick: ICustomerTick): b3.STATE {
        if (tick.target.roleMsr.star && tick.target.roleMsr.star.tablePosData === null) {
            if (tick.target instanceof Star && tick.target.roleMsr.scene.tableMsr.hasEmptyPos()) {
                return b3.SUCCESS;
            }
        } else if (
            tick.target.nextRankIndex === 0 && //排在第一位的优先获得位置,防止排在后面的抢到了位置
            tick.target.roleMsr.scene.tableMsr.hasEmptyPos()) {
            return b3.SUCCESS;
        }
        return b3.FAILURE;
    }
}
register(HasEmptyPos, "HasEmptyPos");