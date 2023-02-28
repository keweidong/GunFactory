import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import HotUpdate from "../../../core/res/HotUpdate";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { Platform } from "../../platform/Platform";
import { SceneTag } from "../../scene/SceneConst";
import LoadingView from "./LoadingView";

export const enum LoadingConst {
    SetProgress,
    AddProgressCompleteCB,
    ProgressComplete,
}
/**
 * 等待加载模块
 */
export default class LoadingController extends BaseController {
    private loadingView: LoadingView;

    protected loadProgress: {
        [key: string]: { cur: number, rate: number };
    }
    protected completeCb: Function = null;
    protected completeTaget: Object = null;
    /**
    * 热更新管理插件
    */
    protected hotUPdate: HotUpdate = null;
    public constructor() {
        super();
        App.DebugUtils.isOpen(true);
        this.loadProgress = {
            gameRes: { cur: 0, rate: 20 },
            gameZipRes: { cur: 0, rate: 20 },
            configAndLoadgame: { cur: 0, rate: 10 },
            preloadRes: { cur: 0, rate: 20 },
            syncData: { cur: 0, rate: 10 },
            allCnt: { cur: 0, rate: 0 }
        }
        let cnt = 0;
        for (const key in this.loadProgress) {
            cnt += this.loadProgress[key].rate;
        }
        this.loadProgress.allCnt.rate = cnt;
        //初始化UI
        App.ViewManager.register(ViewConst.Loading, {
            prefabName: "LoadingView",
            parent: LayerManager.Game_Main,
            /** 管理ui的控制器*/
            controller: this
        });
        App.ViewManager.register(ViewConst.TipView, {
            prefabName: "TipView",
            parent: LayerManager.UI_Popup,
            /** 管理ui的控制器*/
            controller: this
        });
        Log.trace("开始监听")
        //注册事件监听
        this.registerFunc(LoadingConst.SetProgress, this.setProgress, this);
        this.registerFunc(LoadingConst.AddProgressCompleteCB, this.setProgress, this);
        this.registerFunc(LoadingConst.ProgressComplete, this.onProgressComplete, this);
        this.onAddProgressCompleteCB(this.onGameStart, this);
        App.ViewManager.open(ViewConst.Loading);
    }
    protected onProgressComplete() {
        if (this.completeCb) {
            this.completeCb.call(this.completeTaget);
            this.completeTaget = this.completeCb = null;
        }

    }
    protected onGameStart() {
        // cc.log("onGameStart", cc.loader.getDependsRecursively("2dL3kvpAxJu6GJ7RdqJG5J"));
        App.SceneManager.runScene(SceneTag.GAME);
    }
    /**
     * 注册进度条完成回调
     * @param cb 回调函数
     * @param target 
     */
    protected onAddProgressCompleteCB(cb: Function, target: Object) {
        this.completeCb = cb;
        this.completeTaget = target;
    }
    private setProgress(rate: number, key: string): void {
        this.loadProgress[key].cur = rate;
        if (this.loadingView) {
            let target = 0;
            for (let key in this.loadProgress) {
                target += (this.loadProgress[key].cur * this.loadProgress[key].rate);
            }
            this.loadingView.onProgress(target / this.loadProgress.allCnt.rate);
        }
    }
    async onLoadView(view: IBaseView) {
        if (view.viewId === ViewConst.Loading) {

            if (window["loadtime"]) {
                Log.trace("打开加载页面时间", Date.now() - window["loadtime"]);
            }
            App.DebugUtils.start("进入游戏");
            this.loadingView = <LoadingView><any>view;
            let scene = App.SceneManager.getCurrScene();
            App.DebugUtils.start("检查热更新")
            this.hotUPdate = cc.director.getScene().getComponentInChildren(HotUpdate);
            this.loadingView.checkHot();
            await this.hotUPdate.checkUpdate((value: number, downloadedBytes: number, totalBytes: number) => {
                this.loadingView.onHotProgress(value, downloadedBytes, totalBytes);
            });
            App.DebugUtils.stop("检查热更新")
            App.GameDataMsr.tempData.isCheckUpdate = true;
            Log.trace("开始加载本地存档数据!");
            App.GameDataMsr.init();
            App.DebugUtils.start("场景资源&配置文件")
            let result = await Platform.instance.loadZipFile((completedCount: number, totalCount: number, item: any) => {//加载场景压缩包
                this.setProgress(completedCount / totalCount, "gameZipRes");
            });

            App.DebugUtils.start("场景资源")
            App.SceneManager.preLoadScene(SceneTag.GAME, (completedCount: number, totalCount: number, item: any) => {//加载场景
                this.setProgress(completedCount / totalCount, "gameRes");
                if (!result) {
                    this.setProgress(completedCount / totalCount, "gameZipRes");
                }
                if (completedCount === totalCount) {
                    App.DebugUtils.stop("场景资源")
                    App.DebugUtils.stop("场景资源&配置文件")
                }
            }, null);
            App.DebugUtils.start("配置文件")


            await App.ConfigManager.loadAllConfig((cutCnt: number, totalCount: number) => {
                this.setProgress(cutCnt / totalCount, "configAndLoadgame");
            }, this);


            App.DebugUtils.stop("场景资源&配置文件")
            App.DebugUtils.stop("配置文件")

            Log.trace("初始化平台类!");
            Platform.instance.init();

            Log.trace("开始跟服务器同步存档数据!");
            App.DebugUtils.start("同步数据")
            await Platform.instance.syncData().then((reason) => { this.setProgress(1, "syncData"); });
            App.DebugUtils.stop("同步数据")

            Log.trace("开始检查是否需要更新每日数据!");
            App.GameDataMsr.loadData();
            App.SaveManage.checkIsNeedUpdateData();
            App.DebugUtils.start("预加载资源");
            // App.ResManager.loadResArray([`prefab/view/game/street${curSceneId}/Reslist`], (completedCount: number, totalCount: number, item: any) => {//加载预加载资源
            //     this.setProgress(completedCount / totalCount, "preloadRes");
            // }, () => {
            //     App.DebugUtils.stop("预加载资源");
            // });
            this.setProgress(1, "preloadRes");
            App.SaveManage.load(App.SoundManager.saveKey);//加载声音配置存档
        }
    }

    onOpenView(view: IBaseView) {

    }
}
