import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import NodePool from "../../../core/utils/NodePool";
import { AdData } from "../../config/AdDataManager";
import { AdShareStatus, AdType } from "../AD/ADController";
import { ShopViewData, ShopViewDataItem, SHOP_TYPE } from "./ShopController";
import ShopItem from "./ShopItem";
import { Platform } from "../../platform/Platform";

export enum ShopViewConst {
    //宝箱界面
    BOX_VIEW = 0,
    //金币界面
    MONEY_VIEW = 1,
    //钻石界面
    DIAMOND_VIEW = 2,
    //道具界面
    PROP_VIEW = 3,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopView extends BaseView implements IShareAndAd {
    @property(cc.ScrollView)
    protected scrollView: cc.ScrollView = null;
    @property(cc.Toggle)
    protected allToggle: cc.Toggle[] = [];
    protected _items: cc.Node[] = [];
    protected _data: ShopViewData;
    @property([cc.Node])
    protected pages: cc.Node[] = [];
    @property(NodePool)
    shopItemPool: NodePool = null;
    protected shopItems: ShopItem[] = [];
    public bgType: BG_TYPE = BG_TYPE.GRAY;
    protected adStatus: AdShareStatus = null;
    protected openViewNumber: ShopViewConst = null;
    // /** 金币 */
    // @property(cc.Label)
    // protected moneyLab: cc.Label = null;

    // /** 钻石 */
    // @property(cc.Label)
    // protected diamondLab: cc.Label = null;
    // public moneyBar: cc.Node = null;
    // public zuBar: cc.Node = null;
    initUI() {
        super.initUI();

        if (Platform.instance.checkIsNotch()) {//是否需要适配的刘海屏幕
            Log.trace("刘海屏适配");
            let widget = this.getComponent(cc.Widget);
            widget.top = 40;
        }

        // this.clickShopSelect(null, SHOP_TYPE.SUPER_CASH);
        // this.zuBar = this.node.getChildByName("TopBgSp").getChildByName("DiamondBar")
        // this.moneyBar = this.node.getChildByName("TopBgSp").getChildByName("MoneyBar");
    }
    closeScrollView(index: number) {
        this.scrollView[index].node.active = false;
    }

    /**点击不同按钮，显示不同类型的商品*/
    clickShopSelect(event: cc.Toggle) {
        this.openDifferentView();
    }

    openDifferentView() {
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].active = this.allToggle[i].isChecked;
        }
    }

    // //设置content的长度
    // setContentHiht(i: number) {
    //     let cnt = this.shopItmeCnt[i];
    //     let temp = Math.ceil(cnt / 3);
    //     this.scrollView.content.height = this.shopItems[0].node.height * temp;
    // }

    setOpenView(state: ShopViewConst) {
        this.openViewNumber = state;
    }

    public open(shopType: SHOP_TYPE = SHOP_TYPE.SUPER_CASH) {
        super.open();
        for (let i = 0; i < this.allToggle.length; i++) {
            this.allToggle[i].isChecked = shopType === i;
        }
        this.openDifferentView();
        // ADController.getInstance().registerItem(AdType.SHOP_BX, this);
        // ADController.getInstance().registerItem(AdType.SHOP_ZS, this);

    }

    public close() {
        super.close();
        // let arrLen = this.pages.length;
        // for (let i = 0; i < arrLen; i++) {
        //     for (let j = this.pages[i].children.length - 1; j >= 0; j--) {
        //         this.shopItemPool.push(this.pages[i].children[j]);
        //     }
        // }
        // ADController.getInstance().unregisterItem(AdType.SHOP_BX, this);
        // ADController.getInstance().unregisterItem(AdType.SHOP_ZS, this);
    }
    public updateData() {
        for (const iterator of this.shopItems) {
            iterator.updateData();
        }

        // if (this.openViewNumber == ShopViewConst.BOX_VIEW) {
        //     this.openDifferentView(0);
        //     this.allToggle[0].isChecked = true;
        //     this.openViewNumber = null;
        // } else if (this.openViewNumber == ShopViewConst.MONEY_VIEW) {
        //     this.openDifferentView(1);
        //     this.allToggle[1].isChecked = true;
        //     this.openViewNumber = null;
        // } else if (this.openViewNumber == ShopViewConst.DIAMOND_VIEW) {
        //     this.openDifferentView(2);
        //     this.allToggle[2].isChecked = true;
        //     this.openViewNumber = null;
        // } else if (this.openViewNumber == ShopViewConst.PROP_VIEW) {
        //     this.openDifferentView(3);
        //     this.allToggle[3].isChecked = true;
        //     this.openViewNumber = null;
        // }
    }
    public setData(shopViewData: ShopViewData) {
        let arrLen = shopViewData.length;
        for (let i = 0; i < arrLen; i++) {
            let dataList: ShopViewDataItem[] = shopViewData[i];
            let page = this.pages[i];
            let arrLen = dataList.length;
            if (dataList.length) {
                this.allToggle[i].node.active = true;
                for (let i = 0; i < arrLen; i++) {
                    let shopViewData = dataList[i];
                    let shopNode = this.shopItemPool.pop();
                    shopNode.name = shopNode.name + i;
                    let shopItem = shopNode.getComponent(ShopItem);
                    this.shopItems.push(shopItem);
                    page.addChild(shopNode);
                    shopItem.setData(shopViewData);
                }
            } else {
                this.allToggle[i].node.active = false;
            }
        }
    }

    // /** 增加钻石 */
    // protected onTouchDiamondBtn() {
    //     this.openDifferentView(2);
    //     this.allToggle[2].isChecked = true;
    //     this.openViewNumber = null;
    // }
    // /** 增加金币 */
    // protected onTouchJinBiBtn() {
    //     this.openDifferentView(1);
    //     this.allToggle[1].isChecked = true;
    //     this.openViewNumber = null;
    // }


    // /**
    // * 切换成分享状态
    // */
    // toShare(type: AdType, conf: AdData, data: any) {
    //     this.adStatus = AdShareStatus.SHARE;
    //     for (let key in this.shopItems) {
    //         let itemdata = this.shopItems[key].getShopItemData();
    //         if (itemdata.conf.itemIndex == 1 && type == AdType.SHOP_BX) {
    //             this.shopItems[key].toShare(type, conf, data);
    //             break;
    //         } else if (itemdata.conf.itemIndex == 10 && type == AdType.SHOP_ZS) {
    //             this.shopItems[key].toShare(type, conf, data);
    //             break;
    //         }
    //     }
    // }

    // /**
    //  * 切换成广告状态
    //  */
    // toAd(type: AdType, conf: AdData, data: any, adState: AdState) {
    //     this.adStatus = AdShareStatus.AD;
    //     for (let key in this.shopItems) {
    //         let itemdata = this.shopItems[key].getShopItemData();
    //         if (itemdata.conf.itemIndex == 1 && type == AdType.SHOP_BX) {
    //             this.shopItems[key].toAd(type, conf, data, adState);
    //             break;
    //         } else if (itemdata.conf.itemIndex == 10 && type == AdType.SHOP_ZS) {
    //             this.shopItems[key].toAd(type, conf, data, adState);
    //             break;
    //         }
    //     }
    // }
    // /**
    //  * 切换成支付状态
    //  */
    // toPay(type: AdType, conf: AdData, data: any) {
    // }
    // /**
    //  * 切换成用超级现金购买状态
    //  */
    // toSupercash(type: AdType, conf: AdData, data: any) {
    // }
    // /**
    //  * 免费赠送状态
    //  */
    // toFree(type: AdType, conf: AdData, data: any) {
    //     for (let key in this.shopItems) {
    //         let itemdata = this.shopItems[key].getShopItemData();
    //         if (itemdata.conf.itemIndex == 1 && type == AdType.SHOP_BX) {
    //             this.shopItems[key].toFree(type, conf, data);
    //             break;
    //         } else if (itemdata.conf.itemIndex == 10 && type == AdType.SHOP_ZS) {
    //             this.shopItems[key].toFree(type, conf, data);
    //             break;
    //         }
    //     }
    // }
    // /**
    //  * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
    //  */
    toFail(type: AdType, conf: AdData, data: any, adState?: any) {
        //     for (let key in this.shopItems) {
        //         let itemdata = this.shopItems[key].getShopItemData();
        //         if (itemdata.conf.itemIndex == 1 && type == AdType.SHOP_BX) {
        //             this.shopItems[key].toFail(type, conf, data, adState);
        //             break;
        //         } else if (itemdata.conf.itemIndex == 10 && type == AdType.SHOP_ZS) {
        //             this.shopItems[key].toFail(type, conf, data, adState);
        //             break;
        //         }
        //     }
    }
}