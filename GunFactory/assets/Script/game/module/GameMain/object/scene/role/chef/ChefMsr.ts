import App from "../../../../../../../core/App";
import LabelTip from "../../../../../../../core/component/LabelTip";
import { GameText } from "../../../../../../../core/lang/GameText";
import { NotificationConst } from '../../../../../../consts/NotificationConst';
import LayerManager from "../../../../../../LayerManager";
import UpgradeDetailInfo from "../../../../upgrade/UpgradeDetailInfo";
import BaseWorkZone, { BaseWorkZoneSData } from "../../base/BaseWorkZone";
import { ChefData } from "../../config/ChefDataMsr";
import ScenegZone from "../../SceneZone";
import Chef from "./Chef";
import ChefAttr from "./ChefAttr";
export class ChefUpgradeDetailInfo extends UpgradeDetailInfo<ChefAttr>{
    /**比升级前多多少厨师 */
    addCnt: number = 0;
    /**效率比升级前高多少 */
    addRate: number = 0;
    /**
    * @param updateData 升级的预览属性
    */
    public cal(updateData: ChefAttr) {
        this.preData = updateData;
        this.addCnt = this.preData.cnt - this.curData.cnt;
        this.addRate = this.preData.rate - this.curData.rate;
    }
}
/**
 * 厨师管理器
 */
export class ChefMsr extends BaseWorkZone {
    public attrObj: ChefAttr = null;
    isCoodAccelerate: boolean = false;
    isTouch: boolean = false;
    /**长按厨师加速区域时,厨师的加速倍率 */
    chefTouchSpeedRate: number = 2;
    tempAttrObj: ChefAttr = null;
    /**配置数据 */
    levelUpDatas: ChefData = null;
    public detailInfo: ChefUpgradeDetailInfo;
    chefs: Chef[] = null;
    /**
     *
     */
    constructor(sceneZone: ScenegZone) {
        super(sceneZone);
        this.attrObj = new ChefAttr();
        this.tempAttrObj = new ChefAttr();

        this.chefTouchSpeedRate = App.ConfigManager.gameConf.game.chefTouchSpeedRate;
        this.detailInfo = new ChefUpgradeDetailInfo(this.attrObj);
    }
    /**
     * 设置厨师是否加速
     * @param isTouch 
     */
    public setIsCookAccelerate(isTouch: boolean) {
        if (isTouch === this.isTouch) {
            return;
        }
        this.isTouch = isTouch;
        this.updateAccelerate();
    }
    public updateBuff() {
        this.updateAccelerate();
    }
    protected updateAccelerate() {
        let isCoodAccelerate = this.isTouch || this.sceneZone.buffList.COOK_ACCELERATE > 1;
        if (this.isCoodAccelerate === isCoodAccelerate) {
            return;
        }
        this.isCoodAccelerate = isCoodAccelerate;
        for (const chef of this.chefs) {
            if (chef.isOpen) {
                if (chef.finishTime > 0) {
                    if (this.isCoodAccelerate) {//如果加速,那么播放速度翻倍
                        // chef.dbNode.playAnimation("cook_fast1", 0);
                        chef.playAccelerateAni();
                        // chef.dbNode.timeScale = this.chefTouchSpeedRate;
                    } else {
                        chef.stopAccelerateAni();
                        // chef.dbNode.playAnimation("cook", 0);
                        // chef.dbNode.timeScale = 1;
                    }
                }
            }
        }
    }

    onEnter() {
    }

    protected init(): void {
        this.levelUpDatas = App.ConfigManager.getConfig("ChefDataMsr").getData(this.sceneZone.getId());
        this.attrObj.baseTime = this.levelUpDatas.cookTime;
        super.init();
        this.attrObj.calFinalAttr();
        this.updateZonePreData(1);
    }
    public updateZonePreData(addCountType: number) {
        super.updateZonePreData(addCountType);
        if (this.attrObj.level !== this.attrObj.maxLevel) {
            // 取得下次巨大提升的等级
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
    /**
     * 获得一个空闲的厨师
     */
    public getIdleChef() {
        for (const chef of this.chefs) {
            if (chef.isOpen && !chef.order) {
                return chef;
            }
        }
    }
    public upLevel(count: number, isFree?: boolean) {
        let result = super.upLevel(count, isFree);
        this.updateZonePreData(1);
        let arrLen = this.chefs.length;
        for (let i = 0; i < arrLen; i++) {
            if (!this.chefs[i].isOpen && i < this.attrObj.levelData.cnt) {
                this.chefs[i].setData(this, i);
                this.chefs[i].playOpenAni();
                App.NodePoolMsr.labelTip.pop()
                    .getComponent(LabelTip)
                    .init(LayerManager.getLayer(LayerManager.UI_Tips),GameText.getText(lang.chef_msr_unlock_new_cooker), App.NodePoolMsr.labelTip)
                    .leftToRight(true, 1.5);
                this.sceneZone.orderMsr.cookFood();
                App.NotificationCenter.dispatch(NotificationConst.UNLOCK_NEWCHEF, this.chefs[i].chefMsr.attrObj.levelData.friendid);
            }
        }
        return result;
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
    public createMemento(): ChefDataSaveData {
        return {
            isOpen: this.attrObj.isOpen ? 1 : 0,
            level: this.attrObj.level
        }
    }
    public setMemento(data: ChefDataSaveData) {
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
export interface ChefDataSaveData extends BaseWorkZoneSData {
}