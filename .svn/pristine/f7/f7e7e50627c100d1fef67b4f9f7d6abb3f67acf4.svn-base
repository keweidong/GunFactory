import HappyController from "../../Happy/HappyController";
import { TASK_KIND } from "../TaskConst";
import TaskController from "../TaskController";
import { TaskItemBase } from "./TaskItemBase";
/**
 * 开启{0}次欢乐时光
 */
export class HappyTime extends TaskItemBase {

    protected listerEventName: string = HappyController.START_HAPPY_TIME;
}
TaskController.register(HappyTime, TASK_KIND.HAPPY_TIME);