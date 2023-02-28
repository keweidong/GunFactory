
import BaseAction from "./BaseAction";
import TreeNodeShape, { State } from "./TreeNodeShape";

export default class BehaviorNodeProxy extends BaseAction {
    /**
     *
     */
    constructor() {
        super();

    }
    public treeNodeShape: TreeNodeShape = null;



    public runningFinishTime: number = 0;

    /**
       * Enter method, override this to use. It is called every time a node is
       * asked to execute, before the tick itself.
       *
       * @method enter
       * @param {Tick} tick A tick instance.
       **/
    enter(tick: b3.Tick): void {
        // this.log("enter");
    }
    /**
     * Open method, override this to use. It is called only before the tick
     * callback and only if the not isn't closed.
     *
     * Note: a node will be closed if it returned `RUNNING` in the tick.
     *
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick: b3.Tick): void {
        if (this.treeNodeShape.isRunningMode) {
            this.runningFinishTime = Date.now() + this.treeNodeShape.runningTime;
        }
    }
    /**
     * Tick method, override this to use. This method must contain the real
     * execution of node (perform a task, call children, etc.). It is called
     * every time a node is asked to execute.
     *
     * @method tick
     * @param {Tick} tick A tick instance.
     **/
    tick(tick: b3.Tick) {
        if (this.treeNodeShape.isRunningMode) {
            if (Date.now() >= this.runningFinishTime) {
                return State.SUCCESS;
            } else {
                return State.RUNNING;
            }
        }
        return this.treeNodeShape.result;
    }
    /**
     * Close method, override this to use. This method is called after the tick
     * callback, and only if the tick return a state different from
     * `RUNNING`.
     *
     * @method close
     * @param {Tick} tick A tick instance.
     **/
    close(tick: b3.Tick): void {

    }
    /**
     * Exit method, override this to use. Called every time in the end of the
     * execution.
     *
     * @method exit
     * @param {Tick} tick A tick instance.
     **/
    exit(tick: b3.Tick): void {

    }
}