import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import Toast from "../../../core/utils/Toast";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { BagConst } from "../bag/BagConst";
import { BagModel } from "../bag/BagModel";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GuideConst } from "../guide/GuideModel";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import SevenDaysModel from "./SevenDaysModel";
import SevenDaysView from "./SevenDaysView";

export const enum SevenDaysConst {
    //普通领取
    ORDINARY_GAIN,
    //获取是否第一次打开
    GET_IS_FRIST_OPEN,
    //设置是否第一次打开
    SET_IS_FRIST_OPEN,
    //检查是否可以打开七天签到界面
    OPEN_SEVEN_DAYS_VIEW,
}

//七天奖励类型
export const enum SDAwardConst {
    /**金币*/
    MONEY = 0,
    /**宝箱*/
    BOX = 1,
    /**钻石*/
    DIAMOND = 2,
    /**吉祥物皮肤*/
    MASCOT_SKIN = 3,
    /**明星*/
    STAR = 4,
}

export default class SevenDaysController extends BaseController {
    public world: WorldScene;
    protected _bagModel: BagModel = null;
    protected _model: SevenDaysModel = null;
    public sevenDaysView: SevenDaysView;
    //是否是第一次打开七天界面
    protected isFirstOpen: boolean = true;
    public constructor() {
        super();

        App.ViewManager.register(ViewConst.SevenDaysView, {
            prefabName: "SevenDaysView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        this.setModel(new SevenDaysModel(this));
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
    }

    public init() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
        this._model.init();
        this.initModuleEvent();
        this.initNotificationEvent();
        this._bagModel = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        //检查是否有可领取的七天奖励
        this.checkSevenDays();

    }

    /**
    *注册模块消息
   */
    protected initModuleEvent() {
        this.registerFunc(SevenDaysConst.ORDINARY_GAIN, this.ordinaryGain, this);
        this.registerFunc(SevenDaysConst.GET_IS_FRIST_OPEN, this.getIsFristOpen, this);
        this.registerFunc(SevenDaysConst.SET_IS_FRIST_OPEN, this.setIsFristOpen, this);
        this.registerFunc(SevenDaysConst.OPEN_SEVEN_DAYS_VIEW, this.checkSevenDays, this);
    }

    /**注册全局信息*/
    protected initNotificationEvent() {

    }

    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.SevenDaysView:
                this.setData();
                break;

            default:
                break;
        }
    }

    //获取是否是第一次打开
    getIsFristOpen() {
        return this.isFirstOpen;
    }

    //设置是否是第一次打开
    setIsFristOpen(isOpen: boolean) {
        this.isFirstOpen = isOpen;
    }

    //检查是否有可领取的七天奖励
    checkSevenDays() {
        //需要判断功能是否开启
        let result = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SEVEN_DAYS);
        if (!result) {
            return;
        }
        this.isFirstOpen = false;
        let sevenDayData = this._model.getNowSevenDayData();
        let isGuideFinish = this.applyControllerFunc(ControllerConst.Guide, GuideConst.CHECK_IS_GUIDE, 1);
        if (isGuideFinish) {
            if (sevenDayData.isGetAward < 1) {
                App.ViewManager.open(ViewConst.SevenDaysView);
            }
        } else {
            App.NotificationCenter.addListener(NotificationConst.GUIDE_STEP_FINISH, this.onGuideFinish, this);
        }
    }

    protected onGuideFinish() {
         let sevenDayData = this._model.getNowSevenDayData();
        if (sevenDayData.isGetAward < 1) {
            App.ViewManager.open(ViewConst.SevenDaysView);
        }
    }
    //设置物品icon和名字
    setData() {
        let datas: SevenDaysItemData[] = [];
        let sevenDayData = this._model.getNowSevenDayData();
        let tempId = null;
        let managerData = this._model.conf;
        if (sevenDayData.dataId < 7) {
            tempId = 0;
        } else {
            tempId = 7;
        }
        let curDay = sevenDayData.dataId % 7;
        this._model.curDayDataConf = managerData.getData(curDay + tempId);
        for (let i = 0; i < 7; i++) {
            //七天奖励数据
            let data = managerData.getData(i + tempId);
            //物品数据
            let itemData = this._bagModel.itmes[data.itemId];
            let temp: SevenDaysItemData = {
                data: data,
                awardItem: itemData,
                isCurDay: curDay === i
            }
            datas.push(temp);
        }
        this.sevenDaysView.setData(datas, sevenDayData);
    }

    //普通领取
    async ordinaryGain(multiple: number) {
        if (multiple > 1) {
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.SEVEN_DAY);
            // let result = await ADController.getInstance().openAdByTypeAsync(AdType.IDLE);
            if (!result) {
                return;
            }
        }

        let sevenDayData = this._model.getNowSevenDayData();
        //判断是否已经签过        
        if (sevenDayData.isGetAward == 2) {
            //广告领过
            Toast.instance.launch(GameText.getText(lang.seven_days_tip));
            return;
        } else if (sevenDayData.isGetAward == 1) {
            //普通领过
            this._model.setIsGetAward(2);
            multiple -= 1;
        } else if (sevenDayData.isGetAward == 0) {
            //没有领过 
            this._model.setIsGetAward(2);
            this.sevenDaysView.setGetGainIcon();
        }
        App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, this._model.curDayDataConf.itemId, multiple, 3);
        // this.setData();
        App.ViewManager.close(ViewConst.SevenDaysView);
    }

}
