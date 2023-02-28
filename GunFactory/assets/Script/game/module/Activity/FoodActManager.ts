import { CsvDataBase } from "../../../core/config/CsvDataBase";
import DataMsrBase from "../../../core/config/DataMsrBase";
import { register } from "../../ConfigManager";

/**
 * 厨神活动分数段配置表
 */
export class FoodActScoreManager extends DataMsrBase<FoodActScoreData>{
    
    constructor() {
        super(FoodActScoreData, "food_act_score_data", "index");
    }
    
    public getProList(index: number){
        let data = this.getData(index);
        if(!data.scoreProList){
            data.scoreProList = [];
            let str = data.scorePro;
            let arr = str.split('|');
            let len = arr.length;
            for(let i = 0; i < len; i++){
                data.scoreProList.push(parseInt(arr[i]));
            }
        }
        return data.scoreProList;
    }

    public getSubList(index: number){
        let data = this.getData(index);
        if(!data.scoreSubList){
            data.scoreSubList = [];
            let str = data.scroeSub;
            let arr = str.split('|');
            let len = arr.length;
            for(let i = 0; i < len; i++){
                data.scoreSubList.push(parseInt(arr[i]));
            }
        }
        return data.scoreSubList;
    }

    public getScore(index: number, pro: number): number{
        CC_DEBUG && Log.trace('pro:', pro);
        
        let proList = this.getProList(index);
        let subList = this.getSubList(index);
        let len = proList.length;
        let prePro = 0;
        let endPro = 0;
        for(let i = 0; i < len; i++){
            let temp = proList[i];
            if(pro > temp){
                prePro = i;
            }else{
                endPro = i;
                break;
            }
        }
        let sub1 = subList[prePro];
        let sub2 = subList[endPro];
        let score = sub1 + (sub2 - sub1) * (pro - proList[prePro]) / (proList[endPro] - proList[prePro]);
        score = Math.round(score);
        return score;
    }
}

export class FoodActScoreData extends CsvDataBase{
    /**
    * 大赛步骤
    */
    readonly index: number = null;
    /**
    * 分数占比
    */
    readonly scorePro: string = null;
    /**
    * 分数分段
    */
    readonly scroeSub: string = null;
    /**
    * 箭头滑动时间
    */
    readonly time: number = null;

    /** 分数占比列表 */
    scoreProList: number[];
    /** 分数段列表 */
    scoreSubList: number[];

}
register(FoodActScoreManager, "FoodActScoreManager");
declare global {
    interface ConfigMap {
        /**厨师 */
        "FoodActScoreManager": FoodActScoreManager;
    }
}
export class FoodActAwardManager extends DataMsrBase<FoodActAwardData>{
    
    constructor() {
        super(FoodActAwardData, "food_act_award", "rank");
    }

    public getAwardList(rank: number){
        let config = this.getData(rank);
        if(!config){
            return
        }
        let temp = config.param1;
        let paramList = temp.split("|");
        let temp2 = config.num1;
        let numList = temp2.split("|");
        return {
            param: paramList,
            num: numList
        }
    }
}


export class FoodActAwardData extends CsvDataBase{
    /**
    * 排名
    */
   readonly rank: number = null;
   /**
   * 奖励参数
   */
   readonly param1: string = null;
   /**
   * 奖励数量
   */
   readonly num1: string = null;
   /**
   * 奖励参数
   */
   readonly param2: number = null;
   /**
   * 奖励数量
   */
   readonly num2: number = null;
   /**
   * 奖励参数
   */
   readonly param3: number = null;
   /**
   * 奖励数量
   */
   readonly num3: number = null;
   /**
   * 奖励参数
   */
   readonly param4: number = null;
   /**
   * 奖励数量
   */
   readonly num4: number = null;
}