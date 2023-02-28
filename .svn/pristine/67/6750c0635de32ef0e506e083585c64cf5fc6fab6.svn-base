import { TableData } from "../config/TableDataMsr";
import CusTableComp, { TableItemSaveData } from "./CusTableComp";

export class CustomerTable {
    /**桌子配置 */
    public conf: TableData = null;
    public isOpen: boolean = false;



    public isEnough: boolean = null;

    public displayNode: CusTableComp = null;
    public undateUnlockMoney(isEnough: boolean) {
        if (this.isEnough === isEnough) {
            return;
        }
        if (this.displayNode) {
            this.displayNode.undateUnlockMoney(isEnough);
        }
        this.isEnough = isEnough;
    }

    public setDisplayNode(node: CusTableComp) {
        this.displayNode = node;
        node.setData(this);
        if (!this.isOpen) {
            this.displayNode.undateUnlockMoney(this.isEnough);
        }
        // this.undateUnlockMoney()
    }

    /**
     * 开启桌子
     */
    public openTable() {
        // this.data.isOpen = 1;
        this.isOpen = true;
    }
    public setMemento(data: TableItemSaveData) {
        if (data && data.isOpen) {
            this.isOpen = true;
        } else {
            this.isOpen = false;
        }
    }
}