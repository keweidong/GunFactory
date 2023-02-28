import BaseWorkZoneAttr from "../base/BaseWorkZoneAttr";
import { FoodLevelData } from "../config/FoodDataMsr";


export default class FoodAttr extends BaseWorkZoneAttr {
    /**等级数据 */
    levelData: FoodLevelData = null;
    /**
     * 出售价格
     */
    sellCoin: number = 0;
    /**
     * 计算最终属性
     */
    calFinalAttr() {
        this.sellCoin = this.levelData.sellCoin;
    }
}