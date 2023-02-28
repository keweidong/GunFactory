import App from "../../../../../../core/App";
import NodePool from "../../../../../../core/utils/NodePool";
import { DebugUI } from "../../../../GameUI/DebugUI";
import { GameUtils } from "../../../GameUtils";
import ScenegZone from "../SceneZone";
import MapMsr from "./MapMsr";


const { ccclass, property, menu, executeInEditMode, playOnFocus } = cc._decorator;
// @executeInEditMode
// @playOnFocus
@ccclass
@menu("game/map/MapEditor")
export default class MapEditor extends cc.Component {
    public mapMsr: MapMsr = null;
    @property({
        type: NodePool,
        editorOnly: true
    })
    protected gridCrossPool: NodePool = null;

    /** 地图格子列数 */
    protected col: number = null;
    /** 地图格子行数 */
    protected row: number = null;

    /** 墙 */
    @property(cc.Node)
    protected wallLayer: cc.Node = null;
    @property(cc.Node)
    protected roleLayer: cc.Node = null;
    protected _tempPos = cc.v2(0, 0);
    onLoad() {

        if (!CC_EDITOR) {
            this.gridCrossPool = App.NodePoolMsr.gridCrossPool;
        }
    }

    public init(world: ScenegZone) {
        if (CC_DEBUG) {
            App.DebugUtils.isDebug && this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            if (App.DebugUtils.isDebug) {
                App.NotificationCenter.addListener(DebugUI.SHOW_MAP, this.draw, this);
            };
        }
    }
    public onDestroy() {
        App.NotificationCenter.removeListener(DebugUI.SHOW_MAP, this.draw, this);
    }

    protected isEditor: boolean = false;
    public resetView() {
        for (let i = 0; i < this.node.childrenCount; i++) {
            let child = this.node.children[i];
            this.gridCrossPool.push(child);
        }
        this.node.removeAllChildren();
        this.isEditor = false;

    }
    public preView() {
        this.draw();
        this.isEditor = true;

    }
    protected onTouchStart(event: cc.Event.EventTouch) {
        this.node.convertToNodeSpaceAR(event.getLocation(), this._tempPos);
        let { x: ex, y: ey } = GameUtils.convertXYToCell(this._tempPos.x, this._tempPos.y);
        Log.trace(`坐标(${ex}, ${ey})(${this._tempPos.x}, ${this._tempPos.y})`)
    }
    /**
     * 操作家具造成的地图数据更新
     * @param handle 家具handle
     * @param value 是否摆放 0为摆放 1为移除
     */
    protected updateMapData(handle: string, value: number) {
    }



    public updateMap() {
        this.mapMsr.mapData.isChangeData = true;
    }

    protected curNodeList: cc.Node[] = [];
    protected curNode: cc.Node = null;

    /** 恢复节点 */
    protected resetNode() {
        this.curNodeList = [];
        this.curNode = null;
    }

    // protected generator: Generator = null;
    update() {
        // if (CC_DEBUG && this.mapMsr && this.mapMsr.mapData ) {
        //     this.mapMsr.mapData.isChangeData = false;
        //     if (CC_EDITOR) {
        //         var rowCnt = 25;
        //         var colCnt = 15;
        //     } else {
        //         var rowCnt = GameUtils.rowCnt;
        //         var colCnt = GameUtils.colCnt;
        //     }
        //     let grid = this.mapMsr.silzAstar.getGrid();
        //     for (let i = 0; i < rowCnt; i++) {
        //         for (let j = 0; j < colCnt; j++) {
        //             let gridCross = this.node.children[i * colCnt + j];
        //             if (gridCross) {
        //                 // if (this.curNodeList.indexOf(gridCross) > -1) {
        //                 //     gridCross.color = cc.Color.BLACK;
        //                 //     continue;
        //                 // }
        //                 if (grid.getNode(j, i).walkable) {
        //                     gridCross.color = cc.Color.WHITE;
        //                 }
        //                 else {
        //                     gridCross.color = cc.Color.RED;
        //                 }
        //             }
        //         }
        //     }
        // }
    }
    protected isShow: boolean = false;
    public draw() {
        if (this.isShow) {
            for (let i = this.node.childrenCount - 1; i >= 0; i--) {
                this.gridCrossPool.push(this.node.children[i]);
            }
        } else {
            if (CC_EDITOR) {
                var rowCnt = 25;
                var colCnt = 15;
                var cellWidth = GameUtils.cellWidth;
            } else {
                var rowCnt = this.row = GameUtils.rowCnt;
                var colCnt = this.col = GameUtils.colCnt;
                var cellWidth = GameUtils.cellWidth;
            }
            // if (!CC_DEBUG) {
            //     return;
            // }
            let grid = this.mapMsr.silzAstar.getGrid();
            for (let i = 0; i < rowCnt; i++) {
                for (let j = 0; j < colCnt; j++) {
                    let gridCross = this.gridCrossPool.pop();
                    gridCross.width = gridCross.height = cellWidth - 4;
                    gridCross.opacity = 255;
                    if (grid.getNode(j, i).walkable) {
                        gridCross.color = cc.Color.WHITE;
                    } else {
                        gridCross.color = cc.Color.RED;
                    }
                    this.node.addChild(gridCross);
                    // yield;
                }
            }
            this.mapMsr.mapData.isChangeData = true;
        }
        this.isShow = !this.isShow;
    }
}