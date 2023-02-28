import { AchievementData } from "./AchievementDataMsr"

export const enum AchievementConst {
    /**
     * 获取成就奖励
     */
    Get_Chengjiu_Award = 0,
    /**
     * 成就类型全部完成
     */
    Chengjiu_Over = 1,

}
/**
 * 成就类型
 */
export const enum AchievementType {
    /**
     * 好评成就
     */
    Good_Achievement = 0,
    /**
     * 明星成就
     */
    Star_Achievement = 1,
    /**
     * 特色菜成就
     */
    FeatureFood_Achievement = 2,
    /**
     * 顾客成就
     */
    Guke_Achievement = 3,
}

declare global {
    type AchievementSave = {
        /**
         * 热评次数
         */
        good_num: number;
        /**
         * 热评成就id
         */
        good_id: number;
        /**
         * 明星次数
         */
        star_num: number;
        /**
         * 明星成就id
         */
        star_id: number;
        /**
         * 特色菜次数
         */
        featureFood_num: number;
        /**
         * 特色菜成就id
         */
        featureFood_id: number;
        /**
         * 顾客次数
         */
        guke_num: number;
        /**
         * 顾客成就id
         */
        guke_id: number;

    }
    /**
     * 
     */
    export type AchievementConf = {
        conf: {
            /**
             * 次数
             */
            numId: number,
            /**
             * 
             */

        },
        achievementData: AchievementData;
    }
}