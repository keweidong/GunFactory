import App from "../../../core/App";
import { ItemDisplayData } from "../../component/ItemDisplay";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GameUIConst } from "../GameUI/GameUIConst";
import { CostType } from "./BagController";
import { ItemBase, UseItemResultData } from "./ItemBase";
import { ItemData } from "./ItemDataManager";
/**
 * 金币道具
 * agrs0 多少秒收益
 * agrs1 多少秒收益变化值
 * agrs2 基本金钱
 * 最终金钱=(agrs0 + agrs1 * 随机数) * 每秒收益 + agrs2
 */
export default class MoneyItem extends ItemBase {
    protected world: WorldScene = null;
    protected money: MyBigLong = MyBigLong.create(0, 0);
    /**保底金钱 */
    protected baseMoney: number = 0;
    constructor() {
        super();
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
    }
    public setConfData(abo: ItemData) {
        super.setConfData(abo);
        this.baseMoney = abo.agrs2 || 0;
        if (abo.agrs0) {
            if (abo.agrs0 > 3600) {
                this._name = abo.name.format(abo.agrs0 / 3600);
            }
            else if (abo.agrs0 >= 60) {
                this._name = abo.name.format(abo.agrs0 / 60);
            } else {
                this._name = abo.name.format(abo.agrs0);
            }
        } else {
            this._name = abo.name.format(MyBigLong.toString(this.baseMoney));
        }
    }
    protected _name: string = null;
    public getName() {
        return this._name;
    }
    /**
     * 使用道具
     * @param cnt 使用多少个道具
     */
    use(cnt: number = 1): UseItemResultData<ItemDisplayData[]> {
        let world: WorldScene = this.world;
        let items: ItemDisplayData[] = [];
        let data: UseItemResultData<ItemDisplayData[]> = {
            result: 0,
            items: items
        };

        let addCnt = 0;
        for (let i = 0; i < cnt; i++) {
            let random = this.data.agrs0 + Math.floor(Math.random() * (1 + this.data.agrs1));
            addCnt += random;
            items.push({
                item: this,
                arg0: MyBigLong.create(world.sceneMgr.idleMoneyRate).multiply(random)
            })
        }
        let money = MyBigLong.tempNum.init(world.sceneMgr.idleMoneyRate).multiply(addCnt).add(this.baseMoney);
        world.sceneMgr.nowScene.nowMoneyAdd(money);
        return data;
    }
    getItemPic() {
        return "Texture/ShopUI/" + this.data.itemIcon;
    }
    playUseItemAni(data: ItemDisplayData, cnt: number = 0) {
        super.playUseItemAni(data, cnt);
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.coin);
    }
    /**
    * 合并使用物品的返回结果
    * @param result1 结果1
    * @param result2 结果2
    */
    public meageResultData(result1: UseItemResultData<ItemDisplayData[]>, result2: UseItemResultData<ItemDisplayData[]>): UseItemResultData<ItemDisplayData[]> {
        // result1.items.add(result2.items);
        // let newItems = [result1.items[0]];
        // let arrLen = result1.items.length;
        // for (let i = 1; i < arrLen; i++) {
        //     (<MyBigLong>newItems[0].arg0).add(result1.items[i].arg0);
        // }
        // arrLen = result2.items.length;
        // for (let i = 0; i < arrLen; i++) {
        //     (<MyBigLong>newItems[0].arg0).add(result2.items[i].arg0);
        // }
        // result1.items = newItems;
        return result1;
    }
    /**
     * 获取能够拿到的奖励数量
     * @returns {number} 闲置现金倍数
     */
    public getCnt(): number {
        return this.world.sceneMgr.idleMoneyRate.value * this.data.agrs0 + this.baseMoney;
    }
    public getDisplayCnt(): string {
        return MyBigLong.toString(this.getCnt());
    }
}