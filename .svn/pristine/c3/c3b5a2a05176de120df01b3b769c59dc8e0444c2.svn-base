import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { UserLevelConst } from "./UserLevelController";



const { ccclass, property, executeInEditMode } = cc._decorator;
/** 赞助界面 */
@ccclass
export default class UserLevelUpView extends BaseView {
    // @property(cc.Label)
    // protected moneyLabel: cc.Label = null;
    // @property(cc.Label)
    // protected decLabel: cc.Label = null;
    // @property(cc.Node)
    // protected doubleBtn: cc.Node = null;
    // @property(cc.Sprite)
    // protected adIcon: cc.Sprite = null;
    // //广告状态
    // protected adStatus: AdShareStatus = null;
    // //闲置时间，防止切到后台闲置时间置零
    // protected idleTime: long = null;
    @property(cc.Label)
    protected moneyLab: cc.Label = null;
    @property(cc.Node)
    protected getBtnNode: cc.Node = null;

    @property(cc.Label)
    protected levelLab: cc.Label = null;
    protected _particle1: cc.ParticleSystem = null;
    protected _particle2: cc.ParticleSystem = null;




    protected _ani: cc.Animation = null;

    protected getMoney: number = 0;
    public bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
        this._ani = this.getComponent(cc.Animation);
        this._particle1 = this.node.getChildByName("gxhd1").getComponent(cc.ParticleSystem);
        this._particle2 = this.node.getChildByName("gxhd2").getComponent(cc.ParticleSystem);
    }

    protected onTouchGet(event: cc.Event.EventTouch, isDouble: string) {
        CC_DEBUG && Log.trace("onTouchGet", isDouble);
        this.applyFunc(UserLevelConst.GET_MONEY, isDouble, this.getMoney);
    }

    protected onAnimCompleted() {
        this._ani.play("Gongxihuode2");
    }
    public open(money: number, level: number) {
        super.open();
        // cc.tween(this.getBtnNode).hide().delay(1).show().start();
        this.levelLab.string = "Lv " + (level + 1);
        this.getMoney = money;
        this.moneyLab.string = MyBigLong.toString(money);
        this._ani.play("Gongxihuode");
        this._ani.once(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
        this._particle1.resetSystem();
        this._particle2.resetSystem();
    }



    public close() {
        super.close();
        this._ani.stop();
    }

}