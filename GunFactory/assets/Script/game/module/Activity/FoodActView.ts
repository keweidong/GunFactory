import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { UI } from "../../../core/utils/Image";
import { ViewConst } from "../../consts/ViewConst";
import { ActivityConst } from "./ActivityConst";
import { FoodActScoreManager } from "./FoodActManager";
import { Platform } from "../../platform/Platform";
import { save_prop_Const } from "../../platform/PlatformBase";
import { GameText } from "../../../core/lang/GameText";



// const colorWidth = 252

// const aniList = [["huo", "huoshao"], ["daoyou", "daoyouer"], ["chaocai", "chaocaier",]]

const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodActView extends BaseView {
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    /** 菜式图片 */
    @property(UI.Image)
    protected foodSp: UI.Image = null;

    /** 菜式名字 */
    @property(cc.Label)
    protected foodNameLab: cc.Label = null;

    /** 色块 */
    @property(UI.Image)
    protected colorImg: UI.Image = null;

    /** 箭头 */
    @property(cc.Node)
    protected arrowNode: cc.Node = null;

    /** 加分 */
    @property(cc.Label)
    protected addLab: cc.Label = null;


    @property(cc.Label)
    protected scoreNum: cc.Label = null;

    protected userData: FoodActUserData = null;
    protected rankData: FoodActRankData = null;
    /** 当前活动步骤 */
    protected curIndex: number = null;


    @property([cc.Node])
    protected aniNode: cc.Node[] = [];
    protected aniFood: cc.Animation[] = [];

    @property(cc.Node)
    protected guoSp: cc.Node = null;

    protected foodActScoreManager: FoodActScoreManager = null;
    protected foodActConfig;
    public bgType: BG_TYPE = BG_TYPE.GRAY;

    protected order: IOrder = null;

    public init() {
        this.foodActScoreManager = App.ConfigManager.getConfig("FoodActScoreManager");
    }

    initUI() {
        super.initUI();

        // cc.loader.loadResDir("Texture/FoodView");
        this.init();
        this.addLab.node.active = false;

        let len = this.aniNode.length;
        for (let i = 0; i < len; i++) {
            let node = this.aniNode[i];
            let ani = node.getComponent(cc.Animation);
            this.aniFood[i] = ani;
            if (node.parent) {
                node.removeFromParent(false);
            }
            // ani.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
        }

    }

    open(order: IOrder) {
        super.open();
        this.order = order;

        /**后台统计特色菜点击 */
        Platform.instance.recordNode(save_prop_Const.FeaturedFood_click, this.order.food.getId(), 1, 1, 1);
    }

    close() {
        super.close();
        //     if (this.isPlay) {
        //         App.TimerManager.remove(this.arrowTick, this);
        //     }

        if (this.tw) {
            this.tw.stop();
            this.tw = null;
        }
        let len = this.aniNode.length;
        for (let i = 0; i < len; i++) {
            let node = this.aniNode[i];
            let ani = node.getComponent(cc.Animation);
            this.aniFood[i] = ani;
            ani.stop();
            if (node.parent) {
                node.removeFromParent(false);
            }
        }
        //     ADController.getInstance().unregisterItem(AdType.FOOD_ACT, this);
        //     ADController.getInstance().unregisterItem(AdType.FOOD_ASSIST, this);
    }

    /** 设置活动步骤 */
    public setActIndex() {
        let index = this.userData.index;
        this.colorImg.source = `Texture/FoodView/lv${index + 1}`;
        // this.arrowNode.x = 0;
        this.playArrowAni();
    }

    /** 更新界面 */
    public updatePanel() {
        this.guoSp.active = true;
        this.colorImg.node.active = true;
        this.setActIndex();
    }

    /** 设置玩家厨神大赛数据 */
    public setUserData(data: FoodActUserData) {
        this.userData = data;
        this.foodSp.source = this.order.food.getOrderIcon();
        this.updateScore();
        this.updatePanel();
        let len = this.aniNode.length;
        for (let i = 0; i < len; i++) {
            let node = this.aniNode[i];
            let ani = node.getComponent(cc.Animation);
            this.aniFood[i] = ani;
            ani.stop();
            if (node.parent) {
                node.removeFromParent(false);
            }
        }
    }

    /**
     * 播放做菜动画
     * @param index 动画步骤
     */
    public playIndexAni(index?: number) {
        this.guoSp.active = false;
        index = this.userData.index;
        for (let i = 0; i < this.aniFood.length; i++) {
            let ani = this.aniFood[0];
            ani.stop();
        }
        switch (index) {
            case 0:
                this.aniFood[3].play("huo_2");
                if (!this.aniNode[3].parent) {
                    this.bg.node.addChild(this.aniNode[3]);
                }
                this.aniFood[1].play("daoyou");
                if (!this.aniNode[1].parent) {
                    this.bg.node.addChild(this.aniNode[1]);
                }
                if (this.aniNode[2].parent) {
                    this.aniNode[2].removeFromParent(false);
                }
                this.aniFood[0].play("huo");
                if (!this.aniNode[0].parent) {
                    this.bg.node.addChild(this.aniNode[0]);
                }
                break;
            case 1:
                this.aniFood[3].play("huoer_2");
                if (!this.aniNode[3].parent) {
                    this.bg.node.addChild(this.aniNode[3]);
                }

                if (this.aniNode[1].parent) {
                    this.aniNode[1].removeFromParent(false);
                }
                this.aniFood[2].play("chaocai");
                if (!this.aniNode[2].parent) {
                    this.bg.node.addChild(this.aniNode[2]);
                }
                this.aniFood[0].play("huoshao");
                this.aniNode[0].removeFromParent(false);
                this.bg.node.addChild(this.aniNode[0]);

                break;
            case 2:
                this.aniFood[3].play("huoer_2");
                if (!this.aniNode[3].parent) {
                    this.bg.node.addChild(this.aniNode[3]);
                }

                if (this.aniNode[1].parent) {
                    this.aniNode[1].removeFromParent(false);
                }
                this.aniFood[2].play("chaocaiguogai");
                if (!this.aniNode[2].parent) {
                    this.bg.node.addChild(this.aniNode[2]);
                }
                this.aniFood[0].play("huoshao");
                this.aniNode[0].removeFromParent(false);
                this.bg.node.addChild(this.aniNode[0]);
                break;
        }
    }

    /** 活动步骤完成 */
    public onComplete(index: number) {
        this.userData.index++;
        if (this.userData.index > 2) {
            App.ViewManager.open(ViewConst.FoodActInfoView, this.userData, this.order);
            this.onTouchClose()
        } else {
            this.setActIndex();
        }

    }

    protected isPlay: boolean = false;
    protected tw: cc.Tween<any>;
    /** 弧度 */
    protected rad1: number = 1.963;
    protected rad2: number = 1.188;
    protected rad3: number = 2.138;
    protected rad4: number = 1.007;
    /** 半径 */
    protected radius1: number = 343.6;
    protected radius2: number = 458.8;
    /** 当前弧度 */
    protected curRad: number = 1.57; // totalRad / 2  + rad2
    /** 圆心 */
    protected center1 = { x: -2.63, y: -367.25 };
    protected center2 = { x: -2.42, y: -381.06 };
    /** 夹角弧度 */
    protected totalRad = 0.775;
    protected isLeft: boolean;
    protected arrowTick(dt: number) {
        // 转动弧度 todo
        let temp = dt / this.nextTime * this.totalRad;
        if (this.isLeft) {
            this.curRad = this.curRad - temp;
            this.nextTime = this.totalTime;
        }
        else {
            this.curRad = this.curRad + temp;
            this.nextTime = this.totalTime;
        }

        if (this.curRad >= this.rad1) {
            this.isLeft = true;
        }
        else if (this.curRad <= this.rad2) {
            this.isLeft = false;
        }

        // 新坐标
        let y = Math.sin(this.curRad) * this.radius1 + this.center1.y;
        let x = Math.cos(this.curRad) * this.radius1 + this.center1.x;
        this.arrowNode.x = x;
        this.arrowNode.y = y;

        // 偏转角度
        let rate = (this.rad1 - this.curRad) / (this.rad1 - this.rad2);
        let t = this.rad3 - rate * (this.rad3 - this.rad4);
        let newY1 = Math.sin(t) * this.radius2 + this.center2.y;
        let newx1 = Math.cos(t) * this.radius2 + this.center2.x;
        let offsetRad = App.MathUtils.getRadian2(x, y, newx1, newY1);
        let angle = App.MathUtils.getAngle(offsetRad);
        this.arrowNode.angle = angle - 90;
        // CC_DEBUG && Log.trace('当前位置信息', dt * 0.01, this.curRad, x, y, angle);
    }

    protected totalTime: number;
    protected nextTime: number;
    /**
     * 播放箭头动画
     */
    protected playArrowAni() {
        this.isPlay = true;
        this.curRad = 1.57;
        let index = this.userData.index;
        // let index = this.userData.isFirst ? this.userData.index : this.userData.index + 3;
        let config = this.foodActScoreManager.getData(index);
        this.totalTime = config.time;
        this.nextTime = this.totalTime / 2;
        App.TimerManager.doTimer(0, 0, this.arrowTick, this);
    }

    /**
     * 飘字动画
     */
    protected playLabelAni(score: number) {
        this.addLab.node.active = true;
        if (!this.addLab.node.parent) {
            this.bg.node.addChild(this.addLab.node);
        }
        this.addLab.node.y = -100;
        this.addLab.string = "+" + score;
        cc.tween(this.addLab.node)
            .to(0.8, { y: 50 })
            .call(() => {
                this.addLab.node.active = false;
                this.addLab.node.removeFromParent(false);
            })
            .start()
    }

    protected startTw: cc.Tween<any>;


    protected onTouchHelpBtn() {
        App.ViewManager.open(ViewConst.FoodActHelpView);
    }

    protected onTouchStopBtn() {
        if (this.isPlay) {
            this.isPlay = false;
            App.TimerManager.remove(this.arrowTick, this);

            let score = this.foodActScoreManager.getScore(this.userData.index, (this.totalRad - Math.abs(this.curRad - 1.57)) / this.totalRad * 100);
            CC_DEBUG && Log.trace('分数:', score, this.curRad, Math.abs(this.curRad - 1.57), this.totalRad);

            /** 飘字 */
            this.playLabelAni(score);
            /** 播放炒菜动画 */
            this.playIndexAni();
            let list = this.userData.scoreList;
            list.push(score);
            this.updateScore();
            // this.applyFunc(ActivityConst.ADD_FOOD_ACT, score);
        }
    }
    protected updateScore() {
        let allScore = 0;
        for (const score of this.userData.scoreList) {
            allScore += score;
        }
        // CC_DEBUG && Log.trace("this.userData.scoreList[0] + this.userData.scoreList[1] + this.userData.scoreList[2]", this.userData.scoreList[0] + this.userData.scoreList[1] + this.userData.scoreList[2]);
        this.scoreNum.string = GameText.getText(lang.food_act_score).format(allScore);//`分数:${allScore}分`;
    }

    onTouchBg() {
        this.onTouchStopBtn();
    }

    /** 点击提交成绩 */
    protected onTouchSumbitBtn() {
        this.onTouchClose();
        this.applyFunc(ActivityConst.SUMBIT_FOOD_ACT, this.order);
    }
}

declare global {

    /**
     * 厨神大赛排名数据
     */
    interface FoodActRankData {
        /** 排行列表 */
        ranking_list: LocalRankData[],
        /** 省份名称 */
        province_name: string,
        /** 玩家数据 */
        user: LocalUserData,
        /** 排行时间 */
        ranking_time: number
    }

    /**
     * 厨神大赛玩家数据
     */
    interface FoodActUserData {
        /** 活动状态 */
        actState?: number,
        /** 当前进行步骤 */
        index: number,
        /** 各个步骤分数 */
        scoreList?: number[],
        /** 是否第一次 */
        isFirst?: boolean;
    }
}