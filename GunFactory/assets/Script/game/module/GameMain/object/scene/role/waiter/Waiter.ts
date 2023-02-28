import App from "../../../../../../../core/App";
import { ITick } from "../../../../behavior/B3Tree";
import { WaiterData } from "../../config/WaiterDataMsr";
import { TablePosData } from "../../table/CusTableComp";
import AiComponent from "../component/AiComponent";
import MoveComponent from "../component/MoveComponent";
import GameObject from "../GameObject";
import WaiterAttr from "./WaiterAttr";
/**
 * 服务员
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class Waiter extends GameObject {
    conf: WaiterData;
    data: WaiterAttr = null;
    tablePosData: TablePosData = null;

    public move: MoveComponent = null;

    public isBeer: boolean = false;

    /**
     * 当前排队的序号
     */
    public curRankIndex: number = -1;
    public nextRankIndex: number = -1;

    order: IOrder = null;
    @property(cc.Sprite)
    foodImg: cc.Sprite = null;

    protected _enterAni: cc.Animation = null;

    // foodDataMsr: FoodDataManager = null;
    onLoad() {
        this.move = this.addMyComponent(MoveComponent);

        this._enterAni = this.getComponent(cc.Animation);
        this.foodImg.node.active = false;
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    protected onTouchEnd() {
        this.setIsBeer(!this.isBeer);
    }

    public setIsBeer(isBeer: boolean, isAni: boolean = true) {
        if (this.isBeer === isBeer) {
            return;
        }
        this.isBeer = isBeer;
        if (isBeer) {
            // this.dbNode.destroy();
            // this.dbNode.armatureName = null;
            // this.dbNode.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.PRIVATE_CACHE);
            this.setDbArmatureName("customer_waiter3");
            // this.dbNode.armatureName = "customer_waiter3";
        } else {
            // this.dbNode.armatureName = null;
            // this.dbNode.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
            this.setDbArmatureName("customer_waiter1");
            // this.dbNode.armatureName = "customer_waiter1";
        }
        if (isAni) {
            this._enterAni.play();
        }
    }

    public playEnterAni() {

        this._enterAni.play();
    }
    protected onEnterAniFinish() {
        CC_DEBUG && Log.trace("onEnterAniFinish");
        this.addMyComponent(AiComponent);
    }
    /**
     * 拿到订单的菜式
     */
    public getFood() {
        this.foodImg.node.active = true;
        App.CommonUtils.setSpriteFrame(this.order.food.getOrderIcon(), this.foodImg);
    }
    /**
     * 将订单送到桌子
     */
    public deliverFood() {
        this.order = null;
        this.foodImg.node.active = false;
    }

    public isRank() {
        // return this.roleMsr.rankList.indexOf(this) > -1;
    }

    init() {
        super.init();
        // CC_DEBUG && Log.trace("初始化顾客");
        // this.isPlaying = false;
        // this.loadRes();
        // this.dbNode.armatureName = this.dbNode.getArmatureNames()[this.roleConf.modelId];
        // this.isRanking = this.isInReception = false;
        // this.ai.enterRate = roleConf.odds;
        // super.init();
        // this.move.init();
        // this.ai.init();
    }

    // removeSelf() {
    //     this.nodePool.push(this.node);
    // }

}

export interface IWaiterTick extends ITick {
    /**执行ai动画的对象 */
    target: Waiter;
}