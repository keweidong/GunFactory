import { GameNotificationConst } from "../../../consts/NotificationConst";
import { TASK_KIND } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskItemBase } from "./TaskItemBase";
/**
 * 升级{0}次任意普通菜式
 */
export class UpgradeFood extends TaskItemBase {
    protected listerEventName: string = GameNotificationConst.UPGRADE_FOOD;
    public listerCb(foodIndex: number, levelCnt: number) {
        this.addTaskCnt(levelCnt);
    }
}
TaskController.register(UpgradeFood, TASK_KIND.UPGRADE_FOOD);