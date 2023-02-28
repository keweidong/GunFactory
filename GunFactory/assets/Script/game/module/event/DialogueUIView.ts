import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { NotificationConst } from "../../consts/NotificationConst";
import Alogueltem from "./Alogueltem";
import { GukeEventData } from "./GuKeEventDataManager";
import { EventType, PlotEventConst } from "./PlotEventConst";
import { DagonBonesCompent } from "../../../core/utils/DagonBonesCompent";

const { ccclass, property } = cc._decorator;
@ccclass
export default class DialogueUIView extends BaseView {

    @property(cc.Node)
    ta: cc.Node = null;
    @property(cc.Node)
    mi: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Node)
    btncontent: cc.Node = null;

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Node)
    apatent: cc.Node = null;

    @property(DagonBonesCompent)
    leftPeopleIcon: DagonBonesCompent = null;

    @property(DagonBonesCompent)
    rightPeopleIcon: DagonBonesCompent = null;

    // @property(cc.Node)
    // bpatent: cc.Node = null;
    // @property(cc.Label)
    // alab: cc.Label = null;
    // @property(cc.Label)
    // blab: cc.Label = null;

    btnlab: string = "";

    public daannum: number = 0;

    //indexnum: number;
    apatenty: number = 200;

    isbool: boolean = false;

    public plotData: GukeEventData = null;
    public confData: any = null;

    correct: number = 0;

    public eventype: EventType = EventType.CATTYPE;

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    public Zindex = 0;

    public contentY: number = null;

    public open(data: GukeEventData, confdata: any, type: EventType): void {
        this.plotData = data;
        this.confData = confdata;
        this.eventype = type;
        // this.nameLab.string = confdata.name;
        this.nameLab.string = data.gukename;

        // let configid = App.ConfigManager.getConfig("CustomerDataMsr").getData(confdata.id);
        // this.leftPeopleIcon.curAni = "Idle"
        // let atlasAsset = configid.atlasAsset;
        // this.rightPeopleIcon.atlasAsset = `db/${atlasAsset}`
        // this.rightPeopleIcon.curAni = "Idle";
        // let path = `/Texture/ShopUI/${iconpath}`;
        // App.CommonUtils.setSpriteFrame(path, this.rightPeopleIcon);

        super.open();
        this.initDialogueUI();

    }

    initUI() {
        super.initUI();
    }

    public initDialogueUI() {
        //this.indexnum = 0;
        this.isbool = false;
        //this.apatenty = 200;
        //this.content.y = 318;
        // this.content.height = 130;
        this.inititem(this.plotData.wen1, this.ta, "", this.confData.name);
        App.TimerManager.setTimeOut(1000, () => {
            this.daan(this.plotData.da1A);
        }, this);
    }

    /**
     * 对话
     * @param str 内容
     * @param prefab 对话框
     */
    inititem(str: string, prefab: cc.Node, headicon: string, name: string) {
        let item = cc.instantiate(prefab);
        item.active = true;
        this.content.addChild(item);
        item.getComponent(Alogueltem).setItem(str, headicon);
        this.content.height += 170;
        //this.content.y += this.indexnum * 170;
    }

    /**
     * 答案
     * @param a 答案A
     * @param b 答案B
     */
    daan(da1A: string) {
        let arr = this.setAwardType(da1A);
        for (let i = 1; i <= 2; i++) {
            let btn = cc.instantiate(this.apatent);
            btn.setParent(this.btncontent);
            btn.active = true;
            btn.on("click", () => {
                this.bfin(arr[i - 1], i);
            }, this);
            btn.getChildByName("word").getComponent(cc.Label).string = arr[i - 1];
        }
        //this.apatent.active = true;
        //this.bpatent.active = true;
        //this.apatent.opacity = 255;
        //this.bpatent.opacity = 255;
        //this.apatent.getComponent(cc.Button).enabled = true;
        //this.bpatent.getComponent(cc.Button).enabled = true;
        //this.alab.string = arr[0];
        //this.blab.string = arr[1];
    }
    setAwardType(awardType: string): string[] {
        let temp = awardType.split("|");
        let arr: string[] = []
        for (let i = 0; i < temp.length; i++) {
            arr.push((temp[i]));
        }
        return arr;
    }
    /**
     * 答案A
     */
    // public afin() {
    //     //this.bpatent.active = false;
    //     if (this.isbool) {
    //         this.correct = this.plotData.correctA;
    //     }
    //     this.apatent.getComponent(cc.Button).enabled = false;
    //     this.geTo(this.apatent, this.apatenty, 1, this.plotData.Awen, this.plotData.Ada);
    //     this.btnlab = this.apatent.getChildByName("word").getComponent(cc.Label).string;
    // }

    /**
     * 答案
     */
    public bfin(lab: string, num: number) {
        // this.apatent.active = false;
        // if (this.isbool) {
        //     this.correct = this.plotData.correctB;
        // }
        // this.bpatent.getComponent(cc.Button).enabled = false;
        // this.geTo(this.bpatent, this.apatenty, 2, this.plotData.Bwen, this.plotData.Bda);
        this.btncontent.removeAllChildren();
        let item = cc.instantiate(this.mi);
        item.active = true;
        item.setParent(this.content);
        // this.content.addChild(item);
        item.getComponent(Alogueltem).setItem(lab, "", this.confData.id);
        let wen = num == 1 ? this.plotData.Awen : this.plotData.Bwen;
        let da = num == 1 ? this.plotData.Ada : this.plotData.Bda;
        if (this.isbool) {
            App.TimerManager.setTimeOut(1500, () => {
                this.correct = num == 1 ? this.plotData.correctA : this.plotData.correctB;
                this.applyFunc(PlotEventConst.JUDGE_DAAN, this.correct, num, this.plotData);
                App.NotificationCenter.dispatch(NotificationConst.ACHITEVE_EVENT, this.eventype);
            }, this);
            return;
        }
        App.TimerManager.setTimeOut(1200, () => {
            this.inititem(wen, this.ta, "", this.confData.name);
            this.daan(da);
            this.isbool = true;
        }, this);
    }

    /**
     * 选择答案 / 动画
     * @param node 预设体
     * @param num 高度
     * @param daan 选择的答案
     */
    //public geTo(node: cc.Node, num: number, xznum: number, wen: string, da: string) {
    // let pos = node.position;
    // cc.tween(node)
    //     .to(0.5, { position: cc.v2(node.x, num), opacity: 0 })
    //     .call(() => {
    //         this.inititem(this.btnlab, this.daanitem, "", "我");
    //         node.position = pos;
    //         node.active = false;
    //         this.scheduleOnce(() => {
    //             if (this.isbool) {
    //                 this.daan(da);
    //                 this.inititem(wen, this.duihuaitem, this.confData.headicon, this.confData.name);
    //                 this.isbool = false;
    //             }
    //             else {
    //                 this.apatent.setPosition(0, -310);
    //                 this.bpatent.setPosition(0, -465);
    //                 this.applyFunc(PlotEventConst.JUDGE_DAAN, this.correct, xznum, this.plotData);
    //                 App.NotificationCenter.dispatch(NotificationConst.ACHITEVE_EVENT, this.eventype);
    //             }
    //             this.indexnum += 1;
    //             this.apatenty = -130;
    //         }, 1);
    //     })
    //     .start()
    //}

    close() {
        super.close();
        this.content.removeAllChildren();
        switch (this.eventype) {
            case EventType.CATTYPE:
                this.applyFunc(PlotEventConst.CAT_STATA_EVENT);
                break;
            case EventType.GUKETYPE:
                this.applyFunc(PlotEventConst.GUKE_STATA_EVENT);
                break;
        }
    }

    public onTouchBg() {

    }

}
