import BaseModel from "../../../core/mvc/model/BaseModel";
import BaseController from "../../../core/mvc/controller/BaseController";
import App from "../../../core/App";
import { AchievementData, AchievementDataMsr } from './AchievementDataMsr';
import { AchievementType } from "./AchievementConst";

export class AchievementModle extends BaseModel implements IMemento {

    conf: AchievementDataMsr = null;

    data: AchievementSave = null;

    /**热评成就配置 */
    good_AchievementConfs: AchievementData[] = [];

    /**明星成就配置 */
    star_AchievementConfs: AchievementData[] = [];
    /**菜式成就配置 */
    featureFood_AchievementConfs: AchievementData[] = [];
    /**邀请顾客成就配置 */
    guke_AchievementConfs: AchievementData[] = [];

    public constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, "AchievementSave", false, true);
    }
    public init() {
        this.conf = App.ConfigManager.getConfig("AchievementDataMsr");
        App.SaveManage.load("AchievementSave");

        let AchievementConfs = this.conf.getAllDatas();
        for (const key in AchievementConfs) {
            switch (AchievementConfs[key].type) {
                case AchievementType.Good_Achievement:
                    this.good_AchievementConfs[AchievementConfs[key].typeid] = AchievementConfs[key];
                    break;
                case AchievementType.Star_Achievement:
                    this.star_AchievementConfs[AchievementConfs[key].typeid] = AchievementConfs[key];
                    break;
                case AchievementType.FeatureFood_Achievement:
                    this.featureFood_AchievementConfs[AchievementConfs[key].typeid] = AchievementConfs[key];
                    break;
                case AchievementType.Guke_Achievement:
                    this.guke_AchievementConfs[AchievementConfs[key].typeid] = AchievementConfs[key];
                    break;
            }
        }

    }
    /**
     * 通过类型获取到配置
     */
    getConfByType(type: AchievementType) {
        switch (type) {
            case AchievementType.Good_Achievement:
                return this.good_AchievementConfs;

                break;

            case AchievementType.Guke_Achievement:
                return this.guke_AchievementConfs;

                break;
            case AchievementType.Star_Achievement:
                return this.star_AchievementConfs;

                break;
            case AchievementType.FeatureFood_Achievement:
                return this.featureFood_AchievementConfs;

                break;
            default:
                break;
        }
    }

    /**成就任务+1 */
    addIdByType(type: AchievementType) {
        switch (type) {
            case AchievementType.Good_Achievement:
                this.data.good_id++;
                break;
            case AchievementType.Star_Achievement:
                this.data.star_id++;
                break;
            case AchievementType.FeatureFood_Achievement:
                this.data.featureFood_id++;
                break;
            case AchievementType.Guke_Achievement:
                this.data.guke_id++;
                break;
            default:
                break;
        }
    }

    /**通过type获取成就类型的完成数量 */
    getNumByType(type: AchievementType): number {
        switch (type) {
            case AchievementType.Good_Achievement:
                return this.data.good_num;
                break;
            case AchievementType.Star_Achievement:
                return this.data.star_num;
                break;
            case AchievementType.FeatureFood_Achievement:
                return this.data.featureFood_num;
                break;
            case AchievementType.Guke_Achievement:
                return this.data.guke_num;
                break;
            default:
                break;
        }
    }


    /**
     * 成就是否完成
     * @param value1 
     * @param value2 
     */
    isGetNowChengjiu(value1: number, value2: number) {
        if (value1 >= value2) {
            return true;
        }
        return false;
    }
    createMemento(): AchievementSave {
        return this.data;
    }
    setMemento(data?: AchievementSave) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                good_num: 0,
                good_id: 1,
                star_num: 0,
                star_id: 1,
                featureFood_num: 0,
                featureFood_id: 1,
                guke_num: 0,
                guke_id: 1,
            }
        }
    }
    updateDayData?(key: string, day: number) {

    }
}