
import App from "../../../../../core/App";
import { GameNotificationConst } from "../../../../consts/NotificationConst";
import { FoodType } from "../../object/scene/food/FoodMsr";
import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseAction, ITick, register } from "../B3Tree";
/**
 * 客人坐下,并且随机生成一个订单
 */
export default class Sitdown extends BaseAction {
    /**属性参数*/
    properties: {

    };
    open(tick: ICustomerTick): void {
        let customer = tick.target;
        customer.node.scaleX = customer.tablePosData.isLeft ? -1 : 1;
        customer.isWaitOrder = true;
        customer.resetAngryTime();
        //随机生成一个订单
        let order = customer.roleMsr.scene.orderMsr.createOrder(customer);
        if (order.food.foodType === FoodType.NORMAL) {//普通菜式
            customer.roleMsr.waitOrderList.push(customer);//将玩家放入等待点单列表
        } else {//如果是特殊菜
          
        }
        customer.order = order;
        customer.showOrderBox();//显示订单
        App.NotificationCenter.dispatch(GameNotificationConst.SHOW_ORDER, order);

    }
    tick(tick: ITick): b3.STATE {
        return b3.SUCCESS;
    }
}

register(Sitdown, "Sitdown");