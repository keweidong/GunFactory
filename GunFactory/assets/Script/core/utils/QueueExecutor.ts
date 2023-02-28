/**
 * Created by yangsong on 15-8-19.
 * 队列处理
 */
export class QueueExecutor {
    protected _callBack: Function;
    protected _callBackTarget: any;
    protected _functions: [Function, Object, any[]][];
    protected _isRuning: boolean = false;
    /**
     * 构造函数
     */
    public constructor() {
        this._functions = [];
        Log.trace("????? QueueExecutor constructor:", this._functions);
    }

    /**
     * 设置全部执行完成处理函数
     * @param callBack 此队列处理完成执行函数
     * @param callBackTarget 此队列处理完成执行函数所属对象
     */
    public setCallBack(callBack: Function, callBackTarget: any): void {
        this._callBack = callBack;
        this._callBackTarget = callBackTarget;
    }

    /**
     * 注册需要队列处理的函数
     * @param $func 函数
     * @param $thisObj 函数所属对象
     */
    public regist($func: Function, $thisObj: any, $args?: any[]): void {
        this._functions.push([$func, $thisObj, $args]);
        this.next();
    }

    /**
     * 开始执行
     */
    public start(): void {
        this.next();
    }
    public finishFunc() {
        this._isRuning = false;
        this.next();
    }
    /**
     * 执行下一个
     */
    protected next(): void {
        if (this._isRuning) {
            return;
        }
        if (this._functions.length == 0) {
            if (this._callBack) {
                this._callBack.call(this._callBackTarget);
            }
            this._callBack = null;
            this._callBackTarget = null;
            // this._functions = [];
        }
        else {
            this._isRuning = true;
            var arr = this._functions.shift();
            arr[0].apply(arr[1], arr[2]);
        }
    }
}
