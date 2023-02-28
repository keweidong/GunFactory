import { GameNotificationConst } from "../../../consts/NotificationConst";
import ScenegZone from "../../GameMain/object/scene/SceneZone";
import { TASK_KIND } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskData } from "../TaskDataManager";
import { TaskItemBase } from "./TaskItemBase";
/**
 * 升级某个技能
 * 升级类型 0 员工, 1 厨师, 2 宣传
 * 
 * args0 哪个场景  如果不填表示任意一个场景
 */
export class UpgradeSkill extends TaskItemBase {
    /**
     * 升级类型 0 员工, 1 厨师, 2 宣传
     */
    protected type: number = 0;
    protected listerEventName: string = GameNotificationConst.UPGRADE_SKILL;
    public init(conf: TaskData, data?: EveryDayTaskSaveData) {
        super.init(conf, data);
        if (this.conf.taskType === TASK_KIND.UPGRADE_GUEST) {
            this.type = 2;
        } else if (this.conf.taskType === TASK_KIND.UPGRADE_CHEF) {
            this.type = 1;
        } else if (this.conf.taskType === TASK_KIND.UPGRADE_WATIER) {
            this.type = 0;
        }
    }
    /**
     * 请求升级
     * @param type 请求升级类型 0 员工, 1 厨师, 2 宣传
     * @param levelCnt 升多少级
     */
    public listerCb(type: number, levelCnt: number = 1) {
        if (type === this.type) {
            if (this.checkIsFinish()) {
                return;
            }
            this.addTaskCnt(levelCnt);
        }
    }
    protected getMgr(scene: ScenegZone) {
        if (this.conf.taskType === TASK_KIND.UPGRADE_GUEST) {
            return scene.guestMsr;
        } else if (this.conf.taskType === TASK_KIND.UPGRADE_CHEF) {
            return scene.chefMsr;
        } else if (this.conf.taskType === TASK_KIND.UPGRADE_WATIER) {
            return scene.waiterMsr;
        }
    }
    public activeTask() {
        super.activeTask();
        this.checkIsFinish();
    }

    public checkIsFinish() {
        if (!isNaN(this.conf.arg0)) {
            let scene = this.controller.world.sceneMgr.allOpenScene[this.conf.arg0];
            if (scene) {
                let mgr = this.getMgr(scene);
                this.data.cnt = mgr.attrObj.level + 1;
                if (mgr.attrObj.level >= this.conf.param - 1) {
                    this.finishTask();
                } else {
                    this.controller.updateTaskData();
                }
            }
            return true;
        }
        return false;
    }
}
TaskController.register(UpgradeSkill, TASK_KIND.UPGRADE_GUEST);
TaskController.register(UpgradeSkill, TASK_KIND.UPGRADE_CHEF);
TaskController.register(UpgradeSkill, TASK_KIND.UPGRADE_WATIER);