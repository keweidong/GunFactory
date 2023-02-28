import { UI } from "../../core/utils/Image";
import { MoneyType } from "../module/Define";

const { ccclass, property, requireComponent, menu } = cc._decorator;
@ccclass
export default class DoubleMoney extends cc.Component {

    @property(UI.Image)
    protected img: UI.Image = null;

    @property(cc.Label)
    protected money: cc.Label = null;

    onLoad() {
        
    }

    public setImg(source: string){
        this.img.source = source;
    }

    public setMoney(money: string){
        this.money.string = money;
    }
    
}