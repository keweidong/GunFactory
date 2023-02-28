// import { MusicNameEnum } from './assets/Script/game/module/GameMain/MusicNameEnum';

interface String {
    format(...param): string;
}
interface Date {
    Format(fmt: string): string;
}


interface IMemento {
    /**
     * 创建存档
     * 
     * @param {string} key 存档的key值(有可能一个对象会有多个不同的key值, 创建存档的时候根据key值返回相应的存档)
     * @returns {*} mydesciption
     * 
     * @author
     * @version
     */
    createMemento(key: string): any;
    /**
     * 同步存档
     * 
     * @param {*} data 同步的数据
     * @param {string} key 同步的key值(有可能一个对象会有多个不同的key值, 同步存档的时候根据key值同步相应的存档)
     * 
     * @author
     * @version
     */
    setMemento(data: any, key: string);
    /**
     * 更新每日数据
     * @param key 
     * @param day 天数
     */
    updateDayData?(key: string, day: number);
    /**
     * 更新每周数据(暂未实现)
     */
    updateWeekData?(key: string);
    /**
    * 更新每月数据(暂未实现)
    */
    updateMoonData?(key: string);
}

/**
 * 玩家基本信息
 */
interface PlayerInfo {
    /**玩家id */
    id: string;
    /**玩家账号 */
    account: string;
    /**玩家当前金币 */
    gold: number;
    /**玩家当前钻石 */
    diamond: number;
    /**昵称 */
    nickName: string;
    /**头像 */
    head: string;
    /**性别 */
    sex: number;
    token: string;
    /** 当前管理后台时间 */
    timestamp: number;
    /** 上次存档时间 */
    saveTime?: number;
    /**
     * 注册时间
     */
    registerTime: number;
    /**登陆天数 */
    loginDaynumber: number;
    /**注册天数 */
    registerDaynumber: number;
    /**金币总数 */
    goldSum: number;
    /**菜品数 */
    cuisine: number;
}


/**
 * 广告点跟分享点存档数据
 */
type AdAndShareData = {
    adNum: number,
    [key: number]: AdAndShareItem
}
interface AdAndShareItem {
    /**分享次数 */
    shareCnt: number;
    /**看广告次数 */
    adCnt: number;
    /** 免费次数*/
    freeCnt: number;
}

type AssistSaveData = {
    /**每个id的等级 */
    [id: number]: {
        lv: number,
        adNum: number
    }

}

interface IShareAndAd {
    /**
     * 切换成分享状态
     */
    toShare?(type: AdType, conf: AdData, data: any);

    /**
     * 切换成广告状态
     */
    toAd?(type: AdType, conf: AdData, data: any, adState: AdState);
    /**
     * 切换成支付状态
     */
    toPay?(type: AdType, conf: AdData, data: any);
    /**
     * 切换成用超级现金购买状态
     */
    toSupercash?(type: AdType, conf: AdData, data: any);
    /**
     * 免费赠送状态
     */
    toFree?(type: AdType, conf: AdData, data: any);
    /**
     * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
     */
    toFail(type: AdType, conf: AdData, data: any, adState?: any);
}


interface COMMON_BOX {
    // leftBtnBg?: string;//左边颜色按钮
    // leftBtnIcon?: string//左边按钮图片文字
    leftBtnText?: string//左边按钮文字
    // rightBtnBg?: string;//右边颜色按钮
    // rightBtnIcon?: string//右边按钮图片字
    rightBtnText?: string//右边按钮文字
    // title?: string;//标题内容
    tipsStr?: string;//主要内容
    curState?: TIPSTATE;//当前状态
    leftFunc?: Function;//左边按钮回调函数
    leftThisObj?: Object;
    rightFunc?: Function;//右边按钮回调函数
    rightThisObj?: Object;
    hasCloseBtn?: boolean;
    // imgSource?: string;//图片源
}
declare const versionInfo: {
    /**
     * 资源版本
     */
    version: string;
    /**
     * 包体版本
     */
    packVersion: string;
};
// interface BuffItem {

// }



// interface IShareAndAd {
// 	/**
// 	 * 切换成分享状态
// 	 */
//     toShare?(type: AdType, conf: AdData);

// 	/**
// 	 * 切换成广告状态
// 	 */
//     toAd?(type: AdType, conf: AdData, adState: Platform.AdState);
// 	/**
// 	 * 切换成支付状态
// 	 */
//     toPay?(type: AdType, conf: AdData);
// 	/**
// 	 * 切换成用超级现金购买状态
// 	 */
//     toSupercash?(type: AdType, conf: AdData);
// 	/**
// 	 * 免费赠送状态
// 	 */
//     toFree?(type: AdType, conf: AdData);
// 	/**
// 	 * 没有广告,也没有分享,无法使用超级现金购买,也无法支付
// 	 */
//     toFail(type: AdType, conf: AdData, adState?: Platform.AdState);
// }

interface ShareStaticData {
    /**
     * 分享信息
     */
    shareMessage: string;
    /**
     * 分享图的路径
     */
    sharePic: string;
    /**
     * 分享信息id
     */
    id?: number;
    /**
     * 资源id
     */
    resource_id?: number;
    /**
     * 分享key
     */
    share_key?: string;
    /**
     * 分享权重
     */
    weight?: number;
}


interface GameConf {
    /**服务器配置 */
    serverInfos: ServerConfItem;
    /***渠道 */
    channel: string;
    /**广告id */
    WXadUnitId: string;
    /**游戏的主玩法的一些配置 */
    game: GameMainConf;


}
type GameCustomerConf = {
    /**基础移动速度 */
    speed: number;
}
interface GameMainConf {
    /**
     * 顾客的一些配置数据
     */
    customer: GameCustomerConf;
    gift: {
        coin: number;
        diamond: number;
    },
    /**厨师点击加速倍率 */
    chefTouchSpeedRate: number;

    gametime: {
        zoomtime: number;
        gamestarttime: number;
    },
    /**事件配置时间数据 */
    plotEventConf: PlotEventConf;

    /**明星的配置 */
    startEventConf: StartEventConf;
    /**按钮触发广告的概率 */
    randAdBtn: randAdBtn;
    /**探索按钮间隔时间 */
    exploreConf: ExploreConf;

    /** 离线时间上线 */
    maxOfflineTime: number;
}

interface ServerConfItem {
    interface: string;
    serverid: string;
}

//常驻buff倒计时数据

type ResidentBuffData = {
    rateTime: number;
    gainTime: number;
}

interface DeliverymanSaveData {
    /**下个外卖小哥到来的时机*/
    nextTime: number;
    /**外卖小哥送货的摊位id*/
    targetIndex: number;
    getMoney?: number[];
    /**普通订单数量 */
    normalCnt?: number;
    /**快速订单数量 */
    fastCnt?: number;
}

/** 明星数据 */
type StarItemData = {
    /** 明星id */
    starId: number;
    /** 结束时间 */
    finishTime?: number;
    /** 是否使用过 */
    isUsed: boolean;
}

/** 明星数据 和 签约明星数据 */
type StarAllSaveData = {
    starData: { [starId: number]: StarItemData; }
    signData: StarSignSaveData,

}
/** 明星数据 */
type StarSaveData = {
    [starId: number]: StarItemData;
}

/** 签约明星数据 */
type StarSignSaveData = {
    [kcId: number]: {
        [kdId: number]: StarSignItemData[]
    }
}

/** 签约明星数据 */
type StarSignItemData = {
    /** 明星id */
    starId: number,
    /** 是否签约过 */
    isSign: boolean,
    /** 结束时间 */
    finishTime?: number;
    /** 签约类型 */
    signType?: number;
    /** 结束时间 */
    finishTime?: number;
}

type StarViewData = {
    /** 明星名字 */
    name: string,
    /** buff描述 */
    desc: string,
    /** buff值 */
    value: string,
    modelId: number,
    /** 是否用过 */
    isUse: boolean,
}


/**事件buff数据*/
type EventBuffData = {
    /**事件id*/
    eventId: number;
    /**buffId*/
    buffId: number;
    /** 地图id */
    kcId: number;
    /** 摊位id */
    kdId: number;
    /** 结束时间 */
    finishTime: number;
}


/*当前每日任务数据*/
type NowTaskData = {
    /*记录时间*/
    time: number;
    /*任务列表*/
    /**任务id*/
    id: number;
    /**任务内容*/
    //content: string;
    /**任务奖励类型*/
    awardType: number[];
    /**任务奖励数量*/
    awardNumber: any[];
    /**任务类型*/
    //taskType: number;
    /**当前任务需要完成数量*/
    nowTargetNumber: number;
    /**当前任务已经完成数量*/
    yetTaskNumber: number;
    /**累计收益任务需要完成金额*/
    taskMoney: number[];
    /**所完成任务的当前地图id*/
    taskMapId: number;
    /**已完成任务条数*/
    taskAmount: number;
    /**当前已累计金钱数*/
    nowMoneyTotal: number[];
}


interface LuckSaveData {
    datas: {
        curNum: number,
        time: number,
    }[],
    // /** 钻石抽奖次数 */
    // diaNum: number,
    // /** 广告抽奖次数 */
    // adNum: number,
    // /** 上一次钻石抽奖时间戳 */
    // diaTime: number,
    // /** 上一次广告抽奖时间戳 */
    // adTime: number,
    /** 上一次所在位置 */
    pos: number,
    /** 下次倍率 */
    rate: number,
}

interface PlotEventConf {
    /**顾客事件间隔时间 */
    clienteventtime: number;
    /**顾客事件出现(随机概率) */
    randomshowgukeevent: number;
    /**顾客聊天消息出现概率 */
    chatrandom: number;
    /**消息聊天速度 */
    chatspeed: number;
}
/**
 * 探索的配置
 */
interface ExploreConf {
    exploreTime: number;
}

interface StartEventConf {
    /**明星事件出现的时间间隔 */
    stareventtime: number;

    /**明星出现的概率 */
    randnumber: number;

    /**明星按钮隐藏的时间 */
    hideStarTime: number;
}
/**
 * 按钮触发广告的配置
 */
interface randAdBtn {
    /**触发的概率 */
    randnumber: number
    /**每次增加的概率 */
    addrandnum: number
}
interface LuckItemData {
    index: number,
    /** 图标路径 */
    itemIcon: string,
    /** 描述 */
    itemDesc: string,
    /** 是否为起点 */
    isStar: boolean,
    /** 数量 */
    num?: MyBigLong,
}

interface LuckBtnData {
    /** 当前次数 */
    curNum: number,
    /** 总次数 */
    maxNum: number,
    /** 回复时间 */
    cdTime: number,
    /** 上次抽奖时间 */
    lastTime: number,
    /** 抽奖消耗 */
    costStr: string,
}

/** 排行榜信息存档数据 */
interface RankSaveData {
    /** 看广告次数 */
    adNum: number,
    /** 开宝箱次数 */
    boxNum: number[],
    /** 每日任务完成次数 */
    taskNum: number,
    /** 解锁菜式个数 */
    foodNum: number,
    /** 刷排行榜日报时间 */
    dailyTime: number,
}

/** 玩家存储至管理后台数据 */
interface MyRankData {
    /** 贡献值 */
    dedication?: number,
    /** 厨神分数 */
    strength?: number,
    /** 称号编号 */
    title?: number,
}

/** 全国排行榜数据 */
interface CountryRankData {
    /** 省份id */
    province_id: number,
    /** 省总贡献值 */
    dedication: number,
    /** 省人数 */
    people_num: number,
    /** 省排名 */
    ranking: number,
    /** 省份名称 */
    province_name: string,
}

/** 全国排行的个人数据 */
interface CountryUserRankData {
    /** 玩家所在省id */
    province_id: number,
    /** 玩家id */
    playerid: number,
    /** 玩家所在省名称 */
    province_name: string,
    /** 玩家头像 */
    avatar: string,
    /** 贡献值 */
    dedication: number,
    /**  */
    ranking?: number,
}


/** 所在省排行数据 */
interface CountryProRankData {
    /** 玩家所在省id */
    province_id: number,
    /** 玩家贡献 */
    dedication: number,
    /** 省人数 */
    people_num: number,
    /** 省名称 */
    province_name: string,
    /** 省排行 */
    ranking: number,
}

/** 省排行榜数据 */
interface LocalRankData {
    /** 省id */
    province_id: number,
    /** 玩家id */
    playerid: number,
    /** 霸榜时间（秒） */
    stay: number,
    /** 贡献值 */
    dedication: number,
    /** 变动 */
    ranking_change: number,
    /** 昵称 */
    nick: string,
    /** 头像 */
    avatar: string,
    /** 排名 */
    ranking: number
    /** 分数 */
    strength?: number,
}

/** 省排行的个人数据 */
interface LocalUserData {
    /** 省id */
    province_id: number,
    /** 玩家id */
    playerid: number,
    /** 昵称 */
    nick: string,
    /** 头像 */
    avatar: string,
    /** 排名 */
    ranking: number,
    /** 省名称 */
    province_name: string,
    /** 波动名次 */
    ranking_change: number,
    /** 霸榜时间（秒） */
    stay: number
    // rank: number,
    // level: number,
    dedication: number,

    strength?: string,

}

/**
 * 公告数据
 */
interface GongGaoData {
    /**
     * 公告发布时间
     */
    time: Date,
    /**
     * 公告类型
     */
    type: number,
    /**
     * 自动弹出[0:不弹,1:弹]
     */
    popup: number,
    /**
     * 公告标题
     */
    title: string,
    /**
     * 公告图片
     */
    url: string,
    /**
     * 公告序号
     */
    id?: number;
}

const async: {
    eachSeries: <T>(arrs: T[], seriesFunc: (str: T, cb: Function) => void, cb: Function) => void;
    each: <T>(arrs: T[], seriesFunc: (str: T, cb: Function) => void, cb: Function) => void;

    series: (obj: { [funcName: (cb: Function) => void] }, cb: Function) => void;
};

interface SystemOpenData {
    /** 图标 */
    icon: string,
    /** 解锁文字 */
    desc: string,
    /** 坐标 */
    pos: cc.Vec2,
    /** 回调 */
    func?: Function,
    /** 对象 */
    obj?: any,
    /** 事件 */
    event?: any,
    /** 事件参数 */
    param?: any,
}

type pos = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    horizontalCenter?: number;
    verticalCenter?: number;
    height?: number;
    width?: number;
    rotation?: number;
}

/**吉祥物存档数据*/
interface MascotSaveData {
    datas: {
        id: number,
        isOwn: boolean,
    }[],
    //当前使用的吉祥物
    mascotId: number,
}

interface CompelADSaveData {
    //是否是好用户
    isGood: boolean,
    //表id,当前判断到哪一条数据
    id: number,
}

interface PromoteFunctionSaveData {
    /**
     * 当前功能提升数据
    */
    data: PromoteData[];

}

/**（功能）提升数据*/
interface PromoteData {
    //当前表id
    confId: number,
    //已观看广告次数
    adCnt: number,
    //当前倍数
    nowMultiple: number
}[]
/** 朋友圈显示数据 */
interface FriendCircleShowData {
    /** friendCircleId */
    friendCircleId: number,
    /** 头像 */
    icon: string;
    /** 名字 */
    name: string;
    /** 朋友圈图片 */
    img: string;
    /** 朋友圈描述 */
    desc: string;
    /** 点赞人名 */
    likeName: string;
    /** 评论 */
    replyList: string[];
    /** 背景 */
    bgSource: string;
    /** 发圈时间 */
    time: string;
    /** 玩家名字 */
    userName: string;
    /** 玩家头像 */
    userIcon: string;
}


/** 朋友圈存档数据 */
interface FriendCirCleSaveData {
    /** 朋友圈事件id */
    eventId: number,
    /** 朋友圈id */
    friendId: number,
    // /** 失败次数 */
    // num: number,
    /** 是否已查看 */
    isRead?: boolean,
    /** 发布时间 */
    time: number,
}
interface Gametime {
    /**时间缩放分钟 */
    zoomtime: number;
    /**游戏开始时间（时间戳 毫秒） */
    gamestarttime: number;
}
// interface ConfigMap {

// }