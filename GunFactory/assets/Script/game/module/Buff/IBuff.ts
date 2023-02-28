
/**
 * 技能类型定义
 */
export const enum Buff_Type {
    /**
     * 主管技能加成
     */
    MANAGER_SKILL,
    /**
     * 全局buff物品加成
     */
    OBJECT,
    /**
     * 超级技能buf
     */
    SUEPR_BUFFER,
    /**
     * 统计用BUFF,用于BUFF列表统计显示,实际并不会产生效果
     */
    TOTOL,
}

export class BuffAttr implements ICache {
    ObjectPoolKey = null;

    /** 店铺收益增加x倍 提升在线生产力 */
    ADD_CREATE = 0;
    /** 提升离线收益 */
    ADD_IDLE = 0;
    /** 客人移动速度增加 */
    MOVE_SPEED = 0;
    /**服务员移动速度 */
    WAITER_SPEED = 0;
    /**厨师烹饪速度 */
    COOK_SPEED = 0;
    /**自动加速厨师炒菜(用于广告点自动点击加速) */
    COOK_ACCELERATE = 0;
    /**减少顾客出现间隔时间 */
    CUSTOMER_CREATE_TIME = 0;
    /**菜式收益倍率 */
    FOOD_SELL_RATE = 0;


    public static create(): BuffAttr {
        return ObjectPool.pop("BuffAttr")
    }

    public setBuffValue(buffType: string, buffValue: number) {
        this[buffType] = buffValue;
    }

    public getBuffValue(buffType: string) {
        return this[buffType];
    }

    public resetBuffByType(buffType: string) {
        this.setBuffValue(buffType, 0);
    }

    public addBuffValue(buffType: string, buffValue: number) {
        if (ACC_MAP.indexOf(buffType) > -1) {
            this[buffType] = this[buffType] * (1 + buffValue / 100);
            if (this[buffType] <= 0) {
                this[buffType] = 0.01;
            }
        }
        else {
            this[buffType] += buffValue;
        }

    }

    public addBuffAttr(buffAttr: BuffAttr) {
        if (!buffAttr) {
            return;
        }
        for (let i = 0; i < ALL_ATTR.length; i++) {
            let type = ALL_ATTR[i];
            if (RATE_MAP.indexOf(type) > -1) {
                this[type] = ((this[type] * 100 - 100) + (buffAttr[type] * 100 - 100) + 100) / 100;
                if (this[type] <= 0) {
                    this[type] = 0.01;
                }
            }
            else if (ACC_MAP.indexOf(type) > -1) {
                this[type] = this[type] * buffAttr[type];
                if (this[type] <= 0) {
                    this[type] = 0.01;
                }
            }
            else {
                this[type] += buffAttr[type];
            }

        }
    }

    public claFinish() {
        for (let i = 0; i < RATE_MAP.length; i++) {
            let buffType = RATE_MAP[i];
            let des = 100 + this[buffType]
            if (des < 0) {
                this[buffType] = 0.01;
            }
            else
                this[buffType] = des / 100;
        }
    }

    public reset() {
        this.ADD_CREATE = 0;
        this.COOK_ACCELERATE = 0;
        /** 提升离线收益 */
        this.ADD_IDLE = 0;
        /** 客人移动速度增加 */
        this.MOVE_SPEED = 0;
        /** 客人出现频率 */
        this.CUSTOMER_CREATE_TIME = 0;
        // /**服务员移动速度 */
        this.WAITER_SPEED = 0;
        // /**厨师烹饪速度 */
        this.COOK_SPEED = 0;
        /**菜式收益倍率 */
        this.FOOD_SELL_RATE = 0;
    }
}

let ALL_ATTR: string[] = [];
// 1.	店铺收益增加x倍
// 2.	离线收益增加x倍
// 5.	客人移动速度增加x %
export enum BUFF_TYPE {
    /** 店铺收益增加x倍 提升在线生产力 */
    ADD_CREATE,
    /** 提升离线收益 */
    ADD_IDLE,
    /** 客人移动速度增加 */
    MOVE_SPEED,
    /**服务员移动速度 */
    WAITER_SPEED,
    /**厨师烹饪速度 */
    COOK_SPEED,
    /**减少顾客出现间隔时间 */
    CUSTOMER_CREATE_TIME,
    /**菜式收益倍率 */
    FOOD_SELL_RATE,
    /**自动加速厨师炒菜(用于广告点自动点击加速) */
    COOK_ACCELERATE,
}
const ACC_MAP: string[] = [
    // "COST_SPEED",
]
const RATE_MAP: string[] = [
    BUFF_TYPE[BUFF_TYPE.ADD_CREATE],
    BUFF_TYPE[BUFF_TYPE.ADD_IDLE],
    BUFF_TYPE[BUFF_TYPE.MOVE_SPEED],
    BUFF_TYPE[BUFF_TYPE.WAITER_SPEED],
    BUFF_TYPE[BUFF_TYPE.COOK_SPEED],
    BUFF_TYPE[BUFF_TYPE.CUSTOMER_CREATE_TIME],
    BUFF_TYPE[BUFF_TYPE.FOOD_SELL_RATE],
    BUFF_TYPE[BUFF_TYPE.COOK_ACCELERATE],
]
for (const key in BUFF_TYPE) {
    // CC_DEBUG && Log.trace("BUFF_TYPE", key);
    if (isNaN(key as any)) {
        ALL_ATTR.push(key);
    }
}