/**
 * 订单桌子
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class OrderTable extends cc.Component {
    @property(cc.Label)
    protected numLab: cc.Label = null;
    @property(cc.Node)
    protected numBg: cc.Node = null;
    protected imgs: cc.Sprite[] = [];
    protected foods: IOrder[] = [];
    updateOrder(foods: IOrder[]) {
        for (let i = 0; i < this.imgs.length; i++) {
            if (foods[i]) {
                this.imgs[i].node.active = true;
            } else {
                this.imgs[i].node.active = false;
            }
        }
        if (foods.length > this.imgs.length) {
            this.numBg.active = true;
            this.numLab.string = foods.length - this.imgs.length + "";
        } else {
            this.numBg.active = false;
        }
    }
    onLoad() {
        this.numBg.zIndex = 2;
        let tempNode = this.node.getChildByName("OrderImg");
        this.imgs[0] = tempNode.getComponent(cc.Sprite);
        let x = tempNode.x + 9;
        this.numBg.active = false;
        for (let i = 1; i < 5; i++) {
            let img = cc.instantiate(tempNode);
            this.node.addChild(img);
            img.x = x;
            x += 9;
            img.active = false;
            this.imgs[i] = img.getComponent(cc.Sprite);
        }
        tempNode.active = false;
    }
}