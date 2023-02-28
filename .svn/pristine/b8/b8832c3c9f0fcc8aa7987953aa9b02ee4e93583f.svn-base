import { CsvDataBase } from "../../../../core/config/CsvDataBase";
import DataMsrBase from "../../../../core/config/DataMsrBase";



const { ccclass, property } = cc._decorator;

/*
*每日任务配置表
*/
@ccclass
export default class FriendEventDataManager extends DataMsrBase<FriendEventData>{
    constructor() {
        super(FriendEventData, "friend_event_data");
    }
}

export class FriendEventData extends CsvDataBase{
    /**
    * 序号
    */
    readonly id: number = null;
    /**
    * 触发天数
    */
    readonly day: number = null;
    /**
    * 触发时间
    */
    readonly time: number = null;
    /**
    * 触发朋友圈id列表
    */
    readonly circleId: string = null;
    /**
    * 触发概率
    */
    readonly prob: number = null;
    /**
    * 概率累加
    */
    readonly addProb: number = null;

    /**
     * 解锁所需爱心值
     */
    readonly heartValue: number = null;
    circleIdList?: number[] = []

    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        let temp = this.circleId.split("|");
        for(let i = 0; i < temp.length;i++){
            this.circleIdList.push(parseInt(temp[i]));
        }
        return result;
    }
}
