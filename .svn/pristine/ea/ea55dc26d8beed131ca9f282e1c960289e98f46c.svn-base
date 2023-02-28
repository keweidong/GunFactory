import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
export class HappyModel extends BaseModel implements IMemento {
    public _happyMoney: MyBigLong = MyBigLong.create(0, 0);
    public conf: HappyConf = null;
    public data: HappySaveData = null;

    public constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, "HappyData", false, true);
    }
    public init() {
        this.conf = App.ConfigManager.getConfig("GameConf").game.happy;
        // this.conf = App.ConfigManager.getConfig("ItemDataManager");
        // let allData = this.conf.getAllDatas();
        // for (let key in allData) {
        //     let data = allData[key];
        //     let obj = this.getItemObjByType(data.itemType);
        //     obj.setConfData(data);
        //     this.itmes[data.id] = obj
        //     let items = this.itmeTypes[data.itemType];
        //     if (!items) {
        //         items = {};
        //         this.itmeTypes[data.itemType] = items;
        //     }
        //     items[data.id] = obj;
        // }
        App.SaveManage.load("HappyData");
    }
    public setMemento(data?: HappySaveData) {
        if (data) {
            this.data = data;
        }
        else {
            this.data = {
                happyMoney: this._happyMoney.getData(),
                happyTime: 0,
                happyValue: 0,
                streetId: -1,
                curTimes: 0,
                isFirst: 1,
            }
        }
        // this._happyMoney.unPackData(this._data.happyMoney);
        // this.checkHappyTime();
    }
    updateDayData() {
        this.data.curTimes = 0;
    }
    public createMemento(): HappySaveData {
        this.data.happyMoney = this._happyMoney.getData();
        return this.data;
    }
}