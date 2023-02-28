import WorldScene from "../GameMain/object/scene/WorldScene";
import { BagModel } from "../bag/BagModel";
import BaseController from "../../../core/mvc/controller/BaseController";
import ViewManager from '../../../core/mvc/ViewManager';
import { register } from '../../../core/behavior/Actions';
import { ViewConst } from '../../consts/ViewConst';
import LayerManager from "../../LayerManager";
import App from "../../../core/App";
import ExploreModle from "./ExploreModle";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "../GameMain/GameConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { OpenTypeConst, OpenConst } from "../SystemOpen/SystemOpenConst";
import { ExploreConst, ExploreAwardType } from "./ExploreConst";
import Toast from '../../../core/utils/Toast';
import ExploreView from './ExploreView';
import ExploreChoseitem from './ExploreChoseitem';
import { GameUIConst, TIPSTATE } from "../GameUI/GameUIConst";
import { CostType } from "../bag/BagController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { ExploreWeightData, ExploreAwardData } from './ExploreDataMsr';
import { GameText } from "../../../core/lang/GameText";

export default class ExploreController extends BaseController {
    public world: WorldScene;
    protected _bagModel: BagModel = null;
    protected _model: ExploreModle = null;

    protected exploreView: ExploreView = null;

    /**
     * 打开的翻牌在List位置
     */
    public openItemIndex: number = -1;
    /**
     * 步骤
     */
    // public runNum: number = 1;

    /**
     * 奖励的类型
     */
    public awardType: ExploreAwardType = null;

    /**
     * 当前的关卡
     */
    public guanqiaId: number = 0;
    /**
     * 复活次数
     */
    public reviveNum: number = 2;

    /**
     * 探索按钮是否可点击
     */
    public isCanHideExploreBtn: boolean = false;

    /**
     * 下一个开启探索的时间
     */
    public nextOpenExploreTime: number = 0;

    // protected achievementView: AchievementView = null;

    /**
     * 获取的奖励数量列表
     * gold金币数量
     * diamonds钻石数量
     */
    awardData: {
        /**
         * 金币
         */
        gold: number,
        /**
         * 钻石
         */
        diamonds: number,

    }


    public constructor() {
        super();

        App.ViewManager.register(ViewConst.ExploreChoseView, {
            prefabName: "ExploreChoseView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        App.ViewManager.register(ViewConst.ExploreView, {
            prefabName: "ExploreView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        App.ViewManager.register(ViewConst.ExploreOverView, {
            prefabName: "ExploreOverView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        this.initModuleEvent();
        this.initNotificationEvent();
        this.setModel(new ExploreModle(this));
    }
    public initModuleEvent() {
        this.registerFunc(ExploreConst.OnTouchExploreBtn, this.onTouchExploreBtn, this)
        this.registerFunc(ExploreConst.OpenExploreView, this.openExploreView, this);
        this.registerFunc(ExploreConst.OpenExploreitemAni, this.showAniOpen, this);
        this.registerFunc(ExploreConst.ExploreChoujiang, this.chouJiang, this);
        this.registerFunc(ExploreConst.MarkCanClick, this.markBtnCanHit, this);
        this.registerFunc(ExploreConst.GetExploreAwardToleave, this.getExploreAwardToleave, this);
        this.registerFunc(ExploreConst.ChoseBomb, this.openExploreOverView, this);
        this.registerFunc(ExploreConst.ShowBomb, this.showBobmAni, this);
        this.registerFunc(ExploreConst.AdToRevive, this.reviveToAd, this);
        this.registerFunc(ExploreConst.GiveUp_Revive, this.giveUp_revive, this);
        this.registerFunc(ExploreConst.NextGuanqia, this.openNextGuanqia, this);
        this.registerFunc(ExploreConst.StartExploreTime, this.startExploreTime, this);
        this.registerFunc(ExploreConst.StopExploreTime, this.stopExploreTime, this);

    }
    /**
     * 开启计时
     */
    startExploreTime() {
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.Explore);
        if (!isOpen) {

            return;
        }

        //第一次打开不计时
        if (this._model.exploreSaveData.isFirstOpen < 0) {
            this.isCanHideExploreBtn = true;
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.OPEN_HONGDIAN_EXPLORE);
            return;
        }
        if (this.nextOpenExploreTime < App.DateUtils.Now()) {
            this.nextOpenExploreTime = App.DateUtils.Now() + App.ConfigManager.gameConf.game.exploreConf.exploreTime;
        }

        //传递消息,开始计时
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.StartExploreTime, this.nextOpenExploreTime);

    }
    /**
     * 结束计时
     */
    stopExploreTime() {
        this.isCanHideExploreBtn = true;
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.OPEN_HONGDIAN_EXPLORE);
    }


    /**进入下一个关卡 */
    openNextGuanqia() {
        let _view = this.exploreView;
        // _view.choseAwarditemList[this.openItemIndex].getComponent(ExploreChoseitem).rethisitem();
        // if (this.awardType == ExploreAwardType.golds) {
        //     _view.playGetCoinAni(CostType.coin, _view.choseAwarditemList[this.openItemIndex]);
        // } else if (this.awardType == ExploreAwardType.Diamonds) {
        //     _view.playGetCoinAni(CostType.diamond, _view.choseAwarditemList[this.openItemIndex]);
        // }

        this.guanqiaId++;
        this.openItemIndex = -1;
        if (this.guanqiaId > this._model.exploreWeightDataMsr.dataCnt - 1) {
            App.ViewManager.open(ViewConst.TipView, {
                curState: TIPSTATE.SURE,
                leftBtnText: GameText.getText(lang.common_sure),//"确定",
                leftFunc: () => {
                    //获取到奖励,关闭界面
                    this.getExploreAwardToleave();
                },
                leftThisObj: this,
                tipsStr: GameText.getText(lang.explore_finish),//`本次探索已完成`,
            } as COMMON_BOX);
            return;
        }

        this.exploreView.goldNum.string = MyBigLong.toString(this.awardData.gold);
        this.exploreView.diamondsNum.string = this.awardData.diamonds.toString();

        this.exploreView.nextCustom();

        let node = _view.topStepBg;
        _view.guanqiaNum.string = (this.guanqiaId + 1).toString();
        cc.tween(node)
            .to(0.5, { x: -600 })
            .call(() => {
                node.x = 600;
                cc.tween(node)
                    .to(0.5, { x: 0 })
                    .call(() => {
                        // this.exploreView.choseAwarditemList[this.openItemIndex].getComponent(cc.Button).interactable = true;
                        // for (let index = 0; index < this.exploreView.choseAwarditemList.length; index++) {
                        //     this.exploreView.choseAwarditemList[index].getComponent(cc.Button).interactable = true;
                        // }
                        this.exploreView.mark.node.active = false;

                    })
                    .start()
            })
            .start();


    }
    public initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(NotificationConst.INIT_GAME, this.initGame, this);
        notificationCenter.addListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);

    }

    public initGame() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this._model.init();
        this._bagModel = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        this.awardData = {
            gold: 0,
            diamonds: 0,
        }
        // this.startExploreTime();

    }

    /**
     * 更新系统开放
     * @param sysIndex 系统id
     * @param isOpen 是否开启
     */
    public onSystemOpen(sysIndex: number, isOpen: boolean) {
        if (isOpen && sysIndex === OpenTypeConst.Explore) {
            //开启计时
            this.startExploreTime();
        }
    }


    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.ExploreView:
                this.awardData = {//奖励归零
                    gold: 0,
                    diamonds: 0,
                }
                break;
            default:
                break;
        }


    }
    onCloseView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.ExploreView:
                for (let index = 0; index < this.exploreView.choseAwarditemList.length; index++) {
                    let item = this.exploreView.choseAwarditemList[index].getComponent(ExploreChoseitem);
                    item.card.node.active = item.baozha.node.active = item.awardShowNode.active = false;
                    item.icon.node.active = true
                }
                this.exploreView.goldNum.string = "";
                this.exploreView.diamondsNum.string = "";
                this.guanqiaId = 0;
                this.awardType = null;
                this.openItemIndex = -1;
                this.reviveNum = 2;
                this.isCanHideExploreBtn = false;
                this.startExploreTime();
                break;
            default:
                break;
        }
    }
    /**广告复活 */
    reviveToAd() {
        this.reviveNum--;
        // this.exploreView.mark.node.active = false;
        // this.exploreView.mark.interactable = false;
        //进入下一关
        this.openNextGuanqia();
    }
    /**放弃复活 */
    giveUp_revive() {
        if (App.ViewManager.isShow(ViewConst.ExploreView)) {
            App.ViewManager.close(ViewConst.ExploreView);
        }
    }
    /**选择到炸弹 */
    openExploreOverView() {

        App.TimerManager.doTimer(800, 1, () => {

            let data: ExploreOverAwardData = {
                data: this.awardData,
                num: this.reviveNum,
            }
            App.ViewManager.open(ViewConst.ExploreOverView, data);

        }, this);


    }
    /**
     * 拿奖励离开
     */
    getExploreAwardToleave() {
        if (this.awardData.gold == 0 && this.awardData.diamonds == 0) {
            App.ViewManager.open(ViewConst.TipView, {
                curState: TIPSTATE.SURE_CANCEL,
                leftBtnText: GameText.getText(lang.common_sure),//"确定",
                leftFunc: () => {
                    App.ViewManager.close(ViewConst.ExploreView);
                },
                leftThisObj: this,

                rightBtnText: GameText.getText(lang.common_cnacel),//"取消",
                rightFunc: () => {

                },
                rightThisObj: this,
                tipsStr: GameText.getText(lang.explore_tip_1),//"没有获得奖励,是否放弃本次探索",
            } as COMMON_BOX);
            return;
        }

        if (App.ViewManager.isShow(ViewConst.ExploreView)) {
            App.ViewManager.close(ViewConst.ExploreView);
        }
        if (this.awardData.gold != 0) {

            this.world.sceneMgr.nowScene.nowMoneyAdd(this.awardData.gold);
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.coin);
        }
        if (this.awardData.diamonds != 0) {
            this.world.superCash += this.awardData.diamonds;
            // App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, money);
            App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, 20);
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.diamond);
        }

    }




    /**
     * 遮罩按钮打开
     * @param num 
     */
    markBtnCanHit() {
        // this.exploreView.mark.interactable = true;
        if (this.awardType != ExploreAwardType.bomb) {
            App.TimerManager.doTimer(1000, 1, () => {
                if (!this.exploreView.mark.node.active) {
                    return
                }
                // this.exploreView.mark.node.active = false;
                // this.exploreView.mark.interactable = false;

                this.openNextGuanqia();
                // this.applyFunc(ExploreConst.NextGuanqia)
            }, this);
        }

    }
    /** 获取抽奖显示数据 */
    public getAwardShowData(config: ExploreAwardData) {
        let itemId = config.itemid;
        let awardType = config.type;
        if (config.type === ExploreAwardType.bomb || config.type === ExploreAwardType.none) {
            var awardExplorData: ExploreitemData = {
                type: awardType,
            }
        }
        else {
            let item = this._bagModel.itmes[itemId];

            var awardExplorData: ExploreitemData = {
                item: item,
                type: awardType,
            };

        }
        return awardExplorData;
    }
    /** 获取抽奖结果 */
    getAwardResult() {
        // 抽奖概率配置
        let rateConfig = this._model.exploreWeightDataMsr.getData(this.guanqiaId);
        let weightList = rateConfig.weightList;
        let totalWeight = rateConfig.getTotalWeight();
        let random = App.RandomUtils.limit(0, totalWeight);
        let index = 0;
        for (let i = 0; i < weightList.length; i++) {
            random -= weightList[i];
            if (random <= 0) {
                index = i;
                break;
            }
        }
        let awardConfig = this._model.exploreAwardDataMsr.getData(index);

        // let count = 0;
        let otherConfig: ExploreAwardData[] = [];
        let count = 0;
        while (1) {
            if (count === index) {
                count++;
                continue;
            }
            let config = this._model.exploreAwardDataMsr.getData(count);
            otherConfig.push(config);
            count++;
            if (otherConfig.length >= 3) {
                break;
            }
        }
        return { conf1: awardConfig, conf2: otherConfig };

    }
    /**
     * 抽奖
     */
    chouJiang(num: number) {
        if (this.openItemIndex > -1) {
            return;
        }
        this.openItemIndex = num;

        let temp = this.getAwardResult();
        let awardConfig = temp.conf1;
        let otherConfigList = temp.conf2;

        let awardData = this.getAwardShowData(awardConfig);
        let otherAwardDataList: ExploreitemData[] = [];
        for (let i = 0; i < otherConfigList.length; i++) {
            let config = otherConfigList[i];
            let temp = this.getAwardShowData(config);
            otherAwardDataList.push(temp);
        }
        this.exploreView.setAwardData(num, awardData, otherAwardDataList);


        this.exploreView.mark.node.active = true;
        // //开始抽奖
        // let config = this._model.exploreWeightDataMsr.getData(this.guanqiaId);
        // let totalWeight = config.getTotalWeight();
        // let random = App.RandomUtils.limit(0, totalWeight);
        // let index = 1;
        // for (let i = 0; i < config.weightList.length; i++) {
        //     random -= config.weightList[i];
        //     if (random <= 0) {
        //         index = i;
        //         break;
        //     }
        // }
        // let configs = this._model.exploreAwardDataMsr.getAllDatas();
        this.awardType = awardData.type;

        // let awardExplorData: ExploreitemData = {};

        // awardExplorData.type = configs[index].type;
        // awardExplorData.awardExploerData = configs[index];
        // if (this.awardType != ExploreAwardType.none && this.awardType != ExploreAwardType.bomb) {
        //     awardExplorData.item = this._bagModel.itmes[configs[index].itemid];

        //     if (this.awardType == ExploreAwardType.Diamonds) {
        //         awardExplorData.moneyNum = this._bagModel.itmes[configs[index].itemid].data.agrs0;
        //         this.awardData.diamonds += awardExplorData.moneyNum;
        //     } else if (this.awardType == ExploreAwardType.golds) {
        //         // awardExplorData.item = this._bagModel.itmes[configs[index].itemid];
        //         awardExplorData.moneyNum = this.world.sceneMgr.idleMoneyRate.value * this._bagModel.itmes[configs[index].itemid].data.agrs0
        //         this.awardData.gold += awardExplorData.moneyNum;
        //     }
        // }

        // this.exploreView.choseAwarditemList[this.openItemIndex].getComponent(ExploreChoseitem).setData(awardExplorData);
        switch (awardData.type) {
            case ExploreAwardType.Diamonds:
                this.awardData.diamonds += awardData.item.getCnt();
                break;
            case ExploreAwardType.golds:
                this.awardData.gold += this.world.sceneMgr.idleMoneyRate.value * this._bagModel.itmes[awardData.item.data.id].data.agrs0;
                break;

        }


        if (this.guanqiaId == this._model.exploreWeightDataMsr.dataCnt - 1) {
            this.exploreView.goldNum.string = MyBigLong.toString(this.awardData.gold);
            this.exploreView.diamondsNum.string = this.awardData.diamonds.toString();
        }
    }
    showBobmAni() {
        let _view = this.exploreView;
        _view.choseAwarditemList[this.openItemIndex].getComponent(ExploreChoseitem).showAwardLab();
        _view.choseAwarditemList[this.openItemIndex].getComponent(ExploreChoseitem).showBombAni();

    }

    /**
     * 动画播放
     */
    showAniOpen(isSelect: boolean) {
        // let _view = this.exploreView;
        // _view.choseAwarditemList[this.openItemIndex].getComponent(ExploreChoseitem).showAwardLab();
        this.exploreView.showItemAward(isSelect);

    }
    /**
     * 点击探索按钮
     */
    onTouchExploreBtn() {
        if (CC_DEBUG) {
            App.ViewManager.open(ViewConst.ExploreView);
            return;
        }
        //功能是否开放
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.Explore);
        if (!isOpen) {
            Toast.launch(GameText.getText(lang.explore_no_open));
            return;
        }
        //检测时间是否可以开启
        if (!this.isCanHideExploreBtn) {
            Toast.launch(GameText.getText(lang.explore_tip));
            return;
        }

        //是否第一次开启
        if (this._model.exploreSaveData.isFirstOpen > 0) {
            App.ViewManager.open(ViewConst.ExploreView);
            return;
        }
        App.ViewManager.open(ViewConst.ExploreChoseView, this._model.exploreGuidConf.getAllDatas(), this._model.exploreSaveData.isFirstOpen);
    }
    /**
     * 打开探索界面
     */
    openExploreView() {
        //引导过探索
        this._model.isFirstOpen = 1;
        this._model.exploreSaveData.isFirstOpen = 1;
        App.ViewManager.open(ViewConst.ExploreView);
    }
}