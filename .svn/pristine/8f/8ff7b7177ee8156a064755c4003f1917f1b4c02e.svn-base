
import { ItemData } from '../bag/ItemDataManager';
import { ExploreAwardData } from './ExploreDataMsr';
import { ItemBase } from '../bag/ItemBase';
import { AdData } from '../../config/AdDataManager';
export const enum ExploreConst {

    /**
     * 主界面点击探索按钮
     */
    OnTouchExploreBtn = 0,
    /**
     * 打开探索界面
     */
    OpenExploreView = 1,
    /**
     * 点击打开翻牌动画
     */
    OpenExploreitemAni = 2,
    /**
     * 点击关闭翻牌
     */
    CloseExploreitemAni = 3,
    /**
     * 抽奖
     */
    ExploreChoujiang = 4,
    /**
     * 隐藏4个抽奖的遮罩,抽奖按钮恢复点击
     */
    HideExploreitemMark = 5,
    /**
     * 打开遮罩,按钮不能点击
     * 动画播放完点击后隐藏,进入下一个抽奖关卡
     */
    ShowExploreitemMark = 6,
    /**
     * 设置遮罩可以点击
     */
    MarkCanClick = 7,
    /**
     * 获取奖励离开
     */
    GetExploreAwardToleave = 8,
    /**
     * 广告复活
     */
    AdToRevive = 9,
    /**
     * 选到炸弹,炸弹帧
     */
    ChoseBomb = 10,
    /**
     * 放弃复活
     */
    GiveUp_Revive = 11,
    /**
     * 展示炸弹动画
     */
    ShowBomb = 12,
    /**
     * 打开
     */
    openExGuid = 13,
    /**
     * 下一个关卡
     */
    NextGuanqia = 14,
    /**
     * 探索开始计时
     */
    StartExploreTime = 15,
    /**
     * 结束计时,按钮可点击
     */
    StopExploreTime = 16,

}

/**
 * 探索开始的类型
 */
export const enum ExploreShowType {
    /**
     * 引导
     */
    ExploreShow_Guid = 0,
    /**
     * 打开探索界面提醒
     */
    ExploreShow_choseview = 1,
}

/**
 * 探索奖励的类型
 */
export const enum ExploreAwardType {
    /**
     * 空
     */
    none = 0,
    /**
     * 金币
     */
    golds = 1,
    /**
     * 钻石
     */
    Diamonds = 2,
    /**
     * 炸弹
     */
    bomb = 3,
}
declare global {

    /**
     * 奖励的item
     */
    interface ExploreitemData {
        /**
         * 奖励的类型
         */
        type?: ExploreAwardType,
        /**
         * 
         */
        item?: ItemBase,
        /**
         * 
         */
        awardExploerData?: ExploreAwardData,
        /**
         * 
         */
        moneyNum?: number;
        /**
         * 
         */

    }
    /**
     * 
     */

}