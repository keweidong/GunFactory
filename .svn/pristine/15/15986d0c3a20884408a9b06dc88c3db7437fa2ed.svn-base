import { ViewConst } from "../../game/consts/ViewConst";
import { TIPSTATE } from "../../game/module/GameUI/GameUIConst";
import { NativeBridge } from "../../game/platform/native/NativeBridge";
import App from "../App";
import { GameText } from "../lang/GameText";

// var UpdatePanel = require('../UI/UpdatePanel');

// Custom manifest removed the following assets:
// 1. res/raw-assets/2a/2a40e5e7-4c4a-4350-9e5d-76757755cdd2.png
// 2. res/raw-assets/2d/2d86a854-63c4-4b90-8b88-a4328b8526c2.png
// So when custom manifest used, you should be able to find them in downloaded remote assets


// cc.loader.downloader.addHandlers({
//     "manifest": cc.loader.downloader.extMap.json
// })

cc.loader.addDownloadHandlers({
    "manifest": cc.loader.downloader["extMap"]["txt"]
});
cc.loader.addLoadHandlers({
    "manifest": cc.loader.loader["extMap"]["txt"]
});
const { ccclass, property } = cc._decorator;
// let newproperty: any = function (...args) {
//     console.log("...args:", ...args)
//     return property(...args);
// }
@ccclass
export default class HotUpdate extends cc.Component {
    // @property({
    //     type: cc.Asset
    // })
    // manifestUrl: cc.Asset = null;
    // @property(UpdatePanel)
    // protected panel: UpdatePanel = null;
    /**是否在检查热更新中 */
    // @property
    protected _updating = false;
    // @property
    protected _canRetry = false;
    // @property
    protected _storagePath = '';
    protected _updateListener: boolean = false;
    protected _am: jsb.AssetsManager = null;
    protected _failCount: number = 0;
    protected checkPromise: Promise<boolean> = null;
    protected checkResolve: (canUpdate: boolean) => void = null;
    protected isCheck: boolean = false;
    protected log(message?: any, ...optionalParams: any[]) {
        Log.trace("HotUpdateLog:", message, ...optionalParams);
    }
    protected versionCompareHandle(versionA: string, versionB: string) {
        this.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB, (parseInt(versionA) - parseInt(versionB) > 0));
        return parseInt(versionA) - parseInt(versionB);
        // var vA = versionA.split('.');
        // var vB = versionB.split('.');
        // for (var i = 0; i < vA.length; ++i) {
        //     var a = parseInt(vA[i]);
        //     var b = parseInt(vB[i] || 0);
        //     if (a === b) {
        //         continue;
        //     }
        //     else {
        //         return a - b;
        //     }
        // }
        // if (vB.length > vA.length) {
        //     return -1;
        // }
        // else {
        //     return 0;
        // }
    };
    /**
     * 检查热更新事件回调
     * @param event 
     */
    protected checkCb(event) {
        let result = false;
        this.log('Code: ' + event.getEventCode());
        this.isCheck = true;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.log("No local manifest file found, hot update skipped.");;
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.log("Fail to download manifest file, hot update skipped.");;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.log("Already up to date with the latest remote version.");;
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                result = true;
                this.log("New version found, please try to update.");

                // App.ViewManager.open(ViewConst.TipView, {
                //     curState: TIPSTATE.SURE_CANCEL,
                //     leftBtnText: "确定",
                //     leftFunc: () => {
                //         this.panel.node.active = true;
                //         this.hotUpdate();
                //     },
                //     rightFunc: () => {
                //         if (this.checkResolve) {
                //             this.checkResolve(result);
                //             this.checkResolve = this.checkPromise = null;
                //         }
                //     },
                //     rightThisObj: this,
                //     rightBtnText: "取消",
                //     leftThisObj: this,
                //     tipsStr: `检测到新的版本,是否更新!`,
                // } as COMMON_BOX);
                break;
            default:
                return;
        }
        this._am.setEventCallback(null);
        this._updating = false;
        if (result) {
            // this.panel.node.active = true;
            this.hotUpdate();
        } else if (this.checkResolve) {
            this.checkResolve(false);
            this.checkResolve = this.checkPromise = null;
        }
    }
    protected porgressFunc: (value: number, downloadedBytes: number, totalBytes: number) => void = null;
    /**
     * 热更新事件回调
     * @param event 事件对象
     */
    protected async updateCb(event: any) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST://找不到本地的热更新文件
                this.log("No local manifest file found, hot update skipped.");;
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION://热更新进度回调
                this.log(event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                this.log(event.getDownloadedBytes() + ' / ' + event.getTotalBytes());
                this.log(event.getPercent());
                this.porgressFunc && this.porgressFunc(event.getPercent(), event.getDownloadedBytes(), event.getTotalBytes());
                // this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                // this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                // this.panel.fileProgress.progress = event.getDownloadedFiles() / event.getTotalFiles();
                // this.panel.byteProgress.progress = event.getDownloadedBytes() / event.getTotalBytes();
                var msg = event.getMessage();
                if (msg) {
                    this.log('Updated file: ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST://热更新出错
                this.log("Fail to download manifest file, hot update skipped.");;
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE://不需要热更新
                this.log("Already up to date with the latest remote version.");;
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED://热更新完毕
                this.log("Update finished. "); + event.getMessage();
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED://热更新失败
                this.log("Update failed. "); + event.getMessage();
                // this.panel.retryBtn.active = true;
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                Log.error('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage())
                // this.panel.info.string = 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.log(event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updating = false;
            // manifest.
            if (this._canRetry) {
                this.retry();
            } else {
                this.checkResolve(false);
                this.checkResolve = this.checkPromise = null;
            }
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            let manifest = this._am.getLocalManifest();
            var newPaths = manifest.getSearchPaths();
            this.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.

            // currentVersion

            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.sys.localStorage.removeItem('isUPdateing');
            // cc.sys.localStorage.setItem('currentVersion', manifest.getVersion());
            cc.audioEngine.stopAll();
            cc.game.restart();
        } else {
            // if (this._updateCb) {
            //     this._updateCb(event.getEventCode());
            //     this._updateCb = null;
            // }
        }
    }
    loadCustomManifest() {
        // if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
        //     var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
        //     this._am.loadLocalManifest(manifest, this._storagePath);
        //     this.log("Using custom manifest");;
        // }
    }
    /**
     * 重新尝试热更新
     */
    retry() {
        if (!this._updating && this._canRetry) {
            this._canRetry = false;
            this.log("Retry failed Assets...");
            // this._am.setEventCallback(this.updateCb.bind(this));
            this._am.downloadFailedAssets();
        } else {

        }
    }
    protected timeOut(time: number) {
        return new Promise((resolve: (canUpdate: boolean) => void, reject: Function) => {
            App.TimerManager.setTimeOut(time, () => {
                if (this.isCheck) {
                } else {
                    resolve(false);
                }
            }, this);
        })
    }

    public showUpdatePackTip() {
        // let manifest: {
        //     packageUrl: string;
        //     remoteManifestUrl: string;
        //     remoteVersionUrl: string;
        //     version: string;
        //     packageVersion: string;
        //     assets: {};
        //     searchPaths: string[];
        // } = this.manifestUrl["_nativeAsset"];
        // if (manifest.packageVersion == versionInfo.packVersion) {
        //     return Promise.resolve();
        // }
        return new Promise((resolve: Function, reject: Function) => {
            App.ViewManager.open(ViewConst.TipView, {
                curState: TIPSTATE.SURE_CANCEL,
                leftBtnText: GameText.getText(lang.common_sure),// "确定",
                leftFunc: () => {
                    NativeBridge.openUrl("www.baidu.com");
                    resolve();
                },
                rightFunc: () => {
                    resolve();
                },
                rightThisObj: this,
                rightBtnText: GameText.getText(lang.common_cnacel),//"取消",
                leftThisObj: this,
                tipsStr: `检测到新的版本,是否下载更新!`,
            } as COMMON_BOX);
        });
    }

    /**
     * 检查是否能热更新
     */
    public checkUpdate(porgressFunc: (value: number, downloadedBytes: number, totalBytes: number) => void) {
        if (!cc.sys.isNative || cc.sys.platform == cc.sys.OPPO_GAME || cc.sys.platform == cc.sys.VIVO_GAME) {
            Log.trace("不要热更新")
            return Promise.resolve(false);
        }
        if (this.checkPromise) {
            return this.checkPromise;
        }
        this.porgressFunc = porgressFunc;
        this.checkPromise = Promise.race([
            new Promise((resolve: (canUpdate: boolean) => void) => {
                this.checkResolve = resolve;
                if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                    // var manifest = new jsb.Manifest(this.manifestUrl["_nativeAsset"], this._storagePath);//初始化本地版本配置文件
                    // this._am.loadLocalManifest(manifest, this._storagePath);
                    // this.log("fullPathForFilename:", jsb.fileUtils.fullPathForFilename("project.manifest"));
                    if (cc.sys.os === cc.sys.OS_ANDROID) {
                        this._am.loadLocalManifest("@assets/project.manifest");
                    } else {
                        this._am.loadLocalManifest(jsb.fileUtils.fullPathForFilename("project.manifest"));
                    }
                }
                if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
                    this.log("Failed to load local manifest ...");
                    resolve(false);
                    return;
                }
                this._am.setEventCallback(this.checkCb.bind(this));
                this._am.checkUpdate();
                this._updating = true;
            }),
            this.timeOut(10000)//设置超时时间
        ])
        return this.checkPromise;
    }
    /**
     * 开始热更新
     */
    hotUpdate() {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));
            cc.sys.localStorage.setItem('isUPdateing', "true");
            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    }

    show() {
        // if (this.updateUI.active === false) {
        //     this.updateUI.active = true;
        // }
    }

    // use this for initialization
    onLoad() {

        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        this.log("this._storagePath:", this._storagePath)
        // this.log("this._storagePath:", jsb.fileUtils.getStringFromFile(this._storagePath + "/project.manifest"));
        // this.log('Storage path for remote asset : ' + this._storagePath);

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.


        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle.bind(this));

        // var panel = this.panel;
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback((path, asset) => {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                // panel.info.string = "Verification passed : " + relativePath;
                return true;
            }
            else {
                this.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
                return true;
            }
        });

        this.log("Hot update is ready, please check or directly update.");;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            this.log("Max concurrent tasks count have been limited to 2");;
        }
    }

    onDestroy() {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }
}