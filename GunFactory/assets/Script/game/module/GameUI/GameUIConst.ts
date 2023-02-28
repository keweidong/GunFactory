export const enum GameUIConst {
    /**收集闲置现金 */
    COLLECT_IDLE,
    /**开启福袋页面 */
    OPEN_LUCKBAGVIEW,
    /**请求获取福袋奖励 */
    GET_LUCKBAG_REWARD,
    // /**地图提示框打开*/
    // MAP_TIP,
    // /**获取音量数据*/
    // GET_VOLUME,
    // /**设置音量*/
    // SET_VOLUME,
    // /**无法解锁地图*/
    // NO_UNLOCK_MAP,
    // /**
    //  * 外卖小哥开始送货
    //  */
    // GET_ORDER,
    // /**设置buffShowViewData*/
    // //SET_BUFF_SHOW_VIEW_DATA,

    /**
     * 请求免费buff
     */
    GET_FREE_BUFF,
    /**
     * 请求厨师自动加速buff
     */
    GET_COOK_AUTO_ACCELERATE,

    // /**增加赞助广告*/
    // ADD_ASSIST_AD_NUM,
    /**播放收集金币动画*/
    PLAY_JB_ANI,
    /**播放收集钻石动画*/
    PLAY_ZS_ANI,

    OPEN_SETTING_VIEW,

    // /**看广告后常驻buff效果*/
    // ON_TOUCH_RESIDENTBUFF,
    /**获取闲置现金时间*/
    GETIDLETIME,
    // /**更新主界面显示的宝箱数量*/
    // UPDATA_BOX_CNT,
    // //更新buffList
    // UPDATA_BUFF_LIST,
    // //打开ShowBuffInfoView
    // OPEN_SHOWBUFFINFOVIEW,
    // /**打开右侧弹窗*/
    // OPEN_RIGHT_POPUP,
    // /**获取功能提升icon位置*/
    // GET_PROMOTE_ICON_POS,
    /**设置左侧弹窗头像*/
    SET_LEFTPOPUP_HEAD,
    // /**设置主界面头像*/
    // SET_GAMEUIVIEW_HEAD,
    // /** 增加愉悦值 */
    // ADD_HAPPY,
    // /** 获取解锁地图数据 */
    // GET_UNLOCK_DATA,
    /** 录屏关闭通知改变按钮*/
    RecorderClose,
    /**录屏开启通知改变按钮 */
    RecorderOpen,
    /**录屏分享成功 */
    Recorder_Share_SUCCESS,
    /**录屏分享失败 */
    Recorder_Share_FAIL,
    /**引导玩家录屏 */
    Guide_Recorder,
    /**引导玩家录屏完毕 */
    Guide_Recorder_End,

    /** 设置消息界面 */
    SET_NEWS,
    /** 注册消息界面 */
    ADD_NEWS,
    /**设置成就按钮的红点 */
    CHENGJIU_HONGDIAN_OPEN,
    /**关闭成就红点 */
    CHENGJIU_HONGDIAN_CLOSE,
    /**录屏开关 */
    LUPING_CLOSE,
    LUPING_OPEN,
    /**
    * 探索开始计时
    */
    StartExploreTime,
    /**
     * 结束计时,探索按钮可点击
     */
    StopExploreTime,
    /**
     * 打开探索红点
     */
    OPEN_HONGDIAN_EXPLORE,
    /**
     * 关闭探索红点
     */
    HIDE_HONGDIAN_EXPLORE,
    /**截图框关闭 */
    FRAME_CLOSE,
    /**更新分享次数 */
    UPDATESHARE,
    /**更新钻石 */
    UPDATE_SUPER_CASH,
}

export const enum AssistCostType {
    /** 钻石 */
    DIAMOND,
    /** 广告分享 */
    AD,
}

export const enum TIPSTATE {
    /** 只有一个按钮 */
    SURE,
    /** 两个按钮 */
    SURE_CANCEL,
    /** 没有按钮 */
    NO_SURE,
}

/** 明星签约模式 */
export const enum SignType {
    /** 普通 */
    normal,
    /** 高级 */
    high,
}
export const enum NewsTypeConst {
    /** 朋友圈 */
    Friend = 0,
    /** 消息 */
    Chat = 1,
    /** 事件 */
    Event = 2,
    /**明星 */
    Start = 3,
}