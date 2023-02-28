import BaseScene from "./BaseScene";

/**
 * 场景管理类
 */
export class SceneManager {
    private _currScene: BaseScene;
    public _sceneName: string = "";
    /**是不是第一个场景 */
    public isFirstScene: boolean = true;
    /**
     * 切换场景
     * @param key 场景唯一标识
     */
    public runScene(key: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void, ...param: any[]): void {
        Log.trace("runScene11111")
        this._sceneName = key;
        Log.trace("runScene22222")
        cc.director.preloadScene(key, onProgress, this.onScenePreload.bind(this));
        Log.trace("runScene33333")
    }
    /**
     * 
     * @param key 预加载场景
     * @param onProgress 加载进度回调
     * @param onLoaded 加载完成回调
     */
    public preLoadScene(key: string, onProgress?: (completedCount: number, totalCount: number, item: any) => void, onLoaded?: (error: Error, asset: cc.SceneAsset) => void) {
        Log.trace("preLoadScene11111")
        cc.director.preloadScene(key, onProgress, onLoaded);
        Log.trace("preLoadScene22222")
    }
    public onScenePreload() {
        Log.trace("onScenePreload11111")
        cc.director.loadScene(this._sceneName
            // , this.onSceneLoad.bind(this)
        );
        Log.trace("onScenePreload22222")
    }
    public onSceneLoad() {
        Log.trace("onSceneLoad11111")
        if (this._currScene) {
            Log.trace("进入onSceneLoad的this._currScene》》》》》11111")
            this._currScene.onExit();
            Log.trace("退出onSceneLoad的this._currScene》》》》》22222")
        }
        let curScene = cc.find("Canvas");
        Log.trace("onSceneLoad22222")
        this._currScene = curScene.getComponent(this._sceneName);
        Log.trace("onSceneLoad33333")
    }
    // public 

    /**
     * 获取当前Scene
     * @returns {BaseScene}
     */
    public getCurrScene(): BaseScene {
        return this._currScene;
    }
    public getSceneId() {
        return this._sceneName;
    }
}
