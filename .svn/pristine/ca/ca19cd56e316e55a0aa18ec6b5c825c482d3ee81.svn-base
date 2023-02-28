/*
 * @Author: ke 
 * @Date: 2020-03-14 17:55:59 
 * @Last Modified by: He
 * @Last Modified time: 2020-05-13 15:52:38
 */
/**
 * 新手结束电话
 */
import { BaseAction, register } from "../B3Tree1";
export default class NGAShowSkin extends BaseAction {
    properties: {
        isShow: number
    };

    open(tick: NGTick): void {
        tick.target.showSkin(this.properties.isShow);
    }
    tick(tick: NGTick): b3.STATE {
        return b3.SUCCESS;
    }
    close(tick: NGTick): void {

    }
}
register(NGAShowSkin, "NGAShowSkin");