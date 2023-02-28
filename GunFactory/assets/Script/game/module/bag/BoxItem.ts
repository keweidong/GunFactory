import App from "../../../core/App";
import { ItemDisplayData } from "../../component/ItemDisplay";
import { ControllerConst } from "../../consts/ControllerConst";
import { BagModel } from "./BagModel";
import { ItemBase, UseItemResultData } from "./ItemBase";
import { ItemData } from "./ItemDataManager";

//箱子id
export enum BoxConst{
    //普通箱子
    GENERAL_BOX = 1,
    //稀罕箱子
    RARE_BOX = 2,
    //史诗箱子
    EPIC_BOX = 3,
}

/**
 * 箱子道具
 * 配置规则:3个参数为一组,第一个参数为道具id, 第二个跟第三个为随机产生的道具的范围
 */
export default class BoxItem extends ItemBase {
    /**
     * 箱子可以开出的道具列表
     */
    public itemList: {
        /**道具id */
        id: number;
        /**最少产生多少个道具 */
        minCnt: number;
        /**产生道具的个数波动范围 */
        range: number;
    }[] = [];
    /**
     * 使用道具
     * @param cnt 使用多少个道具
     */
    use(cnt: number = 1) {
        let data: UseItemResultData<ItemDisplayData[]> = {
            result: -3, items: []
        };
        let model = <BagModel>App.ControllerManager.getControllerModel(ControllerConst.Item);
        for (let i = 0; i < cnt; i++) {
            for (const iterator of this.itemList) {
                this.$useItem(iterator.id, iterator.minCnt, iterator.range, data, model);
            }
        }
        return data;
    }
    public setConfData(abo: ItemData) {
        super.setConfData(abo);
        if (!isNaN(abo.agrs0)) {
            this.itemList.push({
                id: abo.agrs0,
                minCnt: abo.agrs1,
                range: abo.agrs2
            })
        }
        if (!isNaN(abo.agrs3)) {
            this.itemList.push({
                id: abo.agrs3,
                minCnt: abo.agrs4,
                range: abo.agrs5
            })
        }
        if (!isNaN(abo.agrs6)) {
            this.itemList.push({
                id: abo.agrs6,
                minCnt: abo.agrs7,
                range: abo.agrs8
            })
        }
    }

    protected $useItem(id: number, minCnt: number, range: number, data: UseItemResultData<ItemDisplayData[]>, model: BagModel) {
        if (isNaN(id)) {
            return;
        }
        let cnt = minCnt + Math.ceil(Math.random() * range);
        let item = model.itmes[id];//根据id获取相应的物品
        if (item) {
            for (let i = 0; i < cnt; i++) {
                let resultData = item.use();//自动使用箱子里面的东西
                if (resultData.result === 0) {
                    data.result = 0;//只要有一个物品成功使用了,那就当这个箱子成功开启
                    data.items = data.items.concat(resultData.items);
                }
            }
        }
    }
    getItemPic() {
        return "Texture/ShopUI/" + this.data.itemIcon;
    }
   
    public meageResultData(result1: UseItemResultData<any>, result2: UseItemResultData<any>): UseItemResultData<any> {
        Log.error("子类必须继承重写方法: meageResultData");
        return null;
    }
}