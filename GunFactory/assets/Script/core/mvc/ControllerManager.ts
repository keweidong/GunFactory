import BaseController from "./controller/BaseController";
import BaseModel from "./model/BaseModel";

/**
 * Created by yangsong on 2014/11/22.
 * Controller管理类
 */
export default class ControllerManager {
    private _modules: { [moduleName: number]: BaseController };

    /**
     * 构造函数
     */
    public constructor() {
        this._modules = {};
    }

    /**
     * 清空处理
     */
    public clear(): void {
        this._modules = {};
    }
    public async initAllModule() {
        let promises = [];
        for (let key in this._modules) {
            await this._modules[key].initController();
        }
        // let promises = [];
        // for (let key in this._modules) {
        //     promises.push(this._modules[key].initController());
        // }
        // return Promise.all(promises);
    }
    /**
     * 动态添加的Controller
     * @param key 唯一标识
     * @param manager Manager
     *
     */
    public register(key: number, control: { new(): BaseController }): void {
        // Log.trace("register control:",key);
        if (this.isExists(key))
            return;
        this._modules[key] = new control();
    }

    public clearAllModules(ignoreList: number[] = []) {
        for (const key in this._modules) {
            const moduleId = parseInt(key);
            if (ignoreList.indexOf(moduleId) == -1) {
                this._modules[key].destroy();
                delete this._modules[key];
            }
        }
    }

    /**
     * 动态移除Controller
     * @param key 唯一标识
     *
     */
    public unregister(key: number): void {
        // if (!this.isExists(key))
        //     return;
        delete this._modules[key];
    }

    /**
     * 是否已经存在Controller
     * @param key 唯一标识
     * @return Boolean
     *
     */
    public isExists(key: number): boolean {
        return this._modules[key] != null;
    }

    /**
     * 跨模块消息传递
     * @param controllerD Controller唯一标识
     * @param key 消息唯一标识
     *
     */
    public applyFunc(controllerD: number, key: number, ...param: any[]): any {
        var manager: BaseController = this._modules[controllerD];
        if (manager) {
            // var params = [];
            // for (var i = 1; i < arguments.length; i++) {
            //     params[i - 1] = arguments[i];
            // }
            // return manager.applyFunc.apply(manager, params);
            return manager.applyFunc(key, ...param);
        } else {
            Log.trace("模块" + controllerD + "不存在");
            return null;
        }
    }
    /**
     * 跨模块消息传递
     * @param controllerD Controller唯一标识
     * @param key 消息唯一标识
     *
     */
    public applyFunc2(controllerD: number, key: string, ...param: any[]): any {
        var manager: BaseController = this._modules[controllerD];
        let enumKey = manager.eventKeyMap[key];
        if (manager) {
            if (CC_DEBUG) {
                if (isNaN(enumKey)) {
                    Log.error(`消息id<${key}>不存在,请检查该消息是否存在,或者是否没有调用模块的addEventKeyMap去生成对应的消息映射`);
                }
            }
            return manager.applyFunc(enumKey, ...param);
        } else {
            Log.trace("模块" + controllerD + "不存在");
            return null;
        }
    }

    /**
     * 获取指定Controller的Model对象
     * @param controllerD Controller唯一标识
     * @returns {BaseModel}
     */
    public getControllerModel(controllerD: number): BaseModel {
        var manager: BaseController = this._modules[controllerD];
        if (manager) {
            return manager.getModel();
        }
        return null;
    }
}
