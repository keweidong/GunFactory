import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
import Toast from "../../../core/utils/Toast";
import { FoodActState } from "./ActivityConst";


const foodList = [2, 3, 4, 5, 6, 7, 18, 20, 19, 21, 22, 25, 26, 43, 44, 46, 45, 47];

export class ActivityModel extends BaseModel implements IMemento {
    // public conf: FoodActScoreManager = null;
    protected actNum: number = 0;
    protected assistNum: number = 0;
    protected foodActUserData: FoodActUserData;

    public constructor($controller: BaseController) {
        super($controller);
    }

    public init() {
        // let config = App.ConfigManager.gameConf.game.foodAct;
        // this.actNum = config.actNum;
        // this.assistNum = config.assistNum;
    }

    /**
     * 获取厨神大赛玩家数据
     */
    public getFoodActUserData() {
        return this.foodActUserData;
    }


    /**
     * 完成厨神大赛一个步骤
     * @param score 分数
     */
    public finishIndex(score: number) {
        this.foodActUserData.index++;
        let list = this.foodActUserData.scoreList;
        list.push(score);

        if (this.foodActUserData.index > 2) {
            let len = list.length;
            let totalSorce: number = 0;
            for (let i = 0; i < len; i++) {
                totalSorce += list[i];
            }

            // if (this.foodActUserData.maxScore < totalSorce) {
            //     this.foodActUserData.maxScore = totalSorce;
            // }
            this.foodActUserData.actState = FoodActState.NOT_SUMBIT;
            return true;
        }
        return false;
    }

    /** 提交分数 */
    public sumbitScore(score: number) {
        // this.foodActUserData.actState = FoodActState.NOT_START;
        // if (this.foodActUserData.maxScore < score) {
        //     this.foodActUserData.maxScore = score;
        //     // TODO 提交到管理后台
        //     Platform.instance.saveRankData({ strength: score });
        // }
        // this.foodActUserData.startTime = 0;
        // /** 重置广告次数 */
        // App.GameDataMsr.adAndShareData[AdType.FOOD_ASSIST].adCnt = 0;
        // this.foodActUserData.assistNum = this.assistNum;
        // this.resetUserData();
        // this.foodActUserData.isFirst = false;
    }

    public closeSubit() {
        // this.resetUserData();
    }

    public resetUserData() {
        let userData = this.foodActUserData;
        userData.actState = FoodActState.NOT_START;
        userData.scoreList = [];
        // userData.assistNum = 0;
        userData.index = 0;
    }

    /**
    * 创建存档
    * 
    * @param {string} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
    * @returns {*} mydesciption
    */
    createMemento(key: string): any {
        let saveData = {}
        saveData["userData"] = this.foodActUserData;
        return saveData;
    }

    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     * @param {string} key 同步的key值(有可能一个对象会有多个不同的key值, 同步存档的时候根据key值同步相应的存档)
     */
    setMemento(data: { [id: string]: any }, key: string) {
        if (data && data.userData) {
            this.foodActUserData = data.userData;
        }
        else {
            this.foodActUserData = {
                scoreList: [],
                index: 0,
                actState: FoodActState.NOT_START,
                isFirst: true
            }
        }
    }

    updateDayData(key: string, day: number) {
        if (this.foodActUserData) {
            this.foodActUserData.index = 0;
        }
        else {
            this.foodActUserData = {
                scoreList: [],
                index: 0,
                actState: FoodActState.NOT_START,
                isFirst: true
            }
        }

    }
}