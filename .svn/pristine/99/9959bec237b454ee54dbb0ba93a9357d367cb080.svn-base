// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property({
        type: [Item],
        tooltip: "跟这个点连接的点"
    })
    protected connectNodes: Item[] = [];

    onLoad() { }

    // update (dt) {}
}
