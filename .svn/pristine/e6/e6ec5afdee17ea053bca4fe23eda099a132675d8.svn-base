import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { UI } from "../../../core/utils/Image";
import { ActivityConst } from "./ActivityConst";



const { ccclass, property, executeInEditMode } = cc._decorator;

/** 厨神活动界面 */
@ccclass
export default class FoodActSumbitView extends BaseView {
    @property(UI.Image)
    foodIcon: UI.Image = null;

    @property(cc.Label)
    foodNameLab: cc.Label = null;

    @property(cc.Label)
    scoreLab: cc.Label = null;

    @property(cc.Node)
    protected ani: cc.Node = null;
    
    @property(cc.Node)
    infoNode: cc.Node = null;

    @property(cc.Label)
    awardLab: cc.Label = null;

    protected boxAni: cc.Animation = null;
    protected isPlaying: boolean = false;

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    initUI() {
        super.initUI();
        this.init();
        this.boxAni = this.ani.getComponent(cc.Animation);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchTap, this);
        this.boxAni.on(cc.Animation.EventType.FINISHED, this.onAnimCompleted, this);
    }

    open(foodId: number, score: number, data){
        super.open();
        this.infoNode.active = false;
        // let foodData = App.ConfigManager.foodDataManager.getData(foodId);
        // this.foodNameLab.string = `恭喜您成功烹饪【${foodData.title}】`;
        // this.foodIcon.source = foodData.icon;
        // this.scoreLab.string = score + "";
        this.boxAni.play("csdstjcs");
        this.isPlaying = true;
        this.awardLab.string = `主办方奖励参赛制作费 ${data.num} ${data.name}`
    }

    close() {
        super.close(); 
        this.applyFunc(ActivityConst.CLOSE_FOOD_SUMBIT);
    }

    public init() {
        // this.foodActScoreManager = App.ConfigManager.foodActScoreManager;
    }

    protected showInfo(){
        this.infoNode.active = true;
    }

    protected onAnimCompleted(event) {
        if (this.isPlaying) {
            this.isPlaying = false;
        }
        this.showInfo();
    }
    protected onTouchTap() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.ani.stopAllActions();
            this.boxAni.play("csdstjcs", 20);
            this.showInfo();
        } else {
            App.ViewManager.closeView(this);
        }
    }

    
}