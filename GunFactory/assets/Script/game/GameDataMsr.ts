import App from "../core/App";
import WorldScene, { SaveData } from "./module/GameMain/object/scene/WorldScene";

export const enum GameDataSaveKey {
    /** 用户数据 */
    PLAYER_INFO = "PLAYER_INFO",
    /** 广告点存档数据 */
    AD_AND_SHARE_DATA = "AD_AND_SHARE_DATA",
    /** 赞助存档数据 */
    ASSIST_DATA = "ASSIST_DATA",
    /** buff存档 */
    BUFF_DATA = "BUFF_DATA",
    /** 背包存档数据 */
    BAG_DATA = "BAG_DATA",
    /** 游戏主玩法存档 */
    MAIN_DATA = "MAIN_DATA",
    /** 幸运抽奖数据 */
    LUCK_DATA = "LUCK_DATA",
    /** 新手引导数据 */
    GUIDE_DATA = "GUIDE_DATA",
    /** 排行榜数据 记录提升贡献值得点*/
    RANK_DATA = "RANK_DATA",
    /** 排行榜临时数据 排行榜缓存 */
    RANK_TEMP_DATA = "RANK_TEMP_DATA",
    //强制广告数据
    COMPEL_AD = "COMPEL_AD",
    /** 朋友圈 */
    FRIEND_CIRCLE = "FRIEND_CIRCLE",
    /**明星 */
    START_DATA = "START_DATA",
}
export class GameDataMsr implements IMemento {
    //-----------------------serializeData----------------------------
    /**用户资料 */
    playerInfo: PlayerInfo = null;
    /**广告点数据 */
    adAndShareData: AdAndShareData = null;

    gameMainData: SaveData = null;
    /**临时数据 */
    tempData: {
        /**是否已经同管理后台同步过存档数据 */
        isSyncDataByServer: boolean;
        /**是否已经检查热更新 */
        isCheckUpdate?: boolean;
    } = { isSyncDataByServer: false };
    protected world: WorldScene;
    public init() {
        App.SaveManage.add(App.SoundManager, App.SoundManager.saveKey, false, false);
        App.SaveManage.add(this, GameDataSaveKey.PLAYER_INFO, false, true);
        App.SaveManage.load(GameDataSaveKey.PLAYER_INFO);
        App.SaveManage.add(this, GameDataSaveKey.AD_AND_SHARE_DATA, false, true);
        App.SaveManage.add(this, GameDataSaveKey.MAIN_DATA, false, true);
        // App.SaveManage.add(this, GameDataSaveKey.ASSIST_DATA, false, true);
        // App.SaveManage.load(GameDataSaveKey.ASSIST_DATA);
        // App.SaveManage.saveAll();
    }
    /**
     * 加载存档数据
     */
    public loadData() {

        App.SaveManage.load(GameDataSaveKey.AD_AND_SHARE_DATA);
        App.SaveManage.load(GameDataSaveKey.MAIN_DATA);
    }
    public setWorld(world: WorldScene) {
        this.world = world;
    }
    /**
     * 保存广告跟分享数据
     */
    public saveAdAndShareData() {
        App.SaveManage.save(GameDataSaveKey.AD_AND_SHARE_DATA);
    }
    /**
     * 保存用户数据
     */
    public savePlayerInfo() {
        App.SaveManage.save(GameDataSaveKey.PLAYER_INFO)
    }
    /**
     * 保存赞助数据
     */
    public saveAssistData() {
        App.SaveManage.save(GameDataSaveKey.ASSIST_DATA);
    }
    updateDayData(key: string, day: number) {
        Log.trace("刷新每日数据")
        switch (key) {
            case GameDataSaveKey.AD_AND_SHARE_DATA:
                this.adAndShareData = {
                    adNum: 0,

                };
                break;
            case GameDataSaveKey.MAIN_DATA:
                if (this.gameMainData) {
                    this.gameMainData.isUpdateDayData = true;
                }
                break;
        }
    }
    /**
    * 创建存档
    * 
    * @param {GameDataSaveKey} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
    */
    createMemento(key: string) {
        switch (key) {
            case GameDataSaveKey.PLAYER_INFO:
                return this.playerInfo;
            case GameDataSaveKey.AD_AND_SHARE_DATA:
                return this.adAndShareData;
            case GameDataSaveKey.MAIN_DATA:
                if (this.world) {
                    return this.world.createMemento();
                } else {
                    return this.gameMainData;
                }
        }
        return null;
    }
    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     * @param {GameDataSaveKey} key 同步的key值(有可能一个对象会有多个不同的key值, 同步存档的时候根据key值同步相应的存档)
     */
    setMemento(data: any, key: string) {
        // Log.trace("key", key, GameDataSaveKey.MAIN_DATA);
        switch (key) {
            case GameDataSaveKey.PLAYER_INFO:
                if (data) {
                    this.playerInfo = data;
                } else {
                    this.playerInfo = {
                        gold: 0,
                        diamond: 0,/*Platform.instance.getPackVersion() == "test" ? 1000000 : */
                        nickName: "" + Math.floor(100000 + Math.random() * 100000),
                        head: "",
                        sex: 0,
                        id: "",
                        account: "",
                        token: "",
                        timestamp: 0,
                        saveTime: 0,
                        loginDaynumber: 1,
                        registerDaynumber: 1,
                        registerTime: Date.now(),
                        goldSum: 0,
                        cuisine: 0,
                    }
                }
                break;
            case GameDataSaveKey.AD_AND_SHARE_DATA:
                if (data) {
                    this.adAndShareData = data;
                } else {
                    this.adAndShareData = {
                        adNum: 0,
                    }
                }
                break;
            case GameDataSaveKey.MAIN_DATA:
                this.gameMainData = data;
                Log.trace("key", key, GameDataSaveKey.MAIN_DATA);
                // if (this.world) {
                //     this.world.setMemento(data);
                // }
                break;
            // case GameDataSaveKey.ASSIST_DATA:
            //     if (data) {
            //         this.assistData = data;
            //     }
            //     else {
            //         this.assistData = {};
            //     }
            //     break;
        }
    }
}