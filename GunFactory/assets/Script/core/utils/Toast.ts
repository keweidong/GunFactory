import NodePool from "./NodePool";
import App from "../App";
import LayerManager from "../../game/LayerManager";
const { ccclass, property } = cc._decorator;
@ccclass
/**
 * 公用消息
 */
export default class Toast extends cc.Component {
    static instance: Toast;
    static launch(msg: string, waitTime: number = 1000) {
        this.instance.launch(msg, waitTime)
    }
    @property(cc.Sprite)
    bgSp: cc.Sprite = null;

    @property(cc.Label)
    msgLab: cc.Label = null

    private msgList: ToastData[] = [];
    private curMsg: ToastData;
    private isShow: boolean;

    onLoad() {
        Toast.instance = this;
        this.node.active = false;
        // if(this.node.parent){
        this.node.removeFromParent(true);
        // }
    }

    public launch(msg: string, waitTime: number = 1000): void {
        // this.msgList.push({ msg: msg, waitTime: waitTime });
        // this.checkMsg({ msg: msg, waitTime: waitTime })
        this.showMsg({ msg: msg, waitTime: waitTime });
    }

    public checkMsg(data: ToastData) {
        if (this.curMsg && this.curMsg.msg == data.msg) {
            return;
        }
        let len = this.msgList.length;
        for (let i = 0; i < len; i++) {
            let temp = this.msgList[i].msg;
            if (data.msg === temp) {
                return;
            }
        }
        this.msgList.push(data);
    }

    protected tw: cc.Tween;
    public showMsg(msgData: ToastData) {
        if (this.isShow) {
            this.node.removeFromParent(true);
        }

        // let msgData = this.msgList.shift();
        // this.curMsg = msgData;
        if (msgData) {
            let spRate = 1//this.msgList.length || 1;
            this.isShow = true;
            this.msgLab.string = msgData.msg;

            if (!this.node.parent) {
                LayerManager.getLayer(LayerManager.UI_Tips).addChild(this.node);
            }
            this.node.active = true;
            this.bgSp.node.setContentSize(this.msgLab.node.width + 20, this.msgLab.node.height);
            this.node.opacity = 0;
            this.tw = cc.tween(this.node)
                .to(0.7 / spRate, { opacity: 255 }, { easing: cc.easing.quadOut })
                .delay(msgData.waitTime / 1000 / spRate)
                .to(0.8 / spRate, { opacity: 0 }, { easing: cc.easing.circIn })
                .call(() => {
                    this.node.active = false;
                    this.isShow = false;
                    // this.showMsg();
                    // if (this.node.parent) {
                    this.node.removeFromParent(true);
                    // }
                })
                .start();

        }
    }

}

type ToastData = {
    msg: string,
    waitTime: number,
}


