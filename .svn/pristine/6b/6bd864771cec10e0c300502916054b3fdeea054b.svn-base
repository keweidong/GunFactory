import SoundEffects from "./SoundEffects";
import SoundBg from "./SoundBg";
import App from "../App";
export const AUDIO_DIR = "audio/";
/**
 * Sound管理类
 */
const { ccclass, property } = cc._decorator;
export default class SoundManager {
    /**
    * 音乐文件清理时间
    * @type {number}
    */
    public static CLEAR_TIME: number = 3 * 60 * 1000;
    public saveKey = "SoundManager";
    private effect: SoundEffects;
    private bg: SoundBg;
    private effectOn: boolean;
    private bgOn: boolean;
    private currBg: string;
    private bgVolume: number;
    private effectVolume: number;
    private isPlaying: boolean;

    /**
     * 构造函数
     */
    public constructor() {
        this.bgOn = true;
        this.effectOn = true;
        // this.bgVolume = 0.3;
        // this.effectVolume = 0.5;
        this.bg = new SoundBg();
        this.effect = new SoundEffects();
    }

    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectName: string) {
        if (!this.effectOn)
            return null;
        return this.effect.play(effectName);
    }

    /**
     * 循环播放特效音
     */
    public playLoopEffect(effectName: string) {
        if (!this.effectOn)
            return;
        return this.effect.loopPlay(effectName);
    }
    /**
     * 停止播放某个循环音效
     */
    public stopLoopEffect(effectName: string) {
        this.effect.stopLoopEffect(effectName);
    }

    /**
     * 播放背景音乐
     * @param key
     */
    public playBg(bgName: string): void {
        this.currBg = bgName;
        if (!this.bgOn) {
            return;
        }
        this.bg.play(bgName);
        this.isPlaying = true;
    }

    /**
     * 停止背景音乐
     */
    public stopBg(): void {
        this.bg.stop();
        this.isPlaying = false;
    }

    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn: boolean): void {
        this.effectOn = $isOn;
    }

    /**
     * 获取音效是否打开
     */
    public getEffectStatus(): boolean {
        return this.effectOn;
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn: boolean): void {
        this.bgOn = $isOn;
        if (!this.bgOn) {
            this.stopBg();
        } else {
            if (this.currBg) {
                this.playBg(this.currBg);
            }
        }
    }

    /**
     * 获取背景音乐是否打开
     */
    public getBgStatus(): boolean {
        return this.bgOn;
    }

    /**
     * 设置背景音乐音量
     * @param volume
     */
    public setBgVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    }

    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    public getBgVolume(): number {
        return this.bgVolume;
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume: number): void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    }

    /**
     * 获取音效音量
     * @returns {number}
     */
    public getEffectVolume(): number {
        return this.effectVolume;
    }
    /**
     * 存档设置数据
     */
    public createMemento(): any {
        return {
            effectOn: this.effectVolume,
            bgOn: this.bgVolume
        }
    }
    /**
     * 还原设置数据
     */
    public setMemento(data: { effectOn: number, bgOn: number }) {
        if (data) {
            this.bgVolume = data.bgOn;
            this.effectVolume = data.effectOn;
        } else {
            this.bgVolume = 0.3;
            this.effectVolume = 0.5;
        }
        this.bg.setVolume(this.bgVolume);
        this.effect.setVolume(this.effectVolume);
    }

    /**
     * 音乐暂停播放
     */
    public pauseMusic(): void {
        this.bg.stop();
    }

    /**
     * 音乐恢复播放
     */
    public resumeMusic(): void {
        if (this.bg && this.currBg) {
            this.stopBg();
            this.playBg(this.currBg);
        }
    }
    /**
     * 音效暂停播放
     */
    public pauseEffect(): void {
        // this.bg.stop();
        this.effect.pauseEffect();
    }

    /**
     * 音效恢复播放
     */
    public resumeEffect(): void {
        this.effect.resumeEffect();
    }

    /**
     * 获取当前是否正在播放背景音乐
     */
    public getBgPlayingStatus(): boolean {
        return this.isPlaying;
    }
    public saveData() {
        App.SaveManage.save(this.saveKey);
    }
}