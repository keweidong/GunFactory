/**
 * 朋友圈
 */
export const enum FriendCircleConst {
    /** 开启朋友圈定时器 */
    OpenTick,
    /** 打开朋友圈界面 */
    OpenView,
    /** 阅读朋友圈 */
    ReadFriend,
    /** 初始化朋友圈 */
    // InitFriend,
    /** 新手 模拟创建一条朋友圈 */
    CreateFriend = 3,
    /**检测登录 */
    IsFirstLogin_Everyday,
}
/**
 * 朋友圈类型
 */
export const enum FriendCircleType {

    /**
    * 解锁餐厅朋友圈
    */
    unlockshaft = 0,
    /**
     * 解锁菜式朋友圈
     */
    unlockCaishi = 1,
    /**
     * 解锁厨师朋友圈 
    */
    unlockChef = 2,
    /**
     * 解锁服务员朋友圈
     */
    unlockWaiter = 3,
    /**
     * 明星来啦,发个朋友圈
     */
    starFriend = 4,
    /**
     * 每日登陆朋友圈
     */
    denglu = 5,
}