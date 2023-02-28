import { register } from "../../../../../ConfigManager";
import { CsvDataBase, CsvDataList, DataMsrBase } from "./ConfigClass";
/**
* 桌子配置数据管理器
*/
export class TableDataMsr extends DataMsrBase<TableDataList>{
    constructor() {
        super(TableDataList, "TableData", "id");
    }
}
export class TableDataList extends CsvDataList<TableData> {
    constructor() {
        super(TableData);
    }
}
/**
* 桌子配置数据
*/
export class TableData extends CsvDataBase {
    /**
     * id
     */
    readonly id: number = null;
    /**
     * 解锁所需代币
     */
    readonly unlockChips: number = null;
    /**
     * 出售价格
     */
    readonly sellCoin: number = null;
    /**
    * 区域id
    */
    readonly sceneId: number = null;
    /**
    * 图标id
    */
    readonly icon: number = null;
    /**
    * 能否通过广告解锁 0 不可以 1 可以
    */
    readonly canAdUnlock: number = 0;

}
register(TableDataMsr, "TableDataMsr");
declare global {
    interface ConfigMap {
        "TableDataMsr": TableDataMsr;
    }
}