import { NotificationConst } from "../../../consts/NotificationConst";
import { TASK_KIND } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskItemBase } from "./TaskItemBase";
/**
 * 完成{0}个每日任务
 */
export class FinishTask extends TaskItemBase {

    protected listerEventName: string = NotificationConst.FINISH_EVERY_DAY_TASK;
}
TaskController.register(FinishTask, TASK_KIND.FINISH_TASK);