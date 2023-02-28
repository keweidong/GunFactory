// import { AUDIO_DIR } from "./SoundManager";
export const AUDIO_DIR = "audio/";

/**
 * Sound基类
 */
export default class BaseSound {
    public _cache: any;
    public _loadingCache: Array<string>;

    /**
     * 构造函数
     */
    public constructor() {
        this._cache = {};
        this._loadingCache = [];

        // App.TimerManager.doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
    }

    /**
     * 处理音乐文件的清理
     */
    // private dealSoundTimer(): void {
    //     var currTime: number = egret.getTimer();
    //     var keys = Object.keys(this._cache);
    //     for (var i: number = 0, len = keys.length; i < len; i++) {
    //         var key = keys[i];
    //         if (!this.checkCanClear(key))
    //             continue;
    //         if (currTime - this._cache[key] >= SoundManager.CLEAR_TIME) {
    //             delete this._cache[key];
    //             RES.destroyRes(key);
    //         }
    //     }
    // }

    /**
     * 获取Sound
     * @param key
     * @returns {egret.Sound}
     */
    public getSound(key: string) {
        let audioPath = AUDIO_DIR + key;
        var sound = cc.loader.getRes(audioPath, cc.AudioClip);
        if (sound) {
        } else {
            cc.loader.loadRes(audioPath, cc.AudioClip, this.onResourceLoadComplete.bind(this))
        }
        return sound;
    }

    /**
     * 资源加载完成
     * @param event
     */
    private onResourceLoadComplete(error: any, audio: cc.AudioClip): void {
        // var index: number = this._loadingCache.indexOf(key);
        // if (index != -1) {
        //     this._loadingCache.splice(index, 1);
        //     this._cache[key] = egret.getTimer();
        //     if (data) {//加载成功
        this.loadedPlay(audio);
        //     }
        // }
    }

    /**
     * 资源加载完成后处理播放，子类重写
     * @param key
     */
    public loadedPlay(audio: cc.AudioClip): void {

    }

    /**
     * 检测一个文件是否要清除，子类重写
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return true;
    }
}