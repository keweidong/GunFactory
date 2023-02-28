import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { ADController, AdType } from "../AD/ADController";
import { PlotEventConst } from "./PlotEventConst";
import { GooutAwardType } from "./PlotEventController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardView extends BaseView {

    @property(cc.Label)
    neir: cc.Label = null;

    @property(cc.Label)
    jinbinum: cc.Label = null;

    @property(cc.Node)
    goldicon: cc.Node = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    awardtype1: cc.Node = null;
    @property(cc.Node)
    awardtype2: cc.Node = null;

    public plotData: any = null;

    // public goOutData: GooutrewardData = null;
    @property({ type: cc.Label, tooltip: "爱心" })
    public aix: cc.Label = null;
    @property({ type: cc.Label, tooltip: "饱食度" })
    public bs: cc.Label = null;
    @property({ type: cc.Label, tooltip: "猫金币" })
    public jb: cc.Label = null;
    @property({ type: cc.Label, tooltip: "钻石" })
    public zs: cc.Label = null;
    @property({ type: cc.Label, tooltip: "初级猫粮" })
    public cj: cc.Label = null;
    @property({ type: cc.Label, tooltip: "中级猫粮" })
    public zj: cc.Label = null;


    /**答对答错 */
    public isdui: boolean = null;
    public num: number = 0;

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    public open(data: any, isdui: boolean, awardtype: boolean): void {
        this.isdui = isdui;
        super.open();
        this.init(data, awardtype);
    }

    init(data: any, isbool: boolean) {
        this.awardtype1.active = isbool;
        // this.awardtype2.active = !isbool;
        if (isbool) {
            this.plotData = data;
            this.initAwardView();
        }
        // else {
        //     this.goOutData = data;
        //     cc.log("****外出奖励*******", this.goOutData)
            // this.initgooutaward();
        // }
    }

    initAwardView() {

        //this.goldicon.active = this.isdui;
        this.num = this.isdui == true ? this.plotData.awardnum : this.plotData.mistakenum;
        this.jinbinum.string = this.num > 0 ? "+" + this.num : this.num.toString();

        let iconpath = this.isdui == true ? this.plotData.awardicon : this.plotData.mistakeicon;
        let path = `/Texture/ShopUI/${iconpath}`;
        App.CommonUtils.setSpriteFrame(path, this.icon);

        this.neir.string = this.isdui == true ? this.plotData.awardts : this.plotData.mistaketis;

    }
    /**
     * 领取奖励
     */
    linqu() {

        this.applyFunc(PlotEventConst.LINQU_AWARD, this.plotData, this.isdui);
        this.closeView();
    }

    protected linqugoouAward(event: cc.Event, rate: string) {
        let multiple = parseInt(rate);
        if (multiple > 1) {
            //双倍按钮
            //看广告
            this.watchAD(multiple);
        } else {
            this.applyFunc(PlotEventConst.LINGQU_GOOUT_AWARD);
            this.closeView();
        }
    }

    //观看广告领取双倍奖励
    protected async watchAD(multiple: number) {
        // let result = await ADController.getInstance().openAdByTypeAsync(AdType.LOOK_DOUBLE_GOOUTAWARD);
        // if (result) {
        //     this.applyFunc(PlotEventConst.LINGQU_GOOUT_AWARD, multiple);
        //     this.closeView();
        // } else {
        //     return;
        // }
    }

    initgooutaward() {

        // this.aix.string = this.goOutData.aix > 0 ? '+' + this.goOutData.aix : this.goOutData.aix.toString();
        // this.bs.string = this.goOutData.bs > 0 ? '-' + this.goOutData.bs : this.goOutData.bs.toString();
        // this.jb.string = this.goOutData.jb > 0 ? '+' + this.goOutData.jb : this.goOutData.jb.toString();
        // this.zs.string = this.goOutData.zs > 0 ? '+' + this.goOutData.zs : this.goOutData.zs.toString();
        // this.cj.string = this.goOutData.cj > 0 ? '+' + this.goOutData.cj : this.goOutData.cj.toString();
        // //this.zj.string = this.goOutData.zj > 0 ?'+'+ this.goOutData.zj:this.goOutData.zj.toString();
    }

    onTouchBg() {

    }

    close() {

        super.close();
    }

}
