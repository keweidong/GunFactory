import App from "../../../../core/App";

/**
 * 基础属性类
 */
export default class AttrBaseObject {
    /**
     * 字符串类型属性
     */
    public objectAttrDictByObj: { [key: number]: Object } = {};
    public constructor(other?: AttrBaseObject) {
        if (other) {
            App.CommonUtils.copyObject(other.objectAttrDictByObj, this.objectAttrDictByObj);
            App.CommonUtils.copyObject(other.objectAttrDict, this.objectAttrDict);
        }
    }
    /**
     * 数字类型属性
     */
    public objectAttrDict: { [key: number]: number } = {};
    public get_object_attr_obj(attr_key: int, defaultRet: Object): Object {
        let ret = this.objectAttrDictByObj[attr_key];
        if (ret != null) {
            return ret;
        }
        else {
            return defaultRet;
        }
    }

    public set_object_attr_obj(attr_key: number, attr_value: Object): boolean {
        this.objectAttrDictByObj[attr_key] = attr_value;
        return true;
    }

    public get_object_attr(attr_key: number, defaultRet: int): int {
        let ret = this.objectAttrDict[attr_key];
        if (ret != null) {
            return ret;
        }
        else {
            return defaultRet;
        }
    }
    public calc_add_attr() {
        return this.objectAttrDict;
    }
    public set_object_attr(attr_key: number, attr_value: int): boolean {
        this.objectAttrDict[attr_key] = attr_value;
        return true;
    }

    public clear(): void {
        this.objectAttrDict = {};
        this.objectAttrDictByObj = {};
        // objectAttrDict.clear();
        // objectAttrDictByObj.clear();
    }
}

