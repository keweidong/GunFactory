/*
 * @Author: He 
 * @Date: 2020-01-22 14:08:07 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-05 12:18:29
 */
/**
 * 地图数据
 */
export class MapData {
    rows: number = 0;
    cols: number = 0;
    width: number = 0;
    height: number = 0;
    /**地图数据 */
    data: number[][] = null;

    public isChangeData: boolean = false;

    public init(rows: number, cols: number) {
        this.rows = rows;//行,y轴
        this.cols = cols;//列,x轴
        this.data = [];
        for (let i = 0; i < rows; i++) {
            this.data[i] = [];//y
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 1;
            }
        }
    }

    updateData(cellX: number, cellY: number, width: number, height: number, value: number) {
        let endX = cellX + width;
        let jLen = cellY + height;
        for (let i = cellX; i < endX; i++) {
            for (let j = cellY; j < jLen; j++) {
                this.data[j][i] = value;
            }
        }
        // CC_DEBUG && Log.trace(this.data);
        this.isChangeData = true;
    }
}