import GetBoxLaterAni from "../../game/component/GetBoxLaterAni";
import GetItemAni from "../../game/component/GetItemAni";
import { ItemDisplayData } from "../../game/component/ItemDisplay";
import OpenBoxAni from "../../game/component/OpenBoxAni";
import OpenSysAni from "../../game/component/OpenSysAni";
import LayerManager from "../../game/LayerManager";
import { ItemType } from "../../game/module/bag/BagConst";
import BoxItem from "../../game/module/bag/BoxItem";
import { ItemBase, UseItemResultData } from "../../game/module/bag/ItemBase";
import App from "../App";
import LabelTip from "../component/LabelTip";
import { GameText } from "../lang/GameText";
import NodePool from "./NodePool";
import { QueueExecutor } from "./QueueExecutor";
const { ccclass, property } = cc._decorator;
@ccclass
/**
 * 各种效果工具类
 */
export default class EffectUtils extends cc.Component {
    static instance: EffectUtils;
    // /**
    //  * 构造函数
    //  */
    // public constructor() {
    //     super();
    // }
    // @property(NodePool)
    // itemPool: NodePool = null;
    /**
     * 动画队列
     */
    queueExecutor: QueueExecutor = null;

    @property({ type: cc.Prefab })
    protected openBoxAniPrefab: cc.Prefab = null;
    protected openBoxAni: cc.Node = null;

    @property(cc.Prefab)
    protected getItemAniPrefab: cc.Prefab = null;

    protected getItemAni: cc.Node = null;

    @property(cc.Prefab)
    protected openSysAniPrefab: cc.Prefab = null;
    protected openSysAni: cc.Node = null;

    pool: NodePool = null;
    @property([cc.SpriteFrame])
    protected frames: cc.SpriteFrame[] = [];

    /**获得箱子后，宝箱飞向宝箱icon的动画*/
    @property(cc.Prefab)
    protected getBoxLaterPrefab: cc.Prefab = null;
    protected getBoxLaterAni: cc.Node = null;


    /**获得箱子后，宝箱飞向宝箱icon的动画*/
    @property(NodePool)
    protected getNewFoodAni: NodePool = null;

    onLoad() {
        this.queueExecutor = new QueueExecutor();
        EffectUtils.instance = this;
        let node = new cc.Node();
        node.addComponent(cc.Sprite);
        this.pool = new NodePool()
        this.pool.prefab = <any>node;
    }
    /**
     * 播放开宝箱动画
     */
    public playOpenBoxAni(item: BoxItem, data: UseItemResultData<any>) {
        this.queueExecutor.regist(() => {
            let parent = LayerManager.getLayer(LayerManager.UI_Tips);
            let node = this.openBoxAni;
            if (!node) {
                this.openBoxAni = node = cc.instantiate(this.openBoxAniPrefab);
                // node.y = -300;
            }
            parent.addChild(node);
            node.active = false;
            node.getComponent(OpenBoxAni).setBoxSprite(item);
            this.scheduleOnce(() => {
                node.active = true;
                node.getComponent(OpenBoxAni).play(item, data);
            }, 0.1);

        }, this)
    }
    /**
    * 播放开获得物品
    */
    public playGetItemAni(data: ItemDisplayData, cnt: number = 0) {
        this.queueExecutor.regist(() => {
            let node = this.getItemAni;
            if (!node) {
                this.getItemAni = node = cc.instantiate(this.getItemAniPrefab);
            }
            if (!node.parent) {
                LayerManager.getLayer(LayerManager.UI_Tips).addChild(node);
            }
            //分辨普通物品和buff奖励
            // if (data.item instanceof ItemBase) {
            //     let self = this;
            //     if (data.item.data.itemType === ItemType.BUFF) {
            //         let path = "Texture/game/Common/sjtxyz_icon";
            //         cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
            //             if (err) {
            //             } else {
            //                 self.getItemAni.getChildByName("huodewp").getChildByName("hdzt_1").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            //             }
            //         });
            //     } else {
            //         let path = "Texture/game/Common/hdzt_1";
            //         cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
            //             if (err) {
            //             } else {
            //                 self.getItemAni.getChildByName("huodewp").getChildByName("hdzt_1").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            //             }
            //         });
            //     }
            // }
            node.getComponent(GetItemAni).play(data, cnt);
        }, this)
        //如果是宝箱,在后加宝箱飞向宝箱主界面动画
        if (data.item instanceof ItemBase) {
            let itemType = data.item.data.itemType;
            if (itemType === ItemType.BOX) {
                this.playGetBoxLaterAni(data.item.data.id);
            }
        }
    }

    /** 解锁动画 */
    public playLockAni(data: SystemOpenData) {
        this.queueExecutor.regist(() => {
            let node = this.openSysAni;
            if (!node) {
                this.openSysAni = node = cc.instantiate(this.openSysAniPrefab);
            }
            if (!node.parent) {
                LayerManager.getLayer(LayerManager.UI_Tips).addChild(node);
            }
            node.getComponent(OpenSysAni).play(data);
        }, this);
    }

    /**
     * 播放菜式升级动画
     * @param imgPath 菜式图片
     * @param pos 按钮位置
     * @param addSellCoin 增加了多少售价
     * @param isChange 是否变化菜式图片,如果变化了菜式图片,还会播放对应的动画
     */
    public playNewFoodAni(imgPath: string, pos: cc.Vec2, addSellCoin: number, isChange: boolean) {
        let parent = LayerManager.getLayer(LayerManager.UI_Tips);
        parent.convertToNodeSpaceAR(pos, pos)
        if (isChange) {
            let aniNode = this.getNewFoodAni.pop();
            aniNode.position = pos;
            let ani = aniNode.getComponent(cc.Animation);
            App.CommonUtils.setSpriteFrame(imgPath, aniNode.getChildByName("daxia_2").getComponent(cc.Sprite));
            ani.once(cc.Animation.EventType.FINISHED, () => {
                this.getNewFoodAni.push(aniNode);
                App.NodePoolMsr.moneyLabelAni.pop()
                    .getComponent(LabelTip)
                    .init(parent, GameText.getText(lang.common_sale_add).format(MyBigLong.toString(addSellCoin)), App.NodePoolMsr.moneyLabelAni, 40)
                    .flyUp(pos.x, pos.y + 30);
            });
            let particle = aniNode.getChildByName("dianjitx").getComponent(cc.ParticleSystem)
            particle.resetSystem();
            parent.addChild(aniNode);
            ani.play();
        } else {
            App.NodePoolMsr.moneyLabelAni.pop()
                .getComponent(LabelTip)
                .init(parent, GameText.getText(lang.common_sale_add).format(MyBigLong.toString(addSellCoin)), App.NodePoolMsr.moneyLabelAni, 40)
                .flyUp(pos.x, pos.y + 30);
        }

    }

    /**获得箱子后，宝箱飞向宝箱icon的动画*/
    public playGetBoxLaterAni(boxId: number, path?: string) {
        this.queueExecutor.regist(() => {
            let node = this.getBoxLaterAni;
            if (!node) {
                this.getBoxLaterAni = node = cc.instantiate(this.getBoxLaterPrefab);
            }
            if (!node.parent) {
                LayerManager.getLayer(LayerManager.UI_Tips).addChild(node);
            }
            if (path) {
                node.getComponent(GetBoxLaterAni).play(boxId, path);
            } else {
                node.getComponent(GetBoxLaterAni).play(boxId);
            }

        }, this);
    }




    // /**
    //  * 类似mac上图标上下抖动的效果
    //  * @param obj 要抖动的对象，使用
    //  * @param initY 要抖动的对象的初始Y值，原始位置
    //  * @example eval(macIconShake("this.btnIcon", 100));
    //  * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
    //  */
    // public macIconShake(obj: string, initY: number): string {
    //     //抖动频率[时间，移动距离]，可修改
    //     var arr: Array<any> = [
    //         [20, 300],
    //         [15, 300],
    //         [10, 300],
    //         [5, 300]
    //     ];
    //     var str: string = "egret.Tween.get(" + obj + ")";
    //     for (var i: number = 0, len: number = arr.length; i < len; i++) {
    //         str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
    //         str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
    //     }
    //     str += ";";
    //     return str;
    // }

    // /**
    //  * 开始闪烁
    //  * @param obj
    //  */
    // public startFlicker(obj: egret.DisplayObject, alphaTime: number): void {
    //     obj.alpha = 1;
    //     egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj, alphaTime]);
    // }

    // /**
    //  * 停止闪烁
    //  * @param obj
    //  */
    // public stopFlicker(obj: egret.DisplayObject): void {
    //     egret.Tween.removeTweens(obj);
    // }
    /**
     * 金币汇集效果
     * 
     * @param {number} startX 开始x位置
     * @param {number} startY  开始y位置
     * @param {number} targetX 结束x位置
     * @param {number} targetY 结束y位置
     * @param {number} [index] 金币图片
     * @param {egret.DisplayObjectContainer} parent 父节点
     * @param {number} [cnt=30] 创建金币的数量
     * @param {number} [size=45] 金币尺寸
     * @param {number} [cWidth=500] 散落金币区域宽度
     * @param {number} [cHeight=500] 散落金币区域高度
     * 
     * @author he
     * @version
     */
    public coinEffect(
        startX: number,
        startY: number,
        targetX: number,
        targetY: number,
        index: number = 0,
        parent: cc.Node,
        cnt: number = 30,
        size: number = 45,
        cWidth: number = 500,
        cHeight: number = 500,
    ) {
        this.queueExecutor.regist(() => {
            let ptime = 0.01;
            let ratex = 1.3;
            let delay = 0
            startX = startX - size / 2;
            startY = startY - size / 2;
            let isPlay = false;
            for (let i = 0; i < cnt; i++) {
                let node = this.pool.pop();
                let img = node.getComponent(cc.Sprite);
                img.spriteFrame = this.frames[index];
                var rx = (0.5 - Math.random()) * cWidth + startX;
                var ry = (0.5 - Math.random()) * cHeight + startY;
                node.x = startX;
                node.y = startY;
                node.active = false;
                node.height = node.width = size;
                let time1 = Math.sqrt(Math.pow(rx - targetX, 2) + Math.pow(ry - targetY, 2))
                let time2 = Math.sqrt(Math.pow(startX - rx, 2) + Math.pow(startY - ry, 2)) * ratex
                cc.tween(node)
                    .delay(delay)
                    .set({ active: true })
                    .to(time2 / 1000, { x: rx, y: ry }, { easing: cc.easing.quadOut }
                    )
                    .to(time1 / 1000, { x: targetX, y: targetY }, { easing: cc.easing.circIn })
                    .delay(0.01)
                    .call(() => {
                        this.pool.push(node);
                        //最后一个金币回调
                        if (i == cnt - 1) {
                            // if (callFunction) {
                            //     callFunction.call(self);
                            // }
                            this.queueExecutor.finishFunc();
                        }
                        if (isPlay) {
                            return
                        }
                        isPlay = true;
                        App.SoundManager.playEffect("get_coin2");

                    }).start();

                delay += ptime;
                parent.addChild(node);
            }
        }, this)
    }

    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    public typerEffect(obj: cc.Label, content: string = "", interval: number = 200, cb?: Function, target?: Object) {
        // var strArr: Array<any> = content.split("");
        let func = function () {
            obj.string += content[index++];
            // if (index >= len) {
            //     // egret.clearInterval(key);
            //     if (cb) {
            //         cb.call(target);
            //     }
            // }
        }
        var len: number = content.length;
        let index = 0;
        obj.string = "";
        App.TimerManager.doTimer(interval, len, func, null, cb, target);
        return func;
    }
}


