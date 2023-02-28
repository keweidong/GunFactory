import App from "../../../core/App";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Alogueltem extends cc.Component {

    @property(cc.RichText)
    hualab: cc.RichText = null;
    @property(cc.Sprite)
    head: cc.Sprite = null;
    @property(cc.Sprite)
    hualabbg: cc.Sprite = null;
    // @property(cc.Label)
    // namelab: cc.Label = null;
    @property(cc.Label)
    namelabel: cc.Label = null;

    updateItem(str: string, path: string, name: string) {

        this.hualab.string = str;
        //this.namelab.string = name;
        let iconpath = `/Texture/game/EveentUI/${path}`;
        App.CommonUtils.setSpriteFrame(iconpath, this.head);
        this.hualab.maxWidth = this.hualab.node.width > 292 ? 292 : 0;

    }

    setItem(str: string, path: string, configdetaid?: number) {

        this.hualab.string = `<color=#643216>${str}</color>`;
        this.hualabbg.node.setContentSize(this.hualab.node.width + 80, this.hualabbg.node.height);
        this.hualabbg.node.width = this.hualab.node.width > 362 ? 362 : this.hualabbg.node.width;
        this.hualab.maxWidth = this.hualab.node.width > 292 ? 292 : 0;
        // let iconpath = `/Texture/game/EveentUI/${path}`;
        // App.CommonUtils.setSpriteFrame(iconpath,this.head);
        if (configdetaid) {
            let configid = App.ConfigManager.getConfig("CustomerDataMsr").getData(configdetaid);
            this.namelabel.string = configid.name;
        }

    }
}
