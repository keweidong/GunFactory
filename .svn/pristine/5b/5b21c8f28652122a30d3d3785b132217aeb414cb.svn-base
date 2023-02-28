import { ControllerConst } from "../../game/consts/ControllerConst";
import { NotificationConst } from "../../game/consts/NotificationConst";
import { SystemData } from "../../game/module/SystemOpen/SystemDataManager";
import { OpenConst, OpenTypeConst, ShowTypeConst } from "../../game/module/SystemOpen/SystemOpenConst";
import App from "../App";
import EffectUtils from "./EffectUtils";
import Toast from "./Toast";
const { ccclass, property, menu } = cc._decorator;
/**
 * 功能开放组件
 */
export namespace UI {
    let systemIndex = cc.Enum(OpenTypeConst);
    let showType = cc.Enum(ShowTypeConst);

    @ccclass
    @menu("tool/SystemComponent")
    export class SystemComponent extends cc.Component {

        @property({
            type: OpenTypeConst,
        })
        protected systemIndex = 0;


        @property({
            type: ShowTypeConst,
        })
        protected showType = 0;

        @property({ tooltip: "是否要播放解锁动画(暂未实现)" })
        protected isPlay: boolean = true;

        protected config: SystemData;

        private _eventHandler: cc.Component.EventHandler[];

        protected isInit: boolean = false;;


        protected isOpen: boolean;

        public set state(isOpen: boolean) {
            this.isOpen = isOpen;
            this.updateState(this.systemIndex, isOpen)
        }
        public get state() {
            return this.isOpen;
        }

        onLoad() {
            this.config = App.ConfigManager.getConfig("SystemDataManager").getData(this.systemIndex);
            if (!this.config) {
                return;
            }
            // App.TimerManager.doTimer(200, 0, this.myUpdate, this);
            App.NotificationCenter.addListener(NotificationConst.SYS_OPEN, this.updateSys, this, 200);
            // App.NotificationCenter.dispatch(NotificationConst.CHECK_SYS_OPEN, this.config.index);
            let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, this.config.index);
            this.updateSys(this.config.index, isOpen, false);

            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        }

        // protected myUpdate() {
        //     App.NotificationCenter.dispatch(NotificationConst.CHECK_SYS_OPEN, this.config.index);
        // }

        protected onTouch() {
            if (!this.isOpen) {
                Toast.launch(this.config.unLockDesc);
            }
        }
        public onDestroy() {
            App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.updateSys, this);
        }

        /**
         * 更新开放状态
         * @param sysIndex 系统index
         * @param isOpen 是否开启
         * @param isPlayAni 开启时是否播放动画
         */
        public updateSys(sysIndex: number, isOpen: boolean, isPlayAni?: boolean) {
            if (isOpen == null) {
                App.TimerManager.doTimer(500, 1, () => {
                    let isOpen = App.ControllerManager.applyFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, this.config.index);
                    this.updateSys(this.config.index, isOpen, false);
                }, this);
                this.updateState(sysIndex, isOpen);
                return;
            }
            if (sysIndex != this.systemIndex) {
                return;
            }
            this.isOpen = isOpen;
            if (!isOpen || !isPlayAni || !this.isPlay) {
                this.updateState(sysIndex, isOpen);
                return;
            }
            if (isOpen && isPlayAni && this.isPlay) {

                App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.updateSys, this);

                let pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                if (this.config.pos != "" && this.config.pos != "none") {
                    let temp: pos = {};
                    App.CommonUtils.parsePos(temp, this.config.pos, "|");
                    pos.x = App.CommonUtils.getPosX1(temp, cc.winSize.width, 0);
                    pos.y = App.CommonUtils.getPosY1(temp, cc.winSize.height, 0);
                }

                let data: SystemOpenData = {
                    icon: this.config.iconSource, //|| this.node.getComponent(cc.Sprite).spriteFrame.name,
                    desc: this.config.desc,
                    pos: pos,
                    func: () => {
                        this.updateState(sysIndex, isOpen)
                    },
                    obj: this,
                }
                EffectUtils.instance.playLockAni(data);
                // //如果是排行榜需要展开右侧弹窗
                // this.checkRankIsOpen(this.config.index);
            }
        }

        // /**检查是否是排行榜功能开放*/
        // checkRankIsOpen(systemId: number) {
        //     if (systemId === OpenTypeConst.RANK) {
        //         App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.OPEN_RIGHT_POPUP);
        //     }
        // }

        /**
         * 更新开放状态
         * @param sysIndex 系统index
         * @param isOpen 是否开启
         */
        public updateState(sysIndex: number, isOpen: boolean) {
            if (sysIndex == this.systemIndex) {
                // App.TimerManager.remove(this.myUpdate, this);
                if (isOpen) {
                    App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.updateSys, this);
                }
                let btn = this.node.getComponent(cc.Button);
                if (btn) {
                    btn.isNotOpen = !isOpen;

                    if (isOpen && this._eventHandler) {
                        this.node.getComponent(cc.Button).clickEvents = this._eventHandler;
                    }
                    else if (!isOpen && !this._eventHandler) {
                        this._eventHandler = this.node.getComponent(cc.Button).clickEvents;
                        this.node.getComponent(cc.Button).clickEvents = [];
                    }
                }
                // this.node.getComponent(cc.Button).clickEvents
                switch (this.showType) {
                    case ShowTypeConst.LOCK:
                        let lock = this.node.getChildByName("lock")
                        if (lock)
                            lock.getComponent(cc.Sprite).node.active = !isOpen;
                        let sp = this.node.getComponent(cc.Button).node.getChildByName("Background").getComponent(cc.Sprite);

                        if (isOpen) {
                            sp.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
                        }
                        else {
                            sp.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
                        }
                        break;
                    case ShowTypeConst.HIDE:
                        this.node.active = isOpen;
                        break;
                }

            }
        }

    }
}