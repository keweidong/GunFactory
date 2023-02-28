import { IGameTick, RoleState } from "../../object/scene/role/const";
import { BaseAction, register } from "../B3Tree";
export default class SetState extends BaseAction {
    protected state: number = 0;
    constructor(params?: b3.Params) {
        super(params);
        this.state = RoleState[this.properties.state];

    }
    /**属性参数*/
    properties: {
        state: string;
        value: number;
    };
    tick(tick: IGameTick): b3.STATE {
        if (this.properties.value) {
            tick.target.state |= this.state;
        } else {
            tick.target.state &= ~this.state;
        }
        return b3.SUCCESS;
    }
}
register(SetState, "SetState");