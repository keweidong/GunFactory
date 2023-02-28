import { buffShowData } from '../Buff/BuffShowView';
import { StarDataMsr, StarData } from '../GameMain/object/scene/config/StarDataMsr';
import App from '../../../core/App';
import { GameText } from '../../../core/lang/GameText';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

const color1 = cc.color().fromHEX("#fabce8");
const color2 = cc.color().fromHEX("#ff5400");

@ccclass
export default class Startitem extends cc.Component {

    /**背景*/
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    /**影子 */
    @property(cc.Sprite)
    yingzi: cc.Sprite = null;

    /**灯光遮罩 */
    @property(cc.Sprite)
    lightMart: cc.Sprite = null;

    /**buff描述1 */
    @property(cc.Label)
    buffDes1: cc.Label = null;

    /**buff描述1 */
    @property(cc.Label)
    buffDes2: cc.Label = null;

    setData(data: StarData, isShow: boolean) {
        // this.buffDes1 =data.
        if (isShow) {
            this.buffDes1.string = GameText.getText(lang.start_more_reward);//"海量收益";
            // this.buffDes1.string = "场景" + data.scenceId + 1 + "宣传" + data.unlockguest + 1 + "解锁";

            this.buffDes1.node.color = color2;
            // this.buffDes2.string = "";
            let url = "Texture/game/StartUI/star_" + data.id;

            App.CommonUtils.setSpriteFrame(url, this.yingzi);
            // this.lightMart.node.active = true;

        } else {
            // this.buffDes1.string = "场景" + (data.scenceId + 1) + "宣传" + (data.unlockguest + 1) + "解锁";
            this.buffDes1.string = GameText.getText(lang.start_buff_des).format(data.scenceId + 1, data.unlockguest + 1);
            this.getComponent(cc.Button).interactable = false;
        }
    }
}
