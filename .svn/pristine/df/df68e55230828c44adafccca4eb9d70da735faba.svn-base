import App from "../../core/App";
import BaseScene from "../../core/BaseScene";
import { GameText } from "../../core/lang/GameText";
import { ControllerConst } from "../consts/ControllerConst";
import { ADController } from "../module/AD/ADController";
import { BuffAttr } from "../module/Buff/IBuff";
import LoadingController from "../module/loading/LoadingController";
import { Platform } from "../platform/Platform";
import { SceneTag } from "./SceneConst";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LoginScene extends BaseScene {

    /**预加载资源是否加载完毕 */
    // protected isPreResLoad: boolean;
    public sceneName: string = SceneTag.LOGIN;
    @property(cc.Prefab)
    protected loadingViewPrefab: cc.Prefab = null;
    /**
     * 热更新管理插件
     */
    // protected hotUPdate: HotUpdate = null;
    async onEnter() {
        super.onEnter();
        // if (CC_PREVIEW) {
        //     cc.macro.CLEANUP_IMAGE_CACHE = true;
        //     cc.dynamicAtlasManager.enabled = false;
        // }
        App.SaveManage.init();
        Log.trace("初始化平台类");
        ObjectPool.registerClass(BuffAttr, "BuffAttr");

        Platform.init();//初始化平台类
        await GameText.init();//初始化国际化文件
        // this.hotUPdate = this.getComponent(HotUpdate);
        this.initModule();
    }
    /**
    * 初始化所有模块
    */
    private initModule(): void {
        App.ControllerManager.register(ControllerConst.Loading, LoadingController);
        // App.ControllerManager.register(ControllerConst.GameUI, GameUIController);
        // App.ControllerManager.register(ControllerConst.Game, GameController);
        // App.ControllerManager.register(ControllerConst.Item, BagController);
        App.ControllerManager.register(ControllerConst.AD, ADController);

        // App.ControllerManager.register(ControllerConst.HappyTime, HappyController);
        // App.ControllerManager.register(ControllerConst.UserLevel, UserLevelController);
        // App.ControllerManager.register(ControllerConst.Task, TaskController);
        // App.ControllerManager.register(ControllerConst.Food, FoodController);
        // App.ControllerManager.register(ControllerConst.Shop, ShopController);
        // App.ControllerManager.register(ControllerConst.SystemOpen, SystemOpenController);
        // App.ControllerManager.register(ControllerConst.Luck, LuckController);
        // App.ControllerManager.register(ControllerConst.Rank, RankController);
        // App.ControllerManager.register(ControllerConst.Notice, NoticeController);
        // App.ControllerManager.register(ControllerConst.Activity, ActivityController);

    }
}