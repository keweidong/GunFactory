import { settings } from "./SettingsManager";
import TreeNodeShape from "./TreeNodeShape";

function rootSymbol(block: TreeNodeShape) {
    var shape = new cc.Node();
    block.node.addChild(shape);
    let graphics = shape.addComponent(cc.Graphics);
    var w = block.node.width;
    var h = block.node.height;
    var swidth = h / 20;
    var ssize = h / 5;
    var scolor = settings.get('block_symbol_color');
    graphics.lineWidth = swidth;
    graphics.fillColor = scolor;
    graphics.strokeColor = scolor;
    graphics.circle(0, 0, ssize);
    graphics.moveTo(-ssize, ssize);
    graphics.lineTo(ssize, -ssize);
    graphics.stroke();
    graphics.fill();
    return shape;
};

function sequenceSymbol(block: TreeNodeShape) {
    // var shape = new createjs.Shape();
    var shape = new cc.Node();
    block.node.addChild(shape);
    let graphics = shape.addComponent(cc.Graphics);
    var w = block.node.width;
    var h = block.node.height;
    var swidth = h / 20;
    var ssize = h / 4;
    var scolor = settings.get('block_symbol_color');
    graphics.lineWidth = swidth;
    graphics.fillColor = scolor;
    graphics.strokeColor = scolor;
    graphics.moveTo(-ssize, 0);
    graphics.lineTo(ssize, 0);
    // graphics.drawPolyStar(ssize / 2, 0, ssize / 2, 3, 0, 0);
    graphics.stroke();
    graphics.fill();
    graphics.moveTo(ssize - 2, -ssize / 2);
    graphics.lineTo(ssize - 2, ssize / 2)
    graphics.lineTo(ssize * 2 - 2, 0)
    graphics.lineTo(ssize - 2, -ssize / 2)
    graphics.fill();
    return shape;
};

function memsequenceSymbol(block: TreeNodeShape) {
    var shape = new cc.Node();
    block.node.addChild(shape);
    let graphics = shape.addComponent(cc.Graphics);
    var w = block.node.width;
    var h = block.node.height;
    var swidth = h / 20;
    var ssize = h / 4;
    var scolor = settings.get('block_symbol_color');
    graphics.lineWidth = swidth;
    graphics.fillColor = scolor;
    graphics.strokeColor = scolor;
    // graphics.setStrokeStyle(swidth, 'round');
    // graphics.beginStroke(scolor);
    // graphics.beginFill(scolor);
    // graphics.drawPolyStar(0, -ssize * 0.75, ssize / 2, 6, ssize / 10, 0);

    // graphics.setStrokeStyle(swidth, 'round');
    // graphics.beginStroke(scolor);
    // graphics.beginFill(scolor);
    graphics.moveTo(-ssize, ssize / 2);
    graphics.lineTo(ssize, ssize / 2);

    graphics.circle(0, -ssize / 2, swidth * 2);
    // graphics.drawPolyStar(ssize / 2, ssize / 2, ssize / 2, 3, 0, 0);
    graphics.stroke();
    graphics.fill();
    graphics.moveTo(ssize - 2, 0);
    graphics.lineTo(ssize - 2, ssize)
    graphics.lineTo(ssize * 2 - 2, ssize / 2)
    graphics.lineTo(ssize - 2, 0)
    graphics.fill();

    return shape;
};

function prioritySymbol(block: TreeNodeShape) {
    var shape = new cc.Node();
    block.node.addChild(shape);
    let graphics = shape.addComponent(cc.Graphics);
    var w = block.node.width;
    var h = block.node.height;
    var swidth = h / 20;
    var ssize = h / 8;
    var scolor = settings.get('block_symbol_color');
    graphics.lineWidth = swidth;
    graphics.fillColor = scolor;
    graphics.strokeColor = scolor;
    // graphics.setStrokeStyle(swidth, 'round');
    // graphics.beginStroke(scolor);
    graphics.arc(0, ssize, ssize, 3.141561, -Math.PI / 2, false);
    graphics.lineTo(0, -ssize);
    // graphics.beginFill(scolor);
    graphics.stroke();
    graphics.circle(0, -ssize * 2, swidth / 2);
    graphics.fill();
    // graphics.endFill();
    // graphics.endStroke();

    return shape;
};

function memprioritySymbol(block: TreeNodeShape) {
    var shape = new cc.Node();
    block.node.addChild(shape);
    let graphics = shape.addComponent(cc.Graphics);

    var w = block.node.width;
    var h = block.node.height;
    var swidth = h / 20;
    var ssize = h / 8;
    var scolor = settings.get('block_symbol_color');
    graphics.lineWidth = swidth;
    graphics.fillColor = scolor;
    graphics.strokeColor = scolor;
    graphics.arc(-ssize, ssize, ssize, 3.141561, -Math.PI / 2, false);
    graphics.lineTo(-ssize, -ssize);
    graphics.stroke();
    graphics.circle(-ssize, -ssize * 2, swidth / 2);
    graphics.circle(ssize, 0, swidth * 2);
    // graphics.drawPolyStar(ssize * 1.5, 0, ssize / 2, 6, ssize / 10, 0);

    graphics.fill();

    return shape;
};

export function textSymbol(block: TreeNodeShape) {
    let node = new cc.Node();
    node.color = settings.get('block_symbol_color');
    let text = node.addComponent(cc.Label);
    text.lineHeight = text.fontSize = 18;
    text.string = block.getTitle();
    block.node.addChild(node);
    return node;
};
export const SYMBOLS = {
    'Root': rootSymbol,
    'Sequence': sequenceSymbol,
    'Priority': prioritySymbol,
    'MemSequence': memsequenceSymbol,
    'MemPriority': memprioritySymbol,
};