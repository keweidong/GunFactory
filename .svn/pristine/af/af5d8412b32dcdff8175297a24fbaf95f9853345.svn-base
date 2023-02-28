import App from "../../core/App";
import EffectUtils from "../../core/utils/EffectUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GetBoxLaterAni extends cc.Component {
    @property([cc.SpriteFrame])
    boxSpriteFrame: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    boxSprite: cc.Sprite = null;

    @property(cc.Node)
    boxcIconNode: cc.Node = null;

    isPlaying: boolean = true;

    protected tw: cc.Tween<any>;

    onTouchTap() {
        if (this.isPlaying === false) {
            this.close();
            //return;
        } else {
            this.isPlaying = false;
            //App.TimerManager.remove(this.onTouchTap, this);
            this.onTouchTap();
        }

    }

    /** 播放飘箱子动画 */
    public playMoveIcon() {
        this.isPlaying = true;
        //App.TimerManager.doTimer(1000, 1, this.onTouchTap, this);
        //let pos = this.node.convertToWorldSpaceAR(this.boxcIconNode.position);
        let pos = this.boxcIconNode.position;
        //let parent = LayerManager.getLayer(LayerManager.UI_Tips);
        //pos = parent.convertToNodeSpaceAR(pos);
        this.boxSprite.node.x = 0;
        this.boxSprite.node.y = 0;
        this.boxSprite.node.scaleX = this.boxSprite.node.scaleY = 1;
        this.tw = cc.tween(this.boxSprite.node)
            .to(1, {
                x: pos.x,
                y: pos.y,
                scaleX: 0.2,
                scaleY: 0.2,
            }, { easing: cc.easing.quadIn })
            .call(() => {
                this.onTouchTap();
            }
            )
            .start();
        // this.tw.start()
    }

    protected close() {
        if (this.tw) {
            this.tw.removeSelf();
            this.tw = null;
        }
        if (this.node.parent) {
            this.node.removeFromParent(false);
        }

        EffectUtils.instance.queueExecutor.finishFunc();
    }

    /** 播放获得宝箱后飞向宝箱icon动画 */
    public play(boxId, path?: string) {

        switch (boxId) {
            case 1:
                this.boxSprite.spriteFrame = this.boxSpriteFrame[0];
                break;
            case 2:
                this.boxSprite.spriteFrame = this.boxSpriteFrame[1];
                break;
            case 3:
                this.boxSprite.spriteFrame = this.boxSpriteFrame[2];
                break;
            default:
                if (path) {
                    let imgPath = "Texture/ShopUI/" + path;
                    App.CommonUtils.setSpriteFrame(imgPath,this.boxSprite);
                }
                break;
        }
        //this.node.getComponentInChildren(cc.Animation).play("getBox");
        this.playMoveIcon();
    }

}
