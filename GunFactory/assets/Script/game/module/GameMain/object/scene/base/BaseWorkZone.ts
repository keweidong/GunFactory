import UpgradeDetailInfo from "../../../upgrade/UpgradeDetailInfo";
import { CsvDataBase } from "../config/ConfigClass";
import ScenegZone from "../SceneZone";
import BaseWorkZoneAttr from "./BaseWorkZoneAttr";

export default abstract class BaseWorkZone {
    public sceneZone: ScenegZone = null;

    public levelUpDatas: {
        getData: (level: number) => BaseWorkLevelData;
        getCount: () => number;
    } = null;

    abstract attrObj: BaseWorkZoneAttr;
    abstract tempAttrObj: BaseWorkZoneAttr;
    /**升级的详情数据 */
    public detailInfo: UpgradeDetailInfo<BaseWorkZoneAttr>;
    public constructor(sceneZone: ScenegZone) {
        this.sceneZone = sceneZone;
    }


    /**
     * 更新某个区域的升级预览数据
     * @param addCount:加多少级,-1表示升到可以升的最高级别
     */
    public updateZonePreData(addCountType: number) {
        let info = this.detailInfo;
        let zone = this;
        let zoneAttr = zone.attrObj;
        let maxLevel = zoneAttr.maxLevel;
        if (zoneAttr.level === maxLevel) {//已经升到最高级别了,没办法再升了
            if (info.costMoney && info.costMoney !== zoneAttr.maxUpgradeBigNum) {
                info.costMoney.release();
                info.costMoney = null;
            }
            info.cal(zone.detailInfo.curData);
            info.levelCnt = 0;
            info.isEnough = false;
            info.nextChangeLevel = info.lastChangeLevel = -1;
            return;
        }
        if (addCountType == -1) {//升到可以升的最大值
            //取到可以升级的最大级数,跟所需的钱
            var level = zoneAttr.maxUpgradeCnt;
            var money = zoneAttr.maxUpgradeBigNum;
            if (level <= zoneAttr.level) {//如果一级都升不了
                level = zoneAttr.level + 1;
                if (level > maxLevel) {
                    level = maxLevel;
                }
                info.levelCnt = 1;
                var money = zone.getCostByLevel(level);
            } else {
                info.levelCnt = level - zoneAttr.level;
            }
        } else {
            var level = zoneAttr.level + addCountType;
            if (level > maxLevel) {
                level = maxLevel;
                addCountType = maxLevel - zoneAttr.level;
            }
            info.levelCnt = addCountType;
            var money = zone.getCostByLevel(level);
        }
        if (info.costMoney && info.costMoney !== zoneAttr.maxUpgradeBigNum) {
            info.costMoney.release();
        }
        info.costMoney = money;
        info.isEnough = info.costMoney.cmp(zone.sceneZone.getNowMoney()) <= 0;
        info.addCountType = addCountType;
        zone.getAttrBaseObjectByLevel(this.tempAttrObj, level);
        info.cal(this.tempAttrObj);
    }

    public checkUpgradeMoneyIsEnough() {
        if (this.detailInfo.costMoney) {
            
            this.detailInfo.isEnough = this.detailInfo.costMoney.cmp(this.sceneZone.getNowMoney()) <= 0;
        }
    }

    /**
     * 获取能升级的最高等级
     * @param level:从多少级开始升级
     * @param money:能够用来升级的钱
     * @param resultNum:一个用于存储结果的可复用 MyBigLong 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
     */
    public getMaxUpgradeCnt(level: number, money: MyBigLong, resultNum: MyBigLong): number {
        let need = MyBigLong.create(0, 0);
        //需要优化
        for (var i = level; i < this.attrObj.maxLevel; i++) {
            //如果有boss技能的话,要算上boss技能的减免
            let srcAbo = this.levelUpDatas.getData(i);
            let needChips = srcAbo.nextLevelChips;
            let num = needChips * this.attrObj.discount;
            resultNum.add(need.init(num, 0));
            if (resultNum.cmp(money) > -1) {
                resultNum.sub(need);
                break;
            }
        }
        need.release();
        return i;
    }
    /**
     * 提升等级
     * @param count 要升的等级
     * @param isFree 是否免费
     * @returns 0:成功, -1:金币不足, -2:已经是最高等级了
     */
    public upLevel(count: number, isFree?: boolean): number {
        let attrObj = this.attrObj;
        if (attrObj.maxLevel === attrObj.level) {
            Log.trace("已达到最高等级!!!!");
            return -2;
        }
        let level = attrObj.level + count;
        if (level > attrObj.maxLevel) {
            level = attrObj.maxLevel;
        }
        if (isFree) {
            //看广告升级
            attrObj.level = level;
            this.init();
            return 0;
        } else {
            //花钱升级
            let needMoney = this.getCostByLevel(level);
            if (this.sceneZone.check(needMoney)) {
                attrObj.level = level;
                this.init();
                this.sceneZone.nowMoneySub(needMoney);
                needMoney.release();
                return 0;
            } else {
                needMoney.release();
                return -1;
            }
        }

    }
    /**
     * 计算能过升级的最大级数
     */
    public updateMaxUpgradeCnt(isAdd: boolean) {
        let level = this.attrObj.maxUpgradeCnt;
        this.attrObj.maxUpgradeBigNum.clear();
        this.attrObj.maxUpgradeCnt = this.getMaxUpgradeCnt(this.attrObj.level, this.sceneZone.getNowMoney(), this.attrObj.maxUpgradeBigNum);
        return level !== this.attrObj.maxUpgradeCnt;
    }
    /**
     * 获取升级到某一层所需的费用
     * @param level:要升到的级数
     */
    public getCostByLevel(level: number) {
        if (level <= this.attrObj.level) {
            return null;
        }
        let money = MyBigLong.create(0, 0);
        for (let i = this.attrObj.level; i < level; i++) {
            //如果有boss技能的话,要算上boss技能的减免
            let srcAbo = this.levelUpDatas.getData(i);
            let needChips = srcAbo.nextLevelChips;
            let num = needChips * this.attrObj.discount;
            money.add(num);
        }
        return money;
    }
    /**
     * 检查是否能升count级
     * 
     * @param {number} count 要升多少级
     * @returns mydesciption
     * 
     * @author
     * @version
     */
    public checkIsCanUpgarde(count: number) {
        if (this.attrObj.maxLevel === this.attrObj.level) {
            Log.trace("已达到最高等级!!!!");
            return false;
        }
        let level = this.attrObj.level + count;
        if (level > this.attrObj.maxLevel) {
            level = this.attrObj.maxLevel;
        }
        let needMoney = this.getCostByLevel(level);
        let result = this.sceneZone.check(needMoney);
        needMoney.release();
        return result;
    }
    public routine(tick: long): void {
        if (!this.attrObj.isOpen) {
            return;
        }
    }
    public isOpen() {
        return this.attrObj.isOpen;
    }


    /**
     * 获取某一层的属性
     */
    public getAttrBaseObjectByLevel(attrObj: BaseWorkZoneAttr, level: number) {
        attrObj.level = level;
        attrObj.buffList = this.sceneZone.worldScene.buffMsr.getKcBuffAttrList(this.sceneZone.getId());
        attrObj.levelData = this.levelUpDatas.getData(level);
        attrObj.calFinalAttr();
    }
    protected init(): void {
        // this.attrObj.maxLevel = this.sceneZone.workDataMgr.dataCnt - 1;

        this.attrObj.buffList = this.sceneZone.worldScene.buffMsr.getKcBuffAttrList(this.sceneZone.getId());
        this.attrObj.maxLevel = this.levelUpDatas.getCount() - 1;
        this.attrObj.levelData = this.levelUpDatas.getData(this.attrObj.level);
        // this.attrObj.baseData = this.sceneZone.kuangCengDataMgr.getConfig(this.sceneZone.getId(), this.attrObj.index);
    }
    public createMemento(): BaseWorkZoneSData {
        return {
            level: this.attrObj.level,
            isOpen: this.attrObj.isOpen ? 1 : 0
        };
    }

    public updateBuff() {
        // this.attrObj.buffList = this.sceneZone.worldScene.buffMsr.getKdBuffAttrList(this.sceneZone.getId(), this.attrObj.index);
        // if (this.attrObj.isOpen)
        this.attrObj.calFinalAttr();
    }
    // public setMemento(data: BaseWorkZoneSData) {
    // 	// if (data) {
    // 	// // 	this.attrObj.level = data.level;
    // 	// // 	this.attrObj.openState = true;
    // 	// // 	// this.nowMoney.bigLong = data.nowMoney;
    // 	// 	this.init(null);
    // 	// } else {
    // 	// 	this.attrObj.isOpen = 0;
    // 	// }

    // }
    public onExit() {

    }
}
export interface BaseWorkLevelData extends CsvDataBase {
    /**
    * 升级所需代币
    */
    readonly nextLevelChips: number;
}

export interface BaseWorkZoneSData {
    /**
     * 0:还未开启
     * 1:已经开启了
     * -1:有需要解锁的障碍物
     */
    isOpen: number;
    /**
     * 当前的级别
     */
    level: number;
}