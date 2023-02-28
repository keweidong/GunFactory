import BaseController from "../../../core/mvc/controller/BaseController";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { BagModel } from "../bag/BagModel";
import { AchievementModle } from './AchievementModle';
import { AchievementConst, AchievementType } from "./AchievementConst";
import App from "../../../core/App";
import { NotificationConst, GameNotificationConst } from "../../consts/NotificationConst";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "../GameMain/GameConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { HappyTime } from '../Task/TaskItems/HappyTime';
import { HappyConst } from "../Happy/HappyConst";
import { stardatamodle } from '../StartEvent/StartShowModel';
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import AchievementView from "./AchievementView";
import { GameUIConst } from "../GameUI/GameUIConst";
import { CostType } from "../bag/BagController";
import AchievementItem from './AchievementItem/AchievementItem';
import { GuestDataList } from '../GameMain/object/scene/config/GuestDataMsr';


/**
 * 成就管理
 */
export default class AchievementController extends BaseController {
    public world: WorldScene;
    protected _bagModel: BagModel = null;
    protected _model: AchievementModle = null;

    protected achievementView: AchievementView = null;

    public constructor() {
        super();

        App.ViewManager.register(ViewConst.AchievementView, {
            prefabName: "AchievementView",
            parent: LayerManager.UI_Popup,
            controller: this
        });


        this.initModuleEvent();
        this.initNotificationEvent();
        this.setModel(new AchievementModle(this));


    }

    initModuleEvent() {
        this.registerFunc(AchievementConst.Get_Chengjiu_Award, this.getChengjiuAward, this);
        this.registerFunc(AchievementConst.Chengjiu_Over, this.chengjiu_isOver, this);

        // this.registerFunc(HappyConst.ADD_HAPPY, this.good_Chengjiu, this);
    }
    initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        notificationCenter.addListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);


    }

    initGame() {
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this._model.init();
        if (this.isAchievementOpen()) {
            this.listenerChengjiu();
        }
    }
    /**
  * 更新系统开放
  * @param sysIndex 系统id
  * @param isOpen 是否开启
  */
    onSystemOpen(sysIndex: number, isOpen: boolean) {
        if (isOpen && sysIndex === OpenTypeConst.ACHIEVEMENT) {
            this.listenerChengjiu();
        }

    }
    /**
     * 检测成就是否完成
     */
    initAchievement() {
        //顾客
        if (this._model.isGetNowChengjiu(this._model.data.guke_num, this._model.guke_AchievementConfs[this._model.data.guke_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.CUSTOMER_EAT_FINISH, this.guke_Chengjiu, this);
        }
        //热评
        if (this._model.isGetNowChengjiu(this._model.data.good_num, this._model.good_AchievementConfs[this._model.data.good_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.ADD_HAPPY_VALUE, this.good_Chengjiu, this);
        }
        //明星
        if (this._model.isGetNowChengjiu(this._model.data.star_num, this._model.star_AchievementConfs[this._model.data.star_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.CREATE_STAR, this.star_Chengjiu, this);
        }
        //菜式
        if (this._model.isGetNowChengjiu(this._model.data.featureFood_num, this._model.featureFood_AchievementConfs[this._model.data.featureFood_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.UNLOCK_NEW_CaiShi, this.featureFood_Chengjiu, this);
        }
        // this.setHongdian();
    }

    listenerChengjiu() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(GameNotificationConst.CUSTOMER_EAT_FINISH, this.guke_Chengjiu, this)
        notificationCenter.addListener(GameNotificationConst.UNLOCK_NEW_CaiShi, this.featureFood_Chengjiu, this)
        notificationCenter.addListener(GameNotificationConst.ADD_HAPPY_VALUE, this.good_Chengjiu, this);
        notificationCenter.addListener(GameNotificationConst.CREATE_STAR, this.star_Chengjiu, this);

        notificationCenter.removeListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);
        this.initAchievement();
    }

    /**成就系统是否开放 */
    isAchievementOpen(): boolean {
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.ACHIEVEMENT);
        return isOpen;
    }

    /**获取成就奖励
     * 类型的id
     * 奖励
     * 类型
     */
    getChengjiuAward(typeid: number, award: number, type: number) {
        this.world.superCash += award;
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, award);
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.diamond);



        // App.NotificationCenter.addListener()
        this._model.addIdByType(type);

        let conf = this._model.getConfByType(type);
        if (!conf[typeid + 1]) {
            this.applyFunc(AchievementConst.Chengjiu_Over, type);
            return;
        }
        let num = this._model.getNumByType(type);

        this.achievementView.itemList[type].getComponent(AchievementItem).setData({ conf: { numId: num }, achievementData: conf[typeid + 1] })
        //开始监听
        this.startListenerByType(type);

    }

    startListenerByType(type: AchievementType) {
        switch (type) {
            case AchievementType.Good_Achievement:
                if (!this._model.isGetNowChengjiu(this._model.data.good_num, this._model.good_AchievementConfs[this._model.data.good_id].param)) {
                    //移除此成就的监听   点击任务完成按钮后再开启监听
                    App.NotificationCenter.addListener(GameNotificationConst.ADD_HAPPY_VALUE, this.good_Chengjiu, this);
                }
                break;
            case AchievementType.Star_Achievement:
                if (!this._model.isGetNowChengjiu(this._model.data.star_num, this._model.star_AchievementConfs[this._model.data.star_id].param)) {
                    //移除此成就的监听   点击任务完成按钮后再开启监听
                    App.NotificationCenter.addListener(GameNotificationConst.CREATE_STAR, this.star_Chengjiu, this);
                }
                break;
            case AchievementType.FeatureFood_Achievement:
                if (!this._model.isGetNowChengjiu(this._model.data.featureFood_num, this._model.featureFood_AchievementConfs[this._model.data.featureFood_id].param)) {
                    //移除此成就的监听   点击任务完成按钮后再开启监听
                    App.NotificationCenter.addListener(GameNotificationConst.UNLOCK_NEW_CaiShi, this.featureFood_Chengjiu, this);
                }
                break;
            case AchievementType.Guke_Achievement:
                if (!this._model.isGetNowChengjiu(this._model.data.guke_num, this._model.guke_AchievementConfs[this._model.data.guke_id].param)) {
                    //移除此成就的监听   点击任务完成按钮后再开启监听
                    App.NotificationCenter.addListener(GameNotificationConst.CUSTOMER_EAT_FINISH, this.guke_Chengjiu, this);
                }
                break;
            default:
                break;
        }
    }

    public chengjiu_isOver(type: AchievementConst) {
        this.achievementView.itemList[type].getComponent(AchievementItem).setChengjiuIsOver();
    }

    onLoadView(view: IBaseView) {
        // if (view.viewId === ViewConst.ShopView) {

        // }
    }


    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.AchievementView:
                // this._model.data
                // this.achievementView.achievementDataMsr = this._model.conf.getAllDatas();
                this.achievementView.good_AchievementConfs = this._model.good_AchievementConfs;
                this.achievementView.guke_AchievementConfs = this._model.guke_AchievementConfs;
                this.achievementView.featureFood_AchievementConfs = this._model.featureFood_AchievementConfs;
                this.achievementView.star_AchievementConfs = this._model.star_AchievementConfs;
                this.achievementView.setData(this._model.data);
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.CHENGJIU_HONGDIAN_CLOSE);
                break;

            default:
                break;
        }
    }

    /**
     * 顾客吃完东西,顾客数量+1
     */
    guke_Chengjiu() {
        this._model.data.guke_num++;
        if (App.ViewManager.isShow(ViewConst.AchievementView)) {
            this.achievementView.updaByType(AchievementType.Guke_Achievement, this._model.data.guke_num);
        }
        if (this._model.isGetNowChengjiu(this._model.data.guke_num, this._model.guke_AchievementConfs[this._model.data.guke_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.CUSTOMER_EAT_FINISH, this.guke_Chengjiu, this);
            this.setHongdian();
        }
    }

    /**
     * 顾客点赞   +value
     */
    good_Chengjiu(value: number = 1) {
        this._model.data.good_num += value;
        if (App.ViewManager.isShow(ViewConst.AchievementView)) {
            this.achievementView.updaByType(AchievementType.Good_Achievement, this._model.data.good_num);
        }
        if (this._model.isGetNowChengjiu(this._model.data.good_num, this._model.good_AchievementConfs[this._model.data.good_id].param)) {

            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.ADD_HAPPY_VALUE, this.good_Chengjiu, this);
            this.setHongdian();
        }
    }

    /**
     * 邀请明星 明星数量 +1
     */
    star_Chengjiu() {
        this._model.data.star_num++;
        if (App.ViewManager.isShow(ViewConst.AchievementView)) {
            this.achievementView.updaByType(AchievementType.Star_Achievement, this._model.data.star_num);
        }
        if (this._model.isGetNowChengjiu(this._model.data.star_num, this._model.star_AchievementConfs[this._model.data.star_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.CREATE_STAR, this.star_Chengjiu, this);
            this.setHongdian();
        }
    }

    /**
     * 解锁菜式成就
     */
    featureFood_Chengjiu() {
        this._model.data.featureFood_num++;
        if (App.ViewManager.isShow(ViewConst.AchievementView)) {
            this.achievementView.updaByType(AchievementType.FeatureFood_Achievement, this._model.data.featureFood_num);
        }
        if (this._model.isGetNowChengjiu(this._model.data.featureFood_num, this._model.featureFood_AchievementConfs[this._model.data.featureFood_id].param)) {
            //移除此成就的监听   点击任务完成按钮后再开启监听
            App.NotificationCenter.removeListener(GameNotificationConst.UNLOCK_NEW_CaiShi, this.featureFood_Chengjiu, this);
            this.setHongdian();
        }
    }

    /**触发红点 */
    setHongdian() {
        if (!App.ViewManager.isShow(ViewConst.AchievementView)) {
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.CHENGJIU_HONGDIAN_OPEN);
        }
    }

}