import App from "../../core/App";
import NodePool from "../../core/utils/NodePool";
import Customer from "./GameMain/object/scene/role/Customer";

const { ccclass, property } = cc._decorator;
@ccclass
export default class NodePoolMsr extends cc.Component {
    public static instance: NodePoolMsr = null;

    /**金币效果对象池*/
    // @property(NodePool)
    // public coinEffect: NodePool = null;

    @property(NodePool)
    public moneyLabelAni: NodePool = null;

    @property(NodePool)
    public doubleMoneyLabelAni: NodePool = null;

    @property(NodePool)
    public flyLabel: NodePool = null;
    /** 暴击对象池 */
    // @property(NodePool)
    // public doubleMoney: NodePool = null;
    /** 人物对话框对象池 */
    // @property(NodePool)
    // public roleTalkPool: NodePool = null;

    /** 贡献值对象池 */
    // @property(NodePool)
    // public contribuPool: NodePool = null;
    /**
     * 飘字label
     */
    @property(NodePool)
    public labelTip: NodePool = null;

    @property(NodePool)
    public moneyTip: NodePool = null;

    @property(NodePool)
    itemPool: NodePool = null;

    /** 公告标题栏 */
    // @property(NodePool)
    // noticeItemPool: NodePool = null;

    @property({ type: NodePool, tooltip: "餐桌解锁节点对象池" })
    tableLockNodePool: NodePool = null;

    /**订单提示框 */
    @property({ type: NodePool, tooltip: "订单提示框" })
    orderBox: NodePool = null;

    /**网格显示节点对象池 */
    @property({ type: NodePool, tooltip: "网格显示节点对象池" })
    public gridCrossPool: NodePool = null;

    protected customerPool: NodePool[] = [];

    protected poolsPromise: { [key: string]: Promise<NodePool> } = {};
    // protected poolNameMap: { [key: string]: string } = {};
    constructor() {
        super();
        NodePoolMsr.instance = this;
        App.NodePoolMsr = this;
        // this.registerPool("", "");
    }
    // public registerPool(name: string, url: string) {
    //     this.poolNameMap[name] = url;
    // }
    public getPoolByUrl(url: string) {

        if (this.poolsPromise[url]) {
            return this.poolsPromise[url];
        }
        this.poolsPromise[url]
            = App.ResManager.getResAsync(url, cc.Prefab)
                .then((prefab: cc.Prefab) => {
                    const pool = new NodePool();
                    pool.prefab = prefab;
                    return pool;
                });
        return this.poolsPromise[url]
    }

    /**
     * 根据顾客id获取对象池
     * @param customerId 
     */
    public async getCustomerPool(customerId: number) {
        let armatureName = "customer_" + customerId;
        if (!this.customerPool[customerId]) {
            // var url = `db/Customer${customerId}_ske`;
            // var urlTex = `db/Customer${customerId}_tex`;
            let prefab: cc.Prefab = await App.ResManager.getResAsync("prefab/view/game/role/Customer", cc.Prefab);
            // let asset: dragonBones.DragonBonesAsset = await App.ResManager.getResAsync(url, dragonBones.DragonBonesAsset);
            // let atlasAsset: dragonBones.DragonBonesAtlasAsset = await App.ResManager.getResAsync(urlTex, dragonBones.DragonBonesAtlasAsset);
            let node = cc.instantiate(prefab);
            // node.getComponent(Customer).setDbData(asset, atlasAsset, armatureName)
            node.getComponent(Customer).setDbData(null, null, armatureName);
            this.customerPool[customerId] = new NodePool();
            this.customerPool[customerId].prefab = node;
            // this.customerPool[customerId].prefab = <any>node;
        }
        return this.customerPool[customerId];
    }
    protected _handGuidePoolPromise: Promise<NodePool> = null;
    /**
     * 获取手指引导对象池
     */
    public getHandGuidePool(): Promise<NodePool> {
        if (this._handGuidePoolPromise) {
            return this._handGuidePoolPromise;
        } else {
            this._handGuidePoolPromise
                = App.ResManager.getResAsync("prefab/view/component/HandGuide", cc.Prefab)
                    .then((prefab: cc.Prefab) => {
                        const _handGuidePool = new NodePool();
                        _handGuidePool.prefab = prefab;
                        return _handGuidePool;
                    });
            return this._handGuidePoolPromise;
        }
    }
}
