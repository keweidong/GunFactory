
import BehaviorNodeProxy from "./BehaviorNodeProxy";
import BehaviorObjConf from "./BehaviorObjConf";
import Random from "./RandomAction";
import TreeNodeShape from "./TreeNodeShape";


const CategoryMap = {
    "Limiter": "decorator",
    "Inverter": "decorator",
    "MaxTime": "decorator",
    "RepeatUntilFailure": "decorator",
    "RepeatUntilSuccess": "decorator",
    "Repeater": "decorator",

    "MemPriority": "composite",
    "MemSequence": "composite",
    "Priority": "composite",
    "Sequence": "composite",

    "Error": "action",
    "FAILURE": "action",
    "Failer": "action",
    "Runner": "action",
    "Succeeder": "action",
    "Wait": "action",
}

// const RunningModeNode = [
//     "PlayCatAni",
//     "Move",
//     "PlayAni",
//     "MoveToWaitzone",
//     "FindAndMovetoFurniture",
// ]

const { ccclass, property, menu, executeInEditMode, playOnFocus } = cc._decorator;
@ccclass
@executeInEditMode
@playOnFocus
@menu("行为树/BehaviorTreeDraw")
export default class BehaviorTreeDraw extends cc.Component {
    @property({ type: BehaviorObjConf, tooltip: "动作配置" })
    protected behaviorObjConf: BehaviorObjConf = null;

    @property({ tooltip: "行为树数据", type: cc.JsonAsset })
    protected data: cc.JsonAsset = null;
    protected tree: b3.BehaviorTree = null;
    protected blackboard: b3.Blackboard = null;
    protected obj: any = null;

    @property({ tooltip: "动作默认持续时间" })
    public runningDefaultTime: number = 1500;
    protected drawNodeMap: Map<string, TreeNodeShape> = new Map();

    @property({ tooltip: "自动执行间隔时间" })
    playDelay: number = 500;

    @property
    protected _isAutoRun: boolean = false;
    @property({ tooltip: "是否自动执行行为树" })
    protected set isAutoRun(value: boolean) {
        this._isAutoRun = value;
    }
    protected get isAutoRun() { return this._isAutoRun; }
    protected nextPlayTime = 0;

    @property({ tooltip: "清理行为树" })
    protected set clearTree(value: boolean) {
        this.blackboard = new b3.Blackboard();
    }
    protected get clearTree() { return true; }

    protected _isDraw: boolean = false;
    @property
    protected set test(value: boolean) {
        this._isDraw = true;
        try { this.reDraw(); } catch (error) { cc.error(error) }
    }
    protected get test() { return true; }

    @property
    protected set debug(value: boolean) {
        try {
            this.drawNodeMap.forEach((value) => {
                value.reset();
            })
            this.tree.tick(this, this.blackboard)
        } catch (error) {
            cc.error(error)
        }
    }
    protected get debug() {
        return true;
    }
    protected reDraw() {
        if (!this.behaviorObjConf) {
            cc.error("没有配置动作配置数据behaviorObjConf")
            return;
        }
        this.node.removeAllChildren();
        if (this.data) {
            this.tree = new b3.BehaviorTree();
            let jsonData: TreeData = this.data.json;
            let proxyAction = {
                Random: Random
            };
            for (const iterator of jsonData.custom_nodes) {
                if (!proxyAction[iterator.name]) {
                    proxyAction[iterator.name] = BehaviorNodeProxy;
                }
            }
            this.tree.load(this.data.json, proxyAction);
        }
        this.blackboard = new b3.Blackboard();
        this.drawNodeMap = new Map();
        for (const iterator of this.node.children) {
            let treeNodeShape = iterator.getComponent(TreeNodeShape)
            this.drawNodeMap.set(treeNodeShape.nodeId, treeNodeShape);
        }
        let jsonData: TreeData = this.data.json;
        this.walkTree(this.tree.root, null, (node: BehaviorNodeProxy, parent: b3.BaseNode) => {
            let drawNode = this.drawNodeMap.get(node.id);
            let data = jsonData.nodes[node.id];
            if (!drawNode) {
                let ccnode = new cc.Node();
                ccnode.anchorX = 0;
                this.node.addChild(ccnode, 0, "TreeNodeShape");
                drawNode = ccnode.addComponent(TreeNodeShape);
                drawNode.nodeId = node.id;
                this.drawNodeMap.set(node.id, drawNode);
                drawNode.runningTime = this.runningDefaultTime;
                if (this.behaviorObjConf.runningActions.indexOf(data.name) > -1) {
                    drawNode.isRunningMode = true;
                }
            }
            node.treeNodeShape = drawNode;
            drawNode.category = CategoryMap[node.name];
            if (parent) {
                var parentData = jsonData.nodes[parent.id];
                var parentNode = this.drawNodeMap.get(parent.id)
            }
            for (const iterator of jsonData.custom_nodes) {
                if (iterator.name === node.name) {
                    drawNode.category = iterator.category;
                    break;
                }
            }
            drawNode.setData(data, parentData, parentNode);
        });
    }


    @property
    set calPos(value: boolean) {
        let jsonDAta: TreeData = this.data.json;
        this.treeNodeCnt = 0;
        this.treeDeep = 0;
        this.curY = 0;
        if (!this._isDraw) {
            this.test = true;
        }
        this.calXY(jsonDAta.root, this.data.json, 0, 0);
        for (const key in jsonDAta.nodes) {
            jsonDAta.nodes[key].display.y -= (this.curY / 2)
        }
        let treeStr = JSON.stringify(jsonDAta);
        let newtree: TreeData = JSON.parse(treeStr);

        // cc.log(JSON.stringify(jsonDAta));
        this.changeToRelease(newtree)
        this.test = true;
    }
    get calPos() {
        return true;
    }

    protected changeToRelease(newtree: TreeData) {
        for (const key in newtree.nodes) {
            delete newtree.nodes[key].display;
            delete newtree.nodes[key].description;
            delete newtree.nodes[key].title;
        }
        delete newtree.custom_nodes;
        delete newtree.title;
        delete newtree.description;
        delete newtree.scope;
        delete newtree.display;
        delete newtree.version;
        cc.log(JSON.stringify(newtree))
    }

    protected treeNodeCnt = 0;
    protected treeDeep = 0;
    protected curY = 0;
    @property({ tooltip: "两个节点之间的X轴距离" })
    protected pX = 200;
    @property({ tooltip: "两个节点之间的Y轴距离" })
    protected pY = 70;
    @property({ tooltip: "两个节点树之间的Y轴距离" })
    protected treeY = 10;
    protected calXY(key: string, data: TreeData, x: number, y: number) {
        let node = data.nodes[key];
        // let drawNode = this.drawNodeMap.get(key);
        node.display.x = x;
        if (node.children) {
            for (const iterator of node.children) {
                this.calXY(iterator, data, x + this.pX, y);
            }
            node.display.y = (data.nodes[node.children[0]].display.y + data.nodes[node.children[node.children.length - 1]].display.y) / 2;
            this.curY += this.treeY;
        } else if (node.child) {
            this.calXY(node.child, data, x + this.pX, y);
            node.display.y = data.nodes[node.child].display.y;
            this.curY += this.treeY;
        } else {
            this.treeNodeCnt++;
            node.display.y = this.curY;
            this.curY += this.pY;
            return;
        }

    }
    onLoad() {
        let temp = b3.BaseNode.prototype._execute;
        let self = this;
        b3.BaseNode.prototype._execute = function (tick: b3.Tick) {
            let result = temp.call(this, tick);
            let node: b3.BaseNode = this;
            let drawnode = self.drawNodeMap.get(node.id);
            if (drawnode) {
                let isOpen = tick.blackboard.get('isOpen', tick.tree.id, node.id);
                drawnode.setPlayStatu(isOpen);
            }
            return result;
        }

    }


    update() {
        if (this.isAutoRun) {
            if (Date.now() >= this.nextPlayTime) {
                this.nextPlayTime = Date.now() + this.playDelay;
                this.debug = true;
            }
        }
    }

    protected walkTree(node: b3.BaseNode, parent: b3.BaseNode, callBack: (node: b3.BaseNode, parent: b3.BaseNode) => void) {
        callBack(node, parent);
        if (node.child) {
            this.walkTree(node.child, node, callBack);
        } else if (node.children) {
            for (const iterator of node.children) {
                this.walkTree(iterator, node, callBack);
            }
        }
    }

}