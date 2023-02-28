import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { Platform } from "../../platform/Platform";
import MoreOtherGameitem from './MoreOtherGameitem';

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreGameView extends BaseView {

    @property(cc.ScrollView)
    moreGameScrollView: cc.ScrollView = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    itemBtn: cc.Prefab = null;

    @property
    text: string = 'hello';


    public conf: {
        gameInfos: Map<string, Platform.OtherGameConfData>,
        showOtherGame: number[],
        showBottomGame: String[]
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    initUI() {
        super.initUI();

    }

    public open() {
        super.open();
        this.content.removeAllChildren();
        this.initConfig();

    }

    public close() {
        super.close();
        this.content.removeAllChildren();
    }

    /**读取更多游戏的配置 */
    public async initConfig() {
        let gameConf: cc.JsonAsset = await App.ResManager.getResAsync("/config/otherGame_conf");
        this.conf = gameConf.json;
        let arrayConfig: Platform.OtherGameConfData[] = [];
        this.conf.showBottomGame;
        this.conf.showOtherGame;
        Log.trace("其他游戏的配置conf:", this.conf);
        let showGameIds: number[] = this.conf.showOtherGame;
        let length = showGameIds.length;
        for (let i = 0; i < length; i++) {
            let count = this.conf.showOtherGame[i];
            let gameInfo: Platform.OtherGameConfData = this.conf.gameInfos[`otherGame${count}`];
            if (gameInfo) {
                arrayConfig.push(gameInfo);
            }
        }
        Log.trace("其他游戏: ", arrayConfig.length)
        this.initItem(arrayConfig);
    }
    /**init导量按钮 */
    public initItem(data: Platform.OtherGameConfData[]) {
        if (data.length < 0) {
            return;
        }
        for (let i = 0; i < data.length; i++) {
            let item = cc.instantiate(this.itemBtn);
            item.getComponent(MoreOtherGameitem).initItemData(data[i]);
            this.content.addChild(item);
        }

    }
    // update (dt) {}
}
