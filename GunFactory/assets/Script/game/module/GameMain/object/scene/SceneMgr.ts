import { BaseWorkZoneSData } from "./base/BaseWorkZone";
import SceneDataMsr from "./config/SceneDataMsr";
import { FoodMsrSaveData } from "./food/FoodMsr";
import { ChefDataSaveData } from "./role/chef/ChefMsr";
import { GuestDataSaveData } from "./role/guest/GuestMsr";
import { RoleSaveData } from "./role/RoleMsr";
import { WaiterDataSaveData } from "./role/waiter/WaiterMsr";
import SceneZone from "./SceneZone";
import { TableSaveData } from "./table/TableMsr";
import WorldScene, { SaveData } from "./WorldScene";

/**
 * 场景管理器
 */
export default class SceneMgr {
    /**
    * 所有矿场的在线收益
    */
    public idleMoneyRate: MyBigLong = MyBigLong.create(0, 0);
    /**
     * 当前的矿场id
     */
    public nowSceneId: int = -1;
    /**
     * 现在场景
     */
    public nowScene: SceneZone = null;
    /**
     * 矿场列表
     */
    public allOpenScene: { [key: number]: SceneZone } = {};


    public waitOpenSceneId: number = -1;
    /**
     * 所有场景,不过是否开启
     */
    public allScene: { [key: number]: SceneZone } = {};
    public sceneDataMgr: SceneDataMsr = null;
    //累计升了多少级
    public cumulativeNumber: number = 0;
    public nextAddMoneyTime = 0;
    public constructor(protected world: WorldScene) {
        this.sceneDataMgr = world.sceneDataMgr;
        let arrLen = this.world.sceneDataMgr.dataCnt;
        for (let i = 0; i < arrLen; i++) {
            let kcz = new SceneZone(this.world);
            kcz.setConf(this.sceneDataMgr.getData(i));
            this.allScene[i] = kcz;
            // this.sceneMgr.openNewScene(i);
        }
    }

    public routine(tick: long): void {
        if (this.nowScene != null) {
            // //计算前面矿场的金币
            this.nowScene.routine(tick);
            this.nextAddMoneyTime -= tick;
            // // MyBigLong.tempNum.clear();
            if (this.nextAddMoneyTime <= 0) {
                let money = MyBigLong.create(0, 0);
                for (const id in this.allOpenScene) {
                    if (this.allOpenScene[id].isOpen && this.allOpenScene[id] !== this.nowScene) {
                        money.add(this.allOpenScene[id].idleMoneyRate)
                    }
                }
                if (!money.isZero()) {
                    this.nowScene.nowMoneyAdd(money);
                }
                money.release();
                this.nextAddMoneyTime = 1000;
            }
        }
    }
    start() {
        this.switchScene(this.nowSceneId);
    }
    /**
     * 开启场景
     * 
     * @param {int} sceneId 要开启的场景id
     * @returns {number} 0 开启成功 -1 场景不存在 -2 这个场景已经开启 -3 前置场景还未开启 -4 金钱不足
     */
    public openNewScene(sceneId: int): number {
        let kcz = this.allOpenScene[sceneId];
        if (kcz != null) {
            //你已经开启过这个矿场了
            return -2;
        }
        // //拿到这个矿场的配置信息
        let abo = this.sceneDataMgr.getData(sceneId);
        if (abo == null) {
            Log.error(`场景${sceneId}不存在!`)
            //没有这个矿场了
            return -1;
        }
        // //开启所需前置矿场id
        if (this.checkIsPreZoneOpen(sceneId)) {
            if (this.checkIsMoneyCanUnlock(sceneId)) {
                kcz = this.allScene[sceneId];
                kcz.nowMoney = this.world.getMoneyByChipsType(abo.moneyType);
                kcz.init();
                kcz.openNewSceneZone();
                if (abo.reawrdMoney) {
                    kcz.nowMoneyAdd(abo.reawrdMoney);//开启场景赠送的金钱
                }
                this.allOpenScene[sceneId] = kcz;
                this.waitOpenSceneId = sceneId + 1;
                return 0;
            } else {
                return -4
            }

        } else {
            return -3;
        }

    }
    /**
     * 检测前置矿场是否开启
     */
    public checkIsPreZoneOpen(sceneId: number) {
        let abo = this.sceneDataMgr.getData(sceneId);
        //开启所需前置矿场id
        let openNeedsceneId: int = abo.openPreId;
        let preKCZ = this.getKuangChangWorkZone(openNeedsceneId);
        if (openNeedsceneId != -1 && preKCZ == null) {
            //前置地图没开
            return false;
        }
        return true;
    }
    /**
     * 检查当前金钱是否足够解锁矿场
     */
    public checkIsMoneyCanUnlock(sceneId: number): boolean {
        return true;
        let abo = this.sceneDataMgr.getData(sceneId);
        let isEnough = true;
        if (abo.openChips) {
            let money = MyBigLong.tempNum;
            money.init(abo.openChips, 0);
            isEnough = this.world.hasChips(money, abo.openChipsType);
        }
        if (abo.superCash) {
            isEnough = this.world.superCash >= abo.superCash;
        }
        return isEnough;
    }

    /**
     * 检查前置矿场是否已经开启足够的层数
     * @param sceneId 矿场id 
     */
    public checkIsPreZoneOpenCellEnough(sceneId: number) {
        let abo = this.sceneDataMgr.getData(sceneId);
        //开启所需前置矿场id
        let openNeedsceneId: int = abo.openPreId;
        if (openNeedsceneId === -1) {
            //不需要前置矿层
            return true;
        }
        let preKCZ = this.getKuangChangWorkZone(openNeedsceneId);
        if (preKCZ === null) {
            return false;
        }
        return true;
    }
    /**
     * 检查是否能够解锁矿场
     * @param sceneId 矿场id 
     */
    public checkIsCanUnlock(sceneId: number): boolean {
        if (!this.sceneDataMgr.getData(sceneId)) {
            return false;
        }
        // if (CC_PREVIEW) return true;
        //开启所需前置矿场id
        if (
            this.checkIsPreZoneOpen(sceneId)//判断前置矿场是否打开
            && this.checkIsWaiterLevelEnough(sceneId)//服务员等级是否达到解锁条件
            && this.checkIsChefLevelEnough(sceneId) //厨师等级是否达到解锁条件
            && this.checkIsGuestLevelEnough(sceneId) //宣传等级是否达到解锁条件
            && this.checkIsPlayerLevelEnough(sceneId) //玩家等级是否达到解锁条件
            && this.checkIsFoodLevelMaxCntEnough(sceneId) //检查菜式满级数量是否达到解锁条件
        ) {
            return true
        }
        return false;
    }

    /**
    * 服务员等级是否达到解锁条件
    * @param sceneId 矿场id 
    */
    public checkIsWaiterLevelEnough(sceneId: number): boolean {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            return scene.waiterMsr.attrObj.level >= conf.waiterLevel;
        } else {
            return false;
        }
    }
    public getWaiterLevel(sceneId: number): [number, number, number?] {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            return [scene.waiterMsr.attrObj.level + 1, conf.waiterLevel + 1];
        } else {
            return [1, conf.waiterLevel + 1];
        }
    }

    /**
    * 厨师等级是否达到解锁条件
    * @param sceneId 矿场id 
    */
    public checkIsChefLevelEnough(sceneId: number): boolean {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            return scene.chefMsr.attrObj.level >= conf.chefLevel;
        } else {
            return false;
        }
    }
    public getChefLevel(sceneId: number): [number, number, number?] {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            return [scene.chefMsr.attrObj.level + 1, conf.chefLevel + 1];
        } else {
            return [1, conf.chefLevel + 1];
        }
    }
    public getGuestLevel(sceneId: number): [number, number, number?] {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            return [scene.guestMsr.attrObj.level + 1, conf.guestLevel + 1];
        } else {
            return [1, conf.guestLevel + 1];
        }
    }
    /**
    * 宣传等级是否达到解锁条件
    * @param sceneId 矿场id 
    */
    public checkIsGuestLevelEnough(sceneId: number): boolean {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            return scene.guestMsr.attrObj.level >= conf.guestLevel;
        } else {
            return false;
        }
    }
    public getPlayerLevel(sceneId: number): [number, number, number?] {
        let conf = this.sceneDataMgr.getData(sceneId);
        return [this.world.playerDto.level + 1, conf.playerLevel + 1];
    }
    /**
    * 玩家等级是否达到解锁条件
    * @param sceneId 矿场id 
    */
    public checkIsPlayerLevelEnough(sceneId: number): boolean {

        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            if (CC_PREVIEW) {
                return this.world.playerDto.level >= conf.playerLevel - 20;
            }
            return this.world.playerDto.level >= conf.playerLevel;
        } else {
            return false;
        }
    }
    /**
    * 检查菜式满级数量是否达到解锁条件
    * @param sceneId 矿场id 
    */
    public checkIsFoodLevelMaxCntEnough(sceneId: number): boolean {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        if (scene) {
            for (const food of scene.foodMsr.foods) {
                if (food.attrObj.level < conf.foodLevel) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    public getFoodLevel(sceneId: number): [number, number, number?] {
        let conf = this.sceneDataMgr.getData(sceneId);
        let scene = this.allOpenScene[conf.openPreId];
        let cnt = 0;
        if (scene) {
            for (const food of scene.foodMsr.foods) {
                if (food.attrObj.level === food.attrObj.maxLevel) {
                    cnt++;
                }
            }
        }
        return [cnt, conf.foodCnt, conf.foodLevel + 1];
    }
    /**
     * 切换当前场景
     */
    public switchScene(sceneId: int): number {
        let kcz = this.allOpenScene[sceneId];
        if (kcz == null) {
            return -1;
        }
        if (sceneId !== this.nowSceneId && this.nowScene) {
            this.nowScene.onExit();
        }
        this.nowSceneId = sceneId;
        this.nowScene = kcz;
        kcz.onEnter();
        return 0;
    }


    /**
     * 根据矿场id获取矿场信息
     */
    public getKuangChangWorkZone(sceneId: int): SceneZone {
        return this.allOpenScene[sceneId];
    }

    /**
     * 获取所有矿场列表
     */
    public getAllKuangChangWorkZone() {
        return this.allOpenScene;
    }

    /**
     * 获取矿场是否开启
     */
    public getIsOpen(sceneId: int) {
        let data = this.allOpenScene[sceneId];
        if (data && data.isOpen) {
            return true;
        }
        return false;
    }

    public updateBuff() {
        for (let key in this.allOpenScene) {
            let kc = this.allOpenScene[key];
            kc.updateBuff();
        }
    }
    public destroy() {
        for (let key in this.allOpenScene) {
            let kc = this.allOpenScene[key];
            kc.destroy();
        }
    }

    public calOnlineMoney() {
        this.idleMoneyRate.clear();
        for (const key in this.allOpenScene) {
            let kc = this.allOpenScene[key];
            this.idleMoneyRate.add(kc.idleMoneyRate);
        }
    }

    public setMemento(data: SaveData) {
        let kuangChangDataMgr = this.world.sceneDataMgr;
        for (let tempData of data.sceneDatas) {
            // let abo = kuangChangDataMgr.getData(tempData.id);
            let scene = this.allOpenScene[tempData.id];
            if (!scene) {
                scene = this.allOpenScene[tempData.id] = this.allScene[tempData.id];
                scene.init();
                scene.nowMoney = this.world.getMoneyByChipsType(scene.conf.moneyType);
            }
            this.waitOpenSceneId = tempData.id + 1;
            scene.setMemento(tempData, data.isUpdateDayData);
        }
        this.calOnlineMoney();
        this.nowSceneId = data.nowId;
        // this.switchScene(data.nowId);
    }
}


/**
 * 场景数据
 */
export type SceneSaveData = {
    /**
     * 矿场id
     */
    id: number;
    /**
     * 矿洞数据, 当前矿场才有这个数据
     */
    cells?: BaseWorkZoneSData[];
    /**
     * 每秒的闲置现金
     */
    idleMoney: number[];
    /**闲置时间 */
    idleTime: number;

    roleData: RoleSaveData;
    /**桌子数据 */
    table: TableSaveData;
    /**菜式存档数据 */
    food: FoodMsrSaveData;
    /**厨师存档数据 */
    chef: ChefDataSaveData;
    /**服务员存档数 */
    waiter: WaiterDataSaveData;
    guest: GuestDataSaveData;
    /**订单存档数据 */
    order: OrderSaveData;
}