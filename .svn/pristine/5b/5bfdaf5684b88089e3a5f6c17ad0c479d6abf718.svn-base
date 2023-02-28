// export UserLevelController

import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { CostType } from "../bag/BagController";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GameUIConst } from "../GameUI/GameUIConst";
import { UserLevelData, UserLevelDataMsr } from "./UserLevelDataMsr";
import { Platform } from "../../platform/Platform";
import { save_prop_Const } from '../../platform/PlatformBase';



export const enum UserLevelConst {
    INIT,
    /**
     * 请求升级
     */
    UPGRADE,
    /**
     * 增加经验值
     */
    ADD_EXP,
    /**
     * 请求获取升级金钱
     */
    GET_MONEY,
}

/** 用户等级管理器 */
export default class UserLevelController extends BaseController {

    protected world: WorldScene = null;
    public static USER_LEVEL_UP = "UserLevelUp";
    protected playInfo: PlayerInfo = null;
    protected confs: UserLevelDataMsr = null;
    protected userLevelView: IUserLevelView = null;
    protected curLevelData: UserLevelData = null;
    public constructor() {
        super();
        App.ViewManager.register(ViewConst.UserLevelUpView, {
            prefabName: "UserLevelUpView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        this.initNotificationEvent();

        this.initModuleEvent();
        // // 
        // this.registerFunc(HappyConst.INIT_HAPPY_TIME, this.onInitHappyTime, this);
        // this.setModel(new HappyModel(this));
    }
    public initGame() {
        this.playInfo = App.GameDataMsr.playerInfo;

        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this.confs = App.ConfigManager.getConfig("UserLevelDataMsr");
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        if (isNaN(this.playInfo.level)) {
            this.playInfo.level = this.playInfo.exp = 0;
        }
        this.curLevelData = this.confs.getData(this.playInfo.level);

    }
    protected initNotificationEvent() {
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 10);
        //
        // notificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.on_UPDATE_MONEY, this);
        // App.NotificationCenter.addListener(NotificationConst.ADD_ASSIST_LV, this.updateAssist, this);
        // App.NotificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.updateMoney, this);

    }

    protected async initModuleEvent() {
        this.registerFunc(UserLevelConst.INIT, this.init, this);
        this.registerFunc(UserLevelConst.UPGRADE, this.onUpgrade, this);
        this.registerFunc(UserLevelConst.ADD_EXP, this.onAddExp, this);
        this.registerFunc(UserLevelConst.GET_MONEY, this.onGetMoney, this);
        // this.registerFunc(HappyConst.COLLECT_HAPPY, this.collectHappy, this);
        // this.registerFunc(HappyConst.ADD_HAPPY, this.addHappyValue, this);
        // this.registerFunc(HappyConst.OPEN_HAPPY, this.openHappyTime, this);

        // this.registerFunc(HappyConst.DOUBLE_HAPPY_MOENY, this.doubleHappyMoney, this);
    }
    protected async onGetMoney(isDouble: number, money: number) {
        if (isDouble) {
            let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.LEVEL_UP_DOUBLE);
            if (result) {//观看广告或者分享成功
                this.world.sceneMgr.nowScene.nowMoneyAdd(money * 2);
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.coin);
            } else {
                return;
            }
        }

        App.NotificationCenter.dispatch(UserLevelController.USER_LEVEL_UP, this.playInfo.level);
        App.ViewManager.close(ViewConst.UserLevelUpView);
    }
    protected onUpgrade() {
        if (this.playInfo.exp >= this.curLevelData.exp) {//升级
            this.playInfo.level++;
            App.ViewManager.open(ViewConst.UserLevelUpView, this.curLevelData.coin, this.playInfo.level);
            this.playInfo.exp -= this.curLevelData.exp;
            this.world.sceneMgr.nowScene.nowMoneyAdd(this.curLevelData.coin);
            this.curLevelData = this.confs.getData(this.playInfo.level);
            this.updateUserLevel();
            this.updateUserExp();

            //向后台发送用户等级
            Platform.instance.recordNode(save_prop_Const.Map_Level, this.world.sceneMgr.nowSceneId, 0, this.playInfo.level % 25);
        }
        else {
            this.playInfo.exp = 0;
            this.playInfo.level++;
            this.world.sceneMgr.nowScene.nowMoneyAdd(this.curLevelData.coin);
            this.curLevelData = this.confs.getData(this.playInfo.level);
            this.updateUserLevel();
            this.updateUserExp();
        }
    }
    protected init(view: IUserLevelView) {
        this.userLevelView = view;
        this.updateUserLevel();
        this.updateUserExp();
        App.NotificationCenter.addListener(NotificationConst.UPDATE_MONEY, this.onUpdateMoney, this);
    }
    protected updateUserExp() {
        this.userLevelView.setUserExp(this.playInfo.exp, this.curLevelData.exp);
    }
    protected updateUserLevel() {
        this.userLevelView.setUserLevel(this.playInfo.level);
    }


    /**
     * 增加经验值
     * @param moneyType 金币类型 
     */
    protected onAddExp(exp: number) {
        this.playInfo.exp += exp;
        this.updateUserExp();
    }
    /**
   * 更新金钱
   * @param moneyType 金币类型 
   * @param money 金钱变化值 
   * @param isAdd 失败减少金钱
   */
    protected onUpdateMoney(moneyType: number, money: MyBigLong | number, isAdd: boolean) {
        if (isAdd) {
            if (money instanceof MyBigLong) {
                this.playInfo.exp += money.value;
            } else {
                this.playInfo.exp += money;
            }
            this.updateUserExp();
        }
    }

}
declare global {
    interface PlayerInfo {
        /**
         * 用户等级
         */
        level?: number;
        /**当前经验值 */
        exp?: number;
        // /**所有的经验值,用户如果没有点击升级的话,经验值会存起来, */
        // allExp?: number;
    }
}