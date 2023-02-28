import EffectUtils from "../../../core/utils/EffectUtils";
import { ItemDisplayData } from "../../component/ItemDisplay";
import { ItemData } from "./ItemDataManager";
/**
 * 使用道具后的返回数据
 */
export type UseItemResultData<T> = {
    /**
     * 使用道具结果: 0 使用物品成功, -1 物品数量不足, -2 不存在的物品, -3使用物品过程中出错
     */
    result: number,
    /**
     * 使用道具后,获得的物品跟数量
     */
    items?: T
}
export class ItemBase {
    /**
     * 道具属性
     */
    data: ItemData;
    /**
     * 道具数量
     */
    cnt: number;
    protected _desc: string = "";
    public setConfData(abo: ItemData) {
        this.data = abo;
    }

    /**
     * 获取道具的图片
     */
    getItemPic() {
        return "Texture/ShopUI/" + this.data.itemIcon;
    }
    public getName() {
        return this.data.name;
    }

    /**
     * 获取闲置现金的倍数,单位为当前的闲置现金
     * @returns {number} 闲置现金倍数
     */
    public getCnt(): number {
        return 0;
    }

    public getDisplayCnt(): string {
        return this.getCnt() + "";
    }

    /**
     * 使用道具
     * @param cnt 使用多少个道具
     * @returns [UseItemResultData] 使用道具后,获得的道具的具体数量
     */
    use(cnt: number = 1): UseItemResultData<any> {
        return { result: 0 };
    }
    /**
     * 合并使用物品的返回结果,子类必须继承重写
     * @param result1 结果1
     * @param result2 结果2
     */

    public meageResultData(result1: UseItemResultData<any>, result2: UseItemResultData<any>): UseItemResultData<any> {
        Log.error("子类必须继承重写方法: meageResultData");
        return null;
    }
    playGetItemAni(data: ItemDisplayData, cnt: number = 0) {
    EffectUtils.instance.playGetItemAni(data, cnt);
    }
    playUseItemAni(data: ItemDisplayData, cnt: number = 0) {
        EffectUtils.instance.playGetItemAni(data, cnt);
    }
}