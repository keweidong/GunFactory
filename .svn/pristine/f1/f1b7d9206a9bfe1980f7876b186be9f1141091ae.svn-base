import BaseSound from "./BaseSound";

/**
 * 背景音乐类
 */
export default class SoundBg extends BaseSound {
    private _currBg: string = "";
    private _currSoundChannel: number;
    private _volume: number;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._currBg = "";
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        cc.audioEngine.stopMusic();
        this._currBg = "";
    }

    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName: string): void {
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        var sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: cc.AudioClip): void {
        cc.audioEngine.playMusic(sound, true);
        // this._currSoundChannel = this._currSound.play(0, 0);
        // this._currSoundChannel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
        cc.audioEngine.setMusicVolume(volume);
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: cc.AudioClip): void {
        if (this._currBg == key.name) {
            this.playSound(key);
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return this._currBg != key;
    }
}