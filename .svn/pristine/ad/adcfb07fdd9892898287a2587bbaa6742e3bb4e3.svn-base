import App from "../../core/App";
import Toast from "../../core/utils/Toast";
import { ControllerConst } from "../consts/ControllerConst";
import { ViewConst } from "../consts/ViewConst";
import { AdState } from "../module/AD/ADManageBase";
import { GameConst } from "../module/GameMain/GameConst";
import WorldScene from "../module/GameMain/object/scene/WorldScene";
import { GameUIConst, TIPSTATE } from "../module/GameUI/GameUIConst";
import { HappyConst } from "../module/Happy/HappyConst";
import HappyController from "../module/Happy/HappyController";
import { StartEventConst } from "../module/StartEvent/StartEventConst";
import StartShowView from "../module/StartEvent/StartShowView";
import { GameRecorderConst } from '../module/ToutiaoGameRecorder/GameRecorderConst';
import GameRecorderController from "../module/ToutiaoGameRecorder/GameRecorderController";
import { Platform } from "./Platform";
import PlatformBase, { LoginDataSaveKey, LoginResult } from "./PlatformBase";

// https://suvadmin.gzqidong.cn/Interface/
export default class ToutiaoGamePlatform extends PlatformBase {
    public appid: string = "tt5e6d28d0c154183202";//美食街

    protected isShare: boolean = false;
    protected isShareSuccess: boolean = false;

    /**全局平台唯一banner广告控制器 */
    protected bannerAD: tt.BannerAd = null;
    /**全局平台唯一插屏广告控制器 */
    protected interstitialAd: tt.InterstitialAd = null

    /**插屏广告的状态 */
    protected interState: AdState = AdState.fail;

    /**录屏文件的存放路径 */
    protected recorder_path: any = null;

    /**头条录屏控制器 */
    protected recorder;

    public world: WorldScene;

    constructor() {
        super();
        //this._launchOptions = wx.getLaunchOptionsSync();
        //wx.onShow(this.wxGameOnShow.bind(this));
        if (tt.getGameRecorderManager) {
            this.recorder = tt.getGameRecorderManager();
            this.recorder.onStart(res => {
                Log.trace('录屏开始', res);
                // this.isRecorder = false;
            });
            this.recorder.onStop(res => {
                // Toast.launch("录屏结束");
                //将录屏视频的路径传给给recorder_path,用作分享视频时的路径
                this.recorder_path = res;
                // Log.trace("录屏路径 " + res.videoPath)
                // Log.trace("录屏停止监听onStop ", res);
            });
            this.recorder.onError((errMsg) => {
                Log.warn("录屏出错" + errMsg);
            })
        }

        tt.showShareMenu({
            withShareTicket: false,
            success(res) {
                console.log("成功》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》", res)
            },
            fail(res) {
                console.log("失败》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》", res)
            },
            complete(res) {
                console.log("?????", res);
            }
        });
    }

    public loadZipFile(onProgress?: (completedCount: number, totalCount: number, item?: any) => void) {
        return new Promise<boolean>((resolve: Function, reject: Function) => {

            let utils = fsUtils;
            let savePath = wxDownloader.cacheDir + "/game.zip";
            utils.exists(savePath, (result: boolean) => {//判斷zip文件是否已經下載過了
                let zipFileName = "/game_" + versionInfo.version + ".zip";
                if (result) {//如果已经下载过了,不需要重新下载
                    resolve(false);
                } else {
                    utils.downloadFile(wxDownloader.REMOTE_SERVER_ROOT + "/res" + zipFileName, savePath, (error, path: string) => {
                        onProgress(1, 2);
                        if (error) {
                            cc.error("下载zip文件失败", error);
                            resolve(false);
                            return;
                        } else {
                            wx.getFileSystemManager().unzip({
                                zipFilePath: path,
                                targetPath: wxDownloader.cacheDir,
                                success: () => {
                                    console.log("解压成功");
                                    let fileList = utils.readJsonSync(wxDownloader.cacheDir + "/fileList.json");
                                    let cacheList = wxDownloader.getCachedFileList();
                                    for (const filePath of fileList) {
                                        cacheList[filePath] = 1;
                                    }
                                    onProgress(2, 2);
                                    cc.sys.localStorage.setItem("isZipFileDown", "1");
                                    resolve(true);
                                },
                                fail: () => {
                                    console.log("解压失败");
                                    resolve(false);
                                },
                                complete: () => {

                                },
                            })
                        }
                    })
                }

            })
        })
    }
    public getChannel() {
        return "toutiao";
    }
    init() {
        Log.trace("平台为---------", cc.sys.platform);
        let system = tt.getSystemInfoSync();
        Log.trace("获取到的设备信息为 ", system);
        // if (system.platform == "devtools") {
        //     return;
        // }
        this.initAd();
        // throw new Error("Method not implemented.");


    }
    /**
     * 
    * 初始化广告
    */
    public initAd() {
        super.initAd();
        // if (tt.getSystemInfoSync().platform == "devtools") {
        //     return;
        // }
        let obj = new ToutiaogameVideo("jmob1097qc1ngemfam"/**, "1l3b1p7oap4j8e37j5" */);
        this._videoManage.setAdObj(obj);
        // this.initBannerAD();
        this.initInterAD();
    }
    protected initBannerAD() {
        Log.trace("初始化banner广告组件相关功能1");
        let banner_AD: tt.BannerAd = tt.createBannerAd({
            adUnitId: "1l3b1p7oap4j8e37j5",
            style: {
                left: 128,
                top: 128,
                width: 128,
                height: 128,
            }
        })
        banner_AD.onLoad(this.bannerADLoadSuccessCallBack.bind(this));
        banner_AD.onError(this.bannerADloadFailCallBack.bind(this));
        this.bannerAD = banner_AD;
    }
    /**
        * 拉取bannerAD成功回调
        */
    private bannerADLoadSuccessCallBack() {
        Log.trace("拉取banner广告成功!");
    }
    /**
     * 拉取bannerAD失败回调
     */
    private bannerADloadFailCallBack(error) {
        this.bannerAD.onLoad(function () {
            Log.trace("拉取banner广告失败!!!", error);
        });
    }
    /**插屏广告 */
    protected initInterAD() {
        Log.trace("初始化插屏广告");
        let inter_AD: tt.InterstitialAd = tt.createInterstitialAd({
            adUnitId: "3ikabae003461ac5c6",
        })
        inter_AD.onLoad(this.insertADLoadSuccessCallBack.bind(this));
        inter_AD.onError(this.insertADloadFailCallBack.bind(this));
        inter_AD.onClose(this.insertADCloseCallBack.bind(this))
        // inter_AD.show(this.insertADloadrewaredCallBack.bind(this));
        this.interstitialAd = inter_AD;

        Log.trace("拉取插屏广告")
        this.interstitialAd.load();
        this.interState = AdState.loading;
    }

    /**拉取bannerAD成功回调 */
    insertADLoadSuccessCallBack() {
        Log.trace("拉取插屏广告成功");
        this.interState = AdState.success;
    }

    /**拉取bannerAD失败回调 */
    insertADloadFailCallBack() {
        Log.trace("拉取插屏广告失败");
        this.interState = AdState.fail;

        App.TimerManager.doTimer(30000, 1, () => { this.interstitialAd.load(); }, this)
    }
    /**
     * 关闭插屏广告
     */
    insertADCloseCallBack() {
        Log.trace("关闭插屏");
        this.interstitialAd.destroy();

        Log.trace("重新拉取", this.interstitialAd);
        this.interstitialAd.load();
        this.interState = AdState.loading;
    }

    showInteractionAd() {
        Log.trace("插屏show")
        if (this.interstitialAd) {
            Log.trace("插屏实例不为空 状态为:", this.interState);
            if (this.interState == AdState.success) {
                this.interstitialAd.show({
                    success: (res) => {
                        Log.trace("展示插屏广告成功", res)
                        Platform.instance.recordInteractionAd("interstitial_ad");
                    },
                    fail: (res) => {
                        Log.trace("展示插屏广告失败", res)
                    },
                    complete: (res) => {
                        Log.trace("展示插屏complete", res);
                    }
                });
            }

        }

    }

    /**
   * 是否允许自动弹出插屏广告
   */
    public isAutoShowInteractionAd() {
        return true;
    }
    public getPackVersion() {
        return versionInfo.packVersion;
    }
    public getVersionStr(): string {
        return `v ${versionInfo.packVersion}_${versionInfo.version}`;
    }
    protected loginToutiao(): Promise<tt.DefaultResult> {
        return new Promise((resolve, reject) => {
            tt.login({
                force: false,
                success: (res) => {
                    console.log("登入游戏成功");
                    resolve(res);
                },
                fail: (res) => {
                    console.log("登入游戏失败", res);
                    reject(res);
                },
                complete: () => {
                    console.log("登录游戏complete");
                },
            })
        })
    }
    protected checkRealNameAuthentication() {
        return new Promise((resolve: Function, reject: Function) => {
            tt.getUserInfo({
                withRealNameAuthenticationInfo: true,
                success: (res) => {
                    console.log("获取用户数据成功", res);
                    if (res.realNameAuthenticationStatus == "uncertified") {//未实名认证
                        // tt.onRealNameAuthenticationComplete(function (obj) {
                        //     console.log("实名认证完成回调 ", obj.state);
                        //     resolve();
                        // });
                        let realNameAuth = function () {
                            tt.authenticateRealName({//调起实名认证窗口
                                success: (res) => {
                                    console.log("调起实名认证窗口成功", res);
                                },
                                fail: (res) => {
                                    console.log("调起实名认证窗口失败", res);
                                    reject(res);
                                },
                                complete: () => {
                                },
                            })
                        }
                        tt.onTouchEnd(realNameAuth);
                    } else {
                        resolve(res);
                    }
                    // console.log("登入游戏成功");
                },
                fail: (res) => {
                    console.log("获取用户数据失败", res);
                    reject(res);

                },
                complete: () => {
                    console.log("获取用户数据complete");
                },
            });
        })

    }
    /*public getAccountInfoSync(){
        return wx.getAccountInfoSync();
    }*/
    /**
      * 获取场景值
      */
    /*public getSenceCode() {
        let startData = this._launchOptions;
        if (startData.scene != null || startData.scene != undefined) {
            return startData.scene;
        } else {
            return -1;
        }
    }*/

    public getLaunchOptions() {
        console.log("getLaunchOptions");
        let launchOption = tt.getLaunchOptionsSync;
        let chl: string;
        let serverid: string;
        let upplayerid: string;
        let sourceAppid: string = "";
        let shareid: number = 0;
        if (launchOption && launchOption["chl"]) {
            chl = launchOption["chl"] ? launchOption["chl"] : App.ConfigManager.gameConf.channel;
            serverid = launchOption["serverid"] ? launchOption["serverid"] : App.ConfigManager.gameConf.serverInfos.serverid;
            upplayerid = launchOption["playerid"] ? launchOption["playerid"] : "";
            shareid = launchOption["shareType"] ? launchOption["shareType"] : 0;
            return { chl, serverid, upplayerid, sourceAppid, shareid };//, share_img_id 
        }
        chl = App.ConfigManager.gameConf.channel;
        serverid = App.ConfigManager.gameConf.serverInfos.serverid;
        return { chl, serverid, upplayerid, sourceAppid, shareid };//, share_img_id 
    }
    async login(): Promise<LoginResult> {
        //直接游客登录
        //return this.tourist();


        if (this.loginInfo.token) {//如果本地缓存有登陆信息,直接用本地的
            Log.trace("本地有缓存登陆数据" + this.login);
            return Promise.resolve({ code: 0, loginKey: this.loginInfo.token });
        }
        Log.trace("本地没有缓存登录数据 " + " 开始调用登录");
        let { code, anonymousCode } = await this.loginToutiao();
        // await this.checkRealNameAuthentication();
        Log.trace("头条登录返回code", code, "头条登录返回anonymousCode ", anonymousCode);
        let nickName = "";
        let avatarUrl = "";
        // if (code) {
        //     let userInfo = await this.getUserInfo();
        //     Log.trace("getUserInfo获取到的数据为", userInfo);
        //     if (userInfo) {
        //         nickName = userInfo.userInfo.nickName;
        //         avatarUrl = userInfo.userInfo.avatarUrl;
        //     }
        // }
        let launchOption = this.getLaunchOptions();
        //let senceCode = this.getSenceCode();
        //请求管理后台解析并且返回用户数据
        let resultStr = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/toutiao.php", {
            appid: this.appid,
            code: code,
            anonymousCode: anonymousCode,
            nick: nickName,
            headimgurl: avatarUrl,
            upplayerid: launchOption.upplayerid,
            other_appid: launchOption.sourceAppid,
            chl: launchOption.chl,
            //scene: senceCode,
        });
        Log.trace(">>>>>>>>>>>>>>>", resultStr);
        let result: {
            unionid: string;
            playerid: number;
            token: string;
            code: number;
            timestamp: number;
        } = JSON.parse(resultStr);
        this.loginInfo.unionid = result.unionid;
        this.loginInfo.playerid = result.playerid;
        this.loginInfo.token = result.token;
        App.SaveManage.save(LoginDataSaveKey.loginCache);
        if (result.code === 0) {
            return { code: result.code, loginKey: result.token }
        } else {
            return { code: result.code, loginKey: null };
        }
    }

    /**检测是否是微信登录*/
    //这里重写方法,在平台类里应该写isTouTiaoLogin,这里为了方便
    public async isWXLogin() {
        return true;
        Log.trace("检测是否头条授权>>>>>>>>>>>>>>>>>>>>>")
        if (this.loginInfo.isRegist) {
            Log.trace("已经头条授权")
            return true;
        } else {
            let result = await this.toutiaoLogin();
            Log.trace("头条授权结果", result);
            if (result) {
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.SET_LEFTPOPUP_HEAD, App.GameDataMsr.playerInfo.nickName, App.GameDataMsr.playerInfo.head, App.GameDataMsr.playerInfo.id);
                this.loginInfo.isRegist = true;
                Log.trace("头条授权成功")
                return true;
            } else {
                Log.trace("头条授权失败")
                this.loginInfo.isRegist = false;
                return false;
            }
        }
    }

    public async toutiaoLogin() {
        let { code, anonymousCode } = await this.loginToutiao();
        Log.trace("头条登录返回code", code, "头条登录返回anonymousCode ", anonymousCode);
        let nickName = "";
        let avatarUrl = "";
        if (code) {
            let userInfo = await this.getUserInfo();
            Log.trace("getUserInfo获取到的数据为", userInfo);
            if (userInfo) {
                nickName = userInfo.userInfo.nickName;
                avatarUrl = userInfo.userInfo.avatarUrl;
            }
        }
        let launchOption = this.getLaunchOptions();
        //let senceCode = this.getSenceCode();
        //请求管理后台解析并且返回用户数据
        let resultStr = await App.Http.requestAsync(App.ConfigManager.gameConf.serverInfos.interface + "/Interface/wx_login/toutiao.php", {
            appid: this.appid,
            code: code,
            anonymousCode: anonymousCode,
            nick: nickName,
            headimgurl: avatarUrl,
            upplayerid: launchOption.upplayerid,
            other_appid: launchOption.sourceAppid,
            chl: launchOption.chl,
            //scene: senceCode,
        });
        Log.trace(">>>>>>>>>>>>>>>", resultStr);
        let result: {
            unionid: string;
            playerid: number;
            token: string;
            code: number;
            timestamp: number;
        } = JSON.parse(resultStr);
        Log.trace("头条登录接口返回, ", result);
        this.loginInfo.playerid = result.playerid;
        this.loginInfo.token = result.token;
        this.loginInfo.unionid = result.unionid;
        let playerInfo = App.GameDataMsr.playerInfo;
        if (result.code == 0) {
            playerInfo.head = avatarUrl;
            playerInfo.nickName = nickName;
            playerInfo.account = result.unionid;
            playerInfo.token = result.token;
            playerInfo.id = result.playerid.toString();
            //防止没有读到
            if (!playerInfo.head || !playerInfo.nickName) {
                Toast.launch("未获取到已登录用户信息，请重新尝试");
                return false;
            }
            Log.warn("头条登录成功----读取到头像和名字");
            this.loginInfo.isRegist = true;
            return true;
        } else {
            Log.warn("头条登录失败-----设置");
            Toast.launch("头条登录失败!请重新尝试！");
            return false;
        }
        return false;
    }

    /*public getUserInfo()
    {
        // 查看是否授权
        tt.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称")
                  tt.getUserInfo({
                       success: function(res) {
                       console.log(res.userInfo)
                       return res;
                    }
                  })
                }
              }
            })
        }
        bindGetUserInfo (e) {
        console.log(e.detail.userInfo)
    }*/
    protected getUserInfo(): Promise<tt.GetUserInfoResult> {
        return new Promise((resolve, reject) => {
            tt.authorize({
                scope: "scope.userInfo",
                success() {
                    // 用户同意授权用户信息
                    tt.getUserInfo({
                        withCredentials: false,
                        lang: "zh_CN",
                        success: (res) => {
                            Log.trace("getUserInfo成功信息", res);
                            resolve(res);
                        },
                        fail: (res) => {
                            Log.trace("getUserInfo失败!", res);
                            reject(res);
                            // resolve();
                        }
                    })

                },
                fail: (res) => {
                    Log.trace("authorize失败!", res);
                    Toast.launch("用户授权失败,授权成功可使用该功能");
                    reject(res);
                    // resolve();
                }
            });


        })
    }

    /**
     * 展示banner广告
     */
    public showBanner() {
        if (this.bannerAD) {
            Log.trace("展示banner");
            this.bannerAD.show();
        }
    }
    /**
     * 隐藏banner广告
     */
    public hideBanner() {
        if (this.bannerAD) {
            Log.trace("隐藏banner");
            this.bannerAD.hide();
        }
    }


    /** 开始录屏*/
    async startGameRecorder(isRecorder: Boolean) {
        this.recorder.start({
            duration: 60,
        })

    }


    /**录屏停止 */
    async stopGameRecorder() {
        this.recorder.stop();
        // if (this.startRecordertime <= 3) {
        //     Toast.launch("录制时间太短啦....");
        // } else {
        //     this.isRecorder = false;
        //     this.startRecordertime = 0;
        //     this.recorder.stop();

        //     //更换关闭图片
        //     var url = 'Texture/game/gameUI/luzhishipin_open';
        //     var _this = this;
        //     cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        //         Log.trace("开始更换图片2")
        //         _this.recorder_Sprite.spriteFrame = spriteFrame;
        //         Log.trace("开始更换字体2")
        //         //显示字体
        //         _this.recorder_Label.string = "录屏";
        //     });

        //     App.TimerManager.remove(this.recorderUpdate, this);
        // }
    }
    /**分享录屏按钮调用事件 */
    shareRecorder(lupingType?: number) {
        if (!this.recorder_path) {
            // Log.trace("录屏分享", this.recorder_path);
            Toast.launch("没有分享的视频");
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.Recorder_Share_SUCCESS);
            return;
        }
        Log.trace("录屏开始分享+++++++");
        tt.shareVideo({
            videoPath: this.recorder_path.videoPath,
            success: (res) => {
                // Log.trace("分享录屏成功 ", res);
                this.recorder_path = null;
                //传递获得钻石的消息
                // Log.trace("lupingType>>>>>>>>>>>>>>>>>>>>" + lupingType)
                this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);

                if (lupingType == 1) {
                    App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.rewardRecorder);
                } else if (lupingType == 2 && this.world.HappyShare > 0) {
                    this.world.HappyShare--;
                    if (HappyController.isFirHappy) {
                        HappyController.isFirHappy = false;
                    }
                    // Log.trace("进来2》》》》》》》》》》》》》》》》》》》》》")
                    App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.ON_HAPPY);
                } else if (lupingType == 3 && this.world.StartShare > 0) {
                    this.world.StartShare--;
                    if (StartShowView.isFirst) {
                        StartShowView.isFirst = false;
                    }
                    // Log.trace("进来3》》》》》》》》》》》》》》》》》》》》》")
                    App.ControllerManager.applyFunc(ControllerConst.Start, StartEventConst.RandCreateStar);
                }
                else {
                    App.ControllerManager.applyFunc(ControllerConst.GameRecorder, GameRecorderConst.rewardRecorder);
                }
                GameRecorderController.lupingType = 0;
            },
            fail: (res) => {
                // Log.trace(res);
                // Log.trace("分享录屏失败", "弹出提示弹窗");
                App.ViewManager.open(ViewConst.TipView, {
                    curState: TIPSTATE.SURE_CANCEL,
                    leftBtnText: "舍弃",
                    leftFunc: () => {
                        this.recorder_path = null;
                        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.Recorder_Share_SUCCESS);
                    },
                    leftThisObj: this,
                    rightBtnText: "保留",
                    rightFunc: () => {
                        
                    },
                    rightThisObj: this,
                    tipsStr: "分享失败,是否舍弃此段录屏？",
                    hasCloseBtn: false,
                } as COMMON_BOX)
            },
            complete: () => {
                // Log.trace("分享录屏ing  path：", this.recorder_path);
            }
        });
        //传递消息分享成功
        // App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.Recorder_Share_SUCCESS);
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.Guide_Recorder_End);
    }

    jumpToOtherGame(appid: string, app_path?: string) {
        if (app_path) {
            tt.navigateToMiniProgram({
                appId: appid,
                path: app_path,
                success: () => {

                }
            });
        } else {
            Log.trace("跳转游戏")
            tt.navigateToMiniProgram({
                appId: appid,
                success: (res) => {
                    Log.trace("跳转成功", res);
                },
                fail: (res) => {
                    Log.trace("跳转失败", res);
                }
            });
        }
    }

    public static canVibrate: boolean = false;

    public vibrator(time: number = 1000) {
        if (ToutiaoGamePlatform.canVibrate) {
            Log.trace("进入振动");
            tt.vibrateLong({
                success() {
                    ToutiaoGamePlatform.canVibrate = false;
                    App.TimerManager.doTimer(2000, 1, () => { Log.trace("............................"); ToutiaoGamePlatform.canVibrate = true }, this);
                },
                fail(res) { },
                complete() { }
            });
        }
    }

}









class ToutiaogameVideo implements IAdObject {
    /**广告加载完毕调用 */
    onLoadAdComplete: Function = null;
    /**广告加载失败调用 */
    onLoadAdFail: Function = null;
    /**广告展示完毕调用 */
    // onShowAdComplete: Function = null;
    onShowAdComplete?: (result: {
        /**播放广告结果，code为0表示播放成功 */
        code: number;
    }) => void;
    /**banner广告缓存*/
    private bannerAD: tt.BannerAd;
    /**
     * 广告id
     */
    protected id: string;
    /**
     * banner广告id
     */
    protected bannerAdId: string;
    /**
     * 微信视频广告缓存
     */
    private adVideo: tt.VideoAd;
    adState: AdState = AdState.none;
    constructor(id: string, /**oppoadid: string*/) {
        this.id = id;
        // this.bannerAdId = oppoadid;
    }
    /**
     * 拉取激励广告成功回调
     */
    private addADLoadSuccessCallBack() {
        this.onLoadAdComplete();
        // this.dispatchEventWith(ADManage.ADManageBase.LOAD_AD_COMPLETE);
    }
    /**
     * 拉取激励广告失败回调
     */
    private addADloadFailCallBack(error) {
        cc.log("addADloadFailCallBack error", error)
        this.onLoadAdFail(error);
        // this.dispatchEventWith(ADManage.ADManageBase.LOAD_AD_FAIL, false, error);
    }
    /**
     * 给微信的广告组件添加关闭回调
     */
    private addADCloesCallBack(res: { isEnded: boolean }): void {
        cc.director.resume();
        let data = {
            code: 1
        }
        //小于 2.1.0 的基础库版本，关闭按钮 是在激励式视频播放结束后才出现，所以触发 onClose 时已经播放结束，onClose 触发时可以认为用户已经看完了广告。
        //大于等于 2.1.0 的基础库版本，关闭按钮 将会常驻.回调函数会传入一个参数 res，res.isEnded 描述广告被关闭时的状态。
        if (res && res.isEnded || res === undefined) {
            data.code = 0;
        }
        this.onShowAdComplete(data);
    }
    public init() {



        this.initAd();
        // this.initBannerAD();
    }

    /**
     * 初始化广告组件相关功能
     * 此方法请勿重复调用!!!
     */
    public initAd() {
        Log.trace("adUnitId:", this.id)
        let adVideo = this.adVideo = tt.createRewardedVideoAd({ adUnitId: this.id })
        adVideo.onLoad(this.addADLoadSuccessCallBack.bind(this));
        adVideo.onError(this.addADloadFailCallBack.bind(this));
        adVideo.onClose(this.addADCloesCallBack.bind(this));
        this.adState = AdState.loading;
    }

    /**
     * 初始化bannerAD组件相关功能
     * 此方法请勿重复调用!!!
     */
    protected initBannerAD() {
        Log.trace("初始化插屏广告组件相关功能1" + this.bannerAdId);
        let insertAD = this.bannerAD = tt.createBannerAd({
            adUnitId: this.bannerAdId, style: {
                left: 128,
                top: 128,
                width: 128,
                height: 128,
            }
        })
        insertAD.onLoad(this.bannerADLoadSuccessCallBack.bind(this));
        insertAD.onError(this.bannerADloadFailCallBack.bind(this));
        //insertAD.onShow(this.insertADloadrewaredCallBack.bind(this));
    }

    /**
     * 拉取bannerAD成功回调
     */
    private bannerADLoadSuccessCallBack() {
        Log.trace("拉取插屏广告成功!!!");
    }
    /**
     * 拉取bannerAD失败回调
     */
    private bannerADloadFailCallBack(error) {
        this.bannerAD.onLoad(function () {
            Log.trace("拉取插屏广告失败!!!", error);
        });
    }

    /**
     * 显示bannerAD广告
     */
    public showBnanerAD() {
        if (this.bannerAD) {
            Log.trace("显示插屏广告");
            this.bannerAD.show();
        }
        else {

        }
    }

    /**
     * 拉取bannerAD广告发放奖励回调
     */
    private bannerADloadrewaredCallBack() {
        Log.trace("插屏广告发放奖励");
    }

    /**
     * 加载广告
     */
    public load() {
        Log.trace("加载广告")
        return this.adVideo.load();
    }
    /**
     * 播放广告
     */
    public show() {
        cc.director.pause();
        return this.adVideo.show();
    }

}