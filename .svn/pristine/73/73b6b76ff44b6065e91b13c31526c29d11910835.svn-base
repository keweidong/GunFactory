import App from '../../../core/App';
import BaseController from '../../../core/mvc/controller/BaseController';
import { IBaseView } from '../../../core/mvc/view/IBaseView';
import { ControllerConst } from '../../consts/ControllerConst';
import { GameNotificationConst, NotificationConst } from '../../consts/NotificationConst';
import { ViewConst } from '../../consts/ViewConst';
import LayerManager from '../../LayerManager';
import { GameConst } from '../GameMain/GameConst';
import { StarDataMsr } from '../GameMain/object/scene/config/StarDataMsr';
import WorldScene from '../GameMain/object/scene/WorldScene';
import { GameUIConst, NewsTypeConst } from '../GameUI/GameUIConst';
import { OpenConst, OpenTypeConst } from '../SystemOpen/SystemOpenConst';
import { StartEventConst } from './StartEventConst';
import StartShowModel from './StartShowModel';
import StartShowView from './StartShowView';
import { ADController, AdType } from '../AD/ADController';
import { AdEvent } from '../AD/ADManageBase';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartEventController extends BaseController {

    public worldScene: WorldScene;
    public _model: StartShowModel = null;
    protected friendCircleView: StartShowView = null;

    startEventConf: StartEventConf = null;

    public starid: number;

    /**明星事件进行中 */
    starEventIsShowing: number = -1;

    public constructor() {
        super();
        App.ViewManager.register(ViewConst.StartShowView, {
            prefabName: "StartShowView",
            parent: LayerManager.UI_Popup,
            controller: this
        });
        this.setModel(new StartShowModel(this));

        this.startEventConf = App.ConfigManager.gameConf.game.startEventConf;
        let notificationCenter = App.NotificationCenter;

        notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 100);

    }

    public initGame() {
        this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);

        // this.friendCircleDataManager = App.ConfigManager.friendCircleDataManager;
        // this.friendEventDataManager = App.ConfigManager.friendEventDataManager;
        // this.gametimeConf = App.ConfigManager.gameConf.game.gametime;
        this._model.init();
        this.initModuleEvent();
        this.initNotificationEvent();

        this.starteventIsOpen();
    }

    initModuleEvent() {
        this.registerFunc(StartEventConst.sartStartEvent, this.starCountDown, this);
        this.registerFunc(StartEventConst.START_STATA_EVENT, this.startEventtime, this);
        this.registerFunc(StartEventConst.Hide_The_StartEvent, this.hideStarEvent, this);
        this.registerFunc(StartEventConst.OpenView, this.openStartShowView, this);
        this.registerFunc(StartEventConst.RandCreateStar, this.createStar, this);
    }

    initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(GameNotificationConst.DESTORY_STAR, this.satrOver, this);
    }
    hideStarEvent() {
        this.starEventIsShowing = -1;
        this.startEventtime();
    }
    /**明星走了
     * 明星销毁,开始明星事件计时
     */
    satrOver() {
        if (this.worldScene.sceneMgr.nowScene.roleMsr.star) {
            return;
        }
        if (!this._model.isStarCome) {
            App.NotificationCenter.dispatch(NotificationConst.TRIGGER_STAR_FRIEND, this.starid);

        }
        this._model.isStarCome = true;
        this.starEventIsShowing = -1;
        this.startEventtime();
    }
    /**打开明星界面 */
    openStartShowView() {

        let data: { id: number, isUnlock: boolean }[] = [];
        let starDataConf: StarDataMsr = App.ConfigManager.getConfig("StarDataMsr");
        let starConf = starDataConf.getAllDatas()
        for (let index in starConf) {
            if (!this.worldScene.sceneMgr.allOpenScene[starDataConf.getData(parseInt(index)).scenceId]) {
                data.push({
                    id: parseInt(index),
                    isUnlock: false,
                })
                continue;
            }
            // this.worldScene.sceneMgr.allOpenScene[index].guestMsr.attrObj.level
            Log.trace(">>>>>", this.worldScene.sceneMgr.allOpenScene[starDataConf.getData(parseInt(index)).scenceId].guestMsr.attrObj.level)
            // if (this.worldScene.sceneMgr.getGuestLevel(starDataConf.getData(parseInt(index)).scenceId)[0] > starDataConf.getData(parseInt(index)).unlockguest) {
            if (this.worldScene.sceneMgr.allOpenScene[starDataConf.getData(parseInt(index)).scenceId].guestMsr.attrObj.level >= starDataConf.getData(parseInt(index)).unlockguest) {
                data.push({
                    id: parseInt(index),
                    isUnlock: true,
                })
                continue;
            }
            data.push({
                id: parseInt(index),
                isUnlock: false,
            })
        }
        App.ViewManager.open(ViewConst.StartShowView, this._model.starDataMsr, data);

        // let numlist: number[] = [];
        // for (let key in this._model.saveData.starSaveDataModle) {
        //     if (this._model.saveData.starSaveDataModle[key].isUnlock) {
        //         numlist.push(parseInt(key));
        //     }

        // }
        // let stareventData = this._model.starDataMsr;
        // // let randId=App.RandomUtils.randomArray(0,stareventData.dataCnt)
        // let randId = Math.floor(Math.random() * (stareventData.dataCnt - 0)) + 0;
        // this.starid = randId;
        // App.ViewManager.open(ViewConst.StartShowView, this._model.starDataMsr, numlist, randId);
    }

    /**明星功能是否开启,开启则开始计时,未开启则开始监听功能开放 */
    starteventIsOpen() {
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.STARTEVENT);
        if (isOpen) {
            this.startIsOpen(OpenTypeConst.STARTEVENT, isOpen);
        } else {
            App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.startIsOpen, this);
        }
    }
    //监听顾客事件功能开放
    startIsOpen(index: number, isOpen: boolean) {
        if (index == OpenTypeConst.STARTEVENT) {
            if (isOpen) {
                //功能开放啦,开始计时
                this.startEventtime();
            }
        }
    }

    startunlockTime: number;
    startunlockbool: boolean = false;

    /**开始明星事件 */
    startEventtime() {
        let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.STARTEVENT);
        if (isOpen) {
            if (CC_PREVIEW) {
                this.startunlockTime = App.DateUtils.Now() + 1000;
            } else {
                this.startunlockTime = App.DateUtils.Now() + App.ConfigManager.gameConf.game.startEventConf.stareventtime;
            }
            this.startunlockbool = true;
        }
    }

    //开始倒计时
    protected starCountDown() {
        App.TimerManager.doTimer(10000, 0, this.refresh, this);
        this.startEventtime();
    }
    //刷新倒计时
    protected refresh() {
        let now = App.DateUtils.Now();
        // Log.trace("-----------", now >= this.gukeunlockTime);
        if (now >= this.startunlockTime && this.startunlockbool) {
            let rom = Math.random();
            // cc.log("********顾客事件出现概率**", rom);
            if (this.startEventConf.randnumber >= rom) {
                this.ranageStartEvent();
            }
            else {
                this.startEventtime();
            }
        }
    }
    /**随机生成明星事件 */
    ranageStartEvent() {
        if (this.starEventIsShowing >= 0) {
            return;
        }

        if (!ADController.getInstance().adIsHas(AdType.Invite_Star)) {
            App.TimerManager.remove(this.refresh, this);
            Log.trace("明星次数已用完");
            return;
        }
        this.startunlockbool = false;
        this.starEventIsShowing = 1;
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Start, true)
    }
    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.StartShowView:
                // this.openDialogueView();


                break;
            case ViewConst.NewsView:
                // this.starCountDown();
                break;

        }
    }
    createStar(starId?: number) {
        // let randId = Math.floor(Math.random() * (stareventData.dataCnt - 0)) + 0;
        if (starId) {
            this.starid = starId
        }
        //存储已解锁的明星
        if (!this._model.saveData.starSaveDataModle[this.starid]) {
            this._model.addStartData(this.starid, true);
        }
        //场景管理器创建一个明星

        this.worldScene.sceneMgr.nowScene.roleMsr.createStar(this.starid, true);
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.TimerManager.doTimer(5000, 1, () => { App.ViewManager.open(ViewConst.ShotView, false); }, this)
        }
    }
}
