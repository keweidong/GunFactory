import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { Platform } from "../../platform/Platform";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SettiingView extends BaseView {

    @property(cc.Slider)
    protected MusicSlider: cc.Slider = null;

    @property(cc.Slider)
    protected EffectSlider: cc.Slider = null;

    @property(cc.ProgressBar)
    protected BarBgVolume: cc.ProgressBar = null;

    @property(cc.ProgressBar)
    protected BarEffectVolume: cc.ProgressBar = null;

    @property(cc.Label)
    protected BgVolume: cc.Label = null;

    @property(cc.Label)
    protected EffectVolume: cc.Label = null;
    @property(cc.Label)
    protected versionLab: cc.Label = null;

    @property(cc.Label)
    protected idLab: cc.Label = null;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
        /**获取音量和音效*/
        // this.controller.applyFunc(GameUIConst.GET_VOLUME);
        this.versionLab.string = Platform.instance.getVersionStr();
        this.setVolume(App.SoundManager.getBgVolume(), App.SoundManager.getEffectVolume());
        this.idLab.string = `ID:${App.GameDataMsr.playerInfo.id}`;

    }

    /**点击音量音效Icon*/
    // clickIcon(event:cc.Event,customEventData:string){
    //     let SliderNumber =  Number(customEventData);
    //     switch(SliderNumber){
    //         case 0: 
    //         if(this.BgMute){
    //             this.BgMute = !this.BgMute;
    //         }else{
    //             this.BgMute = !this.BgMute;
    //             this.BarBgVolume.progress = 0;
    //         }
    //             App.SoundManager.setBgVolume(this.BarBgVolume.progress);
    //             this.BarBgVolume.progress = this.MusicSlider.progress;
    //             break;
    //         case 1:
    //                 if(this.EffectMute){
    //                     this.EffectMute = !this.EffectMute;
    //                 }else{
    //                     this.EffectMute = !this.EffectMute;
    //                     this.BarEffectVolume.progress = 0;
    //                 }
    //             App.SoundManager.setEffectVolume(this.BarEffectVolume.progress);
    //             this.BarEffectVolume.progress = this.EffectSlider.progress;
    //             break;
    //         default:
    //             break;
    //     }
    // }

    /**点击滑动条按钮设置音量*/
    ClickSlider(event: cc.Event, customEventData: string) {
        let SliderNumber = Number(customEventData);
        switch (SliderNumber) {
            case 0:
                this.BarBgVolume.progress = this.MusicSlider.progress;
                App.SoundManager.setBgVolume(this.BarBgVolume.progress);
                this.ShowBgVolume(this.MusicSlider.progress);
                break;
            case 1:
                this.BarEffectVolume.progress = this.EffectSlider.progress;
                App.SoundManager.setEffectVolume(this.BarEffectVolume.progress);
                this.ShowEffectVolume(this.EffectSlider.progress);
                break;
            default:
                break;
        }
        // App.SoundManager.setBgVolume(this.BarBgVolume.progress);
        // App.SoundManager.setEffectVolume(this.BarEffectVolume.progress);
        // this.controller.applyFunc(GameUIConst.SET_VOLUME, this.BarBgVolume.progress, this.BarEffectVolume.progress);
    }

    setVolume(Volume: number, Effect: number) {
        this.MusicSlider.progress = Volume;
        this.EffectSlider.progress = Effect;
        /**设置滑动条背景的值和按钮的值相同*/
        this.BarBgVolume.progress = Volume;
        this.BarEffectVolume.progress = Effect;
        this.ShowBgVolume(Volume);
        this.ShowEffectVolume(Effect);
    }

    /**显示背景音量*/
    ShowBgVolume(Volume: number) {
        Volume = Volume * 100;
        this.BgVolume.string = Math.floor(Number(Volume)) + "";
    }
    /**显示音效音量*/
    ShowEffectVolume(Volume: number) {
        Volume = Volume * 100;
        this.EffectVolume.string = Math.floor(Number(Volume)) + "";
    }


    /**存档数据*/
    // SaveSoundData(){
    //     App.SoundManager.saveData();
    // }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}



    // update (dt) {}
}
