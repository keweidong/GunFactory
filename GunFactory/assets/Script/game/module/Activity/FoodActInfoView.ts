import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { UI } from "../../../core/utils/Image";
import { ViewConst } from "../../consts/ViewConst";
import { Platform } from "../../platform/Platform";
import { save_prop_Const } from '../../platform/PlatformBase';
import { FeatureFoodDataList } from "../GameMain/object/scene/config/FeatureFoodDataMsr";
import { ActivityConst } from "./ActivityConst";


const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodActInfoView extends BaseView {
    /** 菜式图片 */
    @property(UI.Image)
    protected foodSp: UI.Image = null;

    /** 评分进度条 */
    @property([cc.ProgressBar])
    protected progressList: cc.ProgressBar[] = [];

    /** 结算分数 */
    @property(cc.Label)
    protected scoreLab: cc.Label = null;

    /** 总分 */
    @property(cc.Label)
    protected totalLab: cc.Label = null;

    /** 结算评级 */
    @property(UI.Image)
    protected quiltyImg: UI.Image = null;

    @property(cc.Node)
    protected ani: cc.Node = null;
    protected boxAni: cc.Animation = null;

    @property(cc.Node)
    protected infoNode: cc.Node = null;

    @property(cc.Node)
    protected ensure: cc.Node = null;

    @property(cc.Label)
    protected share: cc.Label = null;

    protected isPlaying: boolean = null;
    protected userData: FoodActUserData = null;
    protected foodActConfig;

    protected order: IOrder = null;

    /**奖励 */
    @property(cc.Label)
    public awardLabel: cc.Label = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    initUI() {
        super.initUI();
        // db://assets/resources/Texture/FoodView
        this.infoNode.active = false;
        this.boxAni = this.ani.getComponent(cc.Animation);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchTap, this);
        this.boxAni.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }

    open(data: FoodActUserData, order: IOrder) {
        super.open();
        this.order = order;
        this.ensure.active = false;

        this.setData(data);

        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.TimerManager.doTimer(8000, 1, () => { this.ensure.active = true; }, this);
        } else {
            this.share.string = GameText.getText(lang.common_click_sure);// "点击确定";
        }
    }

    close() {
        super.close();
    }

    protected showInfo() {
        this.infoNode.active = true;
    }

    protected onAnimCompleted(event) {
        if (this.isPlaying) {
            this.isPlaying = false;
        }
        this.showInfo();
    }
    protected onTouchTap() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.ani.stopAllActions();
            this.boxAni.play("csdstjcs", 20);
            this.showInfo();
        } else {
            // this.close();
            // App.ViewManager.closeView(this);
        }
    }
    featureFoodConfs: FeatureFoodDataList;
    /**
     * 完成厨神大赛活动
     */
    public setData(data: FoodActUserData) {
        this.userData = data;
        this.foodSp.source = this.order.food.getOrderIcon();
        this.boxAni.play("csdstjcs");

        this.isPlaying = true;
        this.updatePanel();

        let num = this.applyFunc(ActivityConst.GET_ORDER_AWARDNUM, this.order);

        this.setAward(MyBigLong.toString(num));

    }

    /**奖励 */
    public setAward(str: string) {
        this.awardLabel.string = str;
    }


    public updatePanel() {
        let scoreList = this.userData.scoreList;
        let len = scoreList.length;
        let str = "";
        let totalScore: number = 0;
        for (let i = 0; i < len; i++) {
            let score = scoreList[i];
            let progress = this.progressList[i];
            if (progress) {
                progress.progress = 0;
                cc.tween(progress)
                    .to(0.8, { progress: score / 100 })
                    .start()
            }

            let add = 0;
            totalScore += score + add;
            str += score
            //  + `(+${add})`;
            if (i < len - 1) {
                str += "\n";
            }
        }

        this.scoreLab.string = str;
        this.totalLab.string = totalScore + "";
        if (totalScore >= 270) {
            this.quiltyImg.source = "Texture/FoodView/wanmei";
        } else if (totalScore >= 210) {
            this.quiltyImg.source = "Texture/FoodView/youxiu";
        } else {
            this.quiltyImg.source = "Texture/FoodView/yiban";
        }
        this.order.score = totalScore;
        // (this.order.food as FeatureFood).setScore(totalScore);
        // this.assistNum.string = `分数加成（${this.userData.assistNum}/${this.foodActConfig.assistNum}）次`;
    }
    /** 点击提交成绩 */
    protected onTouchSumbitBtn() {
        this.order.isFinish = true;
        this.applyFunc(ActivityConst.SUMBIT_FOOD_ACT, this.order);

        /**后台统计特色菜完成 */
        Platform.instance.recordNode(save_prop_Const.FeaturedFood_over, this.order.food.getId(), 1, 1, 1);
        App.ViewManager.closeView(this);
    }

    onTouchBg() {

    }

    /**分享 */
    onTouchShare() {
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.ViewManager.open(ViewConst.ShotView, false);
        } else {
            this.onTouchSumbitBtn();
        }
    }

}