import { FoodType } from "../../object/scene/food/FoodMsr";
import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseCondition, register } from "../B3Tree";
/**
 * 是不是特色菜
 */
export default class IsFeatureFood extends BaseCondition {
    tick(tick: ICustomerTick): b3.STATE {
        if (tick.target.order.food.foodType === FoodType.FEATURE) {
            return b3.SUCCESS;
        } else {
            return b3.FAILURE;
        }
    }
}
register(IsFeatureFood, "IsFeatureFood");