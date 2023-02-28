
import { BG_TYPE } from '../../../core/mvc/view/IBaseView';
import { NewsTypeConst } from '../GameUI/GameUIConst';
import { StartEventConst } from './StartEventConst';
import Star from '../GameMain/object/scene/role/Star';
import BaseView from '../../../core/mvc/view/BaseView';
import { StarDataMsr, StarData } from '../GameMain/object/scene/config/StarDataMsr';
import Startitem from './Startitem';
import { ConfigManager } from '../../ConfigManager';
import App from '../../../core/App';
import Item from '../GameMain/object/scene/test/Item';
import { ItemData } from '../bag/ItemDataManager';
import Random from '../../../core/behavior/RandomAction';
import { ADController, AdType } from '../AD/ADController';
import { ControllerConst } from '../../consts/ControllerConst';
import { ADConst } from '../AD/ADManageBase';
import {GameUIConst} from "../GameUI/GameUIConst"
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
/**明星界面 */
@ccclass
export default class StartShowView extends BaseView {

    bgType: BG_TYPE = BG_TYPE.GRAY;

    public eventype: NewsTypeConst = null;

    /**明星界面的预制体 */
    @property(cc.Prefab)
    staritem: cc.Prefab = null;
    @property(cc.Button)
    closeBtn: cc.Button = null;

    /**随机选取明星按钮 */
    @property(cc.Button)
    showStartBtn: cc.Button = null;

    /**节点的content */
    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    itemList: cc.Node[] = [];

    @property(cc.Sprite)
    itemLightMask: cc.Sprite[] = []

    /**已经开启的明星id */
    numlist: number[] = [];

    // public starDataMsr： StarDataMsr = null;
    setAllStarData(data: StarDataMsr) {
        for (let i = 0; i < 9; i++) {

            //判断明星有没有来过
            let isShow: boolean = false;
            if (this.numlist.indexOf(i) > -1) {
                isShow = true;
            }
            let itemData = data.getData(i)
            if (itemData) {

                this.itemList[i].getComponent(Startitem).setData(itemData, isShow);
            }

        }
    }

    setStarData(data: StarDataMsr) {
        for (let i = 0; i < 9; i++) {

            /**检查是否展示 */
            let isShow: boolean = false;
            if (this.starLockData[i] && this.starLockData[i].isUnlock) {
                isShow = true;
            }
            let itemData = data.getData(i)
            if (itemData) {
                this.itemList[i].getComponent(Startitem).setData(itemData, isShow);

                this.itemList[i].getComponent(cc.Button).interactable = isShow;

                continue;
            }
            this.itemList[i].getComponent(cc.Button).interactable = false;
        }
    }

    public async randomStar() {
        let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.Invite_Star);;
        if (result) {
            this.closeBtn.node.active = false;
            this.showStartBtn.node.active = false;
            App.TimerManager.doTimer(150, 20, () => {
                this.randThisStarMark();
            }, this, this.randCreateStart, this);
        }


    }


    nowIndex: number;
    reIndex: number = 0;

    randThisStarMark() {
        let randId = Math.floor(Math.random() * (this.itemList.length - 0)) + 0;

        this.nowIndex = randId;
        this.itemLightMask[this.reIndex].node.active = false;
        this.itemLightMask[this.nowIndex].node.active = true;
        this.reIndex = this.nowIndex;

    }

    randCreateStart() {
        // this.RandomStar();
        if (this.reIndex != this.starId) {
            this.itemLightMask[this.reIndex].node.active = false;
            this.reIndex = this.starId;
            this.itemLightMask[this.starId].node.active = true;

            this.itemList[this.starId].getComponent(Startitem).setData(this.starDataMsr.getData(this.starId), true);
        }
        App.TimerManager.doTimer(1500, 1, () => {
            this.applyFunc(StartEventConst.RandCreateStar)
            App.ViewManager.closeView(this);
        }, this)

    }


    initUI() {
        super.initUI();
        // this.setIsAutoScale(true);
    }
    starId: number = 0;
    starDataMsr: StarDataMsr = null;

    /**明星解锁的情况 */
    starLockData: { id: number, isUnlock: boolean }[] = [];
    open(starDataMsr: StarDataMsr, numlist: { id: number, isUnlock: boolean }[], starid: number) {
        super.open();
        // this.setAllStarData();
        // let starData = App.ConfigManager.getConfig("StarDataMsr");
        // this.numlist = numlist;
        this.starLockData = numlist;
        this.starDataMsr = starDataMsr;
        this.setStarData(starDataMsr);
        // this.setAllStarData(starDataMsr)
        // if (this.nowIndex) {
        //     this.itemLightMask[this.nowIndex].node.active = true;
        // }
        // this.starId = starid;

        this.closeBtn.node.active = true;
        this.showStartBtn.node.active = true;

    }

    closethisView() {
        this.applyFunc(StartEventConst.Hide_The_StartEvent);
        App.ViewManager.closeView(this);
    }

    close() {
        super.close();
        // this.applyFunc(StartEventConst.START_STATA_EVENT);

    }

    /**选择一个明星 */
    public choseOneStar(event: cc.Event, rate: string) {
        let multiple = parseInt(rate);
        // this.starId = multiple - 1;
        this.starId = multiple;
        for (let index = 0; index < this.itemLightMask.length; index++) {
            this.itemLightMask[index].node.active = false;
        }
        this.itemLightMask[(this.starId)].node.active = true;
    }

    public static isFirst:boolean = true;
    
    /**创建一个指定的明星 */
    public async createOneStar() {
        let result = await App.ControllerManager.applyFunc(ControllerConst.AD, ADConst.OPENAD, AdType.Invite_Star);
        if (result) {
            //创建一个指定的明星
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.LUPING_CLOSE);
            this.applyFunc(StartEventConst.RandCreateStar, this.starId);
            App.ViewManager.closeView(this);
        }
    }

    
}
