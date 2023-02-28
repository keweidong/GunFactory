import { BaseAction, register } from "../B3Tree";
export default class StarGetFood extends BaseAction {
    /**属性参数*/
    properties: {

    };
    open(tick: IStarTick): void {
        // dsflskdjfkl
    }
    tick(tick: IStarTick): b3.STATE {
        // return b3.RUNNING;
        return tick.target.getFood();
    }
    close(tick: IStarTick): void {
    }
}
register(StarGetFood, "StarGetFood");