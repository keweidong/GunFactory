import App from "../../../../../../core/App";
import { GameNotificationConst } from "../../../../../consts/NotificationConst";
import { BaseWorkZoneSData } from "../base/BaseWorkZone";
import { FeatureFoodDataList } from "../config/FeatureFoodDataMsr";
import { FoodSceneDataList } from "../config/FoodDataMsr";
import ScenegZone from "../SceneZone";
import { FeatureFood } from "./FeatureFood";
import { Food } from "./Food";


export const enum FoodType {
    NORMAL,
    FEATURE,
}

/**
 * 菜式管理器
 */
export class FoodMsr {
    scene: ScenegZone = null;
    /**菜式列表 */
    foods: Food[] = [];
    /**已经开启的菜式列表 */
    openFoods: Food[] = [];

    featureFoods: FeatureFood[] = [];


    /**普通菜式配置数据 */
    protected normalFoodConfs: FoodSceneDataList = null;
    protected featureFoodConfs: FeatureFoodDataList = null;
    public init(scene: ScenegZone): void {
        this.scene = scene;
        this.normalFoodConfs = App.ConfigManager.getConfig("FoodDataMsr").getData(this.scene.getId());
        let arrLen = this.normalFoodConfs.dataCnt;
        for (let i = 0; i < arrLen; i++) {
            let food = new Food(this.scene);
            food.attrObj.index = i;
            food.levelUpDatas = this.normalFoodConfs.getData(i);
            food.attrObj.levelData = food.levelUpDatas.getData(0);
            this.foods.push(food);
        }

        this.featureFoodConfs = App.ConfigManager.getConfig("FeatureFoodDataMsr").getData(this.scene.getId());
        arrLen = this.featureFoodConfs.dataCnt;
        for (let i = 0; i < arrLen; i++) {
            let food = new FeatureFood(this.scene);
            food.init(this.featureFoodConfs.getData(i));
            this.featureFoods.push(food);
        }
    }
    /**
     * 解锁新菜式
     * 
     * @param {int} index 菜式序号
     * @param {boolean} [isSuper] 是否使用超级金钱
     * @returns {number} 0:解锁成功, -1:金钱不足, -2:这个菜式已经解锁
     */
    public unlockFood(index: int, isSuper?: boolean, isFree?: boolean): number {
        let food = this.foods[index];
        if (food.isOpen()) {
            Log.warn("这个菜式已经解锁");
            return -2;
        }
        if (!isFree) {//如果不是免费
            //判断是否有足够的金钱解锁
            let result = this.scene.check(food.levelUpDatas.openChips);
            if (result) {
                this.scene.nowMoneySub(food.levelUpDatas.openChips);//扣除金钱

                //广播解锁新菜式
                App.NotificationCenter.dispatch(GameNotificationConst.UNLOCK_NEW_CaiShi, food.levelUpDatas.id);
            } else {
                return -1;//金钱不足
            }
        }
        food.open();
        this.openFoods.push(food);
        return 0;
    }
    // /**
    //  * 获取某一层的解锁费用
    //  */
    // public getUnlockMoney(index: number) {
    //     let kcAbo = this._zone.kuangCengDataMgr.getConfig(this._zone.getId(), index);
    //     var needChips = kcAbo.openChips;
    //     return MyBigLong.create(needChips, 0);
    // }
    newOpen() {
        this.unlockFood(0, false, true);
        // this.upGrade(1, 0, true);//默认第一个菜式是打开的
    }

    /**
   * 升级某个菜式
   * @param count:要升多少级
   * @returns 0:成功, -1:金币不足, -2:已经是最高等级了, -3:菜式不存在
   */
    public upGrade(index: number, count: number, isFree?: boolean) {
        let zone = this.foods[index];
        if (zone) {
            let result = zone.upLevel(count, isFree);
            return result;
        } else {
            return -3;
        }
    }

    public createMemento(): FoodMsrSaveData {
        let list = [];
        for (let index = 0; index < this.foods.length; index++) {
            if (this.foods[index].attrObj.isOpen) {
                list.push(this.foods[index].createMemento());
            }

        }
        return {
            foods: list
        }
    }
    public setMemento(data: FoodMsrSaveData) {
        if (data) {
            for (let i = 0; i < data.foods.length; i++) {
                let food = this.foods[data.foods[i].index];
                if (food) {
                    food.setMemento(data.foods[i]);
                    this.openFoods.push(food);
                }
            }
        } else {
        }
    }
}
export interface FoodMsrSaveData {
    foods: FoodSaveData[];
}
export interface FoodSaveData extends BaseWorkZoneSData {
    index: number;
}