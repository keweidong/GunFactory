import App from "../../../../core/App";
import SwitchFrame from "../../../../core/component/SwitchFrame";
import { GameText } from "../../../../core/lang/GameText";
import { ControllerConst } from "../../../consts/ControllerConst";
import { GameConst } from "../GameConst";
import { GuestUpgradeDetailInfo } from "../object/scene/role/guest/GuestMsr";
import ShowAdBtn from "./ShowAdBtn";
// cc.Color.WHITE
const BTN_EABLE = cc.color().fromHEX("#7c3e19");
const BTN_GRAY = cc.color().fromHEX("#faffdf");
const BTN_FULL = cc.color().fromHEX("#FEA948");
const { ccclass, property } = cc._decorator;
/**
 * 升级按钮
 */
@ccclass
export default class UpgradeBtn extends cc.Component {
    /**
     * 0 :可升级, 1 :不可点击, 2 :人数增加(黄色), 3 :满级
     */
    @property({ type: SwitchFrame, tooltip: "0 :可升级, 1 :不可点击, 2 :人数增加(黄色), 3 :满级" })
    switchBottomImg: SwitchFrame = null;
    /**
     * 0 厨师, 1 服务员, 2 宣传
     */
    @property({ type: SwitchFrame, tooltip: " 0 厨师, 1 服务员, 2 宣传" })
    switchTypeIcon: SwitchFrame = null;

    @property(cc.Label)
    public nameLab: cc.Label = null;

    @property(cc.Label)
    public moneyLab: cc.Label = null;

    @property(cc.Button)
    public btn: cc.Button = null;

    @property(cc.RichText)
    public rateLab: cc.RichText = null;

    public type: number = 0;

    protected data: GuestUpgradeDetailInfo = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(ShowAdBtn)
    public showAdBtn: ShowAdBtn = null;

    // onLoad() {
    //     this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    // }
    protected onTouchStart() {
        if (this.showAdBtn.node.active) {
            // this.showAdBtn.node.active = false;
            this.showAdBtn.hide();
            App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UPGRADE, this.type, this.showAdBtn.conf.upgradeCnt, true);
        } else {
            App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UPGRADE, this.type, 1);
        }

    }

    public updateBtnBgImg() {
        if (this.data.lastChangeLevel !== -1) {//如果还没有升级到最高等级
            if (this.data.isEnough) {//如果有足够的钱升级
                if (this.data.addCnt) {
                    this.switchBottomImg.switch(2);
                } else {
                    this.switchBottomImg.switch(0);
                }
                // this.showAdBtn.isWork = true;
                this.showAdBtn.isMoneyEnable = true;
                this.moneyLab.node.color = BTN_EABLE;
            } else {
                this.moneyLab.node.color = BTN_GRAY;
                this.switchBottomImg.switch(1);
                this.showAdBtn.isMoneyEnable = false;
            }
            this.showAdBtn.isWork = true;
            this.btn.interactable = true;
        } else {
            this.moneyLab.node.color = BTN_FULL;
            this.showAdBtn.isWork = false;
            this.switchBottomImg.switch(3);
            this.btn.interactable = false;
        }
    }

    public setData(data: GuestUpgradeDetailInfo) {
        cc.Tween.stopAllByTarget(this.progressBar);
        this.data = data;
        if (data.addCnt) {
            this.updateBtnBgImg();
            cc.tween(this.progressBar).to(0.2, {
                progress: 1
            }).start();
            this.moneyLab.string = data.costMoney.toString();
            this.rateLab.string = GameText.getText(lang.home_ui_number).format(" +" + data.addCnt)
        } else {
            if (data.lastChangeLevel === -1) {
                this.switchBottomImg.switch(3);
                this.progressBar.progress = 1;
                this.moneyLab.string = GameText.getText(lang.common_level_full);
                this.btn.interactable = false;
            } else {
                //要提升总的等级
                let count1 = data.nextChangeLevel - data.lastChangeLevel - 1;
                //当前已经提升的等级
                let count2 = data.curData.level - data.lastChangeLevel;
                let progress = count2 / count1;
                if (this.progressBar.progress > progress) {
                    this.progressBar.progress = 0;
                }
                if (count2) {
                    cc.tween(this.progressBar).to(0.2, {
                        progress: progress
                    }).start();
                } else {
                    this.progressBar.progress = 0;
                }
                this.updateBtnBgImg();
                this.moneyLab.string = data.costMoney.toString();
            }
            this.rateLab.string = GameText.getText(lang.home_ui_speed).format(data.preData.rate);
        }
    }
}