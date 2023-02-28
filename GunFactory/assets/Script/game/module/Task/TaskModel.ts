import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
import TaskDataManager, { TaskData } from "./TaskDataManager";
export class TaskModel extends BaseModel implements IMemento {
    public conf: TaskDataManager = null;
    public data: TaskSaveData = null;
    /**每日任务配置数据列表 */
    public dailyTaskConfs: TaskData[] = [];
    /**新手任务数据配置列表 */
    public newbieTaskConfs: TaskData[] = [];

    public constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, "TaskData", false, true);
    }
    public init() {
        this.conf = App.ConfigManager.getConfig("TaskDataManager");
        App.SaveManage.load("TaskData");
        let taskConfs = this.conf.getAllDatas();
        for (const key in taskConfs) {
            let taskData = taskConfs[key];
            if (taskData.isDaily) {
                this.dailyTaskConfs.push(taskData);
            } else {
                this.newbieTaskConfs.push(taskData);
            }
        }
    }
    /**
     * 刷新每日任务
     * @param key 
     * @param day 
     */
    public updateDayData(key: string, day: number) {
        this.data.daily = null;
    }

    public setMemento(data?: TaskSaveData) {
        if (data) {
            this.data = data;
        }
        else {
            this.data = {
                daily: null,
                newbie: {}
            }
        }
    }

    public createMemento(): TaskSaveData {
        return this.data;
    }
}