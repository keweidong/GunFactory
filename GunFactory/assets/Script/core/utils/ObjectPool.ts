

/**
 * Created by yangsong on 2014/11/22.
 * 对象池类
 */
interface ICache {
    /**
     * 用于识别对象的key
     */
    ObjectPoolKey: string;
    extraKey?: string;
}
class ObjectPool {

    private static _content: {
        [className: string]: ICache[]
    } = {};
    private _objs: Array<any>;
    private static _classes: { [className: string]: { new(): ICache | void } } = {};
    public static registerClass(classDefinition: { new(...args): ICache | any }, className: any): void {
        ObjectPool._classes[className] = classDefinition;
    }
    /**
     * 构造函数
     */
    public constructor() {
        this._objs = [];
    }
    /**
     * 获取某个类型的对象个数
     */
    public static getObjCnt(refKey) {
        return ObjectPool._content[refKey] && ObjectPool._content[refKey].length;
    }
    /**
     * 放回一个对象
     * @param obj
     */
    public pushObj(obj: any): void {
        this._objs.push(obj);
    }

    /**
     * 取出一个对象
     * @returns {*}
     */
    public popObj(): any {
        if (this._objs.length > 0) {
            return this._objs.pop();
        } else {
            return null;
        }
    }

    /**
     * 清除所有缓存对象
     */
    public clear(): void {
        while (this._objs.length > 0) {
            this._objs.pop();
        }
    }

    /**
     * 取出一个对象
     * @param classZ Class
     * @return Object
     *
     */
    public static pop(refKey: any, ...args: any[]): any {
        if (!ObjectPool._content[refKey]) {
            ObjectPool._content[refKey] = [];
        }

        var list: ICache[] = ObjectPool._content[refKey];
        if (list.length) {
            return list.pop();
        } else {
            var classZ: any = ObjectPool._classes[refKey];
            var argsLen: number = args.length;
            var obj: any;
            if (argsLen == 0) {
                obj = new classZ();
            } else if (argsLen == 1) {
                obj = new classZ(args[0]);
            } else if (argsLen == 2) {
                obj = new classZ(args[0], args[1]);
            } else if (argsLen == 3) {
                obj = new classZ(args[0], args[1], args[2]);
            } else if (argsLen == 4) {
                obj = new classZ(args[0], args[1], args[2], args[3]);
            } else if (argsLen == 5) {
                obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.ObjectPoolKey = refKey;
            // if (DEBUG) {
            //     if (!this._createClassCntList) {
            //         this._createClassCntList = {};
            //     }
            //     if (isNaN(this._createClassCntList[refKey])) {
            //         this._createClassCntList[refKey] = 1;
            //     } else {
            //         this._createClassCntList[refKey]++;
            //     }
            // }
            return obj;
        }
    }
    // private static _createClassCntList: Map<string, number>;

    /**
     * 取出一个对象
     * @param refKey Class
     * @param extraKey 标识值
     * @returns {any}
     */
    public static popWithExtraKey(refKey: any, extraKey: any, ...args: any[]): any {
        if (!ObjectPool._content[refKey]) {
            ObjectPool._content[refKey] = [];
        }
        var obj: any;
        var list: ICache[] = ObjectPool._content[refKey];
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].extraKey == extraKey) {
                    obj = list[i];
                    list.splice(i, 1);
                    break;
                }
            }
        }
        if (!obj) {
            var classZ: any = ObjectPool._classes[refKey];
            var argsLen: number = args.length;
            var obj: any;
            if (argsLen == 0) {
                obj = new classZ();
            } else if (argsLen == 1) {
                obj = new classZ(args[0]);
            } else if (argsLen == 2) {
                obj = new classZ(args[0], args[1]);
            } else if (argsLen == 3) {
                obj = new classZ(args[0], args[1], args[2]);
            } else if (argsLen == 4) {
                obj = new classZ(args[0], args[1], args[2], args[3]);
            } else if (argsLen == 5) {
                obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
            // if (DEBUG) {
            //     if (!this._createClassCntList) {
            //         this._createClassCntList = {};
            //     }
            //     if (isNaN(this._createClassCntList[refKey])) {
            //         this._createClassCntList[refKey] = 1;
            //     } else {
            //         this._createClassCntList[refKey]++;
            //     }
            // }
        }
        return obj;
    }
    public static print() {
        // if (this._createClassCntList) {
        //     Log.trace("/--------------------------start")
        //     for (let key in this._createClassCntList) {
        //         Log.trace(`创建了${this._createClassCntList[key]}个 ${key} 对象, 当前缓存池还有${ObjectPool._content[key].length}个对象`);
        //     }
        //     Log.trace("/--------------------------end")
        // }
    }

    /**
     * 放入一个对象
     * @param obj
     *
     */
    public static push(obj: any): boolean {
        if (obj == null) {
            return false;
        }
        var refKey: any = obj.ObjectPoolKey;
        //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        if (!ObjectPool._content[refKey]) {
            return false;
        }
        ObjectPool._content[refKey].push(obj);
        return true;
    }

    /**
     * 清除所有对象
     */
    public static clear(): void {
        ObjectPool._content = {};
    }

    /**
     * 清除某一类对象
     * @param classZ Class
     * @param clearFuncName 清除对象需要执行的函数
     */
    public static clearClass(refKey: string, clearFuncName: string = null): void {
        var list: Array<any> = ObjectPool._content[refKey];
        while (list && list.length) {
            var obj: any = list.pop();
            if (clearFuncName) {
                obj[clearFuncName]();
            }
            obj = null;
        }
        ObjectPool._content[refKey] = null;
        delete ObjectPool._content[refKey];
    }

    /**
     * 缓存中对象统一执行一个函数
     * @param classZ Class
     * @param dealFuncName 要执行的函数名称
     */
    public static dealFunc(refKey: string, dealFuncName: string): void {
        var list: Array<any> = ObjectPool._content[refKey];
        if (list == null) {
            return;
        }

        var i: number = 0;
        var len: number = list.length;
        for (i; i < len; i++) {
            list[i][dealFuncName]();
        }
    }
}
window["ObjectPool"] = ObjectPool;