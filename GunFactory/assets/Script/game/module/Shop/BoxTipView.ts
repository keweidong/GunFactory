import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { AdShareStatus } from "../AD/ADController";
import { BoxConst } from "../bag/BoxItem";
import { ShopConst, ShopViewDataItem } from "./ShopController";
import ShopItem from "./ShopItem";


const { ccclass, property } = cc._decorator;

//购买宝箱提示窗
@ccclass
export default class BoxTipView extends BaseView {

    //宝箱label
    @property(cc.Label)
    protected boxLabel: cc.Label = null;

    //按钮Btnlabel
    @property(cc.Label)
    protected Btnlabel: cc.Label = null;

    //奖励提示label
    @property(cc.Label)
    protected awardTipLabel: cc.Label = null;

    //奖励文本awardlabel
    @property(cc.Label)
    protected awardLabel: cc.Label = null;

    //按钮icon
    @property(cc.Sprite)
    protected btnIcon: cc.Sprite = null;

    //宝箱icon
    @property(cc.Sprite)
    protected boxIcon: cc.Sprite = null;

    //当前itemIndex
    itemIndex: number = null;

    //当前宝箱数量
    cnt: number = null;

    //物品广告状态
    adStatus: AdShareStatus = null;

    //当前物品价格
    price: number = null;

    //物品item
    shopItem: ShopItem = null;

    //boxLabel宝箱文本
    boxLabelOutline: cc.LabelOutline = null;

    shopData: ShopViewDataItem = null;
    public bgType: BG_TYPE = BG_TYPE.GRAY;

    //itemIndex:物品id,cnt:物品数量,adStatus:物品广告状态
    open(shopData: ShopViewDataItem, adStatus: AdShareStatus, price: number, shopItem: ShopItem) {
        super.open();
        //ADController.getInstance().registerItem(AdType.TASK, this);
        this.itemIndex = shopData.conf.itemIndex;
        this.cnt = shopData.itemData.cnt;
        this.adStatus = adStatus;
        this.price = price;
        this.shopItem = shopItem;
        this.boxLabelOutline = this.boxLabel.getComponent(cc.LabelOutline);
        this.shopData = shopData;
        this.setData();
    }

    close() {
        super.close();
        //ADController.getInstance().unregisterItem(AdType.TASK);
    }

    //点击领取按钮
    onTouchBtn() {
        this.applyFunc(ShopConst.SHOP_BUY, this.shopItem);
        this.onTouchClose();
    }

    //检查广告类型
    checkAdStatus() {
        switch (this.adStatus) {
            case AdShareStatus.FREE:
                this.Btnlabel.string = GameText.getText(lang.common_free_get);//"免费领取";
                break;
            case AdShareStatus.AD:
                this.Btnlabel.string = GameText.getText(lang.common_ad_get);//"广告领取";
                break;
            case AdShareStatus.SHARE:
                this.Btnlabel.string = "分享领取";
                break;
            case AdShareStatus.SUPER_CASH:
                //this.Btnlabel.string = "广告领取";
                break;
            case AdShareStatus.PAY:
                //this.Btnlabel.string = "广告领取";
                break;
            default:
                break;
        }
    }

    //设置数据
    setData() {
        //设置按钮icon
        this.setBtnIcon();
        //宝箱描述
        this.setBoxDesc();

        this.btnIcon.node.active = true;
        this.Btnlabel.node.x = 43;
        this.Btnlabel.fontSize = 30;
        switch (this.itemIndex) {
            case BoxConst.GENERAL_BOX:
                //普通
                // this.awardTipLabel.string = "(可能出现重复碎片)";
                // this.awardLabel.string = "获得1张菜式碎片";
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/ptbs", this.boxIcon);
                this.boxLabel.string = this.shopData.conf.name;
                this.boxLabelOutline.color = cc.color(187, 73, 47, 255);
                if (this.cnt > 0) {
                    this.Btnlabel.string = GameText.getText(lang.common_open);//"开启";
                    this.Btnlabel.node.x = 28;
                    this.btnIcon.node.active = false;
                } else {
                    this.Btnlabel.fontSize = 25;
                    //this.Btnlabel.string = "广告领取";
                    this.Btnlabel.node.x = 27;
                    this.checkAdStatus();
                }
                break;
            case BoxConst.RARE_BOX:
                //稀罕
                // this.awardTipLabel.string = "(可能出现重复碎片)";
                // this.awardLabel.string = "随机获得2-5张碎片";
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/ybs", this.boxIcon);
                this.boxLabel.string = this.shopData.conf.name;
                this.boxLabelOutline.color = cc.color(56, 129, 240, 255);
                if (this.cnt > 0) {
                    this.Btnlabel.string = GameText.getText(lang.common_open);//"开启";
                    this.Btnlabel.node.x = 28;
                    this.btnIcon.node.active = false;
                } else {
                    this.Btnlabel.string = this.price + "";
                }
                break;
            case BoxConst.EPIC_BOX:
                //史诗
                // this.awardTipLabel.string = "(必定有一张不重复)";
                // this.awardLabel.string = "获得3张碎片";
                App.CommonUtils.setSpriteFrame("Texture/ShopUI/gjbs", this.boxIcon);
                this.boxLabel.string = this.shopData.conf.name;
                this.boxLabelOutline.color = cc.color(187, 73, 47, 255);
                if (this.cnt > 0) {
                    this.Btnlabel.string = GameText.getText(lang.common_open);// "开启";
                    this.Btnlabel.node.x = 28;
                    this.btnIcon.node.active = false;
                } else {
                    this.Btnlabel.string = this.price + "";
                }
                break;
            default:
                break;
        }

    }

    //设置物品描述
    setBoxDesc() {
        let itemDesc = this.shopData.itemData.getDesc();
        let arr: string[] = [];
        arr = itemDesc.split("|");
        this.awardLabel.string = arr[0];
        this.awardTipLabel.string = arr[1];
    }

    //设置按钮icon
    setBtnIcon() {
        switch (this.adStatus) {
            case AdShareStatus.AD:
                this.btnIcon.node.scale = 0.75;
                this.btnIcon.node.x = -57;
                App.CommonUtils.setSpriteFrame("Texture/game/Common/gg_kdcicon627", this.btnIcon);
                break;
            case AdShareStatus.SHARE:
                this.btnIcon.node.scale = 0.75;
                App.CommonUtils.setSpriteFrame("Texture/game/Common/fx_icon", this.btnIcon);
                this.btnIcon.node.x = -57;
                break;
            case AdShareStatus.FREE:
                this.btnIcon.node.scale = 0.75;
                App.CommonUtils.setSpriteFrame("Texture/game/Common/free", this.btnIcon);
                this.btnIcon.node.x = -57;
                break;
            default:
                this.btnIcon.node.scale = 1;
                App.CommonUtils.setSpriteFrame("Texture/game/Common/zs", this.btnIcon);
                this.btnIcon.node.x = -48;
                break;
        }
    }
}
