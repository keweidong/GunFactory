import NodePool from "../../core/utils/NodePool";
import LayerManager from "../LayerManager";
import { Locator } from "../module/guide/guide/Locator";
const { ccclass, property } = cc._decorator;
@ccclass
export default class HandGuide extends cc.Component {
    //目标节点
    protected targetNode: cc.Node = null;
    //是否在播动画
    public isPlayAni: boolean = false;

    public pool: NodePool = null;

    protected _ani: cc.Animation = null;
    onLoad() {
        this._ani = this.node.getComponent(cc.Animation);
    }

    find(value: string) {
        if (this.isPlayAni) {
            this._ani.stop();
        }
        let root = cc.director.getScene();
        Locator.locateNode(root, value, (error, node: cc.Node) => {
            if (error) {
                cc.log(error);
                return;
            }
            this.targetNode = node;
            let temp = node;
            do {
                temp = temp.parent;
            } while (temp);
            this.playAni();
        });
    }

    //播放动画
    protected playAni() {
        let pos = this.targetNode.parent.convertToWorldSpaceAR(this.targetNode.position);
        let parent = LayerManager.getLayer(LayerManager.UI_Main);
        if (!this.node.parent) {
            parent.addChild(this.node);
        }
        this.node.position = parent.convertToNodeSpaceAR(pos);
        this._ani.play();
        this.isPlayAni = true;
    }

    //播放完消失
    protected playOver() {
        this.isPlayAni = false;
        if (this.pool) {
            this.pool.push2(this.node, 3);
        } else {
            this.node.parent.removeChild(this.node, false);
            // this.node.destroy();
        }
    }
}
