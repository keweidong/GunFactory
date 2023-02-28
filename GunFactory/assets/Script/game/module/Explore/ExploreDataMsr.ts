import DataMsrBase from "../../../core/config/DataMsrBase";
import { CsvDataBase } from "../../../core/config/CsvDataBase";
import { register } from "../../ConfigManager";

/**
 * 探索引导Msr
 */
export class ExploreguidDataMsr extends DataMsrBase<ExploreGuidData>
{
    constructor() {
        super(ExploreGuidData, "ExploreguidData", "id");
    }
}
/**
 * 探索Data
 */
export class ExploreGuidData extends CsvDataBase {

    /**
     * id
     */
    readonly id: number;
    /**
     * 类型
     */
    readonly type: number;
    /**
     * 引导的按钮描述
     */
    readonly btnDes: string;
    /**
     * 
     */
    readonly index: number;
    /**
     * 
     */
    readonly des: string;
    /**
     * 图片
     */
    readonly icon: string;

}

/**
 * 探索引导Msr
 */
export class ExploreAwardDataMsr extends DataMsrBase<ExploreAwardData>
{
    constructor() {
        super(ExploreAwardData, "ExploreAwardData", "id");
    }
}
/**
 * 探索奖励
 */
export class ExploreAwardData extends CsvDataBase {

    /**
     * id
     */
    readonly id: number;
    /**
     * 类型
     */
    readonly type: number;
    /**
     * 引导的按钮描述
     */
    readonly btnDes: string;
    /**
     * 
     */
    readonly index: number;
    /**
     * 
     */
    readonly des: string;
    /**
     * 图片
     */
    readonly icon: string;
    /**
     * 权重
     */
    readonly weiht: number;
    /**
     * 参数
     */
    param1: number
    /**
     * 对应的物品表
     */
    itemid: number;
}
/**
 * 探索权重Msr
 */
export class ExploreWeightDataMsr extends DataMsrBase<ExploreWeightData>
{
    constructor() {
        super(ExploreWeightData, "ExploreWeightData", "id");
    }
}
/**
 * 探索权重
 */
export class ExploreWeightData extends CsvDataBase {

    /** id */
    public readonly id: number;

    /** 是否免费 */
    public readonly isFree: number;

    /** 权重 */
    public readonly weight: string;

    public weightList: number[] = [];

    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);

        let temp = this.weight.split("|");
        for (let i = 0; i < temp.length; i++) {
            this.weightList.push(parseInt(temp[i]));
        }

        return result;
    }

    public getTotalWeight() {
        let total = 0;
        this.weightList.forEach(value => {
            total += value;
        })
        return total;
    }

}

register(ExploreAwardDataMsr, "ExploreAwardDataMsr");
register(ExploreguidDataMsr, "ExploreguidDataMsr");
register(ExploreWeightDataMsr, "ExploreWeightDataMsr");
declare global {
    interface ConfigMap {
        "ExploreguidDataMsr": ExploreguidDataMsr;
        "ExploreAwardDataMsr": ExploreAwardDataMsr;
        "ExploreWeightDataMsr": ExploreWeightDataMsr;
    }
}