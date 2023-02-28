import { ViewConst } from "../../game/consts/ViewConst";
import LayerManager from "../../game/LayerManager";
import App from "../App";
import BaseController from "./controller/BaseController";
import BaseView from "./view/BaseView";
import { BG_TYPE, IBaseView } from "./view/IBaseView";
export interface IBaseViewClass {
    new(): IBaseView;
    getUrl(): string[];
    prefabPath: string;
}
export interface ViewInfo {
    /** ui的预制体路径 */
    prefabName: string;
    /** ui的父节点*/
    parent: string;
    /** 管理ui的控制器*/
    controller: BaseController;
}
export default class ViewManager {
    /**
     * 面板开启事件
     */
    public static VIEW_IS_OPEN = "viewIsOpen";
    /**
     * 关闭一个面板
     * 
     */
    public static VIEW_IS_CLOSE = "viewIsClose";

    // public static 

    /**
     * 已注册的UI
     */
    private _views: Map<number, ViewInfo> = new Map();

    /**
     * 开启中UI
     */
    private _opens: Map<number, IBaseView> = new Map();
    /**
     * 已开启过的所有面板的缓存
     * todo 后续需要加入清理缓存的策略
     */
    private _viewCache: Map<number, IBaseView> = new Map();
    /**加载资源中的ui */
    private _viewLoadingCache: Map<number, boolean> = new Map();
    public uiRoot: cc.Node = null;

    /**
     * 构造函数
     */
    public constructor() {
        this.uiRoot = cc.find("Canvas").parent;
    }

    /**
     * 清空处理
     */
    public clear(): void {
        this.closeAll();
        this._views = new Map();
    }

    /**
     * 面板注册
     * @param key 面板唯一标识
     * @param view 面板
     */
    public register(key: number, view: ViewInfo): void {
        if (view == null) {
            return;
        }
        if (this._views.has(key)) {
            return;
        }
        this._views.set(key, view);
    }

    /**
     * 面板解除注册
     * @param key
     */
    public unregister(key: number): void {
        if (!this._views.has(key)) {
            return;
        }
        this._views.delete(key);
    }
    public removeView(key: number) {
        this._viewCache.delete(key);
        this._viewLoadingCache.delete(key);
        this._opens.delete(key);
        this._views.delete(key);
    }
    public removeByController(controller: BaseController) {
        this._views.forEach((value, key) => {
            if (value.controller == controller) {
                this.removeView(key);
            }
        })
        // for (const [viewId, info] of this._views) {
        //     // if (ignoreList && ignoreList.indexOf(viewId) > -1) {
        //     //     continue;
        //     // }
        //     // this.close(viewId);
        //     if(info)
        // }
    }

    /**
     * 销毁一个面板
     * @param key 唯一标识
     */
    public destroy(key: number): void {
        var oldView: IBaseView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroyView();
            this._viewCache.delete(key);
        }
    }

    public checkIsNeedAddBg() {
        if (!this.uiRoot.children) {
            this.uiRoot = cc.find("Canvas").parent;
        }

        for (let index = this.uiRoot.children.length - 1; index > 0; index--) {
            const layerNode = this.uiRoot.children[index];
            for (let i = layerNode.children.length - 1; i >= 0; i--) {
                let view: BaseView = layerNode.children[i].getComponent(BaseView);
                if (view && view.bgType === BG_TYPE.GRAY) {
                    if (LayerManager.layerBg.parent) {
                        LayerManager.layerBg.parent.removeChild(LayerManager.layerBg, false);
                    }
                    let index = view.node.getSiblingIndex();
                    layerNode.insertChild(LayerManager.layerBg, index);
                    LayerManager.layerBg.active = true;
                    LayerManager.curBgView = view;
                    if (view.node.getComponent(cc.BlockInputEvents)) {
                        view.node.removeComponent(cc.BlockInputEvents);
                    }
                    // LayerManager.layerBg.targetOff(LayerManager.layerBg);
                    // LayerManager.layerBg.on(cc.Node.EventType.TOUCH_END, view.onTouchClose, view);
                    CC_DEBUG && Log.trace('bg zIndex：', LayerManager.layerBg.zIndex);
                    return;
                }
            }
        }
        if (LayerManager.layerBg && LayerManager.layerBg.parent) {
            LayerManager.layerBg.parent.removeChild(LayerManager.layerBg, false);
            LayerManager.curBgView = null;
        }
    }

    /**
     * 获取当前最顶层的面板
     */
    public getTopView() {
        for (let index = this.uiRoot.children.length - 1; index > 0; index--) {
            const layerNode = this.uiRoot.children[index];
            for (let i = layerNode.children.length - 1; i >= 0; i--) {
                let view: BaseView = layerNode.children[i].getComponent(BaseView);
                if (view) {
                    return view;
                }
            }
        }
    }

    private addBg(view: IBaseView) {
    }
    /**
     * 开启面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    public async open(key: number, ...param: any[]) {
        Log.trace("开启面板:", ViewConst[key]);
        App.DebugUtils.start(ViewConst[key]);
        var view: IBaseView = this.getView(key);
        let viewClass = this._views.get(key);
        if (view == null) {
            if (viewClass) {
                if (this._viewLoadingCache.has(key)) {
                    Log.warn("面板正在加载预制体", key)
                    return;
                }
                try {
                    this._viewLoadingCache.set(key, true);
                    App.EasyLoading.showLoadingByTime(6);
                    let prefab: cc.Prefab = await App.ResManager.getResAsync("/prefab/view/" + viewClass.prefabName);//加载预制体资源
                    App.EasyLoading.hideLoading();
                    if (!this._viewLoadingCache.has(key)) {
                        return;
                    }
                    this._viewLoadingCache.delete(key);
                    let uiNode: cc.Node = cc.instantiate(prefab);
                    view = <IBaseView>uiNode.getComponent(viewClass.prefabName);
                    // console.log("view>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                    console.log(view)
                    view.viewId = key;
                    view.myParent = viewClass.parent;
                    view.controller = viewClass.controller;
                    view.node.active = false;
                    this._viewCache.set(key, view);
                    viewClass.controller[viewClass.prefabName[0].toLocaleLowerCase() + viewClass.prefabName.slice(1)] = view;
                    viewClass.controller.onLoadView(view);
                } catch (error) {
                    this._viewLoadingCache.delete(key);
                    Log.error(`加载资源面板出错,面板id:${key} ${ViewConst[key]}  `, error);
                    return;
                }
            } else {
                Log.trace("UI_" + key + "不存在");
                return;
            }
        }
        if (view.isShow()) {
            Log.warn("面板已经打开了:", key);
            return;
        }
        this._opens.set(key, view);
        if (view.isInit()) {
            view.setVisible(true);
            view.addToParent();
            view.open(...param);
            viewClass.controller.onOpenView(view);
            App.NotificationCenter.dispatch(ViewManager.VIEW_IS_OPEN, view.viewId);
            App.DebugUtils.stop(ViewConst[key]);
        }
        else {
            view.loadResource(() => {
                view.setVisible(true);
                this.addBg(view);
                view.addToParent();
            }, () => {
                view.initUI();
                view.initData();
                view.open(...param);
                viewClass.controller.onOpenView(view);
                App.NotificationCenter.dispatch(ViewManager.VIEW_IS_OPEN, view.viewId);
                App.DebugUtils.stop(ViewConst[key]);
            });
        }
    }
    /**
     * 检查是否隐藏其他面板
     */
    // private checkIsHideOtherView(view: IBaseView) {
    //     // let view = this._views[viewId];
    //     if (view.isFullScreen()) {//如果该面板是全屏面板,隐藏其他面板
    //         for (let _viewKey of this._opens) {
    //             let _view = this._views[_viewKey];
    //             if (_view.isFullScreen()) {
    //                 _view.setIsVisible(false);
    //             }
    //         }
    //     }
    // }
    /**
     * 关闭面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    public close(key: number, ...param: any[]): void {
        if (this._viewLoadingCache.has(key)) {
            this._viewLoadingCache.delete(key);
            return;
        }
        if (!this.isShow(key)) {
            return;
        }
        Log.trace("关闭面板:", ViewConst[key]);

        var view: IBaseView = this.getView(key);
        let viewClass = this._views.get(key);
        this._opens.delete(key);
        view.removeFromParent();
        view.close.apply(view, param);
        if (viewClass.controller.onCloseView) {
            viewClass.controller.onCloseView(view);
        }
    }

    /**
     * 关闭面板
     * @param view
     * @param param
     */
    public closeView(view: IBaseView, ...param: any[]): void {
        this.close(view.viewId, ...param);
    }

    /**
     * 根据唯一标识获取一个UI对象
     * @param key
     * @returns {any}
     */
    public getView(key: number): IBaseView {
        return this._opens.get(key) || this._viewCache.get(key);
    }
    /**
     * 关闭所有开启中的UI
     * 
     * @param {number[]} [ignoreList] 不关闭的列表
     * 
     * @author
     * @version
     */
    public closeAll(ignoreList?: number[]): void {
        for (const [viewId] of this._opens) {
            if (ignoreList && ignoreList.indexOf(viewId) > -1) {
                continue;
            }
            this.close(viewId);
        }
        for (const [viewId] of this._viewLoadingCache) {//打开中的面板也关闭
            if (ignoreList && ignoreList.indexOf(viewId) > -1) {
                continue;
            }
            this.close(viewId);
        }
    }




    /**
     * 当前ui打开数量
     * @returns {number}
     */
    public currOpenNum(): number {
        return this._opens.size;
    }

    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    public isShow(key: number): boolean {
        return this._opens.has(key);
    }
}
