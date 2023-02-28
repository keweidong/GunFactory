import { GameUtils } from "../../GameUtils";
const { ccclass, property, menu, executeInEditMode } = cc._decorator;
/**
 * 障碍物对象
 */
@ccclass
@menu("game/Block")
@executeInEditMode
export default class Block extends cc.Component {
    @property(cc.Rect)
    public pos: cc.Rect = cc.rect();
    onLoad() {
        // this.pos = cc.rect(0, 0, Math.floor(this.node.width / GameUtils.cellWidth), Math.floor(this.node.height / GameUtils.cellHeight));
        // GameUtils.convertXYToCell(this.node.x - this.node.width / 2, this.node.y, this.pos);
    }
    public cal() {
        GameUtils.convertXYToCell(this.node.x - (this.pos.width - 1) * GameUtils.cellWidth / 2, this.node.y + GameUtils.cellWidth / 2 - this.node.height * this.node.anchorY, this.pos);
    }
}