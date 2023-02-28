// export const MAX_LEVEL = 4;
export const enum MoneyType {
    /**金币 */
    GOLD,
    /**水晶 */
    CRYSTAL,
    /**绿宝石 */
    EMERALD,
    /**紫水晶 */
    AMETHYST,
    /**矿石 石榴石 */
    GARNET,

}
export const enum WORKER_TYPE {
    /**
     *工人类型,矿工
    **/
    KUANG_GONG = 0,
    /**
    *工人类型,电梯
    **/
    DIAN_TI = 1,
    /**
    *工人类型,仓库
    **/
    CANG_KU = 2,
}
/**
    * 障碍物当前状态
    */
export const enum BarrierState {
    /**
     * 没有障碍物,可以直接花钱解锁下一层
     */
    NORMAL,
    /**
     * 有障碍物,需要花钱移除障碍物
     */
    BARRIER,
    /**
     * 花了钱等待倒计时移除障碍物,
     * 这时可以通过超级现金直接移除等待时间,
     * 获取通过观看广告减少移除时间
     */
    WAIT_REMOVE,
    // /**
    //  * 移除等待时间到了,可以把障碍物移除掉
    //  */
    // UNLOCK_FINISHED
    /**
     * 需要攻打城池
     */
    ATTACK,
}
export type BarrierData = {
    /**
     * 矿层等级
     */
    index: number;
    /**
     * 解锁金钱
     */
    unlockMoney: MyBigLong;
    /**
     * 金钱类型
     */
    moneyType: MoneyType;
    /**
     * 解锁所需时间
     */
    removeTime: number;
    /**
     * 解锁剩余所需时间
     */
    leftTime: number;
    /**
     * 解锁所需超级金钱
     */
    unlockSupermoney: number;
    /**
     * 障碍物的状态
     */
    state: BarrierState;
    /**
     * 下一次可以用广告减少障碍物移除时间的时间
     */
    nextCanSubTime: number;
    /**
     * 使用广告移除过多少次
     */
    subCnt: number;
}

/**
 * 顾客当前的状态
 */
export enum State {
    NODE,
    /**闲置状态 */
    IDLE,
    /**移动状态 */
    MOVE,
    /**排队中 */
    IN_RANK,
    /**进店消费中 */
    IN_SERVICE,
}
