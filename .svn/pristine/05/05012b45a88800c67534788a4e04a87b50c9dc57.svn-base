import App from "../../../../../core/App";
import { ControllerConst } from "../../../../consts/ControllerConst";
import { GameNotificationConst, NotificationConst } from "../../../../consts/NotificationConst";
import { ViewConst } from "../../../../consts/ViewConst";
import { HappyConst } from "../../../Happy/HappyConst";
import { OpenConst, OpenTypeConst } from "../../../SystemOpen/SystemOpenConst";
import { FoodType } from "./food/FoodMsr";
import Chef from "./role/chef/Chef";
import Customer from "./role/Customer";
import Waiter from "./role/waiter/Waiter";
import ScenegZone from "./SceneZone";
/**
 * 订单管理器
 */
export class OrderMsr {
    /**当前待处理烧烤列表 */
    public orderList: IOrder[] = [];

    /**当前待处理特色烧烤列表 */
    public featureOrderList: IOrder[] = [];

    // /**已完成各种特色菜式数量 */
    // public finishFeatureOrderList: {
    //     /**完成的分数 */
    //     score: number;
    //     /**菜式id */
    //     id: number;
    // }[] = null;

    public saveData: OrderSaveData = null;

    /**已完成菜式列表 */
    public finishOrder: IOrder[] = [];

    protected static _createCnt: number = 0;

    /**待配送菜式列表 */
    public waitDeliverOrders: IOrder[] = [];
    /**下一次可创建特殊订单的时间 */
    protected _nextFeatureFoodTime: number = Number.MAX_VALUE;
    public isFeatureFoodOpen: boolean = false;

    protected featureFood: FeatureFoodGlobalConf = null;
    constructor(public scene: ScenegZone) {
        this.featureFood = App.ConfigManager.gameConf.featureFood;
    }
    public checkFeatureFoodIsOpen() {
        let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FEATURE_FOOD);
        if (isOpen) {
            this.enableCreateFeatureFood();
        } else {
            App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.updateSystemOpen, this);
        }
    }
    public destroy() {
        App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.updateSystemOpen, this);
    }
    // public onDestro
    /**
     * 能不能制作特色菜
     */
    public isCanCreateFeatureFood() {
        return this.featureFood.createCnt > OrderMsr._createCnt;
    }
    public newOpen() {
        // this.saveData.orders = [];
        this.saveData = {
            orders: [],
            createCnt: 0
        }
    }
    /**
     * 更新系统开放
     * @param sysIndex 系统id
     * @param isOpen 是否开启
     */
    protected updateSystemOpen(sysIndex: OpenTypeConst, isOpen: boolean) {
        if (sysIndex === OpenTypeConst.FEATURE_FOOD && isOpen) {
            App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.updateSystemOpen, this);
            this.enableCreateFeatureFood();
        }
    }
    // protected _nextFeatureFoodTime: number = Date.now() + 10000;
    public addOrder(order: IOrder) {
        this.orderList.push(order);
        this.scene.gameView.orderTable.updateOrder(this.orderList);
        this.cookFood();
    }
    public enableCreateFeatureFood() {
        if (this.isFeatureFoodOpen) {
            return;
        }
        CC_DEBUG && Log.trace("特色菜已经开启");
        this.isFeatureFoodOpen = true;
        this._nextFeatureFoodTime = Date.now() + this.featureFood.time;
    }
    /**
     * 随机创建一个菜式订单
     * @param customer 
     */
    public createRandomOrder(customer: Customer) {
        //随机获取一个菜式
        let food = App.RandomUtils.randomArray(this.scene.foodMsr.openFoods);
        let order: IOrder = {
            food,
            customer,
            waiter: null,
            isFinish: false,
        }
        return order;
    }
    /**
     * 创建一个特色菜订单
     * @param customer 
     */
    public createFeatureFoodOrder(customer: Customer) {
        let food = App.RandomUtils.randomArray(this.scene.foodMsr.featureFoods);
        let order: IOrder = {
            food,
            customer,
            waiter: null,
            isFinish: false
        }
        return order;
    }

    /**
     * 创建一个订单
     * @param customer 
     */
    public createOrder(customer: Customer) {
        if (
            Date.now() > this._nextFeatureFoodTime &&
            this.featureOrderList.length < 1
        ) {//能不能创建特殊订单

            // if (this.finishFeatureOrder.length) {//如果有已经做好的特殊菜,直接用已经做好的
            //     let order = this.finishFeatureOrder.pop();
            //     this.scene.gameView.featureFoodTable.removeOrder(order);
            //     order.customer = customer;
            //     return order;
            // }
            let order: IOrder = this.createFeatureFoodOrder(customer)
            this.featureOrderList.push(order);
            return order;
        }
        return this.createRandomOrder(customer);
    }

    /**
     * 菜式完成
     * @param order 
     */
    public async finishCook(order: IOrder) {
        await this.scene.gameView.dishTable.addOrder(order);
        this.finishOrder.push(order);//放入完成菜式列表
        this.waitDeliverOrders.push(order);//放入待配送菜式列表
        this.cookFood();
        App.NotificationCenter.dispatch(GameNotificationConst.ORDER_COOK_FINISH, order);
    }
    /**
     * 移除完成的菜式订单
     * @param order 
     */
    public removeFinishOrder(order: IOrder) {
        this.finishOrder.remove(order);//todo 加入对象池
        this.scene.gameView.dishTable.removeOrder(order);
    }
    /**
     * 给顾客下单
     * @param order 
     */
    public order(order: IOrder) {
        let roleMsr = this.scene.roleMsr;
        roleMsr.waitOrderList.remove(order.customer);//从等待点餐列表移除
        order.customer.isWaitFood = true;
        order.customer.resetAngryTime();
        order.customer.isWaitOrder = false;

        if (order.food.foodType === FoodType.NORMAL) {//普通菜式
            if (order.waiter) {//
                order.waiter.order = null;
                order.waiter = null;
            }
            order.customer.isWaitFood = true;
            order.customer.resetAngryTime();
            order.customer.isWaitOrder = false;
            roleMsr.waitOrderList.remove(order.customer);//从等待点餐列表移除

            let x = roleMsr.gameView.tablePos.dishTable.x + 60;
            let y = roleMsr.gameView.tablePos.dishTable.y + 50;
            let time = App.MathUtils.getDistance(
                x,
                y,
                order.customer.orderBox.x,
                order.customer.orderBox.y
            ) * 0.0013;
            cc.tween(order.customer.orderBox)//播放飘菜单动画
                .parallel(
                    cc.tween().to(
                        time, {
                        x,
                        y,
                        scale: 0.4
                    }).call(() => {
                        cc.Tween.stopAllByTarget(order.customer.orderBox)
                        order.customer.orderBox.angle = 0;
                        this.addOrder(order);//将菜式放入菜式订单列表
                        order.customer.hideOrderBox();
                    }),
                    cc.tween().by(0.6, {
                        angle: 360
                    }).repeatForever()
                )
                .start();
        } else {
            order.customer.hideOrderBox();
            if (order.isFinish) {
                this.scene.roleMsr.createFeatureWaiter(order);
            } else {
                let id = order.food.getId();
                if (this.saveData.orders.length) {//如果有已经完成的,使用已经完成的
                    let orderData = this.saveData.orders.pop();
                    order.score = orderData.score;
                    this.scene.gameView.featureFoodTable.updateOrderCnt(this.saveData.orders.length);
                    this.scene.roleMsr.createFeatureWaiter(order);
                } else {//如果没有完成的菜式,那么弹出制作页面
                    App.ViewManager.open(ViewConst.FoodActView, order);
                }
            }
        }
    }
    /**
     * 完成了一个订单
     */
    public finishFeatureFood(order: IOrder) {
        if (order.customer) {//如果这个订单是属于某个顾客的,给顾客送去
            this.scene.roleMsr.createFeatureWaiter(order);
            this._nextFeatureFoodTime = Date.now() + this.featureFood.time;
        } else {//如果不是,把菜存起来
            this.saveData.orders.push({
                score: order.score,
                id: order.food.getId()
            });
            OrderMsr._createCnt++;
            this.scene.gameView.featureFoodTable.updateOrderCnt(this.saveData.orders.length);
        }
    }
    /**点击关闭特色菜窗口后,设定下次的时间 */
    public closeTheFeatureFoodView() {
        //手动关闭特色菜界面,设置下次特色菜时间,解决关闭特色菜界面马上又出现特色菜的bug
        this._nextFeatureFoodTime = Date.now() + this.featureFood.time;
    }
    /**
     * 送菜上桌
     * @param order 
     */
    public deliverFood(order: IOrder) {
        order.waiter.deliverFood();
        order.customer.isWaitFood = false;
        order.customer.isEatting = true;
        order.customer.tablePosData.foodImg.node.active = true;
        order.customer.tablePosData.beerImg.node.active = order.waiter.isBeer;
        App.CommonUtils.setSpriteFrame(order.food.getOrderIcon(), order.customer.tablePosData.foodImg);

        let addMoney = order.food.getAward(order, this.scene.buffList.FOOD_SELL_RATE);
        if (order.food.foodType === FoodType.FEATURE) {
            this.featureOrderList.remove(order);
            order.customer.tablePosData.foodImg.node.scale = 0.3;
        } else {
            const pos = order.customer.node.parent.convertToWorldSpaceAR(order.customer.node.position);
            App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.CREATE_HAPPY, pos, this.scene.gameView.layer, addMoney);//检查是否能够增加欢乐时光爱心
        }
    }
    public firstEnter() {
        this.checkFeatureFoodIsOpen();
    }
    /**
     * 检查有没有空闲的厨师可以烹饪订单
     */
    public cookFood() {
        if (this.orderList.length) {//如果当前有订单
            let chef = this.scene.chefMsr.getIdleChef();
            if (chef) {//有空闲的厨师
                // let order = this.orderList.shift();
                chef.startCook(this.orderList.shift());
                this.scene.gameView.orderTable.updateOrder(this.orderList);
                return true;
            }
        }
    }
    public createMemento(): OrderSaveData {

        return this.saveData;
    }
    public setMemento(data: OrderSaveData, isUpdateDayData: boolean) {
        if (data) {
            this.saveData = data;
            if (isUpdateDayData) {
                OrderMsr._createCnt = 0;
            } else {
                OrderMsr._createCnt = data.createCnt;
            }
        } else {
            this.saveData = {
                orders: [],
                createCnt: 0
            };
            // this.saveData.orders = [];
            // this._createCnt = 0;
        }
    }
}
declare global {
    interface OrderSaveData {
        /**完成的特色菜 */
        orders: {
            /**完成的分数 */
            score: number;
            /**菜式id */
            id: number;
        }[];
        /**今天制作了多少道特色菜 */
        createCnt: number;
    }
    /**
     * 订单对象
     */
    interface IOrder {
        // id: number;
        /**菜式 */
        food: IFood;
        /**订单顾客 */
        customer: Customer;
        waiter: Waiter;
        /**哪个厨师完成的 */
        chef?: Chef;
        isFinish?: boolean;
        score?: number;
    }
    interface GameConf {
        /**
        * 特色菜配置
        */
        featureFood: FeatureFoodGlobalConf
    }
    type FeatureFoodGlobalConf = {
        /**
         * 特色菜客人来访时间间隔
         */
        time: number;
        /**每天可以制作多少道特色菜 */
        createCnt: number;
    }
}