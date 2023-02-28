import App from "../../../core/App";

/**
 * 当前广告状态
 */
export const enum AdState {
    /**
     * 在banner广告中,none状态表示没有展示广告
     */
    none,
    /**广告加载中 */
    loading,
    /**广告加载完毕 */
    success,
    /**广告加载失败 */
    fail,
    /**
     * banner广告当前在展示中
     */
    show,
    /**
     * 用户主动关闭了banner广告,后续不会继续展示广告
     */
    userClose,
    /**
     * 暂时隐藏banner广告
     */
    hide,
    /**
     * 视频激励广告正在播放中
     */
    show_video
}

export const enum AdEvent {
    SET_SHOW_AD_COMPLETE = "SET_SHOW_AD_COMPLETE",

    /**切换广告状态 */
    AD_SWITCH_STATUS = "AD_SWITCH_STATUS",
    /**展示广告完毕 */
    SHOW_AD_RESULT = "SHOW_AD_RESULT",
    /**获取广告表数据*/
    GET_AD_TAB_DATA = "GET_AD_TAB_DATA",
    /**获取广告已经观看次数的数据*/
    GET_AD_CNT_DATA = "GET_AD_CNT_DATA",
    /**广告是否看完*/
    GET_AD_IS_SEE_OUT = "GET_AD_IS_SEE_OUT",
}

export const enum ADConst {
    OPENAD,
    /**
	 * 注册广告控制对象
	 */
    REGISTER_ITEM,
	/**
	 * 取消注册广告控制对象
	 */
    UNREGISTER_ITEM,
}

/**
 * 广告管理器
 * todo 增加多个广告的管理功能,可以同时配置多个广告id
 */
export class ADManageBase {
    /**
     * 加载广告完毕
     */
    public static LOAD_AD_COMPLETE = "loadAdComplete";
    /**
     * 加载广告失败
     */
    public static LOAD_AD_FAIL = "loadAdFail";
    /**
     * 展示广告完毕
     */
    public static SHOW_AD_RESULT = "showAdResult";
    /**
     * 展示广告失败
     */
    public static SHOW_AD_FAIL = "showAdFail";
    /**
     * 是否自动重新拉取
     */
    public isAutoReload: boolean = true;
    protected curAdObj: IAdObject;
    protected _timeOut: number;
    protected restyCnt: number = 0;
    public get adState() {
        if (this.curAdObj) {
            return this.curAdObj.adState;
        } else {
            return AdState.none;
        }
    }
    public getAdObj() {
        return this.curAdObj;
    }
    /**
     * 加载超时时间
     */
    protected overtime: number = 30000;
    /**广告拉取连续失败后,重新尝试拉取的间隔时间 */
    protected tryReloadTime: number = 30000;
    public setAdObj(obj: IAdObject) {
        obj.onLoadAdComplete = this.onLoadAdComplete.bind(this);
        obj.onLoadAdFail = this.onLoadAdFail.bind(this);
        obj.onShowAdComplete = this.onShowAdComplete.bind(this);
        obj.init();
        this.curAdObj = obj;
        this.reloadAd();
    }
    public getAdState(): AdState {
        // if (this.curAdObj.adState === AdState.none || this.curAdObj.adState === AdState.fail) {
        //     this.reloadAd();
        // }
        return this.curAdObj.adState;
    }

    /**
     * 加载广告超时回调,防止腾讯加载不了广告后,没有回调onError方法,
     * 导致广告一直在加载状态中
     */
    private loadTimeOut() {
        Log.warn("拉取激励广告超时!!!");
        this._timeOut = null;
        this.onLoadAdFail(null);
        //     this.addADloadFailCallBack(null);
    }
    private stopTimeOUtTimer() {
        if (this._timeOut) {
            App.TimerManager.remove(this.loadTimeOut, this);
            this._timeOut = null;
        }
    }
    private startTimeOutTiemr() {
        this.stopTimeOUtTimer();
        // App.TimerManager.setTimeOut(this.overtime, this.loadTimeOut, this);
    }
    /**
     * 拉取广告成功回调
     */
    private onLoadAdComplete() {
        Log.warn("拉取激励广告成功!!!");
        this.stopTimeOUtTimer();
        this.restyCnt = 0;
        this.setADStatus(AdState.success);
    }
    public show() {
        if (this.curAdObj) {
            // App.SoundManager.pauseMusic();
            // App.SoundManager.pauseEffect();
            return this.curAdObj.show();
        }
    }
    /**
     * 拉取广告失败回调
     */
    private onLoadAdFail(error) {
        this.stopTimeOUtTimer();
        Log.warn("拉取激励广告失败!!!", JSON.stringify(error), this.restyCnt);
        if (this.restyCnt > 3) {
            this.restyCnt = 0;
            this.setADStatus(AdState.fail);
            this.startReloadTimer();
            return;
        }
        this.restyCnt++;
        this.startTimeOutTiemr();
        this.curAdObj.load();
    }
    /**
     * 如果连续三次拉取广告失败,等待一段时间后再进行拉取
     */
    public startReloadTimer() {
        if (this.isAutoReload) {
            App.TimerManager.setTimeOut(this.tryReloadTime, this.reloadAd, this);
        }
    }
    /**
     * 展示广告完毕
     */
    protected onShowAdComplete(data: { code: number }): void {
        Log.warn("展示广告完毕!!! ", data.code);
        // let data: {
        //     result: number;//0:给奖励,1:不给奖励
        // } = event.data;
        //0：成功，1：失败
        if (data.code == 0) {
            Log.trace("广告播放回调奖励")
            
        } else {
            CC_DEBUG && Log.trace("全屏广告:跳过");
        }
        App.NotificationCenter.dispatch(AdEvent.SHOW_AD_RESULT, data);
        
        // App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.CLOSEAD, 999);
        // App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.SHOW_BANNER_AD);
        // App.SoundManager.resumeEffect();
        // App.SoundManager.resumeMusic();
        this.reloadAd();
        // App.TimerManager.setTimeOut(500, this.reloadAd, this);
    }
    /**
     * 当广告状态发生改变的时候,全局广播
     * @param {AdState} ADStatus 当前广告状态
     */
    private setADStatus(ADStatus: AdState): void {
        this.curAdObj.adState = ADStatus;
        App.NotificationCenter.dispatch(AdEvent.AD_SWITCH_STATUS, ADStatus);
    }
    private reloadAd() {
        this.startTimeOutTiemr();
        this.restyCnt = 0;
        this.setADStatus(AdState.loading);
        this.curAdObj.load();
    }
}
