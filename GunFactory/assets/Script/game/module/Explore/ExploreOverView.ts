import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { AdType } from "../AD/ADController";
import { ADConst } from "../AD/ADManageBase";
import { ExploreConst } from "./ExploreConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExploreOverView extends BaseView {
    public bgType: BG_TYPE = BG_TYPE.GRAY;

    /**金币数量 */
    @property(cc.Label)
    goldNum: cc.Label = null;

    /**
     * 钻石数量
     */
    @property(cc.Label)
    diamondsNum: cc.Label = null;

    /**
     * 复活按钮
     */
    @property(cc.Button)
    reviveBtn: cc.Button = null;

    /**
     * 复活次数
     */
    @property(cc.Label)
    reviveNum: cc.Label = null;

    /**放弃按钮 */
    @property(cc.Button)
    leaveBtn: cc.Button = null;

    data: ExploreOverAwardData;

    initUI() {
        super.initUI()
    }
    showLeaveBtn() {
        this.leaveBtn.node.active = true;
        App.TimerManager.remove(this.showLeaveBtn, this);
    }

    setData(data: ExploreOverAwardData) {
        this.goldNum.string = MyBigLong.toString(data.data.gold);
        this.diamondsNum.string = MyBigLong.toString(data.data.diamonds);
        this.reviveNum.string = "(" + data.num + "/2)";

        if (data.num <= 0) {
            this.reviveBtn.interactable = false;
            this.showLeaveBtn();
        }

    }

    open(data: ExploreOverAwardData) {
        super.open();
        // this.leaveBtn.node.active = false;
        this.data = data;
        this.setData(data);

        // App.TimerManager.doTimer(3000, 1, this.showLeaveBtn, this)

    }

    close() {
        super.close();
        App.TimerManager.remove(this.showLeaveBtn, this);

    }

    async  onTouchReviveBtn() {
        let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.EXPLORE_REVIVE);
        if (result) {
            //发送消息,观看视频成功,进入下一关卡
            App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.AdToRevive);
            //关闭这个界面
            App.ViewManager.closeView(this);
        } else {
            return;
        }
    }

    onTouchLevefBtn() {

        //退出探索,发送消息
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.GiveUp_Revive);
        //关闭这个界面
        App.ViewManager.closeView(this);
    }

}
declare global {

    type ExploreOverAwardData = {
        data: awardData,
        /**剩余的次数 */
        num: number,
    }

    /**得到的奖励 */
    type awardData = {
        /**
         * 金币
         */
        gold: number,
        /**
         * 钻石
         */
        diamonds: number,
    }
}