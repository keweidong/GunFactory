import BaseWorkZoneAttr from "../../base/BaseWorkZoneAttr";
import { ChefLevelData } from "../../config/ChefDataMsr";

export default class ChefAttr extends BaseWorkZoneAttr {
    /**等级数据 */
    levelData: ChefLevelData = null;
    /**各种加成后的最终制作时间 */
    cookTime: number = 1000;
    /**基础制作时间 */
    baseTime: number = 10000;
    /**
     * 厨师数量
     */
    cnt: number = 0;
    /**
     * 速度倍率
     */
    rate: number = null;
    calFinalAttr() {
        this.cnt = this.levelData.cnt;
        this.rate = this.levelData.rate;
        this.cookTime = this.baseTime * 100 / (this.levelData.rate + 100) / this.buffList.COOK_SPEED;
    }
}