import App from "../../../core/App";
import { ItemDisplayData } from "../../component/ItemDisplay";
import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { GameUIConst } from "../GameUI/GameUIConst";
import { CostType } from "./BagController";
import { ItemBase, UseItemResultData } from "./ItemBase";
import { ItemData } from "./ItemDataManager";

export default class SuperCashItem extends ItemBase {
    protected _name: string = null;
    /**
     * 使用道具
     * @param cnt 使用多少个道具
     */
    use(cnt: number = 1): UseItemResultData<ItemDisplayData[]> {
        let items: ItemDisplayData[] = [];
        let data: UseItemResultData<ItemDisplayData[]> = {
            result: 0,
            items: items
        };
        let addCnt = 0;
        for (let i = 0; i < cnt; i++) {
            let random = this.data.agrs0 + Math.ceil(Math.random() * this.data.agrs1);
            addCnt += random;
            items.push({
                item: this,
                arg0: random
            })
        }
        let world: WorldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        world.superCash += addCnt;
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, world.superCash, addCnt);
        return data;
    }
    public getName() {
        return this._name;
    }
    public setConfData(abo: ItemData) {
        super.setConfData(abo);
        this._name = abo.name.format(abo.agrs0);
    }
    playUseItemAni(data: ItemDisplayData, cnt: number = 0) {
        super.playUseItemAni(data, cnt);
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.diamond);
    }
    getItemPic() {
        return "Texture/ShopUI/" + this.data.itemIcon;
    }
    /**
    * 合并使用物品的返回结果
    * @param result1 结果1
    * @param result2 结果2
    */
    public meageResultData(result1: UseItemResultData<number>, result2: UseItemResultData<number>): UseItemResultData<number> {
        result1.items += result2.items;
        return result1;
    }
    /**
     * 获取超级现金的数量
     * @returns {number} 超级现金的数量
     */
    public getCnt(): number {
        return this.data.agrs0;
    }
}