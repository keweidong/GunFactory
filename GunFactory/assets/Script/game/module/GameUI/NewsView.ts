import BaseView from "../../../core/mvc/view/BaseView";
import { UI } from "../../../core/utils/Image";
import { ADController, AdType } from "../AD/ADController";
import { ControllerConst } from "../../consts/ControllerConst";
import { FriendCircleConst } from "../FriendCircle/FriendCircleConst";
import { AdData } from "../../config/AdDataManager";
import { AdState } from "../AD/ADManageBase";
import App from '../../../core/App';
import { NewsTypeConst } from "./GameUIConst";
import { PlotEventConst } from "../event/PlotEventConst";
import GameController from "../GameMain/GameController";
import { GameNotificationConst } from "../../consts/NotificationConst";
import { GameConst } from "../GameMain/GameConst";
import StartEventController from '../StartEvent/StartEventController';
import { StartEventConst } from "../StartEvent/StartEventConst";
import { GameText } from "../../../core/lang/GameText";

const { ccclass, property, executeInEditMode } = cc._decorator;
/** 信息界面 */
@ccclass
export default class NewsView extends BaseView implements IShareAndAd {
    /** 所有节点的父节点 */
    @property(cc.Node)
    pNode: cc.Node = null;

    /** 节点列表 */
    @property([cc.Node])
    nodeList: cc.Node[] = [];

    /** 头像列表 */
    @property([UI.Image])
    iconList: UI.Image[] = [];

    /** 文字 */
    @property([cc.Label])
    textList: cc.Label[] = [];

    /**明星事件倒计时背景光圈 */
    @property(cc.Sprite)
    starTimedown: cc.Sprite = null;

    /**喇叭 */
    @property(cc.Node)
    laba: cc.Node = null;

    /**喇叭的三点 */
    @property(cc.Node)
    labaSandian: cc.Node = null;

    timeDownCount: number = null;

    public isShowContent: boolean = false;

    @property(cc.Animation)
    ani_laba: cc.Animation = null;

    initUI() {
        super.initUI();
        for (let i = 0; i < this.nodeList.length; i++) {
            let node = this.nodeList[i];
            node.active = false;
        }
        this.setViewVisible(true);
        this.setIsAutoScale(true);

        // ADController.getInstance().registerItem(AdType.CAT_EVENT, this);
    }


    public setIsAutoScale(value: boolean) {
        this.node.scale = 1;
        for (let i = 0; i < this.iconList.length; i++) {
            let icon = this.iconList[i];
            if (value) {
                icon.node.on(cc.Node.EventType.SIZE_CHANGED, this.onFurnitureImgSizeChange, this);
                this.onFurnitureImgSizeChange();
            } else {
                icon.node.off(cc.Node.EventType.SIZE_CHANGED, this.onFurnitureImgSizeChange, this);
            }

        }
    }
    protected onFurnitureImgSizeChange() {
        for (let i = 0; i < this.iconList.length; i++) {
            let node = this.iconList[i].node;
            if (node.width > node.height) {
                var scale = 60 / node.width;
            } else {
                var scale = 60 / node.height;
            }
            node.scale = scale
        }
    }
    /**
     * 设置消息数据
     * @param type 消息类型 NewsTypeConst
     * @param isShow 是否显示
     * @param title 标题内容
     * @param url icon路径
     */
    setData(type: NewsTypeConst, isShow: boolean, title?: string, url?: string) {
        let node = this.nodeList[type];
        if (!node) {
            return;
        }

        let icon = this.iconList[type]
        if (url && icon) {
            icon.source = url;
        }

        let lab = this.textList[type];
        if (title) {
            // lab.string = App.StringUtil.CutStr(title, 10, "..");
            lab.string = title;
            if (type == NewsTypeConst.Friend) {
                lab.string = GameText.getText(lang.friend_circle_new_message);// "交友圈有消息啦"

            }
        }

        if (isShow) {
            node.active = true;
            this.playShowAni(node, type);
        }
        else {
            this.playHideAni(node, type)
        }
    }
    /**设置明星事件 */
    public setStart(type: NewsTypeConst, isShow: boolean) {
        let node = this.nodeList[type];
        if (isShow) {
            node.active = true;
            this.starTimedown.fillRange = 1;
            App.TimerManager.doTimer(App.ConfigManager.gameConf.game.startEventConf.hideStarTime, 1, this.hideThisStar, this);
            App.TimerManager.doTimer(200, App.ConfigManager.gameConf.game.startEventConf.hideStarTime / 200, this.playAniTimeDown, this)
            // this.playShowAni(node, type);
            this.isPlay[type] = true;
            if (this.tw[type]) {
                this.tw[type].stop();
            }
            cc.tween(node)
                .to(0.4, { x: 210 })
                .call(() => { this.isPlay[type] = false; })
                .start();
            this.ani_laba.play("mxll");

        }
        else {
            // this.playHideAni(node, type)
            this.isPlay[type] = true;
            this.tw[type] = cc.tween(node)
                .to(0.4, { x: -210 })
                .call(() => {
                    this.isPlay[type] = false;
                })
                .start();
            this.ani_laba.stop("mxll");
        }
    }

    public playAniTimeDown() {
        let num: number = this.timeDownCount / (App.ConfigManager.gameConf.game.startEventConf.hideStarTime / 1000)
        this.starTimedown.fillRange = num;
        // let action1 = cc.scaleTo(0.2, 1.1);
        // let action2 = cc.scaleTo(0.2, 1);
        // var seq = cc.repeatForever(
        //     cc.sequence(
        //         action1,
        //         action2
        //     ));
        // this.laba.runAction(seq);
        // this.labaSandian.runAction(seq);
        if (this.timeDownCount > 0) {
            this.timeDownCount -= 0.2;
        }
    }


    isPlay: boolean[] = [];
    tw: cc.Tween<Node>[] = [];
    playShowAni(node, type) {
        if (type == 1) {
            App.TimerManager.doTimer(10000, 1, this.hidethisguke, this)
        }
        this.isPlay[type] = true;
        if (this.tw[type]) {
            this.tw[type].stop();
        }
        cc.tween(node)
            .to(0.4, { x: -260 })
            .call(() => { this.isPlay[type] = false; })
            .start();
    }

    playHideAni(node, type) {
        this.isPlay[type] = true;
        this.tw[type] = cc.tween(node)
            .to(0.4, { x: 0 })
            .call(() => {
                this.isPlay[type] = false;
            })
            .start();
    }
    hideThisStar() {
        this.setStart(NewsTypeConst.Start, false);
        this.timeDownCount = App.ConfigManager.gameConf.game.startEventConf.hideStarTime / 1000;

        this.starTimedown.fillRange = 1;
        App.ControllerManager.applyFunc(ControllerConst.Start, StartEventConst.Hide_The_StartEvent);
        App.TimerManager.remove(this.hideThisStar, this);
        App.TimerManager.remove(this.playAniTimeDown, this);
    }
    //时间到了,隐藏顾客事件聊天提示
    public hidethisguke() {
        this.setData(NewsTypeConst.Chat, false);
        //传出消息,开始新的顾客事件计时
        App.ControllerManager.applyFunc(ControllerConst.PlotEvent, PlotEventConst.Hide_The_GuKeEvent);
        App.TimerManager.remove(this.hidethisguke, this);
    }
    /** 显示/隐藏界面内容 */
    public setViewVisible(isShow: boolean) {
        this.isShowContent = isShow;
        if (!isShow) {
            cc.tween(this.pNode.getComponent(cc.Widget))
                .to(0.3, { right: -260 })
                .call(() => {
                    if (!this.isShowContent) this.node.active = false
                })
                .start();
        }
        else {
            this.node.active = true
            cc.tween(this.pNode.getComponent(cc.Widget))
                .to(0.3, { right: 0 })
                .start();
        }
    }

    onTouchBtn(event, customEventData) {
        if (this.isPlay[customEventData]) {
            return;
        }
        // if (parseInt(customEventData) == NewsTypeConst.Friend) {
        //     App.ControllerManager.applyFunc(ControllerConst.FriendCircle, FriendCircleConst.OpenView);
        // }
        // else if (parseInt(customEventData) == NewsTypeConst.Chat) {
        //     // App.ControllerManager.applyFunc(ControllerConst.FriendCircle, FriendCircleConst.OpenView);
        //     App.TimerManager.remove(this.Hidethisguke, this);
        //     App.ControllerManager.applyFunc(ControllerConst.PlotEvent, PlotEventConst.NOCHAT);
        // }
        // else if (parseInt(customEventData) == NewsTypeConst.Event) {
        //     App.ControllerManager.applyFunc(ControllerConst.FriendCircle, FriendCircleConst.OpenView);

        //     // App.ControllerManager.applyFunc(ControllerConst.PlotEvent, PlotEventConst.OPEN_CAT_EVENT);
        // }
        switch (parseInt(customEventData)) {
            case NewsTypeConst.Friend:
                App.ControllerManager.applyFunc(ControllerConst.FriendCircle, FriendCircleConst.OpenView);

                break;

            case NewsTypeConst.Chat:
                App.TimerManager.remove(this.hidethisguke, this);
                App.ControllerManager.applyFunc(ControllerConst.PlotEvent, PlotEventConst.NOCHAT);
                break;
            case NewsTypeConst.Event:
                // App.ControllerManager.applyFunc(ControllerConst.FriendCircle, FriendCircleConst.OpenView);
                break;
            case NewsTypeConst.Start:
                App.ControllerManager.applyFunc(ControllerConst.Start, StartEventConst.OpenView);
                this.setStart(NewsTypeConst.Start, false);
                App.TimerManager.remove(this.hideThisStar, this);
                App.TimerManager.remove(this.playAniTimeDown, this);
                this.timeDownCount = App.ConfigManager.gameConf.game.startEventConf.hideStarTime / 1000;
                break;
            default:
                break;
        }
    }

    public open() {
        super.open();
        this.timeDownCount = App.ConfigManager.gameConf.game.startEventConf.hideStarTime / 1000;
    }

    /**
    * 切换成分享状态
    */
    toShare(type: AdType, conf: AdData, data: any) {

    }

    /**
     * 切换成广告状态
     */
    toAd(type: AdType, conf: AdData, data: any, adState: AdState) {

    }
    /**
     * 切换成支付状态
     */
    toPay(type: AdType, conf: AdData, data: any) {
    }
    /**
     * 切换成用超级现金购买状态
     */
    toSupercash(type: AdType, conf: AdData, data: any) {
    }
    /**
     * 免费赠送状态
     */
    toFree(type: AdType, conf: AdData, data: any) {

    }
    /**
     * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
     */
    toFail(type: AdType, conf: AdData, data: any, adState?: any) {


    }

}