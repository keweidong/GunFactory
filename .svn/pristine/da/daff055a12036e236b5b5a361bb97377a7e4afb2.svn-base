import { BaseAction, register } from "../B3Tree1";
export default class NGSetStory extends BaseAction {
    /**属性参数*/
    properties: NGSetStoryParam;
    open(tick: NGTick): void {
        // tick.target.waitTouch();
        tick.blackboard.set("first", true, tick.tree.id, this.id);
        if (this.properties.isShow) {
            tick.target.showStory(this.properties);
            // tick.target.waitTouch();
        } else {
            // tick.blackboard.set("first", false, tick.tree.id, this.id);
            tick.target.hideStory();
            tick.target.godGuide.reset();
        }
    }
    tick(tick: NGTick): b3.STATE {
        let isFirst = tick.blackboard.get("first", tick.tree.id, this.id);
        if (isFirst) {
            tick.blackboard.set("first", false, tick.tree.id, this.id);
            return b3.RUNNING;
        }
        // tick.target.godGuide.reset();
        return b3.SUCCESS;
    }
    // tick(tick: NGTick): b3.STATE {
    //     if (this.properties.isShow) {
    //         tick.target.godGuide.showStory(this.properties);
    //         tick.target.waitTouch();
    //     } else {
    //         tick.target.godGuide.hideStory();
    //     }
    //     return b3.SUCCESS;
    // }
}
register(NGSetStory, "NGSetStory");

declare global {
    type NGSetStoryParam = {
        /**剧情内容 */
        str: string;
        /**剧情图片 */
        imgName: string;
        /**剧情label的y轴位置 */
        labY: number;
        /**是否显示剧情, 1 表示显示, 0表示关闭 */
        isShow: number;
        /**是否播放文字打印机动画, 大于0 表示播放 具体数值为动画时间间隔, 0表示不播放 */
        typerAniTime: number;
    }
}