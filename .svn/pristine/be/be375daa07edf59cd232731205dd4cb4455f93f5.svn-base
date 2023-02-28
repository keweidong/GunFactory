import App from "../../core/App";
import EffectUtils from "../../core/utils/EffectUtils";
import { ControllerConst } from "../consts/ControllerConst";
import { BagModel } from "../module/bag/BagModel";
import BoxItem, { BoxConst } from "../module/bag/BoxItem";
import { UseItemResultData } from "../module/bag/ItemBase";
import ItemDisplay, { ItemDisplayData } from "./ItemDisplay";

const scale = 1;
const { ccclass, property } = cc._decorator;
@ccclass
export default class OpenBoxAni extends cc.Component {
    @property(cc.Prefab)
    protected boxAniPrefab: cc.Prefab = null;
    protected boxAni: cc.Animation = null;
    protected data: UseItemResultData<ItemDisplayData[]>;
    protected isPlaying: boolean = false;
    protected isPlayingOpenAni: boolean = false;
    protected endPosList: cc.Vec2[] = [];
    protected itemList: cc.Node[] = [];
    @property(cc.Node)
    protected changeTipLabNode: cc.Node = null;
    @property(cc.Node)
    protected foodNode: cc.Node = null;
    @property(cc.Node)
    protected boxNode: cc.Node = null;
    protected isShowChangeNode = false;
    protected isMoveFood: boolean = false;
    //箱子精灵帧
    protected box_gjbs_dp: cc.Sprite = null;
    protected box_gjbs_gg: cc.Sprite = null;
    protected box_gjbs_kg: cc.Sprite = null;
    onLoad() {
        this.foodNode.active = false;
        let node = cc.instantiate(this.boxAniPrefab)
        this.boxNode.addChild(node);
        this.boxNode.y = -300;
        // node.x = 0;
        // this.node.y = -300;
        this.boxAni = node.getComponent(cc.Animation);
        // this.boxAni.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchTap, this)
        this.box_gjbs_dp = this.boxAni.node.getChildByName("gjbs_dp").getComponent(cc.Sprite);
        this.box_gjbs_gg = this.boxAni.node.getChildByName("gjbs_gg").getComponent(cc.Sprite);
        this.box_gjbs_kg = this.boxAni.node.getChildByName("gjbs_kg").getComponent(cc.Sprite);
    }
    protected onTouchTap() {
        if (this.isPlaying) {
            let arrLen = this.itemList.length;
            for (let i = 0; i < arrLen; i++) {
                let iterator = this.itemList[i];
                iterator.stopAllActions();
                iterator.scale = scale;
                iterator.runAction(cc.show());
                iterator.position = this.endPosList[i];
            }
            this.node.stopAllActions();
            this.boxAni.play("baoxiang", 1.5);
            this.isPlaying = false;
            this.changeTipLabNode.active = this.isShowChangeNode;
        } else if (!this.isMoveFood) {
            this.close();
        }
        else {

        }
    }
    protected close() {
        // EffectUtils.instance.queueExecutor.regist(() => {
        let arrLen = this.itemList.length;
        let isHaveFood: boolean = false;
        for (let i = 0; i < arrLen; i++) {
            let iterator = this.itemList[i];
            let itemDisplay = iterator.getComponent(ItemDisplay);
            let itemType = itemDisplay.getNowItemType();
            if (!itemType) {
                isHaveFood = true;
                this.playMoveToFood(itemDisplay);
            } else {
                itemDisplay.close();
                App.NodePoolMsr.itemPool.push(iterator);
            }
        }

        if (!isHaveFood) {
            this.itemList.length = this.endPosList.length = 0;
            if (this.node.parent) {
                this.node.removeFromParent(false);
            }
            this.boxAni.setCurrentTime(0);
            EffectUtils.instance.queueExecutor.finishFunc();
        }
        else {
            this.foodNode.active = true;
        }
        // this.boxAni.setCurrentTime(0);
        // }, this)
    }

    protected foodNum: number = 0;

    protected playMoveToFood(itemDisplay) {
        this.isMoveFood = true;
        this.foodNum++;
        let x = App.CommonUtils.getPosX1({ left: 120 }, cc.winSize.width, 0);
        let y = App.CommonUtils.getPosY1({ bottom: 120 }, cc.winSize.height, 0);
        cc.tween(itemDisplay.node)
            .delay(0.1 * this.foodNum)
            .to(0.5, { x: x, y: y, scale: 0.2 }, { easing: cc.easing.quadIn })
            .call(() => {
                this.foodNum--;
                itemDisplay.close();
                itemDisplay.node.scale = 1;
                App.NodePoolMsr.itemPool.push(itemDisplay.node);

                cc.tween(this.foodNode)
                    .to(0.05, { scale: 1.1 })
                    .to(0.05, { scale: 1 })
                    .start()
                if (this.foodNum <= 0) {
                    this.isMoveFood = false;
                    this.foodNode.scale = 1
                    this.foodNode.active = false;
                    this.itemList.length = this.endPosList.length = 0;
                    if (this.node.parent) {
                        this.node.removeFromParent(false);
                    }
                    this.boxAni.setCurrentTime(0);
                    EffectUtils.instance.queueExecutor.finishFunc();
                }
            })
            .start();
    }

    /**
     * 动画播放完成
     */
    protected playAniFinish() {
        this.changeTipLabNode.active = this.isShowChangeNode;
        this.isPlaying = false;
    }
    /**
     * 播放获得物品的动画
     */
    protected playItemAni() {
        this.isMoveFood = false;
        this.isPlaying = true;
        let endY = 300;

        let w = 135 * scale;
        let h = 128 * scale;
        let arrLen = this.data.items.length;
        //列数
        let columnCnt = Math.min(3, arrLen);
        const padX = w + 50;
        let endX = - (padX * columnCnt - 50) / 2 + w / 2;
        let delay = 1.1;
        let i = 0;
        let time = 0;
        let model = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        let money = MyBigLong.tempNum;
        money.clear();
        // for (let key in this.data.items) {
        for (let key = 0; i < arrLen; i++) {
            // let item = model.itmes.get(parseInt(key));
            let node = App.NodePoolMsr.itemPool.pop();

            node.getComponent(ItemDisplay).setData(this.data.items[i])
            this.node.addChild(node);
            node.scale = scale;
            let x = 0;
            let y = this.boxNode.y + 120;
            node.x = x;
            node.y = y;
            node.scale = scale * 0.4;
            this.itemList.push(node);
            let endPoint = cc.v2(endX, endY);
            this.endPosList.push(endPoint);
            time = Math.sqrt(Math.pow(x - endX, 2) + Math.pow(y - endY, 2)) / 1000;

            var seq = cc.sequence(
                cc.hide(),
                cc.delayTime(delay),
                cc.show(),
                cc.spawn(cc.bezierTo(time, [cc.v2(x, y), cc.v2(x, endY), endPoint]), cc.scaleTo(time, scale, scale))
            );
            node.runAction(seq)
            delay += 0.3;
            if (i % 3 == 2) {
                // endY -= h + 50;开箱子，上下行距
                endY -= h + 150;
                let leftCnt = arrLen - i - 1;
                if (leftCnt / 3 < 1) {
                    columnCnt = leftCnt;
                }
                endX = - (padX * columnCnt - 50) / 2 + w / 2;
            } else {
                endX += padX;
            }
        }
        if (money.isZero()) {
            this.isShowChangeNode = false;
        } else {
            this.isShowChangeNode = true;
            // 
            this.changeTipLabNode.getComponent(cc.Label).string = `已拥有碎片转换为${money.toString()}金币`;
        }
        this.changeTipLabNode.active = false;
        this.node.runAction(cc.sequence(cc.delayTime(delay + time - 0.3), cc.callFunc(this.playAniFinish, this)));
    }
    public play(item: BoxItem, data: UseItemResultData<ItemDisplayData[]>) {
        CC_DEBUG && cc.log("箱子数据item", this.boxAni);
        this.isPlaying = true;
        // this.setBoxSprite(item);
        this.boxAni.play("baoxiang");
        // setTimeout(() => {
        //     this.onTouchTap();
        // }, 3300);
        this.data = data;
        this.playItemAni();
    }
    //设置箱子sprite
    public setBoxSprite(item: BoxItem) {
        switch (item.data.id) {
            case BoxConst.GENERAL_BOX:
                //普通箱子
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/ptbs_dp", this.box_gjbs_dp);
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/ptbs_gg", this.box_gjbs_gg);
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/ptbs_kg", this.box_gjbs_kg);
                break;
            case BoxConst.RARE_BOX:
                //稀罕箱子
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/ybs_dp", this.box_gjbs_dp);
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/ybs_gg", this.box_gjbs_gg);
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/ybs_kg", this.box_gjbs_kg);
                break;
            case BoxConst.EPIC_BOX:
                //史诗箱子
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/gjbs_dp", this.box_gjbs_dp);
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/gjbs_gg", this.box_gjbs_gg);
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/BoxAni/gjbs_kg", this.box_gjbs_kg);
                break;
            default:
                break;
        }
    }
}