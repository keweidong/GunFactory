import { NotificationConst } from "../../../consts/NotificationConst";
import { TASK_KIND } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskItemBase } from "./TaskItemBase";
/**
 * 完成{0}个每日任务
 */
export class ReceiveLuckyBag extends TaskItemBase {

    protected listerEventName: string = NotificationConst.RECEIVE_LUCKY_BAG;
}
TaskController.register(ReceiveLuckyBag, TASK_KIND.RECEIVE_LUCKY_BAG);