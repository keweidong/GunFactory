import { IGameTick, RoleState } from "../../object/scene/role/const";
import { BaseCondition, register } from "../B3Tree";

export default class CheckState extends BaseCondition {
    protected state: number = 0;
    properties: {
        state: string;
    };
    constructor(params?: b3.Params) {
        super(params);
        this.state = RoleState[this.properties.state];
    }
    tick(tick: IGameTick): b3.STATE {
        if (tick.target.state & this.state) {
            return b3.SUCCESS;
        } else {
            return b3.FAILURE;
        }
    }
}
register(CheckState, "CheckState");