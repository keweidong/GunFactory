// import TimerManager from "./utils/TimeManager";
import { NotificationConst } from "../game/consts/NotificationConst";
import App from "./App";
import { TimerManager } from "./utils/TimeManager";

/**
 * Scene基类
 */
export default class BaseScene extends cc.Component {
    //当前所有Layer
    private _layers: cc.Node[];
    public sceneName: string = "";
    protected timerManager: TimerManager;
    // public resourceUtils: ResourceUtils;
    /**
     * 构造函数
     */
    // public constructor() {
    //     this._layers = [];
    //     this.setResManage();
    //     // this.initResGroup();
    // }
    // public setResManage() {
    //     // this.resourceUtils = App.ResManager;
    // }

    onLoad() {
        Log.trace("初始化场景", 1)
        App.init();
        Log.trace("初始化场景", 2)
        App.NotificationCenter.addListener(NotificationConst.ON_KEY_BACK, this.onKeyBack, this);
    }
    protected onKeyBack(event) {
        Log.trace("_keyDown:");
        // cc.director.end();


    }
    start() {
        Log.trace("初始化场景 start", 1)
        this.onEnter();
        Log.trace("初始化场景 start", 2)
    }
    /**
     * 延迟加载的资源
     */
    public getLazyLoadGroup(): string[] {
        return [];
    }
    /**
     * 预加载的资源
     */
    public static getPreloadGroup(): string[] {
        return [];
    }
    /**
     * 预加载组名
     */
    public preName: string;
    /**
     * 延迟载组名
     */
    public lazyName: string;

    public initResGroup() {
        // let name = egret.getQualifiedClassName(this);
        // //预加载组的名字,用"pre"+类名
        // let preName = this.preName = "pre" + name;
        // //延迟加载组的名字,用"lazy"+pre
        // let lazyName = this.lazyName = "lazy" + name;
        // this.resourceUtils.createGroup(preName, this.getPreloadGroup());
        // this.resourceUtils.createGroup(lazyName, this.getLazyLoadGroup());
    }
    update(dt) {
        this.timerManager.onEnterFrame(dt);
    }
    /**
     * 加载预加载资源
     */
    public loadLazyRes() {
        // App.ResourceUtils.loadGroup(this.lazyName, null, null, null, RES_PRIORITY.LAZY);
    }
    /**
     * 进入Scene调用
     */
    public onEnter(...params): void {
        if (App.SceneManager.isFirstScene) {
            App.SceneManager.isFirstScene = false;
            App.SceneManager._sceneName = this.sceneName;
        }
        App.SceneManager.onSceneLoad();
        this.timerManager = App.TimerManager;
    }
    /**
     * 退出Scene调用
     */
    public onExit(): void {
        App.ViewManager.closeAll();
    }
}