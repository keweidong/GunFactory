import App from "../../../../../../../core/App";
import { ChefMsr } from "./ChefMsr";

const { ccclass, property, menu } = cc._decorator;
const aniList = ["cook", "cook1"];
let bossList = ["chustomer_chief5", "chustomer_chief1", "chustomer_chief2", "chustomer_chief3", "chustomer_chief4"];

/**
 * 厨师
 */
@ccclass
@menu("game/role/chef")
export default class Chef extends cc.Component {
    @property(dragonBones.ArmatureDisplay)
    public dbNode: dragonBones.ArmatureDisplay = null;
    public isOpen: boolean = false;
    public chefMsr: ChefMsr = null;

    @property(cc.Sprite)
    protected progressBar: cc.Sprite = null;
    @property(cc.Node)
    protected progressNode: cc.Node = null;
    /**烟雾粒子效果 */
    @property(cc.ParticleSystem)
    protected yanwu: cc.ParticleSystem = null;//todo 后续优化可能得考虑低端机型的,根据机子性能决定要不要播放这个粒子

    @property(cc.Sprite)
    public BBQTableImg: cc.Sprite = null;
    @property(cc.Sprite)
    protected foodIcon: cc.Sprite = null;
    /**解锁动画 */
    protected _ani: cc.Animation = null;
    /**
     * 当前订单
     */
    public order: IOrder = null;
    /**烹饪完成的时间 */
    public finishTime: number = 0;

    /**
     * 这个厨师在当前场景的序号
     */
    public index: number = 0;
    onLoad() {
        this._ani = this.getComponent(cc.Animation);
        this.dbNode.playAnimation("idle", 0);
    }

    /**
     * 开始烹饪食物
     */
    public startCook(order: IOrder) {

        let gameView = this.chefMsr.sceneZone.gameView;
        this.order = order;
        order.chef = this;
        let orderBox = App.NodePoolMsr.orderBox.pop();
        orderBox.angle = 0;
        orderBox.scale = 1;
        gameView.layer.addChild(orderBox);
        orderBox.x = gameView.tablePos.dishTable.x + 60;
        orderBox.y = gameView.tablePos.dishTable.y + 50;
        let x = this.node.x;
        let y = this.node.y + 50;
        let time = App.MathUtils.getDistance(
            x,
            y,
            orderBox.x,
            orderBox.y
        ) * 0.0013;
        cc.tween(orderBox)
            .parallel(
                cc.tween().to(
                    time, {
                    x: x,
                    y: y,
                    scale: 0.6
                }).call(() => {
                    cc.Tween.stopAllByTarget(orderBox);
                    App.NodePoolMsr.orderBox.push(orderBox);
                    App.CommonUtils.setSpriteFrame(this.chefMsr.levelUpDatas.cookImg, this.BBQTableImg);
                    App.CommonUtils.setSpriteFrame(order.food.getOrderIcon(), this.foodIcon);
                    this.progressNode.active = true;
                    if (this.chefMsr.isCoodAccelerate) {
                        this.playAccelerateAni();
                    } else {
                        this.dbNode.playAnimation("cook", 0);
                    }
                    this.chefMsr.sceneZone.addRoutineObj(this);
                    this.finishTime = this.chefMsr.attrObj.cookTime;
                }),
                cc.tween().by(0.4, {
                    angle: 360
                }).repeatForever()
            )
            .start();
    }
    /**
     *开始播放加速动画
     */
    public playAccelerateAni() {
        this.yanwu.node.active = true;
        this.yanwu.resetSystem();
        this.dbNode.playAnimation("cook_fast1", 0);
        this.dbNode.timeScale = 2;
    }
    /**
     * 停止播放加速动画
     */
    public stopAccelerateAni() {
        this.dbNode.playAnimation("cook", 0);
        this.dbNode.timeScale = 1;
        this.yanwu.node.active = false;
        this.yanwu.stopSystem();
    }

    /**
     * 烹饪食物完成
     */
    public finishCook() {
        App.CommonUtils.setSpriteFrame(this.chefMsr.levelUpDatas.narmalImg, this.BBQTableImg);
        this.progressNode.active = false;
        this.dbNode.playAnimation("idle", 0);
        this.chefMsr.sceneZone.removeRoutineObj(this);
        let food = this.order;
        this.order = null;
        this.chefMsr.sceneZone.orderMsr.finishCook(food);
        if (this.yanwu.node.active) {
            this.yanwu.node.active = false;
            this.yanwu.stopSystem();
        }
    }

    public routine(tick: number) {
        if (this.chefMsr.isCoodAccelerate) {
            this.finishTime -= tick * this.chefMsr.chefTouchSpeedRate;
        } else {
            this.finishTime -= tick;
        }
        if (this.finishTime <= 0) {
            this.finishCook();
        } else {
            this.progressBar.fillRange = this.finishTime / this.chefMsr.attrObj.cookTime - 1;
        }
    }
    public playOpenAni() {
        this._ani.play();

    }
    // public update

    public setData(data: ChefMsr, index: number) {
        this.chefMsr = data;
        this.index = index;
        let armatureName = bossList[index];
        if (armatureName !== this.dbNode.armatureName) {
            this.dbNode.armatureName = armatureName;
        }
        App.CommonUtils.setSpriteFrame(data.levelUpDatas.narmalImg, this.BBQTableImg)
        if (index < data.attrObj.levelData.cnt) {
            this.isOpen = true;
            this.dbNode.node.active = true;
            this.BBQTableImg.node.color = cc.Color.WHITE;
        } else {
            this.BBQTableImg.node.color = cc.Color.GRAY;
            this.isOpen = false;
            this.dbNode.node.active = false;
        }

        this.progressNode.active = false;
    }
}
export interface ChefItemSaveData {
    /**是否已经开启,1表示开启 */
    isOpen: number;
    id: number;
}