import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import { AdData } from "../../config/AdDataManager";
import { BuffConfig } from "../../config/BuffDataManager";
import { ControllerConst } from "../../consts/ControllerConst";
import { AdType } from "../AD/ADController";
import { ADConst, AdState } from "../AD/ADManageBase";
import { BagConst } from "../bag/BagConst";
import BuffItem from "../bag/BuffItem";
import { GameUIConst } from "./GameUIConst";

const { ccclass, property } = cc._decorator;
@ccclass
export default class CookAccelerateBtn extends cc.Component implements IShareAndAd {

    protected buff: BuffData = null;
    protected buffConf: BuffConfig = null;

    public item: BuffItem = null;

    protected _isShow: boolean = false;

    /** 当前按钮栏状态, -1 隐藏状态, 0 关闭状态 1 显示状态*/
    protected _state: number = -1;

    /**
    * 广告按钮
    */
    protected _btnBox: {
        node: cc.Node;
        timeLab: cc.Label;
        icon: cc.Sprite;
        // descLab: cc.Label;
    } = null;
    onLoad() {
        let buffBtnNode = this.node.getChildByName("BuffBtn");
        this._btnBox = {
            icon: buffBtnNode.getChildByName("icon").getComponent(cc.Sprite),
            node: buffBtnNode,
            timeLab: buffBtnNode.getChildByName("TimeLab").getComponent(cc.Label),
            // descLab: buffBtnNode.getChildByName("DescLab").getComponent(cc.Label)
        }
        this.init();

    }
    public init() {
        let item: BuffItem = this.item = App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.GET_ITEM, App.ConfigManager.getConfig("GameConf").cookAutoAccelerate.itemId)
        this.buffConf = App.ConfigManager.getConfig("BuffDataManager").getData(item.data.agrs4);
        this._btnBox.timeLab.string = item.data.agrs0 / 60 + GameText.getText(lang.common_minute);// "分钟";
        App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.REGISTER_ITEM, AdType.COOK_AUTO_ACCELERATE, this);
    }
    protected onTouchBtn() {
        if (this._state == 1) {
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.GET_COOK_AUTO_ACCELERATE);
        }
    }

    protected updateState() {
        if (this.buff ||
            this._state == 1) {
            this.showBtn();
        } else {
            this.hideBtn();
        }
    }

    toShare() {
        // App.CommonUtils.setSpriteFrame("Texture/game/Common/icons/icon_share", this._btnBox.icon);
        this._state = 1;
        this.updateState();

    }

    toFail(type: AdType, conf: AdData, data: any) {
        this._state = 0;
        this.updateState();
    }
    /**
    * 切换成广告状态
    */
    toAd(type: AdType, conf: AdData, data: any, adState: AdState) {
        // App.CommonUtils.setSpriteFrame("Texture/game/Common/icons/icon_ad", this._btnBox.icon);
        if (adState === AdState.success) {
            this._state = 1;
        } else {
            this._state = -1;
        }
        this.updateState();
    }

    toFree(type: AdType, conf: AdData, data: any) {
        this._state = 1;
        // App.CommonUtils.setSpriteFrame("Texture/game/Common/icons/icon_free", this._btnBox.icon);
        this.updateState();
    }

    public setData(buff: BuffData) {
        if (buff) {
            this.buff = buff;
            App.TimerManager.doTimer(300, 0, this.showCountdown, this);
            this.showCountdown();
        } else {
            this._btnBox.timeLab.string = this.item.data.agrs0 / 60 + GameText.getText(lang.common_minute);//"分钟";
            // this._btnBox.descLab.string = "收益x" + (this.item.data.agrs2 / 100 + 1);
            App.TimerManager.remove(this.showCountdown, this);
            this.buff = null;
        }
        this.updateState();
    }

    //显示倒计时
    protected showCountdown() {
        let now = App.DateUtils.Now();
        if (now >= this.buff.buffEndTime) {
            App.TimerManager.remove(this.showCountdown, this);
            // this.hideBuffBar();
            this._btnBox.timeLab.string = this.item.data.agrs0 / 60 + GameText.getText(lang.common_minute);//"分钟";
            this.buff = null;
            this.updateState();
        } else {
            this._btnBox.timeLab.string = App.CommonUtils.getFormatTime(this.buff.buffEndTime - App.DateUtils.Now());
        }
    }
    protected showBtn() {
        this._btnBox.node.active = true;
    }
    /**
     * 显示广告按钮
     */
    protected hideBtn() {
        // this._btnBox.node.active = false;
        // cc.tween(this._btnBox.node).to(0.3, {
        //     x: - 170
        // }).set({ active: !!this._state }).start();
    }
}

declare global {
    interface GameConf {
        /**
         * 免费buff配置
         */
        cookAutoAccelerate: {
            /**buff物品 */
            itemId: number;
        }
    }


}