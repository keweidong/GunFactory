import App from "../../core/App";

const { ccclass, property, menu, requireComponent, executeInEditMode, executionOrder } = cc._decorator;
// enum ViewAniEnum {
//     Tween_TopToBottom,
// }
let tweenAni: {
    [value: string]: (node: cc.Node, cb?: Function) => void;
} = {
    TopToBottom: function (node: cc.Node, cb?: Function) {
        let tween = cc.tween(node).to(0.6, { y: 0 }, { easing: cc.easing.bounceOut });
        if (cb) {
            tween.call(cb);
        }
        node.y = cc.winSize.height;
        tween.start();
    },
    BottomToTop: function (node: cc.Node, cb?: Function) {
        let tween = cc.tween(node).to(0.5, { y: cc.winSize.height }, { easing: cc.easing.cubicOut });
        if (cb) {
            tween.call(cb);
        }
        tween.start();
    }
}


@ccclass
@menu("UI/ViewAni")
@executeInEditMode
@executionOrder(-1)
export default class ViewAni extends cc.Component {
    // openAni
    @property(cc.AnimationClip)
    protected _enterAniAsset: cc.AnimationClip = null;

    @property(cc.AnimationClip)
    protected _exitAniAsset: cc.AnimationClip = null;
    /**
     * 能否播放窗口动画(部分窗口动画会导致新手引导定位节点出问题,所以在新手引导期间,会禁用窗口动画)
     */
    public static isCanPlayAni: boolean = true;

    @property()
    protected _enterTweenName: string = "";

    @property()
    protected _exitTweenName: string = "";

    protected _ani: cc.Animation = null;
    static viewAnis: any[] = null;
    /**
     * 播放退出动画中
     */
    public isExiting: boolean = false;

    @property({ editorOnly: true })
    protected _exitAni = 0;
    @property({
        type: cc.Enum({}),
        tooltip: "退出动画"
    })
    get exitAni() {
        return this._exitAni;
    }
    set exitAni(value: number) {
        if (this._exitAni === value) {
            return;
        }
        this._exitAni = value;
        this._exitAniAsset = null;
        this._exitTweenName = "";
        if (value) {
            let aniItem = ViewAni.viewAnis[value];
            if (typeof aniItem === "string") {
                this._exitTweenName = aniItem;
            } else {
                this._exitAniAsset = aniItem;
            }
        }
    }
    /**
     * 是否有退出动画
     */
    public isExitAni() {
        return (this._exitAniAsset || this._exitTweenName) && ViewAni.isCanPlayAni;
    }
    //枚举Shader程序
    @property({ editorOnly: true })
    protected _enterAni = 0;
    @property({
        type: cc.Enum({}),
        tooltip: "开启动画"
    })
    get enterAni() {
        return this._enterAni;
    }
    set enterAni(value: number) {
        if (this._enterAni === value) {
            return;
        }
        this._enterAni = value;
        this._enterAniAsset = null;
        this._enterTweenName = "";
        if (value) {
            let aniItem = ViewAni.viewAnis[value];
            if (typeof aniItem === "string") {
                this._enterTweenName = aniItem;
            } else {
                this._enterAniAsset = aniItem;
            }
        }
        cc.log("this._enterAniAsset:", this._enterAniAsset)
        cc.log("this._enterTweenName:", this._enterTweenName)
    }

    start() {
        // this._ani.node

    }
    protected onAnimCompleted() {
        if (this.isExiting) {
            this.isExiting = false;
            if (this.node.parent) {
                this.node.parent.removeChild(this.node, false);
            }
            this.node.active = false;
            this.node.scale = this._curScale;
            App.ViewManager.checkIsNeedAddBg();
        } else {
            // cc._widgetManager.refreshWidgetOnResized(this.node);
        }
    }
    /**是不是第一次播放动画 */
    protected _isFirst: boolean = true;
    public onEnter() {
        if (ViewAni.isCanPlayAni) {
            if (this.enabled) {
                if (this._isFirst) {//第一次播放动画,为了防止widget组件失效,在2帧后再播放动画
                    let tempOpacity = this.node.opacity;
                    this.node.opacity = 0;
                    App.TimerManager.setFrameOut(2, () => {
                        this.node.opacity = tempOpacity;
                        this.playEnterAni();
                    }, this);
                    this._isFirst = false;
                } else {
                    this.playEnterAni();
                }
            }
        }
        this.isExiting = false;
    }
    protected playEnterAni() {
        if (this._enterAniAsset) {
            // this._ani.once(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
            this._ani.play(this._enterAniAsset.name);
        } else if (this._enterTweenName) {
            if (tweenAni[this._enterTweenName]) {
                tweenAni[this._enterTweenName](this.node);
            }
        }
    }
    protected _curScale: number = 1;
    public onExit() {
        if (ViewAni.isCanPlayAni) {
            this.isExiting = true;
            if (this.enabled) {
                this._curScale = this.node.scale;
                if (this._exitAniAsset) {
                    this._ani.once(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
                    this._ani.play(this._exitAniAsset.name);
                } else if (this._exitTweenName) {
                    if (tweenAni[this._exitTweenName]) {
                        tweenAni[this._exitTweenName](this.node, this.onAnimCompleted.bind(this));
                    }
                }
            }
        }
    }
    onLoad() {
        // this._ani = this.getComponent(cc.Animation);
        if (CC_EDITOR) {
            let array = ViewAni.viewAnis.map((item, i) => {
                if (i) {
                    return typeof item === "string" ? item : item._name;
                }else{
                    return "NONE";
                }
            });
            let arrLen = array.length;
            for (let i = 0; i < arrLen; i++) {
                if (this._enterAniAsset && array[i] == this._enterAniAsset.name) {
                    this._enterAni = i;
                }
                if (this._exitAniAsset && array[i] == this._exitAniAsset.name) {
                    this._exitAni = i;
                }
                if (this._enterTweenName && array[i] == this._enterTweenName) {
                    this._enterAni = i;
                }
                if (this._exitTweenName && array[i] == this._exitTweenName) {
                    this._exitAni = i;
                }
            }
        } else {
            if (this._enterAniAsset || this._exitAniAsset) {
                this._ani = this.addComponent(cc.Animation);
                if (this._enterAniAsset) {
                    this._ani.addClip(this._enterAniAsset);
                }
                if (this._exitAniAsset) {
                    this._ani.addClip(this._exitAniAsset);
                }
            }
        }

    }
}
if (CC_EDITOR) {
    cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {
        Editor.assetdb.queryAssets('db://assets/ani/ViewAni/**\/*', '', function (error, results: any[]) {
            ViewAni.viewAnis = [];
            Promise.all(results.map(function (result) {
                return new Promise((resolve: Function, reject: Function) => {
                    cc.loader.load({ uuid: result.uuid }, (error, result) => {
                        ViewAni.viewAnis.push(result)
                        resolve();
                    })
                })
            })).then(() => {
                ViewAni.viewAnis = ViewAni.viewAnis.concat(Object.keys(tweenAni));
                let array = ViewAni.viewAnis.map((item, i) => {
                    return { name: typeof item === "string" ? "Tween_" + item : item._name, value: i + 1 };
                });
                ViewAni.viewAnis.unshift(null);
                array.unshift({ name: "NONE", value: 0 });
                cc.Class.Attr.setClassAttr(ViewAni, 'enterAni', 'enumList', array);
                cc.Class.Attr.setClassAttr(ViewAni, 'exitAni', 'enumList', array);
            });
        });
    })
}