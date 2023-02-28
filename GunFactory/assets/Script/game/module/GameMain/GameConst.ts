export const enum GameConst {
    OPEN_FINISH,
    GAME_INIT,
    /**
     * 点击解锁桌子
     */
    UNLOCK_TABLE,
    /**
     * 滚动到下一个场景
     */
    SCROLL_TO_NEXT_SCENE,

    GET_WORLD_SCENE,
    /**
     * 解锁菜式
     */
    UNLOCK_FOOD,
    /**
     * 升级菜式
     */
    UPGRADE_FOOD,

    /**
     * 请求增加排队人数
     */
    ADD_RANK_CNT,

    /**
     * 请求升级 参数1: 0 员工, 1 厨师, 2 宣传
     */
    UPGRADE,

    /**
     * 是否加速烹饪
     */
    IS_COOD_ACCELERATE,

    /**解锁新的场景 */
    UNLOCK_SCENE,
    /** 请求切换场景*/
    OPEN_SCENE,
    /**滑动到某个场景 */
    SCORLLE_TO_SCENE,
    /**打开制作特色菜界面 */
    OPEN_FEATURE_FOOD_VIEW,

    /**滚动游戏的 ScrollView*/
    GAME_SCROLL,
    /**
     * 设置屏幕是否允许滚动
     */
    SET_SCROLL_ENABLE,
}