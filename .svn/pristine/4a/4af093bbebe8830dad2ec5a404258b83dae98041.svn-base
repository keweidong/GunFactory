import App from "../../../../../../core/App";
import { GameNotificationConst } from "../../../../../consts/NotificationConst";
import { ITick } from "../../../behavior/B3Tree";
import { GameUtils } from "../../../GameUtils";
import { StarData } from "../config/StarDataMsr";
import MoveComponent from "./component/MoveComponent";
import Customer from "./Customer";
import Waiter from "./waiter/Waiter";

const tempPos = cc.v2();
const { ccclass, property } = cc._decorator;
@ccclass
export default class Star extends Customer {
    protected waiters: Waiter[] = [];
    /**所有的订单列表 */
    protected orders: IOrder[] = [];
    conf: StarData = null;


    protected isWaiterMove: boolean = false;
    createSendFoodWaiter(cnt: number) {
        let sendFoodPos = this.tablePosData.waiter;
        for (let i = 0; i < cnt; i++) {
            if (this.orders.length) {
                let waiter = this.roleMsr.createStarWaiter(this.orders.pop());
                waiter.node.x = 25 - this.waiters.length * 70;
                waiter.node.scaleX = -1;
                waiter.node.y = sendFoodPos.y;
                this.waiters.push(waiter);
            } else {
                break;
            }
        }
        // 
    }

    public setIsBeer(isBeer: boolean) {
        // if (this.isBeer === isBeer) {
        //     return;
        // }
        let arrLen = this.waiters.length;
        for (let i = 0; i < arrLen; i++) {
            this.waiters[i].setIsBeer(isBeer, false);
        }

        // this.isBeer = isBeer;
        // if (isBeer) {
        //     // this.dbNode.destroy();
        //     // this.dbNode.armatureName = null;
        //     // this.dbNode.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.PRIVATE_CACHE);
        //     this.dbNode.armatureName = "customer_waiter3";
        // } else {
        //     // this.dbNode.armatureName = null;
        //     // this.dbNode.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
        //     this.dbNode.armatureName = "customer_waiter1";
        // }
        // if (isAni) {
        //     this._enterAni.play();
        // }
    }

    init() {
        super.init();
        this.isWaiterMove = this.isWaitFood = false;
        // this.isEatting
        let openFoods = this.roleMsr.scene.foodMsr.openFoods;
        let orderCnt = 20;
        this.dbNode.armatureName = `chustomer_star${this.conf.modelId}`;
        for (let i = 0; i < orderCnt; i++) {
            this.orders.push({
                /**菜式 */
                food: App.RandomUtils.randomArray(openFoods),
                /**订单顾客 */
                customer: this,
                waiter: null,
            });
        }
        App.TimerManager.doTimer(1000, 0, this.addCustomerTimer, this);//每秒增加一个客人
    }
    protected addCustomerTimer() {
        this.roleMsr.addWaitCreateCustomerCnt(1);
    }
    public eatFinish() {
        let waiter = this.waiters.shift();
        waiter.order.food.getAward(waiter.order, this.roleMsr.scene.buffList.FOOD_SELL_RATE + this.conf.rate);
        waiter.deliverFood();
        let pos = GameUtils.convertXYToCell(waiter.node.x, waiter.node.y);
        let paths = waiter.move.getPathByAstar(pos.x, pos.y, 16, pos.y);
        let tween = waiter.move.moveByTween(paths);
        tween.call(waiter.removeSelf.bind(waiter));
        tween.start();
    }
    public removeSelf() {
        this.roleMsr.scene.tableMsr.cleanTable(this.tablePosData);
        super.removeSelf();
        App.TimerManager.remove(this.addCustomerTimer, this);
        this.roleMsr.star = null;
        App.NotificationCenter.dispatch(GameNotificationConst.DESTORY_STAR, this);
    }
    public getFood() {
        if (this.isWaiterMove) {
            return b3.RUNNING;
        }
        if (this.isWaitFood) {
            this.isWaitFood = false;
            return b3.SUCCESS;
        }
        // this.isEatting = true;

        this.isWaiterMove = true;
        if (this.waiters.length < 4) {
            this.createSendFoodWaiter(4 - this.waiters.length);
        }
        if (this.waiters.length === 0) {
            return b3.FAILURE;
        }
        let paddingX = 70;
        let sendFoodPos = this.tablePosData.waiter;
        // let mapMsr = this.roleMsr.mapMsr;
        var tween: cc.Tween<any> = null;
        for (let i = this.waiters.length - 1; i >= 0; i--) {
            let waiter = this.waiters[i];
            let move: MoveComponent = waiter.move;
            move.Sp = Math.max(waiter.data.speed, 10);
            const targetX = sendFoodPos.x - i * paddingX;
            // GameUtils.convertXYToCell(sendFoodPos.x - i * paddingX, sendFoodPos.y, tempPos);
            // CC_DEBUG && Log.trace("sendFoodPos.x:", sendFoodPos.x);
            // let pos = GameUtils.convertXYToCell(waiter.node.x, waiter.node.y);
            // let paths = move.getPathByAstar(pos.x, pos.y, tempPos.x, tempPos.y);
            // paths.push(cc.v2(sendFoodPos.x - i * paddingX, sendFoodPos.y));
            // // tween = move.moveByTween(paths);
            tween = cc.tween(waiter.node);
            // let arrLen = paths.length;
            // for (let i = 0; i < arrLen; i++) {
            const distance = targetX - waiter.node.x;
            tween = tween.to(distance / move.Sp / 32, {
                x: targetX
            });
            waiter.playAnimation("walk_order", 0);
            if (i === 0) {
                tween.call(() => {
                    this.isWaitFood = true;
                    this.isWaiterMove = false;
                }).start();
            } else {
                tween.start();
            }
        }

        return b3.RUNNING;
    }
}

declare global {
    interface IStarTick extends ITick {
        /**执行ai动画的对象 */
        target: Star;
    }
}