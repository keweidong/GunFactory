import { CsvDataBase } from "../../../core/config/CsvDataBase";
import DataMsrBase, { CsvDataList } from "../../../core/config/DataMsrBase";
import { register } from "../../ConfigManager";
const { ccclass, property } = cc._decorator;
/** 
*商店配置表
*/
export default class ShopDataManager extends DataMsrBase<ShopDataList> {
    constructor() {
        super(ShopDataList, "shop_item");
    }
}

export class ShopDataList extends CsvDataList<ShopData>{
    constructor() {
        super(ShopData);
    }
}

/**
 * 
*/
export class ShopData extends CsvDataBase {
    /**
     * ID
     */
    readonly itemIndex: number = null;
    /**
    * 名字
    */
    readonly name: string = null;
    /**
    * 商店类型
    */
    readonly shopType: number = null;
    /**
    * 需要的超级现金
    */
    readonly superCash: number = null;
    /**
     * 需要多少人民币
     */
    readonly yuan: number = null;

}
register(ShopDataManager, "ShopDataManager");
declare global {
    interface ConfigMap {
        /**广告配置 */
        "ShopDataManager": ShopDataManager;
    }
}