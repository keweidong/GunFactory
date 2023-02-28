/*
 * @Author: Ke
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-06-03 20:01:52
 * 检查新手引导是否开启
 */

import App from "../../../../core/App";
import { ViewConst } from "../../../consts/ViewConst";
import { BaseCondition, register } from "../B3Tree1";
export default class NGCCheckIsOpen extends BaseCondition {
    properties: NGOpenConditionData;
    protected isAniFinish: boolean = false;

    // open(tick: NGTick): void {

    // }
    tick(tick: NGTick): b3.STATE {
        let isNeedGuide = tick.target.checkNewGuideIsOpen(this.properties);
        if (isNeedGuide) {
            // tick.target.godGuide.enterStep(this.properties.id);
            return b3.SUCCESS;
        }
        else {
            let isShow = App.ViewManager.isShow(ViewConst.GuideView);
            if (isShow) {
                tick.target.setIsCanPlayAni(true);
                App.ViewManager.close(ViewConst.GuideView);
            }
            return b3.FAILURE;
        }
    }
    // close(tick: NGTick): void {

    // }
}
register(NGCCheckIsOpen, "NGCCheckIsOpen");