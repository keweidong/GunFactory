import App from "../../core/App";
import ItemDisplay, { ItemDisplayData } from "./ItemDisplay";
import { ItemType } from "../module/bag/BagConst";
import { ControllerConst } from "../consts/ControllerConst";
import { GameUIConst } from "../module/GameUI/GameUIConst";
import ShopView from "../module/Shop/ShopView";
import EffectUtils from "../../core/utils/EffectUtils";

const { ccclass, property } = cc._decorator;
@ccclass
export default class GetItemAni extends cc.Component {
    @property(cc.Node)
    protected ani: cc.Node = null;
    protected boxAni: cc.Animation = null;
    protected isPlaying: boolean = false;
    protected endPosList: cc.Vec2[] = [];
    protected displayNode: cc.Node = null;
    /**当前播放动画的物品数据*/
    protected NowItemType: ItemType = null;

    protected timer: number = null;
    // protected itemDisplay:
    onLoad() {
        this.boxAni = this.ani.getComponent(cc.Animation);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchTap, this);
        this.boxAni.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }
    protected onAnimCompleted() {
        if (this.isPlaying) {
            this.isPlaying = false;
        }
    }
    protected onTouchTap() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.ani.stopAllActions();
            this.boxAni.play("huodewp", 10);
            //if(this.NowItemType === ItemType.BOX){
            this.onTouchTap();
            //}
        } else {
            //回调
            // if (this.NowItemType == ItemType.IELD_MONEY) {
            //     //金币
            //     //判断是不是商城
            //     App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, 0, this, this.close);
            //     return;
            // } else if (this.NowItemType == ItemType.SUPER_CASH) {
            //     //钻石
            //     //判断是不是商城

            //     App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, 1, this, this.close);
            // } else if (this.NowItemType == ItemType.BOX) {
            //     //箱子
            //     this.close()
            // } else {
            // }
            this.close()
        }
    }
    protected close() {
        // if (this.data.length) {
        //     App.SoundManager.playEffect("open_box");
        //     this.play(this.data.pop())
        // } else {
        if (this.node.parent) {
            let display = this.displayNode.getComponent(ItemDisplay);
            display.close();
            this.node.removeFromParent(false);
            this.displayNode.scale = 1;
            App.NodePoolMsr.itemPool.push(this.displayNode);
            this.displayNode = null;
        }
        if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
        // }
        EffectUtils.instance.queueExecutor.finishFunc();
    }
    public play(data: ItemDisplayData, cnt: number = 0) {
        // if (this.isPlaying) {
        //     this.data.push(data);
        //     return;
        // }
        let displayNode = this.displayNode;
        if (!displayNode) {
            displayNode = this.displayNode = App.NodePoolMsr.itemPool.pop();
            this.ani.addChild(displayNode);
        }
        // displayNode.scale = 0.6;
        displayNode.x = 0;
        displayNode.y = -40;
        let display = displayNode.getComponent(ItemDisplay);
        display.setData(data, false, cnt);
        this.boxAni.play("huodewp");
        this.isPlaying = true;
        this.timer = setTimeout(() => {
            this.timer = null;
            this.onTouchTap();
        }, 2000);
        
        this.NowItemType = display.getNowItemType();
        
    }
}