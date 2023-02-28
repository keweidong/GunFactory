/*
 * @Author: He
 * @Date: 2019-12-26 20:17:56
 * @Last Modified by: He
 * @Last Modified time: 2020-05-15 14:43:53
 * 结束交互动作
 */
import { BaseAction, register } from "../B3Tree1";

export default class NGASetStep extends BaseAction {
    properties: {
        /** id */
        id: number,
        /** step */
        step: number,
    };

    open(tick: NGTick): void {
        tick.target.setStep(this.properties.id, this.properties.step);
    }
    tick(tick: NGTick): b3.STATE {
        if (this.properties.step === -1) {
            return b3.FAILURE
        }
        else {
            return b3.SUCCESS;
        }
    }

    close(tick: NGTick): void {

    }
}
register(NGASetStep, "NGASetStep");