import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
import { ItemBase } from "../bag/ItemBase";
import SevenDaysDataManager, { SevenDaysData } from "./SevenDaysDataManager";



/*七天签到管理者*/
export default class SevenDaysModel extends BaseModel implements IMemento {

    /**七天签到配置表*/
    public conf: SevenDaysDataManager;

    public curDayDataConf: SevenDaysData = null;

    /**七天签到数据*/
    protected nowSevenDayData: SaveSevenDaysData = null;

    public constructor($controller: BaseController) {
        super($controller);

    }

    public init() {
        this.conf = App.ConfigManager.getConfig("SevenDaysDataManager");
        App.SaveManage.add(this, "SevenDataData", false, true);
        App.SaveManage.load("SevenDataData");
    }
    //获取七天签到数据
    getNowSevenDayData() {
        return this.nowSevenDayData;
    }

    //设置领取数据
    setIsGetAward(num: number) {
        this.nowSevenDayData.isGetAward = num;
    }


    //创建存档
    createMemento(): SaveSevenDaysData {
        return this.nowSevenDayData;
    }

    /**
     * 更新每日数据
     * @param key 
     * @param day 天数
     */
    updateDayData(key: string, day: number) {
        CC_DEBUG && Log.trace("更新每日数据");
        this.nowSevenDayData.isGetAward = 0;
        this.nowSevenDayData.dataId++;
    }

    //同步存档
    setMemento(data?: SaveSevenDaysData) {
        // let d = new Date();
        // this.nowTime = d.getFullYear() + d.getMonth() + d.getDate();
        //测试
        // if (!data) {
        //     this.nowTime = 0;
        // } else {
        //     this.nowTime += data.nowTime;
        // }
        //测试

        if (data) {
            //空档
            this.nowSevenDayData = data;
        } else {
            this.nowSevenDayData = {
                isGetAward: 0,
                dataId: 0,
            }
        }
    }

}
declare global {

    /**当前七天签到数据*/
    type SaveSevenDaysData = {
        /**领取奖励(是否领取)
         * 0:没有领取
         * 1:普通领取
         * 2:广告领取
        */
        isGetAward: number;
        /**签到次数*/
        dataId: number;
    }
    //物品数据
    type SevenDaysItemData = {
        data: SevenDaysData;
        isCurDay: boolean;
        awardItem: ItemBase;
    }
}