import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import EffectUtils from "../../../core/utils/EffectUtils";
import Toast from "../../../core/utils/Toast";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import { GameDataSaveKey } from "../../GameDataMsr";
import LayerManager from "../../LayerManager";
import { BagConst, ItemType } from "../bag/BagConst";
import { BagModel } from "../bag/BagModel";
import { UseItemResultData } from "../bag/ItemBase";
import MoneyItem from "../bag/MoneyItem";
import SuperCashItem from "../bag/SuperCashItem";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { LuckConst, LuckPatConst, LuckTypeConst } from "./LuckConst";
import { LuckCostDataManager, LuckDataManager } from "./LuckDataManager";
import { LuckModel } from "./LuckModel";
import LuckView from "./LuckView";

/**
 * 物品管理模块
 */
export default class LuckController extends BaseController {
    public world: WorldScene;
    protected _model: LuckModel = null;
    protected _bagModel: BagModel = null;
    protected luckView: LuckView;

    protected configManager: LuckDataManager;
    protected costConfManager: LuckCostDataManager;

    /** 幸运抽奖类型 */
    protected curPat: LuckPatConst = LuckPatConst.NORMAL;
    public constructor() {
        super();

        App.ViewManager.register(ViewConst.LuckView, {
            prefabName: "LuckView",
            parent: LayerManager.UI_Popup,
            controller: this
        })
        this.initModuleEvent();
        this.initNotificationEvent();
        this.setModel(new LuckModel(this));
    }

    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        this.registerFunc(LuckConst.FINISH_MOVE, this.finishMove, this);
        this.registerFunc(LuckConst.DRAW_AWARD, this.drawAward, this);
        this.registerFunc(LuckConst.CHECK_TIME, this.checkTime, this);
        this.registerFunc(LuckConst.Luck_JB_ANI, this.playJBAni, this)
    }

    protected initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;

        notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        notificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);
        notificationCenter.addListener(NotificationConst.UPDATE_SUPER_CASH, this.updateSuperCash, this);

    }
    protected initGame() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this._model.init();
        this.configManager = App.ConfigManager.luckDataManager;
        this.costConfManager = App.ConfigManager.luckCostDataManager;
        App.SaveManage.add(this._model, GameDataSaveKey.LUCK_DATA, false, true);
        App.SaveManage.load(GameDataSaveKey.LUCK_DATA);
    }

    protected drawAward(pat: LuckPatConst) {
        this.curPat = pat;
        switch (pat) {
            case LuckPatConst.NORMAL:
                this.clickDiaBtn();
                break;
            case LuckPatConst.HIGH:
                this.clickAdBtn();
                break;
        }
    }

    protected clickDiaBtn() {
        let cost = this.costConfManager.getData(0).costValue;
        let isSuccess = this.world.subSuperCash(cost);
        if (isSuccess) {
            this.randomStep(LuckPatConst.NORMAL);
            App.NotificationCenter.dispatch(NotificationConst.LUCK_AWARD, LuckPatConst.NORMAL);
        }
    }

    protected randomStep(pat: LuckPatConst) {
        // 随机1-6
        let random = this.getRandom();
        this.luckView.playAction(pat, random);
        this._model.addNum(pat, random);
        this.luckView.setBtnData(this.getBtnData());
    }

    /** 根据权重获取随机数 */
    protected getRandom() {
        let curPos = this._model.saveData.pos;
        let probList = this.configManager.getProbList(curPos);
        let len = probList.length
        let rate = 100 / probList[len - 1];
        let random = App.RandomUtils.limit(0, 100);
        for (let i = 0; i < len; i++) {
            let num = probList[i] * rate;
            if (num >= random) {
                return i + 1;
            }
        }
        CC_DEBUG && Log.trace("挖草 无情");
        return 0;
    }

    protected clickAdBtn() {
        this.randomStep(LuckPatConst.HIGH);
        App.NotificationCenter.dispatch(NotificationConst.LUCK_AWARD, LuckPatConst.HIGH);
    }

    protected checkTime() {
        this._model.checkTime();
        this.luckView.setBtnData(this.getBtnData())
    }

    /**
     * 行走结束
     */
    protected finishMove(curIndex: number) {
        // if (!curIndex) {
        //     curIndex = this._model.saveData.pos;
        // }
        //TODO 展示对应奖励
        let config = this.configManager.getData(curIndex);
        let awardType = config.awardType;
        let costConfig = this.costConfManager.getData(this.curPat);
        switch (awardType) {
            case LuckTypeConst.ITEM:
                // TODO 获得物品
                let item = this._bagModel.itmes.get(config.param);
                // switch(this.curPat){
                //     case LuckPatConst.HIGH:
                //         var patRate = costConfig.rate
                //         break;
                //     case LuckPatConst.NORMAL:
                //         var patRate = costConfig.rate
                //         break;
                // }
                let result = App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, config.param, this._model.saveData.rate * costConfig.rate);
                if (result) {
                    if (item.data.isNowUseItem) {
                        let result = <UseItemResultData<any>>App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, item.data.id, this._model.saveData.rate * costConfig.rate);
                        App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM_ANI, item, result, true);
                        //飘金币
                        if (item.data.itemType === ItemType.SUPER_CASH) {
                            App.ControllerManager.applyFunc(ControllerConst.Luck, LuckConst.Luck_JB_ANI, 1);
                        } else if (item.data.itemType === ItemType.IELD_MONEY) {
                            App.ControllerManager.applyFunc(ControllerConst.Luck, LuckConst.Luck_JB_ANI, 0);
                        }
                    }
                    else {
                        EffectUtils.instance.playGetItemAni({
                            item: item,
                            arg0: this._model.saveData.rate * costConfig.rate
                        });
                        //App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, 1);
                    }
                }
                this._model.setDouble(1);
                // this.setData();
                break;
            case LuckTypeConst.AGAIN:
                this.randomStep(-1);
                break;
            case LuckTypeConst.DOUBLE:
                this._model.setDouble(config.param * (this.curPat + 1));
                Toast.launch(GameText.getText(lang.luck_tip), config.param);
                // this.setData();
                break;
            default:
                break;
        }

        // this.luckView.resetStarPoint(this._model.saveData.pos);
    }


    public getItemListData() {
        let itemDataList: LuckItemData[] = [];
        this._bagModel = this._bagModel || <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);

        let curPos = this._model.saveData.pos;
        for (let i = 0; i < this.configManager.dataCnt; i++) {
            let config = this.configManager.getData(i);
            let data: LuckItemData
            let isStar = i == curPos;
            switch (config.awardType) {
                case LuckTypeConst.ITEM:
                    let item = this._bagModel.itmes[config.param]
                    if (item instanceof MoneyItem) {
                        var num = MyBigLong.create(this.world.sceneMgr.nowScene.idleMoneyRate).multiply(item.getCnt())
                    }
                    else if (item instanceof SuperCashItem) {
                        var num = MyBigLong.create(item.getCnt(), 0);
                    }
                    else {
                        var num = MyBigLong.create(item.getCnt(), 0);
                    }
                    data = {
                        index: i,
                        itemIcon: item.getItemPic(),
                        itemDesc: GameText.getText(lang.common_empty),//"无",
                        isStar: isStar,
                        num: num,
                    }
                    break;
                case LuckTypeConst.DOUBLE:
                    data = {
                        index: i,
                        itemIcon: "",
                        itemDesc: GameText.getText(lang.luck_tip_2),//"下次\n翻倍",
                        isStar: isStar,

                    }
                    break;
                case LuckTypeConst.AGAIN:
                    data = {
                        index: i,
                        itemIcon: "",
                        itemDesc: GameText.getText(lang.luck_tip_3),//"再来\n一次",
                        isStar: isStar,
                    }
                    break;
                case LuckTypeConst.NONE:
                    data = {
                        index: i,
                        itemIcon: "",
                        itemDesc: GameText.getText(lang.common_empty),//"空",
                        isStar: isStar,
                    }
                    break;
            }
            // let random = App.RandomUtils.limitInteger(0, this.configManager.dataCnt - 1);
            // random = this.checkRandom(itemDataList, random);
            // // 
            // if (random == curPos) {
            //     data.isStar = true;
            // }
            // itemDataList[random] = data;
            itemDataList.push(data);
        }
        return itemDataList;
    }

    public checkRandom(list, random) {
        if (list[random]) {
            random++;
            if (random > this.configManager.dataCnt - 1) {
                random = 0;
            }
            return this.checkRandom(list, random);
        } else {
            return random;
        }
    }

    //飘金币动画index:0为金币，1是钻石
    playJBAni(index: number) {
        this.luckView.playGetCoinAni(index);
    }

    /** 更新金币 */
    protected updateMoney() {
        if (this.luckView && this.luckView.isShow()) {
            this.luckView.setMoney(this.world.sceneMgr.nowScene.getNowMoney());
        }
    }
    /**更新超级现金 */
    protected updateSuperCash() {
        if (this.luckView && this.luckView.isShow()) {
            this.luckView.setSuperCash(this.world.superCash);
        }
    }

    public getBtnData(): LuckBtnData[] {
        this._model.checkTime();
        let config = this.costConfManager.getAllDatas();
        let saveData = this._model.saveData;

        let btnData: LuckBtnData[] = []
        for (let key in config) {
            let conf = config[key];
            let data = saveData.datas[parseInt(key)]
            let curNum = data.curNum;
            let maxNum = conf.maxNum;
            let time = data.time;
            let cost = conf.costValue;
            switch (parseInt(key)) {
                case 0:
                    var costStr = cost + GameText.getText(lang.common_diamond);//"钻石";
                    break;
                case 1:
                    var costStr = GameText.getText(lang.luck_watch_ad).format(cost);//"(看" + cost + "次广告)"
                    break;
            }
            let temp: LuckBtnData = {
                curNum: curNum,
                maxNum: maxNum,
                cdTime: conf.cdTime,
                lastTime: data.time,
                costStr: costStr,
            }
            btnData.push(temp);
        }

        return btnData;
    }

    public setData() {
        // this.luckView.setData()
        this.luckView.setItemData(this.getItemListData());
        this.luckView.setBtnData(this.getBtnData());
    }


    onLoadView(view: IBaseView) {

    }
    onOpenView(view: IBaseView) {
        if (view.viewId === ViewConst.LuckView) {
            this.luckView.setMoney(this.world.sceneMgr.nowScene.getNowMoney());
            this.luckView.setSuperCash(this.world.superCash);
            this.setData();
        }
    }
}
