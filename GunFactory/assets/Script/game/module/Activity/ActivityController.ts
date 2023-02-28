import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { BagModel } from "../bag/BagModel";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { ActivityConst } from "./ActivityConst";
import { ActivityModel } from "./ActivityModel";
import FoodActInfoView from "./FoodActInfoView";
import { FoodActAwardManager } from "./FoodActManager";
import FoodActSumbitView from "./FoodActSumbitView";
import FoodActView from "./FoodActView";
import { FeatureFoodData, FeatureFoodDataMsr } from "../GameMain/object/scene/config/FeatureFoodDataMsr";
import { OrderMsr } from '../GameMain/object/scene/OrderMsr';
import { Food } from '../GameMain/object/scene/food/Food';
import { BagConst } from "../bag/BagConst";
import Item from '../GameMain/object/scene/test/Item';

/**
 * 物品管理模块
 */
export default class ActivityController extends BaseController {
    public world: WorldScene;
    protected _bagModel: BagModel = null;
    protected foodActView: FoodActView;
    protected foodActSumbitView: FoodActSumbitView;
    // protected foodActHelpView: RankHelpView;
    protected foodActInfoView: FoodActInfoView;

    protected foodActAwardManager: FoodActAwardManager;

    protected featureFoodData: FeatureFoodData;

    protected featureFoodDataMsr: FeatureFoodDataMsr;

    /**特色菜订单 */
    protected IOrder: IOrder;

    public constructor() {
        super();

        App.ViewManager.register(ViewConst.FoodActView, {
            prefabName: "FoodActView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        App.ViewManager.register(ViewConst.FoodActSumbitView, {
            prefabName: "FoodActSumbitView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        App.ViewManager.register(ViewConst.FoodActHelpView, {
            prefabName: "FoodActHelpView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        App.ViewManager.register(ViewConst.FoodActInfoView, {
            prefabName: "FoodActInfoView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        this.initModuleEvent();
        this.initNotificationEvent();
        this.setModel(new ActivityModel(this));
    }

    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        this.registerFunc(ActivityConst.SUMBIT_FOOD_ACT, this.sumbitFoodAct, this);
        this.registerFunc(ActivityConst.ANI_COMPLETE, this.aniComplete, this);
        this.registerFunc(ActivityConst.GET_ORDER_AWARDNUM, this.getFeatureAward, this);

    }

    protected initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);

    }
    public initGame() {
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this.featureFoodDataMsr = App.ConfigManager.getConfig("FeatureFoodDataMsr");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    protected aniComplete(index: number) {
        this.foodActView.onComplete(index);
    }
    /**获取到特色菜的奖励 */
    getFeatureAward(order: IOrder) {

        let foodData = this.featureFoodDataMsr.getData(order.food.getId()).getData(0);
        let arrLen = foodData.scoreList.length;
        for (let i = 0; i < arrLen; i++) {
            if (order.score <= foodData.scoreList[i]) {
                let item = App.ConfigManager.getConfig("ItemDataManager").getData(foodData.awardList[i]);
                let num = this.world.sceneMgr.idleMoneyRate.value * item.agrs0;
                return num;

                break;
            }
        }
    }

    /**
     * 提交厨神大赛成绩
     */
    protected sumbitFoodAct(order: IOrder) {
        if (order.isFinish) {
            // order.isFinish = true;
            this.IOrder = order;
            this.world.sceneMgr.nowScene.orderMsr.finishFeatureFood(order);
        } else {
            if (order.customer) {
                order.customer.isExit = true;
                order.customer.roleMsr.scene.tableMsr.emptyPos.push(order.customer.tablePosData);//将这个位置放入待清理列表
                order.customer.roleMsr.scene.orderMsr.featureOrderList.remove(order);
                this.world.sceneMgr.nowScene.orderMsr.closeTheFeatureFoodView();
            }
        }
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.FoodActView:
                this.foodActView.setUserData({
                    /** 活动状态 */
                    actState: 1,
                    /** 当前进行步骤 */
                    index: 0,
                    /** 各个步骤分数 */
                    scoreList: [],
                });
                break;
            case ViewConst.FoodActInfoView:
                // var foodActData = this._model.getFoodActUserData();
                // this.foodActInfoView.setData(foodActData);
                // let addMoney = this.IOrder.food.getAward(this.order, this.scene.buffList.FOOD_SELL_RATE);
                // this.world.sceneMgr.idleMoneyRate
                // this.foodActInfoView.awardLabel.string = "";
                break;
        }
    }

}
