import { GameUtils } from "../../../GameUtils";
import ScenegZone from "../SceneZone";
import { MapData } from "./MapData";
import MapEditor from "./MapEditor";
import { SilzAstar } from "./SilzAstar";


export const enum MapType {
    /** 地毯 */
    ditan,
    /** 会遮挡 */
    ward,
}
// const { ccclass, property, menu, executeInEditMode } = cc._decorator;
// @ccclass
// @executeInEditMode
// @menu("game/map/MapMsr")
export default class MapMsr {
    /**地图数据 */
    public mapData: MapData = null;
    public mapEditor: MapEditor = null;

    public scene: ScenegZone = null;

    public silzAstar: SilzAstar = null;
    protected _tempPos = cc.v2(0, 0);

    // @property({ tooltip: "格子大小" })
    _cellWidth: number = 50;
    // @property({ tooltip: "格子大小" })
    public set cellWidth(v: number) {
        this._cellWidth = v;
    }
    public get cellWidth() {
        return this._cellWidth;
    }

    /** 计算格子 */
    calMapSize(width: number = 800, height: number = 850) {
        let rowCnt = Math.floor(height / this._cellWidth);
        let colCnt = Math.floor(width / this._cellWidth);
        this.mapData.init(rowCnt, colCnt);
        GameUtils.init(this._cellWidth, this._cellWidth, rowCnt, colCnt);
    }
    public firstEnter() {
        if (!this.mapData) {
            this.mapData = new MapData();
            this.calMapSize(this.scene.gameView.roleLayer.width, this.scene.gameView.roleLayer.height);
            for (const block of this.scene.gameView.blocks) {
                if (block) {
                    block.cal();
                    //将桌子位置信息写入地图数据,防止寻路的时候从桌子穿过
                    this.mapData.updateData(block.pos.x, block.pos.y, block.pos.width, block.pos.height, 0);
                }
            }
            if (this.silzAstar) {
                this.silzAstar.makeGrid(this.mapData.data);
            }
            else {
                this.silzAstar = new SilzAstar(this.mapData.data, this._cellWidth, this._cellWidth);
            }
            this.scene.gameView.mapEditor.mapMsr = this;
            this.scene.gameView.mapEditor.init(null);
        }
    }
    public onEnter() {

    }

    public init(scene: ScenegZone) {
        this.scene = scene;

        // CC_DEBUG && this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

        // this.mapEditor.init(scene);
    }

    protected onTouchStart(event: cc.Event.EventTouch) {
        // this.node.convertToNodeSpaceAR(event.getLocation(), this._tempPos);
        // let { x: ex, y: ey } = GameUtils.convertXYToCell(this._tempPos.x, this._tempPos.y);
        // Log.trace(`坐标(${ex}, ${ey})(${this._tempPos.x}, ${this._tempPos.y})`)
    }


    /** 更新地图 */
    public updateMap() {
        this.mapEditor.updateMap();
    }
}