import BaseModel from "../../../core/mvc/model/BaseModel";
import ShopDataManager from "./ShopDataManager";

export default class ShopModel extends BaseModel {
    // public shopItemDataList
    public conf: ShopDataManager = null;
}