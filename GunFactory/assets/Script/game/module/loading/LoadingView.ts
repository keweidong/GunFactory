import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import BaseView from "../../../core/mvc/view/BaseView";
import { Platform } from "../../platform/Platform";
import { LoadingConst } from "./LoadingController";



const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingView extends BaseView {

    @property(cc.ProgressBar)
    private progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    private progressLabel: cc.Label = null;
    /**进度条现在可以走多少 */
    protected targetPregress: number = 0;
    /**当前进度条走了多少 */
    protected curPregress: number = 0;
    @property(cc.Label)
    protected versionLab: cc.Label = null;
    protected _tempData: {  /**是否已经同管理后台同步过存档数据 */
        isSyncDataByServer: boolean;
        /**是否已经检查热更新 */
        isCheckUpdate?: boolean;
    };

    public isDownHotFile: boolean = false;

    //logo节点
    @property(cc.Node)
    // private logoNode: cc.Node = null;

    @property(cc.Node)
    public logoIcon: cc.Node = null;
    // //登录按钮节点
    // @property(cc.Node)
    // private DengLuNode: cc.Node = null;
    // //进度条节点
    // @property(cc.Node)
    // private ProgressBarNode: cc.Node = null;
    // //是否登录
    // protected isLogin:boolean = false;

    initUI() {
        super.initUI();
        this.curPregress = 0;
        this.targetPregress = 0.1;
        this.progressBar.progress = 0;
        // if (!this._tempData.isCheckUpdate) {
        // this.progressLabel.string = '0%';
        // }
        this.versionLab.string = Platform.instance.getVersionStr();
    }
    public initData() {
        this._tempData = App.GameDataMsr.tempData;
    }
    public onProgress(target: number) {
        // this.targetPregress = completedCount / totalCount * 0.9;
        this.targetPregress = target;
    }
    public onHotProgress(curPregress: number, downloadedBytes: number, totalBytes: number) {
        if (isNaN(curPregress)) {
            curPregress = 0;
        }
        this.progressBar.progress = curPregress;
        this.progressLabel.string = GameText.getText(lang.common_update_file) + ` ${Math.floor(curPregress * 100)}% (${downloadedBytes}/${totalBytes})`;
    }
    public checkHot() {
        this.progressLabel.string = GameText.getText(lang.common_updating);//`检查更新中...`;
    }
    public open() {
        this.enabled = true;
        // this.logoNode.getComponentInChildren(cc.Animation).play("logoani");
        // this.logoNode.active = false;
        this.logoIcon.active = true;
        if (this._tempData.isCheckUpdate) {
            this.progressLabel.string = '0%';
        }
    }

    // //点击qq按钮
    // clickQQBtn(){
    //     this.ProgressBarNode.active = true;
    //     this.DengLuNode.active = false;
    //     this.progressLabel.node.active = true;
    //     this.isLogin = true;
    // }
    // //点击微信按钮
    // clickWX_Btn(){
    //     this.ProgressBarNode.active = true;
    //     this.DengLuNode.active = false;
    //     this.progressLabel.node.active = true;
    //     this.isLogin = true;        
    // }

    update() {
        if (this._tempData == null) {
            // Log.trace("成功进this._tempData")
            this.initData();
            // Log.trace("退出this._tempData")
        }
        if (this._tempData.isCheckUpdate) {
            let targetPregress = this.targetPregress;
            if (this.curPregress < targetPregress) {
                // Log.trace("成功进this.curPregress < targetPregress")
                //如果还没有同步存档速度,那么加载进度条变化速度慢一些
                this.curPregress += 0.08;
                // Log.trace("成功11111")
                if (this.curPregress > targetPregress) {
                    // Log.trace("成功进this.curPregress > targetPregress")
                    this.curPregress = targetPregress;
                    // Log.trace("退出this.curPregress > targetPregress")
                }
                this.progressBar.progress = this.curPregress;
                // Log.trace("成功22222");
                this.progressLabel.string = Math.floor(this.curPregress * 100) + '%';
                // Log.trace("退出this.curPregress < targetPregress");
            }
            if (this.curPregress >= 1) {
                // Log.trace("成功进this.curPregress >= 1")
                this.applyFunc(LoadingConst.ProgressComplete);
                // Log.trace("成功11111")
                this.enabled = false;
                // Log.trace("成功22222")
            }
        }
        //  else {
        //     this.progressBar.progress = 0;
        //     this.progressLabel.string = "检查更新中...";
        // }
        // let targetPregress = this.targetPregress;
        // if (this.curPregress < targetPregress) {
        //     //如果还没有同步存档速度,那么加载进度条变化速度慢一些
        //     this.curPregress += (this._tempData.isCheckUpdate ? 0.06 : 0.001);
        //     if (this.curPregress > targetPregress) {
        //         this.curPregress = targetPregress;
        //     }
        //     this.progressBar.progress = this.curPregress;
        //     this.progressLabel.string = Math.floor(this.curPregress * 100) + '%';
        // }
        // if (this.curPregress >= 1) {
        //     this.applyFunc(LoadingConst.ProgressComplete);
        //     this.enabled = false;
        // }
    }
}