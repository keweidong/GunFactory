import { register } from "../../../../../ConfigManager";
import { CsvDataBase, DataMsrBase } from "./ConfigClass";
/**
 * 场景配置数据管理器
 */
export default class SceneDataMsr extends DataMsrBase<SceneData> {
    constructor() {
        super(SceneData, "SceneData", "id");
    }
}
/**
 * 场景数据
 */
export class SceneData extends CsvDataBase {
    /**
    * ID
    */
    readonly id: number = null;
    /**
    * 名字
    */
    readonly name: string = null;
    /**
    * 开启所需前置矿场
    */
    readonly openPreId: number = null;
    /**
    * 开启所需代币
    */
    readonly openChips: number = null;

    /**
    * 开启所需代币货币类型
    */
    readonly openChipsType: number = null;

    /**
    * 开启所需菜式达到等级的数量
    */
    readonly foodCnt: number = null;
    /**
     * 开启所需菜式等级
     */
    readonly foodLevel: number = null;
    /**
     * 宣传等级
     */
    readonly guestLevel: number = null;
    /**
     * 厨师等级
     */
    readonly chefLevel: number = null;

    /**
    * 服务员等级
    */
    readonly waiterLevel: number = null;

    /**
     * 玩家等级
     */
    readonly playerLevel: number = null;

    /**
    * 货币类型
    */
    readonly moneyType: number = null;

    /**
     * 开启所需消耗的超级现金
     */
    readonly superCash: number = 0;
    /**
     *  开启矿场时候拥有的默认金钱
     */
    readonly defaultMoney: number = 0;
    /**
     * 创建顾客基础间隔时间
     */
    readonly createCusTime: number = 5000;
    /**
    * 最大排队数量
    */
    readonly maxWaitCreateCnt: number = 30;

    readonly icon: number = 1;

    /**
     * 在线收益倍率
     */
    readonly onlineRewardRate: number = 6;
    /**
     * 场景通关后,奖励的金币数量
     */
    readonly reawrdMoney: number = 0;
    protected readonly customers: string = "";
    customerList: number[] = null;
    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        this.customerList = this.customers.split("|").map((value) => parseInt(value));
        return result;
    }
}
register(SceneDataMsr, "SceneDataMsr");
declare global {
    interface ConfigMap {
        "SceneDataMsr": SceneDataMsr;
    }
}