import BaseView from "../../../core/mvc/view/BaseView";
import { ADController, AdType } from "../AD/ADController";
import { GameConst } from "./GameConst";
import App from "../../../core/App";
import { AdEvent } from "../AD/ADManageBase";
import Toast from "../../../core/utils/Toast";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";
import { GameText } from "../../../core/lang/GameText";


const { ccclass, property } = cc._decorator;
//看广告升级弹窗
@ccclass
export default class ADUpgradeView extends BaseView {

    public bgType: BG_TYPE = BG_TYPE.GRAY;

    @property(cc.Node)
    closeNode: cc.Node = null;

    initUI() {
        super.initUI();
    }

    open() {
        super.open();
        this.closeNode.active = false;
        this.delayedClose();
    }

    //延时关闭1秒
    delayedClose() {
        App.TimerManager.doTimer(1000, 1, this.showCloseBtn, this);
    }

    //关闭按钮延时出现
    showCloseBtn() {
        this.closeNode.active = true;
    }


    close() {
        super.close();
    }

    //点击观看广告按钮
    async onTouchADBtn() {
        let result = await ADController.getInstance().openAdByTypeAsync(AdType.FREE_ONE_UPGRADE);
        if (result) {
            this.applyFunc(GameConst.UPGRADE, true, 5);
            App.SoundManager.playEffect("upgrade");
            this.onTouchClose();
            Toast.instance.launch(GameText.getText(lang.common_lv_update));
        }
    }

    //重写方法点击背景不关闭弹窗
    public onTouchBg(){

    }

}
