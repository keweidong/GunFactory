import App from "../App";
const { ccclass, property } = cc._decorator;
@ccclass
export class EasyLoading extends cc.Component {
    protected tween: cc.Tween = null;
    @property(cc.Node)
    protected loadReel: cc.Node = null;

    onLoad() {
        this.tween = cc.tween(this.loadReel).by(2, { angle: 360 }).repeatForever();
        this.node.active = false;
        cc.game.addPersistRootNode(this.node);//将层级节点设置为常驻节点,防止切换场景的时候被自动销毁
        // this.node.active = true;
        // this.node.removeFromParent(false);
        App.EasyLoading = this;
    }
    public init() {

    }

    // public async initAni(){
    //     // let movieClipData = App.MovieClipDataFactory.getMovieClipData("loadingAni", "load");
    //     // this.aniNode.movieClipData = movieClipData;
    //     this.aniNode = await App.MovieClipDataFactory.getMCAsync("loadingAni", "load");
    //     this.aniNode.frameRate = 8;
    //     // this.aniNode.gotoAndPlay(0, -1);
    //     this.aniNode.width = 159;
    //     this.aniNode.height = 165;
    //     this.aniNode.x = this.content.width * 0.5 - this.aniNode.width * 0.5;
    //     this.aniNode.y = this.content.height * 0.5 - this.aniNode.height * 0.5;
    //     this.content.addChild(this.aniNode);
    // }

    // private playLoadAni() {
    //     if(this.aniNode){
    //         this.aniNode.visible = true;
    //         this.aniNode.gotoAndPlay("normal", -1);
    //     }
    // }

    // private stopLoadAni(){
    //     if(this.aniNode){
    //         this.aniNode.visible = false;
    // 		this.aniNode.stop();
    //     }
    // }

    public showLoading(): void {
        this.node.active = true;
        this.tween.start();
        // App.StageUtils.getStage().addChild(this.content);
        // this.content.touchEnabled = this.content.touchChildren = false;
        // App.TimerManager.doFrame(1, 0, this.enterFrame, this);
        // if(this.modeType != ModeType.ani){
        // } else {
        //     this.playLoadAni();
        // }
    }

    /**
     * 带超时自动关闭的缓冲特效
     * count:超时时间,以秒为单位
     * onFinshCallback:超时回调
     * callbackObj:回调this对象
     */
    public showLoadingByTime(count: number = 0, onFinshCallback?: Function, callbackObj?: any): void {
        this.showLoading();
        App.TimerManager.doTimer(1000, count, this.loadingByTimeUpdate, this, () => {
            if (onFinshCallback) {
                onFinshCallback.apply(callbackObj);
            }
            this.hideLoadingByTime();
        });
    }

    public hideLoading(): void {
        this.loadReel.stopAllActions();
        this.node.active = false;
        App.TimerManager.remove(this.loadingByTimeUpdate, this);
        // if (this.content && this.content.parent) {
        //     App.StageUtils.getStage().removeChild(this.content);
        //     this.uiImageContainer.rotation = 0;
        // }
        // App.TimerManager.remove(this.enterFrame, this);
        // if(this.modeType != ModeType.ani){
        // } else {
        //     this.stopLoadAni();
        // }
    }

    public hideLoadingByTime(): void {
        this.hideLoading();

    }

    // private enterFrame(time: number) {
    //     this.averageUtils.push(this.speed * time);
    //     this.uiImageContainer.rotation += this.averageUtils.getValue();
    // }

    private loadingByTimeUpdate() {
    }

}
