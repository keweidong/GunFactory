/*
 * @Author: He 
 * @Date: 2020-04-17 11:03:47 
 * @Last Modified by: He
 * @Last Modified time: 2020-06-16 15:36:38
 */

import LevelDataMsr, { LevelData } from "../../../../../../core/config/LevelDataMsr";
import { BaseWorkLevelData } from "../base/BaseWorkZone";
import { CsvDataBase, register } from "./ConfigClass";

/**
 * 厨师数据管理器
 */
export class ChefDataMsr extends LevelDataMsr<ChefData>{
    constructor() {
        super(ChefData, ChefLevelData, "ChefData", "ChefLevelData");
    }
}
export class ChefData extends LevelData<ChefLevelData> {

    /**
     * 烹饪的基础时间
     */
    readonly cookTime: number = 12000;
    protected readonly icon: number = 1;
    /**平常的icon */
    public narmalImg: string = "";
    /**烹饪时显示的图片 */
    public cookImg: string = "";
    public getIcon() {
        // 
    }
    constructor() {
        super();
    }
    $setLevelDatas(levelDatas: ChefLevelData[][]) {
        super.$setLevelDatas(levelDatas);
        this.createAwardLevel();
        this.narmalImg = `Texture/game/scene/bbq_desk/bbq_desk${this.icon}_1`;
        this.cookImg = `Texture/game/scene/bbq_desk/bbq_desk${this.icon}_1`;
    }
    public awardLevel: number[] = [];
    public createAwardLevel() {
        let cnt = this.levelDatas[0].icon;
        this.awardLevel[0] = 0;
        let arrLen = this.levelDatas.length;
        for (let i = 1; i < arrLen; i++) {
            let data = this.levelDatas[i];
            if (cnt !== data.icon) {
                cnt = data.icon;
                this.awardLevel.push(i);
            }
        }
        this.awardLevel.push(this.levelDatas.length);
    }
}
/**
 * 厨师等级数据
 */
export class ChefLevelData extends CsvDataBase implements BaseWorkLevelData {
    /**
     * id
     */
    readonly id: number = null;
    /**
     * 升级所需代币
     */
    readonly nextLevelChips: number = null;
    /**
     * 名字
     */
    readonly name: string = null;
    /**
    * 区域id
    */
    readonly sceneId: number = null;
    /**
    * 图标id
    */
    readonly icon: number = null;
    /**
    * 厨师数量
    */
    readonly cnt: number = null;
    /**
     * 速度倍率
     */
    readonly rate: number = null;
    /** 
     * 解锁厨师朋友圈所对应的id
    */
    readonly friendid: number = null;
}
register(ChefDataMsr, "ChefDataMsr");
declare global {
    interface ConfigMap {
        /**厨师 */
        "ChefDataMsr": ChefDataMsr;
    }
}
// let test: ConfigMap;
// test.ChefDataMsr