import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { MoneyType } from "../Define";
import { GameUIConst } from "./GameUIConst";



const { ccclass, property, executeInEditMode } = cc._decorator;
/** 赞助界面 */
@ccclass
export default class LuckBagView extends BaseView {
    // @property(cc.Label)
    // protected moneyLabel: cc.Label = null;
    @property(cc.Label)
    protected leftBtnLab: cc.Label = null;
    @property(cc.Label)
    protected rightBtnLab: cc.Label = null;
    // @property(cc.Node)
    // protected leftBtn: cc.Button = null;
    // @property(cc.Sprite)
    // protected adIcon: cc.Sprite = null;
    // //广告状态
    // protected adStatus: AdShareStatus = null;
    // //闲置时间，防止切到后台闲置时间置零
    // protected idleTime: long = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
    }

    //观看广告领取双倍奖励
    protected getCoin() {
        this.applyFunc(GameUIConst.GET_LUCKBAG_REWARD, 0);
    }
    protected getDiamond() {
        this.applyFunc(GameUIConst.GET_LUCKBAG_REWARD, 1);
    }

    protected coin: MyBigLong = MyBigLong.create(0, 0);

    /**
   * 初始化面板
   * 
   * @param {number} startTime 闲置开始时间
   * @param {MyBigLong} idleMoneyRate 每秒闲置金钱
   * @param {MoneyType} moneyType 货币类型
   * 
   * @author he
   */
    public open(idleMoneyRate: MyBigLong) {
        super.open();
        this.coin.clear();
        this.coin.add(idleMoneyRate).multiply(App.ConfigManager.gameConf.game.gift.coin);
        this.leftBtnLab.string = `${GameText.getText(lang.common_get)}\n${this.coin.toString()}${GameText.getText(lang.common_coin)}`;
        this.rightBtnLab.string = `${GameText.getText(lang.common_get)}\n${App.ConfigManager.gameConf.game.gift.diamond}${GameText.getText(lang.common_diamond)}`;
    }

}
