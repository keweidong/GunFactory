import { GameText } from "../../core/lang/GameText";
import { UI } from "../../core/utils/Image";
import { ItemType } from "../module/bag/BagConst";
import { ItemBase } from "../module/bag/ItemBase";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ItemDisplay extends cc.Component {
    @property(UI.Image)
    protected img: UI.Image = null;
    @property(cc.Label)
    protected decLab: cc.Label = null;
    @property(cc.Node)
    protected count: cc.Node = null;
    @property(cc.Label)
    protected countLab: cc.Label = null;
    @property(cc.Node)
    protected rateNode: cc.Node = null;

    //当前播放动画的物品类型
    public NowItemType: ItemType = null;
    onLoad() {

    }
    public setData(data: ItemDisplayData, isShowBg: boolean = true, cnt: number = 0) {
        this.NowItemType = null;
        this.img.node.scale = 1;
        // this.img.getComponent(ShaderHelper).enabled = false;
        this.count.active = false;
        this.rateNode.active = false;
        this.NowItemType = data.item.data.itemType;
        // this.decLab.lineHeight = 30;
        // this.decLab.fontSize = 30;
        // this.decLab.node.width = 170;
        // this.decLab.node.y = -60;
        // this.decLab.node.getComponent(cc.LabelOutline).color = cc.color(220, 104, 45, 255);
        this.rateNode.y = this.decLab.node.y;
        this.img.node.scale = 1;
        this.img.source = data.item.getItemPic();
        if (data.item.data.itemType === ItemType.IELD_MONEY) {
            this.decLab.string = data.arg0 + GameText.getText(lang.common_gold);// "金币";
            if (cnt > 1) {
                this.rateNode.active = true;
                this.rateNode.getComponentInChildren(cc.Label).string = cnt + "";
            }
        } else if (data.item.data.itemType === ItemType.SUPER_CASH) {
            this.decLab.string = data.arg0 + GameText.getText(lang.common_diamond);////"钻石";
            if (cnt > 1) {
                this.rateNode.active = true;
                this.rateNode.getComponentInChildren(cc.Label).string = cnt + "";
            }
        } else if (data.item.data.itemType === ItemType.BOX) {
            this.decLab.string = data.item.getName();
            this.decLab.node.y = -60;
            if (data.arg0 && data.arg0 > 1) {
                this.count.active = true;
                this.countLab.string = data.arg0 + ''
            }
        } else if (data.item.data.itemType === ItemType.BUFF) {
            this.decLab.string = data.item.getName();
            // let path = "Texture/ShopUI/" + data.arg1;
            // this.img.source = path;
            //this.img.node.scale = 1.5;
            this.decLab.node.width = 250;
            this.decLab.node.y = -80;
        }

    }

    //获取当前播放动画的物品类型
    public getNowItemType(): ItemType {
        return this.NowItemType;
    }

    // protected 
    public playAni() {
        this.data = null;
    }

    public close() {
        // this.img.getComponent(ShaderHelper).enabled = false;
        this.img.node.scale = 1;
    }
}
export type ItemDisplayData = {
    item: ItemBase;
    /**
     * 预留参数,不同的物品传进来的值不一样,比如菜式碎片这个会穿进来的是菜式碎片的序号
     * 金币跟超级现金会穿进来的是获得的金币,超级现金的具体数值
     */
    arg0?: any;
    /**
     * 菜式碎片如果是已经拥有了的话,会将转化的金币放在这个参数传进来
     */
    arg1?: any;
    /**
     * buff类型物品ItemBase，
     * arg0传buff内容信息，例：烧烤店在6秒内店铺收益+30%，
     * arg1：图片路径
    */
}