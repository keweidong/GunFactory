import { CsvDataBase, DataMsrBase, register } from "../GameMain/object/scene/config/ConfigClass";

/**
* 用户升级数据管理器
*/
export class UserLevelDataMsr extends DataMsrBase<UserLevelData>{
    constructor() {
        super(UserLevelData, "UserLevelData", "id");
    }
}
/**
*   用户升级数据
*/
export class UserLevelData extends CsvDataBase {
    /**
     * 升级所需经验
     */
    readonly exp: number = 0;
    /**
     * 升级获得的金币
     */
    readonly coin: number = 0;
}
register(UserLevelDataMsr, "UserLevelDataMsr");
declare global {
    interface ConfigMap {
        "UserLevelDataMsr": UserLevelDataMsr;
    }
}