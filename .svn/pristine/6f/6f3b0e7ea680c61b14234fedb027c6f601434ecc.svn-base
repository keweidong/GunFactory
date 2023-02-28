import App from "../../../core/App";
import { Actions } from "../../../core/behavior/Actions";
import BaseController from "../../../core/mvc/controller/BaseController";
import EffectUtils from "../../../core/utils/EffectUtils";
import ViewAni from "../../component/ViewAni";
import { registerJSONConf } from "../../ConfigManager";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import { GameDataSaveKey } from "../../GameDataMsr";
import LayerManager from "../../LayerManager";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { HappyConst } from "../Happy/HappyConst";
import GodGuide from "./guide/GodGuide";
import { GuideConst, GuideModel } from "./GuideModel";


export default class GuideController extends BaseController {
    public world: WorldScene;
    protected _model: GuideModel = null;
    public godGuide: GodGuide = null;

    public static isGuide: boolean = true;

    /** 是否跳过新手引导 */
    protected isSkin: boolean = null;

    protected curId: number = null;
    /** 行为树 */
    protected tree: b3.BehaviorTree = null;
    protected blackboard: b3.Blackboard = null;
    public constructor() {
        super();
        GuideController.isGuide = true;
        this.setModel(new GuideModel(this));
        App.SaveManage.add(this._model, GameDataSaveKey.GUIDE_DATA, false, true);

        this.addEventKeyMap(GuideConst);
        // //商城
        App.ViewManager.register(ViewConst.GuideView, {
            prefabName: "GodGuide",
            parent: LayerManager.UI_Guide,
            controller: this
        });
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.init, this, 2);
    }

    public init() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
        this.initModuleEvent();
        this.initNotificationEvent();
        this.initData();
        if (this._model.checkIsFinish(1)) {
            CC_DEBUG && Log.trace("/------------Guide init:");
            this.world.sceneMgr.nowScene.roleMsr.enabled = true;
        } else {
            this.world.sceneMgr.nowScene.roleMsr.enabled = false;
            this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = Number.MAX_VALUE;
            this.tick();
        }
        // this._model.conf = App.ConfigManager.shopDataManager;
    }
    protected initData() {
        App.SaveManage.load(GameDataSaveKey.GUIDE_DATA);
        this.loadTree();
        // App.ViewManager.open(ViewConst.Loading)
        // App.ViewManager.close(ViewConst.Loading)
    }
    public setIsCanPlayAni(isCanPlay: boolean) {
        ViewAni.isCanPlayAni = isCanPlay;
        GuideController.isGuide = !isCanPlay;
    }
    protected notification: string = null;
    protected cb: Function = null;
    protected listenNotifiaction() {
        if (this.notification && this.notification != "") {
            App.NotificationCenter.removeListener(this.notification, this.listenNotifiaction, this);
        }
        App.TimerManager.remove(this.listenNotifiaction, this);
        this.tick();
    }
    /** 延迟时间 */
    public wait(dailyTime: number, notification: string) {
        if (notification && notification != "") {//Game_Main/GameMainView>GameView>table0/TableImg/food2
            this.notification = notification;
            App.NotificationCenter.addListener(notification, this.listenNotifiaction, this);
        }
        if (dailyTime) {
            App.TimerManager.doTimer(dailyTime, 1, this.listenNotifiaction, this);
        }
    }

    public showStory(params: NGSetStoryParam) {
        // storyPrefab

        this.clearTyperTimer();
        // stroyObj.label.string = params.str;
        let stroyObj = this.godGuide.getStoryObj();
        let item = stroyObj.items[stroyObj.index++];
        item.node.active = true;
        // item.label.node.y = params.labY;
        // stroyObj.node.x = -cc.winSize.width;

        item.label.string = "";
        let func = () => {
            if (params.typerAniTime) {
                this.godGuide._targetNode = stroyObj.node;
                stroyObj.node.once(cc.Node.EventType.TOUCH_END, () => {
                    this.clearTyperTimer();
                    this.godGuide._targetNode = null;
                    item.label.string = params.str;
                    this.typerFinish();
                }, this);
                this._typerTimer = EffectUtils.instance.typerEffect(item.label, params.str.replace(/\\n/g, "\n"), params.typerAniTime, this.typerFinish, this);
            } else {
                item.label.string = params.str.replace(/\\n/g, "\n");
                // this._typerTimer = EffectUtils.instance.typerEffect(stroyObj.label, params.str, 100, this.typerFinish, this);
                this.typerFinish();
            }
        }
        if (stroyObj.index % 2) {
            item.node.x = -cc.winSize.width;
            cc.tween(item.node).to(0.7, { x: 0 }, { easing: cc.easing.cubicOut }).call(func).start();
        } else {
            item.node.x = cc.winSize.width;
            cc.tween(item.node).to(0.7, { x: 0 }, { easing: cc.easing.cubicOut }).call(func).start();
        }
        // if (stroyObj.node.x !== 0) {
        // } else {
        //     func();
        // }

        // App.CommonUtils.setSpriteFrame("Texture/guide/" + params.imgName, stroyObj.img);
        // CC_DEBUG && Log.trace("stroyObj.img:", stroyObj.img);
    }
    public hideStory() {
        this.clearTyperTimer();
        let stroyObj = this.godGuide.getStoryObj();
        cc.tween(stroyObj.node).to(0.7, { x: -cc.winSize.width }, { easing: cc.easing.cubicOut }).call(() => {
            stroyObj.node.active = false;
            this.tick();
            // this._typerTimer = EffectUtils.instance.typerEffect(stroyObj.label, params.str, 100, this.typerFinish, this);
        }).start();
        // this.godGuide.getStoryObj().node.active = false;
    }
    protected _typerTimer: any = null;
    protected typerFinish() {
        CC_DEBUG && Log.trace("typerFinish");
        // this.waitTouch();
        App.TimerManager.setFrameOut(1, this.waitTouch, this)
        let stroyObj = this.godGuide.getStoryObj();
        stroyObj.node.off(cc.Node.EventType.TOUCH_END);
        this._typerTimer = null;
    }
    protected clearTyperTimer() {
        if (this._typerTimer) {
            App.TimerManager.remove(this._typerTimer, null);
            this._typerTimer = null;
        }
    }
    public waitTouch() {

        if (this.godGuide._targetNode) {

        } else {
            this.godGuide._targetNode = this.godGuide.node;
            // this.godGuide.text.once('click', () => {
            //     CC_DEBUG && Log.trace("点击文本!");
            //     this.godGuide._targetNode = null;
            //     this.tick();
            // });
        }
        this.godGuide._targetNode.once(cc.Node.EventType.TOUCH_END, () => {
            CC_DEBUG && Log.trace("点击目标节点!");
            this.godGuide._targetNode = null;
            this.tick();
        });
    }

    /** 等待玩家点击 */
    public locatorTouchNode(args: string, isShowFinger: number, cb?: Function, type = 0) {
        //定位节点
        this.godGuide.find(args, (node: cc.Node) => {
            //手指动画
            if (isShowFinger) {
                this.godGuide.fingerToNode(node, () => {
                    this.godGuide._targetNode = node;
                    cb();
                    this.tick();
                    // //点击确认
                    // node.once(cc.Node.EventType.TOUCH_END, () => {

                    // });

                });
            }
            else {
                cb();
                this.tick();
                //点击确认
                // node.once(cc.Node.EventType.TOUCH_END, () => {

                // });
            }
        }, type);
    }
    /** 隐藏遮罩 */
    public hideMask() {
        this.godGuide.hideMask();
    }
    /**
     * 显示遮罩
     * @param args 镂空路径
     */
    public showMask(opacity?: number) {
        this.godGuide.showMask(opacity);
        // if (args || args !== "") {
        //     // this.godGuide.find(args);
        //     this.godGuide.find(args, (node: cc.Node) => {
        //         this.godGuide._targetNode = node;
        //     })
        // }
    }
    /** 设置引导步骤 */
    public setStep(id: number, step: number) {
        this._model.setStep(id, step);
        if (step === -1) {
            this.godGuide.stepFinish(id);
            App.NotificationCenter.dispatch(NotificationConst.GUIDE_STEP_FINISH, id);
        }
    }
    public openGuideView() {
        EffectUtils.instance.queueExecutor.regist(() => {
            this.setIsCanPlayAni(false);
            App.NotificationCenter.dispatch(NotificationConst.START_GUIDE);
            EffectUtils.instance.queueExecutor.finishFunc();
            App.ViewManager.closeAll([
                ViewConst.GameUI,
                ViewConst.GameMain,
                ViewConst.DebugUI,
                ViewConst.TaskBtnView,
                // ViewConst.NewbieTaskBtnView,
                // ViewConst.NewsView,
                // ViewConst.ScheduleAndMiniappsView,
                ViewConst.Loading,
                // ViewConst.ResidentBuffView,
                //ViewConst.NewbieTaskGuide,
            ]);
            App.ViewManager.open(ViewConst.GuideView, true);
        }, this);
        // App.ViewManager.closeAll([
        //     ViewConst.GameUI,
        //     ViewConst.GameMain,
        //     ViewConst.DebugUI,
        //     ViewConst.TaskBtnView,
        //     ViewConst.NewbieTaskBtnView,
        //     ViewConst.NewbieTaskGuide,
        //     ViewConst.NewsView,
        // ]);
        // App.ViewManager.open(ViewConst.GuideView, true);
    }
    /** 跳过新手引导 */
    protected skinGuide(isAll: boolean) {
        // this.hideMask();
        // this.hideTip();
        // this.hideScene();
        // this.delDB();
        // this.endPhoneTalk();
        // this.hideStory();
        // this.godGuide.hideFinger();
        // this.setIsCanPlayAni(true);
        App.ViewManager.close(ViewConst.GuideView);
        if (isAll) {
            this.testSkinGuide();
        }
        else {
            if (this.curId > -1) {
                this._model.setStep(this.curId, this._model.saveData[this.curId].index + 1);
                this.blackboard = new b3.Blackboard();
                this.tick();
            }
        }
    }
    /** 检测引导步骤 */
    public checkStep(id: number, step: number) {
        if (this.isSkin) {
            this._model.setStep(id, -1);
        }
        let isSuccess = this._model.checkStep(id, step);
        if (isSuccess)
            this.curId = id;
        return isSuccess;
    }
    // /** 展示说明步骤 */
    // public showGuideDesc(desc: string, cb: Function) {
    //     let strList = desc.split("|");
    //     this.godGuide.showDesc(strList, () => {
    //         cb();
    //         this.tick();
    //     });
    // }

    /** 展示tip */
    public showTip(data: {
        str: string;
        pos: string;
        ani: string;
    }) {
        this.godGuide.showText(data);
    }
    /** 隐藏 */
    public hideTip() {
        this.godGuide.hideText();
    }
    /** 跳过全部新手引导 */
    protected testSkinGuide() {
        this.isSkin = true;
        this.blackboard = new b3.Blackboard();
        this.tick();
    }
    /** 加载行为树 */
    loadTree() {
        // if (Platform.instance.isGetRemoteRes()) {
        //     let file: cc.JsonAsset = await this.loadRemote("NewGuideTree");
        //     this.tree = new b3.BehaviorTree();
        //     this.tree.load(file, Actions);
        // } else {
        //     this.tree = new b3.BehaviorTree();
        //     var conf: cc.JsonAsset = await App.ResManager.getResAsync("BehaviorData/NewGuideTree");
        //     this.tree.load(conf.json, Actions);
        // }
        this.tree = new b3.BehaviorTree();
        this.tree.load(App.ConfigManager.getConfig("guideConf"), Actions);
        this.blackboard = new b3.Blackboard();
        // this.tick();

    }
    /** 检测新手引导 */
    protected tick() {
        if (this.tree) {
            // this.godGuide.hideFinger();

            let result = this.tree.tick(this, this.blackboard);
            if (result === b3.RUNNING) {
            } else {
                if (GuideController.isGuide) {
                    this.setIsCanPlayAni(true);
                }
                //     CC_DEBUG && Log.trace("新手引导走完一次行为树");
            }
        }
    }
    onOpenView() {
        ViewAni.isCanPlayAni = false;
        // 行为树
        // todo 需要下一帧窗口才适配
        App.TimerManager.doFrame(1, 1, this.tick, this);
    }
    protected _isTest: boolean = false;
    /**
     * 开启新手引导
     */
    protected on_OPEN_GUIDE(guideIndex: number) {
        this.tick();
    }

    /** 检测新手引导是否需要打开 */
    public checkNewGuideIsOpen(data: NGOpenConditionData) {
        if (this._model.checkIsFinish(data.id)) {
            // 已完成
            return false;
        }
        else {
            if (this.isSkin) {
                this._model.setStep(data.id, -1);
                return false;
            }
            // // 未完成
            let curHeart = this.world.playerDto.level;
            if (curHeart < data.userLevel) {
                return false;
            }
            return true;
        }
    }


    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        this.registerFunc(GuideConst.OPEN_GUIDE, this.on_OPEN_GUIDE, this);
        this.registerFunc(GuideConst.PLAY_RECORD, this.playRecordNodeTouch, this);
        this.registerFunc(GuideConst.START_RECORD, this.startRecordNodeTouch, this);
        this.registerFunc(GuideConst.STOP_RECORD, this.stopRecordNodeTouch, this);
        this.registerFunc(GuideConst.SET_IS_AUTO, this.setAutorun, this);
        this.registerFunc(GuideConst.NEXT_STEP, this.onNextStep, this);
        this.registerFunc(GuideConst.EXECUTE_FUNC, this.onExecuteFunc, this);
        this.registerFunc(GuideConst.CHECK_IS_GUIDE, this._model.checkIsFinish, this._model);

    }

    protected onNextStep() {
        this.godGuide.reset();
        this.tick();
    }
    public createGuideCustomer() {
        this.world.sceneMgr.nowScene.roleMsr.createGuideCustomer();
        this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = Number.MAX_VALUE;
        this.world.sceneMgr.nowScene.roleMsr.enabled = true;
        //新手引导期间不允许滚动场景
        this.applyControllerFunc(ControllerConst.Game, GameConst.SET_SCROLL_ENABLE, false);
        // this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = Number.MAX_VALUE;
    }
    public pauseAi() {
        this.world.sceneMgr.nowScene.roleMsr.enabled = false;
        // this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = Number.MAX_VALUE;
    }
    public resumeAi() {
        this.world.sceneMgr.nowScene.roleMsr.enabled = true;
        // this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = Number.MAX_VALUE;
    }
    public createStar() {
        let roleMsr = this.world.sceneMgr.nowScene.roleMsr;
        roleMsr.enabled = false;
        let customer = this.world.sceneMgr.nowScene.roleMsr.curCustomers[0];
        let pos = customer.node.parent.convertToWorldSpaceAR(customer.node.position);
        let tween: cc.Tween<any> = App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.CREATE_GUIDE_HAPPY, pos, roleMsr.gameView.layer);

        tween.call(() => {
            App.NotificationCenter.dispatch("NEXT_STEP");
        }).start();
    }
    public finishGuide() {
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.IS_COOD_ACCELERATE, false);//新手引导期间,点击厨师区域的touchend事件会接收不到,所以这里把加速关闭
        this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = 0;
        this.world.sceneMgr.nowScene.roleMsr.enabled = true;

        this.applyControllerFunc(ControllerConst.Game, GameConst.SET_SCROLL_ENABLE, true);
    }
    public step6() {
        // this.world.sceneMgr.nowScene.roleMsr.nextCustomerTime = 0;
    }
    public onExecuteFunc(funcName: string) {
        if (this[funcName] && typeof this[funcName] === "function") {
            return this[funcName]();
        }
        return b3.FAILURE;
    }


    /**
     * 回放录制
     */
    playRecordNodeTouch(sender, autorun) {
        this.godGuide.playRecordNodeTouch();
    }
    /**
    * 录制节点触摸
    */
    startRecordNodeTouch() {
        if (this.godGuide) {
            this.godGuide.startRecordNodeTouch();
        } else {
            App.ViewManager.open(ViewConst.GuideView)
        }
    }
    /**
     * 停止节点触摸录制
     */
    stopRecordNodeTouch() {
        this.godGuide.stopRecordNodeTouch();
    }
    setAutorun() {
        // this.godGuide.setAutorun();
    }

    protected initNotificationEvent() {
        // App.NotificationCenter.addListener(GameNotificationConst.G2C_UPGRADE, this.checkIsGuide, this);
        // App.NotificationCenter.addListener(GameNotificationConst.C2G_UNLOCK_SHAFT, this.onUpgrade, this);
    }

}

declare global {
    interface ConfigMap {
        "guideConf": TreeData;
    }

    interface NGTick extends b3.Tick {
        /**执行ai动画的对象 */
        target: GuideController;
    }
    /** 新手引导开启条件数据 */
    interface NGOpenConditionData {
        /** 新手引导id */
        id: number;
        /**开启对应的场景id */
        sceneId: number;
        /** 开启条件 用户等级 */
        userLevel: number;
        /** 任务 */
        taskId: number;
    }
}
registerJSONConf("guideConf", "NewGuideTree");//注册到预加载配置里面