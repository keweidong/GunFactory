import { CsvDataBase } from "../../core/config/CsvDataBase";
import DataMsrBase from "../../core/config/DataMsrBase";


/**
 * 顾客配置表
 */
export class RoleTalkDataManager extends DataMsrBase<RoleTalkData>{
    constructor() {
        super(RoleTalkData, "role_talk_data", "id");
    }

    /** 是否符合条件 */
    public check(talkId: number, streetId: number, cellId: number) {
        let data = this.getData(talkId);
        if(!data){
            CC_DEBUG && Log.trace('对话异常>>>>>>>>>>>>>', talkId)
            
        }
        let streetIdList = data.streetIdList;
        for (let i = 0; i < streetIdList.length; i++) {
            let id = streetIdList[i];
            if (id == -1 || id == streetId) {
                break;
            }
            if (i == streetIdList.length) {
                CC_DEBUG && Log.trace(`对话不合适，对话id: ${talkId}, 街道id：${streetId},`);
                return false;
            }
        }

        let cellIdList = data.cellIdList;
        for (let i = 0; i < cellIdList.length; i++) {
            let id = cellIdList[i];
            // if (id == -1 || id == cellId) {
            if(id == cellId){
                break;
            }
            if (i == cellIdList.length - 1) {
                CC_DEBUG && Log.trace(`对话不合适，对话id: ${talkId}, 摊位id：${cellId} `);
                return false;
            }
        }
        return true;
    }
}

export class RoleTalkData extends CsvDataBase {
    /**
    * 对话id
    */
    readonly id: number = null;
    /**
    * 对话内容
    */
    readonly talkStr: string = null;
    /**
    * 所适合的街道
    */
    readonly streetList: string = null;
    /**
    * 所适合的摊位
    */
    readonly cellList: string = null;
    /**
    * 对话类型
    */
    readonly talkType: number = null;
    /**
    * 对话顺序
    */
    readonly seq: number = null;
    /**
    * 对话时间
    */
    readonly talkTime: number = null;
    /**
    * 对话状态
    */
    readonly state: string = null;
    readonly isShowFood: number = null;

    public streetIdList: number[] = [];
    public cellIdList: number[] = [];
    public stateList: number[] = [];

    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        let temp = this.streetList.split("|")
        for (let i = 0; i < temp.length; i++) {
            this.streetIdList.push(parseInt(temp[i]));
        }

        temp = this.cellList.split("|")
        for (let i = 0; i < temp.length; i++) {
            this.cellIdList.push(parseInt(temp[i]));
        }

        temp = this.state.split("|")
        for (let i = 0; i < temp.length; i++) {
            this.stateList.push(parseInt(temp[i]));
        }
        return result;
    }

}