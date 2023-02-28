import App from "../../../core/App";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "../GameMain/GameConst";
import BaseView from "../../../core/mvc/view/BaseView";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { Platform } from "../../platform/Platform";
import { UI } from "../../../core/utils/Image";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";

const { ccclass, property } = cc._decorator;

/**每日任务弹窗*/
@ccclass
export default class FriendShareView extends BaseView {
    @property(cc.Sprite)
    display: cc.Sprite = null;

    @property([cc.Label])
    nameList: cc.Label[] = [];

    @property([cc.Sprite])
    iconList: cc.Sprite[] = [];

    // @property([UI.Image])
    // img:UI.Image = null;

    @property([cc.Label])
    goldList: cc.Label[] = [];

    @property([cc.Node])
    rankList: cc.Node[] = [];

    @property([cc.Node])
    canvas: cc.Node;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    /** 开放数据域对象 */
    openDataContext = null;
    sharedCanvas = null;
    spriteFrame: cc.SpriteFrame = null;
    texture: cc.Texture2D = null;
    worldScene: WorldScene;

    public onLoad() {
        if (cc.sys.platform === cc.sys.QQ_GAME) {
            this.node.active = true;
            this.init();
            this.openDataContext = qq.getOpenDataContext();
            this.open();
        }
        this.canvas.height = this.rankList.length * 92 + (this.rankList.length - 1) * 10;
    }

    /** 点击领取按钮 */
    protected onTouchGetAward() {

    }

    public open() {
        this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        let arr = new Array();
        arr.push({ key: "cuisine", value: this.worldScene.playerDto.cuisine + "" });  //此处的rec.misssionId是int类型
        arr.push({ key: "goldSum", value: this.worldScene.playerDto.goldSum + "" });
        qq.setUserCloudStorage({
            KVDataList: arr,
            success() { },
        });
        //JSON.stringify(backTabledata)
        console.log("打开分享界面")
        // this.img.source = ""

        let posiconList = [];
        for (let i = 0; i < this.iconList.length; i++) {
            let icon = this.iconList[i];
            // let pos = icon.parent.convertToWorldSpaceAR(icon.position);
            posiconList.push(icon.node.position);
        }
        let posnameList = [];
        for (let i = 0; i < this.nameList.length; i++) {
            let name = this.nameList[i];
            // let pos = icon.parent.convertToWorldSpaceAR(icon.position);
            posnameList.push(name.node.position);
        }
        let posgoldList = [];
        for (let i = 0; i < this.goldList.length; i++) {
            let gold = this.goldList[i];
            // let pos = icon.parent.convertToWorldSpaceAR(icon.position);
            posgoldList.push(gold.node.position);
        }
        let openDataContext = this.openDataContext = qq.getOpenDataContext();;
        let sharedCanvas = openDataContext.canvas;
        sharedCanvas.width = this.display.node.width;
        sharedCanvas.height = this.display.node.height;

        this.openDataContext.postMessage({
            command: 'drawPf',
            icon: posiconList,
            gold: posgoldList,
            name: posnameList,
            // bglist: this.rankList,
            // canvas: this.canvas
        })
        let self = this;
        this.scheduleOnce(() => {
            let tex = new cc.Texture2D();
            tex.initWithElement(sharedCanvas);
            tex.handleLoadedTexture();
            self.display.spriteFrame = new cc.SpriteFrame(tex);
        }, 1)

        this.show();
        App.TimerManager.doTimer(700, 12, this.show, this);
    }

    /** 记录当前分享次数 */
    protected count: number = 0;
    protected init() {
        // let openDataContext = this.openDataContext = qq.getOpenDataContext();
        // this.sharedCanvas = openDataContext.canvas;
        // this.sharedCanvas.width = this.display.node.width;
        // this.sharedCanvas.height = this.display.node.height;

        //     qq.getFriendCloudStorage({
        //         success(){

        //         },
        //     })
        // App.TimerManager.doTimer(800, 50, this.showTest, this);
    }

    public showTest() {
        console.log(this.goldList[0].string);
    }

    /** 显示 */
    protected show() {
        // if (this.spriteFrame) {
        //     // console.log("twffff", this.spriteFrame.clearTexture);
        //     // this.spriteFrame.clearTexture();
        // }
        // if (this.texture == null) {
        //     this.texture = new cc.Texture2D();
        // }
        // if (!this.sharedCanvas) {
        //     this.init();
        // }
        // this.texture.initWithElement(this.sharedCanvas);
        // this.texture.handleLoadedTexture();
        // this.spriteFrame = new cc.SpriteFrame(this.texture);
        // this.display.spriteFrame = this.spriteFrame;
    }
    /** 隐藏 */
    protected hide() {
        // if (this.spriteFrame) {
        //     // this.spriteFrame.clearTexture();
        //     this.spriteFrame = null;
        // }

        // if (this.texture) {
        //     this.texture.destroy();
        // }
    }

    public stransmit() {
        Platform.instance.Stransmit(false);
    }
}
