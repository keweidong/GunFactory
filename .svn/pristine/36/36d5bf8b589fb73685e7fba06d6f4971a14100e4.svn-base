
import { GameNotificationConst } from "../../../consts/NotificationConst";
import { TASK_KIND } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskItemBase } from "./TaskItemBase";
/**
 * 招待{0}个普通食客
 */
export class ServerNormalGuest extends TaskItemBase {
    protected listerEventName: string = GameNotificationConst.CUSTOMER_EAT_FINISH;
}
TaskController.register(ServerNormalGuest, TASK_KIND.SERVE_NORMAL_GUEST);