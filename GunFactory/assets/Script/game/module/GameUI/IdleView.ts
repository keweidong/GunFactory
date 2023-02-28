import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { AdShareStatus, AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { MoneyType } from "../Define";
import { GameUIConst } from "./GameUIConst";



const { ccclass, property, executeInEditMode } = cc._decorator;
/** 赞助界面 */
@ccclass
export default class IdleView extends BaseView {
    @property(cc.Label)
    protected moneyLabel: cc.Label = null;
    @property(cc.Label)
    protected decLabel: cc.Label = null;
    @property(cc.Node)
    protected doubleBtn: cc.Node = null;
    @property(cc.Sprite)
    protected adIcon: cc.Sprite = null;
    //广告状态
    protected adStatus: AdShareStatus = null;
    //闲置时间，防止切到后台闲置时间置零
    protected idleTime: long = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
    }
    protected getMoney(event: cc.Event, rate: string) {
        let multiple = parseInt(rate);
        if (multiple > 1) {
            //双倍按钮
            //看广告
            //记录闲置现金时间
            this.idleTime = this.applyFunc(GameUIConst.GETIDLETIME);
            this.watchAD(multiple);
        } else {
            //单倍按钮
            let result = this.applyFunc(GameUIConst.COLLECT_IDLE, multiple);
            this.closeView();
        }

    }

    //观看广告领取双倍奖励
    protected async watchAD(multiple: number) {
        let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.IDLE);
        if (result) {
            //let result = this.applyFunc(GameUIConst.COLLECT_IDLE, multiple);
            this.applyFunc(GameUIConst.COLLECT_IDLE, multiple, this.idleTime);
            this.closeView();
        } else {
            return;
        }
    }

    /**
   * 初始化面板
   * 
   * @param {number} startTime 闲置开始时间
   * @param {MyBigLong} idleMoney 每秒闲置金钱
   * @param {MoneyType} moneyType 货币类型
   * 
   * @author he
   */
    public open(startTime: number, idleMoney: MyBigLong, moneyType: MoneyType) {
        super.open();
        let idleTime = Math.floor((App.DateUtils.Now() - startTime) / 1000);
        const maxTime = 4 * 60 * 60;
        //闲置现金最多四个小时
        if (idleTime > maxTime) {
            idleTime = maxTime;
        }
        this.moneyLabel.string = idleMoney.toString();
        this.decLabel.string = GameText.getText(lang.idle_tip);
    }

    close() {
        super.close();
        cc.log("任务面板关闭");
        // ADController.getInstance().unregisterItem(AdType.IDLE);
    }

    onTouchBg() {

    }

}