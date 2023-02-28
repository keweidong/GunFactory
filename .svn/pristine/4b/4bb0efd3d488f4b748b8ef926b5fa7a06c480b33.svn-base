import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameNotificationConst, NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { Platform } from "../../platform/Platform";
import { AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { BagConst } from "../bag/BagConst";
import { CostType } from "../bag/BagController";
import { PlotEventConst } from "../event/PlotEventConst";
import { FriendCircleConst } from "../FriendCircle/FriendCircleConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GuideConst } from "../guide/GuideModel";
import { StartEventConst } from "../StartEvent/StartEventConst";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import UserLevelController, { UserLevelConst } from "../UserLevel/UserLevelController";
import { GameUIConst, NewsTypeConst } from "./GameUIConst";
import GameUIView from "./GameUIView";
import IdleView from "./IdleView";
import NewsView from "./NewsView";
import { GameRecorderConst } from "../ToutiaoGameRecorder/GameRecorderConst";
import GameRecorderController from "../ToutiaoGameRecorder/GameRecorderController";
import ExploreBtn from './ExploreBtn';
import { ExploreConst } from "../Explore/ExploreConst";
export enum mapMoneyType {
    //金币
    money = 0,
    //钻石
    diamond = 9,
}

export default class GameUIController extends BaseController {

    public gameUIView: GameUIView = null;
    public idleView: IdleView = null;
    public world: WorldScene = null;
    // public mapView: MapView;
    // public settingView: SettiingView;
    // public eventView: EventView;
    // public systemDataManager: SystemDataManager;
    // public leftPopupView: LeftPopupView;
    // public buffShowView: BuffShowView;
    // public mapExpView: MapExpView;

    public newsView: NewsView;
    /** 当前选中签约明星的摊位id */
    protected cellIndex: number = null;


    public constructor() {
        super();
        App.ViewManager.register(ViewConst.GameUI, {
            prefabName: "GameUIView",
            parent: LayerManager.UI_Main,
            controller: this
        });

        App.ViewManager.register(ViewConst.LuckBagView, {
            prefabName: "LuckBagView",
            parent: LayerManager.UI_Popup,
            controller: this
        });


        App.ViewManager.register(ViewConst.IdleView, {
            prefabName: "IdleView",
            parent: LayerManager.UI_Popup,
            controller: this
        })

        //设置按钮
        App.ViewManager.register(ViewConst.SettingView, {
            prefabName: "SettingView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        App.ViewManager.register(ViewConst.NewsView, {
            prefabName: "NewsView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        /**排行榜 */
        App.ViewManager.register(ViewConst.FriendShareView, {
            prefabName: "FriendShareView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        // //地图
        // App.ViewManager.register(ViewConst.MapView, {
        //     prefabName: "MapView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });

        // // 公用弹窗
        // App.ViewManager.register(ViewConst.TipView, {
        //     prefabName: "TipView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });

        // //左侧弹窗
        // App.ViewManager.register(ViewConst.LeftPopupView, {
        //     prefabName: "LeftPopupView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });
        // //buffshowView


        // App.ViewManager.register(ViewConst.MapExpView, {
        //     prefabName: "MapExpView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });

        App.ViewManager.register(ViewConst.ShotView, {
            prefabName: "ShotView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        this.initModuleEvent();
        this.initNotificationEvent();
    }


    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        // this.registerFunc(GameUIConst.ADD_ASSIST_AD_NUM, this.addAssistAdNum, this);
        // this.registerFunc(GameUIConst.ADD_ASSIST_LV, this.addAssistLv, this);
        this.registerFunc(GameUIConst.COLLECT_IDLE, this.onCollectIdle, this);
        this.registerFunc(GameUIConst.OPEN_LUCKBAGVIEW, this.onOpenLuckBagView, this);
        this.registerFunc(GameUIConst.GET_LUCKBAG_REWARD, this.getLuckbagReward, this);
        // this.registerFunc(GameUIConst.SIGN_STAR, this.signStar, this);
        // this.registerFunc(GameUIConst.GET_STAR_MSR, this.getStarMsr, this);
        // this.registerFunc(GameUIConst.MAP_TIP, this.setTipName, this);
        // this.registerFunc(GameUIConst.REFRESH_STAR, this.refreshStar, this);
        // this.registerFunc(GameUIConst.SELECT_CELL, this.selectCell, this);
        // this.registerFunc(GameUIConst.GET_VOLUME, this.getVolume, this);
        // this.registerFunc(GameUIConst.SET_VOLUME, this.setVolume, this);
        // this.registerFunc(GameUIConst.NO_UNLOCK_MAP, this.noUnlockMap, this);
        // this.registerFunc(GameUIConst.GET_ORDER, this.onGetOrder, this);
        this.registerFunc(GameUIConst.PLAY_JB_ANI, this.playCoinAni, this);
        this.registerFunc(GameUIConst.GET_FREE_BUFF, this.onGetFreeBuff, this);
        this.registerFunc(GameUIConst.GET_COOK_AUTO_ACCELERATE, this.ongetCookAutoAccelerate, this);
        this.registerFunc(GameUIConst.OPEN_SETTING_VIEW, this.onOpenSettingView, this);
        // this.registerFunc(GameUIConst.ON_TOUCH_RESIDENTBUFF, this.onTouchResidentBuff, this);
        // this.registerFunc(GameUIConst.GETIDLETIME, this.getIdleTime, this);
        // this.registerFunc(GameUIConst.UPDATA_BOX_CNT, this.updataBoxCnt, this);
        // this.registerFunc(GameUIConst.OPEN_SHOWBUFFINFOVIEW, this.openShowBuffInfoView, this);
        // this.registerFunc(GameUIConst.OPEN_RIGHT_POPUP, this.openRightPopup, this);
        // this.registerFunc(GameUIConst.GET_PROMOTE_ICON_POS, this.getPromoteFunctionIconPos, this);
        // this.registerFunc(GameUIConst.SET_LEFTPOPUP_HEAD, this.setLeftPopupHead, this);
        // this.registerFunc(GameUIConst.SET_GAMEUIVIEW_HEAD, this.setGameUIViewHead, this);
        // this.registerFunc(GameUIConst.COLLECT_HAPPY, this.collectHappy, this);
        // this.registerFunc(GameUIConst.ADD_HAPPY, this.addHappy, this);
        // this.registerFunc(GameUIConst.OPEN_HAPPY, this.openHappy, this);
        // this.registerFunc(GameUIConst.GET_UNLOCK_DATA, this.getMapUnlock, this);
        this.registerFunc(GameUIConst.RecorderClose, this.recorderClose, this);
        this.registerFunc(GameUIConst.RecorderOpen, this.recorderOpen, this);
        this.registerFunc(GameUIConst.Recorder_Share_SUCCESS, this.chose_RecordeButton, this);
        // this.registerFunc(GameUIConst.Guide_Recorder, this.guide_Recorder, this);
        // this.registerFunc(GameUIConst.Guide_Recorder_End, this.guide_Recorder_End, this);
        this.registerFunc(GameUIConst.SET_NEWS, this.setNewsData, this);

        this.registerFunc(GameUIConst.CHENGJIU_HONGDIAN_OPEN, this.setChengjiu_hongdian, this);
        this.registerFunc(GameUIConst.CHENGJIU_HONGDIAN_CLOSE, this.closeChengjiu_hongdian, this);

        /**显示与隐藏录屏按钮 */
        this.registerFunc(GameUIConst.LUPING_OPEN, this.lupingOpen, this);
        this.registerFunc(GameUIConst.LUPING_CLOSE, this.lupingClose, this);

        this.registerFunc(GameUIConst.StartExploreTime, this.startExploreTime, this);
        this.registerFunc(GameUIConst.OPEN_HONGDIAN_EXPLORE, this.showHongdian_Explore, this);
        this.registerFunc(GameUIConst.HIDE_HONGDIAN_EXPLORE, this.hideHongdian_Explore, this);
        this.registerFunc(GameUIConst.UPDATESHARE, this.updataShare, this);
        this.registerFunc(GameUIConst.UPDATE_SUPER_CASH, this.UpdateSuperCash, this);


    }

    protected initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);
        notificationCenter.addListener(NotificationConst.UPDATE_SUPER_CASH, this.updateSuperCash, this);
        notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        // notificationCenter.addListener(NotificationConst.ADD_ASSIST_LV, this.updateAssist, this);
        // notificationCenter.addListener(NotificationConst.UPDATE_BUFF, this.updateBuff, this);
        // notificationCenter.addListener(NotificationConst.UPDATE_HAPPY, this.updateHappy, this);
        notificationCenter.addListener(GameNotificationConst.G2C_SWITCH_SCENE, this.onSwitchScene, this);
        notificationCenter.addListener(NotificationConst.SYS_OPEN, this.updateSystemOpen, this);
        notificationCenter.addListener(NotificationConst.UPDATE_USER_INFO, this.updateUserInfo, this);
        // notificationCenter.addListener(GameNotificationConst.G2C_OPEN_MINE, this.updateBuff, this);
        // notificationCenter.addListener(GameNotificationConst.UPDATE_CONTRIBUTION, this.updateContribution, this);
        // notificationCenter.addListener(NotificationConst.UPDATE_BUFF, this.setBuffBtnList, this);
        // notificationCenter.addListener(NotificationConst.UPDATE_HAPPY_TIME, this.openHappyTime, this);

        // //通知闲置现金刷新
        App.NotificationCenter.addListener(NotificationConst.UPDATE_IDLE, this.onUpdateIdle, this);
        // App.NotificationCenter.addListener(GameNotificationConst.G2C_OPEN_MINE, this.onUpdateIdle, this);
        // //添加常驻buff，常驻按钮显示倒计时
        // App.NotificationCenter.addListener(NotificationConst.ADD_RESIDENTBUFF, this.showResidentBuffCountdown, this);
        // App.NotificationCenter.addListener(GameNotificationConst.UPDATA_CHENGHAO, this.updataChenghao, this);
    }

    protected init() {

    }



    public initGame() {
        Log.trace("打开gameui")
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        App.ViewManager.open(ViewConst.GameUI);

    }
    /**
     * 开始探索计时
     */
    protected startExploreTime(endTime: number) {

        this.gameUIView.exploreBtn.getComponent(ExploreBtn).starTime(endTime);
        //关闭红点
        this.hideHongdian_Explore();

    }

    /**设置成就红点显示 */
    protected setChengjiu_hongdian() {
        let _this = this.gameUIView;
        _this.setChengjiu_hongdian();
    }
    /**关闭成就红点 */
    protected closeChengjiu_hongdian() {
        let _this = this.gameUIView;
        _this.closeChengjiu_hongdian();
    }
    /**开启探索红点 */
    showHongdian_Explore() {
        let _this = this.gameUIView;
        _this.showHongdian_Explore();
    }
    /**关闭探索红点 */
    hideHongdian_Explore() {
        let _this = this.gameUIView;
        _this.hideHongdian_Explore();
    }

    updataChenghao(sceneId: number) {
        this.gameUIView.updateTitle(sceneId);
    }
    /**
     * 切换到某个场景
     */
    protected onSwitchScene() {
        this.gameUIView.mapNameLab.string = GameText.getTextByStr(this.world.sceneMgr.nowScene.conf.name);

        if (this.world.sceneMgr.waitOpenSceneId) {
            this.gameUIView.updateTitle(this.world.sceneMgr.waitOpenSceneId - 1);
        }

        // this.init();
        // this.updateMap();
        // this.updateFoodCnt();
    }
    protected onCollectIdle(rate: number, idleTime?: long) {
        let result = null;
        if (idleTime) {
            result = this.world.sceneMgr.nowScene.collectIdle(rate, idleTime);
        } else {
            result = this.world.sceneMgr.nowScene.collectIdle(rate);
        }
        this.playCoinAni(CostType.coin);
        return result;
    }
    protected onOpenLuckBagView() {
        App.ViewManager.open(ViewConst.LuckBagView, this.world.sceneMgr.idleMoneyRate);
    }

    //获得金币，播放金币动画
    protected playCoinAni(index: number) {
        this.gameUIView.playGetCoinAni(index);
    }


    protected async onOpenSettingView() {
        let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SETTING);
        if (isOpen) {
            App.ViewManager.open(ViewConst.SettingView);
        }
        //检查微信登录
        let result = await Platform.instance.isWXLogin();
        if (result) {
        }
    }

    /**
     * 请求获取免费buff
     */
    protected async onGetFreeBuff() {
        let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.FREE_BUFF);
        if (result) {
            let config = App.ConfigManager.gameConf.freeBuff;
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, config.itemId, 1, 3);
            this.updateFreeBuffBar();
        }
    }
    /**
      * 请求获取厨师自动加速buff
      */
    protected async ongetCookAutoAccelerate() {
        let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.COOK_AUTO_ACCELERATE);
        if (result) {
            let config = App.ConfigManager.gameConf.cookAutoAccelerate;
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, config.itemId, 1, 3);
            this.updateCookAutoAccelerateBuffBar();
        }
    }



    /**
     * 请求获取福袋奖励
     * @param type 0 获取金币奖励, 1 获取钻石奖励
     */
    protected async getLuckbagReward(type: number) {
        if (type === 0) {
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.LUCK_BAG_COIN);
            if (result) {
                let getCoin = MyBigLong.tempNum.init(this.world.sceneMgr.idleMoneyRate).multiply(App.ConfigManager.gameConf.game.gift.coin);
                this.world.sceneMgr.nowScene.nowMoneyAdd(getCoin);
                this.playCoinAni(CostType.coin);
                App.ViewManager.close(ViewConst.LuckBagView);
                App.NotificationCenter.dispatch(NotificationConst.RECEIVE_LUCKY_BAG, type);
            } else {
                return;
            }
        } else {
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.LUCK_BAG_DIAMOND);
            if (result) {
                let getCoin = MyBigLong.tempNum.init(this.world.sceneMgr.idleMoneyRate).multiply(App.ConfigManager.gameConf.game.gift.coin);
                this.world.addSuperCash(App.ConfigManager.gameConf.game.gift.diamond);
                this.playCoinAni(CostType.diamond);
                App.ViewManager.close(ViewConst.LuckBagView);
                App.NotificationCenter.dispatch(NotificationConst.RECEIVE_LUCKY_BAG, type);
            } else {
                return;
            }
        }
        // let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.IDLE);
        // if (result) {
        //     //let result = this.applyFunc(GameUIConst.COLLECT_IDLE, multiple);
        //     this.applyFunc(GameUIConst.COLLECT_IDLE, multiple, this.idleTime);
        //     this.closeView();
        // } else {
        //     return;
        // }
    }

    /** 
       * 设置消息界面
       */
    protected setNewsData(type: NewsTypeConst, isShow: boolean, title: string, url: string) {
        if (this.newsView && App.ViewManager.isShow(ViewConst.NewsView)) {
            if (type == NewsTypeConst.Start) {
                this.newsView.setStart(type, isShow);

                return true;
            }
            this.newsView.setData(type, isShow, title, url);
            return true;
        }
        else {
            return false;
        }
    }

    // /*获取地图数据*/
    // protected setMapDate() {
    //     if (this.mapView) {
    //         let data = this.world.KCMgr.kuangChangDataMgr.getAllDatas();
    //         let list: {
    //             id: number;
    //             isUnlock: boolean;
    //             isCanUnlock: boolean;
    //             unlockSuperCash: number;
    //             moneyType: number;
    //             openKcNeedChipsE: number;
    //         }[] = [];

    //         for (let key in data) {
    //             let mapConfData = data[key];
    //             let money: number = 0;
    //             let superCash: number = 0;
    //             if (mapConfData.superCash > 0) {
    //                 money = mapMoneyType.diamond;
    //                 superCash = mapConfData.superCash
    //             } else if (mapConfData.openKcNeedChips > 0) {
    //                 money = mapMoneyType.money;
    //                 superCash = mapConfData.openKcNeedChips
    //             }
    //             list.push({
    //                 id: mapConfData.kuangChangId,
    //                 isUnlock: this.world.KCMgr.getIsOpen(mapConfData.kuangChangId),
    //                 isCanUnlock: this.world.KCMgr.checkIsCanUnlock(mapConfData.kuangChangId),
    //                 unlockSuperCash: superCash,
    //                 moneyType: money,
    //                 openKcNeedChipsE: data[key].openKcNeedChipsE
    //             });
    //         }
    //         this.mapView.setMapData(list, this.world.KCMgr.nowFarmId);
    //         // this.mapView.
    //         // this.mapView.updateData(data);
    //     }
    // }

    // //打开提示窗口重新设置窗口名字
    // protected setTipName(id: number) {
    //     let datas = this.world.KCMgr.kuangChangDataMgr.getAllDatas();
    //     return datas[id].name;
    // }
    // /**
    //  * id:省份id
    // */
    // //无法解锁地图
    // noUnlockMap(id: number, isUnlock: boolean) {
    //     // if (isUnlock) {
    //     //     return 1;
    //     // }
    //     // else {
    //     //     App.ViewManager.open(ViewConst.MapExpView, id);
    //     //     return 0;
    //     // }
    //     let isMoneyCanUnlock = this.world.KCMgr.checkIsMoneyCanUnlock(id);
    //     if (!isUnlock || !isMoneyCanUnlock) {
    //         //检查钻石是否足够
    //         let tipString = null;
    //         let unlockShengFenData = this.world.KCMgr.kuangChangDataMgr.getData(id);
    //         let shengFenData = this.world.KCMgr.kuangChangDataMgr.getData(unlockShengFenData.openNeedKuangChangId);//需要开启的前置地图配置数据

    //         //let boothName = this.world.KCMgr.getKuangChangWorkZone(id - 1).kuangCengDataMgr.getData(id - 1).getData(UnlockShengFenData.playGameCount).name
    //         let count = unlockShengFenData.playGameCount + 1
    //         let boothName = "店铺" + count;
    //         if (!isMoneyCanUnlock) {
    //             tipString = "金币不足，请努力攒取金币";
    //         } else if (!this.world.KCMgr.checkIsPreZoneOpenCellEnough(id)) {
    //             //TipString = ShengFenData.name + "美食街未发展壮大，还需要解锁" + (UnlockShengFenData.playGameCount - NowTanWeiCount.kuangcengMgr.curOpenIndex) + "摊位，才能开启" + UnlockShengFenData.name + "美食街！";
    //             tipString = "还需要开启前置地图" + shengFenData.name + "美食街的" + boothName + "，才能开启" + unlockShengFenData.name + "美食街！";
    //         } else if (!this.world.KCMgr.checkIsPreZoneOpen(id)) {
    //             tipString = "还需要开启前置地图" + shengFenData.name + "，才能开启" + unlockShengFenData.name + "美食街！";
    //         }
    //         else {
    //             let preKCZ = this.world.KCMgr.getKuangChangWorkZone(unlockShengFenData.openNeedKuangChangId);
    //             let allLevelCnt = preKCZ.kuangcengMgr.getAllLevelCnt();
    //             let foodCnt = App.ControllerManager.applyFunc(ControllerConst.Food, FoodConst.GET_UNLOCK_NUM, unlockShengFenData.openNeedKuangChangId);//获取解锁菜式数量
    //             let contribu = App.ControllerManager.applyFunc(ControllerConst.Rank, RankConst.GET_VALUE);//获取贡献值
    //             // ShengFenData
    //             tipString = `解锁需要贡献值:${contribu}/${unlockShengFenData.contribu}, 地图${shengFenData.name}解锁菜式数量:${foodCnt}/${unlockShengFenData.foodCnt},总建筑等级:${allLevelCnt}/${unlockShengFenData.allLevelCnt}`
    //         }
    //         let tipData: COMMON_BOX = {
    //             tipsStr: tipString,
    //             hasCloseBtn: true,
    //             leftBtnText: "确定",
    //             leftFunc: () => { },
    //             leftThisObj: this,
    //             curState: TIPSTATE.SURE,
    //         }
    //         App.ViewManager.open(ViewConst.TipView, tipData);
    //         // App.ViewManager.open(ViewConst.MapExpView, id);
    //         return 0;
    //     }
    //     return 1
    // }

    // protected updateFoodCnt() {
    //     let cnt = this.applyControllerFunc(ControllerConst.Food, FoodConst.GET_FOOD_CNT, this.world.KCMgr.nowFarmId);
    //     this.gameUIView.updateFoodCnt(cnt);
    // }

    protected onUpdateIdle() {
        if (this.gameUIView) {
            this.gameUIView.setIdleMoney(this.world.sceneMgr.idleMoneyRate);
        }
    }
    protected updateFreeBuffBar() {
        this.gameUIView.freeBuffBar.node.active = true;
        let buffData = this.world.buffMsr.getKcBuffByIndex(this.world.sceneMgr.nowSceneId, this.gameUIView.freeBuffBar.item.data.agrs4);
        this.gameUIView.freeBuffBar.setData(buffData);
    }

    protected updateCookAutoAccelerateBuffBar() {
        // this.gameUIView.freeBuffBar.node.active = true;
        if (this.gameUIView.cookAutoAccelerateBuffBar.node.active) {
            let buffData = this.world.buffMsr.getKcBuffByIndex(this.world.sceneMgr.nowSceneId, this.gameUIView.cookAutoAccelerateBuffBar.item.data.agrs4);
            this.gameUIView.cookAutoAccelerateBuffBar.setData(buffData);
        }
    }
    protected onUserLevelUp(level: number) {
        if (level > 13) {
            this.gameUIView.nextLevelBtnNode.active = true;
            App.NotificationCenter.removeListener(UserLevelController.USER_LEVEL_UP, this.onUserLevelUp, this);
        }
    }

    // protected updateBuff() {
    //     if (this.gameUIView && this.gameUIView.isShow()) {
    //         let buffValue = this.world.buffMsr.getKcBuffAttrList(this.world.KCMgr.nowFarmId);
    //         this.gameUIView.setBuffValue(buffValue.ADD_CREATE);
    //     }
    // }

    // protected updateHappy(value?) {
    //     let happyMgr = this.world.happyMgr;
    //     this.gameUIView.setHappy(happyMgr.getHappy(), happyMgr.getMaxHappy());
    // }

    // protected openHappyTime(isOpen: boolean) {
    //     if (isOpen) {
    //         App.TimerManager.doTimer(100, 0, this.updateHappyTime, this);
    //     }
    //     else {
    //         App.TimerManager.remove(this.updateHappyTime, this);
    //     }
    // }

    // protected updateHappyTime() {
    //     if (!this.world) {
    //         return;

    //     }
    //     let happyMgr = this.world.happyMgr;
    //     if (happyMgr.getHappyTime()) {
    //         this.gameUIView.updateHappyTime(happyMgr.getHappyTime() - App.DateUtils.Now(), happyMgr.getTotalTime());
    //         // todo
    //     }
    //     else {
    //         // todo
    //         App.TimerManager.remove(this.updateHappyTime, this);
    //     }
    // }

    // protected updateMap() {
    //     if (this.gameUIView) {
    //         let mapName = this.world.KCMgr.nowKCZ.abo.name;
    //         this.gameUIView.setMapName(mapName);
    //         this.setBuffBtnList();
    //     }
    // }

    // onLoadView(view: IBaseView) {
    //     // switch (view.viewId) {
    //     // case ViewConst.GameUI:
    //     // this.gameUIView.setNextDeliverymanTime(this.world.roleMsr.nextDeliverymanTime);
    //     // break;
    //     // case ViewConst.AssistView:
    //     //     if (this.assistView) {
    //     //         let data = this.world.getAssistLv();
    //     //         this.assistView.updateData(data);
    //     //     }
    //     //     break;
    //     // case ViewConst.SignStarView:
    //     //     if (this.signStarView) {
    //     //         this.refreshStar();
    //     //     }
    //     //     break;
    //     // }
    // }
    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.GameUI:
                //             // this.systemDataManager = App.ConfigManager.systemDataManager;

                //             //打开常驻buff界面
                //             App.ViewManager.open(ViewConst.ResidentBuffView, this.world.getResidentBuff());
                //             App.NotificationCenter.dispatch(NotificationConst.CHECK_SYS_OPEN, OpenTypeConst.EVENT_AWARD);
                //             App.NotificationCenter.dispatch(NotificationConst.CHECK_SYS_OPEN, OpenTypeConst.TASK);
                //             App.NotificationCenter.dispatch(NotificationConst.CHECK_SYS_OPEN, OpenTypeConst.NEWBIETASK);
                //             this.gameUIView.setNextDeliverymanTime(this.world.roleMsr.deliverymanData.nextTime);
                this.updateMoney();
                this.updateSuperCash();
                // this.gameUIView.freeBuffBar.init();
                let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FREE_BUFF);
                if (isOpen) {
                    this.gameUIView.freeBuffBar.init(App.ConfigManager.getConfig("GameConf").freeBuff.itemId);
                    this.updateFreeBuffBar();
                } else {
                    this.gameUIView.freeBuffBar.node.active = false;
                }
                this.updateCookAutoAccelerateBuffBar();
                App.ControllerManager.applyFunc(ControllerConst.UserLevel, UserLevelConst.INIT, this.gameUIView)
                App.ViewManager.open(ViewConst.NewsView);
                //             this.gameUIView.setMoney(this.world.KCMgr.nowKCZ.getNowMoney());
                //             this.gameUIView.setSuperCash(this.world.superCash);
                //             this.updateFoodCnt()
                //             this.updateBuff();
                //             this.updateHappy();
                //             this.updateMap();
                this.gameUIView.mapNameLab.string = GameText.getTextByStr(this.world.sceneMgr.nowScene.conf.name);
                this.onUpdateIdle();
                this.updataChenghao(this.world.sceneMgr.waitOpenSceneId - 1);
                //             //this.world.taskMgr.checkTask();
                //             // App.NotificationCenter.dispatch(NotificationConst.CHECK_ALL_SYS_OPEN);
                //             this.applyControllerFunc(ControllerConst.Rank, RankConst.UPDATE_CONTRIBUTION);
                //             this.updataBoxCnt();
                //             this.setRankData();
                //             this.gameUIView.startUpdate();
                this.updateUserInfo();
                let isGuideFinish = this.applyControllerFunc(ControllerConst.Guide, GuideConst.CHECK_IS_GUIDE, 1);
                if (isGuideFinish) {//新手引导已经完成
                    this.gameUIView.setIsGuideFinish();
                } else {
                    App.NotificationCenter.addListener(NotificationConst.GUIDE_STEP_FINISH, this.onGuideFinish, this);
                }

                if (App.GameDataMsr.playerInfo.level > 13) {
                    this.gameUIView.nextLevelBtnNode.active = true;
                } else {
                    this.gameUIView.nextLevelBtnNode.active = false;

                    App.NotificationCenter.addListener(UserLevelController.USER_LEVEL_UP, this.onUserLevelUp, this);
                }
                App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.StartExploreTime);
                break;
            //         case ViewConst.MapView:
            //             this.setMapDate();
            //             break;
            //         case ViewConst.LeftPopupView:
            //             this.leftPopupView.viewShow();
            //             break;
            //         case ViewConst.BuffShowView:
            //             this.setBuffShowViewData();
            //             break;
            //         case ViewConst.IdleView:
            //             this.updateMap();
            //             break;
            //         // 
            case ViewConst.NewsView:
                this.applyControllerFunc(ControllerConst.FriendCircle, FriendCircleConst.OpenTick);
                this.applyControllerFunc(ControllerConst.FriendCircle, FriendCircleConst.IsFirstLogin_Everyday);
                this.applyControllerFunc(ControllerConst.PlotEvent, PlotEventConst.StarGuKeCountDown)
                this.applyControllerFunc(ControllerConst.Start, StartEventConst.sartStartEvent);
                this.registerFunc(GameUIConst.ADD_NEWS, this.addYouchat, this);
                this.addYouchat();
                break;
        }
    }
    /**通知有消息 */
    public addYouchat() {
        // this.applyControllerFunc(ControllerConst.PlotEvent, PlotEventConst.INFORMOF)
    }
    protected onGuideFinish() {
        this.gameUIView.setIsGuideFinish();
        App.NotificationCenter.removeListener(NotificationConst.GUIDE_STEP_FINISH, this.onGuideFinish, this);
    }

    /** 更新金币 */
    protected updateMoney() {
        if (this.gameUIView && this.gameUIView.isShow()) {
            this.gameUIView.setMoney(this.world.sceneMgr.nowScene.nowMoney);
        }
    }
    /**更新超级现金 */
    protected updateSuperCash() {
        if (this.gameUIView && this.gameUIView.isShow()) {
            this.gameUIView.setSuperCash(this.world.superCash);
        }
    }

    // /** 更新贡献值 */
    // protected updateContribution(value: number) {
    //     if (this.gameUIView && this.gameUIView.isShow()) {
    //         this.gameUIView.setContribution(value);
    //     }
    // }
    /**
     * 用户数据更新
     */
    protected updateUserInfo() {
        this.gameUIView.setUserInfo(App.GameDataMsr.playerInfo);
    }
    /**
     * 更新系统开放
     * @param sysIndex 系统id
     * @param isOpen 是否开启
     */
    protected updateSystemOpen(sysIndex: OpenTypeConst, isOpen: boolean) {
        //     if (!this.gameUIView) {
        //         return
        //     }
        CC_DEBUG && Log.trace("updateSystemOpen:", sysIndex, isOpen);
        switch (sysIndex) {
            case OpenTypeConst.FREE_BUFF:
                this.gameUIView.freeBuffBar.init(App.ConfigManager.getConfig("GameConf").freeBuff.itemId);
                this.updateFreeBuffBar();
                break;
        }
        //     // let isShow = this.systemDataManager.getData(sysIndex).isShow;
        //     // this.gameUIView.setSystemState(sysIndex, isOpen, isShow == 1);
        //     if (OpenTypeConst.EVENT_AWARD == sysIndex) {
        //         this.world.eventMsr.isOpen = isOpen;
        //     } else if (OpenTypeConst.TASK == sysIndex) {
        //         if (this.world.newbieTaskMgr.isCanNewbieTask) {
        //             return;
        //         }
        //         this.world.taskMgr.isOpen = isOpen;
        //         this.world.taskMgr.checkTask();
        //     } else if (OpenTypeConst.NEWBIETASK == sysIndex) {
        //         if (!this.world.newbieTaskMgr.isCanNewbieTask) {
        //             return;
        //         }
        //         this.world.newbieTaskMgr.isOpen = isOpen;
        //         this.world.newbieTaskMgr.checkTask();
        //     } else if (OpenTypeConst.NO_JINBI_UPGRADE == sysIndex) {
        //         if (isOpen) {
        //             App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.SET_NO_JINBI_UPGRADE);
        //         }
        //     } else if (OpenTypeConst.SEVEN_DAYS == sysIndex) {
        //         //七天登录
        //         if (isOpen) {
        //             let isFirstOpen = App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.GET_IS_FRIST_OPEN);
        //             if (isFirstOpen) {
        //                 App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.CLOSE_UPGRADEVIEW);
        //                 App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.SET_IS_FRIST_OPEN, false);
        //                 App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.OPEN_SEVEN_DAYS_VIEW);
        //             }
        //         }
        //     }
        //     // else if (OpenTypeConst.MASCOT_UP == sysIndex) {
        //     //     //吉祥物提升
        //     //     if (isOpen) {
        //     //         //检查
        //     //         let isFirstOpen = App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.GET_IS_FRIST_OPEN);
        //     //         if (isFirstOpen) {
        //     //             App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.SET_IS_FRIST_OPEN, false);
        //     //             App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.OPEN_SEVEN_DAYS_VIEW);
        //     //         }
        //     //     }
        //     // }
    }


    // openRightPopup() {
    //     this.gameUIView.setIsOpenRightPopup(false);
    //     this.gameUIView.onTouchRightPopup();
    // }

    // //获取功能提升icon位置
    // getPromoteFunctionIconPos() {
    //     let pos = this.gameUIView.promoteFunctionNode.parent.convertToWorldSpaceAR(this.gameUIView.promoteFunctionNode.position);
    //     return pos;
    // }

    // //设置左侧弹窗头像及玩家数据
    // setLeftPopupHead(nameStr: string, headStr: string, idLab: string) {
    //     if (this.leftPopupView && this.leftPopupView.isShow()) {
    //         this.leftPopupView.setName(nameStr);
    //         this.leftPopupView.setHead(headStr);
    //         this.leftPopupView.setUserId(idLab);
    //     }
    //     this.gameUIView.setHead(headStr);

    // }

    // //设置主界面头像
    // setGameUIViewHead(headStr: string) {
    //     Log.warn("微信----设置主界面头像");
    //     this.gameUIView.setHead(headStr);

    // }

    // collectHappy(node: cc.Node) {
    //     this.gameUIView.collectHappy(node);
    // }

    // addHappy() {
    //     this.world.happyMgr.addHappyValue(1);
    // }

    // openHappy() {
    //     let isSuccess = this.world.happyMgr.openHappyTime();
    // }

    // /** 获取地图解锁条件 */
    // public getMapUnlock(streetId: number) {
    //     let temp: number[][] = [];
    //     let con = this.world.KCMgr.getUnlockAllLevel(streetId);
    //     temp.push(con);
    //     con = this.world.KCMgr.getUnlockContribu(streetId);
    //     temp.push(con);
    //     con = this.world.KCMgr.getUnlockFood(streetId);
    //     temp.push(con);
    //     return temp;
    // }

    /**开始录屏 */
    recorderOpen() {
        //更换图片
        // var url = 'Texture/Recorder/luzhishiping_close';
        var _this = this.gameUIView;
        // App.CommonUtils.setSpriteFrame(url, _this.recorder_Sprite);
        // _this.recorder_Label.string = "录制中";
        // cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteframe) {
        // });

        _this.luPingButton.node.active = false;
        if (GameRecorderController.lupingType == 1) {
            _this.closeluPingButton.node.active = true;
        }
    }
    /**
     * 关闭录屏切换成开始录屏图片
     */
    recorderClose() {
        //更换关闭图片
        // var url = 'Texture/Recorder/luzhishipin_open';
        var _this = this.gameUIView;
        // App.CommonUtils.setSpriteFrame(url, _this.recorder_Sprite);
        // _this.recorder_Label.string = "录屏\n钻石+20";
        //     cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        //         Log.trace("开始更换图片2")
        //         _this.recorder_Sprite.spriteFrame = spriteFrame;
        //         Log.trace("开始更换字体2")
        //         //显示字体
        //         _this.recorder_Label.string = "录屏\n钻石+20";
        //     });
        if (_this.closeluPingButton.node.active) {
            _this.closeluPingButton.node.active = false;
            _this.share_Recorder.node.active = true;
        }
        //     cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        //         Log.trace("开始更换图片2")
        //         _this.recorder_Sprite.spriteFrame = spriteFrame;
        //         Log.trace("开始更换字体2")
        //         //显示字体
        //         _this.recorder_Label.string = "录屏\n钻石+20";
        //     });
        _this.luPingButton.node.active = false;
        _this.share_Recorder.node.active = true;
    }

    /**
     * 分享录屏后，切换成录屏按钮
     */
    chose_RecordeButton() {
        var _this = this.gameUIView;
        if (_this.share_Recorder.node.active) {
            _this.luPingButton.node.active = true;
            _this.share_Recorder.node.active = false;
        }
    }

    // /**引导录屏 */
    // guide_Recorder() {
    //     if (this.gameUIView.godFinger) {
    //         this.gameUIView._finger = cc.instantiate(this.gameUIView.godFinger);
    //         this.gameUIView._finger.parent = this.gameUIView.share_Recorder.node;
    //         this.gameUIView._finger.x = 0;
    //         this.gameUIView._finger.y = 0;
    //         // this.gameUIView._finger.active = false;
    //     }
    //     let action1 = cc.scaleTo(0.2, 1.1);
    //     let action2 = cc.scaleTo(0.2, 1);
    //     var seq = cc.repeatForever(
    //         cc.sequence(
    //             action1,
    //             action2
    //         ));
    //     this.gameUIView._finger.runAction(seq);
    // }
    /**分享录屏视频后回调,不管分享成功与否,都奖励钻石,隐藏引导手指 */
    // guide_Recorder_End() {
    //新手录屏得钻石软性引导中,点击录屏按钮后需要将引导手指删掉
    // if (this.gameUIView._finger) {
    //     this.gameUIView._finger.active = false;
    //     this.gameUIView._finger = null;
    //     //传递消息分享成功
    //     // App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.Recorder_Share_SUCCESS);
    //     //传递获得钻石的消息
    // App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.rewardRecorder);
    // }
    //    recorder_path = null;


    // }

    /**录屏按钮显示 */
    protected lupingOpen() {
        this.gameUIView.luPingButton.node.active = true;
    }

    /**录屏按钮隐藏 */
    protected lupingClose() {
        this.gameUIView.luPingButton.node.active = false;
        this.gameUIView.closeluPingButton.node.active = false;
        this.gameUIView.share_Recorder.node.active = false;
    }

    /**更新转发次数 */
    protected updataShare() {
        this.gameUIView.zhuanfaLable.string = "分享得钻石\n每日分享次数\n(" + this.world.GameShare + "/3)"
    }

    /**更新钻石 */
    protected UpdateSuperCash(isTouch?: boolean) {
        if (isTouch && this.world.GameShare > 0) {
            this.world.GameShare--;
            this.world.superCash += 20;
            // App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, money);
            App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, 20);
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.diamond);
            this.updataShare();
        }else if(!isTouch){
            this.world.superCash += 20;
            // App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, money);
            App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, 20);
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.diamond);
            this.updataShare();
        }
    }
}