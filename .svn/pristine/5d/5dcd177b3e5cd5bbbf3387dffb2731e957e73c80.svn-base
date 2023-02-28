import { BuffAttr } from "../../../../Buff/IBuff";
import { BaseWorkLevelData } from "./BaseWorkZone";

export default class BaseWorkZoneAttr {
    /**
     * 是否已经开启
     */
    isOpen: boolean;
    /**
     * 当前升级折扣
     */
    discount: number = 1;
    /**
     * 序号(表示第几块农田或者别的)
     */
    index: int = 0;
    /**
     * 产生资源的倍率(基础倍率)
     */
    workerRate: int = 1;
    /**
     * 等级
     */
    level: number = -1;
    /**
     * 当前可以升级到的最大级数,
     * 每次金钱变化都会自动重新计算一次
     */
    maxUpgradeCnt: number = 0;
    /**
     * 升级到最高级所花的金钱
     */
    maxUpgradeBigNum: MyBigLong = MyBigLong.create(0, 0);
    /**
     * 这个工作区域最高能升到几级
     */
    maxLevel: number = 799;
    /** buff属性列表 */
    buffList: BuffAttr;

    levelData:BaseWorkLevelData = null;

    /**
     * 计算最终属性
     */
    calFinalAttr() {

    }
}
