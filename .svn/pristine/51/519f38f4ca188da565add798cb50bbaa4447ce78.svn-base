
import { ICustomerTick } from "../../object/scene/role/Customer";
import { BaseAction, register } from "../B3Tree";
/**
 * 顾客吃完东西
 */
export default class EatFinish extends BaseAction {
    tick(tick: ICustomerTick): b3.STATE {
        tick.target.eatFinish();
        tick.target.isExit = true;
        // let customer = tick.target;
        // let tablePosData = customer.tablePosData;
        // tablePosData.needClean = true;
        // customer.roleMsr.scene.tableMsr.waitCleanPos.push(tablePosData);//将这个位置放入待清理列表
        // tablePosData.foodImg.node.on(cc.Node.EventType.TOUCH_END, tick.target.tablePosData.cleanFunc);//增加一个点击自动清理盘子的点击回调
        // App.CommonUtils.setSpriteFrame("Texture/game/scene/foods/plate", customer.tablePosData.foodImg);
        // App.NotificationCenter.dispatch(GameNotificationConst.CUSTOMER_EAT_FINISH, customer);
        return b3.SUCCESS;
    }
}
register(EatFinish, "EatFinish");