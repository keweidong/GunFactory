import BaseWorkZoneAttr from "../object/scene/base/BaseWorkZoneAttr";

export default class UpgradeDetailInfo<T extends BaseWorkZoneAttr> {
    levelCnt: number;
    /**要升多少级,-1表示计算可升到多少级 */
    addCountType: number;
    /**
     * 升级所需货币量(这个变量不允许修改)
     */
    costMoney: MyBigLong;
    /**
     * 是否有足够的钱升级
     */
    isEnough: boolean;
    /**
     * [上次巨大提升的等级,下次巨大提升的等级,当前级别]
     */
    // awardLeves: number[] = [0, 0, 0];

    nextChangeLevel: number = -1;
    lastChangeLevel: number = -1;

    // public curData: T = null;
    preData: T = null;
    constructor(public curData: T) {
    }
    /**
     * @param updateData 升级的预览属性
     */
    public cal(updateData: T) {
        this.preData = updateData;

    }
}