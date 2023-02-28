import NodePool from "./NodePool";

const { ccclass, property, menu, executeInEditMode, playOnFocus } = cc._decorator;
@ccclass
@menu("tool/DBAni")
@executeInEditMode
@playOnFocus
export default class DBAni extends cc.Component {
    public arm: dragonBones.ArmatureDisplay = null;
    public nodePool: NodePool = null;
    public static anis:dragonBones.ArmatureDisplay[] = [];
    onLoad() {
        this.arm = this.getComponent(dragonBones.ArmatureDisplay);
        DBAni.anis.push(this.arm);
        // this.arm.
        // dragonBones.WorldClock
        this.arm.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    protected index: number = 0;
    protected onTouchEnd() {
        let arrLen = DBAni.anis.length;
        for(let i = 0; i < arrLen; i++){
            DBAni.anis[i].armatureName = "customer_waiter3";
        }
        // let names = this.arm.getArmatureNames();
        // if (this.index >= names.length) {
        //     this.index = 0;
        // }
        // this.arm.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.PRIVATE_CACHE);
        // CC_DEBUG && Log.trace("onTouchEnd:", names[this.index], this.arm.armatureName);
        // this.arm.armatureName = names[this.index++];
    }
    /**
    播放指定的动画.播放完自动销毁
    animName 指定播放动画的名称。
    playTimes 指定播放动画的次数。
    -1 为使用配置文件中的次数。
    0 为无限循环播放。
    >0 为动画的重复次数。
    @param animName animName
    @param playTimes playTimes
    */
    // playAnimationOnce(animName: string, playTimes: number): dragonBones.AnimationState {
    //     this.arm.once(dragonBones.EventObject.COMPLETE, this.onComplete, this);

    //     return this.arm.playAnimation(animName, playTimes);
    // }
    // update(tick) {
    //     this.arm.armature().clock.advanceTime(tick)
    // }
    // onDestroy() {
    //     Log.trace("DBAni:销毁");
    //     this.arm.off(dragonBones.EventObject.COMPLETE, this.onComplete, this);
    //     this.nodePool = null;
    // }
    // protected onComplete() {
    //     if (this.nodePool) {
    //         this.nodePool.push(this.node);
    //         this.nodePool = null;
    //     }
    // }
}