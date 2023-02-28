import App from "../../../../../../core/App";
import SwitchFrame from "../../../../../../core/component/SwitchFrame";
import { AdData } from "../../../../../config/AdDataManager";
import { ControllerConst } from "../../../../../consts/ControllerConst";
import { AdType } from "../../../../AD/ADController";
import { ADConst, AdState } from "../../../../AD/ADManageBase";
import { GameConst } from "../../../GameConst";
import { CustomerTable } from "./CustomerTable";
const ENABLE_COLOR = cc.color().fromHEX("#0a3905");
const UNENABLE_COLOR = cc.color().fromHEX("#9999A0");
const { ccclass, property, menu } = cc._decorator;
/**
 * 桌子位置信息
 */
@ccclass("TablePosData")
export class TablePosData {
    /**顾客坐下的位置 */
    @property({ tooltip: "顾客坐下的位置,<红色>" })
    sit: cc.Vec2 = cc.v2();
    /**服务员的位置下单位置 */
    @property({ tooltip: "服务员的位置下单位置,<绿色> " })
    waiter: cc.Vec2 = cc.v2();
    /**服务员清理餐具的位置 */
    @property({ tooltip: "服务员清理餐具的位置,<蓝色>" })
    waiterClear: cc.Vec2 = cc.v2();
    /**服务员跟顾客都会先移动到这个位置然后再移动到目标位置 */
    @property({ tooltip: "服务员跟顾客都会先移动到这个位置然后再移动到目标位置,<黑色>" })
    tempPos: cc.Vec2 = cc.v2();
    /**是否左边座位 */
    @property({ tooltip: "是否左边座位" })
    isLeft: boolean = false;
    @property({ tooltip: "是否上方座位" })
    isTop: boolean = false;

    index: number = 0;

    /**是否需要清理 */
    needClean: boolean = false;
    /**菜式图片 */
    @property({ type: cc.Sprite, tooltip: "菜式图片" })
    foodImg: cc.Sprite = null;

    /**啤酒图片 */
    @property({ type: cc.Sprite, tooltip: "啤酒图片" })
    beerImg: cc.Sprite = null;



    cleanFunc: Function = null;
}
/**
 * 顾客的桌子
 */
@ccclass
@menu("game/table/CusTableComp")
export default class CusTableComp extends cc.Component implements IShareAndAd {
    @property({ type: [TablePosData], tooltip: "桌子位置信息" })
    public posData: TablePosData[] = [];

    @property(cc.Node)
    public nodes: cc.Node[] = [];
    /**桌子配置 */
    public data: CustomerTable = null;

    public static hasShowAd: boolean = false;
    public ishowAdBar: boolean = false;


    @property(cc.Sprite)
    protected imgs: cc.Sprite[] = [];
    @property([cc.String])
    protected paths: string[] = [];


    // protected moneyLab: cc.Label = null;
    // protected lockNode: cc.Node = null;
    protected lockObj: {
        /**锁的图片,金钱不足会变灰 */
        lockImgSwitch: SwitchFrame;
        /**解锁金钱label */
        moneyLab: cc.Label;
        node: cc.Node;
        /**广告按钮 */
        adBarNode: cc.Node;
        moneyBarNode: cc.Node;
        /**
         * 0:绿色图片, 1:灰色图片(金币不足的时候显示)
         */
        unlockBubbles: SwitchFrame;
    } = null;


    // protected adBarNode: cc.Node = null;



    protected _ani: cc.Animation = null;

    onLoad() {
        CC_DEBUG && Log.trace("CusTableComp");
        this._ani = this.getComponent(cc.Animation);
        // this.node.on(cc.Node.EventType.TOUCH_START, () => {
        //     this._ani.play();
        // }, this)
    }
    start() {
        if (!CC_EDITOR) {
            for (const posData of this.posData) {
                posData.beerImg.node.active = posData.foodImg.node.active = false;
                for (const key in posData) {
                    if (posData[key] instanceof cc.Vec2) {
                        this.node.convertToWorldSpaceAR(posData[key], posData[key]);
                        this.node.parent.convertToNodeSpaceAR(posData[key], posData[key]);
                    }
                }
            }
        }
        if (this.data.isOpen) {
        } else {
            this.createLockNode();
        }
    }
    /**
     * 创建解锁节点
     */
    protected createLockNode() {
        if (this.lockObj) {
            return;

        }

        let lockNode = App.NodePoolMsr.tableLockNodePool.pop();
        let layoutNode = lockNode.getChildByName("LayoutNode");
        let moneyBar = layoutNode.getChildByName("MoneyBar");
        let adBarNode = layoutNode.getChildByName("AdBar");
        adBarNode.active = false;
        // this.moneyLab = moneyBar.getChildByName("MoneyLab").getComponent(cc.Label);
        this.node.addChild(lockNode);
        moneyBar.on(cc.Node.EventType.TOUCH_END, this.onTouchUnlock, this);
        this.lockObj = {
            node: lockNode,
            moneyLab: moneyBar.getChildByName("MoneyLab").getComponent(cc.Label),
            lockImgSwitch: lockNode.getComponent(SwitchFrame),
            adBarNode: adBarNode,
            moneyBarNode: moneyBar,
            unlockBubbles: moneyBar.getComponent(SwitchFrame)
        }
        // this.checkIsShowAdBtn();
    }
    /**
     * 移除解锁节点
     */
    protected removeLockNode() {
        if (this.ishowAdBar) {
            this.lockObj.adBarNode.off(cc.Node.EventType.TOUCH_END, this.onTouchFreeUnlock, this);
            this.ishowAdBar = CusTableComp.hasShowAd = false;
            App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.UNREGISTER_ITEM, AdType.FREE_UNLOCK, this);
        }
        App.NodePoolMsr.tableLockNodePool.push(this.lockObj.node);
        this.lockObj = null;
    }
    /**
    * 切换成广告状态
    */
    toAd(type: AdType, conf: AdData, data: any, adState: AdState) {
        this.lockObj.adBarNode.active = adState === AdState.success;
    }

	/**
	 * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
	 */
    toFail(type: AdType, conf: AdData, data: any, adState?: any) {
        this.lockObj.adBarNode.active = false;
    }
    /**
     * 检查是否显示广告按钮
     */
    public checkIsShowAdBtn() {
        if (this.ishowAdBar) {
            return true;
        }
        if (this.data.conf.canAdUnlock === 0 || CusTableComp.hasShowAd) {
            this.ishowAdBar = this.lockObj.adBarNode.active = false;
            return false;
        } else {
            this.ishowAdBar = true;
            CusTableComp.hasShowAd = true;
            this.lockObj.adBarNode.on(cc.Node.EventType.TOUCH_END, this.onTouchFreeUnlock, this);
            App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.REGISTER_ITEM, AdType.FREE_UNLOCK, this);
            return true;
        }
    }
    protected onTouchFreeUnlock() {
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UNLOCK_TABLE, this.data.conf.id, true);
    }
    /**
     * 点击解锁
     */
    protected onTouchUnlock() {
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.UNLOCK_TABLE, this.data.conf.id);
    }
    /**
     * 更新解锁金钱状态
     * @param isEnough 是否有足够的钱解锁
     */
    public undateUnlockMoney(isEnough: boolean) {
        if (isEnough) {
            this.lockObj.unlockBubbles.switch(0);
            this.lockObj.lockImgSwitch.switch(0);
            this.lockObj.moneyLab.node.color = ENABLE_COLOR;
        } else {
            this.lockObj.moneyLab.node.color = UNENABLE_COLOR;
            this.lockObj.lockImgSwitch.switch(1);
            this.lockObj.unlockBubbles.switch(1);
        }
        // this.addToRoleLayer();
    }
    /**
     * 开启桌子
     */
    public openTable() {
        for (const node of this.imgs) {
            node.node.color = cc.Color.WHITE;
        }
        this.lockObj.moneyBarNode.off(cc.Node.EventType.TOUCH_END, this.onTouchUnlock, this);
        this.removeLockNode();
        this._ani.play();

    }
    protected onPlayUnlockAniFinish() {
        this.addToRoleLayer();
    }
    /**
     * 将桌子加入到角色层,参与深度计算
     */
    public addToRoleLayer() {
        let roleLayer = this.node.parent;
        for (let j = this.nodes.length - 1; j > -1; j--) {//将桌子加入到角色层,参与深度计算
            let child = this.nodes[j];
            this.node.removeChild(child, false);
            child.position = roleLayer.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(child.position))
            roleLayer.addChild(child);
        }
    }
    protected isRemoveSelf: boolean = true;
    public setData(data: CustomerTable) {
        let arrLen = this.paths.length;
        for (let i = 0; i < arrLen; i++) {
            App.CommonUtils.setSpriteFrame("Texture/game/scene/table/" + this.paths[i].format(data.conf.icon), this.imgs[i]);
            this.imgs[i].node.active = true;
        }

        this.data = data;
        if (data.isOpen) {//存在数据说明已经开启了
            for (const node of this.imgs) {
                node.node.color = cc.Color.WHITE;

            }
            // this.lockNode.active = false;
            this.addToRoleLayer();
            this.isRemoveSelf = true;

            // this.node.removeFromParent(true);
        } else {
            for (const node of this.imgs) {
                node.node.color = cc.Color.GRAY;
            }
            this.createLockNode();
            this.lockObj.moneyLab.string = MyBigLong.toString(data.conf.unlockChips);
            // this.lockNode.active = true;
        }
    }

    @property({ editorOnly: true })
    _test: boolean = false;

    @property
    public set test(v: boolean) {
        this._test = v;
        if (v) {
            for (const child of this.node.children) {
                child.opacity = 180;
            }
            let graphics = this.getComponent(cc.Graphics);
            if (!graphics) {
                graphics = this.addComponent(cc.Graphics);
            }
            graphics.clear();
            let colors = [
                cc.Color.RED,
                cc.Color.GREEN,
                cc.Color.BLUE,
                cc.Color.BLACK,
            ]
            for (const posDatas of this.posData) {
                let colorIndex = 0;
                for (const key in posDatas) {
                    if (posDatas[key] instanceof cc.Vec2) {
                        graphics.fillColor = colors[colorIndex++];
                        graphics.circle(posDatas[key].x, posDatas[key].y, 5);
                        graphics.fill();
                    }
                }
            }
        } else {
            for (const child of this.node.children) {
                child.opacity = 255;
            }
            this.node.removeComponent(cc.Graphics);
        }
    }

    public get test(): boolean {
        return this._test;
    }
}
export interface TableItemSaveData {
    /**是否已经开启,1表示开启 */
    isOpen: number;
    id: number;
}

