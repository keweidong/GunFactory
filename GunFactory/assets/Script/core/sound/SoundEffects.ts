import BaseSound from "./BaseSound";
// import { AUDIO_DIR } from "./SoundManager";
export const AUDIO_DIR = "audio/";

/**
 * 音效类
 */
export default class SoundEffects extends BaseSound {
    private _volume: number;
    protected _loopSound: Map<string, {
        cnt: number;
        channel: number;
        lastPos?: number;
    }> = new Map();
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectName: string) {
        var sound = this.getSound(effectName);
        if (sound) {
            return this.playSound(sound);
        }
        return null;
    }
    /**
     * 停止播放某个循环音效
     */
    public stopLoopEffect(effectName: string) {
        let item = this._loopSound.get(effectName);
        if (item) {
            item.cnt--;
            Log.trace(item);
            if (item.cnt <= 0) {
                if (item.channel) {
                    cc.audioEngine.stopEffect(item.channel)
                    item.channel = null;
                }
                this._loopSound.delete(effectName);
            }
        }

    }
    /**
     * 循环播放一个音效
     */
    public loopPlay(effectName: string) {
        if (this._loopSound.has(effectName)) {
            //this._loopSound.get(effectName).cnt++;
        } else {
            var sound = this.getLoopSound(effectName);
            if (sound) {
                let channel = cc.audioEngine.playEffect(sound, true);
                // channel.volume = this._volume;
                this._loopSound.set(effectName, {
                    cnt: 1,
                    channel: channel
                })
            } else {
                this._loopSound.set(effectName, {
                    cnt: 1,
                    channel: null
                });
            }
        }
        return effectName;
    }
    public getLoopSound(effectName: string): cc.AudioClip {
        let audioPath = AUDIO_DIR + effectName;
        var sound = cc.loader.getRes(audioPath, cc.AudioClip);
        if (sound) {
        } else {
            cc.loader.loadRes(audioPath, cc.AudioClip, this.onLoopResourceLoadComplete.bind(this))
        }
        return sound;
    }
    /**
     * 资源加载完成
     * @param event
     */
    private onLoopResourceLoadComplete(error: any, audio: cc.AudioClip): void {
        // audio.nativeUrl
        let item = this._loopSound.get(audio.name);
        if (item && !isNaN(item.channel)) {
            item.channel = cc.audioEngine.playEffect(audio, true);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: cc.AudioClip) {
        // var channel: egret.SoundChannel = sound.play(0, 1);
        return cc.audioEngine.playEffect(sound, false);
        // channel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
        cc.audioEngine.setEffectsVolume(volume);
    }


    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: cc.AudioClip): void {
        this.playSound(key);
    }
    /**
    * 音效暂停播放
    */
    public pauseEffect(): void {
        // this.bg.stop();
        cc.audioEngine.pauseAllEffects();
        // for (let effectName in this._loopSound) {
        //     let item = this._loopSound[effectName];
        //     if (item.channel) {
        //         // item.lastPos = item.channel.position;
        //         item.channel.stop();
        //         item.channel = null;
        //     }
        // }
    }

    /**
     * 音效恢复播放
     */
    public resumeEffect(): void {
        cc.audioEngine.resumeAllEffects();
        // for (let effectName in this._loopSound) {
        //     let item = this._loopSound[effectName];
        //     if (item.cnt > 0 && !item.channel) {
        //         let sound = <egret.Sound>RES.getRes(effectName);
        //         if (sound) {
        //             // sound.type = 
        //             sound.type = egret.Sound.EFFECT;
        //             item.channel = sound.play(0, 0);
        //             // item.channel.position = item.lastPos;
        //             // Log.trace("item.lastPos:", item.lastPos)
        //         }
        //     }
        // }
    }
}