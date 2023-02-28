const { ccclass, property, menu, executeInEditMode } = cc._decorator;
@ccclass
@menu("game/test/PathsDrawNode")
@executeInEditMode
export default class PathsDrawNode extends cc.Component {
    @property(cc.Graphics)
    protected graphics: cc.Graphics = null;

    protected drawList: cc.Vec2[] = [];
    onLoad() {
        let arrLen = this.node.childrenCount;
        for (let i = 0; i < arrLen; i++) {
            this.drawList.push(this.node.children[i].position);
        }
        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onChildAdded, this);
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildRemved, this);
        // cc.Node.EventType.POSITION_CHANGED
    }
    private onChildAdded() {
        
    }
    private onChildRemved() {

    }


    protected drawPaths() {
        this.graphics.clear();
        let arrLen = this.drawList.length;
        for (let i = 0; i < arrLen; i++) {
            let pos = this.drawList[i];
            this.graphics.circle(pos.x, pos.y, 10);
        }
    }
}