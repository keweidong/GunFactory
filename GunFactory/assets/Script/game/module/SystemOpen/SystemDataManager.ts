

import { GameText } from "../../../core/lang/GameText";
import { CsvDataBase, DataMsrBase, register } from "../GameMain/object/scene/config/ConfigClass";

const { ccclass, property } = cc._decorator;
/*
*商店配置表
*/
@ccclass
export default class SystemDataManager extends DataMsrBase<SystemData> {
    constructor() {
        super(SystemData, "system_open", "index");
    }


}

/**
 * 
*/
export class SystemData extends CsvDataBase {
    /**
    * 序号
    */
    readonly index: number = null;
    /**
    * 位置
    */
    readonly pos: string = null;
    /**
    * 开启所需星星数
    */
    readonly starCnt: string = null;
    /**
    * 按钮图标资源
    */
    readonly iconSource: string = null;
    /**
    * 是否显示
    */
    readonly isShow: number = null;
    /**
    * 是否飘动画
    */
    readonly isPlayAni: number = null;
    /**
    * 解锁条件说明
    */
    unLockDesc: string = null;
    /**
     * 解锁说明
    */
    desc: string = null;
    public $parseData(lines: string[], typeList: string[], keyList: string[]) {
        let result = super.$parseData(lines, typeList, keyList);
        this.unLockDesc = GameText.getTextByStr(this.unLockDesc);
        // this.desc = GameText.getTextByStr(this.desc);
        return result;
    }
    // GameText.getTextByStr(this.config.unLockDesc)
}

register(SystemDataManager, "SystemDataManager");
declare global {
    interface ConfigMap {
        /**厨师 */
        "SystemDataManager": SystemDataManager;
    }
}