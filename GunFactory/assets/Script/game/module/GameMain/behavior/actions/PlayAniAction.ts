import { GameUtils } from "../../GameUtils";
import { IGameTick } from "../../object/scene/role/const";
import { BaseAction, register } from "../B3Tree";

export interface Params {
    /**
     * 要播放的动画名
     */
    aniName: string;
    /**
     * 播放次数(0表示循环播放)
     */
    playCnt: number;
    /**
     * 播放总时间,单位毫秒(可以不填)
     */
    playTime?: number;
    /**直接返回成功,不会返回running*/
    notRunning: number;
}

/*
 * @Author: He 
 * @Date: 2019-12-28 15:18:11 
 * @Last Modified by: He
 * @Last Modified time: 2020-04-16 18:33:26
 * 播放某个动画
 */
export default class PlayAniAction extends BaseAction {
    protected isAniFinish: boolean = false;
    properties: Params;
    protected onComplete() {
        // this.log("播放动画完毕", this.properties.aniName);
        this.isAniFinish = true;
    }
    /**
   * 打断动作
   */
    onInterrupt(tick: IGameTick) {
        // this.log("onInterrupt:动作被打断", this.properties.aniName)
        if (this.properties.playTime) {
            GameUtils.TimerManager.remove(this.onComplete, this);
        } else {
            tick.target.dbNode.off(dragonBones.EventObject.COMPLETE, this.onComplete, this);
        }
        this.isAniFinish = true;
    }

    open(tick: IGameTick): void {
        tick.target.playAnimation(this.properties.aniName, this.properties.playCnt);
        if (this.properties.notRunning) {//如果不当成持续性动作,会直接返回success
            this.isAniFinish = true;
            return;
        }
        this.isAniFinish = false;
        // tick.target.node.on("INTERRUPT", this.onInterrupt, this);//注册打断事件,受到这个事件的时候,会立刻结束当前动作
        if (this.properties.playTime) {//如果有播放时间限制
            GameUtils.TimerManager.setTimeOut(this.properties.playTime, this.onComplete, this);
        } else {
            if (this.properties.playCnt !== 0) {
                tick.target.dbNode.once(dragonBones.EventObject.COMPLETE, this.onComplete, this);
            }
            else {
                // CC_DEBUG && Log.error("动作配置出错", this.properties.aniName, this.properties.playTime, this.properties.playCnt);
            }
        }
    }

    tick(tick: IGameTick): b3.STATE {
        if (this.isAniFinish) {
            return b3.SUCCESS;
        } else {
            return b3.RUNNING;
        }
    }
    close(tick: IGameTick): void {
        if (!this.isAniFinish) {
            this.onInterrupt(tick);
        }
        // this.log("close:", tick);
        // tick.target.node.off("INTERRUPT", this.onInterrupt, this);
    }
}
register(PlayAniAction, "PlayAniAction");