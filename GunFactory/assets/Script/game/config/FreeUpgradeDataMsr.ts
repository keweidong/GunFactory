import { CsvDataBase } from "../../core/config/CsvDataBase";
import DataMsrBase from "../../core/config/DataMsrBase";
import { register } from "../ConfigManager";
/**免费升级配置表*/
export default class FreeUpgradeDataMsr extends DataMsrBase<FreeUpgradeData> {
    constructor() {
        super(FreeUpgradeData, "FreeUpgrade");
    }
}

//
export class FreeUpgradeData extends CsvDataBase {
    /**
       * 金钱充足点击次数
       */
    readonly enoughCnt: number = null;
    /**
     * 金钱充足的点击间隔
     */
    readonly enoughPaddingTime: number = null;
    /**
     * 金钱不足需要点击次数
     */
    readonly notEnoughCnt: number = null;
    /**
     * 金钱不足的点击间隔
     */
    readonly noEnoughPaddingTime: number = null;
    /**
     * 广告存在时间
     */
    readonly existTime: number = null;
    /**
     * 玩家等级多少级的时候开放功能
     */
    readonly openLevel: number = null;
    /**
     * 免费升多少级
     */
    readonly upgradeCnt: number = null;
}


register(FreeUpgradeDataMsr, "FreeUpgradeDataMsr");
declare global {
    interface ConfigMap {
        /**广告配置 */
        "FreeUpgradeDataMsr": FreeUpgradeDataMsr;
    }
}