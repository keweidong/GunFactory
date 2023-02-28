import { CsvDataBase } from "../../../../core/config/CsvDataBase";
import DataMsrBase from "../../../../core/config/DataMsrBase";



const { ccclass, property } = cc._decorator;

/*
*每日任务配置表
*/
@ccclass
export default class FriendCircleDataManager extends DataMsrBase<FriendCircleData>{
    constructor() {
        super(FriendCircleData, "friend_circle_data");
    }
}

export class FriendCircleData extends CsvDataBase {
    /**
    * 序号
    */
    readonly id: number = null;
    /**
    * 类型
    * 判断朋友圈的类型
    */
    readonly type: number = null;
    /**
     * 类型Id
     * 每个类型下的朋友圈的ID
     */
    readonly typeId: number = null;
    /**
    * 背景图
    */
    readonly bgSource: string = null;
    /**
    * 头像
    */
    readonly icon: string = null;
    /**
     *  发圈人 
    */
    readonly user: string = null;
    /**
    * 朋友圈内容
    */
    readonly desc: string = null;
    /**
    * 朋友圈图片
    */
    readonly img: string = null;
    /**
    * 点赞
    */
    readonly friends: string = null;
    /**
    * 评论
    */
    readonly review: string = null;

    replyList?: string[] = [];
    userList?: string[] = [];
    iconList?: string[] = [];
    imgList?: string[] = [];

    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        this.replyList = this.review.split("|");
        this.userList = this.user.split("|");
        this.iconList = this.icon.split("|");
        this.imgList = this.img.split("|");
        return result;
    }
}
