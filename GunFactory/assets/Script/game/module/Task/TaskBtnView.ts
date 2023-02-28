import BaseView from "../../../core/mvc/view/BaseView";
import { Platform } from "../../platform/Platform";
import { TaskConst, TaskStatus } from "./TaskConst";
import { TaskItemBase } from "./TaskItems/TaskItemBase";


const { ccclass, property } = cc._decorator;

/**每日任务弹窗*/
@ccclass
export default class TaskBtnView extends BaseView {
    /** 每日任务 */
    @property(cc.Button)
    protected taskBtn: cc.Button = null;
    /** 动作 */
    @property(cc.Animation)
    protected taskAni: cc.Animation = null;

    @property(cc.RichText)
    protected taskDescLab: cc.RichText = null;

    protected data: TaskItemBase = null;
    initUI() {
        super.initUI();
        if (Platform.instance.checkIsNotch()) {
            this.getComponent(cc.Widget).top += 50;
        }
        // this.taskDescLab = this.taskBtn.node.getComponentInChildren(cc.Label);
    }
    public setData(data: TaskItemBase) {
        this.taskDescLab.string = `<b>${data.getDesc()}(<color=ff5400>${data.data.cnt}</c>/${data.conf.param})</b>`;
        if (data.data.status !== TaskStatus.FINISHED) {
            this.taskAni.stop();
            this.taskAni.node.active = false;
        } else {
            this.taskAni.play();
            this.taskAni.node.active = true;
        }
        this.data = data;
    }
    /**每日任务按钮*/
    protected onTouchTaskBtn() {
        this.applyFunc(TaskConst.TOUCH_TASK_BTN_VIEW)
        // //领取每日任务
        // App.ViewManager.open(ViewConst.TaskView, this.data);
    }

}