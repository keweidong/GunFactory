import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
import { GameDataSaveKey } from "../../GameDataMsr";
import { StarDataMsr } from '../GameMain/object/scene/config/StarDataMsr';

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
export default class StartShowModel extends BaseModel implements IMemento {

    public saveData: {
        starSaveDataModle: StartSaveDatamodle[],
        isStarCome?: boolean,
    };
    public starDataMsr: StarDataMsr = null;

    startSaveDatamodle: StartSaveDatamodle[] = [];

    /**判断是否每天第一次来 */
    public isStarCome: boolean = false;

    public constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, GameDataSaveKey.START_DATA, false, true);
    }
    public init() {
        App.SaveManage.load(GameDataSaveKey.FRIEND_CIRCLE);
        this.starDataMsr = App.ConfigManager.getConfig("StarDataMsr");
        this.saveData = {
            starSaveDataModle: this.startSaveDatamodle,
            isStarCome: this.isStarCome,


        }
    }

    addStartData(starId: number, isShow: boolean) {
        this.saveData.starSaveDataModle.push({
            id: starId,
            isUnlock: isShow
        });
        this.startSaveDatamodle.push({
            id: starId,
            isUnlock: isShow
        })

    }
    /**
     * 创建存档
     * 
     * @param {string} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
     * @returns {*} mydesciption
     * 
     * @author
     * @version
     */
    createMemento(key: string): stardatamodle {
        let save: stardatamodle = {
            starSaveDataModle: this.startSaveDatamodle,
            isStarCome: this.isStarCome,
        };
        this.saveData = save;
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
    setMemento(data: stardatamodle) {
        if (data)
            this.saveData = data;
        else {
            this.saveData.starSaveDataModle = this.startSaveDatamodle;
            this.saveData.isStarCome = this.isStarCome;
        }
    }

    updateDayData?(key: string, day: number) {
        this.isStarCome = false;
    }
    updateWeekData?(key: string) {

    }
    updateMoonData?(key: string) {

    }
}
export interface stardatamodle {
    starSaveDataModle: StartSaveDatamodle[],
    isStarCome?: boolean,
}
interface StartSaveDatamodle {
    /**明星id */
    id: number;

    /**是否解锁 */
    isUnlock?: boolean,
}
