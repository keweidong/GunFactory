import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import ScenegZone from "./object/scene/SceneZone";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UnlockTipView extends BaseView {

    // @property(cc.Slider)
    // protected MusicSlider: cc.Slider = null;

    // @property(cc.Slider)
    // protected EffectSlider: cc.Slider = null;

    // @property(cc.ProgressBar)
    // protected BarBgVolume: cc.ProgressBar = null;

    // @property(cc.ProgressBar)
    // protected BarEffectVolume: cc.ProgressBar = null;

    // @property(cc.Label)
    // protected BgVolume: cc.Label = null;

    // @property(cc.Label)
    // protected EffectVolume: cc.Label = null;
    // @property(cc.Label)
    // protected versionLab: cc.Label = null;

    // @property(cc.Label)
    // protected idLab: cc.Label = null;
    protected scene: ScenegZone = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
    }
    public open(scene: ScenegZone) {
        super.open();
        this.scene = scene;
    }
    public shouUnlockView() {
        // this.active = true;
        let sceneId = this.scene.getId();
        let list = [
            {
                text: GameText.getText(lang.store_scene_progress_user_level),
                data: this.scene.worldScene.sceneMgr.getPlayerLevel(sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_publicity_level),
                data: this.scene.worldScene.sceneMgr.getGuestLevel(sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_waiter_speed),
                data: this.scene.worldScene.sceneMgr.getWaiterLevel(sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_chef_speed),
                data: this.scene.worldScene.sceneMgr.getChefLevel(sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_dish_level),
                data: this.scene.worldScene.sceneMgr.getFoodLevel(sceneId)
            },
        ];
        let richNode = this.node.getChildByName("RichNode")
        let arrLen = list.length;
        for (let i = 0; i < arrLen; i++) {
            let item = list[i];
            let richText = richNode.children[i].getComponent(cc.RichText);
            // richText.string = item.text.format(item.data[2], item.data[1]);
            if (item.data[0] >= item.data[1]) {
                richText.string = `<color=#ffd145>${item.text.format(item.data[2], item.data[1])}(${item.data[0]}/${item.data[1]})</color>`;
            } else {
                // richText.node.color = cc.Color.WHITE;
                richText.string = `${item.text.format(item.data[2], item.data[1])}(<color=#ffd145>${item.data[0]}/</color>${item.data[1]})`;
            }
        }
    }
}
