import App from "../../../../core/App";
import { GameText } from "../../../../core/lang/GameText";
import { AdData } from "../../../config/AdDataManager";
import { FreeUpgradeData } from "../../../config/FreeUpgradeDataMsr";
import { ControllerConst } from "../../../consts/ControllerConst";
import { AdType } from "../../AD/ADController";
import { ADConst, AdState } from "../../AD/ADManageBase";
import UserLevelController from "../../UserLevel/UserLevelController";
import { ChefUpgradeDetailInfo } from '../object/scene/role/chef/ChefMsr';

const { ccclass, property, menu } = cc._decorator;
/**
 * 加上这个组件的按钮,会根据一定的规则,将按钮状态切换为广告状态
 */
@ccclass
@menu("UI/ShowAdBtn")
export default class ShowAdBtn extends cc.Component implements IShareAndAd {
    /**广告点类型 */
    @property({ type: cc.Enum(AdType), tooltip: "广告点类型" })
    public adType: AdType = 0;
    /**广告点icon */
    @property({ type: cc.Sprite, tooltip: "广告点icon" })
    protected sprite: cc.Sprite = null;
    /**广告点label */
    @property({ type: cc.Label, tooltip: "广告点label" })
    protected label: cc.Label = null;

    @property({ type: cc.Sprite, tooltip: "进度条" })
    protected progressBarImg: cc.Sprite = null;
    /**记录点击次数 */
    protected _cnt: number = 0;
    /**记录开始点击的时间戳 */
    protected _startToucTime = 0;

    protected time: number = 0;

    // @property({ tooltip: "" })
    /**配置的key值,用于获取对应的配置文件 */
    public confKey: number = 0;
    public conf: FreeUpgradeData = null;
    /**
     * 金钱是否充足
     */
    public isMoneyEnable: boolean = true;

    public isWork: boolean = false;
    /**广告是否准备完毕,只有广告准备完毕,才可以弹出广告按钮 */
    public isAdFinish: boolean = false;
    /**
     * 当前是不是有广告按钮展示了出来
     */
    public static hasShow: boolean = false;
    protected _isInit: boolean = false;
    onLoad() {
        this.node.active = false;
    }
    init() {
        if (this._isInit) {
            return;
        }
        this._isInit = true;
        this.conf = App.ConfigManager.getConfig("FreeUpgradeDataMsr").getData(this.confKey);

        this.chufaRand = App.ConfigManager.gameConf.game.randAdBtn.randnumber;
        this.addRand = App.ConfigManager.gameConf.game.randAdBtn.addrandnum;

        this.node.getChildByName("Label").getComponent(cc.Label).string = GameText.getText(lang.common_free_lv_up).format(this.conf.upgradeCnt);//`免费升${this.conf.upgradeCnt}级`;
        CC_DEBUG && Log.trace("App.GameDataMsr.playerInfo.level:", App.GameDataMsr.playerInfo.level, this.conf.openLevel);
        if (App.GameDataMsr.playerInfo.level < this.conf.openLevel) {//如果还未到达解锁等级
            App.NotificationCenter.addListener(UserLevelController.USER_LEVEL_UP, this.onUserLevelUp, this);
        } else {
            App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.REGISTER_ITEM, this.adType, this);
        }
        this.node.active = false;
    }
    // public onDestroy() {

    // }
    protected onUserLevelUp() {
        if (App.GameDataMsr.playerInfo.level >= this.conf.openLevel) {
            App.NotificationCenter.removeListener(UserLevelController.USER_LEVEL_UP, this.onUserLevelUp, this);
            App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.REGISTER_ITEM, this.adType, this);
        }
    }
    public hide() {
        this.node.active = false;
        ShowAdBtn.hasShow = false;
    }
    /**触发广告的概率*/
    private chufaRand: number = 20;
    /**每次点击增加的概率 */
    private addRand: number = 10;

    protected onTouch() {//有个小bug,点击看广告的次数会被算进去,所以在测试环境快速连续点的话,会出现点一次按钮就出现的bug,但是在有广告的情况下,观看广告会超时,所以不会出现这个bug
        // CC_DEBUG && Log.trace("   ShowAdBtn.hasShow = true;:", ShowAdBtn.hasShow);
        if (this.isWork && this.isAdFinish) {
            if (ShowAdBtn.hasShow ||//同一时间只能有一个广告按钮显示出来
                this.node.active) {
                return;
            }

            let random = App.RandomUtils.limitInteger(0, 100);
            // Log.trace("广告随机", random);
            // Log.trace("广告概率累次", this.chufaRand + this._cnt * this.addRand)
            if (this.chufaRand + this._cnt * this.addRand >= random) {
                this._cnt = 0;
                // this._startToucTime = 0;
                this.node.active = true;
                this.time = 0;
                this.progressBarImg.fillRange = -1;
                // CC_DEBUG && Log.trace("onTouch:开启", delay, cnt);
                ShowAdBtn.hasShow = true;
            }
            this._cnt++;
            // const now = Date.now();
            // const delay = now - this._startToucTime;
            // if (this.isMoneyEnable) {
            //     var cnt = this.conf.enoughCnt;
            //     var paddingTime = this.conf.enoughPaddingTime;
            // } else {
            //     var cnt = this.conf.notEnoughCnt;
            //     var paddingTime = this.conf.noEnoughPaddingTime;
            // }
            // CC_DEBUG && Log.trace("onTouch, 点击", delay, cnt);
            // if (delay >= paddingTime) {//超时重置次数
            //     CC_DEBUG && Log.trace("onTouch:超时重置次数", delay, cnt);
            //     this._startToucTime = now;
            //     this._cnt = 1;
            //     return;
            // }
            // this._cnt++;
            // if (this._cnt >= cnt) {//次数达到
            //     this._cnt = 0;
            //     this._startToucTime = 0;
            //     this.node.active = true;
            //     this.time = 0;
            //     this.progressBarImg.fillRange = -1;
            //     CC_DEBUG && Log.trace("onTouch:开启", delay, cnt);
            //     ShowAdBtn.hasShow = true;
            // } else {

            // }
        }
    }
    update(dt: number) {
        this.time += dt * 1000;
        if (this.time >= this.conf.existTime) {
            // this.node.active = false;
            this.hide();
            return;
        }
        this.progressBarImg.fillRange = 1 - this.time / this.conf.existTime;
    }

    onEnable() {
        // Log.trace("注册广告点:", AdType[this.adType]);

    }
    onDisable() {
        Log.trace("解除注册广告点:", AdType[this.adType]);
    }
    onDestroy() {
        App.NotificationCenter.removeListener(UserLevelController.USER_LEVEL_UP, this.onUserLevelUp, this);
        App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.UNREGISTER_ITEM, this.adType, this);

    }

    /**
     * 切换成广告状态
     */
    toAd?(type: AdType, conf: AdData, data: any, adState: AdState) {
        this.isAdFinish = adState === AdState.success;
    }

    /**
     * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
     */
    toFail(type: AdType, conf: AdData, data: any, adState?: any) {
        this.isAdFinish = false;
    }
}