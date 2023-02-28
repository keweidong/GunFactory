import { IWaiterTick } from "../../object/scene/role/waiter/Waiter";
import { register } from "../B3Tree";
import PlayAniAction from "./PlayAniAction";
/**
 * 服务员前往清理餐桌,这个动作是可以被用户操作打断的,有可能在前往的路上,就被用户手动点击餐盘清理掉
 */
export default class CleanTable extends PlayAniAction {
    open(tick: IWaiterTick): void {
        this.properties.aniName = tick.target.tablePosData.isTop ? "clear1" : "clear";
        this.properties.playCnt = 1;
        tick.target.tablePosData.foodImg.node.off(cc.Node.EventType.TOUCH_END, tick.target.tablePosData.cleanFunc);
        super.open(tick);
    }
    tick(tick: IWaiterTick): b3.STATE {
        if (this.isAniFinish) {
            tick.target.roleMsr.scene.tableMsr.cleanTable(tick.target.tablePosData);
            tick.target.tablePosData = null;
            return b3.SUCCESS;
        } else {
            return b3.RUNNING;
        }
    }
}
register(CleanTable, "CleanTable");