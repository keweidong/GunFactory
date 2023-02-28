import { Platform } from "../../game/platform/Platform";
import App from "../App";
import { ICsvDataBase } from "./CsvDataBase";

interface CavDataObj {
    typeList: string[];
    titleList: string[];
    bodyList: string[];
    keyList: string[]
}
export const CONFIG_FILE_DIR = "config/";
export default class DataMsrBase<T extends ICsvDataBase>{
    protected datas: { [id: number]: T } = {};
    public constructor(protected _class: { new(): T }, protected csvFileName, protected indexKey?: string) {
    }
    /**
     * 加载csv数据
     */
    protected async loadFile(fileName: string) {
        try {
            if (Platform.instance.isGetRemoteRes()) {
                var str = await this.loadRemote(fileName);
            } else {
                var result: cc.TextAsset = await App.ResManager.getResAsync(CONFIG_FILE_DIR + fileName);
                // Log.trace("result>>>>>>>>>>>>>>>>>>>>>>" + result)
                var str = result.text;
                cc.loader.release(result);
            }
        } catch (error) {
            if (Platform.instance.isGetRemoteRes()) {
                var result: cc.TextAsset = await App.ResManager.getResAsync(CONFIG_FILE_DIR + fileName);
                var str = result.text;
            }
            Log.error("加载配置文件出错:", fileName, error)
            Log.trace(">>>>", error);

        }
        return str.replace(/\r\n/g, "\n");
    }
    public async load() {
        let str = await this.loadFile(this.csvFileName);
        let list = str.split(/\n/);
        //类型列表
        let typeList = list[0].split(",");
        //名称列表
        let titleList = list[1].split(",");
        //关键字列表
        let keyList = list[2].split(",");
        let arrLen = list.length;
        for (let i = 3; i < arrLen; i++) {
            if (list[i]) {
                let lines = list[i].split(",");
                let item: T = this.datas[lines[0]];
                if (!item) {
                    item = new this._class();
                    this.datas[lines[0]] = item;
                    this.dataCnt++;
                }
                item.$parseData(lines, typeList, keyList);
            }
        }
    }


    public loadRemote(url: string): Promise<string> {
        url = `https://wxclient.gzqidong.cn/gameConf/GunFactory/${versionInfo.packVersion}/${url}.csv?v=${Date.now()}`;
        return new Promise((resolve: Function, reject: Function) => {
            if (CC_JSB) {
                App.Http.requestAsync(url, null, "GET").then((str: string) => {
                    resolve(str);
                });
            } else {
                cc.loader.load({ url: url, type: 'text' }, function (err, texture) {
                    if (err) {
                        Log.error("loadRemote:", err)
                        reject(err);
                    } else {
                        resolve(texture);
                    }
                });
            }
        });

    }

    /**
     * 总共有多少条数据
     */
    public dataCnt: number = 0;
    public getAllDatas() {
        return this.datas;
    }
    public getData(index: number): T {
        let lvData: T = this.datas[index];
        if (lvData == null) {
            return null;
        }
        return lvData;
    }
}


/**
 * 配置分组
 */
export class CsvDataList<T extends ICsvDataBase>{

    public awardLevel: number[] = [];
    protected datas: T[] = [];
    id: number = null;
    public constructor(protected _class: { new(): T }) {
    }
    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let item = new this._class();
        item.$parseData(lines, typeList, keyList);
        this.datas.push(item);
        this.dataCnt = this.datas.length;
    }

    public createAwardLevel() {
        // let cnt = this.datas[0].cnt;
        // this.awardLevel[0] = 0;
        // let arrLen = this.datas.length;
        // for (let i = 1; i < arrLen; i++) {
        //     let data = this.datas[i];
        //     if (cnt !== data.cnt) {
        //         cnt = data.cnt;
        //         this.awardLevel.push(i);
        //     }
        // }
        // this.awardLevel.push(this.datas.length);
        // CC_DEBUG && Log.trace(" this.awardLevel", this.awardLevel);
    }
    dataCnt = 0;
    public getData(index: number) {
        return this.datas[index];
    }

    public getAllData() {
        return this.datas;
    }

    public getCount() {
        return this.dataCnt;
    }
}