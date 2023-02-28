import NodePool from "../../../../../../../core/utils/NodePool";
import App from "../../../../../../../core/App";
import Customer from "../Customer";
import { CustomerState } from "../../../../../Define";
import Deliveryman from "../Deliveryman";
import { UI } from "../../../../../../../core/utils/Image";

/** 顾客对话框 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class RoleTalk extends cc.Component {
    public entity: Customer | Deliveryman = null;
    public roleNode: cc.Node = null;
    /** 对象池 */
    protected pool: NodePool = null;
    /** 对话文本 */
    protected talkLab: cc.Label = null;
    /** 对话背景 */
    protected talkBg: cc.Node = null;
    protected foodImg: UI.Image = null;

    protected _endTime: number = null;
    protected _talkStr: string = null;
    protected _path: string = null;
    public set talkStr(str: string) {
        // this.talkLab.string = str;
        this._talkStr = str;
        this.enabled = true;
    }

    public set endTime(time: number) {
        this._endTime = time;
    }

    public setImg(path: string) {
        this._path = path;
        this.foodImg.source = this._path;
    }

    onLoad() {
        this.pool = this.entity.roleMsr.poolMsr.roleTalkPool;
    }
    onEnable() {
        if (!this.roleNode) {
            this.roleNode = this.pool.pop();
            this.roleNode.x = this.node.x;
            this.roleNode.y = this.node.y + 120;
            this.entity.roleMsr.gameView.cellGroup.addChild(this.roleNode, 51);
            this.talkBg = this.roleNode.getChildByName("taskBg");
            this.talkLab = this.talkBg.getChildByName("talkLab").getComponent(cc.Label);
            // this.foodImg = this.talkBg.getChildByName("foodImg").getComponent(UI.Image);
        }
        this.talkLab.string = this._talkStr;
        this.talkLab.node.active = true;
        // if (this._path && this._path != ""){
        //     this.foodImg.source = this._path;
        //     this.foodImg.node.active = true;
        // }
        // else{
        //     this.foodImg.node.active = false;
        // }

    }

    hide() {
        this.enabled = false;
    }

    show() {
        if (this._talkStr) {
            this.enabled = true;
        }
    }
    update() {
        // this.talkBg.setContentSize(this.talkLab.node.width + 20, this.talkLab.node.height + 16);
        // this.progressImg.fillRange = (this.entity.finishTime - Date.now()) / this.entity.costTime - 1;
        if (this.entity.state === CustomerState.MOVE) {
            this.roleNode.x = this.node.x;
            this.roleNode.y = this.node.y + 120;
        }
        if (App.DateUtils.Now() - this._endTime >= 0) {
            this._talkStr = null;
            this.enabled = false;
        }
    }
    onDisable() {
        if (this.roleNode) {
            this.pool.push(this.roleNode);
            this.talkLab = this.roleNode = null;
        }
    }
}