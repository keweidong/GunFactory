import App from "../../../../../../core/App";
import { TableDataList } from "../config/TableDataMsr";
import Customer from "../role/Customer";
import ScenegZone from "../SceneZone";
import { TableItemSaveData, TablePosData } from "./CusTableComp";
import { CustomerTable } from "./CustomerTable";
/**
 * 桌子管理器
 */
export class TableMsr {

    /**
     * 餐桌列表
     */
    public tables: CustomerTable[] = [];
    /**被占用的位置列表 */
    public emptyPos: TablePosData[] = [];

    /**等待清理的位置列表 */
    public waitCleanPos: TablePosData[] = [];

    public scene: ScenegZone = null;
    /**配置数据 */
    dataList: TableDataList = null;
    /**
     * 初始化桌子
     */
    public init(scene: ScenegZone) {
        this.scene = scene;
        this.dataList = App.ConfigManager.getConfig("TableDataMsr").getData(scene.getId());
        let arrLen = App.ConfigManager.getConfig("TablePosData")[scene.getId()].customerTables.length;
        for (let i = 0; i < arrLen; i++) {
            let table = this.tables[i] = new CustomerTable();
            table.conf = this.dataList.getData(i);
        }
        // this.cusTables = this.scene.gameView.cusTables;
    }

    public firstEnter() {
        let isNeedCheck = true;
        let arrLen = this.tables.length;
        for (let i = 0; i < arrLen; i++) {
            let table = this.tables[i];
            table.setDisplayNode(this.scene.gameView.cusTables[i]);
            if (table.isOpen) {
                this.addPosDatas(table.displayNode.posData);
            } else {
                table.undateUnlockMoney(table.isEnough);
                if (isNeedCheck) {//只检查当前第一张桌子能不能免费解锁
                    isNeedCheck = false;
                    table.displayNode.checkIsShowAdBtn();
                }
            }
        }
    }

    public onEnter() {

    }


    public onTouchPlate(node: cc.Event) {
        // node.target.
    }

    /**
     * 清理桌子
     * @param waiter q
     */
    public cleanTable(tablePosData: TablePosData) {
        tablePosData.needClean = false;
        tablePosData.beerImg.node.active = tablePosData.foodImg.node.active = false;
        if (this.emptyPos.indexOf(tablePosData) === -1) {
            // App.TimerManager.setFrameOut(1, () => {

            // }, this);
            tablePosData.foodImg.node.off(cc.Node.EventType.TOUCH_END, tablePosData.cleanFunc);
            this.emptyPos.push(tablePosData);
        }
    }

    /**
     * 检查桌子是否能够开启
     * @param id 桌子的id
     */
    public checkIsCanUnlock(id: number) {
        let table = this.tables[id];
        return table.isEnough;
    }
    /**
     * 解锁桌子
     * @param id 桌子id
     */
    public unlockTable(id: number, isFree?: boolean) {
        let table = this.tables[id];
        if (table.isOpen) {
            Log.warn(`桌子(${id})已经解锁了`);
            return;
        }
        table.openTable();
        if (table.displayNode) {
            table.displayNode.openTable();
            this.addPosDatas(table.displayNode.posData);
        }
        if (!isFree) {
            this.scene.nowMoneySub(table.conf.unlockChips)
        }
        for (const table of this.tables) {
            if (!table.isOpen) {
                if (table.displayNode) {
                    table.displayNode.checkIsShowAdBtn();
                }
                break;
            }
        }
    }
    protected addPosDatas(posData: TablePosData[]) {
        let arrLen = posData.length;
        for (let i = 0; i < arrLen; i++) {
            let data = posData[i];
            this.emptyPos.push(posData[i]);
            posData[i].cleanFunc = () => {
                this.cleanTable(data);
            }
        }
    }

    /**
     * 是否拥有空白位置
     */
    public hasEmptyPos() {
        return this.emptyPos.length;
    }
    /**
    * 是否拥有空白位置
    */
    public hasCleanPos() {
        return this.waitCleanPos.length;
    }

    /**
     * 给顾客占好位置
     * @param customer 
     */
    public orderPos(customer: Customer) {
        let pos = this.emptyPos.pop();
        if (pos) {
            customer.tablePosData = pos;
            return true;
        }
        return false;
    }

    /**
     * 刷新解锁金钱状态
     */
    public updateUnlockMoney() {
        let nowNomey = this.scene.nowMoney;
        let arrLen = this.tables.length;
        for (let i = 0; i < arrLen; i++) {
            let table = this.tables[i];
            if (!table.isOpen) {
                table.undateUnlockMoney(nowNomey.cmp(table.conf.unlockChips) >= 0);
            }
        }
    }
    public newOpen() {
        this.updateUnlockMoney();
        this.unlockTable(0, true);//默认开启一张桌子
    }
    public createMemento(): TableSaveData {
        let list = {};
        let arrLen = this.tables.length;
        for (let i = 0; i < arrLen; i++) {
            let table = this.tables[i];
            if (table.isOpen) {
                list[i] = {
                    isOpen: 1,
                    id: i
                }
            }
        }
        return {
            datas: list
        }
    }
    public setMemento(data: TableSaveData) {
        let arrLen = this.tables.length;
        for (let i = 0; i < arrLen; i++) {
            let table = this.tables[i];
            table.setMemento(data.datas[i]);
        }
        this.updateUnlockMoney();
    }

}
/**
 * 桌子存档数据
 */
export interface TableSaveData {
    datas: {
        [id: string]: TableItemSaveData
    };
}