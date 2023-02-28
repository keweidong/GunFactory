import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import BaseModel from "../../../core/mvc/model/BaseModel";
import { GameDataSaveKey } from "../../GameDataMsr";
import FriendEventDataManager from "../GameMain/config/FriendEventDataManager";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export class FriendCircleModel extends BaseModel implements IMemento {
    protected saveData: FriendCirCleSaveData[] = null;
    protected friendEventDataManager: FriendEventDataManager = null;

    public constructor($controller: BaseController) {
        super($controller);
        App.SaveManage.add(this, GameDataSaveKey.FRIEND_CIRCLE, false, true);
    }

    public init() {
        App.SaveManage.load(GameDataSaveKey.FRIEND_CIRCLE);
        this.friendEventDataManager = App.ConfigManager.friendEventDataManager;
    }

    public getSaveData() {
        return this.saveData;
    }


    // /**
    //  * 设置朋友圈事件阅读状态
    //  * @param isRead 是否已经阅读
    //  */
    // public setFriendCircleState(isRead: boolean) {
    //     this.saveData.isRead = isRead;
    // }

    // /**
    //  * 朋友圈事件
    //  * @param id 事件id
    //  */
    // public setCurFriendCircle(id: number) {
    //     this.saveData.id = id;
    //     this.saveData.num = 0;
    // }

    // public setFriendId(id: number) {
    //     this.saveData.friendId = id;

    // }

    // public addFailNum() {
    //     this.saveData.num++;
    // }

    // public addEvent() {
    //     let config = this.friendEventDataManager.getData(this.saveData.id + 1);
    //     if (config) {
    //         this.setCurFriendCircle(this.saveData.id + 1);
    //     }
    // }

    /** 获取下一个朋友圈事件id */
    public getNextEventId() {

        let lastData = this.saveData[this.saveData.length - 1];
        if (!lastData) {
            return;
        }
        let eventId = lastData.eventId;

        let config = this.getNextEventConfig(eventId + 1, 0);
        if (config)
            return config.id;
        else
            return;
    }

    /** 获取循环的朋友配置 */
    public getNextEventConfig(eventId: number, count: number) {
        count++;
        if (count > 10) {
            return;
        }
        let config = this.friendEventDataManager.getData(eventId);
        if (!config) {
            let datas = this.friendEventDataManager.getAllDatas();
            for (let key in datas) {
                let data = datas[key];
                if (data.day === 0) {
                    return data;
                }
            }
        }
        if (config.day === 0) {
            return config;
        }
        else {
            return this.getNextEventConfig(eventId + 1, count);
        }
    }

    /** 获取是否有朋友圈未读 */
    public notReadFriendCircle() {
        for (let i = 0; i < this.saveData.length; i++) {
            let data = this.saveData[i];
            if (!data.isRead) {
                return i;
            }
        }
        return -1;
    }

    /** 获取未读朋友圈数据
     *  @prama index 未读朋友圈列表index
     */
    public getSaveDataByIndex(index: number) {
        return this.saveData[index];
    }
    public updateDayData(key: string, day: number) {

    }
    /** 增加一条朋友圈 */
    public addFriendCircle(eventId: number, friendId: number, time: number) {
        this.saveData.push({
            eventId: eventId,
            friendId: friendId,
            isRead: false,
            time: time,
        });
        if (this.saveData.length > 15) {
            this.saveData.shift();
        }
    }

    /** 阅读朋友圈 */
    public readFriendCircle(index?: number) {
        // this.saveData[index].isRead = true;
        for (let i = 0; i < this.saveData.length; i++) {
            let data = this.saveData[i];
            data.isRead = true;
        }
    }

    /** 获取朋友圈状态 */
    public getFriendCircleState(index: number): boolean {
        return this.saveData[index].isRead
    }

    /**
    * 创建存档
    * 
    * @param {string} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
    * @returns {*} mydesciption
    * 
    * @author
    * @version
    */
    createMemento(key: string): FriendCirCleSaveData[] {
        return this.saveData;
    }
    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     * @param {string} key 同步的key值(有可能一个对象会有多个不同的key值, 同步存档的时候根据key值同步相应的存档)
     * 
     * @author
     * @version
     */
    setMemento(data: FriendCirCleSaveData[]) {
        if (data)
            this.saveData = data;
        else {
            this.saveData = [];
        }
    }
}