import App from "../../../../../../../core/App";
import { GameUtils } from "../../../../GameUtils";
import GameObject, { Dir } from "../GameObject";
import { IMyComponent } from "./IMyComponent";

const tempPos = cc.v2();
const { ccclass, property } = cc._decorator;
@ccclass
export default class MoveComponent extends cc.Component implements IMyComponent {
    private endX: number = 0;
    private endY: number = 0;
    private radian: number = 0;
    private pathNode: cc.Vec2 = null;
    private distance: number = 0;


    /**移动速度 */
    public Sp: number = 2;
    path: cc.Vec2[] = [];
    public entity: GameObject = null;
    public init() {
        this.pathNode = null;
        this.path.length = 0;
    }
    onEnable() {
        //     this.entity.roleMsr.addRoutineObj(this);
        // cc.log("MoveComponent onEnable")
    }



    onDisable() {
        // cc.log("MoveComponent onDisable")
        // this.entity.roleMsr.removeRoutineObj(this);
    }
    public routine(advancedTime: number): void {
        if (this.pathNode) {
            this.move(advancedTime);
        } else {
            if (!this.path.length) {
                this.enabled = false;
                // this.entity.dbNode.playAnimation("Idle", 0);
                // let pos = GameUtils.convertXYToCell(this.node.x, this.node.y);
                // this.entity.cellX = pos.x;
                // this.entity.cellY = pos.y;
                this.entity.roleMsr.removeRoutineObj(this);
                return;
            }
            this.nextNode();
            if (this.pathNode) {
                this.move(advancedTime);
            }
        }
    }
    public stopMove() {
        if (this.enabled) {
            this.enabled = false;
            this.entity.roleMsr.removeRoutineObj(this);
            this.pathNode = null;
            this.path.length = 0;
        }
    }

    public moveByTween(paths: cc.Vec2[]) {
        let tween = cc.tween(this.node);
        let arrLen = paths.length;
        for (let i = 0; i < arrLen; i++) {
            const distance = App.MathUtils.getDistance(this.node.x, this.node.y, paths[i].x, paths[i].y);
            tween = tween.to(distance / this.Sp / 32, {
                position: paths[i]
            });
        }
        return tween;
    }

    /**
     * 移动到某个点
     */
    public moveTo(gotoX: number, gotoY: number): void {
        this.enabled = true;
        // let pathNode: PathNode = ObjectPool.pop("PathNode");
        // pathNode.x = gotoX;
        // pathNode.y = gotoY;
        this.path.push(cc.v2(gotoX, gotoY));
        // this.entity.state = State.MOVE;
        this.entity.roleMsr.addRoutineObj(this);
    }

    public getPathByAstar(startX: number, startY: number, gotoX: number, gotoY: number) {
        let paths = this.entity.roleMsr.mapMsr.silzAstar.find(startX, startY, gotoX, gotoY);
        let movePaths = [];
        if (paths && paths.length) {//如果找得到移动过去的路径
            paths.shift();
            for (const iterator of paths) {
                movePaths.push(GameUtils.convertCellToCenterXY(iterator.x, iterator.y, cc.v2()))
            }
            // tween = move.moveByTween(movePaths);
        } else {//找不到路径就直接穿过去
            movePaths.push([GameUtils.convertCellToCenterXY(gotoX, gotoY, cc.v2()) as cc.Vec2])
            // tween = move.moveByTween([GameUtils.convertCellToCenterXY(tempPos.x, tempPos.y, cc.v2()) as cc.Vec2]);
        }
        return movePaths;
    }

    public moveByPaths(paths: cc.Vec2[]) {
        this.enabled = true;
        // for (const iterator of paths) {
        //     let pos = GameUtils.convertCellToCenterXY(iterator.x, iterator.y);
        //     this.path.push(cc.v2(pos.x, pos.y));
        // }
        this.path = this.path.concat(paths);
        // this.entity.state = State.MOVE;
        this.entity.roleMsr.addRoutineObj(this);
    }
    /**
     * 移动到某个格子
     * @param gotoX 
     * @param gotoY 
     */
    public moveToCell(gotoX: number, gotoY: number) {
        let pos = GameUtils.convertCellToCenterXY(gotoX, gotoY);
        this.moveTo(pos.x, pos.y)
    }
    private nextNode(): void {
        let p = this.pathNode = this.path.shift();
        this.endX = p.x;
        this.endY = p.y;
        // p.
        this.radian = App.MathUtils.getRadian2(this.node.x, this.node.y, this.endX, this.endY);
        this.distance = App.MathUtils.getDistance(this.node.x, this.node.y, this.endX, this.endY);
        this.entity.dir = App.MathUtils.computeGameObjDir(p.x, p.y, this.node.x, this.node.y);
        if (
            this.entity.dir === Dir.Left
            || this.entity.dir === Dir.TopLeft
            || this.entity.dir === Dir.BottomLeft
        ) {
            this.node.scaleX = -1;
        } else {
            this.node.scaleX = 1;
        }
    }
    exit() {

    }
    private move(advancedTime: number): void {
        // if (advancedTime > 200) {
        //     Log.trace("时间异常", advancedTime, cc.director.getTotalTime());
        // }
        var useSpeed: number = this.Sp * 32 * advancedTime / 1000;
        var speedX: number = Math.cos(this.radian) * useSpeed;
        var speedY: number = Math.sin(this.radian) * useSpeed;
        this.node.x += speedX;
        this.node.y += speedY;
        this.distance -= useSpeed;
        if (this.distance <= 0) {
            if (!this.path || !this.path.length) {
                this.node.x = this.endX;
                this.node.y = this.endY;
            }
            this.pathNode = null;
        }
    }
}