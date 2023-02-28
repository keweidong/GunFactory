import App from "../../../core/App";
import { ControllerConst } from "../../consts/ControllerConst";
import { ActivityConst } from "./ActivityConst";



const colorWidth = 235

const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodAnicb2 extends cc.Component {

    ani: cc.Animation = null;
    onLoad() {
        this.ani = this.node.getComponent(cc.Animation);
        // this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }

    moveFinish() {
        CC_DEBUG && Log.trace('移动完成')
        this.ani.play("daoyouer");
    }

    daoyouFinish() {
        CC_DEBUG && Log.trace('倒油完成');
        this.sendEvent()
    }

    sendEvent() {
        App.ControllerManager.applyFunc(ControllerConst.Activity, ActivityConst.ANI_COMPLETE, 0);
    }
}