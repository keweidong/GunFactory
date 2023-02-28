import App from "../../core/App";
import Toast from "../../core/utils/Toast";
import { AdType } from "../module/AD/ADController";
import { ADManageBase } from "../module/AD/ADManageBase";

export type LoginResult = { loginKey: string, code: number; };


export type LoginCacheInfo = {
    /**
     * 
     */
    unionid?: string;
    openid?: string;
    playerid?: number;
    /**
     * 当前登陆了哪个服务器
     */
    serverKey?: string;
    [key: string]: any;

    isRegist?: boolean;
}
export const LoginDataSaveKey = {
    loginCache: "cars",
    // serverInfo: "selectServer"
}
export type ShareParms = {
    /**
     * 分享链接
     */
    url?: string,
    /**
     * 分享的内容
     */
    title?: string,
    /**
     * 分享的描述
     */
    description?: string,
    /**
     * 参数列表
     */
    paramList?: { [key: string]: any };
    /**
     * 额外参数
     */
    extraParam?: any;
}
/**后台统计道具的类型 */
export enum save_prop_Const {

    /** 地图等级*/
    Map_Level = 10,

    /**菜式等级 */
    Caishi_Level = 11,

    /** 员工等级*/
    Staff_Level = 12,

    /**厨师等级 */
    Chef_Level = 13,

    /**特色菜点击 */
    FeaturedFood_click = 100,

    /** 特色菜功能完成次数*/
    FeaturedFood_over = 101,

    /**引导 */
    yindao_Level = 200,

}
/**
 * 平台基类
 */
export default abstract class PlatformBase {
    init() {
        this.initAd();
        // throw new Error("Method not implemented.");
    }
    /**
     * 本地缓存的登陆信息
     */
    protected loginInfo: LoginCacheInfo = {};
    protected _videoManage: ADManageBase = null;

    //强制拉起广告
    protected compelADVideoManage: ADManageBase = null;
    constructor() {
        App.SaveManage.add(this, LoginDataSaveKey.loginCache, false, false);
        App.SaveManage.load(LoginDataSaveKey.loginCache);
        // this.initAd();
    }
    public setEvent(eventName: string) {

    }
    /**
     * 展示插屏广告
     */
    public showInteractionAd() {

    }
    /**
     * 是否允许自动弹出插屏广告
     */
    public isAutoShowInteractionAd() {
        return false;
    }

    /**
     * 是否获取远程的配置文件
     */
    public isGetRemoteRes() {
        return false;
    }
    /**
     * 震动
     * @param time 多少毫秒
     */
    public vibrator(time: number = 1000) {
    }

    /**
     * 是否需要适配的刘海屏
     */
    public checkIsNotch() {
        let WindowSize = cc.view.getVisibleSize();
        cc.log("width=" + WindowSize.width + ",height=" + WindowSize.height);;
        WindowSize = cc.winSize;//推荐  原因  短
        cc.log("屏幕width=" + WindowSize.width + ",height=" + WindowSize.height);
        if (WindowSize.height / WindowSize.width >= 2) {
            return true;
        }
        return false;
    }

    /**
     * 退出游戏
     */
    public exitGame() {
        // 存档
        this.saveData();
    }
    protected msgCache: any[] = [];
    public cal(id: number, ...args) {
        // App.Http.requestAsync();

        // App.GameDataMsr.playerInfo.token
    }

    // public 

    /**
     * 初始化广告
     */
    public initAd() {
        this._videoManage = new ADManageBase();
        // this._videoManage.push(new ADManageBase());
        // this._videoManage.push(new ADManageBase());
        // this.compelADVideoManage = new ADManageBase();
    }
    public share(type: AdType, shareInfo: ShareParms) {

    }

    /**
     * 展示banner广告
     */
    public showBanner() {

    }
    /**
     * 隐藏banner广告
     */
    public hideBanner() {

    }

    /**
     * 展示信息流广告
     */
    public showExpressAd() {

    }
    /**
     * 隐藏信息流广告
     */
    public hideExpressAd() {

    }

    /**
     * 显示广告
     * @param adIndex 广告index 长广告短广告
     * @param adType 
     * @param extraParam 
     */
    public showAD(adIndex?: number, adType?: AdType, extraParam?: any) {
        if (this._videoManage) {
            this._videoManage.show();
        }

        // App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.SHOW_AD_FINISH);
    }

    //强制拉起广告
    public showCompelAD(adIndex?: number, adType?: AdType, extraParam?: any) {
    }

    //微信登录授权(检查微信是否登录)
    // public isWXAuthorization():boolean{
    //     return true;
    // }

    // public isWXLogin(){
    //     return new Promise((resolve: Function, reject: Function) => {
    //         resolve(true);
    //     });
    // }

    public async isWXLogin() {
        //Log.trace("平台基类----检查微信登录")
        return true;
    }
    /**开始录制视频 */

    public startGameRecorder(isRecorder?: Boolean) {

    }
    /**停止录制视频 */
    stopGameRecorder() {

    }
    /**分享视频 */
    shareRecorder(lupingType?: number) {

    }
    /**跳转到别的游戏 */
    jumpToOtherGame(appid: string, app_path?: string) {

    }
    /**
     *向管理后台发送广告埋点消息
    */
    //向后台发的消息列表
    protected message: any[] = [];
    public async callAD(path: string, optionalParams) {
        let gameDataMsr = App.GameDataMsr;
        let playerInfo = gameDataMsr.playerInfo;
        if (!playerInfo.token) {
            this.message.push({ path, optionalParams })
        } else if (playerInfo.token) {
            //let tempToken = { token: playerInfo.token }
            //optionalParams.push(tempToken);
            optionalParams['token'] = playerInfo.token;
            // optionalParams = JSON.stringify(optionalParams);
            let requestData = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + path, optionalParams);
        }
    }
    /** 统计任务步骤 */
    public async recordTask(taskId: number) {
        await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/save_node.php", {
            token: App.GameDataMsr.playerInfo.token,
            tid: taskId,
        });
    }
    /**
     * 向后台特色菜统计消息
     * @param type 类型
     * @param tid 道具id
     * @param num 道具数量(默认为0)
     * @param rank 道具等级
     * @param numinc 数量自增(默认为0不自增)
     */
    async recordNode(type: number, tid: number, num: number, rank?: number, numinc?: number) {
        await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/save_prop.php", {
            token: App.GameDataMsr.playerInfo.token,
            type: type,
            tid: tid,
            rank: rank,
            num: num,
            numinc: numinc
        })
    }

    /**向后台的数量统计 */
    public async recordInteractionAd(type: string) {
        await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/count/daily_count.php", {
            token: App.GameDataMsr.playerInfo.token,
            type: type,
            value: 1,
        });

    }
    public loadZipFile(onProgress?: (completedCount: number, totalCount: number, item: any) => void) {
        return Promise.resolve(false);
    }

    /**
     * 是否允许分享
     */
    public isCanShare() {
        return true;
    }
    public getPackVersion() {
        return "test";
    }

    //热云统计
    // public reYunRegister() {}
    // public reYunNewUser() {}

    public syncDataCallBack() {

    }
    /**
     * 查看是否有未发送的消息
    */
    async checkMessage() {
        let gameDataMsr = App.GameDataMsr;
        let playerInfo = gameDataMsr.playerInfo;
        if (!playerInfo.token) {
            return;
        }

        while (this.message.length > 0) {
            let messageTemp = this.message.pop();
            messageTemp.optionalParams['token'] = playerInfo.token;
            let requestData = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + messageTemp.path, messageTemp.optionalParams);
        }
    }

    /** 获取后台时间 */
    public async getServerTime() {
        let retryCnt = 3;
        do {
            try {
                let gameDataMsr = App.GameDataMsr;
                let playerInfo = gameDataMsr.playerInfo;
                let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/get_time.php", {
                    token: playerInfo.token
                });
                let temp: {
                    code: number,
                    msg: number,
                    data: { now_time: number }
                } = JSON.parse(result);
                App.DateUtils.setServerTime(temp.data.now_time * 1000);
                return true;
            } catch (error) {
                Log.error("获取后台时间失败", error);
            }
        } while (--retryCnt);
        return false;
    }

    /**
     * 保存存档到管理后台
     */
    public async saveData() {
        let gameDataMsr = App.GameDataMsr;
        let playerInfo = gameDataMsr.playerInfo;
        let data = App.SaveManage.getAllAutoSaveData();
        if (playerInfo.token) {
            try {
                let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/save_data.php", {
                    token: playerInfo.token,
                    file: data,
                    loginTime: playerInfo.timestamp
                });

                let temp: {
                    time: number,
                    code: number,
                    msg: string,
                } = JSON.parse(result);
                if (temp.code == 0) {
                    playerInfo.saveTime = temp.time;
                    // App.DateUtils.setServerTime(temp.time * 1000);
                }
            }
            catch (error) {
                Log.error("存储数据失败", error);
            }
        }
    }

    /**
     * 同步存档数据
     */
    public async syncData() {
        let gameDataMsr = App.GameDataMsr;
        let tryCnt = 3;//重试次数
        do {
            try {
                let playerInfo = gameDataMsr.playerInfo;
                //如果玩家数据没有账号信息,说明本地没有存档
                // if (!playerInfo.token) {
                Log.trace("获取登陆信息")
                //获取登陆信息
                let loginInfo = await this.login();
                playerInfo.account = this.loginInfo.unionid;
                Log.trace("向管理后台请求用户数据")
                //向管理后台请求存档
                let requestData = await App.Http.requestAsync(
                    App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/get_user_info.php",
                    { token: loginInfo.loginKey }
                );
                let userInfo: {
                    code: number,
                    photo: string,
                    free: string,
                    playerid: string,
                    time: number,
                    timestamp: number,
                    is_saved: string,
                    nick: string,
                    file: string,
                    msg: string,
                    account: string;
                } = JSON.parse(requestData);
                cc.log(requestData);
                //之前没有获取到这个值，防止热更新，之前玩家没有这个值，微信授权时候无法绑定
                if (!this.loginInfo.unionid && loginInfo.loginKey) {
                    this.loginInfo.unionid = userInfo.account;
                }
                if (userInfo.code !== 0) {
                    if (userInfo.code === -1001 || userInfo.code === -1003) {//玩家不存在,或者token失效
                        this.logout();
                    } else {
                        Log.trace("向管理后台获取数据失败！！！", userInfo.code, userInfo.msg);
                    }
                    continue;
                }
                //注册
                if (!playerInfo.token) {
                    Log.trace("注册回调")
                    this.syncDataCallBack();
                }
                // playerInfo.account
                playerInfo.id = userInfo.playerid;
                playerInfo.head = userInfo.photo;
                playerInfo.nickName = userInfo.nick;
                playerInfo.token = loginInfo.loginKey;
                playerInfo.timestamp = userInfo.timestamp;

                App.DateUtils.setServerTime(playerInfo.timestamp * 1000);
                // playerInfo.saveTime = 0;
                // 如果本地时间小于管理后台存档时间，用管理后台存档
                if (userInfo.file && userInfo.file != "" && playerInfo.saveTime < userInfo.time) {
                    App.SaveManage.syncByData(JSON.parse(userInfo.file))
                    playerInfo.saveTime = userInfo.time;
                }
                Log.trace("向管理后台请求用户数据成功!!!")
                this.checkMessage();
                break;
            } catch (error) {
                //如果没有成功跟管理后台同步数据,那么每隔一段时间跟管理后台尝试同步一次
                // throw "同步数据失败";
                Log.error("同步数据失败", error/*.toString()*/);
            }
            Log.trace("请求数据失败!!!!,", tryCnt)
        } while (--tryCnt);
        gameDataMsr.tempData.isSyncDataByServer = true;
        return !!tryCnt;
    }
    public getVersionStr(): string {
        return `v ${versionInfo.packVersion}_${versionInfo.version}`;
    }
    public createMemento(key: string): LoginCacheInfo {
        if (this.loginInfo) {
            return this.loginInfo;
        }
        return {};
    }

    /**
     * 获取广告类型个数
     */
    getAdTypeNum() {
        return 1;
    }

    /**
     * 获取广告状态
     * @param adIndex 广告index
     */
    getAdState(adIndex: number = 0): any {
        return this._videoManage.adState;
    }
    public setMemento(data: LoginCacheInfo, key: string) {
        if (data) {
            this.loginInfo = data;
        } else {
            this.loginInfo = {
            }
        }
    }
    public getAccountInfoSync(): any {
    }
    abstract login(): Promise<LoginResult>;
    public logout() {
        this.loginInfo = {}
        App.SaveManage.save(LoginDataSaveKey.loginCache);
        // egret.localStorage.removeItem(saveKey);
    }
    public getChannel() {
        return App.ConfigManager.gameConf.channel;
    }
    /**
     * 游客登录
     */
    async tourist(): Promise<LoginResult> {
        if (this.loginInfo.token) {//如果本地缓存有登陆信息,直接用本地的
            return Promise.resolve({ code: 0, loginKey: this.loginInfo.token });
        }
        //请求游客登录账号
        let resultStr = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/Game_reg/tourist.php", {
            chl: this.getChannel(),
        });
        Log.trace(">>>>>>>>>>>>>>>游客登录", resultStr);
        let result: {
            account: string;
            playerid: number;
            token: string;
            code: number;
            timestamp: number;
        } = JSON.parse(resultStr);
        this.loginInfo.unionid = result.account;
        this.loginInfo.playerid = result.playerid;
        this.loginInfo.token = result.token;
        App.SaveManage.save(LoginDataSaveKey.loginCache);//缓存登录信息
        if (result.code === 0) {
            return { code: result.code, loginKey: result.token }
        } else {
            return { code: result.code, loginKey: null };
        }

    }

    /** 向管理后台发送排行信息 */
    public async saveRankData(myRankData: MyRankData) {
        let gameDataMsr = App.GameDataMsr;
        let playerInfo = gameDataMsr.playerInfo;
        App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/data/save_user_other.php", {
            token: playerInfo.token,
            dedication: myRankData.dedication,
            strength: myRankData.strength,
        });
    }

    /** 获取全国排行榜数据 */
    public async getCountryData(): Promise<{
        ranking_list: CountryRankData[],
        pro_ranking: CountryProRankData,
        user: CountryUserRankData
    }> {
        let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/game/full_pro_ranking.php", {
            token: App.GameDataMsr.playerInfo.token
        });
        let data: {
            code: number,
            msg: string,
            data: {
                ranking_list: CountryRankData[],
                pro_ranking: any,
                user: CountryUserRankData
            }

        } = JSON.parse(result);

        if (data.code == 0) {
            return data.data;
        }
        else {
            Toast.launch(data.msg);
            return;
        }
    }

    /** 获取省排行榜数据 */
    public async getLocalData(): Promise<{
        ranking_list: LocalRankData[],
        province_name: string,
        user: LocalUserData,
    }> {
        let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/game/pro_ranking.php", {
            token: App.GameDataMsr.playerInfo.token
        });
        let data: {
            code: number,
            msg: string,
            data: {
                ranking_list: LocalRankData[],
                province_name: string,
                user: LocalUserData,
            }
        } = JSON.parse(result);
        if (data.code == 0) {
            return data.data;
        }
        else {
            Toast.launch(data.msg);
            return;
        }
    }

    /** 获取周榜数据 */
    public async getWeekData(): Promise<{
        ranking_list: LocalRankData[],
        province_name: string,
        user: LocalUserData,
    }> {
        let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/game/week_ranking.php", {
            token: App.GameDataMsr.playerInfo.token
        });
        if (!result) {
            return null;
        }
        let data: {
            code: number,
            msg: string,
            data: {
                ranking_list: LocalRankData[],
                province_name: string,
                user: LocalUserData,
            }
        } = JSON.parse(result);
        if (data.code == 0) {
            return data.data;
        }
        else {
            Toast.launch(data.msg);
            return;
        }
    }

    /**
     * 获取排行榜日报
     */
    public async getDailyRank(): Promise<{
        pro_ranking: CountryRankData,
        pro_ranking_change: number,
        player_ranking_change: number,
        user: LocalRankData,
        week_ranking_change: number,
        week_ranking: LocalRankData
    }> {
        let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/game/daily_ranking.php", {
            token: App.GameDataMsr.playerInfo.token
        })
        let data: {
            code: number,
            msg: string,
            data: {
                pro_ranking: CountryRankData,
                pro_ranking_change: number,
                player_ranking_change: number,
                user: LocalRankData,
                week_ranking_change: number,
                week_ranking: LocalRankData
            }
        } = JSON.parse(result);
        if (data.code == 0) {
            return data.data;
        }
        else {
            Toast.launch(data.msg);
        }
    }

    /** 获取公告数据 */
    public async getNoticeData(): Promise<GongGaoData[]> {
        let result = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/Client/billboard.php", {
            token: App.GameDataMsr.playerInfo.token
        });
        Log.trace("公告接收" + result);
        if (result) {
            let data: GongGaoData[] = JSON.parse(result);
            Log.trace("公告数据为" + data);
            return data;
        }
    }

    public Stransmit(isTouch?: boolean) {

    }

    /**
     * 是否显示调试面板
     */
    public isShowDebugUI() {
        return this.getVersionStr().indexOf("debug") > -1 || this.getVersionStr().indexOf("test") > -1 || this.getVersionStr().indexOf("gm") > -1;
    }
}