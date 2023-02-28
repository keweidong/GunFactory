import { CsvDataBase } from "../../game/module/GameMain/object/scene/config/ConfigClass";
import { ICsvDataBase } from "./CsvDataBase";
import DataMsrBase, { CsvDataList } from "./DataMsrBase";
export const CONFIG_FILE_DIR = "config/";
export default class LevelDataMsr<T extends ILevelData> extends DataMsrBase<T>{
    protected datas: { [id: number]: T } = {};
    public constructor(protected _class: { new(): T }, protected _levelDataClass: { new(): ICsvDataBase }, protected csvFileName, protected levelFileName) {
        super(_class, csvFileName);
    }
    public async load() {
        let str = await this.loadFile(this.levelFileName);
        let list = str.split(/\n/);
        //类型列表
        let typeList = list[0].split(",");
        //关键字列表
        let keyList = list[2].split(",");
        let levelDatas: ICsvDataBase[][] = [];
        let arrLen = list.length;
        for (let i = 3; i < arrLen; i++) {
            if (list[i]) {
                let lines = list[i].split(",");
                let item: ICsvDataBase = new this._levelDataClass();;
                item.$parseData(lines, typeList, keyList);
                if (!levelDatas[lines[0]]) {
                    levelDatas[lines[0]] = [];
                }
                levelDatas[lines[0]].push(item);
            }
        }
        await super.load();
        for (const key in this.datas) {
            this.datas[key].$setLevelDatas(levelDatas);
        }
    }
}

export interface ILevelData extends ICsvDataBase {
    $setLevelDatas(levelDatas: ICsvDataBase[][]);
    levelDataId?: number;
    /**等级数据 */
    levelDatas?: ICsvDataBase[];
}

export class LevelData<T extends ICsvDataBase> extends CsvDataBase implements ILevelData {
    levelDataId?: number = null;
    /**等级数据 */
    levelDatas?: T[] = null;
    getData(level: number): T {
        return this.levelDatas[level];
    }
    $setLevelDatas(levelDatas: T[][]) {
        this.levelDatas = levelDatas[this.levelDataId];
    }
    public getAllData() {
        return this.levelDatas;
    }

    public getCount() {
        return this.levelDatas.length;
    }
}

export class LevelDataList<T extends ILevelData> extends CsvDataList<T> implements ILevelData {
    $setLevelDatas(levelDatas: T[][]) {
        for (const key in this.datas) {
            this.datas[key].$setLevelDatas(levelDatas);
        }
    }
}

