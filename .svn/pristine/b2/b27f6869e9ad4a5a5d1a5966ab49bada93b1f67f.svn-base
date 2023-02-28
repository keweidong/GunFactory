import App from "../../core/App";
import { ControllerConst } from "../consts/ControllerConst";
import Customer from "../module/GameMain/object/scene/role/Customer";
import { HappyConst } from "../module/Happy/HappyConst";

const { ccclass, property } = cc._decorator;
@ccclass
export default class HappyDisplay extends cc.Component {

    @property(cc.ParticleSystem)
    public particle: cc.ParticleSystem = null;

    protected value: number = null;
    protected customer: Customer = null;

    protected isMove: boolean = false;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
    }

    onEnable() {
        this.scheduleOnce(this.autoCollect, 10);
        this.isMove = false;
    }


    
    onTouch() {
        if (this.isMove) {
            return;
        }
        this.isMove = true;
        this.unschedule(this.autoCollect);
        App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.COLLECT_HAPPY, this.node);
    }
    public removeAutoCollectTimer() {
        this.unschedule(this.autoCollect);
    }
    setMove() {
        this.isMove = true;
        this.particle.enabled = true;
        this.particle.resetSystem();
    }

    onDisable() {
        this.particle.stopSystem();
        this.particle.enabled = false;
        this.unschedule(this.autoCollect);
    }

    remove() {
        // App.NodePoolMsr.happyPool.push(this.node);
    }

    autoCollect() {
        App.ControllerManager.applyFunc(ControllerConst.HappyTime, HappyConst.COLLECT_HAPPY, this.node);
    }
}
