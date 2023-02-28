// let async = require('async');
import BaseView from "../../../../core/mvc/view/BaseView";
import { GuideConst } from "../GuideModel";
import GodText from "./GodText";
import { Locator } from "./Locator";

const RADIAN = 2 * Math.PI / 360;

function getRotatePoint(p, angle, center) {
    let out = cc.v2();
    let radian = -angle * RADIAN;
    out.x = (p.x - center.x) * Math.cos(radian) - (p.y - center.y) * Math.sin(radian) + center.x;
    out.y = (p.x - center.x) * Math.sin(radian) + (p.y - center.y) * Math.cos(radian) + center.y;
    return out;
}

function getRectRotatePoints(rect, angle, pt) {
    let array = [
        cc.v2(rect.x, rect.y),
        cc.v2(rect.x + rect.width, rect.y),
        cc.v2(rect.x + rect.width, rect.y + rect.height),
        cc.v2(rect.x, rect.y + rect.height),
    ];
    return array.map(p => getRotatePoint(p, angle, pt));
}

function touchSimulation(x, y) {

    let rect;
    let inputManager = window['_cc'].inputManager;
    if (cc.sys.isBrowser) {
        let canvas = document.getElementById("GameCanvas");
        rect = inputManager.getHTMLElementPosition(canvas);
    } else {
        rect = cc.view.getFrameSize();
        rect.left = 0;
        rect.top = 0;
    }

    let vp = cc.view.getViewportRect();
    let sx = cc.view.getScaleX();
    let sy = cc.view.getScaleY();
    let ratio = cc.view.getDevicePixelRatio();
    let htmlx = (x * sx + vp.x) / ratio + rect.left;
    let htmly = rect.top + rect.height - (y * sy + vp.y) / ratio;
    let pt = cc.v2(htmlx, htmly);

    cc.log(`模拟点击坐标：${pt.x}, ${pt.y}`);
    let touch = inputManager.getTouchByXY(pt.x, pt.y, rect);
    inputManager.handleTouchesBegin([touch]);
    setTimeout(() => {
        inputManager.handleTouchesEnd([touch]);
    }, 200);

    // let click = document.createEvent("MouseEvents");
    // click.initMouseEvent("mousedown", true, true, window, 0, 0, 0, pt.x, pt.y, true, false, false, false, 0, null);
    // canvas.dispatchEvent(click);
    // setTimeout(function () {
    //     let mouseup = document.createEvent("MouseEvent");
    //     mouseup.initMouseEvent("mouseup", true, true, window, 0, 0, 0, pt.x, pt.y, true, false, false, false, 0, null);
    //     canvas.dispatchEvent(mouseup);
    // }, 500);
}
/**
 * 新手引导步奏数据
 */
export interface GuideStep<T> {
    /** 新手引导描述 */
    desc?: string;
    /**命令的名称 */
    cmd?: string;
    /**附带参数 */
    arg1: T;
    delay?: number;
    /**步奏开始回调 */
    onStart?(callback: Function, step: GuideStep<T>);
    /**步奏结束回调 */
    onEnd?(callback: Function, step: GuideStep<T>);
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class GodGuide extends BaseView {

    @property(cc.Prefab)
    FINGER_PREFAB: cc.Prefab = null;

    @property(cc.Prefab)
    TEXT_PREFAB: cc.Prefab = null;

    @property(cc.Prefab)
    storyPrefab: cc.Prefab = null;

    _targetNode: cc.Node;
    protected _finger: cc.Node;
    text: cc.Node;

    protected stroyObj: {
        node: cc.Node;
        index: number;
        items: {
            label: cc.Label;
            img: cc.Sprite;
            node: cc.Node;
        }[];

    } = null;

    public _mask: cc.Mask;
    protected _dispatchEvent: any;
    protected _recordSteps: GuideStep<any>[];
    initUI() {
        super.initUI();
        this.init();
    }

    touchSimulation(node) {
        this.log('自动执行，模拟触摸');
        this.scheduleOnce(() => {
            cc.log('自动节点 :', JSON.stringify(node.position));
            let p = node.parent.convertToWorldSpaceAR(node.position);
            cc.log('世界节点 :', JSON.stringify(p));
            touchSimulation(p.x, p.y);
        }, 1);
    }

    init() {
        this.node.setContentSize(cc.winSize);
        //创建手指提示
        this._targetNode = null;
        if (this.FINGER_PREFAB) {
            this._finger = cc.instantiate(this.FINGER_PREFAB);
            this._finger.parent = this.node;
            this._finger.active = false;
        }

        //创建文本提示
        if (this.TEXT_PREFAB) {
            this.text = cc.instantiate(this.TEXT_PREFAB);
            this.text.parent = this.node;
            this.text.active = false;
        }

        //获取遮罩组件 
        this._mask = this.node.getComponentInChildren(cc.Mask);
        this._mask.inverted = true;
        this._mask.node.opacity = 0;
        // this._mask.node.active = false;

        //监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchStart, this, true);
        // let _dispatchEvent = cc.Node.prototype.dispatchEvent;
        //Hook节点事件派发函数
        // cc.Node.prototype.dispatchEvent = function (event: cc.Event.EventTouch) {
        //     //仅缓存对节点的TouchEnd操作
        //     if (event.type === cc.Node.EventType.TOUCH_END) {
        //         Log.trace("event", this.name, event.type)
        //         //     let now = Date.now();
        //         //     let delay = (now - time) / 1000;
        //         //     time = now;
        //         //     let arg1 = self.getNodeFullPath(this);
        //         //     self._recordSteps.push({
        //         //         // desc: `点击${arg1}`,
        //         //         cmd: GodCommand.FINGER,
        //         //         arg1: arg1,
        //         //         delay,
        //         //     });
        //     }
        //     //执行引擎原生触摸派发函数
        //     _dispatchEvent.call(this, event);
        // }
    }
    public getStoryObj() {
        if (this.stroyObj) {
            // this.stroyObj.node.active = true;
        } else {
            let stroyNode = cc.instantiate(this.storyPrefab);
            this.node.addChild(stroyNode);
            this.stroyObj = {
                index: 0,
                node: stroyNode,
                items: []
            };
            for (const child of stroyNode.children) {
                child.active = false;
                this.stroyObj.items.push({
                    node: child,
                    img: child.getComponent(cc.Sprite),
                    label: child.getChildByName("Label").getComponent(cc.Label)
                })
            }

        }
        return this.stroyObj;
    }
    stepFinish(id: number) {
        this._mask.node.active = false;
    }
    enterStep(id: number) {
        this._mask.node.active = true;
    }

    hideFinger() {
        if (this._finger) {
            // let finger = this._finger.getComponent(this.FINGER_PREFAB.name);
            // finger.stopAni();
            this._finger.active = false;
        }
    }
    protected onTouchStart(event: cc.Event.EventMouse) {
        //录制中，放行
        if (this._dispatchEvent) {
            this.node._touchListener.setSwallowTouches(false);
            return;
        }

        //放行
        if (!this._mask.node.active) {
            this.node._touchListener.setSwallowTouches(false);
            return;
        }

        //目标节点不存在，拦截
        if (!this._targetNode) {
            event.stopPropagationImmediate();
            // this.node._touchListener.setSwallowTouches(true);
            return;
        }

        if (this._targetNode._hitTest(event.getLocation(), this._targetNode)) {
            this.node._touchListener.setSwallowTouches(false);
            cc.log('命中目标节点，放行');
        } else {
            // this.node._touchListener.setSwallowTouches(true);
            event.stopPropagationImmediate();
            cc.log('未命中目标节点，拦截');
        }
    }
    public reset() {
        this._targetNode = null;
        this.hideFinger();
        this.hideMask();
        this.hideText();
    }
    hideText() {
        let godText = this.text.getComponent(this.TEXT_PREFAB.name) as GodText;
        godText.hideText();
    }
    /** 隐藏遮罩 */
    hideMask() {
        if (this._mask._graphics) {
            this._mask._graphics.clear();
        }
        // this._mask.node.active = false;
        this._mask.node.opacity = 0;
    }

    /** 显示遮罩 */
    showMask(opacity?: number) {
        this._mask.node.active = true;
        this._mask._graphics.clear();
        if (opacity > -1) {
            this._mask.node.opacity = opacity;
        }
        else {
            this._mask.node.opacity = 255;
        }
    }

    public open() {
        super.open();
        this._mask.node.active = true;
    }




    /**
     * 手指动画
     */
    fingerToNode(node: cc.Node, cb: Function) {
        if (!this._finger) {
            cb();
        }

        this._finger.active = true;
        let p = this.node.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        let duration = p.sub(this._finger.position).mag() / cc.winSize.height;
        let moveTo = cc.moveTo(duration, p);
        let callFunc = cc.callFunc(cb);
        let sequnce = cc.sequence(moveTo, callFunc);
        this._finger.runAction(sequnce);
    }

    log(text) {
        // if (this._task.debug) {
        //     cc.log(text);
        // }
    }

    /**
     * 
     * @param value 
     * @param cb 
     * @param type 0 绘制圆形镂空, 1 绘制圆角矩形镂空
     */
    find(value: string, cb?: Function, type = 0) {
        let root = cc.director.getScene();
        cc.log("开启查找节点:", value)
        Locator.locateNode(root, value, (error, node: cc.Node) => {
            if (error) {
                cc.log(error);
                return;
            }
            cc.log('定位节点成功');
            let temp = node;
            cc.log("/-----------------------")
            do {
                cc.log("节点", temp.name, temp.x, temp.y, temp.width, temp.height);
                temp = temp.parent;
            } while (temp);
            cc.log("-----------------------/")
            let rect = this._focusToNode(node, type);
            if (cb) {
                cb(node, rect);
            }
        });
    }

    getNodePoints(rect, angle, pt) {
        return getRectRotatePoints(rect, angle, pt).map(p => {
            return p;
        });
    }

    fillPolygon(points: cc.Vec2[]) {
        let p0 = points[0];
        this._mask._graphics.moveTo(p0.x, p0.y);
        points.slice(1).forEach(p => {
            this._mask._graphics.lineTo(p.x, p.y);
        });
        this._mask._graphics.lineTo(p0.x, p0.y);
        this._mask._graphics.stroke();
        this._mask._graphics.fill();
    }
    fillPoints(points: cc.Vec2[]) {
        let p0 = points[0];
        this._mask._graphics.moveTo(p0.x, p0.y);
        points.slice(1).forEach(p => {
            this._mask._graphics.lineTo(p.x, p.y);
        });
        this._mask._graphics.lineTo(p0.x, p0.y);
        this._mask._graphics.stroke();
        this._mask._graphics.fill();
    }
    /**
     * 
     * @param node 镂空的节点
     * @param type 0 绘制圆形镂空, 1 绘制圆角矩形镂空
     */
    protected _focusToNode(node: cc.Node, type: number = 0) {
        this._mask._graphics.clear();
        let rect = node.getBoundingBoxToWorld();
        let p = this.node.convertToNodeSpaceAR(rect.origin);
        if (type === 0) {
            let r = rect.width > rect.height ? rect.width / 2 : rect.height / 2 + 10;
            this._mask._graphics.circle(p.x + rect.width / 2, p.y + rect.height / 2, r);
        } else {
            this._mask._graphics.roundRect(p.x, p.y, rect.width, rect.height, 10);

        }
        this._mask._graphics.fill();
        return rect;
    }

    /**
     * 获取节点全路径
     * @param {*} node 
     */
    getNodeFullPath(node: cc.Node) {
        let array = [];
        let temp = node;
        do {
            if (temp.name !== "GameScene") {
                array.unshift(temp.name);
            }
            temp = temp.parent;
        } while (temp && temp.name !== 'Canvas')
        return array.join('/');
    }

    /**
     * 是否为引导层节点
     * @param {*} node 
     */
    isGuideNode(node) {
        let result = false;
        let temp = node;
        do {
            if (temp === this.node) {
                result = true;
                break;
            }
        } while (temp = temp.parent)

        return result;
    }

    /**
     * 录制节点触摸
     */
    startRecordNodeTouch() {

        if (this._dispatchEvent) {
            cc.warn('已经进入录制模式');
            return;
        }
        //缓存引擎原生触摸派发函数
        this._dispatchEvent = cc.Node.prototype.dispatchEvent;
        this._recordSteps = [];

        let self = this;
        let time = Date.now();
        //Hook节点事件派发函数
        cc.Node.prototype.dispatchEvent = function (event) {

            //过滤掉引导节点上的事件，
            if (self.isGuideNode(this)) {
                //执行引擎原生触摸派发函数
                self._dispatchEvent.call(this, event);
                return;
            }
            //仅缓存对节点的TouchEnd操作
            if (event.type === cc.Node.EventType.TOUCH_END) {
                let now = Date.now();
                let delay = (now - time) / 1000;
                time = now;
                let arg1 = self.getNodeFullPath(this);
                self._recordSteps.push({
                    // desc: `点击${arg1}`,
                    arg1,
                    delay,
                });
            }
            //执行引擎原生触摸派发函数
            self._dispatchEvent.call(this, event);
        }
    }

    /**
     * 停止节点触摸录制
     */
    stopRecordNodeTouch() {
        if (this._dispatchEvent) {
            cc.Node.prototype.dispatchEvent = this._dispatchEvent;
            this._dispatchEvent = null;
            cc.warn('退出录制状态');
        } else {
            cc.warn('未进入录制状态');
        }
    }

    /**
     * 回放录制
     */
    playRecordNodeTouch() {
        this.stopRecordNodeTouch();
        if (this._recordSteps && this._recordSteps.length) {
            cc.log('生成任务：', console.table(this._recordSteps));
            // let task = {
            //     autorun: false,
            //     debug: true,
            //     steps: this._recordSteps,
            // }
            // this._recordSteps = null;
            // this.setTask(task);

        }
    }

    //显示文本
    showText(data: {
        str: string;
        pos: string;
        ani: string;
    }) {
        let widget = this.text.getChildByName("Body").getComponent(cc.Widget);
        switch (data.ani) {
            case "l":
                this.text.x = -cc.winSize.width / 2;
                cc.tween(this.text).to(0.5, { x: 0 }, { easing: cc.easing.cubicOut }).start();
                break;
            case "r":
                this.text.x = cc.winSize.width / 2;
                cc.tween(this.text).to(0.5, { x: 0 }, { easing: cc.easing.cubicOut }).start();
                break;
            default:
                // this.text.x = 0;
                break;
        }
        if (data.pos) {
            const pos = data.pos;
            widget.isAlignVerticalCenter =
                widget.isAlignTop =
                widget.isAlignBottom = false;
            switch (pos[0]) {
                case "v":
                    widget.isAlignVerticalCenter = true;
                    widget.verticalCenter = parseInt(pos.slice(1));
                    break;
                case "t":
                    widget.isAlignTop = true;
                    widget.top = parseInt(pos.slice(1));
                    break;
                case "b":
                    widget.isAlignBottom = true;
                    widget.bottom = parseInt(pos.slice(1));
                    break;
                default:
                    widget.isAlignBottom = true;
                    widget.bottom = 155;
                    break;
            }

        } else {
            widget.isAlignVerticalCenter = false;
            widget.isAlignTop = false;
            widget.isAlignBottom = true;
            widget.bottom = 155;
        }

        let godText = this.text.getComponent(this.TEXT_PREFAB.name) as GodText;
        godText.setText(data.str);
    }
    // showDesc(text: string[], callback: Function) {
    //     this._desc.once('click', () => {
    //         this.hideDesc();
    //         callback();
    //     })
    //     let godDesc = <GodDesc>this._desc.getComponent(this.DESC_PREFAB.name);
    //     godDesc.setContent(text);
    // }
    protected onTouchStartGuideBtn() {
        this.applyFunc(GuideConst.OPEN_GUIDE);
    }



    close() {
        this.node.active = false;
    }
}
