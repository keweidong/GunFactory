const { ccclass, property, executeInEditMode } = cc._decorator;
/**
 * 用于绘制一些点,方便在编辑器上面编辑路径
 */
@ccclass
@executeInEditMode
export default class DebugPoint extends cc.Component {
    onLoad() {
        // let draw = this.getComponent(cc.Graphics);
        // draw.circle(this.node.x, -this.node.y, this.node.width);
        // draw.lineWidth = 10;
        // draw.moveTo(100, 100);
        // draw.lineTo(300, 100);
        // draw.fillColor = new cc.Color(255, 255, 255, 100);
        // draw.close();
        // draw.stroke();
        // draw.fill();
        // cc.log("ddddd", this.node.width)
        // var ctx = this.node.getComponent(cc.Graphics);
        // ctx.lineCap = cc.Graphics.LineCap.ROUND;
        // ctx.lineWidth = 10;
        // ctx.moveTo(100, 100);
        // ctx.lineTo(300, 100);
        // ctx.fill();
    }
}