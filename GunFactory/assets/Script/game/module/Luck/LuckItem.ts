
import App from "../../../core/App";

import Reslist from "../GameMain/Reslist";
import GameScene from "../../scene/GameScene";
import { LuckDataManager } from "./LuckDataManager";

const { ccclass, property, executeInEditMode } = cc._decorator;

/** 赞助界面 */
@ccclass
export default class FoodItem extends cc.Component {
    @property(cc.Sprite)
    protected iconSprite: cc.Sprite = null;

    @property(cc.Label)
    protected titleLab: cc.Label = null;

    @property(cc.Sprite)
    protected foodGroup1: cc.Sprite = null;

    @property(cc.Sprite)
    protected foodGroup2: cc.Sprite = null;

    protected foodList: cc.Sprite[] = [];

    public luckDataMnager: LuckDataManager;
    protected resList: Reslist = null;

    public init() {
        this.resList = (<GameScene>App.SceneManager.getCurrScene()).reslist;
        this.foodList.push(this.foodGroup1);
        this.foodList.push(this.foodGroup2);
    }
    
    public setData(datas) {
        // for (let i = 0; i < this.foodList.length; i++) {
        //     let data = datas.foodData[i];
        //     let foodGroup = this.foodList[i];
        //     if (foodGroup) {
        //         if (!data) {
        //             continue;
        //         }
        //         let nodeList = foodGroup.node.getChildByName("cutGroup").children;
        //         for (let j = 0; j < data.pieces.length; j++) {
        //             let state = data.pieces[j];
        //             let node = nodeList[j];
        //             if (node) {
        //                 node.active = !state;
        //             }
        //         }

        //         let foodName = this.foodDataManager.getDataByStreetIdAndCellId(datas.kcId, datas.kdId)[i].title;
        //         foodGroup.node.getChildByName("foodName").getComponent(cc.Label).string = foodName;

        //         let desc = this.foodDataManager.getDataByStreetIdAndCellId(datas.kcId, datas.kdId)[i].desc;
        //         foodGroup.node.getChildByName("buffLab").getComponent(cc.Label).string = desc;

        //         let foodSprite = foodGroup.node.getChildByName("foodSprite").getComponent(cc.Sprite);
        //         foodSprite.spriteFrame = this.resList.cellImgs[datas.kdId].foodImgs[i];
        //         // let spriteFrame = foodSprite.spriteFrame.clone();
        //         // var tmpRect = new cc.Rect(0, 0, foodSprite.node.width /2, foodSprite.node.height/2);
        //         // spriteFrame.setRect(tmpRect);
        //         // foodSprite.spriteFrame = spriteFrame;
        //         // foodSprite.spriteFrame.setRect(cc.rect(0, 0, foodSprite.node.width / 4, foodSprite.node.height / 4));
        //         // let temp = foodSprite.spriteFrame.getRect()
        //     }
        // }
        // 131
        // this.iconSprite.spriteFrame = this.resList.cellImgs[datas.kdId].imgs[datas.lv];
        // this.iconSprite.node.scale = 131 / this.iconSprite.spriteFrame.getRect().width;
        // this.titleLab.string = this.resList.cellImgs[datas.kdId].names[datas.lv];
    }

    public close() {
        this.iconSprite.spriteFrame = null;
        this.foodList = [];
    }
}