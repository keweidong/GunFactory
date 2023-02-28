import BaseModel from '../../../core/mvc/model/BaseModel';
import BaseController from '../../../core/mvc/controller/BaseController';
import App from '../../../core/App';
import { ExploreShowType } from './ExploreConst';
import ExploreView from './ExploreView';
import { ExploreGuidData, ExploreguidDataMsr, ExploreWeightDataMsr, ExploreAwardDataMsr } from './ExploreDataMsr';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
/**
 * 探索
 */
@ccclass
export default class ExploreModle extends BaseModel implements IMemento {

    /**
     * 探索yindao的conf
     */
    public exploreGuidConf: ExploreguidDataMsr = null;

    public exploreSaveData: ExploreSaveData = null;

    /**是否是第一次打开 
     * 第一次打开开启探索引导
    */
    public isFirstOpen: number = -1;

    /**
     * 奖励权重
     */
    public exploreWeightDataMsr: ExploreWeightDataMsr = null;

    /**
     * ExploreData
     */
    public exploreAwardDataMsr: ExploreAwardDataMsr = null;


    /**
     *探索Moldel
     */
    constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, "ExploreDataSave", false, true);
    }

    init() {
        this.exploreGuidConf = App.ConfigManager.getConfig("ExploreguidDataMsr");
        this.exploreAwardDataMsr = App.ConfigManager.getConfig("ExploreAwardDataMsr");
        this.exploreWeightDataMsr = App.ConfigManager.getConfig("ExploreWeightDataMsr")
        App.SaveManage.load("ExploreDataSave");
        // let conf = this.exploreGuidConf.getAllDatas();
        // for (const key in conf) {
        //     switch (conf[key].type) {
        //         case ExploreShowType.ExploreShow_Guid:
        //             this.guidExploreData[conf[key].index] = conf[key];
        //             break;
        //         case ExploreShowType.ExploreShow_choseview:
        //             this.awardExploreData[conf[key].index] = conf[key];
        //             break;
        //         default:
        //             break;
        //     }
        // }

    }




    createMemento(): ExploreSaveData {
        return this.exploreSaveData;
    }

    setMemento(data: ExploreSaveData) {
        if (data) {
            this.exploreSaveData = data;
            this.isFirstOpen = this.exploreSaveData.isFirstOpen;
        } else {
            this.exploreSaveData = {
                isFirstOpen: -1,
            }
        }
    }

    updateDayData?(key: string, day: number) {

    }




}
declare global {

    interface ExploreSaveData {
        isFirstOpen: number;
    }

}
