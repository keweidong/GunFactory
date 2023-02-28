import App from "../../../../core/App";
import SwitchFrame from "../../../../core/component/SwitchFrame";
import EffectUtils from "../../../../core/utils/EffectUtils";
import { ControllerConst } from "../../../consts/ControllerConst";
import { GameConst } from "../GameConst";
import { Food } from "../object/scene/food/Food";
import ShowAdBtn from "./ShowAdBtn";
import WorldScene from "../object/scene/WorldScene"
import { GameText } from "../../../../core/lang/GameText";

let BTN_EABLE = cc.color().fromHEX("#7C3E19");
let BTN_FULL = cc.color().fromHEX("#FEA948");
// const BTN_EABLE = cc.color().fromHEX("#7c3e19");
const BTN_GRAY = cc.color().fromHEX("#faffdf");
const { ccclass, property } = cc._decorator;
@ccclass
export default class FoodBtn extends cc.Component {
    /**
     * 菜式图标
     */
    @property(cc.Sprite)
    protected foodImg: cc.Sprite = null;
    @property(cc.Label)
    protected moneyLab: cc.Label = null;

    @property(cc.Sprite)
    protected progressBar: cc.Sprite = null;
    @property(cc.Sprite)
    protected plateBg: cc.Sprite = null;
    @property(cc.Node)
    protected lockImg: cc.Node = null;
    @property(SwitchFrame)
    greenBtnSwitch: SwitchFrame = null;
    protected data: Food = null;
    @property(cc.Button)
    protected btn: cc.Button = null;

    @property(ShowAdBtn)
    public showAdBtn: ShowAdBtn = null;

    public WorldScene:WorldScene;

    protected onTouch() {
        if (this.data.isOpen()) {
            if (this.showAdBtn.node.active) {
                this.showAdBtn.hide();
                App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UPGRADE_FOOD, this.data.attrObj.index, this.showAdBtn.conf.upgradeCnt, true);
            } else {
                App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UPGRADE_FOOD, this.data.attrObj.index, 1);
            }
        } else {
            App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UNLOCK_FOOD, this.data.attrObj.index);
        }
    }

    // /**
    //  * 广告按钮显示出来
    //  */
    // protected onShowAdBtn() {
    //     this.btn.interactable = false;
    // }
    // /**
    //  * 广告按钮隐藏
    //  */
    // protected onHideAdBtn() {
    //     this.btn.interactable = true;
    // }

    /**
     * 当金钱发生变化的时候,调用这个方法,更新按钮的状态
     */
    public updateMoney() {
        if (this.data.isOpen()) {//已经解锁了菜式
            if (this.data.attrObj.level === this.data.attrObj.maxLevel) {//如果已经最高等级
                this.greenBtnSwitch.switch(2);
                this.moneyLab.node.color = BTN_FULL;
                this.showAdBtn.isWork = false;
            } else if (this.data.checkIsCanUpgarde(1)) {//如果钱足够升级
                this.greenBtnSwitch.switch(0);
                this.moneyLab.node.color = BTN_EABLE;
                this.showAdBtn.isWork = true;
                this.showAdBtn.isMoneyEnable = true;
            } else {//钱不够
                this.showAdBtn.isWork = true;
                this.showAdBtn.isMoneyEnable = false;
                this.greenBtnSwitch.switch(1)
                this.moneyLab.node.color = BTN_GRAY;
            }

        } else {
            this.showAdBtn.isWork = false;
            if (this.data.isEnoughMoneyOpen()) {
                this.greenBtnSwitch.switch(0);
                this.moneyLab.node.color = BTN_EABLE;
            } else {
                this.greenBtnSwitch.switch(1);
                this.moneyLab.node.color = BTN_GRAY;
            }
        }
    }
    /**
     * 等级数据更新
     */
    public updateLevelData(lastSellCoin = 0) {
        cc.Tween.stopAllByTarget(this.progressBar);
        if (this.data.attrObj.level === this.data.attrObj.maxLevel) {
            this.moneyLab.string = GameText.getText(lang.common_max_lv);//"满级";
            this.btn.interactable = false;
        } else {
            this.moneyLab.string = this.data.getCostByLevel(this.data.attrObj.level + 1).toString();
            this.btn.interactable = true;
        }

        //要提升总的等级
        let count1 = this.data.detailInfo.nextChangeLevel - this.data.detailInfo.lastChangeLevel - 1;
        //当前已经提升的等级
        let count2 = this.data.detailInfo.curData.level - this.data.detailInfo.lastChangeLevel;

        // let next = 
        if (this.data.detailInfo.preData && this.data.detailInfo.preData.levelData.icon !== this.data.attrObj.levelData.icon) {
            App.ResManager.getResAsync(this.data.getNexLevelIcon());
        }

        if (lastSellCoin) {
            let foodImg = this.data.getCurLevelIcon();
            App.CommonUtils.setSpriteFrame(foodImg, this.foodImg);
            let pos = cc.v2(0, 0);
            this.node.convertToWorldSpaceAR(pos, pos);
            EffectUtils.instance.playNewFoodAni(foodImg, pos, this.data.attrObj.sellCoin - lastSellCoin, count2 == 0);
        }
        let progress = - count2 / count1;
        if (this.progressBar.fillRange < progress) {
            this.progressBar.fillRange = 0;
        }
        cc.tween(this.progressBar).to(0.1, {
            fillRange: progress
        }).start();
    }
    /**
     * 菜式解锁
     */
    public unlockFood() {
        this.WorldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this.lockImg.active = false;
        this.node.insertChild(this.plateBg.node, 0);
        this.WorldScene.playerDto.cuisine++;
        // this.moneyLab.string = data.getCostByLevel(1).toString();
        this.updateLevelData();
        this.updateMoney();
    }
    public setData(data: Food) {
        this.data = data;
        if (data.isOpen()) {
            this.lockImg.active = false;
            this.node.insertChild(this.plateBg.node, 0);
            this.updateLevelData();
        } else {

            this.btn.interactable = true;
            this.progressBar.fillRange = 0;
            this.moneyLab.string = MyBigLong.toString(data.levelUpDatas.openChips);
            this.node.insertChild(this.plateBg.node, this.foodImg.node.getSiblingIndex());
            this.lockImg.active = true;
        }
        App.CommonUtils.setSpriteFrame(this.data.getCurLevelIcon(), this.foodImg);
        this.updateMoney();
    }
}