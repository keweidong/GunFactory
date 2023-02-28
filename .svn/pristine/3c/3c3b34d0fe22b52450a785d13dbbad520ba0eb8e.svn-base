import { CsvDataBase } from "../../core/config/CsvDataBase";
import DataMsrBase from "../../core/config/DataMsrBase";
import { register } from "../ConfigManager";
/**
 * 广告点配置表
 */
export class AdDataManager extends DataMsrBase<AdData>{
    constructor() {
        super(AdData, "ad_data", "id");
    }
}

export class AdData extends CsvDataBase {
    public id: number = null;
    public name: string = null;
    /**
     * 可观看广告次数
     */
    public adTimes: number = null;
    /**
     * 可分享次数
     */
    public shareTimes: number = null;
    /**
     * 可使用超级现金购买次数
     */
    public superCashTimes: number = null;
    /**
     * 可使用充值购买次数
     */
    public payTimes: number = null;
    /**
     * 优先广告还是优先分享
     */
    public type: number = null;
    public price: number = null;
    public totalTimes: number = null;
    public freeCnt: number = null;
    /**
     * 是否每天清空
     */
    public isDayClear: number = null;
}

register(AdDataManager, "AdDataManager");
declare global {
    interface ConfigMap {
        /**广告配置 */
        "AdDataManager": AdDataManager;
    }
}
