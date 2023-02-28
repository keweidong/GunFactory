import App from "../../../../../core/App";
import { NotificationConst } from "../../../../consts/NotificationConst";
import { BuffAttr } from "../../../Buff/IBuff";
import GameView from "../../GameView";
import { SceneData } from "./config/SceneDataMsr";
import { FoodMsr } from "./food/FoodMsr";
import MapMsr from "./map/MapMsr";
import { OrderMsr } from "./OrderMsr";
import { ChefMsr } from "./role/chef/ChefMsr";
import { GuestMsr } from "./role/guest/GuestMsr";
import { RoleMsr } from "./role/RoleMsr";
import { WaiterMsr } from "./role/waiter/WaiterMsr";
import { SceneSaveData } from "./SceneMgr";
import { TableMsr } from "./table/TableMsr";
import WorldScene from "./WorldScene";
import { ControllerConst } from "../../../../consts/ControllerConst"
import { GameConst } from "../../GameConst"


//场景对象
export default class ScenegZone {
    /**-------------管理器 start------------- */
    /**角色管理器 */
    public roleMsr: RoleMsr = null;
    /**
     * 地图管理器
     */
    public mapMsr: MapMsr = null;

    tableMsr: TableMsr = null;
    /**
     * 厨师管理器
     */
    chefMsr: ChefMsr = null;

    waiterMsr: WaiterMsr = null;
    guestMsr: GuestMsr = null;

    // public upgradeMsr: [ChefMsr, ChefMsr, ChefMsr] = null;

    /**
     * 菜式管理器
     */
    foodMsr: FoodMsr = null;

    /**
     * 订单管理器
     */
    orderMsr: OrderMsr = null;

    /**-------------管理器 end------------- */

    public gameView: GameView = null;


    public isInit: boolean = false;
    /**
     * 当前you多少钱
     */
    public nowMoney: MyBigLong = null;			//货币值
    /**
     * 闲置货币/秒
     */
    public idleMoneyRate: MyBigLong = MyBigLong.create(0, 0);
    /**
     * 能够领取的闲置货币
     */
    public idleMoney: MyBigLong = MyBigLong.create(0, 0);
    /**
     * 是否开启
     */
    public isOpen: boolean = false;

    /**
     * 开始闲置的时间
     */
    public startIdleTime: long = 0;
    /**
     * 结束闲置的时间
     */
    public endIdleTime: long = 0;
    /**
     * 离线收益已领取倍数
     */
    public offLine: number = 0;

    public worldScene: WorldScene = null;
    /**场景配置数据*/
    public conf: SceneData = null;
    /** 矿场buff属性列表 */
    buffList: BuffAttr = null;

    public routineList: { routine: (dt?: number) => void }[] = [];

    public constructor(worldScene: WorldScene) {
        this.worldScene = worldScene;
    }


    public addRoutineObj(object: { routine: (dt?: number) => void }) {
        if (this.routineList.indexOf(object) === -1) {
            this.routineList.push(object);
        }
    }
    /**是不是这次打开游戏后首次进入 */
    protected isFirstEnter: boolean = true;
    /**
     * 进入场景
     */
    public onEnter() {
        if (this.isFirstEnter) {//如果是这次打开游戏后首次进入
            this.isFirstEnter = false;
            this.gameView.firstEnter();
            this.tableMsr.firstEnter();
            this.mapMsr.firstEnter();
            this.roleMsr.firstEnter();
            this.orderMsr.firstEnter();
            this.buffList = this.worldScene.buffMsr.getKcBuffAttrList(this.conf.id);
        } else {

        }
        this.gameView.onEnter();
        this.tableMsr.onEnter();
        this.mapMsr.onEnter();
        this.roleMsr.onEnter();
        this.updateBuff();
    }

    public removeRoutineObj(object: { routine: (dt?: number) => void }) {
        let index = this.routineList.indexOf(object);
        if (index > -1) {
            this.routineList.splice(index, 1);
        }
    }
    public getUpgradeMsrByType(type: number) {
        if (type === 0) {
            return this.waiterMsr;
        }
        if (type === 1) {
            return this.chefMsr;
        }
        if (type === 2) {
            return this.guestMsr;
        }
    }


    /**
     * 计算当前的闲置现金
     * 
     * 公式:(已解锁菜式平均价格 * 6) * (来客速度 + 1)
     * 
     */
    calIdle() {
        this.worldScene.sceneMgr.idleMoneyRate.sub(this.idleMoneyRate);
        this.idleMoneyRate.clear();
        let unlockCnt = 0;
        for (const food of this.foodMsr.foods) {
            if (food.isOpen()) {
                unlockCnt++;
                this.idleMoneyRate.add(food.attrObj.sellCoin);
            }
        }
        this.idleMoneyRate.divide(unlockCnt).multiply(this.conf.onlineRewardRate).multiply(this.guestMsr.attrObj.rate / 100 + 1).divide(60);
        this.worldScene.sceneMgr.idleMoneyRate.add(this.idleMoneyRate);
        Log.trace("当前闲置现金:", this.idleMoneyRate.toString())
        //通知闲置现金刷新
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_IDLE);

    }
    /**
     * nowMoney加上某个数
     * @param value:要加的钱
     * @param isSync:是否同步到服务器
     * 
     */
    public nowMoneyAdd(value: MyBigLong | number, isSync?: boolean) {
        this.nowMoney.add(value);
        if (typeof value === "number") {
            this.worldScene.playerDto.gold = this.worldScene.playerDto.gold + value;
            this.worldScene.playerDto.goldSum = this.worldScene.playerDto.goldSum + value;
        } else {
            this.worldScene.playerDto.gold = this.worldScene.playerDto.gold + value.value;
            this.worldScene.playerDto.goldSum = this.worldScene.playerDto.goldSum + value.value;
        }
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_MONEY, this.conf.moneyType, value, true);
    }

    /**
     * nowMoney减去某个数
     */
    public nowMoneySub(value: MyBigLong | number) {
        this.nowMoney.sub(value);
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_MONEY, this.conf.moneyType, value, false);
    }
    public cmpNowMoney(value: MyBigLong) {
        return value.cmp(this.nowMoney)
    }
    public getNowMoney() {
        return this.nowMoney;
    }
    /**
     * 新开矿场区域
     */
    public openNewSceneZone(): void {
        this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this.worldScene.playerDto.cuisine++;
        this.tableMsr.newOpen();
        this.foodMsr.newOpen();
        this.chefMsr.newOpen();
        this.waiterMsr.newOpen();
        this.guestMsr.newOpen();
        this.orderMsr.newOpen();
    }
    /**
     * 检查金钱是否足够
     */
    public check(costChipsMyLong: MyBigLong | number) {
        return this.nowMoney.cmp(costChipsMyLong) >= 0;
    }

    public setConf(conf: SceneData) {
        this.conf = conf;
    }

    /**
     * 初始化矿层
     */
    public init(): void {
        this.tableMsr = new TableMsr();
        this.chefMsr = new ChefMsr(this);
        this.waiterMsr = new WaiterMsr(this);
        this.guestMsr = new GuestMsr(this);
        this.foodMsr = new FoodMsr();
        this.orderMsr = new OrderMsr(this);
        this.roleMsr = new RoleMsr();
        this.mapMsr = new MapMsr();
        this.isOpen = true;
        this.gameView = this.worldScene.gameView.getView(this.conf.id);
        this.gameView.scene = this;
        this.roleMsr.gameView = this.gameView;
        this.roleMsr.mapMsr = this.mapMsr;
        this.roleMsr.scene = this;
        this.roleMsr.init(this.worldScene);//初始化角色管理器
        this.tableMsr.init(this);
        this.mapMsr.init(this);
        this.foodMsr.init(this);
        this.worldScene.buffMsr.openNewKc(this.conf.id);
    }
    public getId() {
        return this.conf.id;
    }
    /**
     * 获取矿场能够领取的闲置现金
     */
    public getIdleMoney() {
        let idleTime = Math.floor((App.DateUtils.Now() - this.startIdleTime) / 1000);
        if (idleTime > 0) {
            const maxOfflineTime = App.ConfigManager.gameConf.game.maxOfflineTime
            if (idleTime > maxOfflineTime) {
                idleTime = maxOfflineTime;
            }
            // return this.idleMoney.init(this.worldScene.sceneMgr.idleMoneyRate).multiply(idleTime).multiply(this.buffList.ADD_IDLE).divide(5);
            return this.idleMoney.init(this.worldScene.sceneMgr.idleMoneyRate).multiply(idleTime).multiply(this.buffList.ADD_IDLE).divide(10);
        }
    }

    public routine(tick: long): void {
        // this.dianTiBaseWz.routine(tick);
        // this.cangKuWz.routine(tick);
        for (let i = this.routineList.length - 1; i >= 0; i--) {
            this.routineList[i].routine(tick);
        }
        // this.kuangcengMgr.routine(tick);
    }
    /**
     * 退出当前矿场
     */
    public onExit() {
        // this.kuangcengMgr.onExit();
        // if (this.idleMoneyRate.isZero()) {//没有闲置现金的话,不设置闲置时间
        //     this.startIdleTime = 0;
        // } else {
        //     this.startIdleTime = App.DateUtils.Now();
        // }
        this.gameView.onExit();
        // this.tableMsr.onExit();
        // this.mapMsr.onExit();
        this.roleMsr.onExit();
    }
    /**
     * 收集闲置金钱
     * @param rate:增加闲置现金的倍率
     */
    public collectIdle(rate: number, idleTime?: long) {
        if (idleTime) {
            this.startIdleTime = idleTime;
        }

        if (this.startIdleTime) {
            let temp = this.getIdleMoney().multiply(rate);
            this.startIdleTime = 0;
            Log.trace(`领取了${temp.toString()}金币`)
            this.nowMoneyAdd(temp, true);
            // App.ControllerManager.applyFunc(ControllerConst.UserLevel, UserLevelConst.ADD_EXP, temp.value);//增加经验值
            return temp;
        }
        return null;
    }

    /**
     * 获取秒产
     */
    public getMakeMoney(): MyBigLong {
        return this.idleMoneyRate.copy();
    }
    public createMemento(): SceneSaveData {
        let data: SceneSaveData = {
            id: this.getId(),
            /**
             * 矿洞数据, 当前矿场才有这个数据
             */
            cells: null,
            /**
             * 每秒的闲置现金
             */
            idleMoney: this.idleMoneyRate.getData(),
            idleTime: this.worldScene.sceneMgr.nowSceneId === this.getId() ? App.DateUtils.Now() : this.startIdleTime,
            roleData: this.roleMsr.createMemento(),
            table: this.tableMsr.createMemento(),
            food: this.foodMsr.createMemento(),
            chef: this.chefMsr.createMemento(),
            waiter: this.waiterMsr.createMemento(),
            guest: this.guestMsr.createMemento(),
            order: this.orderMsr.createMemento(),
        };
        // this.kuangcengMgr.createMemento(data);
        return data;
    }

    public updateBuff() {
        // this.kuangcengMgr.updateBuff();
        this.guestMsr.updateBuff();
        this.chefMsr.updateBuff();
        this.waiterMsr.updateBuff();
        this.roleMsr.updateBuff();
        this.calIdle();
        // this.chefMsr.updateBuff();
        this.chefMsr.updateBuff();
    }
    public updateDayData() {

    }
    public destroy() {
        this.orderMsr.destroy();
    }

    public setMemento(data: SceneSaveData, isUpdateDayData: boolean) {
        if (data) {
            this.isOpen = true;
            this.startIdleTime = data.idleTime;
            this.tableMsr.setMemento(data.table);
            this.foodMsr.setMemento(data.food);
            this.chefMsr.setMemento(data.chef);
            this.guestMsr.setMemento(data.guest);
            this.waiterMsr.setMemento(data.waiter);
            this.orderMsr.setMemento(data.order, isUpdateDayData);
            this.idleMoneyRate.unPackData(data.idleMoney);
        }
        else {
            this.isOpen = false;
        }
    }
}