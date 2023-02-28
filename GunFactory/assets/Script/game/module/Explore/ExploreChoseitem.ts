import { ExploreAwardType, ExploreConst } from './ExploreConst';
import App from '../../../core/App';
import MoneyIcon from '../../component/MoneyIcon';
import { ControllerConst } from '../../consts/ControllerConst';
import ExploreAni from './ExploreAni';
import { GameText } from '../../../core/lang/GameText';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExploreChoseitem extends cc.Component {

    /**
     * 翻牌动画
     */
    @property(cc.Animation)
    public card: cc.Animation = null;
    /**
     * 爆炸动画
     */
    @property(cc.Animation)
    public baozha: cc.Animation = null;

    @property(cc.Sprite)
    public icon: cc.Sprite = null;
    /**
     * 奖励得节点
     */
    @property(cc.Node)
    awardShowNode: cc.Node = null;

    /**
     * 类型:金币,钻石,空
     */
    @property(cc.Label)
    awardTypeLab: cc.Label = null;

    /**
     * 奖励的icon
     */
    @property(cc.Sprite)
    awardicon: cc.Sprite = null;

    /**
     * 奖励的数量
     */
    @property(cc.Label)
    awardNum: cc.Label = null;


    /**数组位置 */
    itemindex: number = 0;;

    /**是否在播放动画 */
    isPlaying: boolean = false;

    /**
     * 是否播放了card1动画
     */
    isAlreadyplay: boolean = false;

    /**
     * 奖励的类型
     */
    aniType: ExploreAwardType = ExploreAwardType.bomb;

    @property(ExploreAni)
    ani: ExploreAni = null;

    private _isSelect: boolean = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // var anim1 = this.card.getAnimationState('card1');
        // anim1.on('finished', function () {
        //     console.log('完成了！2222222');
        // }, this);
        this.setIsAutoScale(true);
        //完成播放时调用
        this.card.on('finished', this.aniOver.bind(this), this);

    }

    /**
     * 动画完成监听事件  //完成播放时调用
     */
    aniOver() {
        this.isPlaying = false;
        if (this.aniType != ExploreAwardType.bomb) {
            //遮罩的按钮打开
            App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.MarkCanClick)
        }

        // this.isAlreadyplay = true;
    }

    /**
     * 展示
     */
    showAwardLab() {
        this.awardShowNode.active = true;
    }

    /**
     * 
     * @param data 
     */
    setData(data: ExploreitemData, time?: number) {
        let url = "";
        let lab = "";
        let money = "";
        switch (data.type) {
            case ExploreAwardType.none:
                url = "Texture/Explore/item4"
                lab = GameText.getText(lang.common_empty);//"空";
                money = "0";
                break;
            case ExploreAwardType.golds:
                url = "Texture/Explore/item3"
                lab = GameText.getText(lang.common_gold);//"金币";
                money = MyBigLong.toString(data.item.getCnt())
                break;
            case ExploreAwardType.Diamonds:
                url = "Texture/Explore/item2"
                lab = GameText.getText(lang.common_diamond);//"钻石";
                money = MyBigLong.toString(data.item.getCnt())
                break;
            case ExploreAwardType.bomb:
                url = "Texture/Explore/item1"
                lab =  GameText.getText(lang.explore_chose_boom);//"炸弹";
                money = ""
                break;
        }
        App.CommonUtils.setSpriteFrame(url, this.awardicon);
        this.awardTypeLab.string = lab;
        //钱数
        this.awardNum.string = money;

        if (!time) {
            this.starShowAni(data.type, true);
            this._isSelect = true;
        }
        else {
            this._isSelect = false;
            this.scheduleOnce(() => {
                this.starShowAni(data.type, false)
            }, time)
        }

    }
    /**
     * 
     */
    showBombAni() {
        // this.awardShowNode.active = false;
        this.card.node.active = true;
        this.icon.node.active = false;
        this.baozha.node.active = true;
        this.baozha.play("baozha");

    }

    /**
     * 开始播放获得物品的动画
     */
    starShowAni(aniType: ExploreAwardType, isSelect?: boolean) {
        this.awardShowNode.active = false;
        this.card.node.active = true;
        this.icon.node.active = false;

        this.aniType = aniType;
        this.ani.setIsSelect(isSelect);

        if (!isSelect) {
            this.card.play("card1");
            return;
        }
        switch (aniType) {
            case ExploreAwardType.Diamonds:
            case ExploreAwardType.golds:
            case ExploreAwardType.none:

                this.card.play("card1");
                break;
            case ExploreAwardType.bomb:
                this.card.play("card2");
                break;
            default:
                break;
        }


    }

    /**
     * 
     * @param event 开始播放
     * @param rate 
     */

    /**抽奖按钮点击事件 */
    onTouchthisBtn(event: cc.Event, rate: string) {
        if (!this.isPlaying) {
            this.isPlaying = true;

            let multiple = parseInt(rate);
            if (!multiple) {
                multiple = 0;
            }
            this.itemindex = multiple;
            App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.ExploreChoujiang, this.itemindex)
        }
    }
    /**
     * 初始化
     */
    rethisitem() {
        this.baozha.node.active = false
        this.icon.node.active = true;
        this.awardShowNode.active = false;
        this.card.node.active = false;
        this.isPlaying = false;
    }

    public setIsAutoScale(value: boolean) {
        this.awardicon.node.scale = 1;
        if (value) {
            this.awardicon.node.on(cc.Node.EventType.SIZE_CHANGED, this.onFurnitureImgSizeChange, this);
            this.onFurnitureImgSizeChange();
        } else {
            this.awardicon.node.off(cc.Node.EventType.SIZE_CHANGED, this.onFurnitureImgSizeChange, this);
        }
    }
    protected onFurnitureImgSizeChange() {
        // CC_DEBUG && Log.trace("onFurnitureImgSizeChange", this.fImg.node.width, this.fImg.node.height);
        if (this.awardicon.node.width > 160 || this.awardicon.node.height > 160) {
            if (this.awardicon.node.width > this.awardicon.node.height) {
                var scale = 160 / this.awardicon.node.width;
            } else {
                var scale = 160 / this.awardicon.node.height;
            }
            this.awardicon.node.scale = scale;
        }
        else {
            this.awardicon.node.scale = 1;
        }
    }
}
