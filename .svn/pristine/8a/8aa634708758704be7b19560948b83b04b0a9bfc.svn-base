import LevelDataMsr, { LevelData, LevelDataList } from "../../../../../../core/config/LevelDataMsr";
import { register } from "../../../../../ConfigManager";
import { CsvDataBase } from "./ConfigClass";
/**
 * 菜式配置表
 */
export class FoodDataMsr extends LevelDataMsr<LevelDataList<FoodData>>{
    constructor() {
        super(FoodSceneDataList, FoodLevelData, "FoodData", "FoodLevelData");
    }
}
/**
 * 某个场景里面所有菜式配置数据
 */
export class FoodSceneDataList extends LevelDataList<FoodData> {
    constructor() {
        super(FoodData);
    }
}
export class FoodData extends LevelData<FoodLevelData> {
    /**
    * 区域id
    */
    readonly sceneId: number = null;
    /**
    * 图标id
    */
    readonly icon: string = null;
    /**
    * 解锁金钱
    */
    readonly openChips: number = null;

    public awardLevel: number[] = [];
    $setLevelDatas(levelDatas: FoodLevelData[][]) {
        super.$setLevelDatas(levelDatas);
        this.createAwardLevel();
        // this.levelDatas = levelDatas[this.levelDataId];
    }
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
export class FoodLevelData extends CsvDataBase {
    /**
     * id
     */
    readonly id: number = null;
    /**
     * 升级所需代币
     */
    readonly nextLevelChips: number = null;
    /**
    * 图标序号
    */
    readonly icon: number = null;
    /**
     * 出售价格
     */
    readonly sellCoin: number = null;
}
register(FoodDataMsr, "FoodDataMsr");
declare global {
    interface ConfigMap {
        "FoodDataMsr": FoodDataMsr;
    }
}