import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import Toast from "../../../core/utils/Toast";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { BagModel } from "../../module/bag/BagModel";
import { BagConst } from "../bag/BagConst";
import { ItemBase } from "../bag/ItemBase";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { ShopData } from "./ShopDataManager";
import ShopItem from "./ShopItem";
import ShopModel from "./ShopModel";
import ShopView, { ShopViewConst } from "./ShopView";

export enum SHOP_TYPE {
    /**
     * 宝箱
     */
    BOX = 0,
    /**
     * 金币
     */
    GOLD = 1,
    /**
     * 超级现金
     */
    SUPER_CASH = 2,
    /**
     * 道具
     */
    PROP = 3,
}
export type ShopViewData = ShopViewDataItem[][];
export type ShopViewDataItem = {
    conf: ShopData;
    itemData: ItemBase;
}
export enum ShopConst {
    /**
     * 购买一个商品
     */
    BUY_ITEM,

    /**
     * 打开商城各种界面
     */
    OPEN_VIEW,
    /**
     * 播放飘金币动画
    */
    SHOP_JB_ANI,
    /**
     * 提示窗回调商城界面buy(),商品购买
    */
    SHOP_BUY,
}

export default class ShopController extends BaseController {
    public world: WorldScene;
    protected _model: ShopModel = null;
    public shopView: ShopView = null;
    protected isOpenView: ShopViewConst = null;
    public constructor() {
        super();
        this.setModel(new ShopModel(this));
        //商城
        App.ViewManager.register(ViewConst.ShopView, {
            prefabName: "ShopView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        // //商城购买宝箱提示
        // App.ViewManager.register(ViewConst.BoxTipView, {
        //     prefabName: "BoxTipView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });
        //注册事件监听
        // this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
        //如果是直接进入登录模块,先注册好友系统
        // App.ControllerManager.register(ControllerConst.friendsSys,new FriendsSysController());
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
    }

    public init() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
        this.initModuleEvent();
        this.initNotificationEvent();
        this._model.conf = App.ConfigManager.getConfig("ShopDataManager");
        // App.ViewManager.open(ViewConst.ShopView)
    }

    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        // this.registerFunc(GameUIConst.ASSIST_FINISH, this.openAssistFinish, this);
        this.registerFunc(ShopConst.BUY_ITEM, this.onBuyItem, this);
        this.registerFunc(ShopConst.OPEN_VIEW, this.OpenBoxView, this);
        this.registerFunc(ShopConst.SHOP_BUY, this.shopBuy, this);
    }

    protected initNotificationEvent() {
    }
    /**
     * 购买某个商品
     */
    protected onBuyItem(item: ShopViewDataItem) {
        let result = true;
        if (item.itemData.cnt === 0) {
            if (item.conf.yuan) {//人民币购买

            } else {//钻石购买
                if (this.world.superCash >= item.conf.superCash) {
                    // this.world.superCash -= item.conf.superCash;
                    // Platform.instance.saveMoneyChange(-item.conf.superCash, 0, 0, item.itemData.data.itemType, item.itemData.data.id);
                    this.world.subSuperCash(item.conf.superCash);
                } else {
                    Toast.instance.launch(GameText.getText(lang.common_diamond_not_enough));
                    return;
                }

            }
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, item.itemData.data.id, 1, 3);
        }
        if (this.shopView && this.shopView.isShow()) {
            this.shopView.updateData();
        }
    }

    protected shopDisplayDatas: ShopViewData = null;
    protected getShopViewDatas() {
        if (this.shopDisplayDatas) {
            return this.shopDisplayDatas;
        }
        let datas: ShopViewData = [
            [],
            [],
            [],
            [],
        ];
        let bagModel = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        for (let i = 0; i < datas.length; i++) {
            let list: ShopViewDataItem[] = datas[i];
            let confData = this._model.conf.getData(i);
            if (confData) {
                let shopConfDatas = confData.getAllData();
                let arrLen = shopConfDatas.length;
                for (let i = 0; i < arrLen; i++) {
                    let item = bagModel.itmes[shopConfDatas[i].itemIndex];
                    list.push({
                        conf: shopConfDatas[i],
                        itemData: item,
                    })
                }
            }
        }
        this.shopDisplayDatas = datas;
        return datas;
    }
    onLoadView(view: IBaseView) {
        if (view.viewId === ViewConst.ShopView) {
            this.shopView.setData(this.getShopViewDatas());
        }
    }
    onOpenView(view: IBaseView) {
        if (view.viewId === ViewConst.ShopView) {
            //     if (this.isOpenView != null) {
            //         this.shopView.setOpenView(this.isOpenView);
            //         this.isOpenView = null;
            //     }
            //     // let datas: ShopViewData = {
            //     //     [SHOP_TYPE.BOX as number]: [],
            //     //     [SHOP_TYPE.GOLD as number]: [],
            //     //     [SHOP_TYPE.SUPER_CASH as number]: []
            //     // };
            // let bagModel = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
            //     let idleMoney = this.world.sceneMgr.idleMoneyRate;
            //     let temp = MyBigLong.tempNum;
            // for (const key in this.shopDisplayDatas) {
            //         let type = parseInt(key);
            //         let list: ShopViewDataItem[] = this.shopDisplayDatas[key];
            //         // let shopConfDatas = this._model.conf.getData(type).getAllData();
            //         let arrLen = list.length;
            //         for (let i = 0; i < arrLen; i++) {
            //             let item = list[i].itemData;
            //             list[i].getString = type == SHOP_TYPE.GOLD ? temp.init(idleMoney).multiply(item.data.agrs0).toString() : (item.data.agrs0 + "");
            //         }
            // }
            this.shopView.updateData();
        }
    }

    //打开宝箱界面
    OpenBoxView(viewConst: ShopViewConst) {
        this.isOpenView = viewConst;
    }

    //商城购买
    shopBuy(shopItem: ShopItem) {
        shopItem.buy();
    }

}