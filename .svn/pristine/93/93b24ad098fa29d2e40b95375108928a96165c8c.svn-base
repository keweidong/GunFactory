import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseCondition, register } from "../B3Tree";

export default class IsAngry extends BaseCondition {
    tick(tick: ICustomerTick): b3.STATE {
        if (Date.now() >= tick.target.angryTime) {
            return b3.SUCCESS;
        }
        return b3.FAILURE;
    }
}
register(IsAngry, "IsAngry");