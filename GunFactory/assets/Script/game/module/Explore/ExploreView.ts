import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from '../../consts/ControllerConst';
import ControllerManager from '../../../core/mvc/ControllerManager';
import App from "../../../core/App";
import { ExploreConst, ExploreAwardType } from "./ExploreConst";
import { CostType } from "../bag/BagController";
import LayerManager from "../../LayerManager";
import EffectUtils from "../../../core/utils/EffectUtils";
import ExploreChoseitem from './ExploreChoseitem';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExploreView extends BaseView {
    public bgType: BG_TYPE = BG_TYPE.GRAY;

    /**选择awardList */
    @property(cc.Node)
    public choseAwarditemList: cc.Node[] = [];

    /** */
    @property(cc.Node)
    public choseAwardNode: cc.Node = null;

    /**
     * 钻石数量
     */
    @property(cc.Label)
    diamondsNum: cc.Label = null;

    @property(cc.Sprite)
    diamondsIcon: cc.Sprite = null;

    /**
     * 金币数量
     */
    @property(cc.Label)
    goldNum: cc.Label = null

    @property(cc.Sprite)
    goldIcon: cc.Sprite = null;

    /**
     * 遮罩
     */
    @property(cc.Button)
    mark: cc.Button = null;

    /**
     * 
     */
    @property(cc.Node)
    topStepBg: cc.Node = null;

    @property(cc.Label)
    guanqiaNum: cc.Label = null;

    @property(cc.Node)
    awardNode: cc.Node = null;

    selectIndex: number = null;
    isCanClick: boolean = false;

    awardData: ExploreitemData = null;
    private isCanLeave: boolean = true;
    initUI() {
        super.initUI()
        let scaleNum = cc.winSize.height / 1664;
        this.awardNode.scale = scaleNum;
        this.mark.node.scale = scaleNum;
        this.choseAwardNode.scale = scaleNum;
    }
    /**展现遮罩 */
    showMark() {
        this.mark.node.active = true;
        this.mark.interactable = false;
    }

    open() {
        super.open();
        this.resetChoseAwardItem();
    }
    resetChoseAwardItem() {
        for (let i = 0; i < this.choseAwarditemList.length; i++) {
            let item = this.choseAwarditemList[i];
            item.getComponent(ExploreChoseitem).rethisitem();
        }
        this.isCanLeave = true;
    }
    close() {
        super.close();
        this.mark.node.active = false;
        this.mark.interactable = false;
        this.guanqiaNum.string = "1";

    }

    /**遮罩点击事件 */
    OnTouchMark() {
        // if (!this.mark.interactable) {

        //     return;
        // }
        this.mark.node.active = false;
        this.mark.interactable = false;

        //进入下一关
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.NextGuanqia);

    }

    public nextCustom() {
        this.isCanLeave = true;
        // this.mark.node.active = false;
        // this.mark.interactable = false;
        this.resetChoseAwardItem();
        if (this.awardData.type === ExploreAwardType.golds) {
            this.playGetCoinAni(CostType.coin, this.choseAwarditemList[this.selectIndex]);
        }
        else if (this.awardData.type === ExploreAwardType.Diamonds) {
            this.playGetCoinAni(CostType.diamond, this.choseAwarditemList[this.selectIndex])
        }
    }

    public showItemAward(isSelect: boolean) {
        for (let i = 0; i < this.choseAwarditemList.length; i++) {
            let item = this.choseAwarditemList[i];
            if (isSelect && i === this.selectIndex)
                item.getComponent(ExploreChoseitem).showAwardLab();
            else if (!isSelect && i != this.selectIndex) {
                item.getComponent(ExploreChoseitem).showAwardLab();
            }
        }
    }
    /**
     * 直接领取奖励离开
     */
    getAward() {
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.GetExploreAwardToleave);
    }

    /** 设置中奖数据 */
    setAwardData(index: number, awardData: ExploreitemData, otherData: ExploreitemData[]) {
        this.isCanClick = false;
        this.showMark();
        this.selectIndex = index;
        this.awardData = awardData;
        let count = 0;
        if (awardData.type === ExploreAwardType.bomb) {
            this.isCanLeave = false;
        }
        for (let i = 0; i < this.choseAwarditemList.length; i++) {
            let item = this.choseAwarditemList[i];
            if (index === i) {
                item.getComponent(ExploreChoseitem).setData(awardData);
            }
            else {
                item.getComponent(ExploreChoseitem).setData(otherData[count], 1);
                count++;
            }
        }
        App.TimerManager.doTimer(1600, 1, this.setIsCanClick, this);
    }
    setIsCanClick() {
        this.isCanClick = true;
    }
    /**
     * 金币和钻石汇集动画
     */
    public playGetCoinAni(index: CostType, node: cc.Node) {
        let pos = null;
        if (index == CostType.coin) {
            //金币
            pos = this.goldIcon.node.parent.convertToWorldSpaceAR(this.goldIcon.node.position);
        } else if (index == CostType.diamond) {
            pos = this.diamondsIcon.node.parent.convertToWorldSpaceAR(this.diamondsIcon.node.position);
        }

        let pos2 = node.parent.convertToWorldSpaceAR(node.position)
        let parent = LayerManager.getLayer(LayerManager.UI_Tips);
        pos = parent.convertToNodeSpaceAR(pos);
        pos2 = parent.convertToNodeSpaceAR(pos2);

        EffectUtils.instance.coinEffect(
            pos2.x,
            pos2.y,
            pos.x,
            pos.y,
            -index - 1,
            parent
        )
    }

}