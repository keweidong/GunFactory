import App from "./App";


/**
 * 本地存档类
 */
export default class SaveManage implements IMemento {
    /**
     * 用于区分
     */
    protected saveKey: string = "";

    protected gameKey = "GunFactory";
    private list: SaveItem[] = [];
    private map: { [key: string]: SaveItem } = {};
    /**是否需要更新每日数据 */
    protected isNeedUpdateDayData: boolean = false;
    protected updateDayDataCaches: { [key: string]: boolean } = {};
    protected _saveInfo: {
        day: number;
        week: number;
    };
    constructor() {

    }
    public init() {
        this.add(this, "SaveInfo", false, true);
        this.load("SaveInfo");
    }
    /**
     * 增加一个需要缓存的对象
     * 
     * @param {IMemento} item 需要缓存的对象
     * @param {string} key 缓存在本地的key
     * @param {boolean} [isSelf=true] 是不是玩家私有的缓存(如果是的话,缓存的saveKey值=key+玩家id,保证每个玩家都有自己私有的缓存数据)
     * @param {boolean} [isAuto=true] 是不是自动保存(设置为true,会保存到服务器)
     */
    public add(obj: IMemento, key: string, isSelf: boolean = true, isAuto: boolean = true) {
        if (isSelf) {
            var saveKey = this.saveKey + key;
        } else {
            var saveKey = key;
        }
        if (CC_DEV) {
            saveKey += this.gameKey;
        }
        let data = { key, obj, saveKey, isAuto };
        if (this.map[key]) {
            let arrLen = this.list.length;
            for (let i = 0; i < arrLen; i++) {
                if (this.list[i].saveKey === saveKey) {
                    this.list.splice(i, 1);
                    break;
                }
            }
        }
        this.list.push(data);
        this.map[key] = data;
    }
    public setSaveKey(saveKey: string) {
        this.saveKey = saveKey;
    }
    /**
     * 自动存储
     */
    public autoSave() {
        for (let item of this.list) {
            if (item.isAuto) {
                this.$save(item);
            }
        }
    }
    /**
     * 自动存储
     */
    public getAllAutoSaveData() {
        let saveData: {
            [saveKey: string]: any
        } = {};
        for (let item of this.list) {
            if (item.isAuto) {
                let temp = this.$save(item);;
                saveData[item.saveKey] = temp;
            }
        }
        return JSON.stringify(saveData);
    }
    /**
     * 同步存档
     * @param saveData 同步的数据
     */
    syncByData(saveData: {
        [saveKey: string]: any
    }) {

        for (const key in saveData) {
            cc.sys.localStorage.setItem(key, JSON.stringify(saveData[key]));
        }
        // for (let item of this.list) {
        //     if (saveData[item.key]) {
        //         item.obj.setMemento(saveData[item.key], item.key);
        //     }
        // }
    }
    /**
     * 保存所有的数据
     */
    public saveAll() {
        for (let item of this.list) {
            this.$save(item);
        }
        Log.trace("存档成功!");
    }
    protected $save(item: SaveItem) {
        let saveData = item.obj.createMemento(item.key);
        if (saveData && typeof saveData === "object") {
            cc.sys.localStorage.setItem(item.saveKey, JSON.stringify(saveData));
        } else {
            cc.sys.localStorage.removeItem(item.saveKey);
        }
        return saveData;
    }
    /**
     * 保存某个本地缓存的数据
     * 
     * @param {string} key 缓存的key值
     */
    public save(key: string) {
        let item = this.map[key];
        if (item) {
            this.$save(item);
        }
    }
    public clearAllItem() {
        this.list = [];
        this.map = {};
    }
    /**
     * 根据key值清理某个本地缓存数据
     * 
     * @param {string} key 清理的本地缓存数据的key值
     */
    public clearItem(key: string) {
        let item = this.map[key];
        if (item) {
            cc.sys.localStorage.removeItem(item.saveKey);
        }
    }

    /**
     * 检查是否需要更新数据(更新每日,每周等数据)
     */
    public checkIsNeedUpdateData() {
        if (this._saveInfo) {
            let now = App.DateUtils.Now();
            var day = Math.floor((now - new Date(now).getTimezoneOffset() * 60 * 1000) / 1000 / 60 / 60 / 24);
            var week = Math.floor((day + 3) / 7);
            this._saveInfo.week = week;
            CC_DEBUG && Log.trace("checkIsNeedUpdateData1:", day, this._saveInfo.day);
            if (this._saveInfo.day !== -1) {
                if (this._saveInfo.day !== day) {//更新每日数据
                    this._saveInfo.day = day;
                    this.updateDayDataCaches = {};
                    this.$updateDayData(day);
                }
            } else {
                this._saveInfo.day = day;
            }

        }
    }
    /**
     * 清理所有本地缓存
     */
    public clear() {
        for (let item of this.list) {
            cc.sys.localStorage.removeItem(item.saveKey);
        }
    }
    /**
     * 更新每日数据
     */
    protected $updateDayData(day: number) {
        CC_DEBUG && Log.trace("更新每日数据:", day);
        for (let item of this.list) {
            if (item.obj.updateDayData) {
                item.obj.updateDayData(item.key, day);
            }
            this.updateDayDataCaches[item.key] = true;
        }
        this.isNeedUpdateDayData = true;
    }
    /**
     * 更新每周数据
     */
    public updateWeekData() {
        for (let item of this.list) {
            if (item.obj.updateWeekData) {
                item.obj.updateWeekData(item.key);
            }
        }
    }
    /**
     * 加载所有的存档
     */
    public loadAll() {
        for (let item of this.list) {
            if (item.isAuto) {
                let data = this.$load(item.saveKey);
                item.obj.setMemento(data, item.key);
            }
        }
        Log.trace("加载存档成功!");
    }
    protected $load(saveKey: string) {
        let str = cc.sys.localStorage.getItem(saveKey);
        if (str) {
            try {
                return JSON.parse(str);
            } catch (error) {
                cc.sys.localStorage.removeItem(saveKey);
                Log.error(`加载本地文件:${saveKey}, 解析的内容:${str} 出错!!!!`, error)
                return null;
            }
        }
        return null;
    }
    /**
    * 创建存档
    * 
    * @param {string} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
    * @returns {*} mydesciption
    */
    createMemento() {
        return this._saveInfo;
    }
    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     * @param {string} key 同步的key值(有可能一个对象会有多个不同的key值, 同步存档的时候根据key值同步相应的存档)
     */
    setMemento(data: any) {
        if (data) {
            this._saveInfo = data;
        } else {
            let now = App.DateUtils.Now();
            var day = Math.floor((now - new Date(now).getTimezoneOffset() * 60 * 1000) / 1000 / 60 / 60 / 24);
            var week = Math.floor((day + 3) / 7);
            this._saveInfo = {
                day: day,
                week: week
            };
        }
    }
    /**
     * 根据key值加载某个本地存档
     * 
     * @param {string} key 缓存的key
     * @returns {*} mydesciption
     */
    public load(key: string): void {
        let item = this.map[key];
        if (item) {
            let data = this.$load(item.saveKey);
            item.obj.setMemento(data, key);
            if (this.isNeedUpdateDayData && !this.updateDayDataCaches[key]) {//需要更新每日数据
                this.updateDayDataCaches[key] = true;
                if (item.obj.updateDayData) {
                    item.obj.updateDayData(key, this._saveInfo.day);
                }
            }
        }
    }
}
window["SaveManage"] = SaveManage;
type SaveItem = {
    obj: IMemento;
    /**
     * 原本的key值
     */
    key: string;
    /**
     * 用户保存的key值
     */
    saveKey: string;
    /**
     * 是否自动保存
     */
    isAuto: boolean;
}
