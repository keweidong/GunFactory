import App from "../../../../../../../core/App";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("game/SortRole")
export default class SortRole extends cc.Component {
    @property({ type: cc.Node })
    public roleLayerList: cc.Node[] = [];
    // protected nextSortTime = 0;
    onEnable() {
        // cc.director.on(cc.Director.EVENT_BEFORE_DRAW, this.myUpdate, this)
        App.TimerManager.doTimer(1000 / 24, 0, this.myUpdate, this)
    }
    onDisable() {
        App.TimerManager.remove(this.myUpdate, this)

    }
    protected myUpdate(dt: number) {
        let arrLen = this.roleLayerList.length;
        for (let i = 0; i < arrLen; i++) {
            // this.roleLayerList[i].children.sort(this.sort);
            for (const child of this.roleLayerList[i].children) {
                child.zIndex = cc.macro.MAX_ZINDEX - child.y;
            }
        }
    }
    protected sort(node1: cc.Node, node2: cc.Node) {
        return (node2.y - node1.y) || (node2.x - node1.x);
    }
}