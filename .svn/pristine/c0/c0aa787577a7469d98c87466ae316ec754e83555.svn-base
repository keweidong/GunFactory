import App from "../../../../core/App";
import { GameText } from "../../../../core/lang/GameText";
import { ItemBase } from "../../bag/ItemBase";
import { TaskStatus } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskData } from "../TaskDataManager";

export class TaskItemBase {
    /**
     * 需要监听的事件
     */
    protected listerEventName: string = null;
    public controller: TaskController = null;
    public conf: TaskData = null;
    public data: EveryDayTaskSaveData = null;
    protected _awardList: {
        /**
         * 奖励的物品数量
         */
        cnt: number;
        item: ItemBase
    }[] = [];
    /**
     * 获取奖励物品列表
     */
    public getAwardList() {
        if (this._awardList.length === 0) {
            let arrLen = this.conf.awardList.length;
            for (let i = 0; i < arrLen; i++) {
                this._awardList.push({
                    cnt: this.conf.awardCntList[i],
                    item: this.controller.bagModel.itmes[this.conf.awardList[i]]
                });
            }
        }
        return this._awardList;
    }

    public init(conf: TaskData, data?: EveryDayTaskSaveData) {
        this.conf = conf;
        if (data) {
            this.data = data;
        } else {
            this.data = {
                /**任务id*/
                id: conf.id,
                /**当前任务已经完成数量*/
                cnt: 0,
                /**任务状态*/
                status: TaskStatus.UNFINISHED
            }
        }

    }
    /**
     * 激活任务,激活后的任务才会去监听对应的事件,
     * 并且不激活的任务无法完成
     */
    public activeTask() {
        if (this.listerEventName && this.data.status === TaskStatus.UNFINISHED) {
            App.NotificationCenter.addListener(this.listerEventName, this.listerCb, this);
        }
    }
    public onDestroy() {
        App.NotificationCenter.removeListener(this.listerEventName, this.listerCb, this);
    }

    /**
     * 获取任务描述
     */
    public getDesc() {
        return GameText.getTextByStr(this.conf.desc).format(this.conf.param);
    }
    public isFinish() {
        return this.data.status === TaskStatus.FINISHED;
    }
    /**
     * 增加任务完成度
     * @param cnt 
     */
    public addTaskCnt(cnt: number) {
        this.data.cnt += cnt;
        if (this.data.cnt >= this.conf.param) {//任务完成
            this.finishTask();
        } else {
            this.controller.updateTaskData();
        }
    }
    public listerCb(...args) {
        this.addTaskCnt(1);
    }
    public finishTask() {
        this.data.status = TaskStatus.FINISHED;
        if (this.listerEventName) {//任务完成,移除监听
            App.NotificationCenter.removeListener(this.listerEventName, this.listerCb, this);
        }
        this.controller.finishTask();
    }
    /**
     * 领取任务奖励
     * @param id 任务id
     */
    public getTaskAward() {
        if (this.data.status === TaskStatus.FINISHED) {
            // this.data.yetTaskNumber = this.conf.param;
            this.data.status = TaskStatus.OVER;
            // App.NotificationCenter.dispatch(NotificationConst.FINISH_EVERY_DAY_TASK, this);
        }
    }
}