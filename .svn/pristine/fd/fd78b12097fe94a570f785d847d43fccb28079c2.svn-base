import App from "../../../core/App";
import SwitchFrame from "../../../core/component/SwitchFrame";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import SceneMgr from "./object/scene/SceneMgr";


const { ccclass, property } = cc._decorator;

/**地图界面*/
@ccclass
export default class MapView extends BaseView {
    @property(cc.Node)
    protected bgItem: cc.Node = null;
    @property(cc.Node)
    protected content: cc.Node = null;

    @property(cc.Node)
    protected mapBtn: cc.Node = null;

    protected btnItems: {
        icon: cc.Sprite;
        lab: cc.Label;
        labBgSwitch: SwitchFrame;
        lockImg: cc.Node;
    }[] = []

    protected data: SceneMgr = null;
    initUI() {
        super.initUI();
        this.mapBtn.zIndex = 1;
    }
    updateData() {
        let arrLen = this.btnItems.length;
        for (let i = 0; i < arrLen; i++) {
            let scene = this.data.allScene[i];
            let item = this.btnItems[i];
            if (scene.isOpen) {
                item.lockImg.active = false;
                item.lab.string = GameText.getTextByStr(scene.conf.name);
                item.labBgSwitch.switch(1);
                item.labBgSwitch.node.y = 195;
                item.icon.node.color = cc.Color.WHITE;
                // 195
            } else {
                item.lockImg.active = true;
                item.icon.node.color = cc.Color.GRAY;
                item.labBgSwitch.node.y = -70;
                item.labBgSwitch.switch(0);
                item.lab.string = GameText.getTextByStr(scene.conf.name) + "\n" + GameText.getText(lang.scene_map_unlock_level).format(scene.conf.playerLevel + 1);
            }
        }
    }
    protected isInitUI = false;
    setData(data: SceneMgr) {
        if (this.isInitUI) {
            return;
        }
        this.isInitUI = true;
        let arrLen = data.sceneDataMgr.dataCnt;
        this.data = data;
        let leftY = 1045;
        let height = this.bgItem.height;
        let rightY = 496 + height;
        let y = this.bgItem.height;
        for (let i = 0; i < arrLen; i++) {
            if (i != 0) {
                if (i != arrLen - 1) {
                    let bgItem = cc.instantiate(this.bgItem);
                    bgItem.y = y;
                    y += bgItem.height;
                    this.content.addChild(bgItem, 0);
                }
                var mapBtn = cc.instantiate(this.mapBtn);
                this.content.addChild(mapBtn, 1);
                if (i % 2) {
                    mapBtn.x = -177;
                    mapBtn.y = leftY;
                    leftY += height;
                } else {
                    mapBtn.y = rightY;
                    rightY += height;
                    mapBtn.x = 133;
                }
            } else {
                var mapBtn = this.mapBtn;
            }
            let labBg = mapBtn.getChildByName("LabBg");
            let item = {
                icon: mapBtn.getComponent(cc.Sprite),
                lab: labBg.getChildByName("NameLab").getComponent(cc.Label),
                labBgSwitch: labBg.getComponent(SwitchFrame),
                lockImg: mapBtn.getChildByName("LockImg"),
            };
            this.btnItems.push(item);
            App.CommonUtils.setSpriteFrame("Texture/game/map/map_icon" + (i + 1), item.icon);
        }
        this.content.height = y;
    }


}

