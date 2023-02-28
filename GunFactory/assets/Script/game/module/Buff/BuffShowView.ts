import BaseView from "../../../core/mvc/view/BaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { OpenConst, OpenTypeConst } from "../SystemOpen/SystemOpenConst";
import App from "../../../core/App";
import { ViewConst } from "../../consts/ViewConst";


export type buffShowData = {
    food: number,
    star: number,
    assistShouYi: number,
    eventShouYi: number,
    eventExpense: number,
    assistExpense: number,
};

const { ccclass, property } = cc._decorator;
@ccclass
export default class BuffShowView extends BaseView {

    //菜式
    @property(cc.Label)
    protected foodLab: cc.Label = null;
    //明星
    @property(cc.Label)
    protected starLab: cc.Label = null;
    //赞助店铺收益
    @property(cc.Label)
    protected assistShouYiLab: cc.Label = null;
    //事件收益
    @property(cc.Label)
    protected eventShouYiLab: cc.Label = null;
    //事件消费速度
    @property(cc.Label)
    protected eventExpenseLab: cc.Label = null;
    //赞助消费速度
    @property(cc.Label)
    protected assistExpenseLab: cc.Label = null;

    initUI() {
        super.initUI();
    }

    //设置buff加成数据
    setBuffData(data: buffShowData) {
        this.foodLab.string = "+"+Math.abs(data.food) +"%"
        this.starLab.string = "+"+Math.abs(data.star)+"%"
        this.assistShouYiLab.string = "+"+Math.abs(data.assistShouYi)+"%"
        this.eventShouYiLab.string = "+"+Math.abs(data.eventShouYi)+"%"
        this.eventExpenseLab.string = "+"+Math.abs(data.eventExpense)+"%"
        this.assistExpenseLab.string = "+"+Math.abs(data.assistExpense)+"%"
    }
}
