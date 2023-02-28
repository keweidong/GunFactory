import App from "../../../../../../core/App";

const { ccclass, property } = cc._decorator;
let tempPos = cc.v2();
/**
 * 存放食物的餐桌
 */
@ccclass
export default class DishTable extends cc.Component {
    @property(cc.Label)
    protected numLab: cc.Label = null;
    @property(cc.Node)
    public numBg: cc.Node = null;

    public imgs: cc.Sprite[] = [];
    /**没被展示出来的订单列表 */
    protected notDisplayOrders: IOrder[] = [];
    /**当前展示出来的订单列表 */
    protected displayOrders: IOrder[] = [];

    /**
     * 增加一个烹饪完成的菜式订单,如果当前桌子有空位可以摆放就摆放到空位上
     * 没有的话会放入未展示订单列表里面,等有了空位再摆放出来
     * @param order 
     */
    addOrder(order: IOrder) {
        return new Promise((resolve: Function, reject: Function) => {
            let index = this.getEmpPos();
            if (index > -1) {//有空余的位置可以摆菜式
                let imgNode = this.imgs[index].node;
                this.displayOrders[index] = order;
                imgNode.active = true;
                App.CommonUtils.setSpriteFrame(order.food.getOrderIcon(), this.imgs[index]);
                tempPos.x = 0;
                tempPos.y = 50;
                order.chef.node.convertToWorldSpaceAR(tempPos, tempPos);
                imgNode.parent.convertToNodeSpaceAR(tempPos, tempPos);
                let time = App.MathUtils.getDistance(
                    tempPos.x,
                    tempPos.y,
                    imgNode.x,
                    imgNode.y
                ) * 0.0013;
                cc.tween(imgNode)
                    .to(time, {
                        x: imgNode.x,
                        y: imgNode.y
                    })
                    .call(resolve)
                    .start();
                imgNode.position = tempPos;
            } else {
                this.notDisplayOrders.push(order);
                this.updateNotDisplayNode();
                resolve();
            }
        })


    }
    protected updateNotDisplayNode() {
        if (this.notDisplayOrders.length) {
            this.numBg.active = true;
            this.numLab.string = this.notDisplayOrders.length + "";
        } else {
            this.numBg.active = false;
        }
    }
    /**
     * 将菜式从展示桌子移除
     * @param order 
     */
    public removeOrder(order: IOrder) {
        for (let i = 0; i < this.displayOrders.length; i++) {//先查找是不是展示区域的菜式
            if (this.displayOrders[i] === order) {
                if (this.notDisplayOrders.length) {//如果未展示区域存在菜式,把菜式展示出来
                    let newDisOrder = this.notDisplayOrders.shift();
                    this.displayOrders[i] = newDisOrder;
                    App.CommonUtils.setSpriteFrame(newDisOrder.food.getOrderIcon(), this.imgs[i]);
                    this.updateNotDisplayNode();
                    return;
                }
                this.imgs[i].node.active = false;
                this.displayOrders[i] = null;
                return;
            }
        }
        this.notDisplayOrders.remove(order);
        this.updateNotDisplayNode();
        // if(this.displayOrders.indexOf(order))
    }
    protected getEmpPos() {
        for (let i = 0; i < 3; i++) {
            if (!this.imgs[i].node.active) {
                return i;
            }
        }
        return -1;
    }
    onLoad() {
        this.numBg.zIndex = 2;
        let tempNode = this.node.getChildByName("DishImg");
        this.imgs[0] = tempNode.getComponent(cc.Sprite);
        let x = tempNode.x;
        this.numBg.active = false;
        for (let i = 1; i < 5; i++) {
            x += 50;
            let img = cc.instantiate(tempNode);
            this.node.addChild(img);
            img.x = x;
            img.active = false;
            this.imgs[i] = img.getComponent(cc.Sprite);
        }
        tempNode.active = false;
    }
}