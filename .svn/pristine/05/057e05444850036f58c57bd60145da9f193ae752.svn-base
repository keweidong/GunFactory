import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import ViewManager from "../../../core/mvc/ViewManager";
// import { ListenerManager } from "../ListenerManager";
import { AdData } from "../../config/AdDataManager";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { ViewConst } from "../../consts/ViewConst";
import { Platform } from "../../platform/Platform";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import { ADConst, AdEvent, AdState } from "./ADManageBase";
import { ADModel } from "./ADModel";
import ExploreAni from '../Explore/ExploreAni';

/**
 * 触发广告的奖励类型
 */
export enum AdType {
    /**
    * 闲置现金双倍领取
   */
    IDLE = 0,

    /**
     * 福袋免费金币
     */
    LUCK_BAG_COIN = 1,
    /**
     * 福袋免费钻石
     */
    LUCK_BAG_DIAMOND = 2,
    /**
     * 欢乐时光收益翻倍
     */
    DOUBLE_HAPPY_MONEY = 3,
    /**
     * 任务直接领取
     */
    TASK = 4,
    /**
     * 七天签到
    */
    SEVEN_DAY = 5,
    /**
     * 升级金钱双倍领取
     */
    LEVEL_UP_DOUBLE = 6,
    /**
     * 菜式免费升级
     */
    FOOD_FREE_UPGRADE = 7,
    /**
     * 厨师,员工,宣传免费升级
     */
    FREE_UPGRADE = 8,
    /**
     * 免费buff
     */
    FREE_BUFF = 9,
    /**
     * 免费解锁桌子
     */
    FREE_UNLOCK = 10,
    /**
     * 广告随机邀请明星
     */
    Invite_Star = 11,
    /**
     * 厨师自动加速
     */
    COOK_AUTO_ACCELERATE = 12,
    /**
     * 探索复活
     */
    EXPLORE_REVIVE = 13,
    // /**
    //  * 事件(十倍奖励)
    // */
    // TENFOLD = 1,
    // /**
    //  * 外卖一件送货
    // */
    // WAIMAI = 2,

    // /**
    // * 明星高级签约
    // */
    // STAR = 3,
    // /**
    //  * 商品看广告（钻石）
    // */
    // SHOP_ZS = 4,
    /**
    * 商品看广告（普通宝箱）
    */
    SHOP_BX = 5,
    // /**
    // * 赞助
    // */
    // ASSIST = 6,
    // /**
    //    * 看广告抽奖
    //   */
    // LUCK = 7,


    // /**
    //  * 待解锁摊位
    // */
    // TO_UNLOCK_BOOTH = 10,
    // /**
    //  * 免费升10级按钮
    // */
    // FREE_TEN_UPGRADE = 11,

    // /**
    //  * 顾客广告
    // */
    // CUSTOMER = 13,
    // /**
    //  * 常驻buff消费速度
    // */
    // RESIDENTBUFF_RATE = 14,
    // /**
    //  * 常驻buff消费速度
    // */
    // RESIDENTBUFF_GAIN = 15,
    // /**
    //  * 七天签到
    // */
    // SEVEN_DAYS = 16,
    // /**
    //  * 更换皮肤（）
    // */
    // MASCOT_CHANGE_SKIN = 17,
    // /**
    //  * 厨神活动
    //  */
    // FOOD_ACT = 18,
    // /**
    //  * 厨神祝福
    //  */
    // FOOD_ASSIST = 19,
    // /**
    // * 强制拉起广告
    // */
    // COMPEL_AD = 20,
    // /**
    // * 外卖提升
    // */
    // WAIMAI_UP = 21,
    // /**
    // * 幸运弹窗提升
    // */
    // ADROLEVIEW_UP = 22,
    // /**
    //  * 队伍加速提升
    //  */
    // TEAMUPUP_UP = 23,
    // /**
    //  * 天降宝箱提升
    //  */
    // EVENTBOX_UP = 24,
    // /**
    //  * 开业大吉
    // */
    // START_BUSINESS = 25,

}
/**
 * 广告点的状态
 */
export const enum AdShareStatus {
    NONE,
    /**可观看广告 */
    AD,
    /**可分享 */
    SHARE,
    /**可以支付 */
    PAY,
    /**可用超级现金 */
    SUPER_CASH,
    /**免费使用*/
    FREE,
}
export const enum AdSharePriority {
    NONE = 0,
    /**
     * 优先广告
     */
    AD = 1,
    /**
     * 优先分享
     */
    SHARE,
    /**
     * 优先支付
     */
    PAY,
    /**
     * 优先使用超级现金
     */
    SUPER_CASH,
}

//广告种类
export enum AdKind {
    /**
     * 普通广告
     */
    ORDINARY_AD = 0,
    /**
     * 强制广告
     */
    COMPEL_AD = 1,
}




export class ADController extends BaseController {
    private static instance: ADController;
    public static getInstance(): ADController {
        if (this.instance == null) {
            this.instance = new ADController();
        }
        return this.instance;
    }
    private adResolve: Function = null;
    /**
     * 这次看广告或者分享是哪个广告点
     */
    protected curAdType: AdType = null;
    /**
     * 当前广告状态
     */
    protected curAdStatus: number = null;
    public _model: ADModel = null;
    public world: WorldScene = null;

    constructor() {
        super();
        this.init();
        this._model = new ADModel(this);
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 1);
    }
    public init() {

        this.registerFunc(ADConst.OPENAD, this.openAdByTypeAsync, this);
        this.registerFunc(ADConst.REGISTER_ITEM, this.registerItem, this);
        this.registerFunc(ADConst.UNREGISTER_ITEM, this.unregisterItem, this);

        App.NotificationCenter.addListener(AdEvent.AD_SWITCH_STATUS, this.changeBtnWithADStatus, this);
        App.NotificationCenter.addListener(AdEvent.SHOW_AD_RESULT, this.onShowAdResult, this);
        App.NotificationCenter.addListener(NotificationConst.ON_HIDE, this.onHide, this);
        App.NotificationCenter.addListener(AdEvent.GET_AD_TAB_DATA, this.getAdTabData, this);
        App.NotificationCenter.addListener(AdEvent.GET_AD_CNT_DATA, this.getAdCntData, this);
        App.NotificationCenter.addListener(AdEvent.GET_AD_IS_SEE_OUT, this.adIsHas, this);
        App.NotificationCenter.addListener(NotificationConst.LOGOUT, this.onLogout, this);

    }
    protected onHide() {
        if (this.adResolve) {
            this.world.sceneMgr.nowScene.startIdleTime = 0;//防止观看广告结束的时候弹出离线收入框
        }
    }
    public initGame() {
        this._model.initShareStaticData();
        if (Platform.instance.isAutoShowInteractionAd()) {
            let isSuperOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.AUTO_INTERACTION_AD);
            if (isSuperOpen) {
                this.initInteractionAd();
            } else {
                App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);
            }
        }
        //
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
    }

    /**
   * 更新系统开放
   * @param sysIndex 系统id
   * @param isOpen 是否开启
   */
    protected onSystemOpen(sysIndex: number, isOpen: boolean) {
        if (isOpen && sysIndex === OpenTypeConst.AUTO_INTERACTION_AD) {
            this.initInteractionAd();
            App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.onSystemOpen, this);
        }
    }
    /**
     * 初始化自动弹出插屏广告功能
     */
    protected initInteractionAd() {
        App.NotificationCenter.addListener(ViewManager.VIEW_IS_CLOSE, this.onViewClose, this);
        this._model.interactionAdConf = App.ConfigManager.gameConf.interactionAd;
        App.TimerManager.doTimer(this._model.interactionAdConf.startShowTime, 1, this.showInteractionAdTimer, this);
    }
    protected showInteractionAdTimer() {
        // App.TimerManager.doTimer(this._model.interactionAdConf.paddingTime + 5000, 1, this.showInteractionAdTimer, this);
        // Platform.instance.showInteractionAd();
        this.showInteractionAd();
    }
    /**
    * 关闭了某个面板
    * @param viewId 关闭的面板的id
    */
    protected onViewClose(viewId: ViewConst) {
        const viewName = ViewConst[viewId];
        if (this._model.interactionAdConf.view[viewName]) {
            if (Math.random() < this._model.interactionAdConf.view[viewName]) {
                // Platform.instance.showInteractionAd();
                // App.TimerManager.doTimer(this._model.interactionAdConf.paddingTime + 5000, 1, this.showInteractionAdTimer, this);
                this.showInteractionAd();
            }
        }
        // let openBannerADViewList = this._model.openBannerADViewList;
        // let index = openBannerADViewList.indexOf(viewId);
        // if (index > -1) {
        //     openBannerADViewList.splice(index, 1);
        //     this.updateBanner();
        // }
        // switch (viewId) {
        //     case ViewConst.OpenRedPacketView:
        //         App.NotificationCenter.dispatch(RedPackNotification.UPDATE_INTEGRAL, this._model.integral);
        //         this.checkIsCanGetPacket();
        //         if (!this._model.curLevelPacketData) {
        //             App.NotificationCenter.dispatch(RedPackNotification.NOTIFI_LEVEL_PACKET_CAN_GET, null);
        //         }
        //         Platform.instance.hideExpressAd();
        //         Toast.launch("红包领取成功!")
        //         break;
        //     case ViewConst.RedPacketView:
        //         // Platform.instance.hideBanner();
        //         break;
        // }

    }

    /**展示插屏广告 */
    showInteractionAd() {
        Platform.instance.showInteractionAd();
        App.TimerManager.doTimer(this._model.interactionAdConf.paddingTime + 5000, 1, this.showInteractionAdTimer, this);

        if (cc.sys.platform == cc.sys.ANDROID) {
            //向后台发送插屏广告统计
            Platform.instance.recordInteractionAd("interstitial_ad");
        }

    }

    //获取广告配置数据
    public getAdTabData(type: AdType): AdData {
        return this._model.getAdShareConf(type);
    }
    //获取已经观看广告次数
    public getAdCntData(type: AdType): any {
        return this._model.getData(type);
    }

    //检查广告是否还有
    public adIsHas(type: AdType): boolean {
        let conf = this._model.getAdShareConf(type);
        let saveData = this._model.getData(type);
        if (conf.totalTimes > saveData.adCnt) {
            return true;
        }
        return false
    }
    /**
     * 注销登陆
     */
    protected onLogout() {
        this._model.reset();
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 1);
    }
    /**
     * 广告状态切换
     */
    protected changeBtnWithADStatus() {
        for (let key in this._model.registerItems) {
            let id = parseInt(key);
            for (const item of this._model.registerItems[key]) {
                this.checkItem(id, item);
            }
        }
    }
    /**
     * 观看广告完毕回调(分享也是使用这个回调)
     */
    protected onShowAdResult(data: { code: number }) {
        let result = data.code === 0;
        if (this.curAdType !== null) {
            let shareData = this._model.getData(this.curAdType);
            // shareData.adCnt
            if (this.curAdStatus === AdShareStatus.AD) {
                shareData.adCnt++;
                //向后台发送消息，给后台统计观看广告数量
                this.sendADMessage(this.curAdType, result ? 1 : 0);
                //特殊处理强制拉起广告,强制拉起广告，不算进广告次数
                // if (this.curAdType != AdType.COMPEL_AD) {
                //     App.NotificationCenter.dispatch(NotificationConst.ADD_AD_NUM);
                // }
            } else if (this.curAdStatus === AdShareStatus.FREE) {
                shareData.freeCnt++;
                //向后台发送消息，给后台统计观看广告数量
                // let num = Number(this.curAdType);
                // this.sendADMessage(num);

            } else {
                shareData.shareCnt++;
                //给后台发送消息，给后台统计分享数量
                this.sendADMessage(this.curAdType + 1000, result ? 1 : 0);
            }
            this.curAdStatus = this.curAdType = null;
        }
        if (this.adResolve) {
            this.adResolve(result);
            this.adResolve = null;
        }
        this.changeBtnWithADStatus();

        App.SoundManager.stopBg();
        App.TimerManager.doTimer(1000, 1, () => {
            App.SoundManager.playBg('bg')
        }, this);
    }

    //向后台发送消息
    sendADMessage(adId: number, code: number = 0) {
        Platform.instance.callAD("/Interface/data/ad_count.php", { t: adId, s: code });
    }

    /**
   * 
   * @param agrs0 额外参数
   */
    public openAdAsync(agrs0?: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.adResolve = resolve;
            Platform.instance.showAD();
        });
    }

    /**
     * 
     * @param type 奖励类型
     * @param agrs0 额外参数
     */
    public openAdByTypeAsync(type?: AdType, adKind: AdKind = 0, agrs0?: string) {
        return new Promise((resolve: Function, reject: Function) => {
            let adStatus = this._model.adShareStatus[type];
            if (isNaN(adStatus)) {
                resolve(false);
            }
            this.curAdType = type;
            this.adResolve = resolve;
            this.curAdStatus = adStatus;
            if (adStatus == AdShareStatus.AD) {
                let adIndex = this.getAdIndex(type);
                //区别普通广告和强制拉起广告
                if (adKind == AdKind.COMPEL_AD) {
                    //强制广告
                    // Platform.instance.showCompelAD(adIndex);
                } else {
                    //普通广告
                    Platform.instance.showAD(adIndex);
                }

            } else if (adStatus == AdShareStatus.FREE) {//如果是免费的
                CC_DEBUG && Log.trace("免费获得");
                this.onShowAdResult({ code: 0 })
            } else {
                let shareData = this._model.getShareData();
                Platform.instance.share(
                    type,
                    {
                        url: shareData.sharePic,
                        title: shareData.shareMessage,
                        description: "",
                        paramList: {
                            chl: App.ConfigManager.gameConf.channel,
                            playerid: App.GameDataMsr.playerInfo.id + "",
                            shareType: type
                        },
                        extraParam: agrs0
                    })
            }
        });
    }
    /**
     * 解除注册广告点
     * @param type 广告点类型
     * @param item 注册的对象
     */
    public unregisterItem(type: AdType, item: IShareAndAd) {
        // let item = this.proxy.tempList[type];
        if (this._model.registerItems[type]) {
            let index = this._model.registerItems[type].indexOf(item);
            if (index > -1) {
                this._model.registerItems[type].splice(index, 1);
            }
            if (this._model.registerItems[type].length === 0) {
                delete this._model.registerItems[type];
            }
        }
    }
    /**
     * 注册广告点
     * @param type 广告点类型
     * @param item 注册的对象
     */
    public registerItem(type: AdType, item: IShareAndAd) {
        // tempList
        if (this._model.registerItems[type]) {
            if (this._model.registerItems[type].indexOf(item) === -1) {
                this._model.registerItems[type].push(item);
                this.checkItem(type, item);
            }
        } else {
            this._model.registerItems[type] = [item];
            this.checkItem(type, item);
        }
    }

    //是否可以分享(广告加载失败转分享)
    isCanToShare(type: AdType): boolean {
        let shareData = this._model.getData(type);
        let conf = this._model.getAdShareConf(type)
        if (shareData.shareCnt < conf.shareTimes) {
            return true;
        } else {
            return false;
        }
    }

    private every: number[] = [3, 1];
    private getAdIndex(type: AdType): number {
        // if (type == null) {
        //     return 0;
        // }
        // let num = Platform.instance.getAdTypeNum();
        // this.every.splice(num - 1, this.every.length - num);
        // if (this.every.length == 1) {
        //     return 0;
        // }

        // let shareData = this.model.getData(type);
        // let conf = this.model.getAdShareConf(type);
        // let adTimes = shareData.adCnt;
        // let freeTimes = conf.freeCnt;
        // let realAdTimes = adTimes - freeTimes;

        // let sum = 0
        // this.every.forEach(function (val, index, arr) {
        //     sum += val;
        // })
        // let mod = realAdTimes % sum;
        // let len = this.every.length;
        // for (let i = 0; i < len; i++) {
        //     let temp = 0;
        //     this.every.forEach(function (val, index, arr) {
        //         if (index <= i) {
        //             temp += val;
        //         }
        //     })
        //     if (mod < this.every[i]) {
        //         return i;
        //     }
        // }

        return 0;
    }

    /**
     * 检测广告点
     * @param type 广告类型--哪个一个广告点
     * @param item 注册广告的对象
     */
    private checkItem(type: AdType, item: IShareAndAd) {
        let shareData = this._model.getData(type);
        if (!shareData) {
            return;
        }
        // let item = this.model.registerItems[type];
        //获取广告配置数据
        let conf = this._model.getAdShareConf(type);
        if (item && conf) {
            //广告次数
            // IS_LOG && console.log("ADController:::::" + conf.timesKey + "id:::" + conf.id + conf.name);
            //已观看广告次数
            let adTimes = shareData.adCnt;
            //分享次数
            let shareTimes = shareData.shareCnt;
            let freeCnt = shareData.freeCnt || 0;
            //总次数
            let totalTimes = adTimes + shareTimes + freeCnt;
            let isCanShare = Platform.instance.isCanShare() && conf.shareTimes > 0 && conf.shareTimes > shareTimes;
            // Log.trace("服务端次数,id:", type, "广告次数", adTimes, "分享次数", shareTimes);
            // Log.trace("配置表次数,type:", conf.type, "广告次数", conf.adTimes, "分享次数", conf.shareTimes, "总次数", conf.totalTimes);
            if (conf.totalTimes > totalTimes) {//如果没有超过总次数
                if (conf.freeCnt) {//如果有免费次数
                    if (conf.freeCnt > freeCnt) {//如果免费次数没有用完
                        item.toFree && item.toFree(type, conf, shareData);
                        this._model.adShareStatus[type] = AdShareStatus.FREE;
                        return;
                    }
                }
                switch (conf.type) {
                    case AdSharePriority.AD:
                        var adIndex = this.getAdIndex(type);
                        Log.trace("adIndex>>>>>", adIndex)
                        var adState = Platform.instance.getAdState(adIndex);
                        Log.trace("adState>>>>>", adState)

                        if (adState !== AdState.fail && conf.adTimes > adTimes) {//如果当前广告不是加载失败的状态,并且已经观看广告次数没有超过限制
                            item.toAd && item.toAd(type, conf, shareData, adState);
                            this._model.adShareStatus[type] = AdShareStatus.AD;
                            return;
                        }
                        if (isCanShare) {//如果允许分享(分享次数大于0为允许分享),并且
                            item.toShare && item.toShare(type, conf, shareData);
                            this._model.adShareStatus[type] = AdShareStatus.SHARE;
                            return;
                        }
                        if (conf.superCashTimes > 0 && conf.superCashTimes > shareTimes) {
                            item.toSupercash && item.toSupercash(type, conf, shareData);
                            this._model.adShareStatus[type] = AdShareStatus.SUPER_CASH;
                            return;
                        }
                        if (adState === AdState.fail && conf.adTimes > adTimes) {//当前广告不是加载失败的状态,并且已经观看广告次数没有超过限制
                            item.toAd && item.toAd(type, conf, shareData, adState);
                            this._model.adShareStatus[type] = AdShareStatus.AD;
                            return;
                        }
                        break;
                    case AdSharePriority.SHARE:
                        var adIndex = this.getAdIndex(type);
                        var adState = Platform.instance.getAdState(adIndex);
                        if (isCanShare) {//如果允许分享(分享次数大于0为允许分享),并且
                            item.toShare && item.toShare(type, conf, shareData);
                            this._model.adShareStatus[type] = AdShareStatus.SHARE;
                            return;
                        }
                        if (conf.adTimes > 0 && conf.adTimes > adTimes && adState !== AdState.fail) {
                            item.toAd && item.toAd(type, conf, shareData, adState);
                            this._model.adShareStatus[type] = AdShareStatus.AD;
                            return;
                        }
                        if (conf.superCashTimes > 0 && conf.superCashTimes > shareTimes) {
                            item.toSupercash && item.toSupercash(type, conf, shareData);
                            this._model.adShareStatus[type] = AdShareStatus.SUPER_CASH;
                            return;
                        }
                        break;
                    case AdSharePriority.PAY:
                        if (conf.payTimes > totalTimes) {
                            item.toPay && item.toPay(type, conf, shareData);
                            this._model.adShareStatus[type] = AdShareStatus.PAY;
                            return;
                        }
                        break;
                    case AdSharePriority.SUPER_CASH:
                        if (conf.superCashTimes > shareTimes) {
                            item.toSupercash && item.toSupercash(type, conf, shareData);
                            this._model.adShareStatus[type] = AdShareStatus.SUPER_CASH;
                            return;
                        }
                        break;

                }
            }

        }
        item.toFail && item.toFail(type, conf, shareData, AdState.fail);
        this._model.adShareStatus[type] = AdShareStatus.NONE;
    }
}