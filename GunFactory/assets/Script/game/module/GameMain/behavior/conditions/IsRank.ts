import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseCondition, register } from "../B3Tree";
/**
 * 是否排队中
 */
export default class IsRank extends BaseCondition {
    properties: {

    };
    tick(tick: ICustomerTick): b3.STATE {
        // CC_DEBUG && this.log(tick.target.isRank());
        return tick.target.isRank() ? b3.SUCCESS : b3.FAILURE;
    }
}
register(IsRank, "IsRank");