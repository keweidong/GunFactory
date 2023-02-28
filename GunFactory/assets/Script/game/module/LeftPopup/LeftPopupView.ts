import BaseView from "../../../core/mvc/view/BaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import App from "../../../core/App";
import { ViewConst } from "../../consts/ViewConst";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { Platform } from "../../platform/Platform";
import { UI } from "../../../core/utils/Image";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LeftPopupView extends BaseView {
    @property(cc.Label)
    protected nameLabel: cc.Label = null;
    @property(cc.Label)
    protected IDLabel: cc.Label = null;
    //头像
    @property(UI.Image)
    protected headSprite: UI.Image = null;
    //左边弹窗节点
    @property(cc.Node)
    protected LeftWindowNode: cc.Node = null;
    protected isPlaying: boolean = null;

    bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
    }

    public open() {
        super.open();
        this.isPlaying = false;
        this.IDLabel.string = App.GameDataMsr.playerInfo.id;
        this.nameLabel.string = App.StringUtil.CutStr(App.GameDataMsr.playerInfo.nickName, 12);
        //Log.warn("微信App.GameDataMsr.playerInfo.head:",App.GameDataMsr.playerInfo.head);
        if (App.GameDataMsr.playerInfo.head) {
            //Log.warn("微信左侧弹窗加载头像前:");
            //App.CommonUtils.setSpriteFrame(App.GameDataMsr.playerInfo.head,this.headSprite);
            this.headSprite.source = App.GameDataMsr.playerInfo.head;
            //Log.warn("微信左侧弹窗加载头像后:");
        }
    }

    //设置名字
    setName(nameStr: string) {
        this.nameLabel.string = nameStr;
    }
    //设置头像
    setHead(headStr: string) {
        this.headSprite.source = headStr;
    }
    //设置用户id
    setUserId(IdLab: string) {
        this.IDLabel.string = IdLab;
    }

    /** 点击地图按钮 */
    protected onTouchMapBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.MAP);

        if (isOpen) {
            App.ViewManager.open(ViewConst.MapView);
            this.closeView();
        }
    }

    /** 点击在线奖励 */
    protected onTouchOnlineBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.ONLINE);

        if (isOpen) {

        }

    }


    /** 点击商城按钮 */
    protected onTouchShopBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);

        if (isOpen) {
            App.ViewManager.open(ViewConst.ShopView);
            this.closeView();
        }
    }

    /** 点击设置按钮 */
    protected onTouchSettingBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SETTING);

        if (isOpen) {
            App.ViewManager.open(ViewConst.SettingView);
        }
    }

    /** 点击排行榜 */
    protected async onTouchRankBtn(event: cc.Event) {
        //检查微信登录
        let result = await Platform.instance.isWXLogin();
        if (result) {
            App.ViewManager.open(ViewConst.RankView);
        }

    }

    /**七天签到*/
    protected onTouchSevenDaysBtn(event: cc.Event) {
        App.ViewManager.open(ViewConst.SevenDaysView);
    }

    protected onTouchStartBtn() {
        App.ViewManager.open(ViewConst.StarView);
    }

    //关闭弹窗
    closeView() {
        this.onTouchClose();
    }

    onTouchBg() {
        this.viewExit();
    }

    //弹窗退出动画
    viewExit() {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.LeftWindowNode.x = -325;
        let action = cc.moveTo(0.3, -750, 0);
        // 执行动作
        //this.LeftWindowNode.runAction(action);
        this.LeftWindowNode.runAction(cc.sequence(action, cc.callFunc(this.closeView, this), cc.callFunc(this.noPlaying, this)));
    }

    //
    noPlaying() {
        this.isPlaying = false;
    }

    //弹窗弹出动画
    viewShow() {
        if (this.isPlaying) {
            return;
        }
        //this.isPlaying = true;
        this.LeftWindowNode.x = -750;
        let action = cc.moveTo(0.3, -325, 0);
        // 执行动作
        this.LeftWindowNode.runAction(action);
    }
}
