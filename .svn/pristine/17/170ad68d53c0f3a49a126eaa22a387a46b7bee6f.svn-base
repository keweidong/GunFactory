
import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import LayerManager from "../../LayerManager";
import { SceneTag } from "../../scene/SceneConst";
import { BagConst } from "../bag/BagConst";
import { GameUtils } from "../GameMain/GameUtils";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GuideConst } from "../guide/GuideModel";
import GameUIView from "./GameUIView";
const { ccclass, property } = cc._decorator;

@ccclass
export class DebugUI extends BaseView {
    world: WorldScene = null;
    protected static className = "DebugUI";

    public static SHOW_MAP = "SHOW_MAP";

    protected toggleBtn: cc.Toggle = null;
    protected uiNode: cc.Node = null;
    @property(cc.EditBox)
    protected editBox1: cc.EditBox = null;
    @property(cc.Node)
    protected debugNode: cc.Node = null;

    initUI() {
        super.initUI();
        this.uiNode = this.node.getChildByName("uiNode");
        this.toggleBtn = this.node.getChildByName("toggleBtn").getComponent(cc.Toggle);
        this.uiNode.active = false;
        this.node.zIndex = 100;
        this.toggleBtn.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    protected onChange() {
        // if (this.isMove) {
        //     this.isMove = false;
        //     this.toggleBtn.isChecked = !this.toggleBtn.isChecked;
        //     return
        // }
        this.uiNode.active = this.toggleBtn.isChecked;
    }
    protected isMove: boolean = false;

    protected onTouchMove(event: cc.Event.EventTouch) {
        let pos = this.toggleBtn.node.parent.convertToNodeSpaceAR(event.getLocation());
        this.toggleBtn.node.position = pos;
        this.isMove = true;
    }
    protected showFps() {
        cc.debug.setDisplayStats(!cc.debug.isDisplayStats())
    }
    protected async onStopCreateCustomer() {
        cc.dynamicAtlasManager.showDebug(true);
        // this.world.sceneMgr.nowScene.roleMsr.waitCreateCusCnt = -9999;

        // let token = "PU9eqEZmYPcqUlKUndtLHayv93D2BDwcug56epiN7b4maYP93Y2BlE8fdsLcN4txjfOu5EXzN70wG5Ee1msoj7RTcTRb9dsf9sTt0dIaakame1C/MiGTEE0kgc1p12TDSOu8fKdhW8JhqCf4ZGGBi3cD5TP6dODa4ulit15fdBg=";
        // let requestData = await App.Http.requestAsync(
        //     App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/get_user_info.php",
        //     { token: token }
        // );
        // CC_DEBUG && Log.trace("requestData:", requestData);
        // let userInfo: {
        //     code: number,
        //     photo: string,
        //     free: string,
        //     playerid: string,
        //     time: number,
        //     timestamp: number,
        //     is_saved: string,
        //     nick: string,
        //     file: string,
        //     msg: string,
        //     account: string;
        // } = JSON.parse(requestData);
        // App.SaveManage.clear();
        // App.SaveManage.clearAllItem();
        // let data = JSON.parse(userInfo.file);
        // CC_DEBUG && Log.trace("data:", data);
        // App.SaveManage.syncByData(data);
        // App.GameDataMsr.playerInfo = null;
        // App.SaveManage.init();
        // App.GameDataMsr.init();
        // App.GameDataMsr.loadData();
        // let playerInfo = App.GameDataMsr.playerInfo;
        // playerInfo.id = userInfo.playerid;
        // playerInfo.head = userInfo.photo;
        // playerInfo.nickName = userInfo.nick;
        // playerInfo.token = token;
        // playerInfo.timestamp = userInfo.timestamp;
        // App.ControllerManager.clearAllModules([ControllerConst.AD, ControllerConst.Loading]);
        // App.TimerManager.reset();
        // GameUtils.TimerManager.reset();
        // //派发注销登陆的消息
        // App.NotificationCenter.dispatch(NotificationConst.LOGOUT);
        // LayerManager.reset();
        // App.SceneManager.runScene(SceneTag.GAME);
    }

    protected showMap() {
        // cc.director.getScheduler().setTimeScale(10);
        // GameUtils.Scheduler.setTimeScale(10)
        App.NotificationCenter.dispatch(DebugUI.SHOW_MAP)
    }

    protected onChangeIsDrawPhy() {
    }

    /**
     * 清理存档
     */
    protected clearData() {
        // App.SaveManage.clear();
        // App.SaveManage.clearAllItem();

        let token = App.GameDataMsr.playerInfo.token;
        let loginTime = App.GameDataMsr.playerInfo.timestamp
        App.SaveManage.clear();
        App.SaveManage.clearAllItem();
       
        // App.GameDataMsr.init();
        App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/save_data.php", {
            token: token,
            file: "",
            loginTime: loginTime
        });
        App.GameDataMsr.playerInfo.token = null;
    }
    protected addMoney(event: cc.Event) {
        let box = (<cc.Node>event.target).getComponentInChildren(cc.EditBox);

        let str = box.string;
        if (str) {
            const decimal = [
                "", "K", "M", "B", "T",
                "aa", "ab", "ac", "ad", "ae",
                "af", "ag", "ah", "ai", "aj",
                "ak", "al", "am", "an", "ao",
                "ap", "aq", "ar", "as", "at",
                "au", "av", "aw", "ax", "ay",
                "az",
                "ba", "bb", "bc", "bd", "be",
                "bf", "bg", "bh", "bi", "bj",
                "bk", "bl", "bm", "bn", "bo",
                "bp", "bq", "br", "bs", "bt",
                "bu", "bv", "bw", "bx", "by",
                "bz",
                "ca", "cb", "cc", "cd", "ce",
                "cf", "cg", "ch", "ci", "cj",
                "ck", "cl", "cm", "cn", "co",
                "cp", "cq", "cr", "cs", "ct",
                "cu", "cv", "cw", "cx", "cy",
                "cz",
            ];
            let reg = /(-?)(\d+)([a-z]{2}|M|K|T|B)?/;
            let match = str.match(reg);
            cc.log("增加金钱:", str, match)
            if (match) {
                let cnt = decimal.indexOf(match[3]);
                if (cnt === -1) {
                    // let addMoney = parseInt(match[2]);
                    var temp = MyBigLong.tempNum.init(parseInt(match[2]), 0);
                } else {
                    var temp = MyBigLong.tempNum.init(parseInt(match[2]), cnt * 3);
                }
                cc.log("temp:", temp.toString())
                if (match[1]) {
                    if (temp.cmp(this.world.sceneMgr.nowScene.getNowMoney()) >= 0) {
                        this.world.sceneMgr.nowScene.getNowMoney().clear();
                        App.NotificationCenter.dispatch(NotificationConst.UPDATE_MONEY, this.world.sceneMgr.nowScene.conf.moneyType, temp, false);
                    } else {
                        this.world.sceneMgr.nowScene.nowMoneySub(temp);
                        // App.NotificationCenter.dispatch(NotificationConst.UPDATE_MONEY, this.world.sceneMgr.nowScene.conf.moneyType, temp, false);
                    }
                } else {
                    this.world.sceneMgr.nowScene.nowMoneyAdd(temp);
                    // App.NotificationCenter.dispatch(NotificationConst.UPDATE_MONEY, this.world.sceneMgr.nowScene.conf.moneyType, temp, true);
                }
                //     App.NotificationCenter.dispatch(NotificationConst.UPDATE_MONEY, mine.MoneyType.GOLD, temp, true)
                // }

            }
        }

    }




    protected addDiamond(event: cc.Event) {
        let box = (<cc.Node>event.target).getComponentInChildren(cc.EditBox);
        let money = parseInt(box.string);
        if (!isNaN(money)) {
            this.world.superCash += money;
            if (this.world.superCash < 0) {
                this.world.superCash = 0;
            }
            App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, money);
            //     GameController.getInstance().playerInfoProxy.changeDiamond(money);
        }
    }

    protected addItem(event: cc.Event) {
        let box1 = (<cc.Node>event.target).getChildByName("EditBox1").getComponent(cc.EditBox);
        let box2 = (<cc.Node>event.target).getChildByName("EditBox2").getComponent(cc.EditBox);
        let id = parseInt(box1.string);
        let cnt = parseInt(box2.string);
        App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, id, cnt);
        // App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, id, cnt);
    }
    protected useItem(event: cc.Event) {
        let box1 = (<cc.Node>event.target).getChildByName("EditBox1").getComponent(cc.EditBox);
        let box2 = (<cc.Node>event.target).getChildByName("EditBox2").getComponent(cc.EditBox);
        let id = parseInt(box1.string);
        let cnt = parseInt(box2.string);
        App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, id, cnt);
    }

    /**跳过新手 */
    protected Skiptheboot() {
        // App.SaveManage.saveAll();
        // cc.dynamicAtlasManager.showDebug(true);

        // Platform.instance.saveData();
        if (cc.director.isPaused()) {
            cc.director.resume();
        } else {
            cc.director.pause();

        }
    }
    /**
     * 录制节点触摸
     */
    startRecordNodeTouch() {
        this.toggleBtn.isChecked = !this.toggleBtn.isChecked;
        this.onChange()
        App.ControllerManager.applyFunc(ControllerConst.Guide, GuideConst.START_RECORD);
    }
    /**
     * 停止节点触摸录制
     */
    stopRecordNodeTouch() {
        this.toggleBtn.isChecked = !this.toggleBtn.isChecked;
        this.onChange()
        App.ControllerManager.applyFunc(ControllerConst.Guide, GuideConst.STOP_RECORD);
    }
    /**
   * 回放录制
   */
    playRecordNodeTouch(sender, autorun) {
        this.toggleBtn.isChecked = !this.toggleBtn.isChecked;
        this.onChange()
        App.ControllerManager.applyFunc(ControllerConst.Guide, GuideConst.PLAY_RECORD);
    }
    protected onTouchStartGuideBtn() {
        let box = this.editBox1;
        let str = box.string;
        App.ControllerManager.applyFunc(ControllerConst.Guide, GuideConst.OPEN_GUIDE, str ? parseInt(str) : null);
        this.toggleBtn.isChecked = !this.toggleBtn.isChecked;
        this.onChange()
    }
    setAutorun() {
        App.ControllerManager.applyFunc(ControllerConst.Guide, GuideConst.SET_IS_AUTO);
    }

    //隐藏debug按钮
    hideDebugBtn() {
        this.debugNode.opacity = 0;

    }
    //显示debug按钮
    showDebugBtn() {
        this.debugNode.opacity = 100;

    }
    //升级 要点击一次游戏内的升级按钮才能刷新等级
    LevelUp() {
        this.world.playerDto.level++;
    }
}   