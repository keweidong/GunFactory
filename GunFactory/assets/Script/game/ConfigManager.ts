import App from "../core/App";
import DataMsrBase, { CONFIG_FILE_DIR } from "../core/config/DataMsrBase";
import GuKeEventDataManager from './module/event/GuKeEventDataManager';
import FriendCircleDataManager from "./module/GameMain/config/FriendCircleDataManager";
import FriendEventDataManager from "./module/GameMain/config/FriendEventDataManager";
import { LuckCostDataManager, LuckDataManager } from "./module/Luck/LuckDataManager";
import { Platform } from './platform/Platform';

/**
 * 注册一个需要预加载的csv配置
 * @param classObj 数据处理类
 * @param key 获取这个数据的key值
 */
export function register<K extends keyof ConfigMap>(classObj: { new(): DataMsrBase<any> }, key: K) {
    ConfigManager.loadList[key] = classObj;
}
/**
 * 注册一个需要预加载的json配置
 * @param key 
 * @param filePath 文件路径
 */
export function registerJSONConf<K extends keyof ConfigMap>(key: K, filePath: string) {
    ConfigManager.jsonFileList[key] = filePath;
}
declare global {
    interface ConfigMap {
        "GameConf": GameConf;
    }
}
export class ConfigManager {
    public static loadList: {
        [key: string]: { new(): DataMsrBase<any> }
    } = Object.create(null);
    public static jsonFileList: {
        [key: string]: string
    } = Object.create(null);;
    public luckDataManager: LuckDataManager = null;
    public luckCostDataManager: LuckCostDataManager = null;

    public friendCircleDataManager: FriendCircleDataManager = null;
    public friendEventDataManager: FriendEventDataManager = null;

    public gukeEventDataManager: GuKeEventDataManager = null;
    /**游戏的一些配置数据 */
    public gameConf: GameConf;

    protected configs: {
        [key: string]: any
    } = {};
    /**
     * 通过key值获取配置配置数据管理器,
     * 想要通过这个方法获取的数据管理器,必须得是调用了register方法注册过的
     * @param key 
     */
    public getConfig<K extends keyof ConfigMap>(key: K): ConfigMap[K] {
        let config = this.configs[key];
        if (config) {
            return config;
        } else {
            Log.error(`配置文件<${key}>不存在,可能是加载失败,或者还未加载`);
        }
    }

    public async loadAllConfig(progress?: (curCnt: number, totalCnt: number) => void, target?: object) {
        let promises = [];
        Log.trace("注册一个需要预加载的json配置开始")
        registerJSONConf("GameConf", "game_conf");
        Log.trace("注册一个需要预加载的json配置结束")
        for (const key in ConfigManager.jsonFileList) {
            promises.push(this.loadJSONConf(key, ConfigManager.jsonFileList[key]));
        }
        for (const key in ConfigManager.loadList) {
            let conf = new ConfigManager.loadList[key]();
            this.configs[key] = conf;
            promises.push(conf.load());
        }

        this.luckDataManager = new LuckDataManager();
        promises.push(this.luckDataManager.load());

        this.luckCostDataManager = new LuckCostDataManager();
        promises.push(this.luckCostDataManager.load());

        this.friendCircleDataManager = new FriendCircleDataManager();
        promises.push(this.friendCircleDataManager.load());

        this.friendEventDataManager = new FriendEventDataManager();
        promises.push(this.friendEventDataManager.load());

        this.gukeEventDataManager = new GuKeEventDataManager();
        promises.push(this.gukeEventDataManager.load());

        if (progress) {
            let finishCnt: number = 0;
            let arrLen = promises.length;
            for (let i = 0; i < arrLen; i++) {
                promises[i].then(() => {
                    finishCnt++;
                    progress.call(target, finishCnt, promises.length);
                });
            }
        }
        await Promise.all(promises);
        this.gameConf = this.getConfig("GameConf");//兼容旧的写法,后续会把所有的gameConf引用的地方都改掉
        // return Promise.all(promises);
    }

    /**
    * 游戏的一些通用配置
    */
    async loadJSONConf(key: string, filePath: string) {
        //
        if (Platform.instance.isGetRemoteRes()) {
            this.configs[key] = await this.loadRemote(filePath);
        } else {
            let conf: cc.JsonAsset;
            conf = await App.ResManager.getResAsync(CONFIG_FILE_DIR + filePath);
            this.configs[key] = conf.json;
            /**原来的 start*/
            // let conf: cc.JsonAsset = await App.ResManager.getResAsync(CONFIG_FILE_DIR + "game_conf");
            // this.gameConf = conf.json;
            /**原来的 end*/
        }
    }

    /**
    * 游戏的一些通用配置
    */
    async getGameConf() {
        if (this.gameConf) {
            return;
        }
        //
        if (Platform.instance.isGetRemoteRes()) {
            this.gameConf = await this.loadRemote("game_conf");
        } else {
            let conf: cc.JsonAsset;
            Log.trace("分平台获取获取game_conf配置表信息")
            switch (cc.sys.platform) {
                case cc.sys.TOUTIAO_GAME:
                    Log.trace("头条配置表");
                    conf = await App.ResManager.getResAsync(CONFIG_FILE_DIR + "toutiao/game_conf");
                    break;
                case cc.sys.QQ_GAME:
                    Log.trace("QQ配置表");
                    conf = await App.ResManager.getResAsync(CONFIG_FILE_DIR + "qqgame/game_conf");
                    break;
                case cc.sys.WECHAT_GAME:
                    conf = await App.ResManager.getResAsync(CONFIG_FILE_DIR + "wxgame/game_conf");
                    break;
                default:
                    conf = await App.ResManager.getResAsync(CONFIG_FILE_DIR + "game_conf");
                    break;
            };
            this.gameConf = conf.json;
            /**原来的 start*/
            // let conf: cc.JsonAsset = await App.ResManager.getResAsync(CONFIG_FILE_DIR + "game_conf");
            // this.gameConf = conf.json;
            /**原来的 end*/
        }
    }
    public loadRemote(url: string): Promise<GameConf> {
        return new Promise((resolve: Function, reject: Function) => {
            url = `https://wxclient.gzqidong.cn/gameConf/GunFactory/${versionInfo.packVersion}/${url}.json?v=${Date.now()}`;
            if (CC_JSB) {
                App.Http.requestAsync(url, null, "GET").then((str: string) => {
                    resolve(JSON.parse(str));
                });
            } else {
                cc.loader.load({ url: url, type: 'text' }, function (err, jsonData) {
                    if (err) {
                        Log.error("loadRemote:", err)
                        reject(err);
                    } else {
                        resolve(JSON.parse(jsonData))
                    }
                });
            }
        })
    }
}


