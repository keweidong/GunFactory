import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import { registerJSONConf } from "../../ConfigManager";
import { ControllerConst } from "../../consts/ControllerConst";
import LayerManager from "../../LayerManager";
import { Platform } from "../../platform/Platform";
import { GameConst } from "./GameConst";
import GameMainView from "./GameMainView";
import Block from "./object/scene/Block";
import MapEditor from "./object/scene/map/MapEditor";
import Chef from "./object/scene/role/chef/Chef";
import ScenegZone from "./object/scene/SceneZone";
import CusTableComp from "./object/scene/table/CusTableComp";
import DishTable from "./object/scene/table/DishTable";
import FeatureFoodTable from "./object/scene/table/FeatureFoodTable";
import OrderTable from "./object/scene/table/OrderTable";
const { ccclass, property, executeInEditMode } = cc._decorator;
@ccclass
// @executeInEditMode
export default class GameView extends cc.Component {
    /**角色层 */
    @property(cc.Node)
    public roleLayer: cc.Node = null;
    /**用于存放动画,特效等需要放在角色层上的层级节点 */
    @property({ type: cc.Node, tooltip: "用于存放动画,特效等需要放在角色层上的层级节点" })
    public layer: cc.Node = null;

    public mainView: GameMainView = null;
    @property(cc.Node)
    public unlockView: cc.Node = null;
    /**
     * 餐桌列表
     */
    public cusTables: CusTableComp[] = [];

    protected chefs: Chef[] = [];
    public scene: ScenegZone = null;
    // public scene: ScenegZone = null;
    /**订单桌子*/
    public orderTable: OrderTable = null;
    /**菜式桌子 */
    public dishTable: DishTable = null;
    /**特色菜桌子 */
    public featureFoodTable: FeatureFoodTable = null;

    @property({ type: cc.Label, tooltip: "排队人数" })
    public rankCntLab: cc.Label = null;


    @property(cc.Sprite)
    protected bgImg: cc.Sprite = null;

    protected isInit: boolean = false;
    /**
     * 排队位置
     */
    protected rankPos: cc.Vec2 = cc.v2();

    protected formationT: cc.Node = null;

    public sceneId: number = 0;
    /**
    * 切换到上一个场景在ScrollerView中的滚动偏移值
    */
    public preY: number = 0;
    /**
    * 切换到下一个场景在ScrollerView中的滚动偏移值
    */
    public nextY: number = 0;
    /**
    * 当前场景在ScrollerView中的滚动偏移值
    */
    public scrollY: number = 0;
    @property(MapEditor)
    public mapEditor: MapEditor = null;


    public tablePos: TablePosConf = null;

    onLoad() {
        this.layer.width =
            this.mapEditor.node.width =
            this.roleLayer.width;
        this.roleLayer.active = false;
        this.chefs.length = 0;
        this.cusTables.length = 0;
        let children = this.roleLayer.children;
        for (const child of children) {
            let chef = child.getComponent(Chef);
            if (chef) {
                this.chefs.push(chef);
            }
            let cusTable = child.getComponent(CusTableComp);
            if (cusTable) {
                this.cusTables.push(cusTable);
            }
        }
        this.formationT = this.roleLayer.getChildByName("formationT");
        this.blocks.push(this.formationT.getComponent(Block))
    }
    public initUI() {

    }

    /**
     * 点击特色菜桌子
     */
    protected onTouchFeatureTable() {
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.OPEN_FEATURE_FOOD_VIEW);
    }

    public updateRankBox() {
        this.rankCntLab.string = "" + (this.scene.roleMsr.waitCreateCusCnt + this.scene.roleMsr.rankList.length);
    }

    public onTouchRankCnt() {
        if (this.scene.roleMsr.waitCreateCusCnt < this.scene.roleMsr.maxWaitCreateCnt) {
            let pos = this.rankCntLab.node.position;
            this.rankCntLab.node.parent.convertToWorldSpaceAR(pos, pos);
            let parent = LayerManager.getLayer(LayerManager.UI_Main);
            parent.convertToNodeSpaceAR(pos, pos);
            let lab = App.NodePoolMsr.flyLabel.pop()//播放飘字动画
            // this.isAutoDestroy = isAutoDestroy;
            parent.addChild(lab);
            lab.position = pos;
            lab.opacity = 255;
            cc.tween(lab)
                .to(1.9, { y: lab.y + 200, opacity: 0, })
                .call(function () {
                    App.NodePoolMsr.flyLabel.push(lab);
                })
                .start();
        }
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.ADD_RANK_CNT, 1);
    }
    public getRankPos() {
        return this.rankPos;
    }

    public getWaiterRankPos() {
        return this.tablePos.waiterRankPos;
    }

    public reset() {
    }
    // @property
    // public set print(value) {
    //     // cc.log(require("fs"));
    //     let data: TablePosConf = {
    //         waiterRankPos: {
    //             x: 750,
    //             y: 570
    //         },
    //         waiterGetFoodPos: {
    //             x: this.dishTable.node.x,
    //             y: this.dishTable.node.y
    //         },
    //         dishTable: {
    //             x: this.dishTable.node.x,
    //             y: this.dishTable.node.y
    //         },
    //         rankPos: {
    //             x: this.rankPos.x,
    //             y: this.rankPos.y
    //         },
    //         BBQTables: [],
    //         customerTables: [],
    //     }
    //     let BBQTables = data.BBQTables;
    //     let arrLen = this.chefs.length;
    //     for (let i = 0; i < arrLen; i++) {
    //         BBQTables.push({
    //             x: this.chefs[i].node.x,
    //             y: this.chefs[i].node.y
    //         })
    //     }
    //     let customerTables = data.customerTables;
    //     arrLen = this.cusTables.length;
    //     for (let i = 0; i < arrLen; i++) {
    //         customerTables.push({
    //             x: this.cusTables[i].node.x,
    //             y: this.cusTables[i].node.y,
    //             type: this.cusTables[i].posData.length === 2 ? 0 : 1
    //         })
    //     }
    //     cc.log(JSON.stringify(data))

    // }
    // public get print() {
    //     return false;
    // }

    /**
     * 创建烧烤桌
     */
    public createBBQTables() {

    }

    public blocks: Block[] = [];


    public setIsActive(value: boolean) {

    }
    public onExit() {
        // cc.director.getScheduler().unscheduleUpdate(this);
        // this.roleLayer.active = false;
    }

    public scorlleOut() {
        this.roleLayer.active = false;
        // this.unlockView.active = false;
    }

    protected moveY: number = 0;
    /**点击加速厨师的节点 */
    @property(cc.Node)
    protected touchCoodAccelerateNode: cc.Node = null;
    protected onTouchStart(event: cc.Event.EventMouse) {
        Log.trace("开始加速");
        Platform.instance.vibrator(1000);
        this.touchCoodAccelerateNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.touchCoodAccelerateNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.IS_COOD_ACCELERATE, true);
        this.moveY = event.getLocationY();
    }

    protected onTouchEnd() {
        Log.trace("停止加速");
        this.touchCoodAccelerateNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.touchCoodAccelerateNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.IS_COOD_ACCELERATE, false)
    }

    protected isLoadBg: boolean = false;
    public scorlleIn() {
        if (this.scene && this.scene.isOpen) {
            this.roleLayer.active = true;
            this.unlockView.active = false;
        } else {
            this.roleLayer.active = false;
            this.shouUnlockView();
        }
        if (!this.isLoadBg) {
            this.isLoadBg = true;
            App.CommonUtils.setSpriteFrame("Texture/game/scene/scene_" + this.scene.conf.icon, this.bgImg)
        }
    }
    public shouUnlockView() {
        this.unlockView.active = true;
        let list = [
            {
                text: GameText.getText(lang.store_scene_progress_user_level),
                data: this.scene.worldScene.sceneMgr.getPlayerLevel(this.sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_publicity_level),
                data: this.scene.worldScene.sceneMgr.getGuestLevel(this.sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_waiter_speed),
                data: this.scene.worldScene.sceneMgr.getWaiterLevel(this.sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_chef_speed),
                data: this.scene.worldScene.sceneMgr.getChefLevel(this.sceneId)
            },
            {
                text: GameText.getText(lang.store_scene_progress_dish_level),
                data: this.scene.worldScene.sceneMgr.getFoodLevel(this.sceneId)
            },
        ];
        let richNode = this.unlockView.getChildByName("RichNode")
        let arrLen = list.length;
        for (let i = 0; i < arrLen; i++) {
            let item = list[i];
            let richText = richNode.children[i].getComponent(cc.RichText);
            // richText.string = item.text.format(item.data[2], item.data[1]);
            if (item.data[0] >= item.data[1]) {
                richText.string = `<color=#ffd145>${item.text.format(item.data[2], item.data[1])}(${item.data[0]}/${item.data[1]})</color>`;
            } else {
                richText.string = `${item.text.format(item.data[2], item.data[1])}(<color=#ffd145>${item.data[0]}/</color>${item.data[1]})`;
            }
        }
        let sceneId = this.sceneId;
        const imgs = [];
        // let imgNode = this.unlockView.getChildByName("icon3");
        // imgNode.active = false;

        let customerConf = App.ConfigManager.getConfig("CustomerDataMsr");

        arrLen = customerConf.dataCnt;
        for (let i = 0; i < arrLen; i++) {
            let data = customerConf.getData(i);
            if (data.unlockScene === sceneId) {
                imgs.push("Texture/game/scene/role_icon/" + data.modelId);
                // imgNode.active = true;
                // App.CommonUtils.setSpriteFrame("Texture/game/StartUI/star_" + data.id, imgNode.getComponent(cc.Sprite));
            }
        }
        let starConfs = App.ConfigManager.getConfig("StarDataMsr");
        arrLen = starConfs.dataCnt;
        for (let i = 0; i < arrLen; i++) {
            let data = starConfs.getData(i);
            if (data.scenceId === sceneId) {
                imgs.push("Texture/game/StartUI/star_" + data.id);
            }
        }
        let images = this.unlockView.getChildByName("icons");
        for (let i = 0; i < 3; i++) {
            let imgNode = images.children[i];
            if (imgs[i]) {
                imgNode.active = true;
                App.CommonUtils.setSpriteFrame(imgs[i], imgNode.getComponent(cc.Sprite));
            } else {
                imgNode.active = false;
            }
        }
    }
    /**
     * 首次进入的时候,创建对应的桌子,并且同步配置里面的位置
     */
    public firstEnter() {
        if (!this.isLoadBg) {
            this.isLoadBg = true;
            App.CommonUtils.setSpriteFrame("Texture/game/scene/scene_" + this.scene.conf.icon, this.bgImg)
        }
        this.touchCoodAccelerateNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.roleLayer.active = true;
        //创建订单跟菜式桌子
        let dishTable = this.mainView.orderTablePool.pop();
        this.roleLayer.addChild(dishTable);
        this.orderTable = dishTable.getComponent("OrderTable");
        this.dishTable = dishTable.getComponent("DishTable");


        //创建特色菜桌子
        let featureTableNode = this.mainView.featureTablePool.pop();
        featureTableNode.active = false;
        this.roleLayer.addChild(featureTableNode);
        this.featureFoodTable = featureTableNode.getComponent(FeatureFoodTable);
        featureTableNode.on(cc.Node.EventType.TOUCH_END, this.onTouchFeatureTable, this);
        App.CommonUtils.setSpriteFrame("Texture/game/scene/RankImgs/rank1", this.formationT.getComponent(cc.Sprite));
        let chefMsr = this.scene.chefMsr;
        chefMsr.chefs = this.chefs;
        let data = this.tablePos = App.ConfigManager.getConfig("TablePosData")[this.scene.getId()];
        let arrLen = data.BBQTables.length;
        for (let i = 0; i < arrLen; i++) {//创建烧烤桌
            let BBQTableNode = this.mainView.BBQTablePools.pop();
            BBQTableNode.x = data.BBQTables[i].x;
            BBQTableNode.y = data.BBQTables[i].y;
            this.blocks.push(BBQTableNode.getComponent(Block));
            let chef = BBQTableNode.getComponent(Chef);
            this.chefs.push(chef);
            this.chefs[i].setData(chefMsr, i);
            this.roleLayer.addChild(BBQTableNode);
        }
        arrLen = data.customerTables.length;
        for (let i = 0; i < arrLen; i++) {//创建顾客的桌子
            let posData = data.customerTables[i];
            let tableNode = this.mainView.tableNodePools[posData.type].pop();
            tableNode.x = posData.x;
            tableNode.y = posData.y;
            this.roleLayer.addChild(tableNode, 0, "table" + i);
            this.blocks.push(tableNode.getComponent(Block));
            let customerTable = tableNode.getComponent(CusTableComp);
            this.cusTables.push(customerTable);
        }
        this.dishTable.node.x = data.dishTable.x;
        this.dishTable.node.y = data.dishTable.y;

        this.featureFoodTable.node.x = data.featureFoodTable.x;
        this.featureFoodTable.node.y = data.featureFoodTable.y;

        this.touchCoodAccelerateNode.y = data.BBQTables[0].y + 50;
        this.formationT.y = data.rankPos.y - 63;
        this.rankPos.y = this.formationT.y - 30;
        this.rankPos.x = this.roleLayer.width;
        this.blocks.push(this.dishTable.getComponent(Block));
        this.blocks.push(this.orderTable.getComponent(Block));
        this.blocks.push(this.featureFoodTable.getComponent(Block));
        this.featureFoodTable.updateOrderCnt(this.scene.orderMsr.saveData.orders.length);

    }
    public onEnter() {
        this.roleLayer.active = true;
        // cc.director.getScheduler().scheduleUpdate(this, 0, true);
    }

    public init() {
        // this.mainView = view;
    }
}
declare global {
    interface ConfigMap {
        "TablePosData": TablePosConf[];
    }
}
registerJSONConf("TablePosData", "TablePosData");//注册到预加载配置里面
declare global {
    /**
     * 桌子位置配置信息
     */
    type TablePosConf = {
        /**
         * 服务员排队位置
         */
        waiterRankPos: {
            x: number;
            y: number;
        }
        /**
         * 服务员获取食物的位置
         */
        waiterGetFoodPos: {
            x: number;
            y: number;
        }

        /**烧烤桌子 */
        BBQTables: {
            x: number;
            y: number;
        }[];
        /**顾客桌子位置 */
        customerTables: {
            x: number;
            y: number;
            /**桌子类型, 0 表示双人桌,1 表示四人桌 */
            type: number;
        }[]


        /**菜式桌子 */
        dishTable: {
            x: number;
            y: number;
        };
        /**特色菜式桌子 */
        featureFoodTable: {
            x: number;
            y: number;
            /**送菜服务员出现位置 */
            wx: number;
            /**送菜服务员出现位置 */
            wy: number;
        };

        /**排队的位置 */
        rankPos: {
            x: number;
            y: number;
        }
    }
}