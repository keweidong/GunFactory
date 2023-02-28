/*
 * @Author: He
 * @Date: 2019-12-26 20:17:56
 * @Last Modified by: He
 * @Last Modified time: 2020-06-18 18:12:59
 * 结束交互动作
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAShowMask extends BaseAction {
    properties: {
        /** 镂空节点路径 */
        args: string;
        /** 透明度 */
        opacity: number;
        /** 等待时间 */
        time: number
        /** 是否显示手指 */
        isShowFinger: number,
        type: number;
    };
    protected setTouchState(tick: NGTick, state: boolean) {
        tick.blackboard.set("state", state, tick.tree.id, this.id);
    }
    open(tick: NGTick): void {
        tick.target.showMask(this.properties.opacity);
        if (this.properties.args) {
            tick.target.locatorTouchNode(this.properties.args, this.properties.isShowFinger, () => {
                this.setTouchState(tick, true);
            }, this.properties.type);
            this.setTouchState(tick, false);
        } else {
            this.setTouchState(tick, true);
        }
        // tick.blackboard.set("first", true, tick.tree.id, this.id);
    }
    tick(tick: NGTick): b3.STATE {
        let state = tick.blackboard.get("state", tick.tree.id, this.id);
        if (state) {
            return b3.SUCCESS;
        }
        else {
            return b3.RUNNING;
        }
    }
    close(tick: NGTick): void {

    }
}
register(NGAShowMask, "NGAShowMask");