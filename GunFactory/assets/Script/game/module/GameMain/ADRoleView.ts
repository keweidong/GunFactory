import BaseView from "../../../core/mvc/view/BaseView";
import { AdType, ADController } from "../AD/ADController";
import { AdData } from "../../config/AdDataManager";
import { AdState } from "../AD/ADManageBase";
import App from "../../../core/App";
import { ControllerConst } from "../../consts/ControllerConst";
import { BagConst } from "../bag/BagConst";
import { ItemBase, UseItemResultData } from "../bag/ItemBase";
import { GameUIConst } from "../GameUI/GameUIConst";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";


const { ccclass, property } = cc._decorator;

//顾客广告弹窗
@ccclass
export default class ADRoleView extends BaseView {


    protected item: ItemBase = null;

    //广告按钮label
    @property(cc.Label)
    protected adBtnLabel: cc.Label = null;
    @property(cc.Label)
    protected tipsLab: cc.Label = null;

    //广告按钮
    @property(cc.Button)
    protected adBtn: cc.Button = null;

    //广告按钮icon
    @property(cc.Sprite)
    protected adIcon: cc.Sprite = null;
    
    public bgType: BG_TYPE = BG_TYPE.GRAY;

    //倍数
    multiple:number = 1;

    initUI() {
        super.initUI();
    }

    open(item: ItemBase,multiple:number) {
        super.open();
        this.item = item;
        this.tipsLab.string = this.item.getDesc();
        this.multiple = multiple;
        // ADController.getInstance().registerItem(AdType.CUSTOMER, this);
    }

    close() {
        super.close();
        // ADController.getInstance().unregisterItem(AdType.CUSTOMER);
        this.multiple = 1;
    }

    onTouchBg(){
        
    }

    //点击观看广告按钮
    protected async onTouchADBtn() {
        let result = await ADController.getInstance().openAdByTypeAsync(AdType.CUSTOMER);
        if (result) {
            ADController.getInstance().openAdByTypeAsync;
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.ADD_TIME, this.item.data.id, this.multiple);
            let result = <UseItemResultData<any>>App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, this.item.data.id, this.multiple);
            App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM_ANI, this.item, result, true);
            //App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, this.item.data.id, 1, true);
            this.onTouchClose();
            this.checkItemType(this.item.data.itemType);
        }
    }

    //检查哪种奖励，添加飘金币动画
    checkItemType(itemType: number) {
        switch (itemType) {
            case 0:
                //宝箱
                break;
            case 1:
                //金币
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, 0);
                break;
            case 2:
                //钻石
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, 1);
                break;
            default:
                break;
        }
    }
}
