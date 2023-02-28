import { settings } from "./SettingsManager";
import TreeNodeShape from "./TreeNodeShape";


var makeRect = function (shape: {
    graphics: cc.Graphics
}, w: number, h: number, radius: number, bg_color: cc.Color, border_width: number, border_color: cc.Color) {
    shape.graphics.fillColor = bg_color;
    shape.graphics.strokeColor = border_color;
    shape.graphics.lineWidth = border_width
    shape.graphics.roundRect(-w / 2, -h / 2, w, h, radius);
    shape.graphics.stroke();
    shape.graphics.fill();
};

var makeAnchor = function (shape: {
    graphics: cc.Graphics
}, x, y, radius, bg_color, border_width, border_color) {
    shape.graphics.fillColor = bg_color;
    shape.graphics.strokeColor = border_color;
    // shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.lineWidth = border_width
    // shape.graphics.beginStroke(border_color);
    shape.graphics.circle(x, y, radius);
    shape.graphics.stroke();
    shape.graphics.fill();
};
var makeTree = function (shape: TreeNodeShape, w, h, radius, bg_color, border_width, border_color) {
    shape.graphics.fillColor = bg_color;
    shape.graphics.strokeColor = border_color;
    shape.graphics.lineWidth = border_width
    shape.graphics.moveTo(-w / 2, 0);
    shape.graphics.lineTo(-w / 2 + 10, -h / 2);
    shape.graphics.lineTo(w / 2 - 10, -h / 2);
    shape.graphics.lineTo(w / 2, 0);
    shape.graphics.lineTo(w / 2 - 10, h / 2);
    shape.graphics.lineTo(-w / 2 + 10, h / 2);
    shape.graphics.lineTo(-w / 2, 0);
    shape.graphics.stroke();
    shape.graphics.fill();
};

var makeEllipse = function (shape: TreeNodeShape, w, h, bg_color, border_width, border_color) {
    shape.graphics.fillColor = bg_color;
    shape.graphics.strokeColor = border_color;
    shape.graphics.lineWidth = border_width
    shape.graphics.ellipse(0, 0, w, h);
    shape.graphics.stroke();
    shape.graphics.fill();
};

var makeRhombus = function (shape: TreeNodeShape, w, h, bg_color, border_width, border_color) {
    shape.graphics.fillColor = bg_color;
    shape.graphics.strokeColor = border_color;
    shape.graphics.lineWidth = border_width
    shape.graphics.moveTo(0, h / 2);
    shape.graphics.lineTo(w / 2, 0);
    shape.graphics.lineTo(0, -h / 2);
    shape.graphics.lineTo(-w / 2, 0);
    shape.graphics.lineTo(0, h / 2);
    shape.graphics.stroke();
    shape.graphics.fill();
};

function rootShape(block: TreeNodeShape) {
    var w = block.node.width;
    var h = block.node.height;
    var anchorOffsetX = settings.get('anchor_offset_x');
    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
        x = w / 2 + anchorOffsetX;
    } else {
        y = h / 2 + anchorOffsetX;
    }

    makeAnchor(block, x, y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeRect(block, w, h, 15,
        settings.get('root_color'),
        settings.get('block_border_width'),
        settings.get('block_border_color')
    );
    // return shape;
};

function compositeShape(block: TreeNodeShape) {
    var bounds = block._displaySymbol.getContentSize();
    var _width = 0;

    if (bounds) { _width = bounds.width + 20; }

    var w = Math.max(_width, block.node.width);
    var h = block.node.height;
    var anchorOffsetX = settings.get('anchor_offset_x');
    block.node.width = w;
    block.node.height = h;
    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
        x = w / 2 + anchorOffsetX;
    } else {
        y = h / 2 + anchorOffsetX;
    }
    makeAnchor(block, x, y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeAnchor(block, -x, -y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeRect(block, w, h, 15,
        settings.get('composite_color'),
        settings.get('block_border_width'),
        settings.get('block_border_color')
    );
    // return shape;
};

function decoratorShape(block: TreeNodeShape) {
    var bounds = block._displaySymbol.getContentSize();

    var w = Math.max(bounds.width + 40, block.node.width);
    var h = Math.max(bounds.height + 50, block.node.height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    block.node.width = w;
    block.node.height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
        x = w / 2 + anchorOffsetX;
    } else {
        y = h / 2 + anchorOffsetX;
    }
    makeAnchor(block, x, y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeAnchor(block, -x, -y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );

    makeRhombus(block, w, h,
        settings.get('decorator_color'),
        settings.get('block_border_width'),
        settings.get('block_border_color')
    );
    // return shape;
};

function actionShape(block: TreeNodeShape) {
    var bounds = block._displaySymbol.getContentSize();
    var w = Math.max(bounds.width + 15, block.node.width);
    var h = Math.max(bounds.height + 15, block.node.height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    block.node.width = w;
    block.node.height = h;
    // var shape = block._displayShape;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
        x = w / 2 + anchorOffsetX;
    } else {
        y = h / 2 + anchorOffsetX;
    }
    makeAnchor(block, -x, -y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeRect(block, w, h, 15,
        settings.get('action_color'),
        settings.get('block_border_width'),
        settings.get('block_border_color')
    );
    // return shape;
};

function conditionShape(block: TreeNodeShape) {
    var bounds = block._displaySymbol.getContentSize();

    var w = Math.max(bounds.width + 15, block.node.width);
    var h = Math.max(bounds.height + 15, block.node.height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    block.node.width = w;
    block.node.height = h;

    makeAnchor(block, -w / 2 - anchorOffsetX, 0,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeEllipse(block, w / 2, h / 2,
        settings.get('condition_color'),
        settings.get('block_border_width'),
        settings.get('block_border_color')
    );
};

function treeShape(block: TreeNodeShape) {
    var bounds = block._displaySymbol.getContentSize();
    var w = Math.max(bounds.width + 15, block.node.width);
    var h = Math.max(bounds.height + 15, block.node.height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    block.node.width = w;
    block.node.height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
        x = w / 2 + anchorOffsetX;
    } else {
        y = h / 2 + anchorOffsetX;
    }
    makeAnchor(block, -x, -y,
        settings.get('anchor_radius'),
        settings.get('anchor_background_color'),
        settings.get('anchor_border_width'),
        settings.get('block_border_color')
    );
    makeTree(block, w, h, 15,
        settings.get('tree_color'),
        settings.get('block_border_width'),
        settings.get('block_border_color')
    );
    // return shape;
};

export const SHAPES = {
    'Root': rootShape,
    'tree': treeShape,
    'composite': compositeShape,
    'decorator': decoratorShape,
    'action': actionShape,
    'condition': conditionShape,
};
