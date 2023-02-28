import App from "../../../../../../core/App";
import LabelTip from "../../../../../../core/component/LabelTip";
import LayerManager from "../../../../../LayerManager";
import UpgradeDetailInfo from "../../../upgrade/UpgradeDetailInfo";
import BaseWorkZone, { BaseWorkZoneSData } from "../base/BaseWorkZone";
import { FoodData } from "../config/FoodDataMsr";
import ScenegZone from "../SceneZone";
import FoodAttr from "./FoodAttr";
import { FoodSaveData, FoodType } from "./FoodMsr";
const pos = cc.v2(0, 0);
export class FoodUpgradeDetailInfo extends UpgradeDetailInfo<FoodAttr>{
    /**
    * @param updateData 升级的预览属性
    */
    public cal(updateData: FoodAttr) {
        this.preData = updateData;
    }
}
export class Food extends BaseWorkZone implements IFood {
    public attrObj: FoodAttr = null;
    tempAttrObj: FoodAttr = null;
    foodType: FoodType = FoodType.NORMAL;
    /**当前菜式的所有升级数据 */
    public levelUpDatas: FoodData = null;
    /**升级的详情数据 */
    public detailInfo: FoodUpgradeDetailInfo;

    protected orderImg: string = "";

    constructor(sceneZone: ScenegZone) {
        super(sceneZone);
        this.attrObj = new FoodAttr();
        this.tempAttrObj = new FoodAttr();
        this.detailInfo = new FoodUpgradeDetailInfo(this.attrObj);
    }
    protected init(): void {
        super.init();
        this.attrObj.calFinalAttr();
        this.updateZonePreData(1);
    }
    /**获取菜式id */
    getId(): number {
        return this.levelUpDatas.id;
    }
    public upLevel(count: number, isFree?: boolean) {
        let result = super.upLevel(count, isFree);
        this.updateZonePreData(1);
        return result;
    }
    public getAward(order: IOrder, rate: number) {
        const sellCoin = this.attrObj.sellCoin;
        // let scene = this.sceneZone;
        let addMoney = sellCoin * rate;
        this.sceneZone.nowMoneyAdd(addMoney);

        pos.y = pos.x = 0;
        order.customer.node.convertToWorldSpaceAR(pos, pos);
        let parent = LayerManager.getLayer(LayerManager.UI_Main);
        parent.convertToNodeSpaceAR(pos, pos);

        if (rate > 1) {
            var pool = App.NodePoolMsr.doubleMoneyLabelAni;
        } else {
            var pool = App.NodePoolMsr.moneyLabelAni;
        }
        pool.pop()//播放飘字动画
            .getComponent(LabelTip)
            .init(parent, MyBigLong.toString(sellCoin) + (rate > 1 ? "x" + rate : ""), pool, 45)
            .flyUp(pos.x, pos.y + 100);
        return addMoney;
        // return this.attrObj.sellCoin;
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
    * 获取某一层的属性
    */
    public getAttrBaseObjectByLevel(attrObj: FoodAttr, level: number) {
        super.getAttrBaseObjectByLevel(attrObj, level);
    }
    /**
     * 获取当前等级图标
     */
    public getCurLevelIcon() {
        return "Texture/game/scene/foods/" + this.levelUpDatas.icon + "_" + this.attrObj.levelData.icon;
    }
    /**
     * 获取下个图标
     */
    public getNexLevelIcon() {
        return "Texture/game/scene/foods/" + this.levelUpDatas.icon + "_" + this.detailInfo.preData.levelData.icon;
    }
    /**
     * 获取下单icon
     */
    public getOrderIcon() {
        // db://assets/resources/Texture/game/scene/bbq_desk/bbq_desk1_1.pn
        return "Texture/game/scene/foods/" + this.levelUpDatas.icon + "_" + this.attrObj.levelData.icon;
    }
    /**
     * 是否有足够的钱解锁
     */
    public isEnoughMoneyOpen() {
        return this.sceneZone.check(this.levelUpDatas.openChips);
    }
    public initData(data: BaseWorkZoneSData) {
        let attrObj = this.attrObj;
        attrObj.level = data.level;
        attrObj.isOpen = data.isOpen === 1;
    }
    public open(): void {
        this.initData({
            level: 0,
            isOpen: 1
        })
        this.init();
    }
    public createMemento(): FoodSaveData {
        return {
            isOpen: this.attrObj.isOpen ? 1 : 0,
            level: this.attrObj.level,
            index: this.attrObj.index
        }
    }
    public setMemento(data: FoodSaveData) {
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