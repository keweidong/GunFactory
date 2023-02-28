import { IGameTick } from "../../object/scene/role/const";
import { BaseAction, ITick, register } from "../B3Tree";
export default class RemoveSelf extends BaseAction {
    /**属性参数*/
    properties: {
        
    };
    open(tick: IGameTick): void {
        tick.target.removeSelf();
    }
    tick(tick: ITick): b3.STATE {
        return b3.SUCCESS;
    }
}
register(RemoveSelf, "RemoveSelf");