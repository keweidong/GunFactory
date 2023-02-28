export enum TASK_KIND {
    /**
     * 完成{0}个每日任务
     */
    FINISH_TASK = 0,
    /**
    * 升级{0}次任意菜式
    */
    UPGRADE_FOOD = 1,
    /**
    * 升级{0}次宣传技能
    */
    UPGRADE_GUEST = 2,
    /**
    *升级{0}次厨师速度
    */
    UPGRADE_CHEF = 3,
    /**
    * 升级{0}次服务员速度
    */
    UPGRADE_WATIER = 4,
    /**
    * 招待{0}个普通食客
    */
    SERVE_NORMAL_GUEST = 5,
    /**
    * 领取{0}次福袋奖励
    */
    RECEIVE_LUCKY_BAG = 6,
    /**
    * 招待{0}个大胃王
    */
    SERVE_BIG_STOMACH_KING = 7,
    /**
     * 完成{0}次欢乐时光
     */
    HAPPY_TIME = 8,
    /**
    * 
    */
    UNLOCK_TABLE = 8,

}


export enum TaskStatus {
    /**已完成（待领取）*/
    FINISHED = 0,
    /**做任务（未完成）*/
    UNFINISHED = 1,
    /**已领取*/
    OVER = 2,
}


export const enum TaskConst {

    /**
     * 领取任务奖励
    */
    GAIN_TASK_AWARD,

    //未完成新手任务指引
    NEWBIETASK_GUIDE,
    /** 每日任务指引 */
    TASK_GUIDE,
    /**
     * 点击任务框
     */
    TOUCH_TASK_BTN_VIEW,

    // /** 检测每日任务红点 */
    // CHECK_TASK_RED_POINT,
    /** 获取日程红点 */
    GET_DATE_RED,
    /** 获取每日任务红点 */
    GET_TASK_RED,
}
declare global {

    /** 每日任务存档数据 */
    interface EveryDayTaskSaveData {
        /**任务id*/
        id?: number;
        /**当前任务已经完成数量*/
        cnt: number;
        /**任务状态*/
        status: TaskStatus;
    }

    /** 每日任务展示数据 */
    interface EveryDayTaskItem {
        /** 任务id*/
        id: number;
        taskType: number;
        /** 任务描述 */
        taskDesc: string;
        /** 任务进度 */
        taskPro: string;
        /** 任务进度 */
        curPro: number;
        maxPro: number;
        /**任务奖励类型*/
        awardType?: number[];
        /**任务奖励数量*/
        awardNumber: number[];
        /** 任务状态*/
        taskSatus: TaskStatus;
        /** 奖励倍率 */
        awardRate: number,
        idleMoneyRate: MyBigLong,
        isFinish: boolean,
    }

    /** 任务奖励数据 */
    interface TaskAwardData {
        id: number;
        /**任务奖励类型*/
        awardType?: number[];
        /**任务奖励数量*/
        awardNumber: number[];
        /** taskType */
        taskType: number;
        /** 奖励倍率 */
        awardRate?: number,
        /**  */
        idleMoneyRate: MyBigLong,
    }
    type TaskSaveData = {
        /**每日任务存档数据 */
        daily?: EveryDayTaskSaveData[];
        /**新手任务存档数据 */
        newbie?: { [taskId: number]: EveryDayTaskSaveData };
    };
}