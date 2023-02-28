import App from "../../../../../../../core/App";
import UpgradeDetailInfo from "../../../../upgrade/UpgradeDetailInfo";
import BaseWorkZone, { BaseWorkZoneSData } from "../../base/BaseWorkZone";
import { GuestDataList } from "../../config/GuestDataMsr";
import ScenegZone from "../../SceneZone";
import GuestAttr from "./GuestAttr";

export class GuestUpgradeDetailInfo extends UpgradeDetailInfo<GuestAttr>{
    /**比升级前多多少厨师 */
    addCnt: number = 0;
    /**效率比升级前高多少 */
    addRate: number = 0;
    /**
    * @param updateData 升级的预览属性
    */
    public cal(updateData: GuestAttr) {
        this.preData = updateData;
        this.addRate = this.preData.rate - updateData.rate;
    }
}
/**
 * 来客升级管理器
 */
export class GuestMsr extends BaseWorkZone {
    public attrObj: GuestAttr = null;

    tempAttrObj: GuestAttr = null;
    /**配置数据 */
    levelUpDatas: GuestDataList = null;
    public detailInfo: GuestUpgradeDetailInfo;
    /**
     *
     */
    constructor(sceneZone: ScenegZone) {
        super(sceneZone);
        this.attrObj = new GuestAttr();
        this.tempAttrObj = new GuestAttr();
        this.detailInfo = new GuestUpgradeDetailInfo(this.attrObj);
    }
    protected init(): void {
        this.levelUpDatas = App.ConfigManager.getConfig("GuestDataMsr").getData(this.sceneZone.getId());
        this.attrObj.baseTime = this.sceneZone.conf.createCusTime;
        super.init();
        this.attrObj.calFinalAttr();
        this.updateZonePreData(1);
    }
    public upLevel(count: number, isFree?: boolean) {
        let result = super.upLevel(count, isFree);
        this.updateZonePreData(1);
        return result;
    }
    public updateZonePreData(addCountType: number) {
        super.updateZonePreData(addCountType);
        if (this.attrObj.level !== this.attrObj.maxLevel) {
            this.detailInfo.lastChangeLevel = this.levelUpDatas.awardLevel[0];
            this.detailInfo.nextChangeLevel = this.levelUpDatas.awardLevel[1];
        }
    }
    newOpen() {
        this.initData({
            level: 0,
            isOpen: 1
        })
        this.init();
    }
    public initData(data: BaseWorkZoneSData) {
        let attrObj = this.attrObj;
        attrObj.level = data.level;
        attrObj.isOpen = data.isOpen === 1;
    }
    public createMemento(): GuestDataSaveData {
        return {
            isOpen: this.attrObj.isOpen ? 1 : 0,
            level: this.attrObj.level
        }
    }
    public setMemento(data: GuestDataSaveData) {
        if (data) {
            if (data.isOpen === 1) {
                this.initData(data);
                this.init();
            } else {
                this.attrObj.isOpen = false;
            }
        } else {
            this.attrObj.isOpen = false;
        }
    }
}


/**
 * 桌子存档数据
 */
export interface GuestDataSaveData extends BaseWorkZoneSData {
}