import { register } from "../Actions";
/**
 * 会一次遍历完所有子节点，根据配置的返回类型返回结果,
 * 并行节点只有记忆节点,当子节点返回runing的时候,会记录执行顺序并且退出,下次还是会在同个节点进行执行
* 退出条件 默认为0
*         0: 一个子节点成功，则返回成功，所有子节点执行失败，则返回失败
*         1: 一个子节点失败，则返回失败，所有子节点执行成功，则返回成功
 */
export default class MemParallel extends b3.Composite {
    /**属性参数*/
    properties: {
        /**
         * 退出条件 默认为0
         *         0: 一个子节点成功，则返回成功，所有子节点执行失败，则返回失败
         *         1: 一个子节点失败，则返回失败，所有子节点执行成功，则返回成功
         */
        type: number;
    };
    constructor(params: b3.Params = {}) {
        super({
            name: 'MemParallel',
            children: params.children,
            properties: params.properties,
            title: params.title || params.name
        });
    }
    /**
  * Open method.
  * @method open
  * @param {b3.Tick} tick A tick instance.
  **/
    open(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }
    tick(tick: b3.Tick): b3.STATE {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        let hasSuccess: boolean = false;
        let hasFail: boolean = false;
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status === b3.SUCCESS) {
                hasSuccess = true;
            } else if (status === b3.FAILURE) {
                hasFail = true;
            } else {
                tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                return status;
            }
        }
        if (this.properties.type === 0) {
            if (hasSuccess) {
                return b3.SUCCESS;
            } else {
                return b3.FAILURE;
            }
        } else {
            if (hasFail) {
                return b3.FAILURE;
            } else {
                return b3.SUCCESS;
            }
        }
    }
}
register(MemParallel, "MemParallel");