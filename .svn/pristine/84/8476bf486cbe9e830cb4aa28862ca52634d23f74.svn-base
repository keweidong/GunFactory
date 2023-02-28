import { register } from "../../../../../ConfigManager";
import { CsvDataBase, DataMsrBase } from "./ConfigClass";

/**
 * 顾客数据配置表
 */
export class StarDataMsr extends DataMsrBase<StarData>{
    protected count = 0;
    constructor() {
        super(StarData, "star_data", "id");
    }
}

export class StarData extends CsvDataBase {
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
     * 总共吃多少菜
     */
    readonly eatCnt: number = 20;
    /**
     * 菜式价格加成倍率
     */
    readonly rate: number = 20;
    /**
     * 解锁场景
     */
    readonly scenceId: number = 0;
    /**
    * 解锁宣传等级
    */
    readonly unlockguest: number = 0;
    /**
     * 解锁的描述
     *  */
    readonly unlockdec: string = "";
}
register(StarDataMsr, "StarDataMsr");
declare global {
    interface ConfigMap {
        "StarDataMsr": StarDataMsr;
    }
}