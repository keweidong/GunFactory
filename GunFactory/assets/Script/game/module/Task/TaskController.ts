import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import Toast from "../../../core/utils/Toast";
import HandGuide from "../../component/HandGuide";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { BagConst } from "../bag/BagConst";
import { BagModel } from "../bag/BagModel";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import TaskBtnView from "./TaskBtnView";
import { TaskConst, TaskStatus } from "./TaskConst";
import TaskDataManager, { TaskData } from "./TaskDataManager";
import { TaskItemBase } from "./TaskItems/TaskItemBase";
import { TaskModel } from "./TaskModel";
import { Platform } from "../../platform/Platform";
import { GameText } from "../../../core/lang/GameText";

export default class TaskController extends BaseController {
    public world: WorldScene = null;
    public bagModel: BagModel = null;
    protected _model: TaskModel = null;
    /**每日任务配置表管理器*/
    public taskConfigManager: TaskDataManager = null;

    protected taskItemMap: {
        [id: number]: TaskItemBase
    } = Object.create(null);
    protected taskItemList: TaskItemBase[] = [];
    protected static taskItemCls: {
        [key: string]: { new(): TaskItemBase }
    } = Object.create(null);
    public static register(classObj: { new(): TaskItemBase }, key: number) {
        this.taskItemCls[key] = classObj;
    }
    public taskBtnView: TaskBtnView = null;
    public constructor() {
        super();
        //每日任务弹窗

        App.ViewManager.register(ViewConst.TaskView, {
            prefabName: "TaskView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        App.ViewManager.register(ViewConst.TaskBtnView, {
            prefabName: "TaskBtnView",
            parent: LayerManager.UI_Main,
            controller: this
        });
        // App.ViewManager.register(ViewConst.NewbieTaskBtnView, {
        //     prefabName: "NewbieTaskBtnView",
        //     parent: LayerManager.UI_Main,
        //     controller: this
        // });
        // App.ViewManager.register(ViewConst.NewbieTaskView, {
        //     prefabName: "NewbieTaskView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });
        // App.ViewManager.register(ViewConst.NewbieTaskGuide, {
        //     prefabName: "NewbieTaskGuide",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });
        // //App.ViewManager.open(ViewConst.TaskBtnView);
        // App.ViewManager.open(ViewConst.NewbieTaskBtnView);
        // //打开新手任务引导指引
        // App.ViewManager.open(ViewConst.NewbieTaskGuide);
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
        this.setModel(new TaskModel(this));
    }

    public init() {
        this._model.init();
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
        this.bagModel = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.TASK);
        if (isOpen) {
            this.initTask();
        } else {
            App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.onSysOpen, this);
        }
        this.initModuleEvent();
    }
    public destroy() {
        super.destroy();
        for (const item of this.taskItemList) {
            item.onDestroy();
        }
    }
    protected onSysOpen() {
        App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.onSysOpen, this);
        this.initTask();
    }

    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        this.registerFunc(TaskConst.GAIN_TASK_AWARD, this.getEveryDayTaskAward, this);
        this.registerFunc(TaskConst.TOUCH_TASK_BTN_VIEW, this.onTouchTaskBtnView, this);
        // this.registerFunc(TaskConst.ADD_LISTENER, this.addTaskListener, this);
        // this.registerFunc(TaskConst.REMOVE_LISTENER, this.removeTaskListener, this);
        // this.registerFunc(TaskConst.SET_TASK_BTN, this.setTaskBtn, this);
        // this.registerFunc(TaskConst.SET_NEWBIETASK_BTN, this.setNewbieTaskBtn, this);
        // this.registerFunc(TaskConst.NEWBIETASK_GUIDE, this.setNewbieTaskGuide, this);
        // this.registerFunc(TaskConst.CHECK_TASK, this.checkTask, this);
    }
    /**
     * 开始软性引导定时器
     */
    protected startGuideTimer() {
        CC_DEBUG && Log.trace("startGuideTimer");
        App.TimerManager.doTimer(15000, 0, this.showHandGuide, this)
    }
    protected stopGuideTimer() {
        App.TimerManager.remove(this.showHandGuide, this)
    }
    protected showHandGuide() {
        let task = this.taskItemList[0];
        if (this.handGuide) {
            this.handGuide.find(task.conf.location);
        } else {
            App.NodePoolMsr.getHandGuidePool()
                .then((pool) => {
                    if (this.handGuide) {
                        return;
                    }
                    let handGuideNode = pool.pop();;
                    this.handGuide = handGuideNode.getComponent(HandGuide);
                    this.handGuide.find(task.conf.location);
                });
        }
    }

    /**注册全局信息*/
    protected initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        // App.NotificationCenter.addListener(NotificationConst.ADD_ASSIST_LV, this.updateAssist, this);
        // App.NotificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);
    }
    protected handGuide: HandGuide = null;
    /**
     * 点击任务栏
     */
    protected onTouchTaskBtnView() {
        let task = this.taskItemList[0];
        if (task.conf.isDaily) {//每日任务直接打开任务详情页面
            App.ViewManager.open(ViewConst.TaskView, task);
        } else {//如果是新手任务
            // this.applyFunc(TaskConst.GAIN_TASK_AWARD, this.toggle.isChecked);
            if (task.isFinish()) {//如果任务完成,直接领取奖励
                this.getEveryDayTaskAward(false);

                /**新手任务节点统计 */
                Platform.instance.recordTask(task.conf.id);
            } else {
                this.showHandGuide();
            }
        }
    }

    protected showNewbieTaskGuide() {

    }

    /**
     * 领取任务奖励
     * @param isSelect 是否勾选了单选按钮
     */
    protected async getEveryDayTaskAward(isSelect: boolean) {
        let item = this.taskItemList[0];
        let rate = 1;
        if (item.isFinish()) {//任务已经完成
            if (isSelect) {
                let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.TASK);
                if (result) {//观看广告或者分享成功
                    rate = 2;
                } else {
                    return;
                }
            }
        } else {//如果没有完成任务
            if (isSelect) {//勾选了单选按钮,观看广告立刻完成任务
                let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.TASK);
                if (result) {
                    item.data.status = TaskStatus.FINISHED;
                } else {//观看广告或者分享不成功

                    return;
                }
            } else {
                Toast.instance.launch(GameText.getText(lang.task_no_complete));
                return;
            }
        }
        item.getTaskAward();
        let lenth = item.conf.awardList.length;
        for (let i = 0; i < lenth; i++) {
            let itemId = item.conf.awardList[i];
            let itemCnt = item.conf.awardCntList[i];
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, itemId, rate * itemCnt, 3);
        }
        this.taskItemList.sort(this.sort);//对任务重新排序
        this.updateTaskData();
        App.ViewManager.close(ViewConst.TaskView);
        App.NotificationCenter.dispatch(NotificationConst.FINISH_EVERY_DAY_TASK);
        if (!this.taskItemList[0].conf.isDaily && this.taskItemList[0].data.status !== TaskStatus.OVER) {//如果不是每日任务,那边需要将任务激活
            this.taskItemList[0].activeTask();
        }
    }


    protected getDisplayTask() {
        let task = this.taskItemList[0];
        if (task.data.status === TaskStatus.OVER) {
            return null;
        }
        return task;
    }
    /**
     * 完成了某个任务
     */
    public finishTask() {
        this.taskItemList.sort(this.sort);
        this.updateTaskData();

    }

    public updateTaskData() {
        if (this.taskBtnView && this.taskBtnView.isShow()) {
            let task = this.getDisplayTask();
            if (task) {
                if (!task.conf.isDaily && task.conf.isForceGuide) {
                    if (task.isFinish()) {
                        this.stopGuideTimer();
                    } else {
                        this.startGuideTimer();
                    }
                }
                this.taskBtnView.setData(task);
            } else {
                task = this.taskItemList[0];
                if (task.conf.isDaily) {
                    App.ViewManager.close(ViewConst.TaskBtnView);
                } else {//如果不是每日任务,说明是新手任务都完成了,初始化每日任务
                    this.stopGuideTimer();
                    this.initDailyTask();
                }
            }
        }
    }


    protected initDailyTask() {
        this.taskItemList.length = 0;
        if (this._model.data.daily) {
            let taskConfMsr = this._model.conf;
            for (const data of this._model.data.daily) {
                let taskConfData: TaskData = taskConfMsr.getData(data.id);
                let taskItem = new TaskController.taskItemCls[taskConfData.taskType];
                taskItem.init(taskConfData, data);
                taskItem.activeTask();//每日任务默认激活
                taskItem.controller = this;
                this.taskItemList.push(taskItem);
                this.taskItemMap[data.id] = taskItem;
            }
        } else {
            this._model.data.daily = [];
            let taskConfs = this._model.dailyTaskConfs;
            let allTaskId = Object.keys(taskConfs);
            for (let i = 0; i < allTaskId.length; i++) {
                let taskConfData: TaskData = taskConfs[allTaskId[i]];
                if (taskConfData) {
                    let taskItem = new TaskController.taskItemCls[taskConfData.taskType];
                    taskItem.init(taskConfData);
                    taskItem.activeTask();//每日任务默认激活
                    taskItem.controller = this;
                    this.taskItemMap[taskConfData.id] = taskItem;
                    this.taskItemList.push(taskItem);
                    this._model.data.daily.push(taskItem.data);
                }
            }
        }
        this.taskItemList.sort(this.sort);
    }

    /**
     * 初始化每日任务
     */
    protected initTask() {
        let newbieTaskConfs = this._model.newbieTaskConfs;
        for (let i = 0; i < newbieTaskConfs.length; i++) {
            let taskConfData: TaskData = newbieTaskConfs[i];
            let saveData = this._model.data.newbie[taskConfData.id];
            if (!saveData) {
                this._model.data.newbie[taskConfData.id] = saveData = {
                    cnt: 0,
                    status: TaskStatus.UNFINISHED
                }
            }
            if (saveData.status !== TaskStatus.OVER) {
                let taskItem = new TaskController.taskItemCls[taskConfData.taskType];
                taskItem.init(taskConfData, saveData);
                taskItem.controller = this;
                this.taskItemMap[taskConfData.id] = taskItem;
                this.taskItemList.push(taskItem);
            }
        }

        if (this.taskItemList.length === 0) {//任务列表为0,说明新手任务都已经完成
            this.initDailyTask();
        } else {
            this.taskItemList[0].activeTask();//激活第一个新手任务
        }
        App.ViewManager.open(ViewConst.TaskBtnView);
    }

    protected sort(item1: TaskItemBase, item2: TaskItemBase) {
        if (item1.data.status === TaskStatus.FINISHED) {//已经完成的任务排在前面
            return -1;
        }
        if (item1.data.status === TaskStatus.OVER) {//已经领取的任务排在后面
            return 1;
        }
        if (item2.data.status === TaskStatus.FINISHED) {//已经完成的任务排在前面
            return 1;
        }
        if (item2.data.status === TaskStatus.OVER) {//已经领取的任务排在后面
            return -1;
        }
        return item1.conf.sort - item2.conf.sort || item1.conf.id - item2.conf.id;

    }

    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            // case ViewConst.TaskView:
            //     this.setTaskViewData();
            //     break;
            case ViewConst.TaskBtnView:
                this.updateTaskData();
                // this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.UPDATE_TASK_STATE, true);
                break;
            // case ViewConst.NewbieTaskBtnView:
            //     // this.setNewBieShowData(true);
            //     break;
            // case ViewConst.DateView:
            //     this.updateDateView();
            //     break;
            default:
                break;
        }
    }
}