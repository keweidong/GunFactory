import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { SevenDaysConst } from "./SevenDaysController";

const { ccclass, property } = cc._decorator;

//七天签到界面
@ccclass
export default class SevenDaysView extends BaseView {
    @property(cc.Node)
    protected item: cc.Node = null;

    //广告按钮
    @property(cc.Node)
    adBtnNode: cc.Node = null;

    //普通领取按钮
    @property(cc.Node)
    ordinaryBtnNode: cc.Node = null;

    protected saveData: SaveSevenDaysData = null;

    //当前第几天奖励
    dayNum: number = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    protected itemList: {
        icon: cc.Sprite,
        lightBg: cc.Node,
        titleLab: cc.LabelOutline,
        itemBg: cc.Node,
        getSp: cc.Node,
        nameLab: cc.Label,
    }[] = [];

    public initUI() {
        super.initUI();
        let body = this.node.getChildByName("Body");
        var item: cc.Node = null;
        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                item = this.item;
                var x = item.x;
                var y = item.y;
            } else if (i < 6) {
                item = cc.instantiate(this.item);
                item.x = x;
                item.y = y;
                body.addChild(item, 0, "Item" + i);
            } else {
                item = body.getChildByName("Item6");
            }
            if (i === 6) {//第七天的那个比较大一点

            } else {
                if (i === 2) {
                    y -= item.height + 45;
                    var x = this.item.x;
                } else {
                    x += item.width + 10;
                }
            }
            let titleLab = item.getChildByName("TitleLab").getComponent(cc.Label);
            // titleLab.string = `第${["一", "二", "三", "四", "五", "六", "七",][i]}天`;
            titleLab.string = GameText.getText(lang.seven_days_day).format(i + 1);
            this.itemList.push({
                icon: item.getChildByName("icon").getComponent(cc.Sprite),
                lightBg: item.getChildByName("LightBg"),
                // nameBg: item.getChildByName("nameBg").getComponent(SwitchFrame),
                titleLab: item.getChildByName("TitleLab").getComponent(cc.LabelOutline),
                itemBg: item.getChildByName("ItemBg"),
                getSp: item.getChildByName("GetSp"),
                nameLab: item.getChildByName("name").getComponent(cc.Label),
            })
        }
    }

    //设置物品icon和name
    setData(datas: SevenDaysItemData[], saveData: SaveSevenDaysData) {
        this.saveData = saveData;
        let isGetDay = true;

        const color = cc.color().fromHEX("#8b3d11");
        const color1 = cc.color().fromHEX("#ffa900");
        for (let i = 0; i < 7; i++) {
            let disItem = this.itemList[i];
            let data = datas[i];
            disItem.nameLab.string = data.awardItem.getDisplayCnt();
            App.CommonUtils.setSpriteFrame(data.awardItem.getItemPic(), disItem.icon);
            if (data.isCurDay) {
                this.dayNum = i;
                disItem.titleLab.color = disItem.nameLab.node.color = color;
                isGetDay = false;
                disItem.itemBg.active = disItem.getSp.active = saveData.isGetAward > 0;

                // App.CommonUtils.setSpriteFrame(`Texture/SevenDays/d${i + 1}_o`, disItem.titleImg);
                // disItem.nameBg.switch(1);
                // disItem.itemBg.switch(1);

                disItem.lightBg.active = true;
            } else {
                disItem.lightBg.active = false;
                disItem.nameLab.node.color = cc.Color.WHITE;
                disItem.titleLab.color = color1;
                // App.CommonUtils.setSpriteFrame(`Texture/SevenDays/d${i + 1}_p`, disItem.titleImg);

                // disItem.itemBg.switch(0);
                disItem.itemBg.active = disItem.getSp.active = isGetDay;
            }
        }
    }

    //普通领取
    protected ordinaryGain() {
        App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.ORDINARY_GAIN, 1);
    }

    //广告领取
    protected adGain() {
        App.ControllerManager.applyFunc(ControllerConst.SevenDays, SevenDaysConst.ORDINARY_GAIN, 2);
    }

    //设置已领取提示
    setGetGainIcon() {
        this.itemList[this.dayNum].getSp.active = true;
    }

    //广告按钮回调
    setAdBtn() {
        let adLabel = this.adBtnNode.getComponentInChildren(cc.Label);
        let ordinaryLabel = this.ordinaryBtnNode.getComponentInChildren(cc.Label);
        let adBtn = this.adBtnNode.getComponent(cc.Button);
        let ordinaryBtn = this.ordinaryBtnNode.getComponent(cc.Button);
        let adBtnBg = this.adBtnNode.getChildByName("Background");

        if (this.saveData.isGetAward === 1) {
            //普通领取
            ordinaryLabel.string = GameText.getText(lang.common_diamond);//"已领取";
            adLabel.string = GameText.getText(lang.seven_days_double_get);//"两倍补领";
            ordinaryBtn.interactable = false;
            // ordinaryBtnBg.color = cc.Color.GRAY;
        } else if (this.saveData.isGetAward === 2) {
            //广告领取
            ordinaryLabel.string = GameText.getText(lang.common_diamond);// "已领取";
            adLabel.string = GameText.getText(lang.common_diamond);// "已领取";
            adBtn.interactable = false;
            ordinaryBtn.interactable = false;
            adBtnBg.color = cc.Color.GRAY;
        }
    }
}
