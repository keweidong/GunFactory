import BaseController from "../controller/BaseController";
import App from "../../App";

/**
 * Proxy基类
 */
export default class BaseProxy {
    private _controller: BaseController;

    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        this._controller = $controller;
    }
    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key: any, ...param: any[]): any {
        return this._controller.applyFunc.apply(this._controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
        return this._controller.applyControllerFunc.apply(this._controller, arguments);
    }

    /**
     * 注册从服务器返回消息的监听
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public receiveServerMsg(key: any, callbackFunc: Function, callbackObj: any): void {
        App.MessageCenter.addListener(key, callbackFunc, callbackObj);
    }


    /**
     * 移除服务端返回消息的监听
     * @param key 消息标识
     * @param callbackFunc 处理函数
     * @param callbackObj 处理函数所属对象
     */
    public removeServerMsg(key: any, callbackFunc: Function, callbackObj: any): void {
        App.MessageCenter.removeListener(key, callbackFunc, callbackObj);
    }

}
