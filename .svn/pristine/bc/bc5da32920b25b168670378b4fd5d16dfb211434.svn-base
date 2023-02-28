
export class DebugTree extends b3.BehaviorTree {
    /**
         * Propagates the tick signal through the tree, starting from the root.
         *
         * This method receives a target object of any type (Object, Array,
         * DOMElement, whatever) and a `Blackboard` instance. The target object has
         * no use at all for all Behavior3JS components, but surely is important
         * for custom nodes. The blackboard instance is used by the tree and nodes
         * to store execution variables (e.g., last node running) and is obligatory
         * to be a `Blackboard` instance (or an object with the same interface).
         *
         * Internally, this method creates a Tick object, which will store the
         * target and the blackboard objects.
         *
         * Note: BehaviorTree stores a list of open nodes from last tick, if these
         * nodes weren't called after the current tick, this method will close them
         * automatically.
         *
         * @method tick
         * @param {Object} target A target object.
         * @param {Blackboard} blackboard An instance of blackboard object.
         * @return {Constant} The tick signal state.
         **/
    tick(target: Object, blackboard: b3.Blackboard) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an ' +
            'instance of b3.Blackboard';
        }

        /* CREATE A TICK OBJECT */
        let tick = new b3.Tick();
        tick.debug = this.debug;
        tick.target = target;
        tick.blackboard = blackboard;
        tick.tree = this;

        /* TICK NODE */
        let state = this.root._execute(tick);

        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        let lastOpenNodes = blackboard.get('openNodes', this.id);
        let currOpenNodes = tick._openNodes.slice(0);

        // does not close if it is still open in this tick
        let start = 0;
        let i;
        for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
            start = i + 1;
            blackboard.get('openNodes', this.id);
            if (lastOpenNodes[i] !== currOpenNodes[i]) {
                break;
            }
        }

        // close the nodes
        for (i = lastOpenNodes.length - 1; i >= start; i--) {
            lastOpenNodes[i]._close(tick);
        }

        /* POPULATE BLACKBOARD */
        blackboard.set('openNodes', currOpenNodes, this.id);
        blackboard.set('nodeCount', tick._nodeCount, this.id);

        return state;
    }
}