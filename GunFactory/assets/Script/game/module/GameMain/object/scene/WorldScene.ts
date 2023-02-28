import App from "../../../../../core/App";
import { GameText } from "../../../../../core/lang/GameText";
import Toast from "../../../../../core/utils/Toast";
import { NotificationConst } from "../../../../consts/NotificationConst";
import BuffMgr from "../../../Buff/BuffMgr";
import GameMainView from "../../GameMainView";
import SceneDataMsr from "./config/SceneDataMsr";
import SceneMgr, { SceneSaveData } from "./SceneMgr";

/**分享次數限制 */
export enum shareNum {
    //歡樂時光分享次數限制
    happyShare = 2,
    //明星分享次數限制
    starShare = 2,
    //遊戲分享次數限制
    gameShare = 3,

}

//玩家的世界地图
export default class WorldScene implements IMemento {
    public nextTick: long = 0;
    /**
     * 矿场管理区
     */
    public sceneMgr: SceneMgr = null;

    /**明星分享次数 */
    public StartShare: number = shareNum.starShare;

    /**欢乐时光分享次数 */
    public HappyShare: number = shareNum.happyShare;

    /**游戏分享次数 */
    public GameShare: number = shareNum.gameShare;

    public gameView: GameMainView = null;

    /**金币列表 */
    protected globalMoneys: MyBigLong[] = [];
    public playerDto: PlayerInfo;

    /**在线时间*/
    public onlinetime: number = 0;
    /**日程开始时间戳*/
    public schedulestarttime: number = 0;

    /**顾客完成的一次性事件 */
    public gukeEventlist: number[] = [];

    /**
     * 超级现金
     */
    public set superCash(value: number) {
        this.playerDto.diamond = value;
    }
    public get superCash() {
        return this.playerDto.diamond;
    }
    public subSuperCash(subValue: number): boolean {
        if (this.superCash - subValue >= 0) {
            this.superCash -= subValue;
            App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.superCash, -subValue);
            return true;
        }
        else {
            Toast.instance.launch(GameText.getText(lang.common_diamond_not_enough));
            return false;
        }
    }
    public destroy() {
        this.sceneMgr.destroy();
    }
    public addSuperCash(subValue: number) {
        this.superCash += subValue;
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.superCash, subValue);
    }
    public sceneDataMgr: SceneDataMsr = null;
    /**
     * buff管理器
     */
    public buffMsr: BuffMgr = null;

    public routine(tick: long): void {
        this.sceneMgr.routine(tick);
        this.buffMsr.routine(tick);
        // if (tick < this.nextTick) {
        //     return;
        // }

    }

    public updateBuff() {
    }

    public init() {
        this.sceneDataMgr = App.ConfigManager.getConfig("SceneDataMsr");
        let datas = this.sceneDataMgr.getAllDatas();
        for (let key in datas) {
            if (!this.globalMoneys[datas[key].moneyType]) {
                this.globalMoneys[datas[key].moneyType] = MyBigLong.create(datas[key].defaultMoney, 0);
            }
        }
        this.playerDto = App.GameDataMsr.playerInfo;
        // this.mapMsr = this.gameView.mapMsr;
        this.sceneMgr = new SceneMgr(this);
        this.buffMsr = new BuffMgr(this);
        // this.taskMgr = new TaskMgr(this);
        // this.newbieTaskMgr = new NewbieTaskMgr(this);
        // this.sevenDaysMgr = new SevenDaysMgr(this);
    }
    /**
     * 取得钱的类型和需要的金币数
     * 
     * @param {MyBigLong} money 金钱
     * @param {number} needChipsType 金钱类型
     * @returns {boolean} 是否有足够的金钱
     */
    public hasChips(money: MyBigLong, needChipsType: number = 0): boolean {
        return this.globalMoneys[needChipsType].cmp(money) >= 0;
    }

    /**
     * 减金币
    */
    public subMoney(money: MyBigLong, needChipsType: number = 0) {
        this.globalMoneys[needChipsType].sub(money);
    }

    // /**
    //  * 消耗某种类型的货币
    //  * 
    //  * @param {MyBigLong} money 消耗多少货币
    //  * @param {MoneyType} needChipsType 货币类型
    //  * @returns {boolean} 是否成功
    //  */
    // public castChips(money: MyBigLong, needChipsType: MoneyType): boolean {
    // 	if (this.hasChips(money, needChipsType)) {
    // 		this.globalMoneys[needChipsType].sub(money);
    // 		return true;
    // 	}
    // 	return false;
    // 	// return true;
    // }
    // public newBossId(): int {
    // 	return ++this.newGlobalBossId;
    // }
    // public updateMoney(moneyType: MoneyType, money: number[]) {
    // 	this.globalMoneys[moneyType].unPackData(money);
    // }
    // public reset() {
    // 	this.buffMsr.reset();
    // 	this.KCMgr.reset();
    // 	this.fight.reset();
    // }
    public createMemento() {
        let data: SaveData = {
            nowMoneys: this.globalMoneys.map((value) => value.getData()),
            nowId: this.sceneMgr.nowSceneId,
            dataVersion: 0,
            sceneDatas: null,
            buffData: this.buffMsr.createMemento(),
            schedulestarttime: this.schedulestarttime,
            onlinetime: this.onlinetime,
            StartShare: this.StartShare,
            HappyShare: this.HappyShare,
            GameShare: this.GameShare,
            //     roleData: this.roleMsr.createMemento(),
            //     taskData: this.taskMgr.createMemento(),
            //     NewBieTaskData: this.newbieTaskMgr.createMemento(),
            //     sevenDayData: this.sevenDaysMgr.createMemento(),
        };
        let temp = data.sceneDatas = [];
        // let messageArr = [];
        // //该地图等级店铺数据
        // let message: { [key: number]: any } = {};
        // let cell: { "tid": number, "rank": number, "num": number } = null;
        for (let key in this.sceneMgr.allOpenScene) {
            temp.push(this.sceneMgr.allOpenScene[key].createMemento());

            // let street = [];
            // let tempKuangcengMgr = this.sceneMgr.allOpenKCZs[key].kuangcengMgr.mineCellList;
            // for (let i in tempKuangcengMgr) {
            //     let attrObj = tempKuangcengMgr[i].attrObj;
            //     if (attrObj.level < 0) {
            //         continue;
            //     }
            //     cell = { "tid": Number(i), "rank": attrObj.level + 1, "num": 1 };
            //     street.push(cell);
            // }
            // message[key] = street;
        }

        // //获取解锁菜式
        // let UnlockFoodNum = App.ControllerManager.applyFunc(ControllerConst.Food, FoodConst.GET_UNLOCK_NUM);
        // let streetFood = [];
        // cell = { "tid": 0, "rank": 0, "num": UnlockFoodNum };
        // streetFood.push(cell);

        // message['100'] = streetFood;
        // //messageArr.push(message);
        // let messageJson = JSON.stringify(message);
        // //向后台发送埋点信息
        // Platform.instance.callAD("/Interface/data/save_prop2.php", { data_json: messageJson });
        return data;
    }


    updateDayData?(key: string, day: number) {
        this.HappyShare = shareNum.happyShare;
        this.StartShare = shareNum.starShare;
        this.GameShare = shareNum.gameShare;
    }

    //首次创建(新玩家)
    public onCreateWorldScene(): void {

        this.buffMsr.setMemento(null);
        // this.taskMgr.setMemento();
        // this.newbieTaskMgr.setMemento();
        // this.sevenDaysMgr.setMemento();
        let arrLen = this.sceneDataMgr.dataCnt;
        for (let i = 0; i < 1; i++) {
            this.sceneMgr.openNewScene(i);
        }

        this.sceneMgr.nowSceneId = 0;
        // this.sceneMgr.switchScene(0);
    }
    public start() {
        this.sceneMgr.start();
    }
    public setMemento(data: SaveData) {
        if (data) {
            for (let key in data.nowMoneys) {
                if (this.globalMoneys[key]) {
                    this.globalMoneys[key].unPackData(data.nowMoneys[key]);
                }
            }
            this.schedulestarttime = data.schedulestarttime;
            this.onlinetime = data.onlinetime;
            this.buffMsr.setMemento(data.buffData);
            // this.taskMgr.setMemento(data.taskData);
            // this.newbieTaskMgr.setMemento(data.NewBieTaskData);
            this.sceneMgr.setMemento(data);
            // this.sevenDaysMgr.setMemento(data.sevenDayData);
            // this.KCMgr.nowKCZ.calIdle();
            if (data.HappyShare) {
                this.HappyShare = data.HappyShare;
            } else {
                this.HappyShare = shareNum.happyShare;
            }

            if (data.StartShare) {
                this.StartShare = data.StartShare;
            } else {
                this.StartShare = shareNum.starShare;
            }

            if (data.GameShare) {
                this.GameShare = data.GameShare;
            } else {
                this.GameShare = shareNum.gameShare;
            }
        } else {
            this.onCreateWorldScene();
        }

    }
    public getMoneyByChipsType(needChipsType: int = 0): MyBigLong {
        return this.globalMoneys[needChipsType];
    }
}

export interface SaveData {
    nowMoneys: { [key: number]: number[] };
    /**
     * 当前农场id
     */
    nowId: number;
    /**
     * 数据版本
     */
    dataVersion: number;

    /**
     * 矿场列表
     */
    sceneDatas?: SceneSaveData[];
    buffData?: { [key: number]: any };
    /**日程开始时间戳*/
    schedulestarttime?: number;
    /**在线时间*/
    onlinetime?: number;
    isUpdateDayData?: boolean;
    /**明星分享次数 */
    StartShare?: number;
    /**欢乐时光分享次数 */
    HappyShare?: number;
    /**分享游戏次数 */
    GameShare?: number;
}