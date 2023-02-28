import DataMsrBase from "../../../core/config/DataMsrBase";
import { FoodActScoreData } from "../Activity/FoodActManager";
import { register } from "../../ConfigManager";
import { CsvDataBase } from "../../../core/config/CsvDataBase";
import { BaseWorkLevelData } from "../GameMain/object/scene/base/BaseWorkZone";

export class AchievementDataMsr extends DataMsrBase<AchievementData>
{
    constructor() {
        super(AchievementData, "AchievementData", "id");
    }
}

export class AchievementData extends CsvDataBase {

    /**
     * id
     */
    readonly id: number;

    /**
     * 类型
     */
    readonly type: number;

    /**
     * 类型id
     */
    readonly typeid: number;

    /**
     * 奖励
     */
    readonly award: number;

    /**
     * 描述
     */
    readonly des: string;

    /**
     * 完成参数
     */
    readonly param: number;

    /**
     * 图片
     */
    readonly icon: string;

    /**
     * 成就称号
     */
    readonly param1: string;
}

register(AchievementDataMsr, "AchievementDataMsr");
declare global {
    interface ConfigMap {
        "AchievementDataMsr": AchievementDataMsr;
    }
}