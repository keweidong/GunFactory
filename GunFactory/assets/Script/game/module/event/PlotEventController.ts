import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import Toast from "../../../core/utils/Toast";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { BagConst } from "../bag/BagConst";
import { BagModel } from "../bag/BagModel";
import { GameConst } from "../GameMain/GameConst";
import { CustomerData } from "../GameMain/object/scene/config/CustomerDataMsr";
import WorldScene from '../GameMain/object/scene/WorldScene';
import { GameUIConst, NewsTypeConst } from "../GameUI/GameUIConst";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import AwardView from "./AwardView";
import DialogueUIView from "./DialogueUIView";
import { GukeEventData } from "./GuKeEventDataManager";
import { EventType, PlotEventConst } from "./PlotEventConst";


export const enum GooutAwardType {
    /**爱心 */
    aix,
    /**金币 */
    jb,
    /**钻石 */
    zs,
    /**银币 */
    yb,
    /**初级猫粮 */
    cj,
    /**饱食度 */
    bs,
}

export default class PlotEventController extends BaseController {

    protected _bagModel: BagModel = null;

    public dialogueUIView: DialogueUIView = null;
    // public catEventUIView: CatEventUIView = null;
    public awardView: AwardView = null;
    // public chatView: ChatView = null;
    // public goOutView: GoOutView = null;

    // plotData: PlotEventData = null;
    plotDatabool: boolean = false;

    /**答对次数 */
    public daduinum: number = 0;
    /**答题次数 */
    public datinum: number = 0;

    public catunlockTime: number = 0;
    public catunlockbool: boolean = false;
    public gukeunlockTime: number = 0;
    public gukeunlockbool: boolean = false;

    /**消息聊天随机数据 */
    // public randomchatdata: ChatData[] = [];

    plotEventConf: PlotEventConf = null;

    public worldScene: WorldScene = null;
    public constructor() {
        super();
        //初始化UI
        // this.loadingView = new LoadingView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.DialogueUIView, {
            prefabName: "DialogueUIView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        App.ViewManager.register(ViewConst.AwardView, {
            prefabName: "AwardView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        // App.ViewManager.register(ViewConst.ChatView, {
        //     prefabName: "ChatView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });


        // this.systemDataManager = App.ConfigManager.systemDataManager;

        //注册事件监听
        // this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
        //如果是直接进入登录模块,先注册好友系统
        // App.ControllerManager.register(ControllerConst.friendsSys,new FriendsSysController());
        // this.initModuleEvent();
        // this.initNotificationEvent();

        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
    }
    public init() {
        this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this._bagModel = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.init, this);

        this.initModuleEvent();
        this.initNotificationEvent();

        this.plotEventConf = App.ConfigManager.gameConf.game.plotEventConf
        this.guleeventIsOpen();
        // this.starCountDown();

        // let day = Math.floor((this.world.onlinetime * 2.5) / (24 * 60 * 60 * 1000)) ;
        // cc.log("******时间*****",day);
        //let day = Math.floor((this.world.onlinetime * 60) % (24 * 60 * 60 * 1000)) ;

    }


    /**
     *注册模块消息
    */
    protected initModuleEvent() {

        this.registerFunc(PlotEventConst.JUDGE_DAAN, this.judgeDaAn, this);
        this.registerFunc(PlotEventConst.LINQU_AWARD, this.addjinbi, this);
        this.registerFunc(PlotEventConst.GUKE_STATA_EVENT, this.gukeEventtime, this);
        this.registerFunc(PlotEventConst.GUKE_COMEIN, this.gukeComein, this);
        this.registerFunc(PlotEventConst.INFORMOF, this.Informof, this);
        this.registerFunc(PlotEventConst.NOCHAT, this.nochat, this);
        this.registerFunc(PlotEventConst.CREATE_GUKE_EVENT, this.createGukeEvent, this);  // TODO 已废
        this.registerFunc(PlotEventConst.CREATE_GUKE_CHAT, this.createGukeChat, this);

        this.registerFunc(PlotEventConst.CREATE_SP_CUSTOMER_EVENT, this.createGukeEvent, this);
        this.registerFunc(PlotEventConst.OPEN_CUSTOMER_EVENT, this.openCustomerEvent, this);

        this.registerFunc(PlotEventConst.Hide_The_GuKeEvent, this.HideTheGukeEvent, this);
        this.registerFunc(PlotEventConst.StarGuKeCountDown, this.starCountDown, this);
        //this.registerFunc(PlotEventConst.ADDAIXIN, this.addAixin, this);
        //App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.eventIsOpen, this);
    }
    /**顾客事件自动隐藏,重新随机 */
    protected HideTheGukeEvent() {
        this.curCustomerEventId = null;
        this.gukeEventtime();
    }
    protected initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(NotificationConst.SYS_OPEN, this.checkOpen, this);
    }

    onLoadView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.DialogueUIView:
                break;
            case ViewConst.ChatView:
                // this.randomChatevent();
                break;

        }
    }
    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.DialogueUIView:
                this.openDialogueView();
                break;
            case ViewConst.ChatView:
                // this.openChatView();
                break;
            case ViewConst.NewsView:
                this.starCountDown();
                break;

        }
    }

    /** 当前顾客事件id */
    protected curCustomerEventId: number = null;
    /** 顾客数据 */
    protected curCustomerData: CustomerData = null;
    /**
    * 创建顾客事件
    * @param customerEventId 顾客事件id
    * @param isForce 是否强制
    */
    public createGukeEvent(customerEventId: number, isForce: boolean = false) {
        if (this.curCustomerEventId > 0 && !isForce) {
            return;
        }

        this.curCustomerEventId = customerEventId;

        let gukedata: GukeEventData = App.ConfigManager.gukeEventDataManager.getData(customerEventId);
        if (gukedata != null) {
            this.gukeunlockbool = false;
            if (this.worldScene.sceneMgr.nowScene.roleMsr.curCustomers.length > 0) {
                let customerData = App.RandomUtils.randomArray(this.worldScene.sceneMgr.nowScene.roleMsr.curCustomers).conf;
                this.curCustomerData = customerData

                let url = `Texture/icon/tx_${customerData.id}`;
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Chat, true, gukedata.title, url);
            }
        }
        else {
            cc.log("****没有该id的顾客事件*****", customerEventId);
        }
    }

    /**
    * 创建顾客来访消息
    */
    public createGukeChat(gukeid: number) {
        if (this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist.indexOf(gukeid) == -1) {
            this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist.push(gukeid);
        }
        // this.Informof();
    }
    protected checkOpen(systemIndex: number, isOpen: boolean) {
        if (systemIndex == OpenTypeConst.GUKEEVENT) {
            if (isOpen) {
                App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.checkOpen, this);
                this.gukeEventtime();
            }
        }
    }
    //监听顾客事件功能开放
    guleeventIsOpen() {
        // let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.GUKEEVENT);
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.GUKEEVENT);
        if (isOpen) {
            this.gukeIsOpen(OpenTypeConst.GUKEEVENT, isOpen);
        } else {
            App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.gukeIsOpen, this);
        }
    }
    //监听顾客事件功能开放
    gukeIsOpen(index: number, isOpen: boolean) {
        if (index == OpenTypeConst.GUKEEVENT) {
            if (isOpen) {

                this.gukeEventtime();
            }
        }
    }

    /**
     * 事件聊天界面
     */
    openDialogueView() {
        this.datinum = 0;
        this.daduinum = 0
        // if (this.dialogueUIView.eventype == EventType.CATTYPE) {
        //     if (this.dialogueUIView.plotData.isranage == 1) {
        //         this.worldScene.catEventlist.push(this.dialogueUIView.plotData.id);
        //     }
        // }
        // else 
        if (this.dialogueUIView.eventype == EventType.GUKETYPE) {
            if (this.dialogueUIView.plotData.isranage == 1) {
                this.worldScene.gukeEventlist.push(this.dialogueUIView.plotData.id);
            }
        }
    }

    /**
     * 随机生成顾客事件
     */
    public ranageGukeEvetn() {
        if (this.curCustomerEventId > 0) {
            return;
        }
        this.gukeunlockbool = false;
        let aixin = App.GameDataMsr.playerInfo.level;
        let ploteventData = App.ConfigManager.gukeEventDataManager.getAllDatas();
        //一次性事件
        let oneeventlist: GukeEventData[] = [];
        //随机事件
        let ranageeventlist = [];
        for (let key in ploteventData) {
            if (ploteventData[key].isranage == 1 && this.worldScene.gukeEventlist.indexOf(ploteventData[key].id) === -1) {
                if (aixin >= ploteventData[key].aixin) {
                    oneeventlist.push(ploteventData[key]);
                }
            }
            else {
                if (aixin >= ploteventData[key].aixin && ploteventData[key].isranage == 0 && ploteventData[key].weight > 0) {
                    ranageeventlist.push(ploteventData[key]);
                }
            }
        }
        let gukedata: GukeEventData = null;
        if (oneeventlist.length > 0) {
            gukedata = oneeventlist[0];
            for (let i = 0; i < oneeventlist.length; i++) {
                if (gukedata.aixin > oneeventlist[i].aixin) {
                    gukedata = oneeventlist[i];
                }
            }
        }
        else {
            gukedata = App.RandomUtils.randomArrayByWeight(ranageeventlist);
        }
        if (gukedata == null || this.worldScene.sceneMgr.nowScene.roleMsr.curCustomers.length == 0) {
            //this.gukeunlockbool = true;
            this.gukeEventtime();
            return;
        }
        //let gukedata = App.RandomUtils.randomArrayByWeight();
        cc.log("******随机生成顾客事件*******", gukedata);
        let customerData = this.curCustomerData = App.RandomUtils.randomArray(this.worldScene.sceneMgr.nowScene.roleMsr.curCustomers).conf;
        this.curCustomerEventId = gukedata.id;
        let url = `Texture/icon/tx_${customerData.id}`;
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Chat, true, gukedata.title, url);


    }
    /**
    * 判断答案是否正确
    * @param daan 选择的答案
    * @param dui 正确答案
    */
    public judgeDaAn(daan: number, dui: number, plotData: any) {

        this.dialogueUIView.closeView();
        App.ViewManager.open(ViewConst.AwardView, plotData, daan == dui, true);

    }

    /**
     * 增加奖励
     * @param data 数据
     * @param isdui 答对答错
     */
    public addjinbi(data: any, isdui: boolean) {
        let type = isdui == true ? data.awardtype : data.mistaketype;
        let num = isdui == true ? data.awardnum : data.mistakenum;
        if (type >= 0) {
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, type, 1, 1);
            //App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, type, 1)
        }
        else {
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, type, num, 3);
        }
        this.addAixin(data.eventtype);
    }

    /**增加爱心值 */
    public addAixin(eventtype: number) {
        // let id = App.ConfigManager.gameConf.game.plotEventConf.aixinitemid;
        // let axindata = App.ConfigManager.itemDataManager.getData(id);
        // let num = 0;
        // if (eventtype == EventCatTypeConst.DUI_HUA) {
        //     num = axindata.agrs1;
        // }
        // else {
        //     num = axindata.agrs0;
        // }
        // this.worldScene.changeHeart(num);
        // //App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.ADD_HEART_VALUE, num);
    }

    /**
     * 顾客事件计时
     */
    public gukeEventtime() {
        let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.GUKEEVENT);
        if (isOpen) {
            this.gukeunlockTime = App.DateUtils.Now() + App.ConfigManager.gameConf.game.plotEventConf.clienteventtime;
            this.gukeunlockbool = true;
        }
    }

    //开始倒计时
    protected starCountDown() {
        App.TimerManager.doTimer(1000, 0, this.refresh, this);
    }

    //刷新倒计时
    protected refresh() {
        let now = App.DateUtils.Now();
        // Log.trace("-----------", now >= this.gukeunlockTime);
        if (now >= this.gukeunlockTime && this.gukeunlockbool && this.worldScene.sceneMgr.nowScene.roleMsr.curCustomers.length > 0) {
            let rom = Math.random();
            // cc.log("********顾客事件出现概率**", rom);
            if (this.plotEventConf.randomshowgukeevent >= rom) {
                this.ranageGukeEvetn();
            }
            else {
                this.gukeEventtime();
            }
        }
    }

    /**聊天消息事件随机数据 */
    // public randomChatevent() {
    //     let chatdata = App.ConfigManager.chatDataManager.getAllDatas();
    //     for (let key in chatdata) {
    //         let data = chatdata[key].getData(0);
    //         if (data.weight > 0) {
    //             this.randomchatdata.push(data);
    //         }
    //     }
    // }

    /**没消息 */
    nochat() {
        if (this.curCustomerEventId != null) {
            this.openCustomerEvent();
            this.curCustomerEventId = null;
            this.curCustomerData = null;
            return;
        }
        if (this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist.length == 0) {
            Toast.launch(GameText.getText(lang.common_no_message));
            return;
        }
        let custome = App.ConfigManager.getConfig("CustomerDataMsr").getData(this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist[0]);
        App.ViewManager.open(ViewConst.ChatView, custome);
        App.NotificationCenter.dispatch(NotificationConst.READ_CUSTOMER_CIRCLE);
    }



    // /**聊天消息事件界面 */
    // public openChatView() {
    //     let data = App.RandomUtils.randomArrayByWeight(this.randomchatdata);
    //     let chatdata = App.ConfigManager.chatDataManager.getData(data.id).getAllData();
    //     this.chatView.setCatData(chatdata);
    // }

    /**聊天结束通知顾客进来 */
    public gukeComein() {
        let datalist = this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist;
        // let data = datalist[0];
        // if(!this.world.roleMsr.checkCustomerUnlock(data)){
        //     this.world.roleMsr.addUnlock(data);
        //     let config = App.ConfigManager.customerDataManager.getData(data);

        //     App.ViewManager.open(ViewConst.GetCustomerView, config.name, config.atlasAsset);
        //     return;
        // }
        // this.worldScene.sceneMgr.nowScene.roleMsr.createCustomer(datalist[0]);
        this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist.splice(0, 1);
        this.Informof();
    }

    /**
     * 通知消息
     */
    public Informof() {
        if (this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist.length) {
            let customerId = this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist[0]
            // let config = App.ConfigManager.customerDataManager.getData(customerId);
            let config = App.ConfigManager.getConfig("CustomerDataMsr").getData(customerId);
            var url = `Texture/icon/tx_${config.id}`;
        }
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Chat, this.worldScene.sceneMgr.nowScene.roleMsr.customerDatalist.length > 0, GameText.getText(lang.common_new_message), url)

    }

    setAwardType(awardType: string): string[] {
        let temp = awardType.split("|");
        let arr: string[] = []
        for (let i = 0; i < temp.length; i++) {
            arr.push((temp[i]));
        }
        return arr;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // protected curSpCatEventId: number = null;
    // protected curCatInfo: CatInfo = null;


    // //观看广告
    // protected async watchAD() {
    //     let eventId = this.curSpCatEventId;
    //     this.curSpCatEventId = null;
    //     this.curCatInfo = null;
    //     // App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsConst.Event, false);
    //     let result = await ADController.getInstance().openAdByTypeAsync(AdType.CAT_EVENT);
    //     if (result) {
    //         let catdata: PlotEventData = App.ConfigManager.ploteventDataManager.getData(eventId);
    //         let itemId = catdata.awardtype;
    //         this.applyControllerFunc(ControllerConst.Item, BagConst.ADD_TIME, itemId, catdata.awardnum || 1, AniType.all);
    //     } else {
    //         // let catdata: PlotEventData = App.ConfigManager.ploteventDataManager.getData(this.curSpCatEventId);
    //         // let itemId = catdata.awardtype;
    //         // this.applyControllerFunc(ControllerConst.Item, BagConst.ADD_TIME, itemId, 1, AniType.all);
    //         // return;
    //     }

    // }



    /** 创建人事件 */
    protected createCustomerEvent() {

    }

    /** 打开人事件 */
    protected openCustomerEvent() {
        let gukedata: GukeEventData = App.ConfigManager.gukeEventDataManager.getData(this.curCustomerEventId);
        App.ViewManager.open(ViewConst.DialogueUIView, gukedata, this.curCustomerData, EventType.GUKETYPE);
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Chat, false);
    }
}