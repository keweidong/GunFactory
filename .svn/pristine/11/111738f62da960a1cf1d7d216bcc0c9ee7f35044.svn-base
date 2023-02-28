import { register } from "../../../../../ConfigManager";
import { BaseWorkLevelData } from "../base/BaseWorkZone";
import { CsvDataBase, CsvDataList, DataMsrBase } from "./ConfigClass";

/**
* 服务员数据管理器
*/
export class WaiterDataMsr extends DataMsrBase<WaiterData>{
    constructor() {
        super(WaiterData, "WaiterData", "id");
    }
}
/**
* 服务员数据
*/
export class WaiterData extends CsvDataBase {
    /** 
     * 名字
     */
    readonly name: string = "";
    /**
     * Ai配置
     */
    readonly aiFile: string = "";
    /**
     * 基础速度
     */
    readonly speed: number = 6;
}

/**
 * 服务员升级数据管理器
 */
export class WaiterLevelDataMsr extends DataMsrBase<WaiterDataList>{
    constructor() {
        super(WaiterDataList, "WaiterLevelData", "id");
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
export class WaiterDataList extends CsvDataList<WaiterLevelData> {

    constructor() {
        super(WaiterLevelData);
    }
    public createAwardLevel() {
        let cnt = this.datas[0].cnt;
        this.awardLevel[0] = 0;
        let arrLen = this.datas.length;
        for (let i = 1; i < arrLen; i++) {
            let data = this.datas[i];
            if (cnt !== data.cnt) {
                cnt = data.cnt;
                this.awardLevel.push(i);
            }
        }
        this.awardLevel.push(this.datas.length);
    }
}
/**
 * 服务员等级数据
 */
export class WaiterLevelData extends CsvDataBase implements BaseWorkLevelData {
    /**
     * id
     */
    readonly id: number = null;
    /**
     * 升级所需代币
     */
    readonly nextLevelChips: number = null;
    /**
     * 名字
     */
    readonly name: string = null;
    /**
    * 区域id
    */
    readonly sceneId: number = null;
    /**
    * 图标id
    */
    readonly icon: number = null;
    /**
    * 服务员数量
    */
    readonly cnt: number = null;
    /**
     * 速度倍率
     */
    readonly rate: number = null;
    /**
     * 解锁服务员朋友圈所对应的id
     * 
     */
    readonly friendid: number = null;
}

register(WaiterDataMsr, "WaiterDataMsr");
register(WaiterLevelDataMsr, "WaiterLevelDataMsr");
declare global {
    interface ConfigMap {
        "WaiterLevelDataMsr": WaiterLevelDataMsr;
        "WaiterDataMsr": WaiterDataMsr;
    }
    enum ConfigEnum {
        WaiterLevelDataMsr = "WaiterLevelDataMsr"
    }
}