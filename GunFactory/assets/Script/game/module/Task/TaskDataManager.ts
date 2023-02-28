
import { CsvDataBase, DataMsrBase, register } from "../GameMain/object/scene/config/ConfigClass";



/** 
    *每日任务配置表
*/
export default class TaskDataManager extends DataMsrBase<TaskData>{
    constructor() {
        super(TaskData, "task");
    }
}

/**
 * 
*/
export class TaskData extends CsvDataBase {
    /**
    * ID
    */
    readonly id: number = null;
    /**
    * 名字
    */
    readonly desc: string = null;

    /**
    * 任务类型
    */
    readonly taskType: number = null;
    /**
    * 完成参数
    */
    readonly param: number = null;

    /**
     * 用于排序
     */
    readonly sort: number = 0;
    /**
     * 是否每日任务, 1表示每日任务,0表示新手任务
     */
    readonly isDaily: number = null;

    /** 
    *任务所属系统
    */
    readonly function_module: number = null;

    /**
     * 未完成指引的地方
    */
    readonly location: string = null;
    /**
     * 奖励数量
     */
    protected readonly awards: string = null;

    /**
     * 是否开放
     */
    readonly isOpen: number = null;
    /**
     * 奖励物品id列表
     */
    awardList: number[] = [];
    /** 
     * 奖励物品数量列表
     */
    awardCntList: number[] = [];
    /**
    * 参数0
    */
    readonly arg0: number = null;
    /**
     * 参数1
     */
    readonly args1: number = null;
    /**
     * 是否一直显示软性引导,如果这个值设置了,并且不是0,那么每隔一段时间都会自动弹出引导的手指
     */
    readonly isForceGuide: number = 0;

    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        let itemIdAndCnt = this.awards.split("|");
        for (let i = 0; i < itemIdAndCnt.length; i++) {
            let temp = itemIdAndCnt[i].split("_");
            this.awardList.push(parseInt(temp[0]));
            this.awardCntList.push(temp[1] ? parseInt(temp[1]) : 1);
        }
        return result;
    }
}
register(TaskDataManager, "TaskDataManager");
declare global {
    interface ConfigMap {
        /**任务数据 */
        "TaskDataManager": TaskDataManager;
    }
}