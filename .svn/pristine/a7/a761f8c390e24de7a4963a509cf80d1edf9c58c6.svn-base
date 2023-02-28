import { UI } from "../../core/utils/Image";
import { MoneyType } from "../module/Define";

const { ccclass, property, requireComponent, menu } = cc._decorator;
@ccclass
@requireComponent(UI.Image)
@menu("UI/MoneyIcon")
export default class MoneyIcon extends cc.Component {
    protected img: UI.Image = null;
    protected type: MoneyType = null;
    protected source: string = null;
    onLoad() {
        this.img = this.getComponent(UI.Image);
        if (this.source) {
            this.img.source = this.source;
        }
    }
    public setDiamond() {
        this.source = "Texture/game/Common/icons/icon_diamond";
        if (this.img) {
            this.img.source = this.source;
        }
    }
    public setYuan() {
        this.source = "Texture/game/Common/icons/icon_rmb";
        if (this.img) {
            this.img.source = this.source;
        }
    }
    public setMoneyType(type: MoneyType) {
        this.source = "Texture/game/Common/icons/icon_cash";
        if (this.img) {
            this.img.source = this.source;
        }
    }
    //设置广告
    public setAD() {
        this.source = "Texture/game/Common/icons/icon_ad";
        if (this.img) {
            this.img.source = this.source;
        }
    }
    //设置广告
    public setFree() {
        this.source = "Texture/game/Common/icons/icon_free";
        if (this.img) {
            this.img.source = this.source;
        }
    }
    //设置分享
    public setShare() {
        this.source = "Texture/game/Common/icons/icon_share";
        if (this.img) {
            this.img.source = this.source;
        }
    }
}