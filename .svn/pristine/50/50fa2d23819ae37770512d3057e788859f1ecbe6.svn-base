
const { ccclass, property } = cc._decorator;
const tempPos = cc.v2();
/**
 * 特色菜桌子
 */
@ccclass
export default class FeatureFoodTable extends cc.Component {
    @property(cc.Label)
    protected numLab: cc.Label = null;

    @property(cc.Node)
    public numBg: cc.Node = null;
    @property(cc.Sprite)
    public img: cc.Sprite = null;
    /**没被展示出来的订单列表 */
    // protected orders: IOrder[] = [];

    /**
     * @param order 
     */
    // addOrder(order: IOrder) {
    //     this.img.node.active = true;
    //     this.orders.push(order);
    //     App.CommonUtils.setSpriteFrame(order.food.getOrderIcon(), this.img);
    //     this.updateNotDisplayNode();
    // }
    public updateOrderCnt(orderCnt: number) {
        if (orderCnt) {
            this.numBg.active = true;
            this.numLab.string = orderCnt + "";
        } else {
            this.numBg.active = false;
        }
    }
    /**
     * 将菜式从展示桌子移除
     * @param order 
     */
    // public removeOrder(order: IOrder) {
    //     // this.orders.remove(order);
    //     this.updateNotDisplayNode();
    // }
    // onLoad() {
    //     // this.numBg.zIndex = 2;
    //     this.img = this.node.getChildByName("FoodImg").getComponent(cc.Sprite);
    // }
}