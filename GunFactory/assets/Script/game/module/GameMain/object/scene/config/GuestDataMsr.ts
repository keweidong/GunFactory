import { register } from "../../../../../ConfigManager";
import { BaseWorkLevelData } from "../base/BaseWorkZone";
import { CsvDataBase, CsvDataList, DataMsrBase } from "./ConfigClass";
/**
* 宣传升级数据管理器
*/
export class GuestDataMsr extends DataMsrBase<GuestDataList>{
    constructor() {
        super(GuestDataList, "GuestData", "id");
    }
    public async load() {
        await super.load();
        let datas = this.getAllDatas();
        for (const key in datas) {
            let data = datas[key];
            data.createAwardLevel();
        }
    }
}
export class GuestDataList extends CsvDataList<GuestData> {
    constructor() {
        super(GuestData);
    }
    public createAwardLevel() {
        this.awardLevel.push(0);
        this.awardLevel.push(this.datas.length);
    }

}
/**
* 宣传升级数据
*/
export class GuestData extends CsvDataBase implements BaseWorkLevelData {
    /**
     * 升级所需代币
     */
    readonly nextLevelChips: number = null;

    /**
     * 速度倍率
     */
    readonly rate: number = null;
}

register(GuestDataMsr, "GuestDataMsr");
declare global {
    interface ConfigMap {
        "GuestDataMsr": GuestDataMsr;
    }
}