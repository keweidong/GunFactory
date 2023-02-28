import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseCondition, register } from "../B3Tree";
export default class IsExit extends BaseCondition {
    properties: {

    };
    tick(tick: ICustomerTick): b3.STATE {
        if (tick.target.isExit) {
            return b3.SUCCESS;
        } else {
            return b3.FAILURE;
        }
    }
}
register(IsExit, "IsExit");