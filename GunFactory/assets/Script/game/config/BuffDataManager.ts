import { CsvDataBase } from "../../core/config/CsvDataBase";
import DataMsrBase from "../../core/config/DataMsrBase";
import { register } from "../ConfigManager";


/**
 * buff配置表
 */
export class BuffDataManager extends DataMsrBase<BuffConfig>{
    // protected groupDatas: { [id: number]: AssistData[] } = {};
    protected count = 0;
    constructor() {
        super(BuffConfig, "buff_data", "buff_index");
    }

    public getType(buffIndex) {
        cc.log("buffIndex.....", buffIndex);
        return this.getData(buffIndex).buff_type;
    }
}

export class BuffConfig extends CsvDataBase {
    /**
    * buff_index
    */
    readonly buff_index: number = null;
    /**
    * 描述
    */
    readonly desc: string = null;
    /**
    * buff_type
    */
    buff_type: string = null;
    // public $parseData(lines: string[], typeList: string[], keyList: string[]) {
    //     let result = super.$parseData(lines, typeList, keyList);
    //     // this.buff_type = BUFF_TYPE[this.buff_type];
    //     return result;
    // }
}
register(BuffDataManager, "BuffDataManager")
declare global {
    interface ConfigMap {
        "BuffDataManager": BuffDataManager;
    }
}