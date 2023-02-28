import App from "../../core/App";
import { GameText } from "../../core/lang/GameText";
import { AdData } from "../config/AdDataManager";
import { ControllerConst } from "../consts/ControllerConst";
import { AdType } from "../module/AD/ADController";
import { ADConst, AdState } from "../module/AD/ADManageBase";
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/AdShareBtnCtr")
export default class AdShareBtnCtr extends cc.Component implements IShareAndAd {
    /**广告点类型 */
    @property({ type: cc.Enum(AdType), tooltip: "广告点类型" })
    public adType: AdType = 0;
    // protected tempStr: string = "";
    protected button: cc.Button = null;

    /**广告点icon */
    @property({ type: cc.Sprite, tooltip: "广告点icon" })
    protected sprite: cc.Sprite = null;
    /**广告点label */
    @property({ type: cc.Label, tooltip: "广告点label" })
    protected label: cc.Label = null;

    /**分享状态是显示的文字 */
    @property({ tooltip: "分享状态是显示的文字" })
    public shareStr: string = "";

    /**免费状态是显示的文字 */
    @property({ tooltip: "免费状态是显示的文字" })
    public freeStr: string = "";

    /**广告加载完毕显示的文字 */
    @property({ tooltip: "广告加载完毕显示的文字" })
    public adStr: string = "";

    /**广告加载失败显示的文字 */
    @property({ tooltip: "广告加载失败显示的文字" })
    public adFailStr: string = "";

    /**广告点无法使用显示的文字 */
    @property({ tooltip: "广告点无法使用显示的文字" })
    public failStr: string = "";

    /**广告加载过程中显示的文字 */
    @property({ tooltip: "广告加载过程中显示的文字" })
    public adLoadingStr: string = GameText.getText(lang.common_ad_loading);////"加载中";



    /**切换到广告状态回调 */
    @property({ type: cc.Component.EventHandler, tooltip: "切换到广告状态回调" })
    toAdEvent: cc.Component.EventHandler[] = [];

    /**切换到广告点失效状态回调 */
    @property({ type: cc.Component.EventHandler, tooltip: "切换到广告点失效状态回调" })
    toFailEvent: cc.Component.EventHandler[] = [];

    /**切换到分享状态回调 */
    @property({ type: cc.Component.EventHandler, tooltip: "切换到分享状态回调" })
    toShareEvent: cc.Component.EventHandler[] = [];

    /**切换到免费状态回调 */
    @property({ type: cc.Component.EventHandler, tooltip: "切换到免费状态回调" })
    toFreeEvent: cc.Component.EventHandler[] = [];

    /**切换到支付状态回调 */
    @property({ type: cc.Component.EventHandler, tooltip: "切换到支付状态回调" })
    toPayEvent: cc.Component.EventHandler[] = [];

    /**使用超级现金购买显示的文字 */
    @property({ tooltip: "使用超级现金购买显示的文字" })
    public supercashStr: string = "";
    /**切换到用超级现金购买状态回调 */
    @property({ type: cc.Component.EventHandler, tooltip: "切换到用超级现金购买状态回调" })
    toSupercashEvent: cc.Component.EventHandler[] = [];

    protected isFirst: boolean = true;
    protected imgUrl = "";

    onLoad() {

        if (this.sprite) {
            // this.sprite.spriteFrame = null;
            // this.sprite.spriteFrame.ensureLoadTexture();
        }
        if (!this.shareStr) {
            this.shareStr = this.adStr;
        }
        if (!this.adFailStr) {
            this.adFailStr = this.adStr;
        }
        if (!this.freeStr) {
            this.freeStr = this.adStr;
        }
        if (!this.supercashStr) {
            this.supercashStr = this.adStr;
        }
        if (!this.failStr) {
            this.failStr = this.adStr;
        }
        this.button = this.getComponent(cc.Button);
    }
    /**
     * todo 当精灵有默认图片的时候,如果预制体开启了延迟加载,那么首次打开加载切换图片会有问题.
     * 现在暂时的做法是不给精灵设置默认图片,后续有空再研究是什么原因导致的
     * @param url 
     * @param sprite 
     */
    public setSpriteFrame(url: string, sprite: cc.Sprite) {
        if (this.imgUrl === url) {
            return;
        }
        this.imgUrl = url;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame: cc.SpriteFrame) {
            if (err) {
                CC_DEBUG && Log.error("资源加载出错", url);
            }
            else {
                sprite.spriteFrame = spriteFrame;
            }
        });
    }
    // protected getResCb(err, spriteFrame: cc.SpriteFrame) {
    //     if (err) {
    //         CC_DEBUG && Log.error("资源加载出错", url);
    //     }
    //     else {
    //         sprite.spriteFrame = spriteFrame;
    //     }
    // }
    /**
     * 切换成广告状态
     */
    toAd(type: AdType, conf: AdData, data: any, adState: AdState) {
        this.sprite && this.setSpriteFrame("Texture/game/Common/icons/icon_ad", this.sprite);
        if (adState === AdState.loading) {
            this.label && (this.label.string = this.adLoadingStr);
            this.button.interactable = false;
        } else if (adState === AdState.success) {
            this.button.interactable = true;
            this.label && (this.label.string = this.adStr);
        } else if (adState === AdState.fail) {
            this.button.interactable = false;
            this.label && (this.label.string = this.adFailStr);
        }
        cc.Component.EventHandler.emitEvents(this.toAdEvent, type, conf, data, adState);
    }
    toShare() {
        this.sprite && this.setSpriteFrame("Texture/game/Common/icons/icon_share", this.sprite);
        this.label && (this.label.string = this.shareStr);
        this.button.interactable = true;
        cc.Component.EventHandler.emitEvents(this.toShareEvent);
    }

    toFail(type: AdType, conf: AdData, data: any) {
        this.label && (this.label.string = this.failStr);
        this.button.interactable = false;
        cc.Component.EventHandler.emitEvents(this.toFailEvent);
    }

    toFree(type: AdType, conf: AdData, data: any) {
        this.sprite && this.setSpriteFrame("Texture/game/Common/icons/icon_free", this.sprite);
        this.label && (this.label.string = this.freeStr);
        this.button.interactable = true;
        cc.Component.EventHandler.emitEvents(this.toFreeEvent);
    }
    /**
     * 切换成支付状态
     */
    toPay(type: AdType, conf: AdData, data: any) {
        cc.Component.EventHandler.emitEvents(this.toPayEvent);
    }
    /**
     * 切换成用超级现金购买状态
     */
    toSupercash(type: AdType, conf: AdData, data: any) {
        // this.setSpriteFrame("Texture/game/Common/icons/free_icon", this.sprite);
        this.label && (this.label.string = this.supercashStr);
        this.button.interactable = true;
        cc.Component.EventHandler.emitEvents(this.toSupercashEvent);
    }
    onEnable() {
        Log.trace("注册广告点:", AdType[this.adType]);
        // this.registerFunc(ADConst.REGISTER_ITEM, this.registerItem, this);
        // this.registerFunc(ADConst.UNREGISTER_ITEM, this.unregisterItem, this);
        App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.REGISTER_ITEM, this.adType, this);

    }
    onDisable() {
        Log.trace("解除注册广告点:", AdType[this.adType]);
        App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.UNREGISTER_ITEM, this.adType, this);
    }

}