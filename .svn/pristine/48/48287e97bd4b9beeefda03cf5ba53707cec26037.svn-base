import BaseModel from "../../../core/mvc/model/BaseModel";
import App from "../../../core/App";
import { GameDataSaveKey } from "../../GameDataMsr";
import { LuckDataManager, LuckCostDataManager } from "./LuckDataManager";
import { LuckTypeConst, LuckConst } from "./LuckConst";


export class LuckModel extends BaseModel implements IMemento {
    protected costConfManager: LuckCostDataManager = null;
    protected configManager: LuckDataManager;
    public saveData: LuckSaveData = null;
    public init() {
        this.costConfManager = App.ConfigManager.luckCostDataManager;
        this.configManager = App.ConfigManager.luckDataManager;
        
    }

    // public addAwardNum(luckType: number, pos: number) {
    //     this.saveData.datas[luckType].curNum++;
    //     this.saveData.datas[luckType].time = Date.now();
    //     this.saveData.pos = pos;
    // }
    public addNum(luckType: number, num: number) {
        if (luckType > -1) {
            this.saveData.datas[luckType].curNum--;
            if(this.saveData.datas[luckType].time == 0){
                this.saveData.datas[luckType].time = App.DateUtils.Now();
            }
        }
        this.saveData.pos += num;
        let awardNum = this.configManager.dataCnt;
        this.saveData.pos = this.saveData.pos % awardNum;
        // this.checkTime();
    }

    /**
     * 设置下一次翻倍
     * @param rate 倍数
     */
    public setDouble(rate: number) {
        this.saveData.rate = rate;
    }


    /**
     * 时间检测，如果超过cd时间 重置时间并且回复对应次数
     */
    public checkTime() {
        let datas = this.saveData.datas;
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            let config = this.costConfManager.getData(i);
            if (data && config) {
                let desTime = App.DateUtils.Now() - data.time; // 上次抽奖到现在的时间差
                if (config.cdTime && data.curNum < config.maxNum && desTime > config.cdTime) {
                    // 间隔时间大于0  当前抽奖次数大于0  如果时间差大与间隔时间，当前次数+1
                    let num = Math.floor(desTime / config.cdTime);
                    data.curNum = data.curNum + num;
                    if(data.curNum >= config.maxNum){
                        data.curNum = config.maxNum;
                        data.time = 0;
                    }
                    else{
                        data.time = App.DateUtils.Now() - desTime % config.cdTime;
                    }
                }
            }
        }
    }
    // public 
    /**
    * 创建存档
    * 
    * @param {string} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
    * @returns {*} mydesciption
    * 
    * @author
    * @version
    */
    createMemento(key: string): LuckSaveData {
        return this.saveData;
    }

    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     * @param {string} key 同步的key值(有可能一个对象会有多个不同的key值, 同步存档的时候根据key值同步相应的存档)
     * 
     * @author
     * @version
     */
    setMemento(data: LuckSaveData) {
        if (data) {
            this.saveData = data;
        }
        else {
            this.saveData = {
                datas: [{
                    time: 0,
                    curNum: 0,
                },
                {
                    time: 0,
                    curNum: 0,
                }
                ],
                pos: 0,
                rate: 1,
            }
        }
    }

    updateDayData(key: string, day: number) {
        let datas = this.saveData.datas;
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            let config = this.costConfManager.getData(i);
            if (data && config) {
                if (config.cdTime == 0) {
                    data.curNum = config.maxNum;
                    // data.time = Date.now();
                }
            }
        }
    }

}