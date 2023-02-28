import { CsvDataBase, CsvDataList, DataMsrBase } from "./ConfigClass";
/**
 * 摊位升级数据
 */
export default class WorkDataManager extends DataMsrBase<WorkDataList> {
    constructor() {
        super(WorkDataList, "kuangdong_lv_config", "kuangDongId");
    }
}
export class WorkDataList extends CsvDataList<WorkData> {
    constructor() {
        super(WorkData);
    }
}
export class WorkData extends CsvDataBase {
    /**
    * ID
    */
    readonly level: number = null;
    /**
    * 名字
    */
    readonly name: string = null;
    /**
    * 获得代币
    */
    readonly getChips: number = null;
    /**
    * 获得代币小数点位置
    */
    readonly getChipsE: number = null;
    /**
    * 升级所需代币
    */
    readonly nextLevelChips: number = null;
    /**
    * 升级所需代币小数点位置
    */
    readonly nextLevelChipsE: number = null;
    /**
    * 挖一次矿的加速倍率
    */
    readonly getChipsTimeRate: number = null;
    /**
    * 荣耀值
    */
    readonly honorPoint: number = null;
    /**
    * 最大接待人数
    */
    readonly maxPersion: number = 1;
    /**
     * 升到这个等级后,获得的物品
     */
    readonly award: number = NaN;
    /**
     * 进店几率
     */
    readonly enterRate: number = 0;
}
