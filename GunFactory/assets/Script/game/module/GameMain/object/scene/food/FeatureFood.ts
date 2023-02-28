import App from "../../../../../../core/App";
import { ControllerConst } from "../../../../../consts/ControllerConst";
import { BagConst } from "../../../../bag/BagConst";
import UpgradeDetailInfo from "../../../upgrade/UpgradeDetailInfo";
import { FeatureFoodData } from "../config/FeatureFoodDataMsr";
import ScenegZone from "../SceneZone";
import FoodAttr from "./FoodAttr";
import { FoodType } from "./FoodMsr";
export class FoodUpgradeDetailInfo extends UpgradeDetailInfo<FoodAttr>{
    /**
    * @param updateData 升级的预览属性
    */
    public cal(updateData: FoodAttr) {
        this.preData = updateData;
    }
}
export class FeatureFood implements IFood {
    tempAttrObj: FoodAttr = null;
    foodType: FoodType = FoodType.FEATURE;
    /**当前菜式的所有升级数据 */
    public conf: FeatureFoodData = null;
    protected iconStr: string = "";
    // /**菜式评分 */
    // protected score: number = 0;
    constructor(protected sceneZone: ScenegZone) {
    }
    // public setScore(score: number) {
    //     this.score = score;
    // }
    public init(conf: FeatureFoodData): void {
        this.conf = conf;
        this.iconStr = "Texture/FoodView/FoodSprite/chuancai_" + this.conf.icon;
    }
    public getId(): number {
        return this.conf.id;
    }
    public getAward(order: IOrder, rate: number) {
        let arrLen = this.conf.scoreList.length;
        for (let i = 0; i < arrLen; i++) {
            if (order.score <= this.conf.scoreList[i]) {
                App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, this.conf.awardList[i], this.conf.awardCntList[i], 3);
                break;
            }
        }
    }
    /**
     * 获取当前等级图标
     */
    public getCurLevelIcon() {
        return "";
    }
    /**
     * 获取下单icon
     */
    public getOrderIcon() {
        return this.iconStr;
    }

}