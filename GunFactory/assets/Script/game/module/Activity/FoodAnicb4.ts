


const colorWidth = 235

const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodAnicb4 extends cc.Component {
    ani: cc.Animation = null;
    onLoad() {
        this.ani = this.node.getComponent(cc.Animation);
        // this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }
    dianhuoFinish() {
        this.ani.play("huoer_2");
    }
}