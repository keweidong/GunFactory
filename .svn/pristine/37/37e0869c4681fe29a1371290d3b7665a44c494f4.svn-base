/**
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
type TimerCallBack = (tick?: number) => any;
export class TimerManager {
    private _handlers: TimerHandlerObj[]
    private _delHandlers: TimerHandlerObj[];
    private _currTime: number;
    private _currFrame: number;
    private _count: number;
    private _timeScale: number;

    private _pauseTime: number;
    protected isPause: boolean = false;

    private _lastTime: number = 0;
    /**
     * 构造函数
     */
    public constructor() {
        this._handlers = [];

        ObjectPool.registerClass(TimerHandlerObj, "TimerHandlerObj");
        this._delHandlers = [];
        // this._currTime = this._lastTime = Date.now();
        this._currTime = this._lastTime = cc.director.getTotalTime();
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;
        // egret.startTick(this.onEnterFrame, this)
        // App.NotificationCenter.addListener(NotificationConst.ON_HIDE, this.onGamePause, this);
        // App.NotificationCenter.addListener(NotificationConst.ON_SHOW, this.onGameResume, this);
        // egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    public reset() {
        this._handlers = [];
        this._delHandlers = [];
        this._timeScale = 1;
        this._count = 0;
    }
    /**
     * 设置时间参数
     * @param timeScale
     */
    public setTimeScale(timeScale: number): void {
        this._timeScale = timeScale;
    }
    public onGamePause() {
        // this.isPause = true;
        // Log.warn("onGamePause:", this._currFrame);
        // this._pauseTime = cc.director.getTotalTime();
    }
    public onGameResume() {
        // let passTime = cc.director.getTotalTime() - this._pauseTime;
        // Log.warn("/---onGameResume:", passTime, this._currFrame, cc.director.getTotalTime());
        // if (passTime > 0) {
        //     for (var i: number = 0; i < this._count; i++) {
        //         var handler: TimerHandlerObj = this._handlers[i];
        //         handler.dealTime += passTime;
        //         if (!handler.userFrame) {
        //             handler.exeTime += passTime;
        //         }
        //         Log.trace("onGameResume", handler.dealTime, handler.exeTime);
        //     }
        // }
        // Log.trace("onGameResume------/");
    }

    /**
     * 每帧执行函数
     * @param frameTime
     */
    public onEnterFrame(curTime: number) {
        // if (curTime < 0) {
        //     Log.error("出现负数");
        //     // App.ViewManager.open(ViewConst.TipView)
        //     App.ViewManager.open(ViewConst.TipView, {
        //         curState: TIPSTATE.SURE,
        //         leftBtnText: "确定",
        //         leftFunc: () => {
        //         },
        //         leftThisObj: this,
        //         tipsStr: `出现负数!`,
        //     } as COMMON_BOX);
        // }
        this._currFrame++;
        // if (cc.director.getTotalTime() - this._lastTime < 15) {
        //     Log.warn("/--------------多次执行")
        // }

        curTime = Math.min(curTime, 0.3);

        // if (curTime > 1) {
        //     Log.warn("时间间隔异常", curTime)
        // }
        // this._lastTime = cc.director.getTotalTime();
        this._currTime += curTime * 1000 * this._timeScale;
        // if (this.isPause) {
        //     // this.isPause = false;
        //     Log.warn("/--------------onEnterFrame:", this._currTime)
        // }
        while (this._delHandlers.length) {
            this.removeHandle(this._delHandlers.pop());
        }
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandlerObj = this._handlers[i];
            if (this._delHandlers.indexOf(handler) != -1) {
                continue;
            }
            var t: number = handler.userFrame ? this._currFrame : this._currTime;

            if (t >= handler.exeTime) {
                // if (this.isPause) {
                //     // this.isPause = false;
                //     Log.warn(this._currTime, handler.dealTime)
                // }
                if (CC_DEBUG) {
                    handler.method.call(handler.methodObj, this._currTime - handler.dealTime);
                } else {
                    try {
                        handler.method.call(handler.methodObj, this._currTime - handler.dealTime);
                    } catch (error) {
                        Log.error(error);
                    }
                }
                // App.DebugUtils.start(handler.method.toString());
                // App.DebugUtils.stop(handler.method.toString());
                handler.dealTime = this._currTime;
                handler.exeTime += handler.delay;
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    } else {
                        if (handler.complateMethod) {
                            if (CC_DEBUG) {

                                handler.complateMethod.apply(handler.complateMethodObj);
                            } else {
                                try {
                                    handler.complateMethod.apply(handler.complateMethodObj);
                                } catch (error) {
                                    Log.error(error);
                                }
                            }
                        }
                        if (this._delHandlers.indexOf(handler) == -1) {
                            this._delHandlers.push(handler);
                        }
                    }
                }
            }
        }
        // if (this.isPause) {
        //     this.isPause = false;
        //     Log.warn("onEnterFrame-----------/")
        // }
        return true;
    }
    private removeHandle(handler: TimerHandlerObj): void {
        var i = this._handlers.indexOf(handler);
        if (i == -1) {
            Log.warn("what????");
            return;
        }
        // App.ObjectPool.
        this._handlers.splice(i, 1);
        ObjectPool.push(handler);
        this._count--;
    }
    private create(useFrame: boolean, delay: number, repeatCount: number, method: TimerCallBack, methodObj: any, complateMethod: Function, complateMethodObj: any): void {
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) {
            return;
        }

        //先删除相同函数的计时
        this.remove(method, methodObj);

        //创建
        var handler: TimerHandlerObj = ObjectPool.pop("TimerHandlerObj");
        handler.userFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.complateMethod = complateMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
        this._count++;

    }

    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    public doTimer(delay: number, repeatCount: number, method: TimerCallBack, methodObj: any, complateMethod: Function = null, complateMethodObj: any = null): void {
        this.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }

    /**
     *
     * 定时执行
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    public doFrame(delay: number, repeatCount: number, method: TimerCallBack, methodObj: any, complateMethod: Function = null, complateMethodObj: any = null): void {
        this.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }
    /**
    * 在指定的延迟（以毫秒为单位）后运行指定的函数。
    * @param delay 执行间隔:毫秒
    * @param method 执行函数
    * @param methodObj 执行函数所属对象
    */
    public setTimeOut(delay: number, method: TimerCallBack, methodObj: any): void {
        this.doTimer(delay, 1, method, methodObj);
    }

    /**
     * 在指定的帧后运行指定的函数。
     * @param delay 执行间隔:帧频
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     */
    public setFrameOut(delay: number, method: TimerCallBack, methodObj: any): void {
        this.doFrame(delay, 1, method, methodObj);
    }
    /**
     * 定时器执行数量
     * @return
     *
     */
    public get count(): number {
        return this._count;
    }

    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    public remove(method: Function, methodObj: any): void {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandlerObj = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                this._delHandlers.push(handler);
                break;
            }
        }
    }
    /**
     * 延迟到这一帧所有定时函数都执行完再清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    // public removeLazy(method: Function, methodObj: any): void {
    //     for (var i: number = 0; i < this._count; i++) {
    //         var handler: TimerHandlerObj = this._handlers[i];
    //         if (handler.method == method && handler.methodObj == methodObj) {
    //             this._delHandlers.push(handler);
    //             break;
    //         }
    //     }
    // }
    /**
     * 等待一会
     */
    public sleep(delay: number = 1, repeatCount: number = 1) {
        return new Promise((resole) => {
            // App.TimerManager.doFrame(delay, repeatCount, resole, null);
        })
    }

    /**
    * 清理
    * @param methodObj 要移除的函数对应的对象
    */
    public removeAll(methodObj: any): void {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandlerObj = this._handlers[i];
            if (handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                this._delHandlers.push(handler);
            }
        }
    }

    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    public isExists(method: Function, methodObj: any): boolean {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandlerObj = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                return true;
            }
        }
        return false;
    }
}
// window["TimerManager"] = TimerManager;
export class TimerHandlerObj {
    ObjectPoolKey = null;
    /**执行间隔*/
    public delay: number = 0;
    /**是否重复执行*/
    public repeat: boolean;
    /**重复执行次数*/
    public repeatCount: number = 0;
    /**是否用帧率*/
    public userFrame: boolean;
    /**执行时间*/
    public exeTime: number = 0;
    /**处理函数*/
    public method: TimerCallBack;
    /**处理函数所属对象*/
    public methodObj: any;
    /**完成处理函数*/
    public complateMethod: Function;
    /**完成处理函数所属对象*/
    public complateMethodObj: any;
    /**上次的执行时间*/
    public dealTime: number = 0;

    /**清理*/
    public clear(): void {
        this.method = null;
        this.methodObj = null;
        this.complateMethod = null;
        this.complateMethodObj = null;
    }
}