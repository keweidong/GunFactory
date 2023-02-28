import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { AdData } from "../../config/AdDataManager";
import { ControllerConst } from "../../consts/ControllerConst";
import { AdShareStatus, AdType } from "../AD/ADController";
import { ADConst, AdState } from "../AD/ADManageBase";
import { TaskConst } from "./TaskConst";
import { TaskItemBase } from "./TaskItems/TaskItemBase";



const { ccclass, property } = cc._decorator;

/**每日任务弹窗*/
@ccclass
export default class TaskView extends BaseView implements IShareAndAd {

    //任务标题
    @property(cc.Label)
    protected taskTitle: cc.Label = null;

    //任务进度
    @property(cc.Label)
    protected taskPlan: cc.Label = null;

    //进度条
    @property(cc.ProgressBar)
    protected progressBar: cc.ProgressBar = null;

    //奖励数量
    @property(cc.Node)
    protected awardNode: cc.Node[] = [];

    @property(cc.Node)
    protected ADIcon: cc.Node = null;

    //观看广告单选按钮节点
    @property(cc.Node)
    protected advertisementNode: cc.Node = null;

    //任务btn
    @property(cc.Button)
    protected taskBtn: cc.Button = null;

    @property(cc.Button)
    protected adBtn: cc.Button = null;

    //按钮Sp
    @property(cc.Sprite)
    btnSp: cc.Sprite = null;

    //按钮文本
    @property(cc.Label)
    protected btnLab: cc.Label = null;

    @property(cc.Label)
    protected adBtnLab: cc.Label = null;

    //广告状态
    protected adStatus: AdShareStatus = null;
    //广告状态（广告加载失败和成功）
    protected adState: AdState = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    //任务数据
    protected data: TaskItemBase = null;
    protected toggle: cc.Toggle = null;

    initUI() {
        super.initUI();
        this.toggle = this.advertisementNode.getComponent(cc.Toggle);
    }

    //设置弹窗数据
    public setData(item: TaskItemBase) {
        this.data = item;
        this.taskTitle.string = item.getDesc();
        this.progressBar.progress = item.data.cnt / item.conf.param;
        this.taskPlan.string = item.data.cnt + "/" + item.conf.param;
        this.checkAdType();
        // }
        // //设置奖励显示
        this.setAwardShow();
    }

    //更新任务进度
    updatePlan(nowMoney: string, taskMoney: String) {
        this.taskPlan.string = nowMoney + "/" + taskMoney;
    }

    //设置奖励
    setAwardShow() {
        let awardList = this.data.getAwardList();
        for (let i = 0; i < 3; i++) {
            let awardItem = awardList[i];
            if (awardItem) {
                this.awardNode[i].active = true;
                this.awardNode[i].getChildByName("award_Label").getComponent(cc.Label).string = awardItem.item.getDisplayCnt();
                App.CommonUtils.setSpriteFrame(
                    awardItem.item.getItemPic(),
                    this.awardNode[i].getChildByName("award_Sprite").getComponent(cc.Sprite)
                );
            } else {
                this.awardNode[i].active = false;
            }
        }
    }

    //未完成时点击单选按钮
    clickToggle() {
        if (!this.data.isFinish()) {
            if (this.toggle.isChecked) {
                this.btnSp.node.color = cc.Color.WHITE;
                this.taskBtn.interactable = true;

            } else {
                this.btnSp.node.color = cc.Color.GRAY;
                this.taskBtn.interactable = false;
            }
        }
        this.ADIcon.active = this.toggle.isChecked;
    }

    //重置奖励icon
    resetAward() {
        for (let i = 0; i < this.awardNode.length; i++) {
            this.awardNode[i].active = false;
        }
    }

    open(item: TaskItemBase) {
        super.open();
        this.setData(item)
        this.applyControllerFunc(ControllerConst.AD, ADConst.REGISTER_ITEM, AdType.TASK, this);
    }

    close() {
        super.close();
        this.applyControllerFunc(ControllerConst.AD, ADConst.UNREGISTER_ITEM, AdType.TASK, this);
    }
    clickGetAwardBtnByAd() {
        this.applyFunc(TaskConst.GAIN_TASK_AWARD, true);
    }
    //点击领取按钮
    clickGetAwardBtn() {
        this.applyFunc(TaskConst.GAIN_TASK_AWARD, false);
    }

    //按广告状态和进度条，判断文字显示
    checkAdType() {
        let adLabel = this.btnLab;
        // if (this.adStatus == AdShareStatus.SHARE) {
        //     //分享
        //     if (this.data.isFinish()) {
        //         adLabel.string = "    分享游戏收益翻倍";
        //         this.btnSp.node.color = cc.Color.WHITE;
        //     } else {
        //         adLabel.string = "    分享游戏立即完成任务";
        //     }
        // } else 
        // if (this.adStatus == AdShareStatus.AD) {
        //     //广告

        // }
        if (this.data.isFinish()) {
            this.adBtnLab.string = GameText.getText(lang.common_ad_double);//"双倍领取";
            // if (this.adState === AdState.fail) {
            //     this.btnLab.string = "    广告加载失败";
            //     this.taskBtn.interactable = true;
            // } else {
            //     this.btnLab.string = "    观看广告收益翻倍";
            // }
            // this.btnSp.node.color = cc.Color.WHITE;
            this.taskBtn.interactable = true;
        } else {
            this.adBtnLab.string = GameText.getText(lang.task_complete);// "立即完成";
            // this.btnLab.string
            this.taskBtn.interactable = false;
            // this.btnLab.string = "    观看广告立即完成任务";
        }
    }
    /**
    * 切换成分享状态
    */
    toShare(type: AdType, conf: AdData, data: any) {
        this.adStatus = AdShareStatus.SHARE;
        this.checkAdType();
        this.toggle.interactable = true;
        this.toggle.isChecked = true;
    }

    /**
     * 切换成广告状态
     */
    toAd(type: AdType, conf: AdData, data: any, adState: AdState) {
        // this.adStatus = AdShareStatus.AD;
        // this.adState = AdState.success;
        // let toggle = this.toggle;
        switch (adState) {
            case AdState.loading:
                //广告加载中
                this.adBtn.interactable = false;
                // this.btnLab.string = "    广告加载中.......";
                // toggle.interactable = false;
                // toggle.isChecked = false;
                break;
            case AdState.success:
                //广告加载成功
                this.adBtn.interactable = true;
                cc.log("广告加载成功");
                // this.adState = AdState.success;
                this.checkAdType();

                // this.taskBtn.interactable = true;
                // this.btnSp.node.color = cc.Color.WHITE;
                // toggle.interactable = true;
                // toggle.isChecked = true;
                break;
            default:
                this.adBtn.interactable = false;
                // this.btnLab.string = "    广告加载失败";
                // toggle.interactable = false;
                // toggle.isChecked = false;
                // this.adState = AdState.fail;
                // if (!this.data.isFinish()) {
                //     this.btnSp.node.color = cc.Color.GRAY;
                // }
                break;
        }
    }
    /**
     * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
     */
    toFail(type: AdType, conf: AdData, data: any, adState?: any) {
        // this.btnLab.string = "    观看广告次数用完";
        // this.toggle.interactable = false;
        // this.toggle.isChecked = false;
        this.adBtn.interactable = false;
    }
}
