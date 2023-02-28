import App from "../../core/App";
import { CsvDataBase } from "../../core/config/CsvDataBase";
import DataMsrBase from "../../core/config/DataMsrBase";
import { register } from "../ConfigManager";


/**
 * 顾客配置表
 */
export class RoleDataManager extends DataMsrBase<RoleData>{
    // protected groupDatas: { [id: number]: AssistData[] } = {};
    protected count = 0;
    constructor() {
        super(RoleData, "role_data", "id");
    }

    /** 随机取一条数据 */
    public getRandomData(): RoleData{
        let random = App.RandomUtils.limitInteger(1, this.dataCnt);
        let data = this.getData(random);
        if(data)
            return data;
        else
            return this.getRandomData();
    }

    /** 根据顾客id获取聊天列表 */
    public getTalkListById(id: number) {
        let data = this.getData(id);
        if (data)
            return data.talkIdList;
        else {
            CC_DEBUG && Log.trace("没有对话列表");
            return;
        }
    }
}

export class RoleData extends CsvDataBase {
    /**
    * id
    */
    readonly id: number = null;
    /**
    * 顾客类型
    */
    readonly roleType: number = null;
    /**
    * 顾客模型
    */
    readonly modelId: number = null;
    /**
    * 对话列表
    */
    readonly talkList: string = null;
    /**
     * 进店几率
     */
    readonly odds: number = null;

    public talkIdList: number[] = [];

    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        let temp = this.talkList.split("|")
        for (let i = 0; i < temp.length; i++) {
            this.talkIdList.push(parseInt(temp[i]));
        }
        return result;
    }
}
register(RoleDataManager, "RoleDataManager");
declare global {
    interface ConfigMap {
        /**广告配置 */
        "RoleDataManager": RoleDataManager;
    }
}
