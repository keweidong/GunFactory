import { CsvDataBase } from "../../../core/config/CsvDataBase";
import DataMsrBase from "../../../core/config/DataMsrBase";
import { GameText } from "../../../core/lang/GameText";
import { register } from "../../ConfigManager";



/**
 * 广告点配置表
 */
export class ItemDataManager extends DataMsrBase<ItemData>{
    constructor() {
        super(ItemData, "item_data", "id");
    }
}

export class ItemData extends CsvDataBase {
    /**
     * ID
    */
    readonly id: number = null;
    /**
    * 名字
    */
    name: string = null;
    /**
    * 物品类型
    */
    readonly itemType: number = null;
    /**
     * 物品说明
    */
    readonly desc: string = null;
    /**
    * 物品图标
    */
    readonly itemIcon: string = null;
    /**
    * 物品是否立即使用
    */
    readonly isNowUseItem: number = null;
    /**
    * 物品品质
    */
    readonly goldLevel: number = null;
    /**
    * 参数0(总个数)
    */
    readonly agrs0: number = null;
    /**
    * 参数1(必得2星的个数)
    */
    readonly agrs1: number = null;
    /**
    * 参数2(必得3星的个数)
    */
    readonly agrs2: number = null;
    /**
    * 参数3(必得4星的个数)
    */
    readonly agrs3: number = null;
    /**
    * 参数4(一次性5星的概率)
    */
    readonly agrs4: number = null;
    /**
    * 参数5(2星的概率)
    */
    readonly agrs5: number = null;
    /**
    * 参数6(3星的概率)
    */
    readonly agrs6: number = null;
    /**
    * 参数7(4星的概率)
    */
    readonly agrs7: number = null;
    /**
    * 参数8(5星的概率)
    */
    readonly agrs8: number = null;
    /**
    * 主管移速
    */
    readonly agrs9: number = null;
    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        this.name = GameText.getTextByStr(this.name);
        return result;
    }

}


register(ItemDataManager, "ItemDataManager");
declare global {
    interface ConfigMap {
        "ItemDataManager": ItemDataManager;
    }
}