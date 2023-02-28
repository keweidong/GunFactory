
const { ccclass, property } = cc._decorator;
@ccclass
export default class GodText extends cc.Component {

    //显示的文本
    @property(cc.Label)
    label: cc.Label = null;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    }
    protected onTouchBegin(event: cc.Event.EventTouch) {
        this.node._touchListener.setSwallowTouches(false);
        this.node.emit('click');
        // event.stopPropagationImmediate();
        // //隐藏文本提示
        // if (this.node.active) {

        //     return;
        // }
    }
    hideText() {
        this.node.active = false;
    }

    setText(txt: string) {
        this.node.active = true;
        if (!this.label) {
            this.label = this.node.getComponentInChildren(cc.Label);
        }
        this.label.string = txt;
    }
}
