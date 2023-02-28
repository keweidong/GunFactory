import BaseView from "../../../core/mvc/view/BaseView";
import { AdType, ADController, AdShareStatus } from "../AD/ADController";
import { AdData } from "../../config/AdDataManager";
import AssistItem from "../GameUI/AssistItem";
import Reslist from "../GameMain/Reslist";
import App from "../../../core/App";
import GameScene from "../../scene/GameScene";
import FoodItem from "./LuckItem";
import { LuckDataManager, LuckCostDataManager, LuckData } from "./LuckDataManager";
import { UI } from "../../../core/utils/Image";
import { LuckConst, LuckPatConst } from "./LuckConst";
import Toast from "../../../core/utils/Toast";
import { AdState } from "../AD/ADManageBase";
import LayerManager from "../../LayerManager";
import EffectUtils from "../../../core/utils/EffectUtils";
import { ControllerConst } from "../../consts/ControllerConst";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import { ShopConst } from "../Shop/ShopController";
import { ShopViewConst } from "../Shop/ShopView";
import { ViewConst } from "../../consts/ViewConst";
import { GameText } from "../../../core/lang/GameText";




const { ccclass, property, executeInEditMode } = cc._decorator;

/** 幸运抽奖界面 */
@ccclass
export default class LuckView extends BaseView {
    /** 钻石抽奖 */
    @property(cc.Button)
    protected diaBtn: cc.Button = null;

    /** 广告抽奖 */
    @property(cc.Button)
    protected adBtn: cc.Button = null;

    /** 起点精灵 */
    @property(cc.Sprite)
    protected starSp: cc.Sprite = null;

    /** 抽奖面板 */
    @property(cc.Sprite)
    protected itemPanel: cc.Sprite = null;

    @property(cc.Node)
    protected content: cc.Node = null;

    /** 点数 文本 */
    @property(cc.Label)
    protected pointLab: cc.Label = null;

    /** 骰子 */
    @property(UI.Image)
    protected dice: UI.Image = null;

    @property(UI.Image)
    protected adDice: UI.Image = null;

    protected ani: cc.Animation = null;
    /** 物品列表 */
    protected itemList: cc.Node[] = null;
    /** 按钮列表 */
    protected btnList: cc.Button[] = [];

    /** 奖励数据 */
    protected itemDataList: LuckItemData[];
    /** 按钮数据 */
    protected btnDataList: LuckBtnData[];
    /** 当前走到的格子 */
    protected curItem: cc.Node = null;
    /** 当前格子index */
    protected curIndex: number = 0;
    /** 是否处于行走状态中 */
    protected isMove: boolean = false;
    /** 当前点数 */
    protected curNum: number = null;
    /** 金币栏 */
    @property(cc.Label)
    protected moneyLab: cc.Label = null;

    /** 钻石栏 */
    @property(cc.Label)
    protected diamondLab: cc.Label = null;
    public moneyBar: cc.Node = null;
    public zuBar: cc.Node = null;
    initUI() {
        super.initUI();
        this.itemList = this.itemPanel.node.children;
        this.btnList.push(this.diaBtn);
        this.btnList.push(this.adBtn);
        this.ani = this.getComponent(cc.Animation);
        this.ani.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }

    open() {
        super.open();
        this.zuBar = this.node.getChildByName("TopBgSp").getChildByName("DiamondBar")
        this.moneyBar = this.node.getChildByName("TopBgSp").getChildByName("MoneyBar");
        App.SoundManager.playBg("luckBgn");
    }

    close() {
        super.close();
        App.TimerManager.remove(this.callback, this);
        this.btnDataList = null;
        App.SoundManager.playBg("bg");
    }

    //设置金币钻石栏
    public setMoney(money: MyBigLong) {
        this.moneyLab.string = money.toString();
    }
    public setSuperCash(money: number) {
        this.diamondLab.string = money.toString();
    }
    /**
    * 播放获得金币动画
    */
    public playGetCoinAni(index: number) {
        let pos = null;
        if (index == 0) {
            //金币
            pos = this.moneyBar.convertToWorldSpaceAR(this.moneyBar.getChildByName("New Sprite").position);
        } else if (index == 1) {
            pos = this.zuBar.convertToWorldSpaceAR(this.moneyBar.getChildByName("New Sprite").position);
        }

        let parent = LayerManager.getLayer(LayerManager.UI_Tips);
        pos = parent.convertToNodeSpaceAR(pos);
        EffectUtils.instance.coinEffect(
            0,
            0,
            pos.x,
            pos.y,
            index,
            parent,
            // 30,
            // 45,
            // 500,
            // 500,
            // self,
            // callFunction,
        )
    }

    /** 增加钻石 */
    protected onTouchDiamondBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);

        if (isOpen) {
            this.controller.applyControllerFunc(ControllerConst.Shop, ShopConst.OPEN_VIEW, ShopViewConst.DIAMOND_VIEW);
            App.ViewManager.open(ViewConst.ShopView);
            this.closeView();
        }
    }
    /** 增加金币 */
    protected onTouchJinBiBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);
        if (isOpen) {
            this.controller.applyControllerFunc(ControllerConst.Shop, ShopConst.OPEN_VIEW, ShopViewConst.MONEY_VIEW);
            App.ViewManager.open(ViewConst.ShopView);
            this.closeView();
        }
    }

    public setItemData(dataList: LuckItemData[], costDia?: number) {

        this.itemDataList = dataList;
        for (let i = 0; i < this.itemList.length; i++) {
            let item = this.itemList[i];
            let data = dataList[i];
            let numLab = item.getChildByName("numLab").getComponent(cc.Label);
            if (numLab && data.num && data.num.cmp(0) > 0) {
                numLab.string = data.num.toString();
                numLab.enabled = true;
            }
            else
                numLab.enabled = false;
            let node = item.getChildByName("node");
            if (!data.itemIcon || data.itemIcon == "") {
                let temp = node.getComponent(UI.Image);
                if (temp)
                    temp._destroyImmediate();
                let lab = node.getComponent(cc.Label);
                if (!lab) {
                    lab = node.addComponent(cc.Label);
                    lab.fontSize = 26;
                    lab.lineHeight = 30;
                    lab.enabled = true;

                    let outline = node.addComponent(cc.LabelOutline);
                    outline.color = outline.color.fromHEX("#11508A");
                    outline.width = 2
                }
                lab.string = data.itemDesc;
                node.scale = 1;
                node.y = 0;
            }
            else {
                let temp = node.getComponent(cc.Label);
                if (temp)
                    temp._destroyImmediate();
                let img = node.getComponent(UI.Image);
                if (!img) {
                    img = node.addComponent(UI.Image);
                }
                img.source = data.itemIcon;
                node.y = 5;
                node.scale = 0.6;
            }
            // item.getChildByName("node").getComponent(UI.Image).source = data.itemIcon;
            // item.getChildByName("node").scale = 0.7  // TODO
            item.getComponent(UI.Image).source = "/Texture/game/LuckView/kuang_1";
            if (data.isStar) {
                // let temp: cc.Vec2 = 
                // let temp = item.parent.convertToWorldSpaceAR(item.position)
                let temp = this.content.convertToNodeSpaceAR(item.parent.convertToWorldSpaceAR(item.position))
                this.starSp.node.position = temp;
                this.starSp.node.active = true;
                // cc.log("起点坐标:", this.starSp.node.position, temp)
                item.active = false;
                this.curIndex = i;
                this.curItem = item;
            }
            else {
                item.active = true;
            }
        }
    }

    /** 重置起点 */
    // public resetStarPoint(pos: number){
    //     for (let i = 0; i < this.itemList.length; i++) {
    //         let item = this.itemList[i];
    //         item.getComponent(UI.Image).source = "/Texture/game/LuckView/kuang_1";
    //         if (pos == i) {
    //             let temp = this.content.convertToNodeSpaceAR(item.parent.convertToWorldSpaceAR(item.position))
    //             this.starSp.node.position = temp;
    //              this.starSp.node.active = true;
    //             item.active = false;
    //             this.curIndex = i;
    //             this.curItem = item;
    //         }
    //         else {
    //             item.active = true;
    //         }
    //     }
    // }

    public setBtnData(dataList: LuckBtnData[]) {
        this.btnDataList = dataList;
        this.setBtnState();
    }

    public setBtnState() {
        App.TimerManager.remove(this.callback, this);
        for (let i = 0; i < this.btnDataList.length; i++) {
            let btn = this.btnList[i];
            let data = this.btnDataList[i];
            if (btn && data) {
                let numLab = btn.node.getChildByName("numLab").getComponent(cc.Label);
                numLab.string = "(" + data.curNum + "/" + data.maxNum + ")";

                if (btn == this.diaBtn) {
                    let costLab = btn.target.getChildByName("costLab").getComponent(cc.Label);
                    costLab.string = data.costStr;
                }

                this.callback(0);
                let desTime = App.DateUtils.Now() - data.lastTime;
                if (data.cdTime && desTime > data.cdTime) {
                    if (data.curNum < data.maxNum) {
                        this.applyFunc(LuckConst.CHECK_TIME);
                        continue;
                    }
                }
                else {
                    var countdown = true;
                }
            }
        }
        if (countdown) {
            App.TimerManager.doTimer(300, 0, this.callback, this);
            this.callback(0);
        }
    }

    public callback(dt: number) {
        for (let i = 0; i < this.btnDataList.length; i++) {
            let btn = this.btnList[i];
            let data = this.btnDataList[i];

            let timeLab = btn.node.getChildByName("timeLab").getComponent(cc.Label);
            let desTime = App.DateUtils.Now() - data.lastTime;
            if (data.cdTime && desTime > data.cdTime) {
                if (data.curNum < data.maxNum) {
                    this.applyFunc(LuckConst.CHECK_TIME);
                    continue;
                }
            }
            let cdTime = data.cdTime - desTime % data.cdTime;
            if (!data.cdTime || cdTime <= 0 || data.curNum == data.maxNum) {
                timeLab.node.active = false;
            }
            else {
                timeLab.node.active = true;
                timeLab.string = App.CommonUtils.getFormatBySecond1(cdTime / 1000);
            }
        }
    }

    /**
     * 棋子行走
     * @param num 前进步数
     */
    public move(num: number) {
        if (num > 0) {
            let maxItemNum = this.itemList.length;
            if (this.curIndex < maxItemNum - 1) {
                this.curIndex += 1;
            }
            else {
                this.curIndex = 0;
            }
            this.curItem.getComponent(UI.Image).source = "/Texture/game/LuckView/kuang_1";

            this.curItem = this.itemList[this.curIndex];
            this.curItem.getComponent(UI.Image).source = "/Texture/game/LuckView/kuang_2";

            this.scheduleOnce(() => {
                this.move(num - 1);
            }, 0.2);
        } else {
            this.isMove = false;
            let index = this.itemDataList[this.curIndex].index

            this.applyFunc(LuckConst.FINISH_MOVE, index);
        }
    }
    
    /**
     * 播放动画
     * @param num 骰子点数
     */
    public playAction(pat: LuckPatConst, num: number) {
        this.isMove = true;
        this.curNum = num;
        this.ani.play("luck");
        switch (pat) {
            case LuckPatConst.HIGH:
                this.adDice.node.active = true;
                this.dice.node.active = false;
                break;
            case LuckPatConst.NORMAL:
                this.adDice.node.active = false;
                this.dice.node.active = true;
                break;
        }
    }

    public onAnimCompleted() {
        this.curItem.active = true;
        this.starSp.node.active = false;
        this.move(this.curNum);
        this.pointLab.string = this.curNum + "";

        this.dice.source = ""
        this.dice.source = `Texture/game/LuckView/pt1_${this.curNum}`;
        this.adDice.source = "";
        this.adDice.source = `Texture/game/LuckView/gj2_${this.curNum}`;
    }

    // public test(){
    //     cc.log("test");
    // }

    // public end(){
    //     cc.log("end");
    // }

    public onTouchDiaBtn() {
        if (this.isMove) {
            return;
        }
        if (this.btnDataList[0].curNum == 0) {
            Toast.launch(GameText.getText(lang.luck_tip_1))
            return;
        }
        this.applyFunc(LuckConst.DRAW_AWARD, LuckPatConst.NORMAL);
    }

    public onTouchAdBtn() {
        if (this.isMove) {
            return;
        }
        if (this.btnDataList[1].curNum == 0) {
            Toast.launch(GameText.getText(lang.happy_today_finish));
            return;
        }
        // 看广告 成功回调
        this.watchAD();
    }

    //看广告
    public async watchAD() {
        let result = await ADController.getInstance().openAdByTypeAsync(AdType.LUCK);
        if (result) {
            this.applyFunc(LuckConst.DRAW_AWARD, LuckPatConst.HIGH);
        } else {
            cc.log("观看广告失败");
        }
    }

}