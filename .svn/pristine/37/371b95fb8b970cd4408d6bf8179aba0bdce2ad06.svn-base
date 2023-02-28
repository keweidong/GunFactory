
import App from "../../../core/App";
import { BuffDataManager } from "../../config/BuffDataManager";
import { NotificationConst } from "../../consts/NotificationConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { BuffAttr } from "./IBuff";

type KCBuffType = {
    [kcId: number]: BuffAttr
};
type KDBuffType = {
    [kcId: number]: {
        [kdId: number]: BuffAttr
    }
};

declare global {
    /**
     * buff数据
     */
    type BuffData = {
        /** buffIndex */
        buffIndex: number;
        /** buff值 */
        buffValue: number;
        /** buff结束时间 0 表示永久 */
        buffEndTime: number;
        /** buff类型 */
        buffType?: string;
    }
}

/** buff管理器 */
export default class BuffMgr {

    protected _buffDataList: { [key: number]: any } = {};
    /** 全局buff数据列表 */
    protected _globalBuffList: { [buffIndex: number]: BuffData } = {};
    /** 矿场buff数据列表 */
    protected _kcBuffList: { [kcId: number]: { [buffIndex: number]: BuffData } } = {};

    /** 全局buff属性列表 */
    protected _globalBuffAttrList: BuffAttr = BuffAttr.create();
    /** 矿场buff属性列表 */
    protected _kcBuffAttrList: KCBuffType = {};

    protected buffDataManager: BuffDataManager;

    public constructor(private world: WorldScene) {
        this.buffDataManager = App.ConfigManager.getConfig("BuffDataManager");
    }

    protected checkBuff(buffData: BuffData, time: long) {
        if (buffData.buffEndTime && buffData.buffEndTime < time) {
            return true;
        }
        return false;
    }

    public routine(time: long) {
        let now = App.DateUtils.Now();
        for (let key in this._globalBuffList) {
            let buffData = this._globalBuffList[key];
            if (buffData.buffEndTime && buffData.buffEndTime < now) {
                this.removeGlobalBuff(buffData.buffIndex);
            }
        }

        for (let key in this._kcBuffList) {
            let kcBuffList = this._kcBuffList[key];
            for (let k in kcBuffList) {
                let buffData = kcBuffList[k];
                if (this.checkBuff(buffData, now)) {
                    this.removeKcBuff(Number(key), buffData.buffIndex);
                }
            }
        }
    }

    /** 获取全局buff列表 */
    public getGlobalBuffList() {
        return this._globalBuffList;
    }

    /**
     * 获取指定buff
     * @param buffIndex buff索引
     */
    public getGlobalBuffByIndex(buffIndex: number) {
        return this._globalBuffList[buffIndex];
    }

    /** 新增全局buff */
    public addGlobalBuff(buffData: BuffData) {
        if (!buffData.buffType) {
            buffData.buffType = this.buffDataManager.getType(buffData.buffIndex);
        }

        let temp = this._globalBuffList[buffData.buffIndex];
        if (temp && temp.buffValue == buffData.buffValue) {
            let now = App.DateUtils.Now();
            if (temp.buffEndTime && temp.buffEndTime > now) {
                temp.buffEndTime += buffData.buffEndTime - now;
            }
            else if (temp.buffEndTime && temp.buffEndTime <= now) {
                temp.buffEndTime = buffData.buffEndTime;
            }
            else {
                this._globalBuffList[buffData.buffIndex] = buffData;
            }
        }
        else {
            this._globalBuffList[buffData.buffIndex] = buffData;
        }

        this.calGlobalBuffAttr();
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_BUFF, -1, -1, buffData.buffIndex);
    }

    /** 删除全局buff */
    public removeGlobalBuff(buffIndex: number) {
        delete this._globalBuffList[buffIndex];
        this.calGlobalBuffAttr();
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_BUFF, -1, -1, buffIndex);
    }

    /** 获取矿场buff列表 */
    public getKcBuffList() {
        return this._kcBuffList;
    }

    /**
     * 获取指定矿场buff列表
     * @param kcId 地图id
     */
    public getKcBuffListById(kcId: number) {
        return this._kcBuffList[kcId];
    }

    /**
     * 获取指定矿场的某个buff
     * @param kcId 地图id
     * @param buffIndex buff索引
     */
    public getKcBuffByIndex(kcId: number, buffIndex: number) {
        if (!this._kcBuffList[kcId]) {
            this._kcBuffList[kcId] = {}
        }
        let buffList = this._kcBuffList[kcId]
        let buffData = buffList[buffIndex];
        return buffData;
    }

    /**
     * 开启新矿场
     * @param kcId 地图id
     */
    public openNewKc(kcId: number) {
        this._kcBuffList[kcId] = this._kcBuffList[kcId] || {};
        if (this._kcBuffAttrList[kcId])
            this._kcBuffAttrList[kcId] = BuffAttr.create();
        this.calKcBuffAttrByKcId(kcId);
    }

    /** 新增矿场buff
     * @param kcId 地图id
     * @param buffData buff数据
     */
    public addKcBuff(kcId: number, buffData: BuffData) {
        if (!buffData.buffType) {
            buffData.buffType = this.buffDataManager.getType(buffData.buffIndex);
        }
        if (!this._kcBuffList[kcId]) {
            this._kcBuffList[kcId] = {}
        }

        let buffList = this._kcBuffList[kcId];

        let temp = buffList[buffData.buffIndex];
        if (temp && temp.buffValue == buffData.buffValue) {
            let now = App.DateUtils.Now();
            if (temp.buffEndTime && temp.buffEndTime > now) {
                temp.buffEndTime += buffData.buffEndTime - now;
            }
            else if (temp.buffEndTime && temp.buffEndTime <= now) {
                temp.buffEndTime = buffData.buffEndTime;
            }
            else {
                buffList[buffData.buffIndex] = buffData;
            }
        }
        else {
            buffList[buffData.buffIndex] = buffData;
        }
        // buffList[buffData.buffIndex] = buffData;
        this.calKcBuffAttrByKcId(kcId, true);
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_BUFF, kcId, -1, buffData.buffIndex);
        this.world.sceneMgr.nowScene && this.world.sceneMgr.nowScene.updateBuff();
    }

    /**
     * 删除矿场buff
     * @param kcId 地图id
     * @param buffIndex buff索引
     */
    public removeKcBuff(kcId: number, buffIndex: number) {
        if (!this._kcBuffList[kcId]) {
            this._kcBuffList[kcId] = {}
        }
        let buffList = this._kcBuffList[kcId];
        delete buffList[buffIndex];
        this.calKcBuffAttrByKcId(kcId, true);
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_BUFF, kcId, -1, buffIndex);
        this.world.sceneMgr.nowScene && this.world.sceneMgr.nowScene.updateBuff();
    }



    /**
     * 计算全局buff属性
     */
    public calGlobalBuffAttr() {
        this._globalBuffAttrList.reset();
        for (let key in this._globalBuffList) {
            let buffData = this._globalBuffList[key];
            let buffType = buffData.buffType;
            this._globalBuffAttrList.addBuffValue(buffType, buffData.buffValue);
        }
        this._globalBuffAttrList.claFinish();
        this.calKcBuffAttr();
    }

    /**
     * 计算指定矿场buff属性
     * @param kcId 地图id
     */
    public calKcBuffAttrByKcId(kcId: number, isUpdate: boolean = false) {
        let buffList = this._kcBuffList[kcId];
        if (!this._kcBuffAttrList[kcId]) {
            this._kcBuffAttrList[kcId] = BuffAttr.create();;
        }
        let kcBuffAttrList = this._kcBuffAttrList[kcId];
        kcBuffAttrList.reset();
        for (let key in buffList) {
            let buffData = buffList[key];
            let buffType = buffData.buffType;
            kcBuffAttrList.addBuffValue(buffType, buffData.buffValue)
        }
        kcBuffAttrList.claFinish();
        /** 累加全局buff */
        kcBuffAttrList.addBuffAttr(this._globalBuffAttrList);
        // for (let buffType in this._globalBuffAttrList) {
        //     kcBuffAttrList.addBuffValue(buffType, this._globalBuffAttrList.getBuffValue(buffType));
        //     // kcBuffAttrList[buffType] += this._globalBuffAttrList[buffType];
        // }
        if (isUpdate) {
            // this.calKdBuffAttr();
        }
    }

    /**
     * 计算矿场buff属性
     */
    public calKcBuffAttr() {
        for (let key in this._kcBuffList) {
            this.calKcBuffAttrByKcId(<any>key)
        }
        // this.calKdBuffAttr();
    }

    public getKcBuffAttrList(kcId: number) {
        this._kcBuffAttrList[kcId] = this._kcBuffAttrList[kcId] || BuffAttr.create();
        return this._kcBuffAttrList[kcId];
    }


    public setMemento(data: { [key: number]: any }) {
        if (data) {
            this._globalBuffList = this._buffDataList[0] = data[0] || {};
            this._kcBuffList = this._buffDataList[1] = data[1] || {};

        }
        else {
            this._globalBuffList = this._buffDataList[0] = this._buffDataList[0] || {};
            this._kcBuffList = this._buffDataList[1] = this._buffDataList[1] || {};
        }
        this.calGlobalBuffAttr();
    }

    public createMemento() {
        return this._buffDataList;
    }

    public save() {
        // App.SaveManage.save("BUFF_DATA");
    }
}