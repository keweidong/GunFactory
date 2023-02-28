import App from "../../../../../../core/App";
import { ITick } from "../../../../../../core/behavior/BehaviorTree";
import SwitchFrame from "../../../../../../core/component/SwitchFrame";
import { RoleData } from "../../../../../config/RoleDataManager";
import { GameNotificationConst } from "../../../../../consts/NotificationConst";
import { CustomerData } from "../config/CustomerDataMsr";
import { FoodType } from "../food/FoodMsr";
import { TablePosData } from "../table/CusTableComp";
import AiComponent from "./component/AiComponent";
import MoveComponent from "./component/MoveComponent";
import RoleTalk from "./component/RoleTalk";
import GameObject from "./GameObject";
// import AccelerateComponent from "./component/AccelerateComponent";
const { ccclass, property } = cc._decorator;
@ccclass
export default class Customer extends GameObject {
    conf: CustomerData;
    @property
    public id: number = 0;
    /**
     * 开始等待的时间,用来决定是否播放愤怒的表情
     */
    public angryTime: number = 0;

    public tablePosData: TablePosData = null;

    /**是否进店消费中 */
    public isInReception: boolean = false;
    /**等待点餐中 */
    public isWaitOrder: boolean = false;
    /**等待食物制作中 */
    public isWaitFood: boolean = false;
    /**吃东西中 */
    public isEatting: boolean = false;

    public isExit: boolean = false;


    public move: MoveComponent = null;

    public orderBox: cc.Node = null;

    /**
     * 当前排队的序号
     */
    public curRankIndex: number = -1;
    public nextRankIndex: number = -1;

    /** 对话组件 */
    public roleTalk: RoleTalk = null;
    /** 菜式表情 */
    // public foodFace: FoodFace = null;
    /**消费结束的时间 */
    public finishTime: number = -1;
    protected _state: number = null;
    public talkState: boolean = false;
    public roleConf: RoleData;
    /**吃完的时间 */
    public eatFinishTime: number = -1;

    order: IOrder = null;

    // foodDataMsr: FoodDataManager = null;
    onLoad() {
        this.move = this.addMyComponent(MoveComponent);
        this.addMyComponent(AiComponent);
        this.dbNode.armatureName = this.dbNode.armatureName;
        CC_DEBUG && Log.trace(" this.dbNode.armatureName :", this.dbNode.armatureName);
    }
    public eatFinish() {
        let customer = this;
        let tablePosData = customer.tablePosData;
        tablePosData.needClean = true;
        tablePosData.foodImg.node.scale = 0.5;
        customer.roleMsr.scene.tableMsr.waitCleanPos.push(tablePosData);//将这个位置放入待清理列表
        tablePosData.foodImg.node.on(cc.Node.EventType.TOUCH_END, customer.tablePosData.cleanFunc);//增加一个点击自动清理盘子的点击回调
        App.CommonUtils.setSpriteFrame("Texture/game/scene/foods/plate", customer.tablePosData.foodImg);
        App.NotificationCenter.dispatch(GameNotificationConst.CUSTOMER_EAT_FINISH, customer);
    }
    /**
     * 重置愤怒时间
     */
    public resetAngryTime() {
        this.angryTime = Date.now() + this.conf.angryTime;
    }
    // @property
    // protected dragonAsset: dragonBones.DragonBonesAsset = null;
    // @property
    // protected dragonAtlasAsset: dragonBones.DragonBonesAtlasAsset = null;
    public setDbData(dragonAsset: dragonBones.DragonBonesAsset, dragonAtlasAsset: dragonBones.DragonBonesAtlasAsset, armatureName: string) {
        if (armatureName == this.dbNode.armatureName) {
            return;
        }
        dragonAsset = this.dbNode.dragonAsset;
        dragonAtlasAsset = this.dbNode.dragonAtlasAsset;
        let node = this.dbNode.node;
        node.removeComponent(dragonBones.ArmatureDisplay);
        this.dbNode = node.addComponent(dragonBones.ArmatureDisplay);
        this.dbNode.enableBatch = true;
        this.dbNode.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
        this.dbNode.armatureName = armatureName;
        this.dbNode.dragonAsset = dragonAsset;
        this.dbNode.dragonAtlasAsset = dragonAtlasAsset;
    }

    public showOrderBox() {
        let orderBox = this.orderBox = App.NodePoolMsr.orderBox.pop();
        orderBox.scale = 1;
        orderBox.angle = 0;
        orderBox.x = this.node.x + 50;
        orderBox.y = this.node.y + 145;
        App.CommonUtils.setSpriteFrame(this.order.food.getOrderIcon(), orderBox.getChildByName("icon").getComponent(cc.Sprite));
        orderBox.getComponent(SwitchFrame).frameIndex = this.order.food.foodType === FoodType.NORMAL ? 0 : 1;
        // App.CommonUtils.setSpriteFrame(this.order.food.foodType === FoodType.NORMAL ? "Texture/game/Common/dianc" : "Texture/game/Common/dianc2", orderBox.getComponent(cc.Sprite));
        this.roleMsr.gameView.layer.addChild(orderBox);
        orderBox.on(cc.Node.EventType.TOUCH_END, this.onTouchOrderBox, this);
    }
    public hideOrderBox() {
        if (this.orderBox) {
            this.orderBox.off(cc.Node.EventType.TOUCH_END, this.onTouchOrderBox, this);
            App.NodePoolMsr.orderBox.push(this.orderBox);
            this.orderBox = null;
        }
    }

    /**
     * 点击点餐牌子
     */
    protected onTouchOrderBox() {
        this.roleMsr.scene.orderMsr.order(this.order);
    }

    public isRank() {
        return this.roleMsr.rankList.indexOf(this) > -1;
    }

    init() {

        super.init();
        /**是否进店消费中 */
        this.isInReception = false;
        /**等待点餐中 */
        this.isWaitOrder = false;
        /**等待食物制作中 */
        this.isWaitFood = false;
        /**吃东西中 */
        this.isEatting = false;
        this.isExit = false;
        this.curRankIndex = this.nextRankIndex = -1;
        // CC_DEBUG && Log.trace("初始化顾客", this.dbNode.armatureName);
        // this.isPlaying = false;
        // this.loadRes();
        // this.dbNode.armatureName = App.RandomUtils.randomArray(this.dbNode.getArmatureNames());
        // this.dbNode.armatureName = this.dbNode.armatureName;
        // this.isRanking = this.isInReception = false;
        // this.ai.enterRate = roleConf.odds;
        // super.init();
        // this.move.init();
        // this.ai.init();
    }
    /** 移除龙骨 */
    hideDB() {
        this.dbNode.node.removeFromParent(false);
        this.roleTalk.hide();
    }

    showDB() {
        if (!this.dbNode.node.parent) {
            this.node.addChild(this.dbNode.node);
        }
        this.roleTalk.show();
    }

    removeSelf() {
        super.removeSelf();
        this.roleMsr.curCustomers.remove(this);
        this.tablePosData = null;
        this.order = null;
    }

    public getId() {
        return this.roleConf.id;
    }



    // /**
    //  * 开始对话
    //  */
    // public startTalk(talkData: RoleTalkData) {
    //     if (this.roleTalk && this.roleTalk.enabled) {
    //         // 处于对话状态中，不在弹对话
    //         return;
    //     }
    //     this.roleTalk.talkStr = talkData.talkStr;
    //     if (talkData.isShowFood) {
    //         // let foodData = this.foodDataMsr.getData(this.foodId);
    //         // var foodPath = foodData.icon;
    //     }
    //     // this.roleTalk.setImg(foodPath);
    //     this.roleTalk.endTime = App.DateUtils.Now() + talkData.talkTime;
    //     // this.roleTalk.enabled = true;
    //     this.talkState = true;
    //     this.roleMsr.setCellTalkState(this.index, true);
    // }

    // /** 结束对话 */
    // public endTalk() {
    //     if (this.roleTalk) {
    //         this.roleTalk.enabled = false;
    //         this.talkState = false;
    //         this.roleMsr.setCellTalkState(this.index, false);
    //     }
    // }

}

export interface ICustomerTick extends ITick {
    /**执行ai动画的对象 */
    target: Customer;
}