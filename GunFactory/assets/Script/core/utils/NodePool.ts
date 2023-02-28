const { ccclass, property } = cc._decorator;
@ccclass("NodePool")
export default class NodePool {
    protected _pool: cc.Node[] = [];
    protected createCnt: number = 0;
    @property(cc.Prefab)
    public prefab: cc.Prefab | cc.Node = null;
    public push(obj: cc.Node) {
        if (obj && this._pool.indexOf(obj) === -1) {
            obj.active = false;
            if (obj.parent) {
                obj.removeFromParent(false);
            }
            this._pool.push(obj);
        }
    }


    public push2(obj: cc.Node, maxCnt: number) {
        if (this._pool.length >= maxCnt) {
            obj.removeFromParent(true);
            obj.destroy();
        } else if (obj && this._pool.indexOf(obj) === -1) {
            obj.active = false;
            if (obj.parent) {
                obj.removeFromParent(false);
            }
            this._pool.push(obj);
        }
    }

    public pop(): cc.Node {
        if (this._pool.length === 0) {
            this.createCnt++;
            // if (CC_DEBUG) {
            //     cc.log(`创建了${this.createCnt}个${this.prefab.name}对象`)
            // }
            return cc.instantiate(this.prefab) as cc.Node;
        } else {
            let obj = this._pool.pop();
            // if (CC_DEBUG) {
            //     cc.log(`从缓存池获取对象:${this.prefab.name, obj.name}`)
            // }
            obj.active = true;
            return obj;
        }
    }
    /**
     * 初始化对象池
     * @param cnt 要预先创建的对象个数
     */
    public init(cnt: number) {
        this.createCnt += cnt;
        for (let i = 0; i < cnt; ++i) {
            this._pool.push(cc.instantiate(<cc.Prefab>this.prefab));
        }
    }
}