import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import { UI } from "../../../core/utils/Image";
import MoneyIcon from "../../component/MoneyIcon";
import { AdData } from "../../config/AdDataManager";
import { ControllerConst } from "../../consts/ControllerConst";
import { ViewConst } from "../../consts/ViewConst";
import { AdShareStatus, AdType } from "../AD/ADController";
import { AdState } from "../AD/ADManageBase";
import BoxItem from "../bag/BoxItem";
import MoneyItem from "../bag/MoneyItem";
import { TIPSTATE } from "../GameUI/GameUIConst";
import { ShopConst, ShopViewDataItem, SHOP_TYPE } from "./ShopController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem extends cc.Component {
    @property(cc.Label)
    protected btnLab: cc.Label = null;
    @property(cc.Node)
    protected countNode: cc.Node = null;
    @property(cc.Node)
    protected shopBtn: cc.Node = null;

    @property(cc.Label)
    protected getMoneyLab: cc.Label = null;
    @property({
        type: UI.Image,
        tooltip: "商品icon"
    })
    protected itemSp: UI.Image = null;

    @property({
        type: MoneyIcon,
        tooltip: "按钮icon"
    })
    protected btnIcon: MoneyIcon = null;

    // @property({
    //     type: MoneyIcon,
    //     tooltip: "获得的物品的icon"
    // })
    // protected getItemIcon: MoneyIcon = null;
    protected adType: AdType = null;
    protected adStatus: AdShareStatus = null;
    protected adState: AdState = null;
    //商品类型
    protected shopType: SHOP_TYPE = null;
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onToucnEnd, this);
    }

    //飘金币动画
    // protected playJBAni(){
    //     if(this.shopType === SHOP_TYPE.GOLD){
    //         App.ControllerManager.applyFunc(ControllerConst.Shop, ShopConst.SHOP_JB_ANI, 0);
    //     }else if(this.shopType === SHOP_TYPE.SUPER_CASH){
    //         App.ControllerManager.applyFunc(ControllerConst.Shop, ShopConst.SHOP_JB_ANI, 1);
    //     }
    // }

    public async buy() {
        App.ControllerManager.applyFunc(ControllerConst.Shop, ShopConst.BUY_ITEM, this.data);
        // if (this.data.conf.itemIndex == 1 || this.data.conf.itemIndex == 10) {
        //     //可能需要看广告的商品
        //     if (this.data.itemData.cnt == 0) {
        //         let result = await ADController.getInstance().openAdByTypeAsync(this.adType);
        //         if (result) {
        //             App.ControllerManager.applyFunc(ControllerConst.Shop, ShopConst.BUY_ITEM, this.data, this.shopType);
        //             //this.playJBAni();
        //             return;
        //         } else {
        //             return;
        //         }
        //     }
        // }
        // App.ControllerManager.applyFunc(ControllerConst.Shop, ShopConst.BUY_ITEM, this.data, this.shopType);
    }

    protected onToucnEnd() {

        if (this.data.conf.shopType === SHOP_TYPE.BOX) {
            //     App.ViewManager.open(ViewConst.BoxTipView, this.data, this.adStatus, this.data.conf.superCash, this);
        }
        // else if (this.data.conf.shopType === SHOP_TYPE.SUPER_CASH) {
        //     App.ViewManager.open(ViewConst.TipView, {
        //         curState: TIPSTATE.SURE,
        //         leftBtnText: this.data.itemData.cnt ? GameText.getText(lang.common_use) : GameText.getText(lang.common_buy),
        //         // leftBtnText: /*this.data.itemData.cnt ? "开启" : "购买"*/"观看",
        //         leftFunc: this.buy,
        //         leftThisObj: this,
        //         tipsStr: this.data.itemData.cnt ? GameText.getText(lang.store_use_tip).format(this.data.conf.tip) : GameText.getText(lang.store_buy_tip).format(this.data.conf.tip),
        //         // tipsStr: this.data.itemData.cnt ? `是否开启${this.data.conf.tip}` : `观看视频后获得${this.data.conf.tip}`,
        //         hasCloseBtn: true,
        //     } as COMMON_BOX)
        // }
        else {
            App.ViewManager.open(ViewConst.TipView, {
                curState: TIPSTATE.SURE,
                leftBtnText: this.data.itemData.cnt ? GameText.getText(lang.common_use) : GameText.getText(lang.common_buy),
                leftFunc: this.buy,
                leftThisObj: this,
                tipsStr: this.data.itemData.cnt ? GameText.getText(lang.store_use_tip).format(this.data.itemData.getName()) : GameText.getText(lang.store_buy_tip).format(this.data.itemData.getName()),
                hasCloseBtn: true,
            } as COMMON_BOX)
        }
    }

    //可观看广告获取的商品处理
    protected checkADitem(): boolean {
        if (this.data.conf.yuan == 9999) {
            this.btnIcon.node.x = -50;
            this.btnIcon.node.scale = 0.7;
            if (this.adStatus === AdShareStatus.SHARE) {
                this.btnIcon.setShare();
            } else {
                this.btnIcon.setAD();
            }
            return true;
        }
        this.btnIcon.node.x = -40;
        return false;
    }

    // Label
    public updateData() {
        this.setData(this.data);
    }
    protected data: ShopViewDataItem = null;
    public setData(data: ShopViewDataItem) {
        this.data = data;
        this.itemSp.source = data.itemData.getItemPic();
        if (data.conf.yuan) {
            // if (!this.checkADitem()) {
            this.btnLab.string = data.conf.yuan + "";
            this.btnIcon.setYuan();
            // }
        } else {
            this.btnIcon.setDiamond();
            this.btnLab.string = data.conf.superCash + "";
        }
        if (data.itemData.cnt) {
            this.countNode.getComponentInChildren(cc.Label).string = data.itemData.cnt + "";
            this.countNode.active = true;
        } else {
            this.countNode.active = false;
        }
        // //防止被道具label修改
        // this.getMoneyLab.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        // this.getMoneyLab.node.x = 43.2;
        // this.getMoneyLab.fontSize = 30;
        // this.getMoneyLab.node.width = 150;
        switch (data.conf.shopType) {
            case SHOP_TYPE.GOLD:
                this.intGoldItem();
                this.shopType = SHOP_TYPE.GOLD;
                break;
            case SHOP_TYPE.SUPER_CASH:
                this.intSuperItem();
                this.shopType = SHOP_TYPE.SUPER_CASH;
                break;
            case SHOP_TYPE.BOX:
                this.intBoxItem();
                this.checkBoxcnt();
                this.shopType = SHOP_TYPE.BOX;
                break;
            case SHOP_TYPE.PROP:
                this.intPeopleItem();
                this.checkBoxcnt();
                this.shopType = SHOP_TYPE.PROP;
                break;
        }

    }

    //道具
    protected intPeopleItem() {
        let item = this.data.itemData as BoxItem;
        let conf = this.data.conf;
        // this.getItemIcon.node.active = false;
        this.getMoneyLab.string = this.propName(this.data.conf.name);
        this.getMoneyLab.node.x = 20;
        //this.itemSp.node.scale  = 1.45;
        this.getMoneyLab.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.getMoneyLab.node.x = 0;
        this.getMoneyLab.fontSize = 25;
        this.getMoneyLab.node.width = 180;
    }

    protected intSuperItem() {
        let item = this.data.itemData as BoxItem;
        let conf = this.data.conf;
        // this.getItemIcon.node.active = true;
        // this.getItemIcon.setDiamond();
        this.getMoneyLab.string = this.data.itemData.getDisplayCnt();
    }
    protected intBoxItem() {
        let item = this.data.itemData as BoxItem;
        let conf = this.data.conf;
        // this.getItemIcon.node.active = false;
        this.getMoneyLab.string = this.data.conf.name;
        this.getMoneyLab.node.x = 20;

    }
    protected intGoldItem() {
        // let data = this.data;
        let item = this.data.itemData as MoneyItem;
        let conf = this.data.conf;
        // this.getItemIcon.node.active = true;
        // this.getItemIcon.setMoneyType(null);
        this.getMoneyLab.string = this.data.itemData.getDisplayCnt();
    }

    //检查普通宝箱是否已经用完
    checkBoxcnt() {
        // if (this.data.conf.itemIndex == BoxConst.GENERAL_BOX) {
        //     if (this.data.itemData.cnt == 0) {
        //         if (this.adState === AdState.loading) {
        //             //广告加载中
        //             this.canUseBtn(false, "广告加载中");
        //         } else {
        //             //加载成功
        //             this.canUseBtn(true, "免费领取");
        //         }
        //         this.btnIcon.node.active = true;
        //         this.btnIcon.node.x = -50;
        //         this.btnLab.node.x = 19;
        //         //分享状态
        //         if (this.adStatus === AdShareStatus.SHARE) {
        //             this.btnIcon.setShare();
        //         } else if (this.adStatus === AdShareStatus.AD) {
        //             this.btnIcon.setAD();
        //         } else if (this.adStatus === AdShareStatus.FREE) {
        //             this.btnIcon.setFree();
        //         }
        //         else {
        //             this.canUseBtn(false, "次数用完");
        //             this.btnIcon.setAD();
        //         }
        //         return;
        //     }
        //     this.btnIcon.node.active = false;
        //     this.btnLab.node.x = 0;
        //     this.canUseBtn(true, "开启");
        // } else {
        //     if (this.data.itemData.cnt !== 0) {
        //         this.btnIcon.node.active = false;
        //         this.canUseBtn(true, "开启");
        //         this.btnLab.node.x = 0;
        //     } else {
        //         this.btnIcon.node.active = true;
        //         this.btnLab.node.x = 19;
        //     }
        // }
    }

    //道具名字换行
    propName(ItemDesc: string) {
        let itemDesc = ItemDesc;
        let arr: string[] = [];
        arr = itemDesc.split("|");
        let Label1 = arr[0];
        let Label2 = arr[1];
        if (Label2) {
            return Label1 + "\n" + Label2;
        } else {
            return Label1;
        }
    }

    //获取shopItemData
    getShopItemData() {
        return this.data;
    }


    //按钮状态
    canUseBtn(isUse: boolean, lab: string) {
        this.shopBtn.getComponent(cc.Button).interactable = isUse;
        if (isUse) {
            this.shopBtn.getChildByName("Background").color = cc.Color.WHITE;
            this.node.on(cc.Node.EventType.TOUCH_END, this.onToucnEnd, this);
        } else {
            this.shopBtn.getChildByName("Background").color = cc.Color.GRAY;
            this.node.off(cc.Node.EventType.TOUCH_END, this.onToucnEnd, this);
        }
        this.btnLab.string = lab;
    }

    //检查宝箱数量
    checkBoxNum(type: AdType): boolean {
        if (type == AdType.SHOP_BX && this.data.itemData.cnt > 0) {
            //宝箱数量大于0
            this.canUseBtn(true, GameText.getText(lang.common_open));
            return true;
        }
        return false;
    }

    /**
    * 切换成分享状态
    */
    toShare(type: AdType, conf: AdData, data: any) {
        this.adStatus = AdShareStatus.SHARE;
        this.adType = type;
        this.adState = null;
        if (this.checkBoxNum(type)) {
            return;
        }
        this.canUseBtn(true, GameText.getText(lang.common_free_get));
    }

    /**
     * 切换成广告状态
     */
    toAd(type: AdType, conf: AdData, data: any, adState: AdState) {
        this.adStatus = AdShareStatus.AD;
        this.adType = type;
        this.adState = null;
        //区分宝箱还是钻石
        if (this.checkBoxNum(type)) {
            return;
        }
        switch (adState) {
            case AdState.loading:
                //广告加载中
                this.adState = adState;
                this.canUseBtn(false, GameText.getText(lang.common_ad_loading));
                break;
            case AdState.success:
                //广告加载成功
                this.canUseBtn(true, GameText.getText(lang.common_free_get));
                break;
            default:
                this.canUseBtn(false, GameText.getText(lang.common_ad_fail));
                break;
        }
    }
    /**
     * 切换成支付状态
     */
    toPay(type: AdType, conf: AdData, data: any) {
    }
    /**
     * 切换成用超级现金购买状态
     */
    toSupercash(type: AdType, conf: AdData, data: any) {
    }
    /**
     * 免费赠送状态
     */
    toFree(type: AdType, conf: AdData, data: any) {
        this.adStatus = AdShareStatus.FREE;
        this.adType = type;
        this.adState = null;
        if (this.checkBoxNum(type)) {
            return;
        }
        this.canUseBtn(true, GameText.getText(lang.common_free_get));
    }
    /**
     * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
     */
    toFail(type: AdType, conf: AdData, data: any, adState?: any) {
        this.adStatus = AdShareStatus.NONE;
        this.adType = type;
        this.adState = null;
        this.canUseBtn(false, GameText.getText(lang.common_ad_finish));
        this.btnIcon.setAD();
    }
}
