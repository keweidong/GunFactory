/*
 * @Author: He 
 * @Date: 2020-05-12 14:07:02 
 * @Last Modified by: He
 * @Last Modified time: 2020-06-15 20:08:51
 * 收缩按钮 
 */
const { ccclass, property, menu, executeInEditMode, playOnFocus } = cc._decorator;
@ccclass
@executeInEditMode
@playOnFocus
@menu("UI/ZoomBtn")
export default class ZoomBtn extends cc.Component {
    @property
    _isShow: boolean = true;
    @property({})
    public set isShow(v: boolean) {
        // this._isShow = v;
        this.buttonChange();
    }
    public get isShow() {
        return this._isShow;
    }

    @property()
    protected _btns: cc.Node[] = [];
    @property({
        type: cc.Node,
        tooltip: "按钮组"
    })
    public set btns(v: cc.Node[]) {
        this._btns = v;
        this.onChildChange();
    }
    public get btns() {
        return this._btns;
    }
    @property
    protected _bgMinHeight: number = 100;
    @property
    protected _bgHeight: number = 0;

    @property({
        type: cc.Button,
        tooltip: "切换按钮"
    })
    protected contractionBtn: cc.Button = null;

    @property({
        type: cc.Node,
        tooltip: "背景图片"
    })
    protected bgNode: cc.Node = null;

    onLoad() {
        if (CC_EDITOR) {
            this.onChildChange();
        } else {
            // this.isShow = false;
        }
    }
    protected onChildChange() {
        let arrLen = this._btns.length;
        this._bgHeight = this._bgMinHeight;
        let y = -64;
        for (let i = 0; i < arrLen; i++) {
            if (!this._btns[i]) {
                break;
            }
            this._bgHeight += 20 + this._btns[i].height;
            this._btns[i].y = y;
            this._btns[i].active = true;
            y -= 20 + this._btns[i].height;
        }
        this._isShow = true;
        this.contractionBtn.node.y = 40 - this._bgHeight;
        this.bgNode.height = this._bgHeight;
    }

    public buttonChange() {
        let time = 0.1;
        this.contractionBtn.interactable = false;
        this._isShow = !this._isShow;
        if (this._isShow) {
            cc.tween(this.bgNode).to(0.2, { height: this._bgHeight }).start();
            cc.tween(this.contractionBtn.node).to(0.2, { angle: 180, y: 40 - this._bgHeight }).start();
            let func = (index: number) => {
                if (index > this.btns.length - 1) {
                    this.contractionBtn.interactable = true;
                    return;
                }
                let item = this.btns[index];
                // item.visible = true;
                item.active = true;
                cc.tween(item).to(time, { y: item.y - item.height, opacity: 255 }, { easing: cc.easing.sineOut }).call(() => {
                    // item.getComponent(cc.Button).interactable = true;
                    func(++index);
                }).start();
            }
            func(0);
        } else {
            cc.tween(this.contractionBtn.node).to(0.2, { angle: 0, y: 40 - this._bgMinHeight }).start();
            cc.tween(this.bgNode).to(0.2, { height: this._bgMinHeight }).start();
            //     egret.Tween.get(this._bgImg).to({ alpha: 0, visible: false }, 400);
            //     this._shirckGroup.once(egret.Event.RENDER, () => {
            let func = (index: number) => {
                if (index < 0) {
                    this.contractionBtn.interactable = true;
                    return;
                }
                let item = this.btns[index];
                // item.getComponent(cc.Button).interactable = false;
                cc.tween(item).to(time, { y: item.y + item.height, opacity: 0 }, { easing: cc.easing.sineOut }).call(() => {
                    func(--index);
                    item.active = false;
                }).start();;

            }
            func(this.btns.length - 1);
        }

    }
}