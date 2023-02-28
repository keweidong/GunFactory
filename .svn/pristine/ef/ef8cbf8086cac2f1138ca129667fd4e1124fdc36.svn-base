import DataMsrBase from "../../../core/config/DataMsrBase";
import { CsvDataBase } from "../../../core/config/CsvDataBase";



/**
 * 广告点配置表
 */
export class LuckDataManager extends DataMsrBase<LuckData>{
    constructor() {
        super(LuckData, "luck_data", "index");
    }

    /** 获取权重列表 */
    public getProbList(index: number): number[] {
        let proList: number[] = [];
        for (let i = index + 1; i <= index + 6; i++) {
            let num = i % this.dataCnt;
            let data = this.getData(num);
            if (proList.length > 0)
                var prob = proList[proList.length - 1] + data.prob;
            else
                var prob = data.prob;
            proList.push(prob);
        }
        return proList;
    }
}

export class LuckData extends CsvDataBase {
    /**
     * index
     */
    readonly index: number = null;
    /**
    * 类型
    */
    readonly awardType: number = null;
    /**
    * 参数1
    */
    readonly param: number = null;
    /**
     * 权重
     */
    readonly prob: number = null;
}

/**
 * 广告点配置表
 */
export class LuckCostDataManager extends DataMsrBase<FoodCostData>{
    constructor() {
        super(FoodCostData, "luck_cost_data", "index");
    }

}

export class FoodCostData extends CsvDataBase {
    /**
     * 消耗类型
     */
    readonly costType: number = null;
    /**
    * 消耗数量
    */
    readonly costValue: number = null;
    /**
    * 上限次数
    */
    readonly maxNum: number = null;
    /**
    * 回复时间
    */
    readonly cdTime: number = null;
    /**
    * 奖励倍率
    */
    readonly rate: number = null;
}