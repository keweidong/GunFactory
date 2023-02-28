import App from "../../../core/App";
import BaseView from "../../../core/mvc/view/BaseView";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { TIPSTATE } from "./GameUIConst";



const { ccclass, property, executeInEditMode } = cc._decorator;
/** 赞助界面 */
@ccclass
export default class TipView extends BaseView {
    @property(cc.Button)
    protected leftBtn: cc.Button = null;

    @property(cc.Button)
    protected rightBtn: cc.Button = null;

    @property(cc.Label)
    protected descLab: cc.Label = null;

    @property(cc.Button)
    protected closeBtn: cc.Button = null;

    protected data: COMMON_BOX;

    public bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
    }

    close() {

    }

    public open(data: COMMON_BOX) {
        super.open();
        this.init(data);
    }

    public init(data: COMMON_BOX) {
        if(!data){
            return;
        }
        this.data = data;
        switch (data.curState) {
            case TIPSTATE.SURE:
                // 只有一个按钮
                this.rightBtn.node.active = false;
                this.leftBtn.node.active = true;
                break;
            case TIPSTATE.SURE_CANCEL:
                // 两个按钮
                this.rightBtn.node.active = true;
                this.leftBtn.node.active = true;
                break;
            case TIPSTATE.NO_SURE:
                //没有按钮
                this.rightBtn.node.active = false;
                this.leftBtn.node.active = false;
                break;
        }

        this.closeBtn.node.active = data.hasCloseBtn;
        this.leftBtn.target.getChildByName("Label").getComponent(cc.Label).string = data.leftBtnText;
        this.rightBtn.target.getChildByName("Label").getComponent(cc.Label).string = data.rightBtnText;

        this.descLab.string = data.tipsStr;
    }
    
    protected onLeftBtn() {
        if (this.data.leftFunc) {
            this.data.leftFunc.apply(this.data.leftThisObj);
            App.ViewManager.closeView(this);
            
        }
    }

    protected onRightBtn() {
        if (this.data.rightFunc) {
            this.data.rightFunc.apply(this.data.rightThisObj);
            App.ViewManager.closeView(this);
            
        }
    }
}