import BaseView from "../../../core/mvc/view/BaseView";
import { Platform } from "../../platform/Platform";
import ToutiaoGamePlatform from '../../platform/ToutiaoGamePlatform';

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
export default class MoreOtherGameitem extends cc.Component {

    @property(cc.Label)
    gameName: cc.Label = null;

    @property(cc.Sprite)
    gameIcon: cc.Sprite = null;

    @property(cc.Button)
    otherGame_btn: cc.Button = null;
    // LIFE-CYCLE CALLBACKS:

    initItemData(data: Platform.OtherGameConfData) {
        if (data) {
            this.gameName.string = data.name;
            var url = 'Texture/game/otherMoreGame/' + data.img;
            Log.trace("icon的路径", url);
            let _this = this;
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteframe) {
                Log.trace("开始更换图片1")
                _this.gameIcon.spriteFrame = spriteframe;
            });
            this.otherGame_btn.node.on('click', () => {
                Platform.instance.jumpToOtherGame(data.jId, data.jPath);
            }, this);

        }
    }

    // update (dt) {}
}
