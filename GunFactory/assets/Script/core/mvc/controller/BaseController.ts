import App from "../../App";
import BaseModel from "../model/BaseModel";
import BaseProxy from "../proxy/BaseProxy";
import { IBaseView } from "../view/IBaseView";
/**
 * Created by yangsong on 2014/11/22.
 * Controller基类
 */
export default class BaseController {
    /**
     * 消息列表
     */
    private _messages: any;

    /**
     * 该模块使用的实体类
     */
    protected _model: BaseModel;
    protected proxy: BaseProxy;

    public eventKeyMap: {} = Object.create(null);

    /**
     * 构造函数
     */
    public constructor() {
        this._messages = {};
    }
    public initController(): Promise<any> {
        return Promise.resolve();
    }
    public addEventKeyMap(eventMap: { [key: string]: string | number }) {
        for (const key in eventMap) {
            let enumKey = parseInt(key);
            if (isNaN(enumKey)) {
                // CC_DEBUG && Log.trace("this.eventKeyMap:", key, eventMap[key]);
                this.eventKeyMap[key] = eventMap[key];
            }
        }
        // CC_DEBUG && Log.trace("this.eventKeyMap:", this.eventKeyMap);

    }
    /**
     * 注册一个面板
     * @param viewId 面板id 
     * @param prefabName 面板预制体
     * @param parent 父节点
     */
    // public registerView(viewId: number, prefabName: string, parent: cc.Node) {
    //     App.ViewManager.register(viewId, {
    //         prefabName: prefabName,
    //         parent: parent,
    //         controller: this
    //     });
    // }
    /**
     *  所有在这个模块注册的ui面板,
     *  在第一次初始化成功后,都会自动调用这个方法,
     *  并且将相应的面板传进去
     * @param view 初始化完成的页面
     */
    onLoadView(view: IBaseView) {

    }
    /**
     * 所有在这个模块注册的ui面板,
     * 打开成功后,都会自动调用这个方法,
     * 并且将相应的面板传进去
     * @param view 打开的页面
     */
    onOpenView(view: IBaseView) {

    }
    onCloseView(view: IBaseView) {

    }
    /**
     * 注册本模块消息
     * @param key 唯一标识
     * @param callbackFunc 侦听函数
     * @param callbackObj 侦听函数所属对象
     */
    public registerFunc(key: any, callbackFunc: Function, callbackObj: any): void {
        this._messages[key] = [callbackFunc, callbackObj];
    }
    public unregister(key: any) {
        delete this._messages[key];
    }
    // protected receiveSocketMsg(moduleId: ModuleInfo, orderId: Order, callbackFunc: Function, callbackObj: any) {
    //     App.MessageCenter.addListener(OrderNameMap[moduleId][orderId], callbackFunc, callbackObj);
    // }
    // protected removeSocketMsg(moduleId: ModuleInfo, orderId: Order, callbackFunc: Function, callbackObj: any) {
    //     App.MessageCenter.removeListener(OrderNameMap[moduleId][orderId], callbackFunc, callbackObj);
    // }
    // protected tempEvent: [Function, Object, number][] = [];
    // private tempEvent: Map<string, [Function, Object, number][]> = {};
    // protected registerAutoRemoveEvent(type: string, listener: Function, listenerObj: any, priority?: number) {
    //     let item = App.NotificationCenter.addListener(type, listener, listenerObj);
    //     if (item) {
    //         if (!this.tempEvent[type]) {
    //             this.tempEvent[type] = [];
    //         }
    //         this.tempEvent[type].push(item);
    //     }
    // }
    // protected removeAutoRemoveEvent(type: string, listener: Function, listenerObj: any) {
    //     var arr: Array<any> = this.tempEvent[type];
    //     if (arr == null) {
    //         return;
    //     }
    //     var i: number = 0;
    //     var len: number = arr.length;
    //     for (i; i < len; i++) {
    //         if (arr[i][0] == listener && arr[i][1] == listenerObj) {
    //             arr.splice(i, 1);
    //             App.NotificationCenter.removeListener(type, listener, listenerObj);
    //             break;
    //         }
    //     }
    //     if (arr.length == 0) {
    //         this.tempEvent[type] = null;
    //         delete this.tempEvent[type];
    //     }
    // }
    // protected clearAutoRemoveEvent() {
    //     for (let key in this.tempEvent) {
    //         for (let item of this.tempEvent[key]) {
    //             App.NotificationCenter.removeListener(key, item[0], item[1]);
    //         }
    //     }
    //     this.tempEvent = {};
    // }
    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyFunc(key: any, ...param: any[]): any {
        var listen: any = this._messages[key];
        if (listen) {
            return listen[0].apply(listen[1], param);
        } else {
            Log.trace("消息" + key + "不存在侦听");
            return null;
        }
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
        return App.ControllerManager.applyFunc.apply(App.ControllerManager, arguments);
    }

    /**
     * 设置该模块使用的Model对象
     * @param model
     */
    public setModel(model: BaseModel): void {
        this._model = model;
    }

    /**
     * 获取该模块的Model对象
     * @returns {BaseModel}
     */
    public getModel(): BaseModel {
        return this._model;
    }

    /**
     * 获取指定Controller的Model对象
     * @param controllerD Controller唯一标识
     * @returns {BaseModel}
     */
    public getControllerModel(controllerD: number): BaseModel {
        return App.ControllerManager.getControllerModel(controllerD);
    }
    public destroy() {
        App.MessageCenter.removeAll(this);
        App.NotificationCenter.removeAll(this);
        App.ViewManager.removeByController(this);
    }
}

// new ArrayList<number>();