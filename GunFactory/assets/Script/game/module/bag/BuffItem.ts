import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import { ItemDisplayData } from "../../component/ItemDisplay";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import { ItemBase, UseItemResultData } from "./ItemBase";
import { ItemData } from "./ItemDataManager";
/**
 * buff物品
 * arg0 buff基本持续时间
 * arg1 buff基本持续时间变化值
 * arg2 buff效果
 * arg3 buff效果变化值
 * arg4 buff对应的buffindex
 */

export default class BuffItem extends ItemBase {
    /**
      * 使用道具
      * @param cnt 使用多少个道具
      */
    use(cnt: number = 1): UseItemResultData<ItemDisplayData[]> {
        let world: WorldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        // let items: ItemDisplayData[] = [];
        let data: UseItemResultData<ItemDisplayData[]> = {
            result: 0,
            items: []
        };
        let nowKcId = world.sceneMgr.nowSceneId;
        for (let i = 0; i < cnt; i++) {
            let randomTime = App.RandomUtils.limitInteger(this.data.agrs0, this.data.agrs0 + this.data.agrs1);
            let randomValue = App.RandomUtils.limitInteger(this.data.agrs2, this.data.agrs2 + this.data.agrs3);
            // if (this.data.agrs5) {
            //     //摊位id
            //     world.buffMsr.addKdBuff(nowKcId,this.data.agrs5, {
            //         buffIndex: this.data.agrs4,
            //         buffValue: randomValue,
            //         buffEndTime: Date.now() + (randomTime * 1000)
            //     })
            // } else {
            world.buffMsr.addKcBuff(nowKcId, {
                buffIndex: this.data.agrs4,
                buffValue: randomValue,
                buffEndTime: App.DateUtils.Now() + (randomTime * 1000)
            });

            data.items.push({
                item: this,
                arg0: randomValue,
                arg1: randomTime
            });
        }
        return data;
    }
    public setConfData(abo: ItemData) {
        super.setConfData(abo);
        let str = null;
        if (abo.agrs0 > 3600) {
            str = abo.agrs0 / 3600 + GameText.getText(lang.common_hour);
        } else if (abo.agrs0 >= 60) {
            str = abo.agrs0 / 60 + GameText.getText(lang.common_minute);
        } else {
            str = abo.agrs0 + GameText.getText(lang.common_second);
        }
        this._name = abo.name.format(str, abo.agrs2);
        cc.sys.os
    }
    protected _name: string = null;
    public getName() {
        return this._name;
    }
    /**
    * 合并使用物品的返回结果
    * @param result1 结果1
    * @param result2 结果2
    */
    public meageResultData(result1: UseItemResultData<ItemDisplayData[]>, result2: UseItemResultData<ItemDisplayData[]>): UseItemResultData<ItemDisplayData[]> {
        // result1.items.add(result2.items);
        return result1;
    }

}
