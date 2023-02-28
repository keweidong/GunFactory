import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameNotificationConst, NotificationConst } from "../../consts/NotificationConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { BagConst, ItemType } from "./BagConst";
import { BagModel } from "./BagModel";
import BoxItem from "./BoxItem";
import { ItemBase, UseItemResultData } from "./ItemBase";
/**
 * 物品管理模块
 */
export default class BagController extends BaseController {
    protected _model: BagModel = null;
    public world: WorldScene = null;
    public constructor() {
        super();
        this.initNotificationEvent();
        this.setModel(new BagModel(this));
    }
    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        this.registerFunc(BagConst.USE_ITEM, this.onUseItem, this);
        this.registerFunc(BagConst.ADD_TIME, this.onAddItem, this);
        this.registerFunc(BagConst.USE_ITEM_ANI, this.useItemAni, this);
        this.registerFunc(BagConst.GET_ITEM, this.getItem, this);
        this.registerFunc(BagConst.GET_ITEMS_BY_TYPE, this.getItemType, this);
    }

    protected initNotificationEvent() {
        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);

    }

    public initGame() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        this.initModuleEvent();
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);
        this._model.init();
    }
    /**
     * 播放使用物品的动画
     * @param item 使用的物品
     * @param result 使用物品的结果
     * @param isMeageItemResult 是否合并物品使用结果(防止多次重复播放一些动画))
     */
    protected useItemAni(item: ItemBase, result: UseItemResultData<any>, isMeageItemResult: boolean = false) {
        // let result = <UseItemResultData<any>>App.ControllerManager.applyFunc(ControllerConst.Item, BagConst.USE_ITEM, item.data.id, 1, rate);
        if (result.result === 0) {
            // App.SoundManager.playEffect(MusicNameEnum.open_box);
            if (item instanceof BoxItem) {
                // EffectUtils.instance.playOpenBoxAni(item as BoxItem, result);
                // item.playUseItemAni(result);
            }
            else {
                let arrLen = result.items.length;
                if (isMeageItemResult) {
                    // EffectUtils.instance.playGetItemAni(result.items[0], arrLen);
                    item.playUseItemAni(result.items[0], arrLen);
                    // let temp: ItemDisplayData;
                    // for (let i = 0; i < arrLen; i++) {
                    //     if(!temp){
                    //         temp = result.items[0];
                    //         continue;
                    //     }
                    //     if (temp.arg0 instanceof MyBigLong) {
                    //         temp.arg0.add(result.items[i].arg0)
                    //     }
                    //     else{
                    //         temp.arg0 += result.items[i].arg0;
                    //     } 
                    // }
                    // EffectUtils.instance.playGetItemAni(temp);
                }
                else {
                    for (let i = 0; i < arrLen; i++) {
                        // EffectUtils.instance.playGetItemAni(result.items[i]);
                        item.playUseItemAni(result.items[i]);
                    }
                }
            }
        }
    }
    onLoadView(view: IBaseView) {

    }
    onOpenView(view: IBaseView) {
    }
    /**
     * 使用某个道具
     * @param id 使用的物品id
     * @param cnt:使用的物品数量,默认为1
     * @param isAutoPlayAni[boolean] 是否自动播放物品动画
     * @returns [UseItemResultData] 0 使用物品成功, -1 物品数量不足, -2 不存在的物品, -3使用物品过程中出错
     */
    protected onUseItem(id: number, cnt: number = 1, isAutoPlayAni: boolean = false, isMeageItemResult: boolean = false): UseItemResultData<any> {
        let item = this._model.itmes[id];
        if (item) {
            let useItemResultData = item.use(cnt);
            if (item.cnt >= cnt) {
                item.cnt -= cnt;
                App.NotificationCenter.dispatch(GameNotificationConst.USE_ITEM, id, cnt, useItemResultData);
                if (isAutoPlayAni) {
                    this.useItemAni(item, useItemResultData, isMeageItemResult);
                }
                return useItemResultData;
            } else {
                Log.warn(`物品数量不足, 物品id:${id}, 物品名称:${item.getName()}`);
                return { result: -1 };
            }
        } else {
            Log.error(`不存在的物品id:${id}`);
            return { result: -2 };
        }
    }
    /**
     * 增加某个道具
     * @param id 增加的物品id
     * @param cnt:增加的物品数量,默认为1
     * @param isAutoPlayAni:是否播放动画
     * @param anitype: 0 不播放 1 播放恭喜获得 2 播放散开货币  3 全部播放
     */
    protected onAddItem(id: number, cnt: number = 1, anitype: number = 0) {
        if (id >= 0) {
            let item = this._model.itmes[id];
            if (item) {
                item.cnt += cnt;
                if (item.data.isNowUseItem) {
                    this.onUseItem(id, cnt, true, true)
                } else {
                    this.playAddItemAni(id, cnt, anitype);
                }
                CC_DEBUG && Log.trace("增加物品:", item.getName(), "增加数量:", cnt, "当前数量:", item.cnt)
                return true;
            } else {
                Log.error(`不存在的物品id:${id}`);
                return false;
            }
        } else {
            this.addMoney(id, cnt);
            this.playAddItemAni(id, cnt, anitype);
            // this.playAddItemAni(id, cnt, anitype);
        }

    }

    protected addMoney(id: number, cnt: number) {
        switch (id) {
            case CostType.coin:
                let idleMoney = MyBigLong.tempNum.init(this.world.sceneMgr.idleMoneyRate).multiply(cnt);
                this.world.sceneMgr.nowScene.nowMoneyAdd(idleMoney);
                break;
            case CostType.diamond:
                this.world.addSuperCash(cnt);
                break;
        }
    }

    /**
     * 
     * @param id 
     * @param cnt 
     */
    protected playAddItemAni(id: number, cnt: number = 1, anitype: number) {
        if (anitype === 0) {
            return;
        }
        if (id < 0) {
            if (id === CostType.coin) {
                var item = this._model.itmes[ItemType.IELD_MONEY];
            } else {
                var item = this._model.itmes[ItemType.DIAMOND];
            }
            item.playGetItemAni({ item: item, arg0: cnt });
        }
        else {
            let item = this._model.itmes[id];
            item.playGetItemAni({ item: item, arg0: item.getCnt() * cnt });
        }
    }

    //获得某种类型的所有物品(猫粮仓库)
    protected getItem(id: number): ItemBase {
        return this._model.itmes[id];
    }

    //通过类型去拿物品
    protected getItemType(type: ItemType) {
        let items = this._model.itmeTypes[type];
        return items;
    }
}
export const enum CostType {
    /** 金币 */
    coin = -1,
    /** 钻石 */
    diamond = -2,
}