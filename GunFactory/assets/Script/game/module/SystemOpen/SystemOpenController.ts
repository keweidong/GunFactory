import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameNotificationConst, NotificationConst } from "../../consts/NotificationConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import UserLevelController from "../UserLevel/UserLevelController";
import { SystemData } from "./SystemDataManager";
import { OpenConst } from "./SystemOpenConst";
import SystemDataManager from './SystemDataManager';


export default class SystemOpenController extends BaseController {
    public worldScene: WorldScene;


    private _systemGuideIndex: number;
    private _isShowGuide: boolean;
    protected playerData: PlayerInfo = null;
    /**等待开放的功能列表 */
    protected _waitOpenList: SystemData[] = [];
    protected systemDataManager: SystemDataManager = null;
    // protected gameView: mine.GameView;
    // protected proxy: GuideProxy;
    public constructor() {
        super();

        this.initSelfEvent();
        App.NotificationCenter.addListener(GameNotificationConst.C2G_UNLOCK_SHAFT, this.unLockShaft, this, 200);
        App.NotificationCenter.addListener(NotificationConst.CHECK_ALL_SYS_OPEN, this.checkAllSys, this);
        App.NotificationCenter.addListener(NotificationConst.CHECK_SYS_OPEN, this.checkSys, this);
        App.NotificationCenter.addListener(UserLevelController.USER_LEVEL_UP, this.on_G2C_UPGRADE, this, 200);
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 20);
        // App.NotificationCenter.addListener(NotificationConst.GET_FIGHT_AWARD, this.onGetFightAward, this, 10);
        // App.NotificationCenter.addListener(GameNotificationConst.G2C_CHONGSHENG_NONGCHANG, this.onRebirth, this, 10);
    }
    public initGame() {
        this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this.playerData = App.GameDataMsr.playerInfo;
        let configs = App.ConfigManager.getConfig("SystemDataManager").getAllDatas();
        for (let key in configs) {//找到未解锁功能列表
            let config = configs[key];
            let isOpen = this.checkSystemOpen(config.index, true);
            if (!isOpen) {
                this._waitOpenList.push(config);
            }
        }
    }
    protected initSelfEvent() {
        this.registerFunc(OpenConst.CHCEK_OPEN, this.checkSystemOpen, this);
        // this.registerFunc(openConst.CHNAGER_OPEN_STATE, this.setOpenState, this);
        // this.registerFunc(openConst.GET_OPEN_STATE, this.getOpenState, this);
        // this.registerFunc(openConst.CHCEK_SYSTEM_GUIDE, this.checkSystemGuide, this);
        // this.registerFunc(openConst.GET_OPEN_CONDITION, this.getSystemOpenCondition, this);
    }

    public checkSystemGuide() {
        // this._isShowGuide = true;
        // let index = this.getSystemGuideIndex()
        // if (index >= 0) {
        //     App.ViewManager.open(ViewConst.SystemGuideLayer, index);
        // }
    }

    /**
     * 解锁了新摊位
     * @param cellIndex 摊位id
     */
    public unLockShaft(cellIndex: number) {
        this.checkAllSys(true);
    }

    public on_G2C_UPGRADE() {
        this.checkAllSys(true);
    }

    // /**
    //  * 获取当前解锁到的层数
    //  */
    // public getUnlockCnt(kcId: number = 1): number {
    //     let KCMgr = this.worldScene.sceneMgr;
    //     let cell = KCMgr.getMaxCell(kcId);
    //     return cell;
    // }

    /**
     * 获取功能开启条件
     */
    public getSystemOpenCondition(index: number) {
        let config = App.ConfigManager.getConfig("SystemDataManager").getData(index);
        if (!config) {
            return;
        }
        let starCnt = config.starCnt;
        return starCnt;
    }

    /**
     * 检测是否开放功能
     * @ index 功能index
     * @ check 是否完全匹配检测 
     */
    public checkSystemOpen(index: number, isWhole?: boolean) {
        if (!this.worldScene) {
            return;
        }
        if (!this.systemDataManager) {
            this.systemDataManager = App.ConfigManager.getConfig("SystemDataManager")
        }
        let config = this.systemDataManager.getData(index);
        if (!config) {
            return;
        }
        let starCnt = config.starCnt;
        if (!starCnt) {
            return;
        }

        // let curCnt: number[] = [];
        // let cnt: number[] = [];
        if (starCnt && starCnt.indexOf("c") > -1) {
            starCnt = starCnt.substring(1);
            let unlockUserLevel = parseInt(starCnt);
            if (this.playerData.level >= unlockUserLevel) {
                return true;
            }
            // let arr1 = starCnt.split("_");
            // for (let i = 0; i < arr1.length; i++) {
            //     cnt.push(parseInt(arr1[i]))
            // }
            // // let kcId = this.worldScene.KCMgr.nowFarmId;
            // let kcIsOpen = this.worldScene.sceneMgr.getIsOpen(cnt[0]);
            // let lv = -1;
            // if (kcIsOpen) {
            //     let kcZone = this.worldScene.sceneMgr.getKuangChangWorkZone(cnt[0]);
            //     let cellIndex = cnt[1];

            //     if (cellIndex == -1) {
            //         let mineCellList = kcZone.kuangcengMgr.mineCellList
            //         let len = mineCellList.length;
            //         for (let i = 0; i < len; i++) {
            //             let cell = kcZone.kuangcengMgr.getFieldById(i);
            //             if (cell) {
            //                 lv = Math.max(lv, cell.attrObj.level);
            //             }
            //         }
            //     }
            //     else {
            //         let cell = kcZone.kuangcengMgr.getFieldById(cnt[1]);
            //         if (!cell || !cell.attrObj) {
            //             CC_DEBUG && Log.trace('WTF>>>>>>>>>>', cnt[1]);
            //             return false;
            //         }
            //         lv = cell.attrObj.level || 0;
            //     }
            // }

            // if (isWhole && lv == cnt[2] || 0) {
            //     return true;
            // } else if (lv >= cnt[2] || 0) {
            //     return true;
            // }
            return false;
        }
        return false;
    }


    public checkAllSys(isWhole: boolean = false) {
        for (let i = this._waitOpenList.length - 1; i >= 0; i--) {
            const config = this._waitOpenList[i];
            let isOpen = this.checkSystemOpen(config.index, isWhole);
            if (isOpen) {
                this._waitOpenList.splice(i, 1);
                if (config.isPlayAni && isWhole) {
                    App.NotificationCenter.dispatch(NotificationConst.SYS_OPEN, config.index, isOpen, true);

                } else {
                    App.NotificationCenter.dispatch(NotificationConst.SYS_OPEN, config.index, isOpen);

                }
            }
        }
    }

    public checkSys(index: number, isWhole: boolean = false) {
        let isOpen = this.checkSystemOpen(index, isWhole);
        if (isOpen == null) {
            return;
        }
        App.NotificationCenter.dispatch(NotificationConst.SYS_OPEN, index, isOpen);
    }

}