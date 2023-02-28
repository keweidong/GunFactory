import App from "../../../core/App";
import { ControllerConst } from "../../consts/ControllerConst";
import { ActivityConst } from "./ActivityConst";
const colorWidth = 235
const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodAnicb1 extends cc.Component {

    ani: cc.Animation = null;
    onLoad() {
        this.ani = this.node.getComponent(cc.Animation);
    }

    dianhuoFinish() {
        this.ani.play("huoshao");
    }

    sendEvent() {
        App.ControllerManager.applyFunc(ControllerConst.Activity, ActivityConst.ANI_COMPLETE, 0);
    }
}