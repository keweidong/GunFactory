/*
 * @Author: He 
 * @Date: 2019-12-26 20:17:56 
 * @Last Modified by: He
 * @Last Modified time: 2020-06-03 20:01:29
 * 结束交互动作
 */
import App from "../../../../core/App";
import { ViewConst } from "../../../consts/ViewConst";
import { BaseCondition, register } from "../B3Tree1";
export default class NGCCheckStep extends BaseCondition {
    properties: {
        /** id */
        id: number,
        /** step */
        step: number,
    };

    open(tick: NGTick): void {

    }
    tick(tick: NGTick): b3.STATE {
        let isNeedGuide = tick.target.checkStep(this.properties.id, this.properties.step);
        if (isNeedGuide) {
            let isShow = App.ViewManager.isShow(ViewConst.GuideView);
            if (isShow) {
                return b3.SUCCESS;
            }
            else {
                tick.target.openGuideView();
                return b3.RUNNING;
            }
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
    close(tick: NGTick): void {

    }
}
register(NGCCheckStep, "NGCCheckStep");