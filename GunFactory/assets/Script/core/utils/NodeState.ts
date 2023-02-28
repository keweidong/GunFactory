const { ccclass, property, executeInEditMode, menu } = cc._decorator;
function setEnumAttr(obj, propName, enumDef) {
    cc.Class.Attr.setClassAttr(obj, propName, 'type', 'Enum');
    cc.Class.Attr.setClassAttr(obj, propName, 'enumList', cc.Enum.getList(enumDef));
}
type NodeData = {
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    width?: number;
    height?: number;
    active?: boolean;
    angle?: number;
    opacity?: number;
    anchorX?: number;
    anchorY?: number;
}
let DefaultAnimsEnum = cc.Enum({ '<None>': 0 });
@ccclass
@executeInEditMode
@menu("UI/Nodestate")
export default class Nodestate extends cc.Component {
    @property({ type: [cc.String], editorOnly: true })
    protected _states: string[] = [];
    @property({
        type: DefaultAnimsEnum,
        tooltip: "当前状态",
        visible: true,
        editorOnly: true,
        displayName: "curState",

    })
    public _curState: number = 0;

    @property
    protected _saveStr: string = "";

    protected nodeStateCache: {
        [key: string]: NodeData
    } = {};

    @property({ type: cc.Node, tooltip: "可切换状态的节点列表" })
    _nodeList: cc.Node[] = [];
    @property({ type: cc.Node, tooltip: "可切换状态的节点列表" })
    public set nodeList(nodes: cc.Node[]) {
        try {
            let tailIndex = nodes.length - 1;
            // cc.log("/--------nodeList", this._tempNodeList && this._tempNodeList.length);
            if (nodes[tailIndex]) {
                for (let i = tailIndex - 1; i >= 0; i--) {
                    if (!nodes[i]) {
                        nodes.splice(i, 1);
                    }
                }
            }
            if (this._tempNodeList) {

                let arrLen = this._tempNodeList.length;
                for (let i = 0; i < arrLen; i++) {
                    let tempNode = this._tempNodeList[i];
                    if (tempNode && nodes.indexOf(tempNode) === -1) {//某个节点被删除了
                        this.removeNode(tempNode);
                    }
                }
                for (const _node of nodes) {
                    // node.active
                    // cc.log(node.active, Object.getOwnPropertyDescriptor(cc.Node.prototype, "x"));
                    if (_node && this._tempNodeList.indexOf(_node) === -1) {//新的节点
                        this.registerEvent(_node);
                        this.nodeStateCache[_node.uuid] = {};
                    }
                }
            }

            this._tempNodeList = nodes.concat();
        } catch (error) {
            cc.error(error)
        }
    }

    protected enterState(state) {
        
    }

    protected _tempNodeList: cc.Node[] = null;

    protected removeNode(node: cc.Node) {
        cc.log("removeNode", node);
        // for (const iterator of this.nodeStateCache) {
        // Object.defineProperty(node, "x", {
        //     get: null,
        //     set: null
        // });
        // }
        let temp = Object.getOwnPropertyDescriptor(cc._BaseNode.prototype, "active");
        Object.defineProperty(node, "active", {
            get: temp.get,
            set: temp.set
        });
        node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, node);
        node.off(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChanged, node);
        node.off(cc.Node.EventType.ANCHOR_CHANGED, this.onAnchorChanged, node);
        node.off(cc.Node.EventType.SCALE_CHANGED, this.onScaleChanged, node);
        node.off(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, node);
    }
    // protected temp
    protected registerEvent(node: cc.Node) {
        cc.log("registerEvent", node);
        node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, node);
        node.on(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChanged, node);
        node.on(cc.Node.EventType.ANCHOR_CHANGED, this.onAnchorChanged, node);
        node.on(cc.Node.EventType.SCALE_CHANGED, this.onScaleChanged, node);
        node.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, node);
        // cc.log(node.active, Object.getOwnPropertyDescriptor(cc.Node.prototype, "x"));
        let self = this;
        let temp = Object.getOwnPropertyDescriptor(cc._BaseNode.prototype, "active");
        Object.defineProperty(node, "active", {
            get: temp.get,
            set: function (newValue) {
                temp.set.call(this, newValue);
                self.onActiveChanged(node);
            }
        });
        // node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, this);
        // node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChanged, this);
    }
    protected onActiveChanged(node: cc.Node) {
        this.nodeStateCache[node.uuid].active = node.active;
        this._saveStr = JSON.stringify(this.nodeStateCache);
    }
    protected onSizeChanged() {
        // this.node.e
        let target = <any>this;
        this.nodeStateCache[target.uuid].width = target.width;
        this.nodeStateCache[target.uuid].height = target.height;
        // this._saveStr = 
        this._saveStr = JSON.stringify(this.nodeStateCache);
    }
    protected onScaleChanged() {
        let target = <any>this;
        this.nodeStateCache[target.uuid].scaleY = target.scaleY;
        this.nodeStateCache[target.uuid].scaleX = target.scaleX;
        this._saveStr = JSON.stringify(this.nodeStateCache);
    }
    protected onAnchorChanged() {
        let target = <any>this;
        this.nodeStateCache[target.uuid].anchorX = target.anchorX;
        this.nodeStateCache[target.uuid].anchorY = target.anchorY;
        this._saveStr = JSON.stringify(this.nodeStateCache);
    }
    protected onRotationChanged() {
        let target = <any>this;
        this.nodeStateCache[target.uuid].angle = target.angle;
        this._saveStr = JSON.stringify(this.nodeStateCache);
    }
    protected onPositionChanged(event: cc.Vec3) {
        let target = <any>this;
        this.nodeStateCache[target.uuid].x = target.x;
        this.nodeStateCache[target.uuid].y = target.y;
        this._saveStr = JSON.stringify(this.nodeStateCache);
    }

    public get nodeList(): cc.Node[] {
        return this._nodeList;
    }

    @property({
        editorOnly: true,
    })
    protected _addState: string = "";
    @property()
    protected set addState(value: string) {
        if (value.indexOf("@") > -1) {
            value = value.replace("@", "");
            this._addState = "";
            if (value) {
                if (this._states.indexOf(value) === -1) {
                    this._states.push(value);
                    this._updateAnimEnum();
                }
            }
        } else {
            this._addState = value;
        }
    }
    protected get addState() {
        return this._addState;
    }

    @property({
        editorOnly: true,
    })
    protected _removeState: string = "";
    @property()
    protected set removeState(value: string) {
        if (value.indexOf("@") > -1) {
            value = value.replace("@", "");
            this._removeState = "";
            if (this._states.remove(value)) {
                this._updateAnimEnum();
            }
        } else {
            this._removeState = value;
        }
    }
    protected get removeState() {
        return this._removeState;
    }

    __preload() {
        if (CC_EDITOR) {
            this._updateAnimEnum();
        }
    }

    onLoad() {
        if (CC_EDITOR) {
            if (this._saveStr) {
                this.nodeStateCache = JSON.parse(this._saveStr);
            }
            this._tempNodeList = this._nodeList.concat();
            for (const _node of this._nodeList) {
                if (_node) {//新的节点
                    this.registerEvent(_node);
                    if (!this.nodeStateCache[_node.uuid]) {
                        this.nodeStateCache[_node.uuid] = {};
                    }
                }
            }

            // Editor.assetdb.queryAssets('db://assets/resources/prefab/**\/*', 'prefab', function (error, results) {
            //     cc.log(results)
            //     // createAllLevelData(results);
            //     // results.forEach(function (result) {
            //     //     Editor.log('create-allMap:', result.uuid);
            //     // });
            // });
        }
        // cc.log(Editor,require("fs"))
        // if (!this._curState && this.states[0]) {
        //     this.curState = this.states[0];
        // }

    }
    _updateAnimEnum() {
        if (this._states.length) {
            cc.log("this._states:", this._states.join())
            let newEnum: any = {};
            let index = 0;
            for (const key of this._states) {
                newEnum[key] = index++;
            }
            setEnumAttr(this, '_curState', cc.Enum(newEnum));
            // setEnumAttr(this, '_curState', DefaultAnimsEnum1);
        } else {
            setEnumAttr(this, '_curState', DefaultAnimsEnum);
        }
        Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    }
    update() {
        if (CC_EDITOR) {

        }
    }
    checkChange(node: cc.Node) {
        let checkKey = [
            "x",
            "y",
            "scaleX",
            "scaleY",
            "width",
            "active",
            "rotation",
        ];
    }
}