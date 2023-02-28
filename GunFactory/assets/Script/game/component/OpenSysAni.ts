import App from "../../core/App";
import EffectUtils from "../../core/utils/EffectUtils";
import { UI } from "../../core/utils/Image";
import { ItemType } from "../module/bag/BagConst";

const { ccclass, property } = cc._decorator;
@ccclass
export default class OpenSysAni extends cc.Component {
    @property(cc.Node)
    protected ani: cc.Node = null;
    @property(UI.Image)
    protected icon: UI.Image = null;
    @property(cc.Label)
    protected desc: cc.Label = null;


    protected boxAni: cc.Animation = null;
    protected data: SystemOpenData;

    /** 是否在播动画 */
    protected isPlaying: boolean = false;
    /** 是否在飘图标 */
    protected isMove: boolean = false;
    /** 图片是否飘完了 */
    protected isMoveFinish: boolean = false;
    protected tw: cc.Tween<any> = null;

    protected endPosList: cc.Vec2[] = [];
    /**当前播放动画的物品数据*/
    protected NowItemType: ItemType = null;
    // protected itemDisplay:
    onLoad() {
        this.icon.node.x = 0;
        this.icon.node.y = 0;
        this.icon.node.scaleX = this.icon.node.scaleY = 1;
        this.boxAni = this.ani.getComponent(cc.Animation);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchTap, this);
        this.boxAni.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }
    protected onAnimCompleted() {
        if (this.isPlaying) {
            this.isPlaying = false;
            // App.TimerManager.doTimer(2000, 1, this.playMoveIcon, this);
        }
    }
    protected onTouchTap() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.onAnimCompleted();
            this.ani.stopAllActions();
            this.boxAni.play("huodewp", 10);
            this.onTouchTap();
        }
        // else if (!this.isMove && !this.isMoveFinish) {
        //     // App.TimerManager.remove(this.playMoveIcon, this);
        //     // this.playMoveIcon();
        // } else if (this.isMove && !this.isMoveFinish) {
        //     if (this.tw) {
        //         this.tw.stop();
        //         this.tw.removeSelf();
        //         this.tw = null;
        //     }
        //     this.icon.node.x = this.data.pos.x;
        //     this.icon.node.y = this.data.pos.y;
        //     this.moveCb();
        // }
        else {
            if (!this.data) {
                return;
            }
            // Log.trace(this.data)
            if (this.data.func()) {
                this.data.func().apply(this.data.obj);
            }
            if (this.data.event) {
                App.NotificationCenter.dispatch(this.data.event, this.data.param);
            }
            this.close();
        }
    }


    protected close() {
        if (this.tw) {
            this.tw.stop();
            this.tw.removeSelf();
            this.tw = null;
        }
        if (this.node.parent) {
            this.node.removeFromParent(false);
        }

        this.isMoveFinish = false;
        this.isMove = false;
        this.isPlaying = false;
        this.data = null;
        this.desc.string = "";
        this.icon.node.x = 0;
        this.icon.node.y = 0;
        this.icon.node.scaleX = this.icon.node.scaleY = 1;
        EffectUtils.instance.queueExecutor.finishFunc();
    }

    // /** 播放飘图标动画 */
    // public playMoveIcon() {
    //     this.isMove = true;
    //     this.tw = cc.tween(this.icon.node)
    //         .to(1, {
    //             x: this.data.pos.x,
    //             y: this.data.pos.y,
    //             scaleX: 0.2,
    //             scaleY: 0.2,
    //         }, { easing: cc.easing.quadIn })
    //         .call(() => {
    //             this.moveCb();
    //         }
    //         )
    //         .start();
    //     // this.tw.start()
    // }

    // public moveCb() {
    //     this.isMove = false;
    //     this.isMoveFinish = true;
    //     if (this.data.func) {
    //         this.data.func.apply(this.data.obj);
    //     }
    //     if (this.data.event) {
    //         App.NotificationCenter.dispatch(this.data.event, this.data.param);
    //     }
    //     this.close();
    // }

    /** 播放解锁动画 */
    public play(data: SystemOpenData) {
        this.data = data;
        this.icon.source = data.icon;
        this.desc.string = data.desc;

        this.boxAni.play("huodewp");
        this.isPlaying = true;

        App.TimerManager.doTimer(2000, 1, this.onTouchTap, this);
    }


}