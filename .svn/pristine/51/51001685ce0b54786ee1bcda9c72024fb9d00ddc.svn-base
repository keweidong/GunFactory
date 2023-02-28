import { IGameTick } from "../../object/scene/role/const";
import { BaseCondition, register } from "../B3Tree";
/**
 * 是否有座位需要收拾餐盘,座位必须收拾好顾客才可以上座
 */
export default class HasPosNeedClean extends BaseCondition {
    tick(tick: IGameTick): b3.STATE {
        // usePos
        if (tick.target.roleMsr.scene.tableMsr.hasCleanPos()) {
            return b3.SUCCESS;
        }
        return b3.FAILURE;
    }
}
register(HasPosNeedClean, "HasPosNeedClean");