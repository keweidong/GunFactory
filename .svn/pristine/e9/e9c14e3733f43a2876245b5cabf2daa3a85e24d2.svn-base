import BaseWorkZoneAttr from "../../base/BaseWorkZoneAttr";
import { GuestData } from "../../config/GuestDataMsr";

export default class GuestAttr extends BaseWorkZoneAttr {
    /**等级数据 */
    levelData: GuestData = null;

    /**
     * 速度倍率
     */
    rate: number = null;

    baseTime: number = 10000;

    createCustomerTime: number = 100000;

    calFinalAttr() {
        this.rate = this.levelData.rate;
        this.createCustomerTime = this.baseTime * 100 / (100 + this.rate) / this.buffList.CUSTOMER_CREATE_TIME;
        // this.rate = 100 / (100 + this.levelData.rate);
    }
}