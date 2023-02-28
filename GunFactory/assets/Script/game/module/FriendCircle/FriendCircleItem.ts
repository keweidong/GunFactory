import { GameText } from "../../../core/lang/GameText";
import { UI } from "../../../core/utils/Image";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendCircleItem extends cc.Component {
    /** 背景图 */
    @property(UI.Image)
    protected bg: UI.Image = null;

    /** 头像 */
    @property(UI.Image)
    protected bigIcon: UI.Image = null;

    /** 小头像 */
    @property(UI.Image)
    protected smallIcon: UI.Image = null;

    /** 名字 */
    @property(cc.Label)
    protected bigName: cc.Label = null;

    @property(cc.Label)
    protected smallName: cc.Label = null;

    /** 朋友圈内容 */
    @property(cc.RichText)
    protected desc: cc.RichText = null;

    /** 朋友圈图片 */
    @property(UI.Image)
    protected img: UI.Image = null;

    /** 点赞人名 */
    @property(cc.RichText)
    protected likeName: cc.RichText = null;

    @property([cc.RichText])
    protected replyList: cc.RichText[] = [];

    /** 标题 */
    @property(cc.Node)
    protected titleNode: cc.Node = null;

    /** 朋友圈内容 */
    @property(cc.Node)
    protected content: cc.Node = null;

    /** 朋友圈发布时间 */
    @property(cc.Label)
    protected timeLab: cc.Label = null;

    // bgType: BG_TYPE = BG_TYPE.GRAY;
    // initUI() {
    //     super.initUI();
    //     this.setIsAutoScale(true);
    // }

    onLoad() {
        // super.onLoad();
        // let winSize = cc.winSize;
        // if (winSize.width > 750) {
        //     // this.sceneBg.node.scale = winSize.width / 640;
        //     // this.dbNode.node.scale = winSize.width / 640;
        //     this.bg.node.scale = winSize.width / 750;
        // }
    }

    public setData(index: number, data: FriendCircleShowData) {
        this.titleNode.active = index === 0;
        this.content.active = index > 0;
        this.titleNode.getComponent(cc.Layout).updateLayout();

        this.bg.source = data.bgSource;
        if (data.userIcon) {
            this.bigIcon.source = data.userIcon;//设置玩家头像
        }
        CC_DEBUG && Log.trace("data.userIcon:", data.userIcon);
        if (data.icon) {
            this.smallIcon.source = data.icon;//设置玩家头像
        }
        if (data.userName.indexOf("游客") > -1) {
            this.bigName.string = GameText.getText(lang.friend_circle_zhou_boss);// "周老板";
        } else {
            this.bigName.string = data.userName;
        }

        if (data.name.indexOf("游客") > -1) {
            this.smallName.string = GameText.getText(lang.friend_circle_zhou_boss);//"周老板";
        } else {
            this.smallName.string = data.name;
        }

        this.img.source = data.img;
        this.timeLab.string = data.time;


        this.desc.string = data.desc;
        this.likeName.string = data.likeName;
        for (let i = 0; i < this.replyList.length; i++) {
            let reply = data.replyList[i];
            let richText = this.replyList[i];
            if (reply && richText) {
                richText.string = reply;
                richText.node.active = true;
            }
            else if (richText) {
                richText.node.active = false;
            }
        }
        // this.content.getComponent(cc.Layout).updateLayout();
    }


    public setIsAutoScale(value: boolean) {
        if (value) {
            this.bg.node.on(cc.Node.EventType.SIZE_CHANGED, this.onFurnitureImgSizeChange, this);
            this.onFurnitureImgSizeChange();
        } else {
            this.bg.node.off(cc.Node.EventType.SIZE_CHANGED, this.onFurnitureImgSizeChange, this);
        }
    }
    protected onFurnitureImgSizeChange() {
        CC_DEBUG && Log.trace("onFurnitureImgSizeChange", this.bg.node.width, this.bg.node.height);
        // if (this.bg.node.width > this.bg.node.height) {
        //     var scale = 90 / this.bg.node.width;
        // } else {
        //     var scale = 90 / this.bg.node.height;
        // }
        let winSize = cc.winSize;
        if (winSize.width > 750) {
            var scale = winSize.width / 750;
        }
        this.bg.node.scale = scale || 1;
    }
}
