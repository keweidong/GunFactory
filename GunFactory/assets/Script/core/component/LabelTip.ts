import NodePool from "../utils/NodePool";
const { ccclass, property, menu, executeInEditMode } = cc._decorator;
/**
 * 飘字label
 */
@ccclass
@menu("UI/LabelTip")
@executeInEditMode
export default class LabelTip extends cc.Component {
    /**是否自动销毁 */
    protected isAutoDestroy: boolean;
    public tween: cc.Tween<Node>;
    protected pool: NodePool = null;
    @property(cc.Label)
    protected label: cc.Label = null;

    @property()
    protected paddingX: number = 0;
    /**
     * 从左到右出现
     * @param isAutoDestroy:是否自动销毁
     */
    public leftToRight(isAutoDestroy: boolean = true, delay: number = 1) {
        this.isAutoDestroy = isAutoDestroy;
        this.node.opacity = 0;
        this.node.x = -cc.winSize.width / 2;
        this.node.y = 0;
        let tween = cc.tween(this.node)
            .to(0.3, { x: -50, opacity: 255 }, { easing: "sineInOut" })
            .to(delay, { x: 50 })
            .to(0.3, { x: cc.winSize.width / 2 }, { easing: "sineIn" })
            .call(this.showFinish.bind(this))
            .start();
        return tween;
    }
    init(parent: cc.Node, str: string, pool?: NodePool, size = 40) {
        this.pool = pool;
        parent.addChild(this.node);
        this.label.fontSize = size;
        this.label.string = str;
        return this;
    }
    /**
     * 从小到大
     */
    public showTipSmallToBig(isAutoDestroy: boolean = true) {
        this.isAutoDestroy = isAutoDestroy;
        this.node.opacity = 0;
        this.node.x = 0;
        this.node.y = 0;
        this.node.scale = 0;
        this.tween = cc.tween(this.node)
            .to(0.2, { scale: 1, opacity: 255 })
            .delay(0.8)
            .to(0.5, { opacity: 0 })
            .call(this.showFinish.bind(this))
            .start();
    }

    public flyUp(x: number, y: number, isAutoDestroy: boolean = true) {
        // this.node.x = x;
        this.isAutoDestroy = isAutoDestroy;
        this.node.y = y;
        this.node.x = x;
        this.node.opacity = 255;
        // this._forceUpdateRenderData(true);//todo 后续看有没有更好的处理方式,这个有可能会有性能问题
        cc.tween(this.node)
            .to(1.9, { y: this.node.y + 200, opacity: 0, })
            .call(this.showFinish.bind(this))
            .start();
    }

    protected showFinish() {
        this.tween = null;
        if (this.isAutoDestroy) {
            this.destroyLab();
        }
    }
    public destroyLab() {
        if (this.pool) {//有对象池回收到对象池
            this.pool.push(this.node);
            this.pool = null;
        } else {
            this.node.removeFromParent();
            this.node.destroy();
        }
    }
}