import App from "../../../../../../../core/App";
import UpgradeDetailInfo from "../../../../upgrade/UpgradeDetailInfo";
import BaseWorkZone, { BaseWorkZoneSData } from "../../base/BaseWorkZone";
import { WaiterDataList } from "../../config/WaiterDataMsr";
import ScenegZone from "../../SceneZone";
import WaiterAttr from "./WaiterAttr";
export class WaiterUpgradeDetailInfo extends UpgradeDetailInfo<WaiterAttr>{
    /**比升级前多多少厨师 */
    addCnt: number = 0;
    /**效率比升级前高多少 */
    addRate: number = 0;
    /**
    * @param updateData 升级的预览属性
    */
    public cal(updateData: WaiterAttr) {
        this.preData = updateData;
        this.addCnt = this.preData.cnt - this.curData.cnt;
        this.addRate = this.preData.rate - this.curData.rate;
    }
}

/**
 * 厨师管理器
 */
// tslint:disable-next-line: max-classes-per-file
export class WaiterMsr extends BaseWorkZone {
    public attrObj: WaiterAttr = null;

    tempAttrObj: WaiterAttr = null;
    /**配置数据 */
    levelUpDatas: WaiterDataList = null;
    public detailInfo: WaiterUpgradeDetailInfo;
    /**
     *
     */
    constructor(sceneZone: ScenegZone) {
        super(sceneZone);
        this.attrObj = new WaiterAttr();
        this.tempAttrObj = new WaiterAttr();
        this.detailInfo = new WaiterUpgradeDetailInfo(this.attrObj);
    }
    protected init(): void {
        this.attrObj.baseSpeed = App.ConfigManager.gameConf.game.customer.speed;
        this.levelUpDatas = App.ConfigManager.getConfig("WaiterLevelDataMsr").getData(this.sceneZone.getId());
        super.init();
        this.attrObj.calFinalAttr();
        this.updateZonePreData(1);
    }
    public updateZonePreData(addCountType: number) {
        super.updateZonePreData(addCountType);
        if (this.attrObj.level !== this.attrObj.maxLevel) {
            //取得下次巨大提升的等级
            let levelDates = this.levelUpDatas.awardLevel;
            let arrLen = levelDates.length;
            for (let i = 0; i < arrLen; i++) {
                if (levelDates[i] > this.attrObj.level) {
                    if (i === 0) {
                        this.detailInfo.lastChangeLevel = 0;
                    } else {
                        this.detailInfo.lastChangeLevel = levelDates[i - 1];
                    }
                    this.detailInfo.nextChangeLevel = levelDates[i];
                    break;
                }
            }
        }
    }
    public upLevel(count: number, isFree?: boolean) {
        let result = super.upLevel(count, isFree);
        this.updateZonePreData(1);
        if (this.attrObj.cnt > this.sceneZone.roleMsr.waiters.length) {//当前服务员数量少于需要创建的数量 todo 增加服务员增加动画
            this.sceneZone.roleMsr.addWaiter(this.attrObj.cnt - this.sceneZone.roleMsr.waiters.length, true);
        }
        // let arrLen = this.waiters.length;
        // for (let i = 0; i < arrLen; i++) {
        //     if (!this.waiters[i].isOpen && i < this.attrObj.levelData.cnt) {
        //         this.waiters[i].setData(this, i);//开启新的厨师 todo 增加开启动画
        //         this.sceneZone.orderMsr.cookFood();
        //     }
        // }
        return result;
    }
    newOpen() {
        this.initData({
            level: 0,
            isOpen: 1
        })
        this.init();
        this.sceneZone.roleMsr.addWaiter(this.attrObj.cnt - this.sceneZone.roleMsr.waiters.length, false);
    }
    public initData(data: BaseWorkZoneSData) {
        let attrObj = this.attrObj;
        attrObj.level = data.level;
        attrObj.isOpen = data.isOpen === 1;
    }
    public createMemento(): WaiterDataSaveData {
        return {
            isOpen: this.attrObj.isOpen ? 1 : 0,
            level: this.attrObj.level
        }
    }
    public setMemento(data: WaiterDataSaveData) {
        if (data) {
            if (data.isOpen === 1) {
                this.initData(data);
                this.init();
                this.sceneZone.roleMsr.addWaiter(this.attrObj.cnt - this.sceneZone.roleMsr.waiters.length, false);
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
export interface WaiterDataSaveData extends BaseWorkZoneSData {
}