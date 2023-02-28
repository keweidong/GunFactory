const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/BackgroundAdapter")
export default class BackgroundAdapter extends cc.Component {
    onLoad() {
        this.node.scale = cc.winSize.height / 1664;
        // this.node.scale = Math.max(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
        // let srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        // let realWidth = this.node.width * srcScaleForShowAll;
        // let realHeight = this.node.height * srcScaleForShowAll;

        // 2. 基于第一步的数据，再做缩放适配
        // this.node.scale = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);
    }
}