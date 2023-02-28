import BaseView from "../core/mvc/view/BaseView";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LayerManager extends cc.Component {
    // App.ViewManager.uiRoot
    public static Game_Main: string = "Game_Main";
    public static UI_Main: string = "UI_Main";
    public static UI_Popup: string = "UI_Popup";
    public static UI_Tips: string = "UI_Tips";
    public static UI_Guide: string = "UI_Guide";
    public static layers: Map<string, cc.Node> = new Map();
    @property(cc.Node)
    protected layerBg: cc.Node = null;
    public static layerBg: cc.Node = null;
    public static getLayer(key: string) {
        return this.layers.get(key);
    }
    /** 当前有灰色背景的窗口 */
    public static curBgView: BaseView;
    start() {
        let Game_Main = this.createLayer(LayerManager.Game_Main);
        let UI_Main = this.createLayer(LayerManager.UI_Main);
        let popNode = this.createLayer(LayerManager.UI_Popup);
        // if (Platform.instance.checkIsNotch()) {
        //     let widget = popNode.getComponent(cc.Widget);
        //     widget.top = 40;
        //     widget = UI_Main.getComponent(cc.Widget);
        //     widget.top = 40;
        //     widget = Game_Main.getComponent(cc.Widget);
        //     widget.top = 40;
        // }
        this.createLayer(LayerManager.UI_Tips);
        this.createLayer(LayerManager.UI_Guide);
        if (this.layerBg) {
            this.layerBg.removeFromParent(false);
            LayerManager.layerBg = this.layerBg;
            this.layerBg.on(cc.Node.EventType.TOUCH_END, this.onTouchBg, this);
        }
    }
    public static reset() {
        LayerManager.layers.forEach((node: cc.Node) => {
            cc.game.removePersistRootNode(node);
        })
    }
    public createLayer(name: string) {
        let lastNode = LayerManager.getLayer(name);
        let node = cc.find(name);
        if (lastNode && node !== lastNode) {
            cc.game.removePersistRootNode(lastNode);
            if (lastNode.parent) {
                lastNode.parent.removeChild(lastNode);
            }
        }

        node.width = cc.winSize.width;
        node.height = cc.winSize.height;
        node.x = node.width / 2;
        node.y = node.height / 2;
        cc.game.addPersistRootNode(node);//将层级节点设置为常驻节点,防止切换场景的时候被自动销毁
        LayerManager.layers.set(name, node);
        return node;
    }

    onTouchBg() {
        if (LayerManager.curBgView && LayerManager.curBgView.onTouchBg) {
            LayerManager.curBgView.onTouchBg();
        }
    }
}