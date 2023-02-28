// 

import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { Platform } from "../../platform/Platform";
import App from "../../../core/App";
import { ViewConst } from "../../consts/ViewConst";



const { ccclass, property } = cc._decorator;
/** 欢乐时光结算页面 */
@ccclass
export default class TongguanAni extends BaseView {
    @property(cc.Label)
    protected moneyLabel: cc.Label = null;
    @property(cc.ParticleSystem)
    protected yanhua: cc.ParticleSystem = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    @property(cc.Animation)
    protected ani: cc.Animation = null;

    initUI() {
        super.initUI();
        // this.richText.node.on(cc.Node.EventType.TOUCH_END, this.onTouchClose, this);
    }

    onTouchClose() {
        super.onTouchClose();
        // this.applyFunc(HappyConst.DOUBLE_HAPPY_MOENY, false);
    }
    /**
   * 初始化面板
   * 
   * @param {number} happyMoney 通过奖励金钱
   * 
   * @author he
   */
    public open(happyMoney: number) {
        super.open();
        this.moneyLabel.string = MyBigLong.toString(happyMoney);
        this.ani.play();
        this.yanhua.resetSystem();
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.TimerManager.doTimer(500, 1, () => {
                App.ViewManager.open(ViewConst.ShotView, false);
            }, this);
        }
    }
    public close() {
        super.close();
        this.yanhua.stopSystem();
    }

    onTouchDoubleBtn() {
        // this.applyFunc(HappyConst.DOUBLE_HAPPY_MOENY, true);
    }
}