import { GameBaseProxy } from "./GameBaseProxy";
import { GameNotificationConst } from "../../consts/NotificationConst";
import App from "../../../core/App";
import { ViewConst } from "../../consts/ViewConst";
import { MoneyType } from "../Define";
import { ControllerConst } from "../../consts/ControllerConst";
import { GameConst } from "./GameConst";

export class GameProxy extends GameBaseProxy {
    /**
     * 获取所有摊位数据
     */
    public getFarmDatas() {
        return this.worldScene.sceneMgr.nowScene.kuangcengMgr.mineCellList;
    }
    /**
     * 根据摊位的序号获取摊位数据
     * @param index 摊位序号
     */
    public getFarmData(index: number) {
        return this.worldScene.sceneMgr.nowScene.kuangcengMgr.mineCellList[index];
    }
    /**
     * 获取当前解锁到的层数
     */
    public getUnlockCnt() {
        return this.worldScene.sceneMgr.nowScene.kuangcengMgr.curOpenIndex;
    }
    /**
		 * 获取解锁某个田地所需金钱
		 */
    public getFarmUnlockMoney(index: number) {
        return this.worldScene.sceneMgr.nowScene.kuangcengMgr.getUnlockMoney(index);
    }
    /**
     * 升级某个区域
     * @param count:要升多少级
     */
    public upGrade(cellIndex: number, count: number, isFree?: boolean) {
        let result = this.worldScene.sceneMgr.nowScene.kuangcengMgr.upGrade(count, cellIndex, isFree);
        App.NotificationCenter.dispatch(GameNotificationConst.G2C_UPGRADE, cellIndex, result, count)
        return result;
    }
    /**
     *  请求解锁矿层
     * 
     * @param {number} cellIndex 矿层的序号
     * 
     * @author
     * @version
     */
    public unlockCell(cellIndex: number, isFree?: boolean) {

        let result = this.worldScene.sceneMgr.nowScene.kuangcengMgr.openNewField(cellIndex, false, isFree);
        if (result) {
            //this.worldScene.KCMgr.nowKCZ.setLookBuildAd(true);
            //检查是否有开业大吉红包
            let isHas = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.CHECK_START_BUSINESS, cellIndex);
            if (isHas) {
                //打开开业大吉界面
                //App.ViewManager.open(ViewConst.StartBusinessView);
            } else {
                //成功解锁
                App.NotificationCenter.dispatch(GameNotificationConst.C2G_UNLOCK_SHAFT, cellIndex);
            }

            // net.SendMsg.create({
            //     kuangDongId: cellIndex,
            // }, ModuleInfo.NONGCHANG, NnongchangOrder.C2G_UNLOCK_KUANG_CENG).send();
        } else {
            // App.ViewManager.open(ViewConst.GotoCharge, MoneyType.GOLD);
            Log.trace("现金不足!")
        }
        return result;

    }
}