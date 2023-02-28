/*
 * @Author: He 
 * @Date: 2019-12-27 18:33:09 
 * @Last Modified by: He
 * @Last Modified time: 2020-06-10 12:07:29
 */
import App from "../../../core/App";
import { Dir } from "../../../core/utils/MathUtils";
import { TimerManager } from "../../../core/utils/TimeManager";

// let timeClass = TimerManager;
export namespace GameUtils {
    const _convertUsePoint: cc.Vec2 = cc.v2();
    export let TimerManager: TimerManager;
    // export 
    // export let Scheduler = new cc.Scheduler();
    export let cellWidth = 40;
    export let cellHeight = 40;
    export let rowCnt = 0;
    export let colCnt = 0;
    export function init(_cellWidth: number, _cellHeight: number, _rowCnt: number, _colCnt: number) {
        cellWidth = _cellWidth;
        cellHeight = _cellHeight;
        rowCnt = _rowCnt;
        colCnt = _colCnt;
    }
    export function convertCellToCenterXY(col: number, row: number, result: { x: number, y: number } = _convertUsePoint): { x: number, y: number } {
        result.x = (col + 0.5) * cellWidth;
        result.y = (row + 0.5) * cellHeight;
        return result;
    }
    export function convertCellToXY(col: number, row: number, result: { x: number, y: number } = _convertUsePoint): { x: number, y: number } {
        result.x = col * cellWidth;
        result.y = row * cellHeight;
        return result;
    }

    export function convertXYToCell(x: number, y: number, result: { x: number, y: number } = _convertUsePoint): { x: number, y: number } {
        result.x = Math.floor(x / cellWidth);
        result.y = Math.floor(y / cellHeight);
        return result;
    }

    // export function convertXYToAoi(x: number, y: number): cc.Vec2 {
    //     _convertUsePoint.x = Math.floor(x / RpgGameData.GameAoiWidth);
    //     _convertUsePoint.y = Math.floor(y / RpgGameData.GameAoiHeight);
    //     return _convertUsePoint;
    // }

    export function computeGameObjDir(currX: number, currY: number, gotoX: number, gotoY: number): Dir {
        var radian: number = App.MathUtils.getRadian2(currX, currY, gotoX, gotoY);

        var angle: number = App.MathUtils.getAngle(radian);
        var dir: Dir;
        if (angle == 0) {
            dir = Dir.Right;
        }
        else if (angle == 90) {
            dir = Dir.Bottom;
        }
        else if (angle == 180) {
            dir = Dir.Left;
        }
        else if (angle == -90) {
            dir = Dir.Top;
        }
        else if (angle > 0 && angle < 90) {
            dir = Dir.BottomRight;
        }
        else if (angle > 90 && angle < 180) {
            dir = Dir.BottomLeft;
        }
        else if (angle > -180 && angle < -90) {
            dir = Dir.TopLeft;
        }
        else if (angle > -90 && angle < 0) {
            dir = Dir.TopRight;
        }
        return dir;
    }
}
