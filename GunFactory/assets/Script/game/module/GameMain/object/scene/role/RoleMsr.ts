import App from "../../../../../../core/App";
import LabelTip from "../../../../../../core/component/LabelTip";
import NodePool from "../../../../../../core/utils/NodePool";
import { RoleDataManager } from "../../../../../config/RoleDataManager";
import { RoleTalkDataManager } from "../../../../../config/RoleTalkDataManager";
import { GameNotificationConst, NotificationConst } from '../../../../../consts/NotificationConst';
import LayerManager from "../../../../../LayerManager";
import { BuffAttr } from "../../../../Buff/IBuff";
import NodePoolMsr from "../../../../NodePoolMsr";
import { GameUtils } from "../../../GameUtils";
import GameView from "../../../GameView";
import { CustomerDataMsr as CustomerDataMsr } from "../config/CustomerDataMsr";
import { StarDataMsr } from "../config/StarDataMsr";
import { WaiterDataMsr } from "../config/WaiterDataMsr";
import MapMsr from "../map/MapMsr";
import ScenegZone from "../SceneZone";
import WorldScene from "../WorldScene";
import AiComponent from "./component/AiComponent";
import Customer from "./Customer";
import Star from "./Star";
import Waiter from "./waiter/Waiter";
import { ControllerConst } from "../../../../../consts/ControllerConst";
import GameRecorderController from "../../../../ToutiaoGameRecorder/GameRecorderController";
import { GameRecorderConst } from "../../../../ToutiaoGameRecorder/GameRecorderConst";
import StartShowView from "../../../../StartEvent/StartShowView";

/**
 * 任务角色管理器,负责管理所有人物的逻辑
 */
export class RoleMsr {
    /**----------顾客 start----------------*/
    /**当前的顾客列表 */
    public curCustomers: Customer[] = [];
    /**顾客预制体对象池 */
    protected customerPools: NodePool[] = [];
    /**顾客配置数据 */
    public customerConf: CustomerDataMsr = null;
    /**最多多少顾客 */
    public maxCustomerCnt: number = 100;
    /**下一次创建顾客的时间 */
    public nextCustomerTime: number = 0;
    /**排队列表 */
    public rankList: Customer[] = [];

    /**等待聊天顾客列表 */
    public customerDatalist: number[] = [];

    /**
     * 等待创建的顾客数量,当排队人数超过四个之后,后面增加的顾客暂时不会创建
     * 这个参数是用来记录还有多少个顾客需要创建的
     */
    public waitCreateCusCnt: number = 0;

    /**等待点单顾客列表 */
    public waitOrderList: Customer[] = [];
    /**等待做菜顾客列表 */
    // public waitFoodList: Customer[] = [];
    /**吃东西顾客列表 */
    public eattingList: Customer[] = [];
    /**----------顾客 end----------------*/



    /**----------服务员 start----------------*/
    /**服务员对象池 */
    protected waiterPool: NodePool = null;

    /**特色菜服务员对象池 */
    protected featureWaiterPool: NodePool = null;

    // /**大胃王送菜服务员对象池 */
    // protected starWaiterPool: NodePool = null;

    /**当前的服务员列表 */
    public waiters: Waiter[] = [];
    /**顾客配置数据 */
    protected waiterConf: WaiterDataMsr = null;
    /**闲置的服务员列表 */
    public idleWaiters: Waiter[] = [null, null, null, null, null, null, null, null];
    /**----------服务员 start----------------*/

    /**-----------明星 start*/
    /**服务员对象池 */
    protected starPool: NodePool = null;
    /**明星配置数据 */
    public starConfs: StarDataMsr = null;

    public star: Star = null;
    /**-----------明星 end*/

    public mapMsr: MapMsr = null;
    /** 下一次创建对话框 */
    public nextTalkTime: number = 0;
    public curTick: number = 0;

    poolMsr: NodePoolMsr = null;

    public gameView: GameView = null;

    public world: WorldScene = null;
    public scene: ScenegZone = null;

    public conf: GameMainConf = null;

    public maxWaitCreateCnt: number = 26;

    /** 顾客配置管理器 */
    public roleConfigMsr: RoleDataManager;
    /** 对话配置管理器 */
    public roleTalkConfigMsr: RoleTalkDataManager;
    /** 矿场buff属性列表 */
    buffList: BuffAttr = null;

    public routineList: { routine: (dt?: number) => void }[] = [];


    /**储存明星id */
    public static id: Number = 0;

    public addRoutineObj(object: { routine: (dt?: number) => void }) {
        if (this.routineList.indexOf(object) === -1) {
            this.routineList.push(object);
        }
    }
    public removeRoutineObj(object: { routine: (dt?: number) => void }) {
        let index = this.routineList.indexOf(object);
        if (index > -1) {
            this.routineList.splice(index, 1);
        }
    }
    protected _enabled: boolean = false;
    public set enabled(value: boolean) {
        if (this._enabled === value) {
            return;
        }
        if (value) {
            this.onEnable();
        } else {
            this.onDisable();
        }
        this._enabled = value;

    }
    public get enabled() {
        return this._enabled;
    }


    public firstEnter() {
        this.poolMsr = NodePoolMsr.instance;
        this.roleConfigMsr = App.ConfigManager.getConfig("RoleDataManager");
        this.conf = App.ConfigManager.gameConf.game;
        this.customerConf = App.ConfigManager.getConfig("CustomerDataMsr");
        this.starConfs = App.ConfigManager.getConfig("StarDataMsr");
        this.waiterConf = App.ConfigManager.getConfig("WaiterDataMsr");
        this.maxWaitCreateCnt = this.scene.conf.maxWaitCreateCnt - 4;
        for (const cusId of this.scene.conf.customerList) {
            let cusData = this.customerConf.getData(cusId);
            App.NodePoolMsr.getCustomerPool(cusData.modelId).then((pool) => {
                this.customerPools.push(pool);
            });
        }
        // App.NodePoolMsr.getCustomerPool(0).then((pool) => {
        //     this.customerPools.push(pool);
        // });
        CC_DEBUG && Log.trace("App.NodePoolMsr.getPoolByUrl:", App.NodePoolMsr.getPoolByUrl);
        App.NodePoolMsr.getPoolByUrl("prefab/view/game/role/Waiter").then((pool: NodePool) => {
            this.waiterPool = pool;
        });

        App.NodePoolMsr.getPoolByUrl("prefab/view/game/role/FeatureWaiter").then((pool: NodePool) => {
            this.featureWaiterPool = pool;
        });
        App.NodePoolMsr.getPoolByUrl("prefab/view/game/role/Star").then((pool: NodePool) => {
            this.starPool = pool;
        });


        this.buffList = this.world.buffMsr.getKcBuffAttrList(this.scene.getId());
    }

    public onEnter() {
        CC_DEBUG && Log.trace("/------------roleMsr onEnter:");
        this.enabled = true;
    }

    public init(world: WorldScene) {
        this.world = world;
    }

    onEnable() {
        GameUtils.TimerManager.doFrame(2, 0, this.routine, this);
    }
    onDisable() {
        GameUtils.TimerManager.remove(this.routine, this);
    }

    /**
     * 移除一个在排队中的顾客
     * @param customer 
     */
    public removeRankCus(customer: Customer) {
        this.rankList.remove(customer);
        App.NotificationCenter.dispatch(GameNotificationConst.UPDATE_RANK_CNT);
    }
    /**
     * 拿到订单菜式
     * @param order 
     */
    public getFood(order: IOrder) {
        this.scene.orderMsr.removeFinishOrder(order);
        order.waiter.getFood();
    }

    public onExit() {
        this.enabled = false;
    }

    /**是否为第一个顾客 */
    protected static isFirstCreate: boolean = true;
    /**
     * 创建一个顾客
     */
    public createCustomer() {
        // if (this.curCustomers.length >= 1) {
        //     return;
        // }
        if (this.rankList.length >= 4) {
            return;
        }
        if (this.customerPools.length) {
            let confData = this.customerConf.getData(1);
            let pool = App.RandomUtils.randomArray(this.customerPools);
            let custNode = pool.pop();
            let customer = custNode.getComponent(Customer);
            customer.conf = confData;
            customer.data = {
                speed: this.conf.customer.speed * this.buffList.MOVE_SPEED,
                baseSpeed: this.conf.customer.speed
            };
            customer.roleMsr = this;
            customer.nodePool = pool;
            let rankPos = this.gameView.getRankPos();
            customer.node.position = rankPos;
            this.curCustomers.push(customer);
            this.gameView.roleLayer.addChild(custNode);
            customer.init();
            App.NotificationCenter.dispatch(GameNotificationConst.CREATE_CUSTOMER, customer);
            if (RoleMsr.isFirstCreate) {
                RoleMsr.isFirstCreate = false;
                App.TimerManager.doTimer(100, 1, () => {
                    customer.node.active = false;
                    customer.node.active = true;
                }, this);
            }
            return true;
        }
    }
    /**
     * 创建一个新手引导顾客
     */
    public createGuideCustomer() {
        let func = () => {
            if (this.customerPools.length) {
                let confData = this.customerConf.getData(0);
                let pool = App.RandomUtils.randomArray(this.customerPools);
                let custNode = pool.pop();
                let customer = custNode.getComponent(Customer);
                customer.conf = confData;
                customer.data = {
                    speed: this.conf.customer.speed * this.buffList.MOVE_SPEED,
                    baseSpeed: this.conf.customer.speed
                };
                customer.roleMsr = this;
                customer.nodePool = pool;
                let rankPos = this.gameView.getRankPos();
                customer.node.position = rankPos;
                this.curCustomers.push(customer);
                this.gameView.roleLayer.addChild(custNode);
                customer.init();
                return true;
            }
        };
        this.facList.push(func);
    }

    /**
    * 创建一个明星
    */
    public createStar(id: number = 0, isFirst?: boolean) {
        if (this.star) {
            return;
        }
        let func = () => {
            if (this.starPool && this.waiterPool) {
                let confData = this.starConfs.getData(id);
                let pool = this.starPool;
                let custNode = pool.pop();
                let star = custNode.getComponent(Star);
                star.conf = confData;
                star.data = {
                    speed: this.conf.customer.speed * this.buffList.MOVE_SPEED,
                    baseSpeed: this.conf.customer.speed
                };
                star.roleMsr = this;
                star.nodePool = pool;
                let rankPos = this.gameView.getRankPos();
                star.node.position = rankPos;
                // this.curCustomers.push(customer);
                this.gameView.roleLayer.addChild(custNode);
                star.init();

                star.nextRankIndex = 0;
                this.star = star;
                RoleMsr.id = id;
                App.NotificationCenter.dispatch(GameNotificationConst.CREATE_STAR, star);
                return true;
            }
        };
        this.facList.push(func);
        if (GameRecorderController.lupingType < 2 && StartShowView.isFirst && cc.sys.platform == cc.sys.TOUTIAO_GAME) {
            GameRecorderController.lupingType = 3;
            App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.START);
        }else{
            StartShowView.isFirst = true;
        }
    }

    public createStarWaiter(order: IOrder) {
        let confData = this.waiterConf.getData(1);
        let waiterNode = this.waiterPool.pop();
        let waiter = waiterNode.getComponent(Waiter);
        waiter.conf = confData;
        waiter.data = this.scene.waiterMsr.attrObj;
        waiter.roleMsr = this;
        waiter.nodePool = this.waiterPool;
        waiter.isBeer = null;
        // waiter.node.position = cc.v2(800, 570);
        // waiter.node.x = this.scene.gameView.tablePos.featureFoodTable.wx;
        // waiter.node.y = this.scene.gameView.tablePos.featureFoodTable.wy;
        this.gameView.roleLayer.addChild(waiterNode);
        waiter.setIsBeer(this.buffList.FOOD_SELL_RATE > 1, false);
        waiter.init();
        CC_DEBUG && Log.trace("this.buffList.FOOD_SELL_RATE:", this.buffList.FOOD_SELL_RATE);
        order.waiter = waiter;
        waiter.order = order;
        waiter.getFood();
        return waiter;
    }
    /**
     * 创建一个送特色菜的服务员
     */
    public createFeatureWaiter(order: IOrder) {
        this.facList.push(() => {
            if (this.featureWaiterPool) {
                let confData = this.waiterConf.getData(1);
                let waiterNode = this.featureWaiterPool.pop();
                let waiter = waiterNode.getComponent(Waiter);
                waiter.conf = confData;
                waiter.data = this.scene.waiterMsr.attrObj;
                waiter.roleMsr = this;
                waiter.nodePool = this.featureWaiterPool;
                // waiter.node.position = cc.v2(800, 570);
                waiter.node.x = this.scene.gameView.tablePos.featureFoodTable.wx;
                waiter.node.y = this.scene.gameView.tablePos.featureFoodTable.wy;
                this.gameView.roleLayer.addChild(waiterNode);
                waiter.addMyComponent(AiComponent);
                waiter.init();
                order.waiter = waiter;
                waiter.order = order;
                waiter.getFood();
                return true;
            }
            return false;
        });
    }


    /**
     * 创建一个服务员
     */
    public createWaiter(isAni: boolean) {
        if (this.waiters.length >= this.scene.waiterMsr.attrObj.cnt) {
            return true;
        }
        if (this.waiterPool) {
            let confData = this.waiterConf.getData(0);
            let waiterNode = this.waiterPool.pop();
            let waiter = waiterNode.getComponent(Waiter);
            waiter.conf = confData;
            waiter.data = this.scene.waiterMsr.attrObj;
            waiter.roleMsr = this;
            waiter.nodePool = this.waiterPool;
            let tempPos = this.gameView.getWaiterRankPos();
            let index = this.idleWaiters.indexOf(null);//找到一个空的位置
            this.idleWaiters[index] = waiter;
            // let pos = GameUtils.convertXYToCell(tempPos.x, tempPos.y - index * 60);
            // waiter.node.position = cc.v2(700, 570);
            waiter.node.x = tempPos.x - index * 60;
            waiter.node.y = tempPos.y;
            this.waiters.push(waiter);
            waiter.node.scaleX = -1;
            waiter.isBeer = null;
            this.gameView.roleLayer.addChild(waiterNode);
            if (isAni) {
                App.NodePoolMsr.labelTip.pop()
                    .getComponent(LabelTip)
                    .init(LayerManager.getLayer(LayerManager.UI_Tips), "解锁新服务员!", App.NodePoolMsr.labelTip)
                    .leftToRight(true, 1.5);
                // waiter.playEnterAni();
                waiter.setIsBeer(this.buffList.FOOD_SELL_RATE > 1, isAni);
                App.NotificationCenter.dispatch(NotificationConst.UNLOCK_NEWWAITER, waiter.data.levelData.friendid);
            } else {
                waiter.setIsBeer(this.buffList.FOOD_SELL_RATE > 1, isAni);
                waiter.addMyComponent(AiComponent);
            }
            waiter.init();
            waiter.playAnimation("idle", 0);
            return true;
        }
    }
    public addWaiter(cnt: number = 1, isAni?: boolean) {
        let createCnt = 0;
        let func = () => {
            if (this.createWaiter(isAni)) {
                createCnt++;
            }
            return createCnt >= cnt;
        };
        this.facList.push(func);
    }

    public updateBuff() {
        for (let i = 0; i < this.curCustomers.length; i++) {
            let customer = this.curCustomers[i];
            if (customer) {
                customer.data.speed = this.conf.customer.speed * this.buffList.MOVE_SPEED;
            }
        }
        for (const waiter of this.waiters) {
            waiter.setIsBeer(this.buffList.FOOD_SELL_RATE > 1)
        }
        if (this.star) {
            this.star.setIsBeer(this.buffList.FOOD_SELL_RATE > 1);
        }
        // FOOD_SELL_RATE
    }
    /**
     * 销毁一个顾客
     * @param customer 要销毁的顾客
     */
    public destroyCustomer(customer: Customer) {
        let index = this.curCustomers.indexOf(customer);
        if (index > -1) {
            this.curCustomers.splice(index, 1);
            customer.removeSelf();
        }
    }

    /**
     * 顾客对话
     */
    public startTalkByIndex(count: number = 3) {
        // if (count < 0) {
        //     this.randomMoveCustomer();
        //     return;
        // }
        // let cellIndex = App.RandomUtils.limitInteger(0, this.cellMsr.curOpenIndex);
        // if (this.talkState[cellIndex]) {
        //     this.startTalkByIndex(count - 1);
        //     return;
        // }
        // let list = this.rankList[cellIndex];
        // // CC_DEBUG && Log.trace('随机到的摊位', cellIndex, list && list.length);

        // if (!list || list.length <= 0) {
        //     this.randomMoveCustomer();
        //     return;
        // }

        // this.randomRankCustomer(list, cellIndex);
        // // 游戏界面最多展示5个摊位 有可能对话不在玩家当前页面展示 所以加多一个对话
        // if (this.cellMsr.curOpenIndex > 5) {
        //     let index = cellIndex + 6 % 10;
        //     let list = this.rankList[index];
        //     if (!list || list.length <= 0) {
        //         return;
        //     }
        //     this.randomRankCustomer(list, index);
        // }
    }

    /**
     * 随机排队顾客
     * @param list 顾客列表
     * @param cellIndex 摊位id
     */
    protected randomRankCustomer(list: Customer[], cellIndex: number) {
        // let len = list.length
        // let random = App.RandomUtils.limitInteger(0, len - 1);
        // let role = list[random];
        // if (role.state === CustomerState.IN_SERVICE || role.foodId >= 0)
        //     return;

        // let data = this.getTalkData(cellIndex, role.getId());
        // if (data)
        //     role.startTalk(data);
    }

    /**
     * 随机获取一个移动中的顾客
     * @param count 寻找次数
     */
    public randomMoveCustomer(count: number = 8) {
        // if (count < 0) {
        //     return;
        // }
        // let role = App.RandomUtils.randomArray(this.curCustomers);
        // // CC_DEBUG && Log.trace("随机获取一个移动中的顾客", count, role.index, role.state)
        // if (role) {
        //     if (role.state == CustomerState.MOVE && role.index > 0 && role.index < this.cellMsr.curOpenIndex + 2) {
        //         let data = this.getTalkData(-1, role.getId());
        //         if (data) {
        //             role.startTalk(data);
        //             return;
        //         }
        //     }
        //     this.randomMoveCustomer(count - 1);
        // }
    }
    // protected on_GetName:boolean;
    /**
     * 获取对话数据
     * @param cellIndex 摊位index -1为走路中的人
     * @param roleId 顾客id
     */
    public getTalkData(cellIndex: number, roleId: number) {
        let streetId = this.world.sceneMgr.nowSceneId;
        let talkList = this.roleConfigMsr.getTalkListById(roleId);

        let len = talkList.length;
        for (let i = 0; i < len; i++) {
            // let talkId = talkList[i];
            let talkId = talkList[App.RandomUtils.limitInteger(0, len - 1)];
            if (!talkId) {
                CC_DEBUG && Log.trace("随机对话异常");
            }
            if (this.roleTalkConfigMsr.check(talkId, streetId, cellIndex)) {
                let roleTalkData = this.roleTalkConfigMsr.getData(talkId);
                if (!roleTalkData) {
                    CC_DEBUG && Log.trace("随机对话数据异常，请检查配置表");
                }
                return roleTalkData;
            }

        }
    }

    /**
   * 进入某个摊位的排队列表
   * @param 排队的顾客
   * @returns 这个顾客在队伍里面的位置
   */
    public enterCellQueue(customer: Customer): number {
        if (this.rankList.length >= 4) {
            return
        }
        if (this.rankList.indexOf(customer) === -1) {
            this.rankList.push(customer);//将顾客放入排队队列
        }
        return this.rankList.length - 1;
    }
    /** 设置摊位对话状态 */
    public setCellTalkState(cellIndex: number, isTalk: boolean) {
        // this.talkState[cellIndex] = isTalk;
    }

    public setMemento(data: RoleSaveData) {
    }

    public createMemento(): RoleSaveData {
        return {

        };
    }
    /**
     * 开启欢乐时光
     */
    public startHappyTime() {
        let arrLen = this.waiters.length;
        for (let i = 0; i < arrLen; i++) {
            this.waiters[i].move.Sp = this.waiters[i].data.speed;
        }
        arrLen = this.curCustomers.length;
        for (let i = 0; i < arrLen; i++) {
            this.curCustomers[i].move.Sp = this.curCustomers[i].data.speed;
        }
    }

    protected facList: Function[] = [];
    /**
     * 在固定时间内,创建多少个顾客
     * @param cnt 创建多少个顾客
     * @param time 在多少时间内创建
     */
    public createCustomersInTime(cnt: number, time: number) {
        let timeList = [];
        for (let i = 0; i < cnt; i++) {
            timeList[i] = Math.random() * time + this.curTick;
        }
        let func = () => {
            for (let i = timeList.length - 1; i >= 0; i--) {
                if (this.curTick >= timeList[i]) {
                    timeList.splice(i, 1);
                    this.createCustomer();
                    break;
                }
            }
            return timeList.length === 0;
        };
        this.facList.push(func);
    }
    /**
     * 增加等待创建顾客数量
     */
    public addWaitCreateCustomerCnt(cnt: number) {
        if (this.waitCreateCusCnt > this.maxWaitCreateCnt) {
            return;
        }
        this.waitCreateCusCnt += cnt;
        if (this.waitCreateCusCnt > this.maxWaitCreateCnt) {
            this.waitCreateCusCnt = this.maxWaitCreateCnt;
        }
        this.nextCustomerTime = this.curTick + this.scene.guestMsr.attrObj.createCustomerTime;
        App.NotificationCenter.dispatch(GameNotificationConst.UPDATE_RANK_CNT);
    }
    public isCreateStar: boolean = true;
    public routine(tick: number) {
        App.DebugUtils.start("角色")
        this.curTick += tick;
        if (this.waitCreateCusCnt > 0) {
            if (this.createCustomer()) {
                this.waitCreateCusCnt--;
            }
        }
        // if (CC_PREVIEW) {
        //     if (this.isCreateStar) {
        //         this.isCreateStar = false;
        //         this.createStar();
        //     }
        // }
        if (this.curTick >= this.nextCustomerTime) {//没有达到排队上线
            this.addWaitCreateCustomerCnt(1);
        }
        for (let i = this.facList.length - 1; i >= 0; i--) {
            if (this.facList[i]()) {
                this.facList.splice(i, 1);
            }
        }
        for (let i = this.routineList.length - 1; i >= 0; i--) {
            this.routineList[i].routine(tick);
        }
        App.DebugUtils.stop("角色")
    }
}

export type RoleSaveData = {
}