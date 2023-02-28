import { CsvDataBase } from "../../../core/config/CsvDataBase";
import DataMsrBase from "../../../core/config/DataMsrBase";
import { register } from "../../ConfigManager";
/**七天签到配置表*/
export default class SevenDaysDataManager extends DataMsrBase<SevenDaysData> {
    constructor() {
        super(SevenDaysData, "sevenDays");
    }
}

//
export class SevenDaysData extends CsvDataBase {
    /**
     * ID
     */
    readonly id: number = null;
    /**
     * 名字
     */
    readonly name: string = null;
    /**
     * 奖励类型
     */
    readonly awardType: number = null;
    /**
     * 奖励物品id
     */
    readonly itemId: number = null;
    /**
     *参数0
     */
    readonly arg0: number = null;
    /**
     *参数1
    */
    readonly arg1: number = null;
    /**
     *参数2
    */
    readonly arg2: number = null;
    /**
     *参数3
    */
    readonly arg3: number = null;
}


register(SevenDaysDataManager, "SevenDaysDataManager");
declare global {
    interface ConfigMap {
        /**广告配置 */
        "SevenDaysDataManager": SevenDaysDataManager;
    }
}