import BaseWorkZoneAttr from "../../base/BaseWorkZoneAttr";
import { WaiterLevelData } from "../../config/WaiterDataMsr";

export default class WaiterAttr extends BaseWorkZoneAttr {
    /**等级数据 */
    levelData: WaiterLevelData = null;
    /**
     * 服务员数量
     */
    cnt: number = 0;

    speed: number = 4;

    baseSpeed: number = 5;

    /**
     * 速度倍率
     */
    rate: number = null;
    calFinalAttr() {
        this.cnt = this.levelData.cnt;
        this.rate = this.levelData.rate;
        this.speed = (this.levelData.rate + 100) / 100 * this.baseSpeed * this.buffList.WAITER_SPEED;
    }
}