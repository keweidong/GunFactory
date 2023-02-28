// TypeScript file
export const NotificationConst = {
    /** 开始初始化游戏 */
    INIT_GAME: "INIT_GAME",
    /**
     * 注销登陆
     */
    LOGOUT: "logout",

    /** 游戏初始化完毕 */
    INIT_GAME_FINISH: "INIT_GAME_FINISH",
    /**
     * 更新用户数据
     */
    UPDATE_USER_INFO: "UPDATE_USER_DATA",

    /** 金钱更新 */
    UPDATE_MONEY: "UPDATE_MONEY",

    /** buff变化 */
    UPDATE_BUFF: "UPDATE_BUFF",

    /** 赞助等级提升 */
    ADD_ASSIST_LV: "ADD_ASSIST_LV",

    /** 更新闲置现金 */
    UPDATE_IDLE: "UPDATE_IDLE",

    /** 更新超级现金 */
    UPDATE_SUPER_CASH: "UPDATE_SUPER_CASH",

    /** 系统开放 */
    SYS_OPEN: "SYS_OPEN",

    /** 计算系统开放 */
    CHECK_ALL_SYS_OPEN: "CHECK_ALL_SYS_OPEN",

    /** 计算某个系统开放 */
    CHECK_SYS_OPEN: "CHECK_SYS_OPEN",

    /** 抽奖 */
    LUCK_AWARD: "LUCK_AWARD",

    /**添加事件buff*/
    ADD_EVENT_BUFF: "ADD_EVENT_BUFF",
    /**游戏切换到后台 */
    ON_HIDE: "ON_HIDE",
    /**游戏从后台切换回游戏 */
    ON_SHOW: "ON_SHOW",
    /**安卓点击返回按钮 */
    ON_KEY_BACK: "ON_KEY_BACK",
    /**开始新手引导 */
    START_GUIDE: "START_GUIDE",
    /*结束新手引导 */
    END_GUIDE: "END_GUIDE",
    /** 看广告次数增加 */
    ADD_AD_NUM: "ADD_AD_NUM",
    /** 领取每日任务 */
    ADD_DAILY_TASK: "ADD_DAILY_TASK",
    /** 开宝箱 */
    ADD_BOX: "ADD_BOX",
    /**点击加速*/
    ON_TOUCH_ACCELERATE: "ON_TOUCH_ACCELERATE",
    /**添加常驻buff*/
    ADD_RESIDENTBUFF: "ADD_RESIDENTBUFF",
    /**点击吉祥物*/
    ON_TOUCH_MACOT: "ON_TOUCH_MACOT",
    /**任务监听商城购买钻石*/
    BUY_DIAMOND: "BUY_DIAMOND",
    /**通知开启录屏软性引导 */
    GUIDE_RECORDER: "GUIDE_RECORDER",

    /**
     * 完成每日任务
     */
    FINISH_EVERY_DAY_TASK: "FINISH_EVERY_DAY_TASK",

    /**
     *领取每日福袋
     @param type 0 获取金币奖励, 1 获取钻石奖励
     */
    RECEIVE_LUCKY_BAG: "RECEIVE_LUCKY_BAG",

    /**
     * 某个新手引导步奏完成
     */
    GUIDE_STEP_FINISH: "GUIDE_STEP_FINISH",
    /**
    * 查看朋友圈
    */
    READ_FRIEND_CIRCLE: "READ_FRIEND_CIRCLE",
    /**
     * 开始在线时间计时
     */
    START_GAME_TIME: "START_GAME_TIME",
    /**完成事件*/
    ACHITEVE_EVENT: "ACHITEVE_EVENT",
    /**
     * 查看顾客消息
     */
    READ_CUSTOMER_CIRCLE: "READ_CUSTOMER_CIRCLE",
    /**
     * 解锁新的服务员
     */
    UNLOCK_NEWWAITER: "UNLOCK_NEWWAITER",
    /**
     * 解锁新的厨师
     */
    UNLOCK_NEWCHEF: "UNLOCK_NEWCHEF",
    /**
     * 每天触发明星朋友圈
     */
    TRIGGER_STAR_FRIEND: "TRIGGER_STAR_FRIEND",
}
export const enum GameNotificationConst {
    /**
     * 解锁新矿层
     */
    C2G_UNLOCK_SHAFT = "unlockShaft",

    /**
     * 解锁新菜式(解锁完)
     */
    UNLOCK_NEW_CaiShi = "unlockNewCaishi",

    /**
     * 升级
     */
    G2C_UPGRADE = "g2cUpgrade",

    /**
     * 打开场景
     */
    G2C_OPEN_SCENE = "g2cOpenScene",
    /**
     * 切换场景
     */
    G2C_SWITCH_SCENE = "g2cSwitchsCENE",

    /**
     * 烹饪菜式完成
     */
    ORDER_COOK_FINISH = "ORDER_COOK_FINISH",
    /**
    * 服务员给用户下单
    */
    ADD_ORDER = "ADD_ORDER",
    /**
     * 用户坐下时,显示想要的订单
     */
    SHOW_ORDER = "SHOW_ORDER",
    /**
     * 升级菜式
     */
    UPGRADE_FOOD = "UpgradeFood",
    /**
     * 升级技能等级,
     * type: number 请求升级类型 0 员工, 1 厨师, 2 宣传
     * levelCnt: number 升多少级
     */
    UPGRADE_SKILL = "UpgradeSkill",

    /**
     * 更新荣耀值
     */
    UPDATE_PLAYER_HONORPOINT = "UPDATE_PLAYER_HONORPOINT",
    /**创建了一个新的顾客 */
    CREATE_CUSTOMER = "CREATE_CUSTOMER",

    /**排队人数刷新 */
    UPDATE_RANK_CNT = "UPDATE_RANK_CNT",

    /**刷新事件按钮*/
    UPDATA_EVENT_BTN = "UPDATA_EVENT_BTN",


    /** 
     * 顾客吃完东西
     * @param Custemer 吃完东西的顾客
    */
    CUSTOMER_EAT_FINISH = "CustomerEatFinish",

    // /**刷新每日任务按钮*/
    // UPDATA_TASK_BTN = "UPDATA_TASK_BTN",
    /**
     * 使用道具
     * @param id 使用的物品id
     * @param cnt:使用的物品数量,默认为1
     * @param [UseItemResultData] 0 使用物品成功, -1 物品数量不足, -2 不存在的物品, -3使用物品过程中出错
     */
    USE_ITEM = "USE_ITEM",
    /** 贡献值更新 */
    UPDATE_CONTRIBUTION = "UPDATE_CONTRIBUTION",
    /**
     *  创建一个明星
     */
    CREATE_STAR = "CreateStar",
    /**
     * 销毁一个明星
     */
    DESTORY_STAR = "DestroyStar",
    /**
     * 增加愉悦值
     */
    ADD_HAPPY_VALUE = "ADD_HAPPY_VALUE",
    /**
     * 更新称号
     */
    UPDATA_CHENGHAO = "UPDATA_CHENGHAO",
}