import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseCondition, register } from "../B3Tree";

export default class IsWaitFood extends BaseCondition {
    properties: {

    };
    tick(tick: ICustomerTick): b3.STATE {
        return tick.target.isWaitFood ? b3.SUCCESS : b3.FAILURE;
    }
}
register(IsWaitFood, "IsWaitFood");