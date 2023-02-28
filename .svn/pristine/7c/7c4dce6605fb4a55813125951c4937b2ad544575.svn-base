import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import EffectUtils from "../../../core/utils/EffectUtils";
import { UI } from "../../../core/utils/Image";
import { ControllerConst } from "../../consts/ControllerConst";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { Platform } from "../../platform/Platform";
import { CostType } from "../bag/BagController";
import { GameConst } from "../GameMain/GameConst";
import { HappyConst } from "../Happy/HappyConst";
import { ShopConst, SHOP_TYPE } from "../Shop/ShopController";
import { ShopViewConst } from "../Shop/ShopView";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import { GameRecorderConst } from "../ToutiaoGameRecorder/GameRecorderConst";
import { UserLevelConst } from "../UserLevel/UserLevelController";
import CookAccelerateBtn from "./CookAccelerateBtn";
import FreeBuffBar from "./FreeBuffBar";
import { GameUIConst } from "./GameUIConst";
import { AdType } from "../AD/ADController";
import { ExploreConst } from "../Explore/ExploreConst";
import GameController from "../GameMain/GameController";
import ExploreBtn from './ExploreBtn';
import GameRecorderController from "../ToutiaoGameRecorder/GameRecorderController";
import WorldScene from "../GameMain/object/scene/WorldScene";
import Toast from "../../../core/utils/Toast";



const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("View/GameUIView")
export default class GameUIView extends BaseView implements IHappyBarView, IUserLevelView {
    @property(UI.Image)
    protected headImg: UI.Image = null;

    /** 金币 */
    @property(cc.Label)
    protected moneyLab: cc.Label = null;

    /** 钻石 */
    @property(cc.Label)
    protected diamondLab: cc.Label = null;

    /**用户升级按钮 */
    @property({ type: cc.Button, tooltip: "用户升级按钮" })
    protected userUpgradeBtn: cc.Button = null;

    /**用户经验条 */
    @property({ type: cc.Sprite, tooltip: "用户经验条" })
    protected userExpBar: cc.Sprite = null;
    /**用户等级label */
    @property({ type: cc.Label, tooltip: "用户等级label" })
    protected userLevelLab: cc.Label = null;

    /** 秒产 */
    @property(cc.Label)
    protected makeCoin: cc.Label = null;

    public moneyBar: cc.Node = null;
    public zuBar: cc.Node = null;
    @property(cc.Node)
    protected mapBtnNode: cc.Node = null;

    @property(FreeBuffBar)
    public freeBuffBar: FreeBuffBar = null;
    /**跳转到下一个场景的按钮 */
    @property(cc.Node)
    nextLevelBtnNode: cc.Node = null;

    @property(cc.Node)
    chenghaoNode: cc.Node = null;

    @property(cc.Sprite)
    chenghaoSprite: cc.Sprite = null;

    @property(CookAccelerateBtn)
    public cookAutoAccelerateBuffBar: CookAccelerateBtn = null;


    /**成就的红点 */
    @property(cc.Node)
    chengjiu_hongdian: cc.Node = null;
    /**录屏按钮 */
    @property(cc.Button)
    public luPingButton: cc.Button = null;

    /**结束录屏按钮 */
    @property(cc.Button)
    public closeluPingButton: cc.Button = null;

    /**录屏分享按钮 */
    @property(cc.Button)
    public share_Recorder: cc.Button = null;

    /**转发 */
    @property(cc.Node)
    public zhuanfa: cc.Node = null;

    /**转发文字 */
    @property(cc.Label)
    public zhuanfaLable: cc.Label = null;

    /**
     * 探索按钮
     */
    @property(cc.Node)
    public exploreBtn: cc.Node = null;

    /**
     * 探索的红点
     */
    @property(cc.Node)
    public hongdian_Explore: cc.Node = null;

    public world: WorldScene;

    public static width;
    public static height;

    onLoad() {
        // super.onLoad();
        App.TimerManager.doTimer(1000, 1, () => { GameUIView.width = this.node.width; GameUIView.height = this.node.height; Log.trace("屏幕宽：" + GameUIView.width + "屏幕高：" + GameUIView.height); }, this);
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        if (Platform.instance.checkIsNotch()) {
            let topBar = this.node.getChildByName("TopLayout");
            let widget = topBar.getComponent(cc.Widget);
            widget.top = 60;
            widget.enabled = true;
        }
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            this.zhuanfa.active = true;
            this.zhuanfaLable.string = "分享得钻石\n每日分享次数\n(" + this.world.GameShare + "/3)"
        }
        if (cc.sys.platform == cc.sys.TOUTIAO_GAME) {
            this.luPingButton.node.active = true;
        }
    }

    protected onTouchNextLevelBtn() {
        this.applyControllerFunc(ControllerConst.Game, GameConst.SCROLL_TO_NEXT_SCENE);
    }

    /**
     * 称号,只显示最大称号
     */
    public updateTitle(scenceid: number) {
        let url = "Texture/Chenghao/chenghao_" + scenceid;
        App.CommonUtils.setSpriteFrame(url, this.chenghaoSprite);
    }


    initUI() {
        super.initUI();
        let topBar = this.node.getChildByName("TopLayout");
        this.mapBtnNode.active = false;
        // this.freeBuffBar = topBar.getChildByName("FreeBuffBar").getComponent(FreeBuffBar);
        // if (cc.sys.platform != cc.sys.TOUTIAO_GAME) {
        //     Log.trace("平台类为", cc.sys.platform, "++");
        //     this.luPingButton.node.active = false;
        //     this.share_Recorder.node.active = false;
        // }


        // // this.registerBtn();
        this.zuBar = topBar.getChildByName("DiamondBar")
        this.moneyBar = topBar.getChildByName("MoneyBar");
        // this.freeDiaBtnLab = this.freeDiaBtn.node.getChildByName("freeDiaBtnLab").getComponent(cc.Label);
        // this.eventBtn.node.active = false;
        // this.freeDiaEffect.active = false;
        // this.rightPopupAni = this.rightPopupBtn.node.parent.getComponent(cc.Animation);
        // if (App.GameDataMsr.playerInfo.head) {
        //     this.headSp.source = App.GameDataMsr.playerInfo.head;
        // }
        if (cc.sys.platform != cc.sys.TOUTIAO_GAME) {
            this.share_Recorder.node.active = false;
            this.luPingButton.node.active = false;
        }
    }
    public setUserInfo(info: PlayerInfo) {
        // this.headImg

        this.headImg.source = info.head || "Texture/game/FriendCircle/tx";
        // App.CommonUtils.setSpriteFrame("Texture/game/Common/main_ui/touxiangkuang", this.headImg);
    }

    public setIsGuideFinish() {
        // this.mapBtnNode.active = true;
    }

    /**设置成就红点显示 */
    public setChengjiu_hongdian() {
        if (this.chengjiu_hongdian) {
            this.chengjiu_hongdian.active = true;
        }
    }
    /**关闭成就红点 */
    public closeChengjiu_hongdian() {
        if (this.chengjiu_hongdian) {
            this.chengjiu_hongdian.active = false;
        }
    }

    public setUserExp(curValue: number, maxValue: number) {
        curValue = Math.min(curValue, maxValue);
        let width = curValue * 675 / maxValue + 20;
        if (this.userExpBar.node.width === width) {
            return;
        }
        cc.Tween.stopAllByTarget(this.userExpBar.node);
        // if (CC_PREVIEW) {
        //     this.userUpgradeBtn.node.active = curValue >= maxValue;
        // } else {

        cc.tween(this.userExpBar.node).to((width - this.userExpBar.node.width) * 0.004, {
            width: width
        }).call(() => {
            this.userUpgradeBtn.node.active = curValue >= maxValue;
        })
            .start();
        // }
    }

    public setUserLevel(level: number) {
        this.userLevelLab.string = "Lv." + (level + 1);
        this.userUpgradeBtn.node.active = false;
        this.userExpBar.node.width = 0;
    }

    /**
     * 点击用户升级按钮
     */
    public onTouchUserUpgradeBtn() {
        App.ControllerManager.applyFunc(ControllerConst.UserLevel, UserLevelConst.UPGRADE)
    }

    /**
     * 点击探索按钮
     */
    public onTouchExploreBtn() {
        // this.hongdian_Explore.active = false;
        this.hideHongdian_Explore();
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.OnTouchExploreBtn);

        // App.TimerManager.doFrame
    }
    /**
     * 探索红点开启
     */
    showHongdian_Explore() {
        if (!this.hongdian_Explore) {
            return;
        }
        this.hongdian_Explore.active = true;

        let action1 = cc.scaleTo(0.2, 1.1);
        let action3 = cc.rotateTo(0.2, 15);
        let action2 = cc.scaleTo(0.2, 1);
        let action4 = cc.rotateTo(0.2, -15);
        var seq = cc.repeatForever(
            cc.sequence(
                action1,
                action3,
                action2,
                action4
            ));
        this.hongdian_Explore.runAction(seq);
    }
    /**
     * 关闭探索红点
     */
    hideHongdian_Explore() {
        if (!this.hongdian_Explore) {
            return;
        }
        this.hongdian_Explore.active = false;
        this.hongdian_Explore.stopAllActions();

    }

    start() {
        super.start();
        App.TimerManager.setFrameOut(2, () => {
            let target = this.happySp.node;
            let targetPos = target.parent.convertToWorldSpaceAR(target.position);
            App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.INIT_HAPPY_TIME, this, targetPos)
        }, this);
    }

    /**录屏开始按钮触发事件 */
    public recordertheGame() {
        Log.trace("点击录屏按钮");
        GameRecorderController.lupingType = 1;
        App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.START);
    }

    /**录屏停止按钮触发事件 */
    public StopRecorderTheGame() {
        Log.trace("点击停止按钮");
        App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.STOP);
    }

    /**录屏分享按钮触发事件 */
    public recorderSharetheGame() {
        App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.ShareRecorder, GameRecorderController.lupingType);
    }

    protected onTouchLuckBagBtn() {
        // LuckBagView
        this.applyFunc(GameUIConst.OPEN_LUCKBAGVIEW);
    }

    public setIdleMoney(money: MyBigLong) {
        this.makeCoin.string = GameText.getText(lang.common_per_second).format(money.toString());
    }
    /**
     * 播放获得金币动画
     */
    public playGetCoinAni(index: number) {
        let pos = null;
        if (index == CostType.coin) {
            //金币
            pos = this.moneyBar.convertToWorldSpaceAR(this.moneyBar.getChildByName("icon").position);
        } else if (index == CostType.diamond) {
            pos = this.zuBar.convertToWorldSpaceAR(this.zuBar.getChildByName("icon").position);
        }

        let parent = LayerManager.getLayer(LayerManager.UI_Tips);
        pos = parent.convertToNodeSpaceAR(pos);
        EffectUtils.instance.coinEffect(
            0,
            0,
            pos.x,
            pos.y,
            -index - 1,
            parent
        )
    }


    public setMoney(money: MyBigLong) {
        this.moneyLab.string = money.toString();
    }
    public setSuperCash(money: number) {
        this.diamondLab.string = money.toString();
    }

    public setBuffValue(value: number) {
        // this.buffLab.string = value.toFixed(1) + "倍";
    }

    public setContribution(value: number) {
        // this.contribuLab.string = value + "";
    }


    /** 增加钻石 */
    protected onTouchDiamondBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);

        if (isOpen) {
            this.controller.applyControllerFunc(ControllerConst.Shop, ShopConst.OPEN_VIEW, ShopViewConst.DIAMOND_VIEW);
            App.ViewManager.open(ViewConst.ShopView);
        }
    }
    /** 增加金币 */
    protected onTouchJinBiBtn(event: cc.Event) {
        let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);

        if (isOpen) {
            this.controller.applyControllerFunc(ControllerConst.Shop, ShopConst.OPEN_VIEW, ShopViewConst.MONEY_VIEW);
            App.ViewManager.open(ViewConst.ShopView);
        }
    }
    @property({
        type: cc.Label,
        tooltip: "当前地图名字label"
    })
    mapNameLab: cc.Label = null;

    /**----欢乐时光 start */

    /** 愉悦值 */
    @property(cc.Label)
    protected happyValue: cc.Label = null;

    /** 愉悦值进度条 */
    @property(cc.Sprite)
    protected happyPro: cc.Sprite = null;

    @property(cc.Sprite)
    public happySp: cc.Sprite = null;

    /** 开启超级加速按钮 */
    @property(cc.Button)
    protected happyBtn: cc.Button = null;
    protected isHappyAni: boolean = false;
    public setHappy(value: number, maxValue: number) {
        this.happyValue.string = value + "/" + maxValue;
        this.happyPro.fillRange = -value / maxValue;
        if (!this.isHappyAni && value >= maxValue) {
            // let action1 = cc.scaleTo(0.2, 1.1);
            // let action2 = cc.scaleTo(0.2, 1);
            // var seq = cc.repeatForever(
            //     cc.sequence(
            //         action1,
            //         action2
            //     ));
            // this.happyBtn.node.runAction(seq);
            this.happyBtn.node.getChildByName("cslight").active = true;
            this.happyBtn.getComponent(cc.Animation).play();
            this.isHappyAni = true;
        }
    }
    public hideHappyBarView() {
        this.happyBtn.node.active = false;
    }
    public updateHappyTime(value: number, maxValue: number) {
        this.happyValue.string = App.CommonUtils.getFormatBySecond1(value / 1000);
        this.happyPro.fillRange = -value / maxValue;
    }
    protected onTouchHappyBtn() {
        if (this.isHappyAni) {
            this.isHappyAni = false;
            this.happyBtn.node.getChildByName("cslight").active = false;
            // this.happyBtn.node.stopAllActions();
            this.happySp.node.angle = 0;
            this.happyBtn.getComponent(cc.Animation).stop();
            // this.happyBtn.node.scale = 1;
        }
        // this.applyFunc(HappyConst.OPEN_HAPPY);
        App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.OPEN_HAPPY);
    }
    // public startHappyTime(){

    // }
    // /** 点击商城按钮 */
    protected onTouchShopBtn(event: cc.Event) {
        // let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);

        App.ViewManager.open(ViewConst.ShopView, SHOP_TYPE.GOLD);
        // App.ViewManager.open(ViewConst.FoodActView, SHOP_TYPE.GOLD);

        // App.ViewManager.open(ViewConst.MapView);


    }

    protected OnTouchFriendCrileBtn(evrnt: cc.Event) {
        // let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FRIEND_CIRCLE);

        App.ViewManager.open(ViewConst.FriendCircleView);
    }
    protected onTouchMapBtn(event: cc.Event) {
        // let isOpen = this.controller.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.SHOP);

        // App.ViewManager.open(ViewConst.ShopView, SHOP_TYPE.GOLD);
        App.ViewManager.open(ViewConst.MapView);


    }
    /**成就 */
    protected OnTouchAchievementBtn(event: cc.Event) {
        App.ViewManager.open(ViewConst.AchievementView);
    }

    /**QQ排行榜 */
    protected OnTouchRank() {
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.ViewManager.open(ViewConst.FriendShareView);
        } else {
            Toast.launch(GameText.getText(lang.common_system_not_open));
        }
    }

    /** 点击设置按钮 */
    protected onTouchSettingBtn(event: cc.Event) {
        this.applyFunc(GameUIConst.OPEN_SETTING_VIEW)
    }

    /**------欢乐时光 end */
    //检查微信是否授权
    async isWXLogin() {
        let result = await Platform.instance.isWXLogin();
        Log.trace("检测是否微信授权_返回结果", result);
        if (result) {
            Log.trace("微信已经授权，打开左侧弹窗")
            // App.ViewManager.open(ViewConst.LeftPopupView);
        }
        return result;
    }

    /**游戏转发 */
    public stransmit() {
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.ViewManager.open(ViewConst.ShotView, true);
        }
    }

    public userUp() {
        App.ControllerManager.applyFunc(ControllerConst.UserLevel, UserLevelConst.UPGRADE)
    }
}