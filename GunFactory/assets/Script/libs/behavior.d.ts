declare namespace b3 {
	/**
	 * List of internal and helper functions in Behavior3JS.
	 *
	 * @module functions
	**/
	/**
	* This function is used to create unique IDs for trees and nodes.
	*
	* (consult http://www.ietf.org/rfc/rfc4122.txt).
	*
	* @class createUUID
	* @constructor
	* @return {String} A unique ID.
	**/
	export function createUUID(): string;

}
declare namespace b3 {
	export const VERSION = "0.2.3";
	export enum STATE {
		NONE = 0,
		SUCCESS = 1,
		FAILURE = 2,
		RUNNING = 3,
		ERROR = 4
	}
	export const SUCCESS = STATE.SUCCESS;
	export const FAILURE = STATE.FAILURE;
	export const RUNNING = STATE.RUNNING;
	export const ERROR = STATE.ERROR;
	export enum Category {
		COMPOSITE = "composite",
		DECORATOR = "decorator",
		ACTION = "action",
		CONDITION = "condition",
		NONE = ""
	}
	export const COMPOSITE = Category.COMPOSITE;
	export const DECORATOR = Category.DECORATOR;
	export const ACTION = Category.ACTION;
	export const CONDITION = Category.CONDITION;

}
declare namespace b3 {
	/**
	* This action node returns `ERROR` always.
	*
	* @module b3
	* @class Error
	* @extends Action
	**/
	export class Error extends Action {
	    /**
	     * Creates an instance of Error.
	     * @memberof Error
	     */
		constructor();
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} Always return `ERROR`.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* This action node returns `FAILURE` always.
*
* @module b3
* @class Failer
* @extends Action
**/
	export class Failer extends Action {
	    /**
	     * Creates an instance of Failer.
	     * @memberof Failer
	     */
		constructor();
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} Always return `FAILURE`.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* This action node returns RUNNING always.
*
* @module b3
* @class Runner
* @extends Action
**/
	export class Runner extends Action {
	    /**
	     * Creates an instance of Runner.
	     * @memberof Runner
	     */
		constructor();
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} Always return `RUNNING`.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* This action node returns `SUCCESS` always.
*
* @module b3
* @class Succeeder
* @extends Action
**/
	export class Succeeder extends Action {
	    /**
	     * Creates an instance of Succeeder.
	     * @memberof Succeeder
	     */
		constructor();
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} Always return `SUCCESS`.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* Wait a few seconds.
*
* @module b3
* @class Wait
* @extends Action
**/
	export class Wait extends Action {
		endTime: number;
	    /**
	     * Creates an instance of Wait.
	     * @param {Object} settings Object with parameters
	     * @param {Number} settings.milliseconds Maximum time, in milliseconds, a child can execute.
	     * @memberof Wait
	     */
		constructor(milliseconds?: number);
	    /**
	     * Open method.
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE.SUCCESS | STATE.RUNNING;
	}

}
declare namespace b3 {
	/**
* MemPriority is similar to Priority node, but when a child returns a
* `RUNNING` state, its index is recorded and in the next tick the,
* MemPriority calls the child recorded directly, without calling previous
* children again.
*
* @module b3
* @class MemPriority
* @extends Composite
**/
	export class MemPriority extends Composite {
	    /**
	     * Creates an instance of MemPriority.
	     * @param {Object} params
	     * @param {Array} params.children
	     * @memberof MemPriority
	     */
		constructor(children?: BaseNode[]);
	    /**
	     * Open method.
	     * @method open
	     * @param {b3.Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* MemSequence is similar to Sequence node, but when a child returns a
* `RUNNING` state, its index is recorded and in the next tick the
* MemPriority call the child recorded directly, without calling previous
* children again.
*
* @module b3
* @class MemSequence
* @extends Composite
**/
	export class MemSequence extends Composite {
	    /**
	     * Creates an instance of MemSequence.
	     * @param {Object} params
	     * @param {Array} params.children
	     * @memberof MemSequence
	     */
		constructor(children?: BaseNode[]);
	    /**
	     * Open method.
	     * @method open
	     * @param {b3.Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* Priority ticks its children sequentially until one of them returns
* `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
* the priority also returns `FAILURE`.
*
* @module b3
* @class Priority
* @extends Composite
**/
	export class Priority extends Composite {
	    /**
	     * Creates an instance of Priority.
	     * @param {Object} params
	     * @param {Array} params.children
	     * @memberof Priority
	     */
		constructor(children?: BaseNode[]);
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
* The Sequence node ticks its children sequentially until one of them
* returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
* success state, the sequence also returns `SUCCESS`.
*
* @module b3
* @class Sequence
* @extends Composite
**/
	export class Sequence extends Composite {
	    /**
	     * Creates an instance of Sequence.
	     * @param {Object} params
	     * @param {Array} params.children
	     * @memberof Sequence
	     */
		constructor(children?: BaseNode[]);
	    /**
	     * Tick method.
	     * @method tick
	     * @param {b3.Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE;
	}

}
declare namespace b3 {
	/**
 * Action is the base class for all action nodes. Thus, if you want to create
 * new custom action nodes, you need to inherit from this class. For example,
 * take a look at the Runner action:
 *
 *     class Runner extends b3.Action {
 *       constructor(){
 *         super({name: 'Runner'});
 *       }
 *       tick(tick : Tick) {
 *         return b3.RUNNING;
 *       }
 *     };
 *
 * @module b3
 * @class Action
 * @extends BaseNode
 **/
	export class Action extends BaseNode {
	    /**
	     * Creates an instance of Action.
	     * @param {Object} options
	     * @param {String} options.name Node name. Default to `Action`.
	     * @param {String} options.title
	     * @param {Object} options.properties
	     * @memberof Action
	     */
		// constructor(params: Params);
		constructor(params?: Params);

	}

}
declare namespace b3 {
	export type IProperties = {
		[key: string]: any;
	};
	export interface Params {
		/**
		 * Node category. Must be `COMPOSITE`, `DECORATOR`, `ACTION` or
		 * `CONDITION`. This is defined automatically be inheriting the
		 * correspondent class.
		 *
		 * @member BaseNode#category
		 **/
		category?: Category,
		/**
		 * Node name. Must be a unique identifier,
		 * preferable the same name of the
		 * class. You have to set the node name in the prototype.
		 *
		 * @member BaseNode#name
		 **/
		name?: string,
		/**
		 * Node title.
		 *
		 * @optional
		 * @member BaseNode#title
		 **/
		title?: string,
		/**
		 * Node description.
		 *
		 * @member BaseNode#description
		 */
		description?: string,
		/**
		 * A dictionary (key, value) describing the node properties. Useful for
		 * defining custom variables inside the visual editor.
		 *
		 * @property properties
		 * @type {Object}
		 * @readonly
		 **/
		properties?: IProperties

		children?: BaseNode[];
	}
	/**
	 * The BaseNode class is used as super class to all nodes in BehaviorJS. It
	 * comprises all common variables and methods that a node must have to
	 * execute.
	 *
	 * **IMPORTANT:** Do not inherit from this class, use `Composite`,
	 * `Decorator`, `Action` or `Condition`, instead.
	 *
	 * The attributes are specially designed to serialization of the node in a
	 * JSON format. In special, the `parameters` attribute can be set into the
	 * visual editor (thus, in the JSON file), and it will be used as parameter
	 * on the node initialization at `BehaviorTree.load`.
	 *
	 * BaseNode also provide 5 callback methods, which the node implementations
	 * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See
	 * their documentation to know more. These callbacks are called inside the
	 * `_execute` method, which is called in the tree traversal.
	 *
	 * @module b3
	 * @class BaseNode
	 **/
	export class BaseNode {
	    /**
	     * Node category. Must be `COMPOSITE`, `DECORATOR`, `ACTION` or
	     * `CONDITION`. This is defined automatically be inheriting the
	     * correspondent class.
	     *
	     * @member BaseNode#category
	     **/
		category: Category;
	    /**
	     * Node name. Must be a unique identifier,
	     * preferable the same name of the
	     * class. You have to set the node name in the prototype.
	     *
	     * @member BaseNode#name
	     **/
		name: string;
	    /**
	     * Node title.
	     *
	     * @optional
	     * @member BaseNode#title
	     **/
		title: string;
	    /**
	     * Node description.
	     *
	     * @member BaseNode#description
	     */
		description: string;
	    /**
	     * A dictionary (key, value) describing the node properties. Useful for
	     * defining custom variables inside the visual editor.
	     *
	     * @property properties
	     * @type {Object}
	     * @readonly
	     **/
		properties: IProperties;
		id: string;
	    /**
	     * A dictionary (key, value) describing the node parameters. Useful for
	     * defining parameter values in the visual editor. Note: this is only
	     * useful for nodes when loading trees from JSON files.
	     *
	     * **Deprecated since 0.2.0. This is too similar to the properties
	     * attribute, thus, this attribute is deprecated in favor to
	     * `properties`.**
	     *
	     * @property {Object} parameters
	     * @deprecated since 0.2.0.
	     * @readonly
	     **/
		parameters: {};
		child: BaseNode;
		children: BaseNode[];
	    /**
	     * Initialization method.
	     * @method initialize
	     * @constructor
	     **/
		constructor(params?: Params);
	    /**
	     * This is the main method to propagate the tick signal to this node. This
	     * method calls all callbacks: `enter`, `open`, `tick`, `close`, and
	     * `exit`. It only opens a node if it is not already open. In the same
	     * way, this method only close a node if the node  returned a status
	     * different of `RUNNING`.
	     *
	     * @method _execute
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} The tick state.
	     * @protected
	     **/
		_execute(tick: Tick): STATE;
	    /**
	     * Wrapper for enter method.
	     * @method _enter
	     * @param {Tick} tick A tick instance.
	     * @protected
	     **/
		_enter(tick: Tick): void;
	    /**
	     * Wrapper for open method.
	     * @method _open
	     * @param {Tick} tick A tick instance.
	     * @protected
	     **/
		_open(tick: Tick): void;
	    /**
	     * Wrapper for tick method.
	     * @method _tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     * @protected
	     **/
		_tick(tick: Tick): STATE;
	    /**
	     * Wrapper for close method.
	     * @method _close
	     * @param {Tick} tick A tick instance.
	     * @protected
	     **/
		_close(tick: Tick): void;
	    /**
	     * Wrapper for exit method.
	     * @method _exit
	     * @param {Tick} tick A tick instance.
	     * @protected
	     **/
		_exit(tick: Tick): void;
	    /**
	     * Enter method, override this to use. It is called every time a node is
	     * asked to execute, before the tick itself.
	     *
	     * @method enter
	     * @param {Tick} tick A tick instance.
	     **/
		enter(tick: Tick): void;
	    /**
	     * Open method, override this to use. It is called only before the tick
	     * callback and only if the not isn't closed.
	     *
	     * Note: a node will be closed if it returned `RUNNING` in the tick.
	     *
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method, override this to use. This method must contain the real
	     * execution of node (perform a task, call children, etc.). It is called
	     * every time a node is asked to execute.
	     *
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     **/
		tick(tick: Tick): STATE;
	    /**
	     * Close method, override this to use. This method is called after the tick
	     * callback, and only if the tick return a state different from
	     * `RUNNING`.
	     *
	     * @method close
	     * @param {Tick} tick A tick instance.
	     **/
		close(tick: Tick): void;
	    /**
	     * Exit method, override this to use. Called every time in the end of the
	     * execution.
	     *
	     * @method exit
	     * @param {Tick} tick A tick instance.
	     **/
		exit(tick: Tick): void;
	}

}
declare namespace b3 {
	/**
* The BehaviorTree class, as the name implies, represents the Behavior Tree
* structure.
*
* There are two ways to construct a Behavior Tree: by manually setting the
* root node, or by loading it from a data structure (which can be loaded
* from a JSON). Both methods are shown in the examples below and better
* explained in the user guide.
*
* The tick method must be called periodically, in order to send the tick
* signal to all nodes in the tree, starting from the root. The method
* `BehaviorTree.tick` receives a target object and a blackboard as
* parameters. The target object can be anything: a game agent, a system, a
* DOM object, etc. This target is not used by any piece of Behavior3JS,
* i.e., the target object will only be used by custom nodes.
*
* The blackboard is obligatory and must be an instance of `Blackboard`. This
* requirement is necessary due to the fact that neither `BehaviorTree` or
* any node will store the execution variables in its own object (e.g., the
* BT does not store the target, information about opened nodes or number of
* times the tree was called). But because of this, you only need a single
* tree instance to control multiple (maybe hundreds) objects.
*
* Manual construction of a Behavior Tree
* --------------------------------------
*
*     var tree = new b3.BehaviorTree();
*
*     tree.root = new b3.Sequence({children:[
*       new b3.Priority({children:[
*         new MyCustomNode(),
*         new MyCustomNode()
*       ]}),
*       ...
*     ]});
*
*
* Loading a Behavior Tree from data structure
* -------------------------------------------
*
*     var tree = new b3.BehaviorTree();
*
*     tree.load({
*       'title'       : 'Behavior Tree title'
*       'description' : 'My description'
*       'root'        : 'node-id-1'
*       'nodes'       : {
*         'node-id-1' : {
*           'name'        : 'Priority', // this is the node type
*           'title'       : 'Root Node',
*           'description' : 'Description',
*           'children'    : ['node-id-2', 'node-id-3'],
*         },
*         ...
*       }
*     })
*
*
* @module b3
* @class BehaviorTree
**/
	export class BehaviorTree {
		isDebug: boolean;
	    /**
	     * The tree id, must be unique. By default, created with `createUUID`.
	     * @property {String} id
	     * @readOnly
	     **/
		id: string;
	    /**
	     * The tree title.
	     * @property {String} title
	     * @readonly
	     **/
		title: string;
	    /**
	     * Description of the tree.
	     * @property {String} description
	     * @readonly
	     **/
		description: string;
	    /**
	     * A dictionary with (key-value) properties. Useful to define custom
	     * variables in the visual editor.
	     *
	     * @property {Object} properties
	     * @readonly
	     **/
		properties: {};
	    /**
	     * The reference to the root node. Must be an instance of `BaseNode`.
	     * @property {BaseNode} root
	     **/
		root: BaseNode;
	    /**
	     * The reference to the debug instance.
	     * @property {Object} debug
	     **/
		debug: any;
	    /**
	     * Initialization method.
	     * @method initialize
	     * @constructor
	     **/
		constructor();
	    /**
	     * This method loads a Behavior Tree from a data structure, populating this
	     * object with the provided data. Notice that, the data structure must
	     * follow the format specified by Behavior3JS. Consult the guide to know
	     * more about this format.
	     *
	     * You probably want to use custom nodes in your BTs, thus, you need to
	     * provide the `names` object, in which this method can find the nodes by
	     * `names[NODE_NAME]`. This variable can be a namespace or a dictionary,
	     * as long as this method can find the node by its name, for example:
	     *
	     *     //json
	     *     ...
	     *     'node1': {
	     *       'name': MyCustomNode,
	     *       'title': ...
	     *     }
	     *     ...
	     *
	     *     //code
	     *     var bt = new b3.BehaviorTree();
	     *     bt.load(data, {'MyCustomNode':MyCustomNode})
	     *
	     *
	     * @method load
	     * @param {Object} data The data structure representing a Behavior Tree.
	     * @param {Object} [names] A namespace or dict containing custom nodes.
	     **/
		load(data: any, names?: any): void;
	    /**
	     * This method dump the current BT into a data structure.
	     *
	     * Note: This method does not record the current node parameters. Thus,
	     * it may not be compatible with load for now.
	     *
	     * @method dump
	     * @return {Object} A data object representing this tree.
	     **/
		dump(): {
			[key: string]: any;
		};
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
		tick(target: Object, blackboard: Blackboard): STATE;
	}

}
declare namespace b3 {
	/**
 * The Blackboard is the memory structure required by `BehaviorTree` and its
 * nodes. It only have 2 public methods: `set` and `get`. These methods works
 * in 3 different contexts: global, per tree, and per node per tree.
 *
 * Suppose you have two different trees controlling a single object with a
 * single blackboard, then:
 *
 * - In the global context, all nodes will access the stored information.
 * - In per tree context, only nodes sharing the same tree share the stored
 *   information.
 * - In per node per tree context, the information stored in the blackboard
 *   can only be accessed by the same node that wrote the data.
 *
 * The context is selected indirectly by the parameters provided to these
 * methods, for example:
 *
 *     // getting/setting variable in global context
 *     blackboard.set('testKey', 'value');
 *     var value = blackboard.get('testKey');
 *
 *     // getting/setting variable in per tree context
 *     blackboard.set('testKey', 'value', tree.id);
 *     var value = blackboard.get('testKey', tree.id);
 *
 *     // getting/setting variable in per node per tree context
 *     blackboard.set('testKey', 'value', tree.id, node.id);
 *     var value = blackboard.get('testKey', tree.id, node.id);
 *
 * Note: Internally, the blackboard store these memories in different
 * objects, being the global on `_baseMemory`, the per tree on `_treeMemory`
 * and the per node per tree dynamically create inside the per tree memory
 * (it is accessed via `_treeMemory[id].nodeMemory`). Avoid to use these
 * variables manually, use `get` and `set` instead.
 *
 * @module b3
 * @class Blackboard
 **/
	export type Memory = {
		[key: string]: any;
	};
	export interface TreeMemory {
		nodeMemory?: Memory;
		openNodes?: BaseNode[];
		traversalDepth?: number;
		traversalCycle?: number;
	}
	export class Blackboard {
		_baseMemory: Memory;
		_treeMemory: {
			[key: string]: TreeMemory;
		};
	    /**
	     * Initialization method.
	     * @method initialize
	     * @constructor
	     **/
		constructor();
	    /**
	     * Internal method to retrieve the tree context memory. If the memory does
	     * not exist, this method creates it.
	     *
	     * @method _getTreeMemory
	     * @param {String} treeScope The id of the tree in scope.
	     * @return {Object} The tree memory.
	     * @protected
	     **/
		_getTreeMemory(treeScope: string): TreeMemory;
	    /**
	     * Internal method to retrieve the node context memory, given the tree
	     * memory. If the memory does not exist, this method creates is.
	     *
	     * @method _getNodeMemory
	     * @param {String} treeMemory the tree memory.
	     * @param {String} nodeScope The id of the node in scope.
	     * @return {Object} The node memory.
	     * @protected
	     **/
		_getNodeMemory(treeMemory: TreeMemory, nodeScope: string): any;
	    /**
	     * Internal method to retrieve the context memory. If treeScope and
	     * nodeScope are provided, this method returns the per node per tree
	     * memory. If only the treeScope is provided, it returns the per tree
	     * memory. If no parameter is provided, it returns the global memory.
	     * Notice that, if only nodeScope is provided, this method will still
	     * return the global memory.
	     *
	     * @method _getMemory
	     * @param {String} treeScope The id of the tree scope.
	     * @param {String} nodeScope The id of the node scope.
	     * @return {Object} A memory object.
	     * @protected
	     **/
		_getMemory(treeScope?: string, nodeScope?: string): Memory;
	    /**
	     * Stores a value in the blackboard. If treeScope and nodeScope are
	     * provided, this method will save the value into the per node per tree
	     * memory. If only the treeScope is provided, it will save the value into
	     * the per tree memory. If no parameter is provided, this method will save
	     * the value into the global memory. Notice that, if only nodeScope is
	     * provided (but treeScope not), this method will still save the value into
	     * the global memory.
	     *
	     * @method set
	     * @param {String} key The key to be stored.
	     * @param {String} value The value to be stored.
	     * @param {String} treeScope The tree id if accessing the tree or node
	     *                           memory.
	     * @param {String} nodeScope The node id if accessing the node memory.
	     **/
		set(key: string, value: any, treeScope?: string, nodeScope?: string): void;
	    /**
	     * Retrieves a value in the blackboard. If treeScope and nodeScope are
	     * provided, this method will retrieve the value from the per node per tree
	     * memory. If only the treeScope is provided, it will retrieve the value
	     * from the per tree memory. If no parameter is provided, this method will
	     * retrieve from the global memory. If only nodeScope is provided (but
	     * treeScope not), this method will still try to retrieve from the global
	     * memory.
	     *
	     * @method get
	     * @param {String} key The key to be retrieved.
	     * @param {String} treeScope The tree id if accessing the tree or node
	     *                           memory.
	     * @param {String} nodeScope The node id if accessing the node memory.
	     * @return {Object} The value stored or undefined.
	     **/
		get(key: string, treeScope?: string, nodeScope?: string): any;
	}

}
declare namespace b3 {
	/**
 * Composite is the base class for all composite nodes. Thus, if you want to
 * create new custom composite nodes, you need to inherit from this class.
 *
 * When creating composite nodes, you will need to propagate the tick signal
 * to the children nodes manually. To do that, override the `tick` method and
 * call the `_execute` method on all nodes. For instance, take a look at how
 * the Sequence node inherit this class and how it call its children:
 *
 *     // Inherit from Composite, using the util function Class.
 *     class Sequence extends Composite {
 *
 *       constructor(){
 *         // Remember to set the name of the node.
 *         super({name: 'Sequence'});
 *       }
 *
 *       // Override the tick function
 *       tick(tick : Tick) {
 *
 *         // Iterates over the children
 *         for (var i=0; i<this.children.length; i++) {
 *
 *           // Propagate the tick
 *           var status = this.children[i]._execute(tick);
 *
 *           if (status !== SUCCESS) {
 *               return status;
 *           }
 *         }
 *
 *         return SUCCESS;
 *       }
 *     };
 *
 * @module b3
 * @class Composite
 * @extends BaseNode
 **/
	export class Composite extends BaseNode {
	    /**
	     * Creates an instance of Composite.
	     * @param {Object} options
	     * @param {BaseNode[]} options.children
	     * @param {String} options.name Node name. Default to `Composite`.
	     * @param {String} options.title
	     * @param {Object} options.properties
	     * @memberof Composite
	     */
		constructor(params?: Params);
	}

}
declare namespace b3 {
	/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends BaseNode
 **/
	export class Condition extends BaseNode {
	    /**
	     * Creates an instance of Condition.
	     * @param {Object} options
	     * @param {Object} options.name Node name. Default to `Condition`.
	     * @param {String} options.title
	     * @param {Object} options.properties
	     * @memberof Condition
	     */
		constructor(params?: Params);
	}

}
declare namespace b3 {
	/**
 * Decorator is the base class for all decorator nodes. Thus, if you want to
 * create new custom decorator nodes, you need to inherit from this class.
 *
 * When creating decorator nodes, you will need to propagate the tick signal
 * to the child node manually, just like the composite nodes. To do that,
 * override the `tick` method and call the `_execute` method on the child
 * node. For instance, take a look at how the Inverter node inherit this
 * class and how it call its children:
 *
 *     // Inherit from Decorator, using the util function Class.
 *     class Inverter extends b3.Decorator {
 *
 *       constructor(){
 *         super({name: 'Invereter'});
 *       }
 *
 *       tick: function(tick) {
 *         if (!this.child) {
 *           return b3.ERROR;
 *         }
 *
 *         // Propagate the tick
 *         var status = this.child._execute(tick);
 *
 *         if (status === b3.SUCCESS) {
 *           status = b3.FAILURE;
 *         } else if (status === b3.FAILURE) {
 *           status = b3.SUCCESS;
 *         }
 *
 *         return status;
 *       }
 *     });
 *
 * @module b3
 * @class Decorator
 * @extends BaseNode
 **/
	export class Decorator extends BaseNode {
	    /**
	     * Creates an instance of Decorator.
	     * @param {Object} options
	     * @param {String} options.name Node name. Default to `Decorator`.
	     * @param {String} options.title
	     * @param {Object} options.properties
	     * @memberof Decorator
	     */
		constructor(child?: BaseNode, name?: string, title?: string, properties?: IProperties);
	}

}
declare namespace b3 {
	/**
* A new Tick object is instantiated every tick by BehaviorTree. It is passed
* as parameter to the nodes through the tree during the traversal.
*
* The role of the Tick class is to store the instances of tree, debug,
* target and blackboard. So, all nodes can access these informations.
*
* For internal uses, the Tick also is useful to store the open node after
* the tick signal, in order to let `BehaviorTree` to keep track and close
* them when necessary.
*
* This class also makes a bridge between nodes and the debug, passing the
* node state to the debug if the last is provided.
*
* @module b3
* @class Tick
**/
	export class Tick {
	    /**
	     * The tree reference.
	     * @property {b3.BehaviorTree} tree
	     * @readOnly
	     **/
		tree: BehaviorTree;
	    /**
	     * The debug reference.
	     * @property {Object} debug
	     * @readOnly
	     */
		debug: Object;
	    /**
	     * The target object reference.
	     * @property {Object} target
	     * @readOnly
	     **/
		target: Object;
	    /**
	     * The blackboard reference.
	     * @property {b3.Blackboard} blackboard
	     * @readOnly
	     **/
		blackboard: Blackboard;
	    /**
	     * The list of open nodes. Update during the tree traversal.
	     * @property {Array} _openNodes
	     * @protected
	     * @readOnly
	     **/
		_openNodes: BaseNode[];
	    /**
	     * The number of nodes entered during the tick. Update during the tree
	     * traversal.
	     *
	     * @property {Integer} _nodeCount
	     * @protected
	     * @readOnly
	     **/
		_nodeCount: number;
	    /**
	     * Initialization method.
	     * @method initialize
	     * @constructor
	     **/
		constructor();
	    /**
	     * Called when entering a node (called by BaseNode).
	     * @method _enterNode
	     * @param {Object} node The node that called this method.
	     * @protected
	     **/
		_enterNode(node: BaseNode): void;
	    /**
	     * Callback when opening a node (called by BaseNode).
	     * @method _openNode
	     * @param {Object} node The node that called this method.
	     * @protected
	     **/
		_openNode(node: BaseNode): void;
	    /**
	     * Callback when ticking a node (called by BaseNode).
	     * @method _tickNode
	     * @param {Object} node The node that called this method.
	     * @protected
	     **/
		_tickNode(node: BaseNode): void;
	    /**
	     * Callback when closing a node (called by BaseNode).
	     * @method _closeNode
	     * @param {Object} node The node that called this method.
	     * @protected
	     **/
		_closeNode(node: BaseNode): void;
	    /**
	     * Callback when exiting a node (called by BaseNode).
	     * @method _exitNode
	     * @param {Object} node The node that called this method.
	     * @protected
	     **/
		_exitNode(node: BaseNode): void;
	}

}
declare namespace b3 {
	/**
* The Inverter decorator inverts the result of the child, returning `SUCCESS`
* for `FAILURE` and `FAILURE` for `SUCCESS`.
*
* @module b3
* @class Inverter
* @extends Decorator
**/
	export class Inverter extends Decorator {
	    /**
	     * Creates an instance of Inverter.
	     * @param {Object} params
	     * @param {BaseNode} params.child The child node.
	     * @memberof Inverter
	     */
		constructor(child?: BaseNode);
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE | STATE.ERROR;
	}

}
declare namespace b3 {
	/**
* This decorator limit the number of times its child can be called. After a
* certain number of times, the Limiter decorator returns `FAILURE` without
* executing the child.
*
* @module b3
* @class Limiter
* @extends Decorator
**/
	export class Limiter extends Decorator {
		maxLoop: number;
	    /**
	     * Creates an instance of Limiter.
	     *
	     * Settings parameters:
	     *
	     * - **maxLoop** (*Integer*) Maximum number of repetitions.
	     * - **child** (*BaseNode*) The child node.
	     *
	     * @param {Object} params
	     * @param {Number} params.maxLoop Maximum number of repetitions.
	     * @param {BaseNode} params.child The child node.
	     * @memberof Limiter
	     */
		constructor(child?: BaseNode, maxLoop?: number);
	    /**
	     * Open method.
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE.NONE | STATE | STATE.ERROR;
	}

}
declare namespace b3 {
	/**
* The MaxTime decorator limits the maximum time the node child can execute.
* Notice that it does not interrupt the execution itself (i.e., the child
* must be non-preemptive), it only interrupts the node after a `RUNNING`
* status.
*
* @module b3
* @class MaxTime
* @extends Decorator
**/
	export class MaxTime extends Decorator {
		maxTime: number;
	    /**
	     * Creates an instance of MaxTime.
	     *
	     * - **maxTime** (*Integer*) Maximum time a child can execute.
	     * - **child** (*BaseNode*) The child node.

	     * @param {Object} params Object with parameters.
	     * @param {Number} params.maxTime Maximum time a child can execute.
	     * @param {BaseNode} params.child The child node.
	     * @memberof MaxTime
	     */
		constructor(maxTime?: number, child?: BaseNode);
	    /**
	     * Open method.
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE.NONE | STATE | STATE.ERROR;
	}

}
declare namespace b3 {
	/**
* Repeater is a decorator that repeats the tick signal until the child node
* return `RUNNING` or `ERROR`. Optionally, a maximum number of repetitions
* can be defined.
*
* @module b3
* @class Repeater
* @extends Decorator
**/
	export class Repeater extends Decorator {
		maxLoop: number;
	    /**
	     * Creates an instance of MaxTime.
	     *
	     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 (infinite).
	     * - **child** (*BaseNode*) The child node.
	     *
	     * @param {Object} params Object with parameters.
	     * @param {Number} params.maxLoop Maximum number of repetitions. Default to -1 (infinite).
	     * @param {BaseNode} params.child The child node.
	     * @memberof Repeater
	     **/
		constructor(maxLoop?: number, child?: BaseNode);
	    /**
	     * Open method.
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     **/
		tick(tick: Tick): STATE | STATE.ERROR;
	}

}
declare namespace b3 {
	/**
* RepeatUntilFailure is a decorator that repeats the tick signal until the
* node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum
* number of repetitions can be defined.
*
* @module b3
* @class RepeatUntilFailure
* @extends Decorator
**/
	export class RepeatUntilFailure extends Decorator {
		maxLoop: number;
	    /**
	     * Creates an instance of RepeatUntilFailure.
	     *
	     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 (infinite).
	     * - **child** (*BaseNode*) The child node.
	     *
	     * @param {Object} params Object with parameters.
	     * @param {Number} params.maxLoop Maximum number of repetitions. Default to -1 (infinite).
	     * @param {BaseNode} params.child The child node.
	     * @memberof RepeatUntilFailure
	     **/
		constructor(maxLoop?: number, child?: BaseNode);
	    /**
	     * Open method.
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE | STATE.ERROR;
	}

}
declare namespace b3 {
	/**
* RepeatUntilSuccess is a decorator that repeats the tick signal until the
* node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum
* number of repetitions can be defined.
*
* @module b3
* @class RepeatUntilSuccess
* @extends Decorator
**/
	export class RepeatUntilSuccess extends Decorator {
		maxLoop: number;
	    /**
	     * Creates an instance of RepeatUntilSuccess.
	     *
	     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 (infinite).
	     * - **child** (*BaseNode*) The child node.
	     *
	     * @param {Object} params Object with parameters.
	     * @param {Number} params.maxLoop Maximum number of repetitions. Default to -1 (infinite).
	     * @param {BaseNode} params.child The child node.
	     * @memberof RepeatUntilSuccess
	     **/
		constructor(maxLoop?: number, child?: BaseNode);
	    /**
	     * Open method.
	     * @method open
	     * @param {Tick} tick A tick instance.
	     **/
		open(tick: Tick): void;
	    /**
	     * Tick method.
	     * @method tick
	     * @param {Tick} tick A tick instance.
	     * @return {Constant} A state constant.
	     **/
		tick(tick: Tick): STATE | STATE.ERROR;
	}


}