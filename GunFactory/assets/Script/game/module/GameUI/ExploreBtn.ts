import App from "../../../core/App";
import { GameConst } from "../GameMain/GameConst";
import GameUIController from './GameUIController';
import { ControllerConst } from "../../consts/ControllerConst";
import { ExploreConst } from "../Explore/ExploreConst";
import { GameText } from "../../../core/lang/GameText";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 探索按钮
 */
@ccclass
export default class ExploreBtn extends cc.Component {

    /**计时 */
    timeLab: cc.Label = null;

    timeNum: number = 0;

    /**buff结束的时间 */
    buffEndTime: number;

    onLoad() {
        this.timeLab = this.node.getChildByName("Background").getChildByName("TimeLab").getComponent(cc.Label);
    }

    /**更新时间显示 */
    startUpdateThisTimeLab() {

        let now = App.DateUtils.Now();
        if (now >= this.buffEndTime) {
            App.TimerManager.remove(this.startUpdateThisTimeLab, this);
            // this.hideBuffBar();
            this.timeLab.string = GameText.getText(lang.common_can_open);// "可开启";
            this.stopTime();
        } else {
            this.timeLab.string = App.CommonUtils.getFormatTime(this.buffEndTime - App.DateUtils.Now());
        }
    }

    /**
     * 开始计时
     */
    starTime(buffEndTime: number) {
        this.buffEndTime = buffEndTime;
        App.TimerManager.doTimer(1000, 0, this.startUpdateThisTimeLab, this);
    }

    /**
     * 停止计时
     */
    stopTime() {
        if (App.TimerManager.isExists(this.startUpdateThisTimeLab, this)) {
            App.TimerManager.remove(this.startUpdateThisTimeLab, this);
        }
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.StopExploreTime);
    }

}
