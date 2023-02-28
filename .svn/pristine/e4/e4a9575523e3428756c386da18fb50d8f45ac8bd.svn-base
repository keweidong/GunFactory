import { register } from "../../../../../ConfigManager";
import { CsvDataBase, DataMsrBase } from "./ConfigClass";

/**
 * 顾客数据配置表
 */
export class CustomerDataMsr extends DataMsrBase<CustomerData>{
    protected count = 0;
    constructor() {
        super(CustomerData, "customer_data", "id");
    }
}

export class CustomerData extends CsvDataBase {
    /**
    * id
    */
    readonly id: number = 0;
    /** 
     * 名字
     */
    readonly name: string = "";
    /**
     * Ai配置
     */
    readonly aiFile: string = "";
    /**
     * 
     */
    readonly modelId: number = 1;
    /**
     * 移动速度
     */
    readonly speed: number = 5;
    /**
     * 模型
     */
    readonly atlasAsset: string = "";
    /**
     * 愤怒时间,等待多久会进入愤怒状态
     */
    readonly angryTime?: number = 10000;
    readonly unlockScene:number = 0;
}
register(CustomerDataMsr, "CustomerDataMsr");
declare global {
    interface ConfigMap {
        "CustomerDataMsr": CustomerDataMsr;
    }
}