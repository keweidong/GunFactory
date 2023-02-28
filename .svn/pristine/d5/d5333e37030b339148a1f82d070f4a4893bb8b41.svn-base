import NodePool from "../../../../../../core/utils/NodePool";
import { Params } from "../../../behavior/actions/PlayAniAction";
import { GameUtils } from "../../../GameUtils";
import { IMyComponent } from "./component/IMyComponent";
import MoveComponent from "./component/MoveComponent";
import { RoleMsr } from "./RoleMsr";
const { ccclass, property } = cc._decorator;




@ccclass
export default class GameObject extends cc.Component {
    conf: any;
    public move: MoveComponent = null;
    isDebug: boolean = false;

    /**
     * 是否已经初始化完毕
     */
    public isInit: boolean = false;
    data: {
        speed: number;
        baseSpeed: number;
    };

    @property(dragonBones.ArmatureDisplay)
    public dbNode: dragonBones.ArmatureDisplay = null;

    protected atlasAsset: string = "";

    /**
     * 移动方向
     */
    public dir: Dir = null;
    /**当前摊位的序号 */
    public index: number = -1;
    public state: number = null;
    public nodePool: NodePool = null;

    public roleMsr: RoleMsr = null;
    protected comps: IMyComponent[] = [];

    public aiFile: string = "";

    isAniFinish: boolean = false;

    public init(...args) {
        // this.aiFile = this.conf.aiFile;;
        this.isInit = true;
        for (const iterator of this.comps) {
            iterator.init();
        }
        this.index = 0;
    }



    public setDbArmatureName(newName: string) {
        if(newName != this.dbNode.armatureName){
            this.dbNode.armatureName = newName;
        }
    }

    public playAnimation(animName: string, playTimes: number, timeScale: number = 1) {
        // CC_DEBUG && Log.trace("playAnimation:", this.uuid, animName, timeScale);
        this.dbNode.playAnimation(animName, playTimes);

        this.dbNode.timeScale = Math.min(timeScale, 2);
    }
    protected onComplete() {
        // this.log("播放动画完毕", this.properties.aniName);
        this.isAniFinish = true;
    }
    public onInterrupt() {
        GameUtils.TimerManager.remove(this.onComplete, this);
    }
    public playActionAni(params: Params) {
        this.playAnimation(params.aniName, params.playCnt);
        if (params.notRunning) {//如果不当成持续性动作,会直接返回success
            this.isAniFinish = true;
            return;
        }
        this.isAniFinish = false;
        if (params.playTime) {//如果有播放时间限制
            GameUtils.TimerManager.setTimeOut(params.playTime, this.onComplete, this);
        } else {
            if (params.playCnt !== 0) {
                this.dbNode.once(dragonBones.EventObject.COMPLETE, this.onComplete, this);
            }
            else {
                // CC_DEBUG && Log.error("动作配置出错", this.properties.aniName, this.properties.playTime, this.properties.playCnt);
            }
        }
    }

    public loadRes() {
        this.dbNode.enabled = false;
        var url = `db/${this.atlasAsset}`;
        let atlasAsset = cc.loader.getRes(url, dragonBones.DragonBonesAtlasAsset);
        if (atlasAsset) {
            this.dbNode.dragonAtlasAsset = atlasAsset;
            this.playAnimation(this.dbNode.animationName, 0);
            CC_DEBUG && Log.trace("loadRes", 1);
            this.dbNode.enabled = true;
            this.isInit = true;
            // if (this._finishResolve) {
            //     cc.log("dddd")
            //     App.TimerManager.setFrameOut(1, this.onInitFinish, this)
            // }
        } else {
            cc.loader.loadRes(url, dragonBones.DragonBonesAtlasAsset, (error: Error, atlasJson: any) => {
                if (error) {
                    Log.trace(">>>>>DagonBonesCompent error", error);
                }
                else {
                    this.dbNode.dragonAtlasAsset = atlasJson;
                }
                this.playAnimation(this.dbNode.animationName, 0);
                CC_DEBUG && Log.trace("loadRes", 2);
                this.dbNode.enabled = true;
                this.isInit = true;
                // if (this._finishResolve) {
                //     App.TimerManager.setFrameOut(1, this.onInitFinish, this)
                // }
            });
        }
    }
    public addMyComponent<T extends IMyComponent>(compClass: { new(): T }): T {
        if (this.getComponent(compClass)) {
            return;
        }
        let comp = this.addComponent(compClass);
        comp.entity = this;
        this.comps.push(comp);
        if (this.isInit) {
            comp.init();
        }
        return comp;
    }
    removeSelf() {
        this.isInit = false;
        for (const iterator of this.comps) {
            iterator.exit();
        }
        this.nodePool.push(this.node);
    }
    // destroySelf() {

    // }
    // protected _finishPromise: Promise<any> = null;
    // protected _finishResolve: Function = null;
    // public isInitFinish() {
    //     if (this.isInit) {
    //         return Promise.resolve();
    //     }
    //     if (this._finishPromise) {
    //         return this._finishPromise;
    //     }
    //     this._finishPromise = new Promise((resolve: Function, reject: Function) => {
    //         this._finishResolve = resolve;
    //     })
    //     return this._finishPromise;
    // }
    // public async isResLoadFinish() {
    //     if (this.conf) {
    //         var url = `db/${this.conf.atlasAsset}`;
    //     } else {
    //         var url = `db/${this.data.conf.atlasAsset}`;
    //     }
    //     CC_DEBUG && Log.trace("url", url);
    //     await App.ResManager.getResAsync(url, dragonBones.DragonBonesAtlasAsset);
    //     await App.ResManager.getResAsync(url, cc.Texture2D);
    // }
}

export enum Dir {
    Top,
    TopRight,
    Right,
    BottomRight,
    Bottom,
    BottomLeft,
    Left,
    TopLeft
}