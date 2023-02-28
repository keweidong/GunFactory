import ViewAni from "../../../game/component/ViewAni";
import LayerManager from "../../../game/LayerManager";
import App from "../../App";
import BaseController from "../controller/BaseController";
import ViewManager from "../ViewManager";
import { BG_TYPE, IBaseView } from "./IBaseView";


/**
 * View基类，继承自eui.Component
 */
export default class BaseView extends cc.Component implements IBaseView {
    public controller: BaseController = null;
    protected _myParent: string = null;
    private _isInit: boolean = false;
    public bgType: BG_TYPE = BG_TYPE.NONE;
    viewAni: ViewAni;
    bgImg: cc.Node = null;
    // protected _closeBtn: UI.CommonBtn;
    public viewId: number = null;


    isFullScreen(): boolean {
        return false;
    }
    start() {
        this.viewAni = this.getComponent(ViewAni)
        if (this.initComplete) {
            this.initComplete();
            this.initComplete = null;
        }
    }

    /**
     * 获取我的父级
     * @returns {egret.DisplayObjectContainer}
     */
    public get myParent(): string {
        return this._myParent;
    }
    public set myParent(value: string) {
        this._myParent = value;
    }

    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    public isInit(): boolean {
        return this._isInit;
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key: any, ...param: any[]): any {
        return this.controller.applyFunc.apply(this.controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
        return this.controller.applyControllerFunc.apply(this.controller, arguments);
    }

    /**
     * 面板是否显示
     * @return
     *
     */
    public isShow(): boolean {
        return this.node.parent && this.node.active && (!this.viewAni || !this.viewAni.isExiting);
    }

    /**
     * 添加到父级
     */
    public addToParent(): void {
        if (!this.node.parent) {
            let layer = LayerManager.getLayer(this.myParent);
            layer.addChild(this.node);
            App.ViewManager.checkIsNeedAddBg();

        }
    }

    /**
     * 从父级移除
     */
    public removeFromParent(): void {
        if (this.viewAni && this.viewAni.isExitAni()) {
            this.viewAni.onExit();
        } else {
            // if (LayerManager.UI_Popup == this.myParent) {
            //     let bg = this.node.parent.getChildByName("colorBg");
            //     if (bg) {
            //         if (this.bgType !== BG_TYPE.NONE) {
            //             bg.zIndex -= 2;
            //             this.checkBgIndex(bg);
            //         }
            //         if (bg.zIndex <= 0) {
            //             bg.active = false;
            //         }
            //         CC_DEBUG && Log.trace('remove zIndex:', bg.zIndex);
            //     }
            // }
            if (this.node.parent) {
                this.node.parent.removeChild(this.node, false);
            }
            this.node.active = false;
            App.ViewManager.checkIsNeedAddBg();
        }
        // App.DisplayUtils.removeFromParent(this);
        // if (this.bgImg) {
        //     App.DisplayUtils.removeFromParent(this.bgImg);
        // }
    }

    public checkBgIndex(bg: cc.Node) {
        let childList = bg.parent.children;
        let len = childList.length;
        for (let i = 0; i < len; i++) {
            let child = childList[i];
            if (child.getComponent(BaseView)) {
                if (child.zIndex === bg.zIndex && child.getComponent(BaseView).bgType !== BG_TYPE.NONE) {
                    bg.zIndex -= 2;
                }
            }
        }

    }

    /**
     *对面板进行显示初始化，用于子类继承
     */
    public initUI(): void {
        this._isInit = true;
        // if (this._closeBtn) {
        //     this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
        // }
    }

    protected onTouchClose() {
        App.ViewManager.closeView(this);
    }

    public onTouchBg() {
        // this.onTouchClose();
    }
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData(): void {

    }

    /**
     * 销毁
     */
    public destroyView(): void {
        this.controller = null;
        this._myParent = null;
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param: any[]): void {
        this.sendOpenMsg();
        if (this.viewAni) {
            this.viewAni.onEnter();
        }
    }
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param: any[]) {
        this.initComplete = null;
        
        this.sendCloseMsg();
    }

    public sendOpenMsg() {
        // Log.trace("viewID",this.viewId);
        // App.NotificationCenter.dispatch(NotificationConst.VIEW_IS_OPEN, this.viewId);
    }

    public sendCloseMsg() {
        App.NotificationCenter.dispatch(ViewManager.VIEW_IS_CLOSE, this.viewId);
    }


    public closeView(...param: any[]): void {
        App.ViewManager.closeView(this);
        this.sendCloseMsg();
    }

    protected initComplete: Function = null;
    /**
     /**
     * 加载面板所需资源
     */
    public loadResource(loadComplete: Function, initComplete: Function): void {
        this.initComplete = initComplete;
        loadComplete();
    }

    /**
     * 设置是否隐藏
     * @param value
     */
    public setVisible(value: boolean): void {
        this.node.active = value;
    }

}