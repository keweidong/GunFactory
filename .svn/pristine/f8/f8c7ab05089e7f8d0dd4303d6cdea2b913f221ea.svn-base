import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
import { ItemType } from "./BagConst";
import BoxItem from "./BoxItem";
import BuffItem from "./BuffItem";
import { ItemBase } from "./ItemBase";
import { ItemDataManager } from "./ItemDataManager";
import MoneyItem from "./MoneyItem";
import SuperCashItem from "./SuperCashItem";

export class BagModel extends BaseModel implements IMemento {
    public conf: ItemDataManager = null;
    /**所有物品 */
    public itmes: {
        [key: number]: ItemBase
    } = {};
    /**根据不同物品类型存储的物品列表 */
    public itmeTypes:
        {
            [key: number]: {
                [key: number]: ItemBase
            }
        }
        = {};

    public constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, "BAG_DATA", false, true);
    }
    protected getItemObjByType(type: ItemType) {
        switch (type) {
            case ItemType.IELD_MONEY:
                return new MoneyItem();
            case ItemType.SUPER_CASH:
                return new SuperCashItem();
            case ItemType.BOX:
                return new BoxItem();
            case ItemType.BUFF:
                return new BuffItem();
            default:
                return new ItemBase();
        }
    }
    public init() {
        this.conf = App.ConfigManager.getConfig("ItemDataManager");
        let allData = this.conf.getAllDatas();
        for (let key in allData) {
            let data = allData[key];
            let obj = this.getItemObjByType(data.itemType);
            obj.setConfData(data);
            this.itmes[data.id] = obj
            let items = this.itmeTypes[data.itemType];
            if (!items) {
                items = {};
                this.itmeTypes[data.itemType] = items;
            }
            items[data.id] = obj;
        }
        App.SaveManage.load("BAG_DATA");
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
    createMemento(key: string): any {
        let saveData = {}
        for (const key in this.itmes) {
            let item = this.itmes[key]
            if (item.cnt) {
                saveData[item.data.id] = item.cnt;
            }
        }
        return saveData;
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
    setMemento(data: { [id: string]: number }, key: string) {
        for (const key in this.itmes) {
            let item = this.itmes[key]
            if (data && data[item.data.id]) {
                item.cnt = data[key];
            } else {
                item.cnt = 0;
            }
        }
    }
}