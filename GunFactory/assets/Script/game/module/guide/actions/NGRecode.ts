/*
 * @Author: He 
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-26 18:25:38
 * 结束交互动作
 */

// import { Platform } from "../../platform/Platform";
// import { save_prop_Const } from '../../platform/PlatformBase';
import { BaseAction, register } from "../B3Tree1";
import { Platform } from "../../../platform/Platform";
import { save_prop_Const } from "../../../platform/PlatformBase";
export default class NGRecodes extends BaseAction {
    properties: {
        /**新手引导步骤 */
        id: number

        /**新手引导的节点 */
        step: number
    };
    tick(tick: NGTick): b3.STATE {
        let pro = this.properties;

        Platform.instance.recordNode(save_prop_Const.yindao_Level, pro.id, 1, pro.step < 0 ? 1000 : pro.step, 1);

        return b3.SUCCESS;
    }
}
register(NGRecodes, "NGRecodes");