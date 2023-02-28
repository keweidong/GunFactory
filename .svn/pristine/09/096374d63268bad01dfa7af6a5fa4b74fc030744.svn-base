import { AchievementType, AchievementConst } from "../AchievementConst";
import { AchievementData } from '../AchievementDataMsr';
import App from '../../../../core/App';
import { ControllerConst } from '../../../consts/ControllerConst';
import { GameUIConst } from "../../GameUI/GameUIConst";
import { GameText } from "../../../../core/lang/GameText";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**成就Item */
@ccclass
export default class AchievementItem extends cc.Component {

    /**类型 */
    itemType: AchievementType;


    /**icon */
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    /**称号 */
    @property(cc.Label)
    nameLab: cc.Label = null;

    /**任务描述 */
    @property(cc.Label)
    itemDes: cc.Label = null;

    /**任务完成进度(1/5) */
    @property(cc.Label)
    chengjiuNum: cc.Label = null;

    /**钻石数量 */
    @property(cc.Label)
    zsNum: cc.Label = null;

    /**领取按钮 */
    @property(cc.Button)
    lingquBtn: cc.Button = null;

    /**按钮描述 */
    @property(cc.Label)
    btnDes: cc.Label = null;

    data: AchievementData = null;
    // .format(this.conf.param);


    setData(data: AchievementConf) {

        this.data = data.achievementData;

        this.itemType = data.achievementData.type;
        App.CommonUtils.setSpriteFrame("Texture/Achievement/" + data.achievementData.icon, this.icon);
        this.nameLab.string = data.achievementData.param1;
        this.itemDes.string = data.achievementData.des.format(data.achievementData.param);
        this.zsNum.string = data.achievementData.award.toString();
        if (data.conf.numId) {
            this.chengjiuNum.string = "({0}/{1})".format(data.conf.numId, data.achievementData.param);
        } else {
            this.chengjiuNum.string = "(0/{0})".format(data.achievementData.param);
        }
        if (data.conf.numId >= data.achievementData.param) {
            this.btnDes.string = GameText.getText(lang.common_get);//"领取";
            this.lingquBtn.interactable = true;
            // App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.CHENGJIU_HONGDIAN_OPEN);
        } else {
            this.btnDes.string = GameText.getText(lang.common_no_complete);//"未完成";
            this.lingquBtn.interactable = false;
        }

    }

    /**更新数量 */
    updateNum(num) {
        this.chengjiuNum.string = "({0}/{1})".format(num, this.data.param);
        if (num >= this.data.param) {
            this.btnDes.string = GameText.getText(lang.common_get);//"领取";
            this.lingquBtn.interactable = true;
            // App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.CHENGJIU_HONGDIAN_OPEN);
        }
    }

    /**
     * 所有成就已完成
     */
    setChengjiuIsOver() {
        this.lingquBtn.interactable = false;
        this.btnDes.string = GameText.getText(lang.common_complete);//"已完成";
    }

    onTounchBtn() {
        App.ControllerManager.applyFunc(ControllerConst.Achievement, AchievementConst.Get_Chengjiu_Award, this.data.typeid, this.data.award, this.data.type);
    }
}
