import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import AchievementItem from './AchievementItem/AchievementItem';
import { AchievementDataMsr, AchievementData } from "./AchievementDataMsr";
import { AchievementType } from "./AchievementConst";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
/**
 * 成就界面
 */
@ccclass
export default class AchievementView extends BaseView {
    // AchievementController
    // AchievementItem
    // AchievementModle
    // AchievementManager
    // AchievementConst
    public bgType: BG_TYPE = BG_TYPE.GRAY;

    @property(cc.Node)
    itemNode: cc.Node = null

    /**item列表 */
    @property(cc.Node)
    itemList: cc.Node[] = []

    /**热评成就配置 */
    good_AchievementConfs: AchievementData[] = [];
    /**明星成就配置 */
    star_AchievementConfs: AchievementData[] = [];
    /**菜式成就配置 */
    featureFood_AchievementConfs: AchievementData[] = [];
    /**邀请顾客成就配置 */
    guke_AchievementConfs: AchievementData[] = [];


    initUI() {
        super.initUI();

    }

    updaByType(type: AchievementType, num: number) {
        this.itemList[type].getComponent(AchievementItem).updateNum(num);
    }

    setData(data: AchievementSave) {
        for (let index = 0; index < this.itemList.length; index++) {
            let itemData: AchievementConf = null;
            switch (index) {
                case AchievementType.Good_Achievement:
                    itemData = {
                        conf: {
                            numId: data.good_num,
                        },
                        achievementData: this.good_AchievementConfs[data.good_id],
                    }

                    // itemData.conf.numId = data.good_num;
                    // itemData.achievementData = this.good_AchievementConfs[data.good_id];
                    break;
                case AchievementType.Star_Achievement:
                    itemData = {
                        conf: {
                            numId: data.star_num,
                        },
                        achievementData: this.star_AchievementConfs[data.star_id],
                    }
                    // itemData.conf.numId = data.star_num;
                    // itemData.achievementData = this.star_AchievementConfs[data.star_id];
                    break;
                case AchievementType.FeatureFood_Achievement:
                    itemData = {
                        conf: {
                            numId: data.featureFood_num,
                        },
                        achievementData: this.featureFood_AchievementConfs[data.featureFood_id],
                    }
                    // itemData.conf.numId = data.featureFood_num;
                    // itemData.achievementData = this.featureFood_AchievementConfs[data.featureFood_id];
                    break;
                case AchievementType.Guke_Achievement:
                    itemData = {
                        conf: {
                            numId: data.guke_num,
                        },
                        achievementData: this.guke_AchievementConfs[data.guke_id],
                    }
                    // itemData.conf.numId = data.guke_num;
                    // itemData.achievementData = this.guke_AchievementConfs[data.guke_id];
                    break;
            }
            this.itemList[index].getComponent(AchievementItem).setData(itemData);

        }


    }
    open() {
        super.open();


    }

    close() {
        super.close();



    }

}
