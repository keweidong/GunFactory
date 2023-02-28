import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { HappyConst } from "../Happy/HappyConst";



const { ccclass, property } = cc._decorator;
/** 欢乐时光结算页面 */
@ccclass
export default class HappyMoneyView extends BaseView {
    @property(cc.Label)
    protected moneyLabel: cc.Label = null;
    @property(cc.RichText)
    protected richText: cc.RichText = null;
    public bgType: BG_TYPE = BG_TYPE.GRAY;
    @property(cc.Animation)
    protected ani: cc.Animation = null;
    initUI() {
        super.initUI();
        // this.richText.node.on(cc.Node.EventType.TOUCH_END, this.onTouchClose, this);
    }

    onTouchClose() {
        super.onTouchClose();
        this.applyFunc(HappyConst.DOUBLE_HAPPY_MOENY, false);
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
    public open(happyMoney: MyBigLong) {
        super.open();
        this.moneyLabel.string = happyMoney.toString();
        this.ani.play();
        // cc.tween(this.richText.node).hide().delay(1).show().start();
    }

    onTouchDoubleBtn() {
        this.applyFunc(HappyConst.DOUBLE_HAPPY_MOENY, true);
    }
}