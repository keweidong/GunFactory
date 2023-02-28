
import { register } from "./Actions";
import SubTree from "./SubTree";

declare global {
    type TreeNodeData = {
        child: string;
        id: string;
        name: string;
        children: string[];
        /**节点类型 */
        category: string;
        title: string;
        description: string;
        display: {
            x: number;
            y: number;
        },
        properties: any;
    }
    type CustomNodeData = {
        version: string,
        scope: string,
        name: string,
        category: string,
        title: string,
        description: string,
        properties: any
    }
    type TreeData = {
        root: string;
        version: string;
        scope: string;
        id: string;
        title: string;
        description: string;
        properties: any;
        nodes: {
            [key: string]: TreeNodeData
        };
        display
        custom_nodes: CustomNodeData[];
    }
}
// console.log(b3)
export default class MyBehaviorTree extends b3.BehaviorTree {
    /**
     * 是否调试模式
     */
    public isDebug: boolean = false;
    load(data: TreeData, names) {
        names = names || {};

        this.title = data.title || this.title;
        this.description = data.description || this.description;
        this.properties = data.properties || this.properties;

        var nodes = {};
        var id, spec: TreeNodeData, node: b3.BaseNode;
        // Create the node list (without connection between them)
        for (id in data.nodes) {
            spec = data.nodes[id];
            var Cls;

            if (spec.name in names) {
                // Look for the name in custom nodes
                Cls = names[spec.name];
            }
            else if (spec.category === "tree") {//是不是子树节点
                Cls = SubTree;
            }
            else {
                // Invalid node name
                throw new EvalError('BehaviorTree.load: Invalid node name + "' +
                    spec.name + '".');
            }

            node = new Cls(spec.properties);
            node.id = spec.id || node.id;
            node.name = spec.name;
            node.title = spec.title || node.title;
            node.description = spec.description || node.description;
            node.properties = spec.properties || node.properties;

            nodes[id] = node;
        }

        // Connect the nodes
        for (id in data.nodes) {
            spec = data.nodes[id];
            node = nodes[id];
            if (node.category === b3.COMPOSITE && spec.children) {
                for (var i = 0; i < spec.children.length; i++) {
                    var cid = spec.children[i];
                    node.children.push(nodes[cid]);
                }
            } else if (node.category === b3.DECORATOR && spec.child) {
                node.child = nodes[spec.child];
            }
        }

        this.root = nodes[data.root];
    }
    tick(target: Object, blackboard: b3.Blackboard): b3.STATE {
        if (this.isDebug) {
            CC_DEBUG && console.group(this.title, ":", this.id);
            var result = super.tick(target, blackboard);
            CC_DEBUG && console.groupEnd();
        } else {
            var result = super.tick(target, blackboard);
        }
        return result;
    }
}
if (CC_DEBUG) {
    let enter = b3.BaseNode.prototype._enter;
    b3.BaseNode.prototype.toString = function () {
        return this.title;
    }
    b3.BaseNode.prototype._enter = function (tick: b3.Tick) {
        enter.call(this, tick);
        if (tick.tree.isDebug) {
            if (this.category === "action" || this.category === "condition") {
                let str = ""
                let arrLen = tick._openNodes.length;
                for (let i = 0; i < arrLen; i++) {
                    let node = tick._openNodes[i];
                    str += "=>" + node;
                }
                console.log(str);
            }
        }
    }
}

//条件
register(b3.Inverter, "Inverter");
register(b3.Limiter, "Limiter");
register(b3.MaxTime, "MaxTime");
register(b3.RepeatUntilFailure, "RepeatUntilFailure");
register(b3.RepeatUntilSuccess, "RepeatUntilSuccess");
register(b3.Repeater, "Repeater");

//动作
register(b3.Error, "Error");
register(b3.Failer, "Failer");
register(b3.Runner, "Runner");
register(b3.Succeeder, "Succeeder");
register(b3.Wait, "Wait");

//控制器
register(b3.MemPriority, "MemPriority");
register(b3.MemSequence, "MemSequence");
register(b3.Priority, "Priority");
register(b3.Sequence, "Sequence");

export interface ITick extends b3.Tick {
    /**执行ai动画的对象 */
    target: any;
}
