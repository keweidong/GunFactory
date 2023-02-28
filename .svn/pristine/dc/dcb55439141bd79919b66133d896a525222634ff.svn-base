import { ITick } from "../../game/module/GameMain/behavior/B3Tree";

export default class BaseAction extends b3.Action {
    protected interrupt(tick) {
        // this.log("打断节点")
    }
    public enter(tick: ITick) {
        // this.log("enter")
        if (CC_DEBUG) {
            // tick.blackboard.set('target', tick.target, tick.tree.id, this.id);
        }
    }
    public toString() {
        let title = this.title;
        let matchs = title.match(/(<[0-9a-zA-Z_]+>)/g);
        if (matchs) {
            for (const iterator of matchs) {
                let key = iterator.slice(1, iterator.length - 1);
                title = title.replace(iterator, this.properties[key] + "");
            }
        }
        return title;
    }
    protected log(...optionalParams: any[]) {
        Log.trace(this.toString(), ...optionalParams);
    }
}