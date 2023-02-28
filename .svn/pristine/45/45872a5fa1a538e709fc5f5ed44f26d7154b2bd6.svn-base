import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { TIPSTATE } from "./GameUIConst";
import { Platform } from "../../platform/Platform";
import GameUIView from "./GameUIView";



const { ccclass, property, executeInEditMode } = cc._decorator;
/** 截图界面 */
@ccclass
export default class ShotView extends BaseView {
    initUI() {
        super.initUI();
    }

    close() {

    }

    public open(isTouch?: boolean) {
        super.open();
        Log.trace("打开拍照界面成功")
        // this.node.scaleX = width/this.node.width
        // this.node.height = height;
        this.node.scaleX = GameUIView.width / this.node.width;
        this.node.scaleY = GameUIView.height / this.node.height;

        Log.trace(this.node.scaleX + "拍照界面宽比例")
        Log.trace(this.node.scaleY + "拍照界面高比例")
        App.TimerManager.doTimer(2000, 1, () => {
            Platform.instance.Stransmit(isTouch);
            App.TimerManager.doTimer(2000, 1, this.onTouchClose, this);
        }, this);
    }
}
