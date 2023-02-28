import BaseView from '../../../core/mvc/view/BaseView';
import { BG_TYPE } from '../../../core/mvc/view/IBaseView';
import App from '../../../core/App';
import { ControllerConst } from '../../consts/ControllerConst';
import { ExploreConst } from './ExploreConst';
import { ViewConst } from '../../consts/ViewConst';
import { ExploreGuidData } from './ExploreDataMsr';
import { GameText } from '../../../core/lang/GameText';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
/**
 * 探索开启界面
 */
@ccclass
export default class ExploreChoseView extends BaseView {

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    /**
     * 展示的图片
     */
    @property(cc.Sprite)
    showSprite: cc.Sprite = null;

    /**
     * 描述
     */
    @property(cc.Label)
    des: cc.Label = null;

    /**
     * 下一步按钮
     */
    @property(cc.Button)
    nextBtn: cc.Button = null;

    /**
     * 按钮的描述
     */
    @property(cc.Label)
    btnDes: cc.Label = null;

    /**引导的步骤 */
    index: number = 0;

    /**引导的数据 */
    guidData: ExploreGuidData[] = [];

    /**
     * 是否直接打开
     */
    isOpen: boolean = false;

    initUI() {
        super.initUI()


    }

    // setData(data: ExploreGuidData) {


    // }

    setData() {
        if (this.isOpen) {

            this.btnDes.string = GameText.getText(lang.explore_chose_go);//"去探索";
            this.des.string = GameText.getText(lang.explore_chose_des);//"卡片里隐藏着炸弹或奖励";
            let url = "Texture/Explore/card2";
            App.CommonUtils.setSpriteFrame(url, this.showSprite);
            return;
        }
        this.des.string = this.guidData[this.index].des;
        this.btnDes.string = this.guidData[this.index].btnDes;
        let url = "Texture/Explore/" + this.guidData[this.index].icon;
        App.CommonUtils.setSpriteFrame(url, this.showSprite);

    }

    open(data: ExploreGuidData[], isFirst: number) {
        super.open();
        this.guidData = data;
        if (isFirst > 0) {
            this.isOpen = true;
        } else {

        }
        this.setData();

    }
    close() {
        super.close();
        this.index = 0;

    }

    /**
     * 下一个按钮
     */
    onTouchNext() {
        if (this.isOpen) {
            App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.OpenExploreView);

        } else {
            this.index++;
            if (this.guidData[this.index]) {
                this.setData();
                return;
            }
            App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.OpenExploreView);
        }
        App.ViewManager.close(ViewConst.ExploreChoseView);
    }

    /**
     * 关闭这个界面
     */
    closeThisView() {
        App.ViewManager.closeView(this);
    }

}
