import BaseController from "../../../core/mvc/controller/BaseController";
import WorldScene from "../GameMain/object/scene/WorldScene";
import App from "../../../core/App";
import { ViewConst } from "../../consts/ViewConst";
import LayerManager from "../../LayerManager";
import { NotificationConst, GameNotificationConst } from "../../consts/NotificationConst";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "../GameMain/GameConst";
import { OpenTypeConst, OpenConst } from "../SystemOpen/SystemOpenConst";
import { GameUIConst, NewsTypeConst } from "../GameUI/GameUIConst";
import FriendEventDataManager from "../GameMain/config/FriendEventDataManager";
import FriendCircleDataManager from "../GameMain/config/FriendCircleDataManager";
import FriendCircleView from "./FriendCircleView";
import Toast from "../../../core/utils/Toast";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
import { FriendCircleModel } from "./FriendCircleModel";
import { FriendCircleConst, FriendCircleType } from "./FriendCircleConst";
import { register } from '../../ConfigManager';
import { FriendCircleData } from '../GameMain/config/FriendCircleDataManager';
import { GameText } from "../../../core/lang/GameText";

export default class FriendCircleController extends BaseController {
    public worldScene: WorldScene;
    protected _model: FriendCircleModel = null;
    protected friendCircleView: FriendCircleView = null;

    /** 朋友圈配置 */
    public friendCircleDataManager: FriendCircleDataManager = null;
    /** 朋友圈事件配置 */
    public friendEventDataManager: FriendEventDataManager = null;

    /** 游戏日程时间配置 */
    protected gametimeConf: Gametime = null;
    protected curId: number;
    /** 当前触发的朋友圈 列表index */
    protected curIndex: number = null;
    /** 记录朋友圈触发失败次数 */
    protected failNum: number = null;
    public constructor() {
        super();
        App.ViewManager.register(ViewConst.FriendCircleView, {
            prefabName: "FriendCircleView",
            parent: LayerManager.UI_Popup,
            controller: this
        });

        // App.ViewManager.register(ViewConst.ShotView, {
        //     prefabName: "ShotView",
        //     parent: LayerManager.UI_Popup,
        //     controller: this
        // });
        this.setModel(new FriendCircleModel(this));
        let notificationCenter = App.NotificationCenter;

        notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 100);

    }
    public initGame() {
        this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);

        this.friendCircleDataManager = App.ConfigManager.friendCircleDataManager;
        this.friendEventDataManager = App.ConfigManager.friendEventDataManager;
        this.gametimeConf = App.ConfigManager.gameConf.game.gametime;
        this._model.init();
        this.initModuleEvent();
        this.initNotificationEvent();
    }

    /**
     *注册模块消息
    */
    protected initModuleEvent() {
        this.registerFunc(FriendCircleConst.OpenView, this.openFriendCircle, this);
        this.registerFunc(FriendCircleConst.OpenTick, this.openTick, this);
        this.registerFunc(FriendCircleConst.CreateFriend, this.guideFriendCircle, this);
        this.registerFunc(FriendCircleConst.IsFirstLogin_Everyday, this.logindaily, this);
    }

    protected initNotificationEvent() {
        let notificationCenter = App.NotificationCenter;
        notificationCenter.addListener(NotificationConst.SYS_OPEN, this.checkOpen, this);
        notificationCenter.addListener(GameNotificationConst.C2G_UNLOCK_SHAFT, this.unlockShaft, this);
        notificationCenter.addListener(GameNotificationConst.UNLOCK_NEW_CaiShi, this.onUnlockFood, this);
        notificationCenter.addListener(NotificationConst.UNLOCK_NEWCHEF, this.onUnlockChef, this);
        notificationCenter.addListener(NotificationConst.UNLOCK_NEWWAITER, this.onUnlockWaiter, this);
        notificationCenter.addListener(NotificationConst.TRIGGER_STAR_FRIEND, this.starFriend, this);
    }

    /** 检测朋友圈开启 */
    protected checkOpen(systemIndex: number, isOpen: boolean) {
        if (systemIndex == OpenTypeConst.FRIEND_CIRCLE && isOpen) {
            App.NotificationCenter.removeListener(NotificationConst.SYS_OPEN, this.checkOpen, this);
            this.openTick();
        }
    }

    /** 开启定时器 */
    protected openTick() {
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FRIEND_CIRCLE);
        if (!isOpen) {
            return;
        }

        if (!App.ViewManager.isShow(ViewConst.NewsView)) {
            return;
        }
        let isExists = App.TimerManager.isExists(this.tick, this)
        if (isExists) {
            App.TimerManager.remove(this.tick, this);
        }
        App.TimerManager.doTimer(1000, 0, this.tick, this);
    }

    protected nextTick: number = null;
    public tick() {

        if (!App.ViewManager.isShow(ViewConst.NewsView)) {
            return;
        }

        /** 获取未读的朋友圈 */
        let notReadIndex = this._model.notReadFriendCircle();
        if (notReadIndex > -1) {
            // 有未读的朋友圈
            let temp = this._model.getSaveDataByIndex(notReadIndex);
            let data = this.getDataByFriendId(temp.friendId, temp.time);
            let url = data.icon;
            let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FRIEND_CIRCLE);
            if (isOpen) {
                this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Friend, true, `${data.name}发了一条朋友圈`, url, data.icon);
                App.TimerManager.remove(this.tick, this);
                return;
            }

        }
        else {
            // 没有未读的朋友圈 判断是否有朋友圈需要触发
            // this.triggerFriendCircle();
        }
    }

    /**触发朋友圈 */
    triggerFriendCircle() {
        // // 没有未读的朋友圈 判断是否有朋友圈需要触发
        // let nextEventId = this._model.getNextEventId();
        // if (nextEventId == undefined) {
        //     nextEventId = 1;
        // }
        // if (nextEventId > 0 || nextEventId === 0) {
        //     let config = this.friendEventDataManager.getData(nextEventId);
        //     // if (config.heartValue <= this.worldScene.playerDto.heart) {
        //     // 爱心值达到解锁条件
        //     let day = config.day - 1;
        //     let time = config.time;
        //     let onlinetime = (this.worldScene.onlinetime - this.worldScene.schedulestarttime) * this.gametimeConf.zoomtime + this.gametimeConf.gamestarttime;
        //     let date = new Date(onlinetime);
        //     let curDay = date.getDay();
        //     let startDay = new Date(this.gametimeConf.gamestarttime).getDay();
        //     curDay = curDay - startDay;
        //     let curHour = date.getHours();

        //     // if ((curDay >= day && day > -1 && curHour >= time) || (day < 0 && (this.worldScene.onlinetime - this.worldScene.schedulestarttime) >= this.nextTick)) {
        //     if ((day < 0 && (this.worldScene.onlinetime - this.worldScene.schedulestarttime) >= this.nextTick)) {
        //         let prob = config.prob;
        //         let addProb = config.addProb;
        //         let random = App.RandomUtils.limitInteger(0, 100);
        //         if (prob + this.failNum * addProb >= random) {
        //             // 重置失败次数
        //             this.failNum = 0;
        //             // 增加一条朋友圈
        //             let data = this.getEventById(config.id, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        //             this._model.addFriendCircle(nextEventId, data.friendCircleId, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        //             this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Friend, true, `${data.name}发了一条朋友圈`, data.icon);
        //             // 有朋友圈消息了 停掉定时器
        //             App.TimerManager.remove(this.tick, this);
        //         }
        //         else {
        //             this.failNum++;
        //         }
        //         if (day < 0) {
        //             this.nextTick = (this.worldScene.onlinetime - this.worldScene.schedulestarttime) + time * 60 * 1000;
        //         }
        //     }
        //     // }
        // }
    }
    /**
     * 每日登录触发一次朋友圈
     */
    logindaily() {

        let friendCircleType = FriendCircleType.denglu;

        if (!this.worldScene.playerDto.loginDaynumber) {
            //如果登录天数为null,则默认为1
            this.worldScene.playerDto.loginDaynumber = 1;
        }
        if (!this.worldScene.playerDto.registerTime) {
            //如果注册时间为null,则现在的时间就是注册时间
            this.worldScene.playerDto.registerTime = Date.now();
        }

        //计算下注册的天数
        let registerday = Math.floor(new Date(Date.now()).getTime() / (60000 * 60 * 24)) - Math.floor(new Date(this.worldScene.playerDto.registerTime).getTime() / (60000 * 60 * 24));
        Log.trace("注册的天数为", registerday);

        this.worldScene.playerDto.registerDaynumber = registerday + 1;
        // Math.floor((now - new Date(Date.now()).getTimezoneOffset() * 60 * 1000) / 1000 / 60 / 60 / 24)

        if (registerday + 1 >= this.worldScene.playerDto.loginDaynumber) {
            //添加一个朋友圈
            this.addFriendCircle(friendCircleType, this.worldScene.playerDto.loginDaynumber);
            //朋友圈触发添加完后再把登录天数加1
            this.worldScene.playerDto.loginDaynumber++;
        }
    }
    /**
     * 
     * @param friendID 明星来啦
     */
    starFriend(starID: number) {
        let friendCircleType = FriendCircleType.starFriend;
        starID++;
        this.addFriendCircle(friendCircleType, starID);
    }
    /**
     * 解锁厨师
     * @param friendID 朋友圈的id
     */
    onUnlockChef(friendID: number) {
        let friendCircleType = FriendCircleType.unlockChef;

        this.addFriendCircle(friendCircleType, friendID);
    }
    /**
     * 
     * @param friendID 解锁新的服务员
     */
    onUnlockWaiter(friendID: number) {
        let friendCircleType = FriendCircleType.unlockWaiter;
        this.addFriendCircle(friendCircleType, friendID);
    }

    /**
     * 解锁新餐厅 
     * @param shaft 矿层的id
     */
    unlockShaft(shaftid: number) {
        let friendCircleType = FriendCircleType.unlockshaft;
        this.addFriendCircle(friendCircleType, shaftid);
    }
    /**
    * 解锁菜式的朋友圈
    * @param foodIndex 菜式在当前场景的序号
    */
    protected onUnlockFood(foodIndex: number) {
        // let result = this.worldScene.sceneMgr.nowScene.foodMsr.unlockFood(foodIndex);
        // if (result === 0) {

        let friendCircleType = FriendCircleType.unlockCaishi;
        this.addFriendCircle(friendCircleType, foodIndex);

        // } 
    }
    /**增加一个朋友圈 */
    public addFriendCircle(friendCircleType: number, id: number) {
        let nextEventId = friendCircleType;
        //通过添加朋友圈的类型添加朋友圈
        // switch (friendCircleType) {
        //     case 0:

        //         break;
        //     case 1:

        //         break;
        //     case 2:

        //         break;
        //     default:

        //         break;
        // }
        // let nextEventId = this._model.getNextEventId();
        if (nextEventId == undefined) {
            nextEventId = 0;
        }
        let config = this.friendEventDataManager.getData(nextEventId);
        let data = this.getEventById(nextEventId, id, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        if (!data) {
            return;
        }
        this._model.addFriendCircle(nextEventId, data.friendCircleId, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));

        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FRIEND_CIRCLE);
        if (isOpen) {
            this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Friend, true, `${data.name}发了一条朋友圈`, data.icon);

        }

        // let data = this.getEventById(eventId, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        // this._model.addFriendCircle(eventId, data.friendCircleId, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        // this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Friend, true, `${data.name}发了一条朋友圈`, data.icon);
    }

    /** 通过朋友圈id获取数据 */
    public getDataByFriendId(friendCircleId: number, time?: number) {
        let circleConfig = this.friendCircleDataManager.getData(friendCircleId);
        if (!circleConfig) {
            Log.warn("没有此条朋友圈");
            return;
        }
        let nameLen = circleConfig.userList.length;
        let randomName = App.RandomUtils.limitInteger(0, nameLen - 1);
        let name = circleConfig.userList[randomName];
        if (name.indexOf("$") > -1) {
            name = this.worldScene.playerDto.nickName;
        }
        let icon = circleConfig.iconList[randomName];
        if (icon.indexOf("$") > -1) {
            icon = this.worldScene.playerDto.head;
        }
        else {
            icon = `Texture/guide/${icon}`;
        }
        let likeName = circleConfig.friends.replace('$', this.worldScene.playerDto.nickName);
        let randomImg = App.RandomUtils.randomArray(circleConfig.imgList);
        let replyList: string[] = [];
        for (let i = 0; i < circleConfig.replyList.length; i++) {
            let reply = circleConfig.replyList[i];
            reply.replace('$', this.worldScene.playerDto.nickName);
            replyList.push(reply);
        }

        let curTime = (this.worldScene.onlinetime - this.worldScene.schedulestarttime);
        let dec = (curTime - time) * this.gametimeConf.zoomtime;
        let sec = Math.floor(dec / 1000);
        let min = Math.floor(sec / 60);
        if (dec < 20) {
            var timeStr = GameText.getText(lang.friend_circle_just);//"刚刚";
        }
        else if (min < 1) {
            var timeStr = GameText.getText(lang.friend_circle_s).format(sec);//"秒前";
        }
        else {
            let hours = Math.floor(sec / (60 * 60));
            if (hours < 1) {
                var timeStr = GameText.getText(lang.friend_circle_m).format(min);//"分钟前";
            }
            else {
                let day = Math.floor(sec / (60 * 60 * 24));
                if (day < 1) {
                    var timeStr = GameText.getText(lang.friend_circle_h).format(hours);// "小时前";
                }
                else {
                    if (day == 1) {
                        var timeStr = GameText.getText(lang.friend_circle_yesterday);//"昨天";
                    }
                    else if (day < 30) {
                        var timeStr = GameText.getText(lang.friend_circle_d).format(day);// "天前";
                    }
                    else {
                        var timeStr = GameText.getText(lang.friend_circle_long_time_ago);//"很久之前";
                    }
                }
            }
        }
        let data: FriendCircleShowData = {
            friendCircleId: friendCircleId,
            /** 头像 */
            icon: icon,
            /** 名字 */
            name: name,
            /** 朋友圈描述 */
            desc: circleConfig.desc,
            /** 点赞人名 */
            likeName: likeName,
            /** 评论 */
            replyList: replyList,
            img: `Texture/game/FriendCircle/${randomImg}`,
            bgSource: `Texture/game/FriendCircle/${circleConfig.bgSource}`,
            time: timeStr,
            userName: this.worldScene.playerDto.nickName,
            userIcon: this.worldScene.playerDto.head,
        }
        return data;
    }

    /** 获取朋友圈数据 */
    public getEventById(eventId: number, id: number, time: number) {
        // let eventConfig = this.friendEventDataManager.getData(id);
        // let friendCircleId = App.RandomUtils.randomArray(eventConfig.circleIdList);
        let friendCircleId: number;
        // for (let i = 0; i <= this.friendCircleDataManager.getAllDatas().length; i++) 
        for (let temp in this.friendCircleDataManager.getAllDatas()) {
            // Log.trace(">>>>>>", temp);
            if (this.friendCircleDataManager.getData(parseInt(temp)).type == eventId) {
                if (this.friendCircleDataManager.getData(parseInt(temp)).typeId == id) {
                    friendCircleId = parseInt(temp);
                    break;
                }
            }
        }




        return this.getDataByFriendId(friendCircleId, time);
    }

    /** 打开朋友圈 */
    public openFriendCircle() {
        let isOpen = this.applyControllerFunc(ControllerConst.SystemOpen, OpenConst.CHCEK_OPEN, OpenTypeConst.FRIEND_CIRCLE);
        if (!isOpen) {
            return;
        }
        if (App.ViewManager.isShow(ViewConst.FriendCircleView)) {
            return;
        }

        let saveData = this._model.getSaveData();
        if (saveData.length < 1) {
            Toast.launch(GameText.getText(lang.friend_circle_no_message));
            return;
        }

        let index = saveData.length - 1;
        // let isRead = this._model.getFriendCircleState(index);
        let isRead = this._model.notReadFriendCircle();
        if (isRead > -1) {
            // 记录朋友圈阅读状态
            this._model.readFriendCircle(index);
            // 开启定时器
            this.openTick();
        }
        App.ViewManager.open(ViewConst.FriendCircleView);
        this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Friend, false);
        App.NotificationCenter.dispatch(NotificationConst.READ_FRIEND_CIRCLE);
    }

    /** 获取朋友圈显示数据 */
    protected getFriendCircleData() {
        let saveData = this._model.getSaveData();
        let datas: FriendCircleShowData[] = [];
        let data = saveData[0];
        let showData = this.getDataByFriendId(data.friendId);
        datas.push(showData);
        for (let i = saveData.length - 1; i >= 0; i--) {
            let data = saveData[i];
            let showData = this.getDataByFriendId(data.friendId, data.time);
            datas.push(showData);
        }
        return datas;
    }


    /** 模拟一条朋友圈 新手 */
    protected guideFriendCircle(eventId: number) {
        // let data = this.getEventById(eventId, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        // this._model.addFriendCircle(eventId, data.friendCircleId, (this.worldScene.onlinetime - this.worldScene.schedulestarttime));
        // this.applyControllerFunc(ControllerConst.GameUI, GameUIConst.SET_NEWS, NewsTypeConst.Friend, true, `${data.name}发了一条朋友圈`, data.icon);
    }

    onOpenView(view: IBaseView) {
        switch (view.viewId) {
            case ViewConst.FriendCircleView:
                let datas = this.getFriendCircleData();
                this.friendCircleView.setData(datas);
                break;
        }
    }

}