

import { Actions, register } from "./Actions";
import BaseAction from "./BaseAction";
import MyBehaviorTree, { ITick } from "./BehaviorTree";
export default class SubTree extends BaseAction {
    /**
     * 用于加载子树的方法
     */
    private static subTreeLoadFunc: (subTree: SubTree) => b3.BehaviorTree;
    /**
     * 设置加载子树的方法
     * @param func 
     */
    public static setSubTreeLoadFunc(func: (subTree: SubTree) => b3.BehaviorTree) {
        this.subTreeLoadFunc = func;
    }
    /**属性参数*/
    protected _properties: { path: string; };
    set properties(value: { path: string; }) {
        this._properties = value;
        if (this._properties.path) {
            SubTree.subTreeLoadFunc(this);
        }
    }
    get properties() {
        return this._properties;
    }
    // public loadRemote(url: string): Promise<any> {
    //     return new Promise((resolve: Function, reject: Function) => {
    //         cc.loader.load({ url: "https://wxclient.gzqidong.cn/gameConf/CatCafe/" + versionInfo.packVersion + "/" + url + ".json?v=" + Date.now(), type: 'text' }, function (err, texture) {
    //             if (err) {
    //                 Log.error("loadRemote:", err)
    //                 reject(err);
    //             } else {
    //                 resolve(texture)
    //             }
    //         });
    //     })
    // }
    // protected async loadSubTree() {
    //     if (this._properties.path) {
    //         let treeData = cc.loader.getRes("BehaviorData/" + this._properties.path, cc.JsonAsset);
    //         if (treeData) {
    //             this.loadDataFinish(null, treeData.json)
    //         } else {
    //             CC_DEBUG && Log.trace("开始加载子树:", this._properties.path)
    //             if (Platform.instance.isGetRemoteRes()) {
    //                 var conf = await this.loadRemote(`${this._properties.path}`);
    //                 this.loadDataFinish(null, JSON.parse(conf))
    //             } else {
    //                 var jsonData: cc.JsonAsset = await App.ResManager.getResAsync(`BehaviorData/${this._properties.path}`);
    //                 this.loadDataFinish(null, jsonData.json);
    //             }
    //         }
    //     }
    // }
    protected loadDataFinish(json) {
        this.tree = new MyBehaviorTree();
        this.tree.load(json, Actions);
        CC_DEBUG && Log.trace("加载子树完成", this._properties.path);
    }

    protected tree: b3.BehaviorTree = null;
    open(tick: ITick): void {
    }
    tick(tick: ITick): b3.STATE {
        if (this.tree) {
            return this.tree.tick(tick.target, tick.blackboard)
        }
        return b3.RUNNING;
    }
    protected interrupt(tick: ITick) {
        let lastNode = tick.blackboard.get("openNodes", this.tree.id);
        if (!lastNode) {
            return;
        }
        let tree = tick.tree;
        tick.tree = this.tree;//将tick的树换为子树,防止通过黑板获取数据的时候,树的id错误导致取不到数据
        for (let i = 0; i < lastNode.length; i++) {
            let node = lastNode[i];
            node._close(tick);
            if (node.interrupt) {
                node.interrupt(tick);
            }
        }
        tick.tree = tree;
    }
    // close(tick: ITick): void {
    // }
}
register(SubTree, "SubTree");