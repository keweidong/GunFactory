export const enum LuckConst {
    /** 行走结束 */
    FINISH_MOVE,
    /** 点击钻石抽奖 */
    DRAW_AWARD,
    /** 检测时间 */
    CHECK_TIME,
    /**飘金币动画*/
    Luck_JB_ANI
}

/** 奖品类型 */
export const enum LuckTypeConst {
    /** 物品 */
    ITEM,
    /** 下次翻倍 */
    DOUBLE,
    /** 再来一次 */
    AGAIN,
    /** 空白格 */
    NONE,
}

/** 抽奖模式 */
export const enum LuckPatConst {
    /** 普通 */
    NORMAL,
    /** 高级 */
    HIGH,
}