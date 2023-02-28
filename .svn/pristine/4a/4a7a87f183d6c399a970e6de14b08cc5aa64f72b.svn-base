import { TreeNodeData } from "./BehaviorTree";
import { settings } from "./SettingsManager";
import { SHAPES } from "./shapes";
import { SYMBOLS, textSymbol } from "./symbols";
var makeRect = function (graphics: cc.Graphics, w: number, h: number, radius: number, bg_color: cc.Color, border_width: number, border_color: cc.Color) {
    graphics.fillColor = bg_color;
    // shape.graphics.beginFill(bg_color);
    // shape.graphics.setStrokeStyle(border_width, 'round');
    // shape.graphics.beginStroke(border_color);
    graphics.lineWidth = border_width
    graphics.roundRect(-w / 2, -h / 2, w, h, radius);
    graphics.strokeColor = border_color;
    graphics.stroke();
    graphics.fill();
};

export enum State {
    SUCCESS = 1,
    FAILURE = 2,
    RUNNING = 3,
    ERROR = 4
}

const { ccclass, property, executeInEditMode } = cc._decorator;
@ccclass
@executeInEditMode
export default class TreeNodeShape extends cc.Component {
    @property({ visible: false })
    public nodeId: string = "";
    @property({ type: cc.Graphics, visible: false })
    public graphics: cc.Graphics = null;

    @property({ type: cc.Enum(State), tooltip: "返回状态" })
    public result: number = 1;
    @property({ tooltip: "动作持续时间" })
    public runningTime: number = 1500;

    @property({ tooltip: "是否持续动作" })
    public isRunningMode: boolean = false;

    public data: TreeNodeData;
    public parentData: TreeNodeData;
    public parentNode: TreeNodeShape;
    public _displaySymbol: cc.Node = null;
    public category: string = null;
    @property(cc.Node)
    public _shadowNode: cc.Node = null;
    public setPlayStatu(isOpen: boolean) {
        if (!this._shadowNode) {
            let node = this._shadowNode = new cc.Node();
            node.opacity = 100;
            this.node.addChild(node);
            let sprite = node.addComponent(cc.Sprite);
            cc.loader.loadRes("Texture/game/Common/white.png", cc.SpriteFrame, (error, data) => {
                if (error) {
                    cc.error(error)
                    return;
                }
                sprite.spriteFrame = data;
                node.width = this.node.width;
                node.height = this.node.height;
            });
        }
        this._shadowNode.active = true;
        if (isOpen) {
            this._shadowNode.color = cc.Color.BLUE;
        } else {
            this._shadowNode.color = cc.Color.RED;
        }
    }
    public reset() {
        if (this._shadowNode) {
            this._shadowNode.active = false;
            // this._shadowNode.removeFromParent();
            // this._shadowNode = null;
        }

    }
    onLoad() {

        this.graphics = this.getComponent(cc.Graphics);
        if (!this.graphics) {
            this.graphics = this.addComponent(cc.Graphics);
        }
    }
    _redraw(x1, y1, x2, y2) {
        var s = settings;
        var graphics = this.graphics;
        var width = s.get('connection_width');
        var color = s.get('connection_color');
        var diff = s.get('anchor_radius') + s.get('anchor_border_width');
        var arrowWidth = s.get('anchor_radius') / 2;
        var layout = s.get('layout');
        var dx = 0; var dy = 0;
        var angle = 0; var ax = 0; var ay = 0;
        if (layout === 'horizontal') {
            dx = 2.5 * (x2 - x1) / 4;
            ax = -arrowWidth;
        } else {
            dy = 2.5 * (y2 - y1) / 4;
            ay = -arrowWidth;
            angle = 90;
        }
        graphics.lineWidth = width;
        graphics.fillColor = color;
        graphics.strokeColor = color;
        graphics.moveTo(x1, y1);
        graphics.bezierCurveTo(x1 + dx, y1 + dy, x2 - dx, y2 - dy, x2, y2);
        graphics.stroke();
    };
    public getTitle() {
        let title = this.data.title;
        let matchs = title.match(/(<[0-9a-zA-Z_]+>)/g);
        if (matchs) {
            for (const iterator of matchs) {
                let key = iterator.slice(1, iterator.length - 1);
                title = title.replace(iterator, this.data.properties[key] + "");
            }
        }
        return title;
    }
    public reDraw() {
        this.node.width = 50;
        this.node.height = 50;
        this.node.removeAllChildren();
        var symbol = SYMBOLS[this.data.name] || textSymbol;
        var shape = SHAPES[this.category];
        // var symbol = SYMBOLS[this.data.name] || textSymbol;
        this._displaySymbol = symbol(this);
        shape(this);
        this.node.x = this.data.display.x + this.node.width / 2;
        if (this.parentData) {
            let width = this.node.x - this.parentNode.node.x;
            let height = this.data.display.y - this.parentData.display.y;
            this._redraw(-width + this.parentNode.node.width / 2, height, -this.node.width / 2, 0)
        }
        // if(this.data.child)
    }
    public setData(data: TreeNodeData, parent: TreeNodeData, parentNode: TreeNodeShape) {
        // this.node.x = data.display.x;
        this.node.y = - data.display.y;
        this.parentNode = parentNode;
        this.data = data;
        this.parentData = parent;
        try {
            this.reDraw();
        } catch (error) {
            cc.error(error)
        }
    }
}