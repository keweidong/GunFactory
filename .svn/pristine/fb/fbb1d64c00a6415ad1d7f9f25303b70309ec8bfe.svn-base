import { register } from "./Actions";
import BaseCondition from "./BaseCondition";
import { ITick } from "./BehaviorTree";

/*
 * @Author: He 
 * @Date: 2019-12-25 11:27:52 
 * @Last Modified by: He
 * @Last Modified time: 2020-04-14 16:49:08
 * 根据传入的概率,随机返回成功或者失败
 */
export default class Random extends BaseCondition {
    properties: RandomParam;
    tick(tick: ITick): b3.STATE {
        let isSuccess = Math.random() < this.properties.rate;
        if (!CC_EDITOR) {
            this.log(this.properties.rate, isSuccess);
        }
        return isSuccess ? b3.SUCCESS : b3.FAILURE;
    }
}
register(Random, "Random");
type RandomParam = {
    /**随机的概率 */
    rate: number;
}