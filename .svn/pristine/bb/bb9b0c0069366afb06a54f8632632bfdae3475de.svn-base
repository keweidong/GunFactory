import { CsvDataBase, CsvDataList, DataMsrBase } from "./ConfigClass";
/**
 * 摊位的配置数据
 */
export default class MineCellDataMgr extends DataMsrBase<MineCellDataList>{
    // protected datas: Map<Integer, Map<number, MineCellData>> = {};
    // protected dataCnt: Map<number, number> = {};
    constructor() {
        super(MineCellDataList, "kuangdong_config", "kuangDongId");
    }
    /**
     * 根据矿场id跟层级获取配置数据
     * @param mineId 矿场id
     * @param cell 第几层
     */
    public getConfig(mineId: number, cell: number) {
        return this.getData(mineId).getData(cell);
    }

}
export class MineCellDataList extends CsvDataList<MineCellData> {
    constructor() {
        super(MineCellData);
    }
}
/**
 * 摊位数据
 */
export class MineCellData extends CsvDataBase {
    /**
    * 场景id
    */
    readonly sceneId: number = null;
    /**
    * 摊位ID
    */
    readonly id: number = null;
    /**
    * 名字
    */
    readonly name: string = null;
    /**
    * 开启所需代币
    */
    readonly openChips: number = null;
    /**
    * 直接使用超级现金开启
    */
    readonly superCash: number = null;
}
declare global {
    interface ConfigMap {
        "MineCellDataMgr": MineCellDataMgr;
    }
}