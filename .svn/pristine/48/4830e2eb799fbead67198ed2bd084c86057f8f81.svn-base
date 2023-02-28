import App from "../../../core/App";
import { ControllerConst } from "../../consts/ControllerConst";
import { ActivityConst } from "./ActivityConst";



const colorWidth = 235

const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodAnicb3 extends cc.Component {
    ani: cc.Animation = null;
    onLoad() {
        this.ani = this.node.getComponent(cc.Animation);
        // this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }

    cb1() {
        CC_DEBUG && Log.trace('CB1');
        this.ani.play("chaocaier");
    }

    cb2() {
        CC_DEBUG && Log.trace('CB2')
        this.sendEvent(1);
    }

    sendEvent(index: number) {
        App.ControllerManager.applyFunc(ControllerConst.Activity, ActivityConst.ANI_COMPLETE, index);
    }

    cb3() {
        CC_DEBUG && Log.trace('CB3')
        this.ani.play("chaocaiguogaimaoyin");
    }

    cb4() {
        CC_DEBUG && Log.trace('CB4')
        this.ani.play("chaocaiguogaidakai");
    }

    cb5() {
        CC_DEBUG && Log.trace('CB5')
        this.scheduleOnce(() => { this.sendEvent(2); }, 0.5)

    }
}