import App from "../../../core/App";

import BaseController from "../../../core/mvc/controller/BaseController";
import NodePool from "../../../core/utils/NodePool";
import Toast from "../../../core/utils/Toast";
import HappyDisplay from "../../component/HappyDisplay";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst, GameNotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { CostType } from "../bag/BagController";
import { GameConst } from "../GameMain/GameConst";
import HappyMoneyView from "../GameMain/HappyMoneyView";
import Customer from "../GameMain/object/scene/role/Customer";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GameUIConst } from "../GameUI/GameUIConst";
import { GuideConst } from "../guide/GuideModel";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import { HappyConst } from "./HappyConst";
import { HappyModel } from "./HappyModel";
import { Platform } from "../../platform/Platform";
import GameUIController from "../GameUI/GameUIController";
import { GameRecorderConst } from "../ToutiaoGameRecorder/GameRecorderConst";
import GameUIView from "../GameUI/GameUIView";
import GameRecorderController from "../ToutiaoGameRecorder/GameRecorderController";
import { GameText } from "../../../core/lang/GameText";

/** 欢乐时光管理器 */
export default class HappyController extends BaseController {
    protected _model: HappyModel = null;
    protected world: WorldScene = null;
    protected happyPool: NodePool = null;

    /** 刷新愉悦值 */
    public static UPDATE_HAPPY = "UPDATE_HAPPY";
    public static START_HAPPY_TIME = "START_HAPPY_TIME";
    public static STOP_HAPPY_TIME = "STOP_HAPPY_TIME";
    protected happyBarView: IHappyBarView = null;

    /**欢乐值的父节点 */
    protected parentNode: cc.Node = null;
    /**欢乐值飘往的目的点 */
    protected targetPos: cc.Vec2 = null;
    protected happyMoneyView: HappyMoneyView = null;


    protected happyNodes: cc.Node[] = [];
    public constructor() {
        super();
        App.ViewManager.register(ViewConst.HappyMoneyView, {
            prefabName: "HappyMoneyView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this.registerFunc(HappyConst.INIT_HAPPY_TIME, this.onInitHappyTime, this);
        this.setModel(new HappyModel(this));
    }
    protected initGame() {
        this._model.init();
        let isSuperOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.HAPPY);
        if (isSuperOpen) {
            this.initNotificationEvent();
            this.initModuleEvent();
        } else {
            App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);
        }
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this._model.data.happyTime = 0;
    }

    /**
     * 初始化欢乐时光
     * @param targetPos 欢乐值飘往的目的点
     */
    protected onInitHappyTime(view: IHappyBarView, targetPos: cc.Vec2) {
        this.targetPos = targetPos;
        this.setHappyBarView(view);
    }
    /**
     * 更新系统开放
     * @param sysIndex 系统id
     * @param isOpen 是否开启
     */
    protected onSystemOpen(sysIndex: number, isOpen: boolean) {
        if (isOpen && sysIndex === OpenTypeConst.HAPPY) {
            this.initNotificationEvent();
            this.initModuleEvent();
            App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);
        }
    }
    protected initNotificationEvent() {
        // App.NotificationCenter.addListener(GameNotificationConst.CUSTOMER_EAT_FINISH, this.onCustomerEatFinish, this);
        // App.NotificationCenter.addListener(NotificationConst.ADD_ASSIST_LV, this.updateAssist, this);
        // App.NotificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);

    }

    protected async initModuleEvent() {
        await this.loadPool();
        let isGuideFinish = this.applyControllerFunc(ControllerConst.Guide, GuideConst.CHECK_IS_GUIDE, 1);
        if (isGuideFinish) {//新手引导已经完成
            this.registerFunc(HappyConst.CREATE_HAPPY, this.checkIsCanCreateHappy, this);
        } else {
            this.registerFunc(HappyConst.CREATE_GUIDE_HAPPY, this.onCreateGuideHappy, this);
        }

        this.registerFunc(HappyConst.COLLECT_HAPPY, this.collectHappy, this);
        this.registerFunc(HappyConst.GET_IS_HAPPY, this.isHappy, this);
        this.registerFunc(HappyConst.ADD_HAPPY, this.addHappyValue, this);
        this.registerFunc(HappyConst.OPEN_HAPPY, this.openHappyTime, this);
        this.registerFunc(HappyConst.GET_HAPPY_NODES, this.onGetHappyNodes, this);
        this.registerFunc(HappyConst.DOUBLE_HAPPY_MOENY, this.doubleHappyMoney, this);
        this.registerFunc(HappyConst.ON_HAPPY, this.onHappyTime, this);
    }
    protected async loadPool() {
        this.happyPool = new NodePool();
        this.happyPool.prefab = await App.ResManager.getResAsync("prefab/view/component/Happy", cc.Prefab);
    }
    protected onGetHappyNodes() {
        return this.happyNodes;
    }
    protected onCustomerEatFinish(customer: Customer) {
        // if (this._model.data.isFirst) {//配合新手引导,首次不爆星星
        //     this._model.data.isFirst = 0;
        //     return;
        // }
        // if (!this._model.data.happyTime && Math.random() > this._model.conf.rate) {
        //     let pos = customer.node.parent.convertToWorldSpaceAR(customer.node.position);
        //     this.createHappy(pos, customer.roleMsr.gameView.layer)
        // }
    }
    protected async doubleHappyMoney(isGet: boolean) {
        if (isGet) {
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.DOUBLE_HAPPY_MONEY);
            if (result) {
                let happyMoney = this.getHappyMoney();
                this.world.sceneMgr.nowScene.nowMoneyAdd(happyMoney.multiply(3));//3倍
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.coin);
                App.ViewManager.close(ViewConst.HappyMoneyView);
            } else {

            }
        } else {
            App.ViewManager.close(ViewConst.HappyMoneyView);
            this.resetHappyMoney();
        }
    }

    protected checkIsCanCreateHappy(pos: cc.Vec2, parentNode: cc.Node, addMoney?: number) {
        // if (this._model.data.isFirst) {//配合新手引导,首次不创建星星
        //     this._model.data.isFirst = 0;
        //     return;
        // } else 
        if (this._model.data.happyTime) {
            this._model._happyMoney.add(addMoney);
            return
        }
        else if (Math.random() > this._model.conf.rate) {
            return;
        }
        this.createHappy(pos, parentNode, addMoney);
    }
    protected onCreateGuideHappy(pos: cc.Vec2, parentNode: cc.Node) {
        let result = this.createHappy(pos, parentNode);
        //移除自动收集的定时器
        this.happyNodes[0].getComponent(HappyDisplay).removeAutoCollectTimer();
        this.unregister(HappyConst.CREATE_GUIDE_HAPPY);
        this.registerFunc(HappyConst.CREATE_HAPPY, this.checkIsCanCreateHappy, this);

        return result;
    }
    /** 创建愉悦值星星 */
    protected createHappy(pos: cc.Vec2, parentNode: cc.Node, addMoney?: number) {
        // 增加星星//
        let happy = this.happyPool.pop();
        this.happyNodes.push(happy);
        happy.active = true;
        happy.scale = 1;
        parentNode.convertToNodeSpaceAR(pos, pos)
        happy.position = pos;
        happy.y += 20;
        parentNode.addChild(happy);
        let customerPos = pos;
        let randomX = App.RandomUtils.limit(80, 150);
        var randomPos = cc.v2(customerPos.x + randomX, customerPos.y);
        randomPos.x = Math.min(randomPos.x, cc.winSize.width - 50);
        let x1 = customerPos.x + (randomPos.x - customerPos.x) / 3;
        let x2 = customerPos.x + (randomPos.x - customerPos.x) / 2;
        let time = Math.abs(randomX) / 200;
        return cc.tween(happy).bezierTo(time, cc.v2(x1, customerPos.y + 160), cc.v2(x2, customerPos.y + 200), randomPos).start();
    }
    collectHappy(node: cc.Node) {
        let pos = this.targetPos;
        let parent = LayerManager.getLayer(LayerManager.UI_Main);
        pos = parent.convertToNodeSpaceAR(pos);

        if (node.parent) {
            let startPos = node.parent.convertToWorldSpaceAR(node.position);
            startPos = parent.convertToNodeSpaceAR(startPos);
            node.removeFromParent(false);
            node.position = startPos;
        }
        parent.addChild(node);
        let happy = node.getComponent(HappyDisplay);
        happy.setMove();
        let dis = App.MathUtils.getDistance(node.x, node.y, pos.x, pos.y)
        let time = dis / 1000;
        this.happyNodes.remove(node);
        cc.tween(node)
            .bezierTo(time, node.position, cc.v2(node.x, pos.y + 30), pos)
            .call(() => {
                node.scale = 1;
                this.happyPool.push(node);
                this.addHappyValue(1);
            })
            .start();
    }
    protected setHappy() {
        if (this.happyBarView) {
            this.happyBarView.setHappy(this._model.data.happyValue, this.getMaxHappy());
        }
    }
    /**
     * 
     * @param moneyType 金钱类型
     * @param value 金钱变化值
     * @param isAdd 是否增加
     */
    protected updateMoney(moneyType: number, value: number | MyBigLong, isAdd: boolean) {
        if (isAdd) {//增加欢乐收益
            this._model._happyMoney.add(value);
        }
    }

    /**
     * isHappy
     */
    protected isHappy() {
        return this._model.data.happyTime;
    }

    protected getHappyMoney() {
        return this._model._happyMoney;
    }

    protected resetHappyMoney() {
        this._model._happyMoney.init(0, 0);
    }

    /** 增加欢乐值 */
    protected addHappyValue(value: number) {
        this._model.data.happyValue += value;
        this._model.data.happyValue = Math.min(this._model.data.happyValue, this.getMaxHappy());
        this.setHappy();
        App.NotificationCenter.dispatch(GameNotificationConst.ADD_HAPPY_VALUE);
    }

    /** 获取欢乐值 */
    protected getHappy() {
        return this._model.data.happyValue;
    }

    protected getMaxHappy() {
        // if (CC_PREVIEW) {
        //     return 2;
        // }
        return this._model.conf.maxValue * (this._model.data.curTimes + 1);
    }


    protected setHappyBarView(view: IHappyBarView) {
        this.happyBarView = view;
        if (this._model.data.curTimes >= this._model.conf.num) {
            this.unregister(HappyConst.CREATE_HAPPY);
            view.hideHappyBarView();
        } else {
            this.setHappy();
        }
        // view.setHappy(this._model.data.happyValue, this.getMaxHappy());
    }

    /** 重置欢乐值 */
    protected resetHappyValue() {
        this._model.data.happyValue = 0;
        // this.happyBarView.setHappy(this._model.data.happyValue, this.getMaxHappy());
        this.setHappy();
        // App.NotificationCenter.dispatch(NotificationConst.UPDATE_HAPPY, this._model._data.happyValue, 0);
    }

    /** 是否能开启欢乐时光 */
    protected openHappyTime() {
        let config = this._model.conf;
        /**辣鸡，测试用，记得关 */
        // this._model.data.happyValue = this.getMaxHappy()
        // this._model.data.curTimes = 0;

        if (this._model.data.curTimes >= config.num) {
            Toast.launch(GameText.getText(lang.happy_today_finish));
            return false;
        }
        if (this._model.data.happyValue >= this.getMaxHappy()) {
            if (cc.sys.platform == cc.sys.TOUTIAO_GAME) {
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.LUPING_CLOSE);
            }
            this.onHappyTime(true);
            if (cc.sys.platform == cc.sys.QQ_GAME) {
                App.TimerManager.doTimer(3000, 1, () => { App.ViewManager.open(ViewConst.ShotView, false); }, this)
            }
            // App.ViewManager.open(ViewConst.ShotView, height, width);
            return true;
        }
        else if (this._model.data.happyTime) {
            Toast.launch(GameText.getText(lang.happy_ing));
        }
        else {
            Toast.launch(GameText.getText(lang.happy_tip));
            return false;
        }
    }
    public static isFirHappy: boolean = true;

    /**开启欢乐时光 */
    protected onHappyTime(isFirst?: boolean) {

        let config = this._model.conf;
        for (let i = 0; i < config.buff.length; i++) {
            let buffData: BuffData = {
                buffIndex: config.buff[i],
                buffValue: config.buffValue[i],
                buffEndTime: App.DateUtils.Now() + config.time,
            }
            this.world.buffMsr.addKcBuff(this.world.sceneMgr.nowSceneId, buffData);
        }
        // App.NotificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);
        CC_DEBUG && Log.trace("开始欢乐时光");
        this._model.data.streetId = this.world.sceneMgr.nowSceneId;
        this._model.data.happyTime = App.DateUtils.Now() + config.time;
        App.TimerManager.doTimer(200, 0, this.checkHappyTime, this);
        // //播放欢乐时光背景音乐  暂时用外卖小哥的BGM代替
        // App.SoundManager.playBg("waiMaiBgm");
        this.resetHappyValue();
        this._model.data.curTimes++;
        App.NotificationCenter.dispatch(HappyController.START_HAPPY_TIME, true);
        if (isFirst && GameRecorderController.lupingType < 2 && cc.sys.platform == cc.sys.TOUTIAO_GAME) {
            GameRecorderController.lupingType = 2;
            App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.START);
        }

        //向后台发送热卖数据统计
        Platform.instance.recordInteractionAd("hot_click");
    }

    /** 欢乐时光检测 */
    protected checkHappyTime() {
        let now = App.DateUtils.Now();
        if (now >= this._model.data.happyTime) {



            App.TimerManager.remove(this.checkHappyTime, this)
            // 关闭欢乐时光特效
            if (this._model._happyMoney.cmp(0) > 0) {
                this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
                if (HappyController.isFirHappy && GameRecorderController.lupingType == 2 && cc.sys.platform == cc.sys.TOUTIAO_GAME) {
                    App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.STOP);
                    App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.LUPING_OPEN);
                    App.ViewManager.open(ViewConst.TipView, {
                        leftBtnText: "取消",
                        leftFunc: () => { },
                        leftThisObj: this,
                        rightBtnText: "分享",
                        rightFunc: () => { App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.ShareRecorder, GameRecorderController.lupingType); },
                        rightThisObj: this,
                        tipsStr: "是否分享额外获得一次欢乐时光\n(每日分享限制次数：" + this.world.HappyShare + "/2)",
                        hasCloseBtn: false,
                    } as COMMON_BOX)
                } else {
                    HappyController.isFirHappy = true;
                }
                App.ViewManager.open(ViewConst.HappyMoneyView, this._model._happyMoney);
            }
            this._model.data.happyTime = 0;
            this.setHappy();
            if (this._model.data.curTimes >= this._model.conf.num) {
                this.happyBarView.hideHappyBarView();
            }
            App.NotificationCenter.dispatch(HappyController.STOP_HAPPY_TIME, false);
            // App.NotificationCenter.removeListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);
            //播放背景音乐
            // App.SoundManager.playBg("bg");
        } else {
            this.happyBarView.updateHappyTime(this._model.data.happyTime - now, this._model.conf.time);
        }
    }

    protected updateDayData() {
        this._model.data.curTimes = 0;
    }
}
declare global {
    /**
     * 欢乐时光数据
     */
    interface HappySaveData {
        /** 愉悦值 */
        happyValue: number;
        /** 欢乐时光时间 */
        happyTime: number;
        /** 欢乐时光累计收益 */
        happyMoney: number[];
        /** 欢乐时光街道id */
        streetId: number;
        /** 当天欢乐时光次数 */
        curTimes: number;
        isFirst: number;
    }
    interface HappyConf {
        /** 欢乐时光时间 */
        time: number;
        /** buff */
        buff: number[];
        /** buff值 */
        buffValue: number[];
        /** 欢乐值上限 */
        maxValue: number;
        /** 每天次数 */
        num: number;
        /**吃完饭弹出星星的概率 */
        rate: number;
    }
    interface GameMainConf {
        /** 愉悦值数据 */
        happy: HappyConf;
    }
}