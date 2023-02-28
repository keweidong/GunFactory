import { register } from "../../../../../ConfigManager";
import { CsvDataBase, CsvDataList, DataMsrBase } from "./ConfigClass";
/**
* 特色菜数据管理器
*/
export class FeatureFoodDataMsr extends DataMsrBase<FeatureFoodDataList>{
    constructor() {
        super(FeatureFoodDataList, "FeatureFoodData", "id");
    }
}
export class FeatureFoodDataList extends CsvDataList<FeatureFoodData> {
    constructor() {
        super(FeatureFoodData);
    }
}
/**
* 特色菜配置数据
*/
export class FeatureFoodData extends CsvDataBase {

    /**
     * 给多少秒收益
     */
    readonly moneyRate: number = null;
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
     * 奖励数量
     */
    protected readonly awards: string = null;
    /**
    * 奖励物品id列表
    */
    awardList: number[] = [];
    /** 
     * 奖励物品数量列表
     */
    awardCntList: number[] = [];
    /** 
     * 奖励物品分数区间列表
     */
    scoreList: number[] = [];
    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        let itemIdAndCnt = this.awards.split("|");
        for (let i = 0; i < itemIdAndCnt.length; i++) {
            let temp = itemIdAndCnt[i].split("_");
            this.awardList.push(parseInt(temp[0]));
            this.awardCntList.push(temp[1] ? parseInt(temp[1]) : 1);
            this.scoreList.push(parseInt(temp[2]));
        }
        return result;
    }

}
register(FeatureFoodDataMsr, "FeatureFoodDataMsr");
declare global {
    interface ConfigMap {
        "FeatureFoodDataMsr": FeatureFoodDataMsr;
    }
}