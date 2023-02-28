import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { QueueExecutor } from "../../../core/utils/QueueExecutor";
import Toast from "../../../core/utils/Toast";
import HandGuide from "../../component/HandGuide";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameNotificationConst, NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { Platform } from "../../platform/Platform";
import { save_prop_Const } from "../../platform/PlatformBase";
import GameScene from "../../scene/GameScene";
import { ADController, AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { DebugUI } from "../GameUI/DebugUI";
import { GameUIConst, TIPSTATE } from "../GameUI/GameUIConst";
import { GuideConst } from "../guide/GuideModel";
import { HappyConst } from "../Happy/HappyConst";
import HappyController from "../Happy/HappyController";
import StartShowView from "../StartEvent/StartShowView";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import { GameRecorderConst } from "../ToutiaoGameRecorder/GameRecorderConst";
import GameRecorderController from "../ToutiaoGameRecorder/GameRecorderController";
import UserLevelController from "../UserLevel/UserLevelController";
import { GameConst } from "./GameConst";
import GameMainView from "./GameMainView";
import { GameProxy } from "./GameProxy";
import { GameUtils } from "./GameUtils";
import MapView from "./MapView";
import WorldScene from "./object/scene/WorldScene";
import TongguanAni from "./TongguanAni";


export default class GameController extends BaseController {
    public gameView: GameMainView;
    // public upgradeView: UpgradeView;
    public world: WorldScene = new WorldScene();
    public proxy: GameProxy = null;
    public gameScene: GameScene = null;
    public mapView: MapView = null;
    public gameConf: GameMainConf = null;

    public tongguanAni: TongguanAni = null;
    public constructor() {
        super();
        App.ViewManager.register(ViewConst.DebugUI, {
            prefabName: "DebugUI",
            parent: LayerManager.UI_Guide,
            controller: this
        });

        App.ViewManager.register(ViewConst.TongguanAni, {
            prefabName: "TongguanAni",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        //地图
        App.ViewManager.register(ViewConst.MapView, {
            prefabName: "MapView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        /**拍照框 */
        // App.ViewManager.register(ViewConst.ShotView, {
        //     prefabName: "ShotView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });


        // App.ViewManager.register(ViewConst.UnlockTipView, {
        //     prefabName: "UnlockTipView",
        //     parent: LayerManager.UI_Main,
        //     controller: this
        // });


        this.proxy = new GameProxy(this);
        this.proxy.setWorldScene(this.world);
        this.initModuleEvent();
        this.initProtocolEvents();
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME, this.initGame, this, 100);
    }
    public destroy() {
        // onDestroy
        super.destroy();
        this.world.destroy();
    }
    /**
     *注册模块消息
     */
    protected initModuleEvent() {
        this.registerFunc(GameConst.UNLOCK_TABLE, this.onTouchUnlockTable, this);
        this.registerFunc(GameConst.SCROLL_TO_NEXT_SCENE, this.onScrollToNextScene, this);
        this.registerFunc(GameConst.SET_SCROLL_ENABLE, this.onSetScrollEnable, this);
        this.registerFunc(GameConst.UNLOCK_SCENE, this.onC2GUnlockScene, this);
        this.registerFunc(GameConst.OPEN_SCENE, this.onC2GOpenScene, this);
        this.registerFunc(GameConst.SCORLLE_TO_SCENE, this.onScorlleToScene, this);
        this.registerFunc(GameConst.GET_WORLD_SCENE, this.getWorldScene, this);

        this.registerFunc(GameConst.UPGRADE_FOOD, this.onUpgradeFood, this);

        this.registerFunc(GameConst.UNLOCK_FOOD, this.onUnlockFood, this);
        this.registerFunc(GameConst.ADD_RANK_CNT, this.onAddRankCnt, this);
        this.registerFunc(GameConst.IS_COOD_ACCELERATE, this.onIsCoodAccelerate, this);
        this.registerFunc(GameConst.OPEN_FEATURE_FOOD_VIEW, this.onOpenFeatureFoodView, this);
        // if (this.data.isOpen()) {
        //     App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UPGRADE_FOOD, this.data.attrObj.index, 1)
        // } else {
        //     App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UNLOCK_FOOD, this.data.attrObj.index)
        // }
        this.registerFunc(GameConst.UPGRADE, this.onUpgrade, this);
        // this.registerFunc(GameConst.C2G_CHANGE_UPGRADE_COUNT, this.on_C2G_CHANGE_UPGRADE_COUNT, this);
        // this.registerFunc(GameConst.UNLOCK_SREET, this.onUnlockStreet, this);
        // this.registerFunc(GameConst.OPEN_SREET, this.onOpenStreet, this);
        // this.registerFunc(GameConst.REMOVE_STAR, this.removeStar, this);
        // this.registerFunc(GameConst.REMOVE_ALL_STAR, this.removeAllStar, this);
        // this.registerFunc(GameConst.GAME_SCROLL, this.onGameScroll, this);
        // this.registerFunc(GameConst.SET_EVENT_BUFF, this.setEventBuff, this);
        // this.registerFunc(GameConst.UPDATE_HOUSE_DATA, this.updataHouseData, this);
        // this.registerFunc(GameConst.SING_STAR, this.addStarToCell, this);
        // this.registerFunc(GameConst.OPEN_BUILD_MONEY_HALF, this.buildMoneyHalf, this);
        // this.registerFunc(GameConst.SHOW_BUILD_MONEY_PERCENT, this.showBuildPercent, this);
        // this.registerFunc(GameConst.SET_NO_JINBI_UPGRADE, this.setNoJinBiUpgrade, this);
        // this.registerFunc(GameConst.GET_NO_JINBI_UPGRADE, this.getNoJinBiUpgrade, this);
        // this.registerFunc(GameConst.GET_BUILD_LEVEL, this.getbuildLevel, this);
        // this.registerFunc(GameConst.GET_BUILD_UNLOCK, this.getBuildUnlock, this);
        // this.registerFunc(GameConst.GET_BUILD_MONEY_HALF_VALUE, this.getLookBuildAdValue, this);
        // this.registerFunc(GameConst.GET_NOW_STREET_ID, this.getNowStreetId, this);
        // this.registerFunc(GameConst.SET_MASCOT_TALK, this.setMascotTalk, this);
        // //是否第一次点击加速就有幸运弹窗
        // this.registerFunc(GameConst.IS_FIRST_TANCHUANG, this.checkFirstTanChuang, this);
        // //是否弹出吉祥物提升界面
        // this.registerFunc(GameConst.IS_OPEN_MASCOT_UP_VIEW, this.checkMap, this);
        // this.registerFunc(GameConst.CLOSE_UPGRADEVIEW, this.closeUpgradeView, this);
        // //累计升级
        // this.registerFunc(GameConst.ADD_UPGRADE_CNT, this.addUpLevelCnt, this);
        // //判断是否是高消费玩家
        // this.registerFunc(GameConst.IS_GOOD_PLAYER, this.isGoodPlayer, this);
        // this.registerFunc(GameConst.CHECK_START_BUSINESS, this.checkStartBusiness, this);
        // this.registerFunc(GameConst.START_BUSINESS_UPGRADE, this.startBusinessUpgrade, this);
        // //获取某地图店铺名字
        // this.registerFunc(GameConst.GET_BUILD_NAME, this.getBuildName, this);
        // //获取店铺类型
        // this.registerFunc(GameConst.GET_BUILD_TYPE, this.getBuildType, this);
        // this.registerFunc(GameConst.CREATE_HAPPY, this.createHappy, this);
        // this.registerFunc(GameConst.ADD_HAPPY_MOENY, this.addHappyMoney, this);
        // this.registerFunc(GameConst.DOUBLE_HAPPY_MOENY, this.doubleHappyMoney, this);
        // this.registerFunc(GameConst.GET_IS_HAPPY, this.isHappy, this);
        // this.registerFunc(GameConst.SET_VIBRATE_STATE, this.setVibrateState, this);
    }

    /**
     * 注册全局事件
     */
    protected initProtocolEvents() {
        let notificationCenter = App.NotificationCenter;
        // notificationCenter.addListener(GameNotificationConst.C2G_UNLOCK_SHAFT, this.unLockShaft, this);
        notificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.onUpdateMoney, this);

        notificationCenter.addListener(GameNotificationConst.UPDATE_RANK_CNT, this.onUpdateRankCnt, this);
        // notificationCenter.addListener(GameNotificationConst.CREATE_CUSTOMER, this.onCreateCustomer, this);
        notificationCenter.addListener(HappyController.START_HAPPY_TIME, this.onStartHappyTime, this);
        notificationCenter.addListener(GameNotificationConst.CREATE_STAR, this.onCreateStar, this);
        notificationCenter.addListener(GameNotificationConst.DESTORY_STAR, this.onDestoryStar, this);
        notificationCenter.addListener(HappyController.STOP_HAPPY_TIME, this.onStopHappyTime, this);
        notificationCenter.addListener(UserLevelController.USER_LEVEL_UP, this.onUserLevelUp, this);
        // notificationCenter.addListener(GameNotificationConst.G2C_UPGRADE, this.on_G2C_UPGRADE, this);
        // notificationCenter.addListener(NotificationConst.START_GUIDE, this.onStartGuide, this);
        // notificationCenter.addListener(NotificationConst.END_GUIDE, this.onEndGuide, this);
        // notificationCenter.addListener(NotificationConst.UPDATE_HAPPY_TIME, this.updateHappyTime, this);
        // notificationCenter.addListener(NotificationConst.GUIDE_RECORDER, this.guide_Recorder_start, this);
        // App.NotificationCenter.addListener(NotificationConst.UPDATE_IDLE, this.setOnceMoney, this);
        // App.NotificationCenter.addListener(NotificationConst.ON_TOUCH_ACCELERATE, this.onTouchAccelerate, this);
        // App.NotificationCenter.addListener(NotificationConst.ADD_RESIDENTBUFF, this.addResidentBuff, this);
        // App.NotificationCenter.addListener(NotificationConst.ON_TOUCH_MACOT, this.onTouchMacot, this);
        notificationCenter.addListener(GameNotificationConst.ORDER_COOK_FINISH, this.onOrderCookFinish, this);
        notificationCenter.addListener(GameNotificationConst.ADD_ORDER, this.onAddOrder, this);
        notificationCenter.addListener(NotificationConst.START_GAME_TIME, this.startgametime, this);
    }

    /**---------------------- 全局事件回调 start-------------------*/

    protected onCreateStar() {
        this.onStartHappyTime();
    }
    protected onDestoryStar() {
        this.onStopHappyTime();
        if (StartShowView.isFirst && GameRecorderController.lupingType == 3 && cc.sys.platform == cc.sys.TOUTIAO_GAME) {
            this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.LUPING_OPEN);
            App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.STOP);
            App.ViewManager.open(ViewConst.TipView, {
                leftBtnText: GameText.getText(lang.common_cnacel),//"取消",
                leftFunc: () => { },
                leftThisObj: this,
                rightBtnText: "分享",
                rightFunc: () => { App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.ShareRecorder, GameRecorderController.lupingType); },
                rightThisObj: this,
                tipsStr: "是否分享额外获得一次明星来访机会\n(每日分享限制次数：" + this.world.StartShare + "/2)",
                hasCloseBtn: false,
            } as COMMON_BOX)
        } else {
            StartShowView.isFirst = true;
        }

    }

    /**
     * 开启欢乐时光
     */
    protected onStartHappyTime() {
        if (this.gameView.happyTimeEffect.active) {//如果特效已经打开了
            return;
        }
        if (this.gameView.curId !== this.world.sceneMgr.nowSceneId) {//如果不是当前场景,先滚动回当前场景
            this.gameView.scrollToScene(this.world.sceneMgr.nowSceneId, false);
        }
        this.queueExecutor.regist(() => {
            this.world.sceneMgr.nowScene.roleMsr.startHappyTime();
            this.gameView.startHappyTime();
        }, this);
    }

    /**
    * 动画队列
    */
    queueExecutor: QueueExecutor = new QueueExecutor();
    protected onStopHappyTime() {
        //欢乐时光跟明星共用一个效果,如果两个有哪一个存在,那就不能关闭
        if (this.world.sceneMgr.nowScene.roleMsr.star || this.applyControllerFunc(ControllerConst.HappyTime, HappyConst.GET_IS_HAPPY)) {
            return;
        }
        this.gameView.stopHappyTime();
        this.queueExecutor.finishFunc();
    }

    protected onUserLevelUp(level: number) {
        this.checkIsCanUnlockNewScene();
    }


    protected checkIsCanUnlockNewScene() {
        let waitOpenSceneId = this.world.sceneMgr.waitOpenSceneId;
        if (this.world.sceneMgr.checkIsCanUnlock(waitOpenSceneId)) {
            this.world.sceneMgr.openNewScene(waitOpenSceneId);
            this.queueExecutor.regist(() => {
                this.queueExecutor.finishFunc();
                App.ViewManager.open(ViewConst.TongguanAni, this.world.sceneMgr.sceneDataMgr.getData(waitOpenSceneId).reawrdMoney);
            }, this);
        }
    }

    /**
     * 金钱发生变化
     */
    protected onUpdateMoney() {

        this.world.sceneMgr.nowScene.tableMsr.updateUnlockMoney();
        this.gameView.updateMoney();
        // this.gameView.updateUpgadeBtn();
    }

    protected handGuide: HandGuide = null;
    /**
     * 排队人数刷新
     */
    protected onUpdateRankCnt() {

        if (this.world.sceneMgr.nowScene.roleMsr.waitCreateCusCnt < 5) {
            const findPath = "Game_Main>RoleLayer/formationT";
            if (this.handGuide) {
                if (!this.handGuide.isPlayAni) {
                    this.handGuide.find(findPath);
                }
            } else {
                App.NodePoolMsr.getHandGuidePool()
                    .then((pool) => {
                        if (this.handGuide) {
                            return;
                        }
                        let handGuideNode = pool.pop();
                        this.handGuide = handGuideNode.getComponent(HandGuide);
                        this.handGuide.find(findPath);
                    });
            }
        }
        this.world.sceneMgr.nowScene.gameView.updateRankBox();
    }
    protected onCreateCustomer() {

    }
    /**
     * 初始化游戏
     */
    protected initGame() {
        App.DebugUtils.stop("进入游戏");

        // App.ViewManager.open(ViewConst.DebugUI)
        // (CC_DEBUG) && App.ViewManager.open(ViewConst.DebugUI);
        Platform.instance.isShowDebugUI() && App.ViewManager.open(ViewConst.DebugUI);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME, this.initGame, this);
        this.gameView = cc.find("Game_Main/GameMainView").getComponent("GameMainView");
        App.GameDataMsr.setWorld(this.world);
        this.gameScene = <GameScene>App.SceneManager.getCurrScene();
        this.gameConf = App.ConfigManager.gameConf.game;
        // this.world.roleMsr = this.gameView.getComponent(RoleMsr);
        this.world.gameView = this.gameView;
        this.world.init();
        // this.world.roleMsr.gameView.mapMsr.init(this.world);
        this.gameView.world = this.world;
        this.gameView.initUI();
        this.world.setMemento(App.GameDataMsr.gameMainData);
        App.ViewManager.close(ViewConst.Loading);
        // this.initCell();
        GameUtils.TimerManager.doFrame(2, 0, this.routine, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);

        // App.SoundManager.playBg("bg1");
        this.world.start();
        this.world.sceneMgr.nowScene.roleMsr.enabled = false;
        App.NotificationCenter.dispatch(NotificationConst.INIT_GAME_FINISH);
        this.gameView.init();
        this.world.sceneMgr.nowScene.orderMsr.checkFeatureFoodIsOpen();
        // cc.director.getScheduler().scheduleUpdate(this, 0, true);


        // this.world.roleMsr.init(this.world);
        // // this.resList.getPrelistList()
        // App.TimerManager.setFrameOut(2, this.preloadRes, this);
        this.world.sceneMgr.nowScene.gameView.updateRankBox();
        // this.setTimeScale();
        this.checkIdle();
    }


    public setTimeScale(value: number) {
        // cc.director.getScheduler().setTimeScale(value);
        // GameUtils.TimerManager.setTimeScale(value);
    }

    /**
     * 菜式烹饪完毕
     * @param order 
     */
    protected onOrderCookFinish(order: IOrder) {
        // this.world.sceneMgr.nowScene.gameView.dishTable.addOrder(order);
        // this.world.sceneMgr.nowScene.gameView.orderTable.updateOrder(this.world.sceneMgr.nowScene.orderMsr.orderList);
    }
    /**
     * 增加了一个新的菜式订单
     * @param order 
     */
    protected onAddOrder(order: IOrder) {
        // this.world.sceneMgr.nowScene.gameView.orderTable.updateOrder(this.world.sceneMgr.nowScene.orderMsr.orderList);
    }


    /**---------------------- 全局事件回调 end-------------------*/

    /**---------------------- 模块事件回调 start-------------------*/

    /**
     * 请求增加排队人数
     * @param cnt 增加多少个
     */
    protected onAddRankCnt(cnt: number) {
        this.world.sceneMgr.nowScene.roleMsr.addWaitCreateCustomerCnt(cnt);

    }
    /**
     * 是否加速烹饪
     * @param value 
     */
    protected onIsCoodAccelerate(value: boolean) {
        this.world.sceneMgr.nowScene.chefMsr.setIsCookAccelerate(value);
    }
    /**
     * 开启特色菜页面
     */
    protected onOpenFeatureFoodView() {
        let orderMsr = this.world.sceneMgr.nowScene.orderMsr;
        if (orderMsr.isCanCreateFeatureFood()) {
            App.ViewManager.open(ViewConst.FoodActView, this.world.sceneMgr.nowScene.orderMsr.createFeatureFoodOrder(null));
        } else {
            // Toast.launch(GameText.getText(lang.feature_food_limite_tip));
        }
    }

    protected onSetScrollEnable(value: boolean) {
        this.gameView.scrollView.vertical = value;
    }

    /**
     * 滚动到待解锁关卡
     */
    protected onScrollToNextScene() {
        if (this.world.sceneMgr.nowScene.roleMsr.star) {
            Toast.launch(GameText.getText(lang.start_ing));
            return;
        }
        if (this.applyControllerFunc(ControllerConst.HappyTime, HappyConst.GET_IS_HAPPY)) {
            Toast.launch(GameText.getText(lang.start_hot_sale));
            return;
        }
        if (this.world.sceneMgr.waitOpenSceneId === this.gameView.curId) {
            return;
        }
        if (this.world.sceneMgr.sceneDataMgr.getData(this.world.sceneMgr.waitOpenSceneId)) {//如果不是当前场景,先滚动回当前场景
            this.gameView.scrollToScene(this.world.sceneMgr.waitOpenSceneId, true);
        } else {
            Toast.launch(GameText.getText(lang.common_unlock_all));
        }
    }

    /**
     * 请求解锁桌子
     * @param id 桌子的id
     */
    protected async onTouchUnlockTable(id: number, isFree?: boolean) {
        if (isFree) {
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.FREE_UNLOCK);
            if (!result) {
                return;
            }
        }
        if (isFree || this.world.sceneMgr.nowScene.tableMsr.checkIsCanUnlock(id)) {
            this.world.sceneMgr.nowScene.tableMsr.unlockTable(id, isFree);
        } else {
            Toast.launch(GameText.getText(lang.common_cash_not_enough));
        }
    }

    protected getWorldScene() {
        return this.world;
    }
    private isShowLuckBagView: boolean = true;
    /**
     * 升级菜式
     * @param foodIndex 菜式在当前场景的序号
     * @param levelCnt 要升级多少级
     * @param isFree 是否免费升级
     */
    protected async onUpgradeFood(foodIndex: number, levelCnt: number, isFree: boolean) {
        if (isFree) {//免费升级需要观看广告
            // CC_DEBUG && Log.trace("/------------onUpgradeFood");
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.FOOD_FREE_UPGRADE);
            if (!result) {
                return;
            }
        }
        let lastSellCoin = this.world.sceneMgr.nowScene.foodMsr.foods[foodIndex].attrObj.sellCoin;
        let result = this.world.sceneMgr.nowScene.foodMsr.upGrade(foodIndex, levelCnt, isFree);
        if (result === 0) {
            this.gameView.foodBtnList[foodIndex].updateLevelData(lastSellCoin);
            this.world.sceneMgr.nowScene.calIdle();
            this.checkIsCanUnlockNewScene();
            App.NotificationCenter.dispatch(GameNotificationConst.UPGRADE_FOOD, foodIndex, levelCnt);

            //向管理后台发送菜式升级数据(场景1的菜式id为1,2,3 之后场景100为区间(101,102和201,202和301和302))
            let caishiLev = this.world.sceneMgr.allOpenScene[this.world.sceneMgr.nowSceneId].foodMsr.foods[foodIndex].tempAttrObj.level;

            Platform.instance.recordNode(save_prop_Const.Caishi_Level, foodIndex + (this.world.sceneMgr.nowSceneId * 100), levelCnt, caishiLev, 0);

        } else if (result === -1) {
            let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.LUCK_BAG);
            if (isOpen) {
                if ((ADController.getInstance().adIsHas(AdType.LUCK_BAG_COIN)) && this.isShowLuckBagView) {
                    App.ViewManager.open(ViewConst.LuckBagView, this.world.sceneMgr.idleMoneyRate);
                    this.isShowLuckBagView = false;
                    App.TimerManager.doTimer(3000, 1, () => { this.isShowLuckBagView = true; }, this)
                }
                else {
                    Toast.launch(GameText.getText(lang.common_cash_not_enough));
                }
            }
            else {
                Toast.launch(GameText.getText(lang.common_cash_not_enough));
            }
        } else if (result === -2) {
            Toast.launch(GameText.getText(lang.common_max_lv_tip));
        }
    }
    /**
     * 解锁菜式
     * @param foodIndex 菜式在当前场景的序号
     */
    protected onUnlockFood(foodIndex: number) {
        let result = this.world.sceneMgr.nowScene.foodMsr.unlockFood(foodIndex);
        if (result === 0) {
            this.gameView.foodBtnList[foodIndex].unlockFood();
            this.world.sceneMgr.nowScene.calIdle();

            //传入消息添加一条朋友圈

        } else if (result === -1) {
            Toast.launch(GameText.getText(lang.common_cash_not_enough));
        }
    }
    /**
     * 请求升级
     * @param type 请求升级类型 0 员工, 1 厨师, 2 宣传
     * @param levelCnt 升多少级
     * @param isFree 是否免费升级
     */
    protected async onUpgrade(type: number, levelCnt: number = 1, isFree?: boolean) {
        if (isFree) {//免费升级需要观看广告
            // CC_DEBUG && Log.trace("/------------onUpgradeFood");
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.FREE_UPGRADE);
            if (!result) {
                return;
            }
        }
        let msr = this.world.sceneMgr.nowScene.getUpgradeMsrByType(type);
        let result = msr.upLevel(levelCnt, isFree);
        if (result === 0) {
            this.gameView.upgradeBtns[type].setData(msr.detailInfo as any);
            this.world.sceneMgr.nowScene.calIdle();
            App.NotificationCenter.dispatch(GameNotificationConst.UPGRADE_SKILL, type, levelCnt)
            this.checkIsCanUnlockNewScene();

            if (type != 2) {
                //厨师,员工向管理后台发送数据
                let send_type;

                let lev;
                // Log.trace(this.world.sceneMgr.allOpenScene[this.world.sceneMgr.nowSceneId])
                switch (type) {
                    case 0://员工
                        send_type = save_prop_Const.Staff_Level;
                        lev = this.world.sceneMgr.allOpenScene[this.world.sceneMgr.nowSceneId].waiterMsr.attrObj.level;
                        break;
                    case 1://厨师
                        send_type = save_prop_Const.Chef_Level;
                        lev = this.world.sceneMgr.allOpenScene[this.world.sceneMgr.nowSceneId].chefMsr.attrObj.level;
                        break;
                    default:
                        break;
                }
                Platform.instance.recordNode(send_type, this.world.sceneMgr.nowSceneId, 0, lev, 0);
            }



        } else if (result === -1) {
            let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.LUCK_BAG);
            if (isOpen) {
                if ((ADController.getInstance().adIsHas(AdType.LUCK_BAG_COIN)) && this.isShowLuckBagView) {
                    App.ViewManager.open(ViewConst.LuckBagView, this.world.sceneMgr.idleMoneyRate);
                    this.isShowLuckBagView = false;
                    App.TimerManager.doTimer(3000, 1, () => { this.isShowLuckBagView = true; }, this)
                }
                else {
                    Toast.launch(GameText.getText(lang.common_cash_not_enough));
                }
            }
            else {
                Toast.launch(GameText.getText(lang.common_cash_not_enough));
            }
            // Toast.launch("现金不足");
        }
    }
    /**
     * 打开场景
     */
    protected onC2GOpenScene(id: number) {

    }
    /**
     * 解锁了新的场景
     * @param sceneId 场景id
     */
    protected onC2GUnlockScene(sceneId: number) {
    }
    /**
     * 用户滑动到了某个场景
     * @param sceneId  滑动到哪个场景
     * @param preSceneId 滑动前的场景
     */
    protected onScorlleToScene(sceneId: number, preSceneId: number) {
        let openScene = this.world.sceneMgr.allOpenScene[sceneId];
        this.gameView.getView(sceneId).scorlleIn();
        if (openScene) {//如果这个场景是已经开启的
            this.gameView.bottomBtns.active = true;
            if (this.world.sceneMgr.nowScene !== openScene) {//如果不是当前的场景
                let result = this.world.sceneMgr.switchScene(sceneId);//切换到这个场景
                if (result === 0) {
                    this.gameView.reset();
                    App.NotificationCenter.dispatch(GameNotificationConst.G2C_SWITCH_SCENE);
                }
            }
        } else {
            this.gameView.bottomBtns.active = false;
        }
        this.gameView.getView(preSceneId).scorlleOut();
        // App.NotificationCenter.dispatch(GameNotificationConst.UPDATA_CHENGHAO, this.world.sceneMgr.waitOpenSceneId - 1);
    }

    /**---------------------- 模块事件回调 end-------------------*/
    protected async onHide() {
        cc.director.pause();
        Log.trace("保存存档");
        this.world.sceneMgr.nowScene.startIdleTime = App.DateUtils.Now();
        // App.SaveManage.saveAll();
        this.saveToServe();
        App.NotificationCenter.dispatch(NotificationConst.ON_HIDE);
    }
    protected async onShow() {
        Log.trace("/-----后台返回")
        do {
            cc.director.resume();
            App.EasyLoading.showLoading();
            let nowScene = this.world.sceneMgr.nowScene;
            // nowScene.roleMsr.enabled = false;
            if (CC_DEBUG || nowScene.startIdleTime - App.DateUtils.Now() > 300000) {//离线时间超过5分钟,重新跟后台同步时间
                var result = await Platform.instance.getServerTime();
            } else {
                var result = true;
            }
            if (result) {
                this.nextSaveTime = Date.now() + 60000;
                App.EasyLoading.hideLoading();
                App.SaveManage.checkIsNeedUpdateData();
                let time = App.DateUtils.Now() - nowScene.startIdleTime;
                if (time > 2 * 60 * 1000 && nowScene.startIdleTime) {//切换到后台超过一定时间才给离线奖励
                    this.checkIdle();
                } else {
                    nowScene.startIdleTime = 0;
                }
                App.NotificationCenter.dispatch(NotificationConst.ON_SHOW);
                break;
            }
            let func = () => {
                return new Promise((resolve: any, reject: Function) => {
                    App.EasyLoading.hideLoading();
                    App.ViewManager.open(ViewConst.TipView, {
                        curState: TIPSTATE.SURE,
                        leftBtnText: GameText.getText(lang.common_sure),//"确定",
                        leftFunc: () => {
                            setTimeout(() => {
                                resolve();
                            }, 100);
                        },
                        leftThisObj: this,
                        tipsStr: GameText.getText(lang.common_net_offline),// "连接不到服务器,请检查网络是否正常!",
                    } as COMMON_BOX);
                })
            }
            await func();

        } while (true);

    }
    /**
     * 检查是否有闲置现金领取
     */
    public checkIdle() {
        let isGuideFinish = this.applyControllerFunc(ControllerConst.Guide, GuideConst.CHECK_IS_GUIDE, 1);
        if (!isGuideFinish) {//新手引导期间不弹出闲置现金页面
            return;
        }
        if (this.world.sceneMgr.nowScene.startIdleTime && App.DateUtils.Now() - 60000 > this.world.sceneMgr.nowScene.startIdleTime && !this.world.sceneMgr.idleMoneyRate.isZero()) {
            App.ViewManager.open(
                ViewConst.IdleView,
                this.world.sceneMgr.nowScene.startIdleTime,
                this.world.sceneMgr.nowScene.getIdleMoney(),
                this.world.sceneMgr.nowScene.conf.moneyType
            );
        }
    }
    protected nextSaveTime = Date.now() + 30000;
    /**
     * 定时器
     */
    public routine(tick: number) {
        this.world.onlinetime += tick;
        this.world.routine(tick);
        if (Date.now() > this.nextSaveTime) {
            this.saveToServe();
        }
    }
    protected saveToServe() {
        Platform.instance.saveData();//保存到服务器
        this.nextSaveTime = Date.now() + 60000;
    }
    /**
     * 开始计时
     */
    public startgametime() {
        if (this.world.schedulestarttime == 0) {
            this.world.schedulestarttime = this.world.onlinetime;
        }
        App.NotificationCenter.removeListener(NotificationConst.START_GAME_TIME, this.startgametime, this);
    }

    onLoadView(view: IBaseView) {
        // if (view.viewId == ViewConst.MapView) {
        //     this.mapView.setData(this.world.sceneMgr);
        // }
    }

    onCloseView(view: IBaseView) {
        if (view.viewId === ViewConst.TongguanAni) {
            if (this.gameView.curId !== this.world.sceneMgr.nowSceneId) {//如果不是当前场景,先滚动回当前场景
                this.gameView.scrollToScene(this.world.sceneMgr.nowSceneId, false);
            }
            this.gameView.scrollToScene(this.world.sceneMgr.waitOpenSceneId - 1);
        }
    }
    onOpenView(view: IBaseView) {
        if (view.viewId === ViewConst.DebugUI) {
            (<DebugUI>view).world = this.world;
        } else if (view.viewId == ViewConst.MapView) {
            this.mapView.setData(this.world.sceneMgr);
            this.mapView.updateData();
        }
    }
    /**
     * 
     * @param x x方向
     * @param y y方向
     */
    protected onGameScroll(y: number, time?: number) {
        // let pos = this.gameView.scrollView.getMaxScrollOffset();
        // pos.y = pos.y - y;
        this.gameView.jumpToPos(y, time);
    }

    // /**开启振动 */
    // protected setVibrateState(){
    //     Log.trace("尝试开启振动")
    //     Platform.instance.vibrator(100);
    // }

}