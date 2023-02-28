// import App from "../App";
/**
     * @private
     */
const enum Keys {
    eventTarget,
    eventsMap,
    captureEventsMap,
    notifyLevel
}
/**
 * Created by yangsong on 2014/11/23.
 * 服务端返回消息处理
 */
export default class MessageCenter {
    private dict: Map<string, [Function, Object, number][]>;
    private eVec: Array<MessageVo>;
    private lastRunTime: number;
    private type: number;

    /**
     * 构造函数
     * @param type 0:使用分帧处理 1:及时执行
     */
    public constructor(type: number) {
        this.type = type;
        ObjectPool.registerClass(MessageVo, "MessageVo");
        this.dict = new Map();
        this.dict[Keys.notifyLevel] = 0;
        this.eVec = new Array<MessageVo>();
        this.lastRunTime = 0;
        if (this.type == 0) {
            // App.TimerManager.doFrame(1, 0, this.run, this);
        }
    }

    /**
     * 清空处理
     */
    public clear() {
        this.dict = new Map();
        this.eVec.splice(0);
    }

    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     * @param priority: 事件的优先级,默认为0
     *
     */
    public addListener(type: string, listener: Function, listenerObj: any, priority?: number) {
        priority = +priority | 0;
        let insertIndex = -1;
        var arr = this.dict[type];
        if (arr == null) {
            arr = [];
            this.dict[type] = arr;
        }
        else {
            if (this.dict[Keys.notifyLevel] !== 0) {
                this.dict[type] = arr = arr.concat();
            }
        }
        //检测是否已经存在
        var i: number = 0;
        var len: number = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                return;
            }
            if (insertIndex == -1 && arr[i][2] < priority) {
                insertIndex = i;
            }
        }
        let item: [Function, Object, number] = [listener, listenerObj, priority];
        if (insertIndex !== -1) {
            arr.splice(insertIndex, 0, item);
        }
        else {
            arr.push(item);
        }
        return item;
    }

    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    public removeListener(type: string, listener: Function, listenerObj: any): void {
        var arr: Array<any> = this.dict[type];
        if (arr == null) {
            return;
        }
        if (this.dict[Keys.notifyLevel] !== 0) {
            this.dict[type] = arr = arr.concat();
        }
        var i: number = 0;
        var len: number = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }

        if (arr.length == 0) {
            this.dict[type] = null;
            delete this.dict[type];
        }
    }

    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    public removeAll(listenerObj: any): void {
        var keys = Object.keys(this.dict);
        for (var i: number = 0, len = keys.length; i < len; i++) {
            var type = keys[i];
            var arr: Array<any> = this.dict[type];
            if (this.dict[Keys.notifyLevel] !== 0) {
                this.dict[type] = arr = arr.concat();
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }

            if (arr.length == 0) {
                this.dict[type] = null;
                delete this.dict[type];
            }
        }
    }

    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     *
     */
    public dispatch(type: string, ...param: any[]): void {
        if (this.dict[type] == null) {
            return;
        }

        var vo: MessageVo = ObjectPool.pop("MessageVo");
        vo.type = type;
        vo.param = param;
        if (this.type == 0) {
            this.eVec.push(vo);
        }
        else if (this.type == 1) {
            this.dealMsg(vo);
        }
        else {
            Log.trace("MessageCenter未实现的类型");
        }
    }

    /**
     * 运行
     *
     */
    private run(): void {
        // var currTime: number = egret.getTimer();
        // var inSleep: boolean = currTime - this.lastRunTime > 100;
        // this.lastRunTime = currTime;
        // if (inSleep) {
        //     while (this.eVec.length > 0) {
        //         this.dealMsg(this.eVec.shift());
        //     }
        // } else {
        //     while (this.eVec.length > 0) {
        //         this.dealMsg(this.eVec.shift());
        //         if ((egret.getTimer() - currTime) > 5) {
        //             break;
        //         }
        //     }
        // }
    }

    /**
     * 处理一条消息
     * @param msgVo
     */
    private dealMsg(msgVo: MessageVo): void {
        var listeners: Array<any> = this.dict[msgVo.type];
        var i: number = 0;
        var len: number = listeners.length;
        var listener: Array<any> = null;
        // 做个标记，防止外部修改原始数组导致遍历错误。
        this.dict[Keys.notifyLevel]++;
        while (i < len) {
            listener = listeners[i];
            if (CC_DEBUG) {
                listener[0].apply(listener[1], msgVo.param);
            } else {
                try {
                    listener[0].apply(listener[1], msgVo.param);
                } catch (error) {
                    Log.error("消息处理出错:", error);
                }
            }

            // if (listeners.length != len) {
            //     len = listeners.length;
            //     i--;
            // }
            i++;
        }
        this.dict[Keys.notifyLevel]--;
        msgVo.dispose();
        ObjectPool.push(msgVo);
    }
}

class MessageVo {
    public type: string;
    public param: any[];
    ObjectPoolKey = null
    public constructor() {
    }

    public dispose(): void {
        this.type = null
        this.param = null;
    }
}
