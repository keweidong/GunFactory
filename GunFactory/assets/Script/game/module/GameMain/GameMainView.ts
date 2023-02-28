import App from "../../../core/App";
import { GameText } from "../../../core/lang/GameText";
import NodePool from "../../../core/utils/NodePool";
import { ControllerConst } from "../../consts/ControllerConst";
import FoodBtn from "./component/FoodBtn";
import UpgradeBtn from "./component/UpgradeBtn";
import { GameConst } from "./GameConst";
import GameView from "./GameView";
import WorldScene from "./object/scene/WorldScene";




const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMainView extends cc.Component {
    @property(cc.Node)
    public topLayer: cc.Node = null;

    @property(cc.Mask)
    protected mask: cc.Mask = null;

    /**食物按钮组 */
    @property({ type: cc.Node, tooltip: "食物按钮组" })
    protected foodBtns: cc.Node = null;

    public foodBtnList: FoodBtn[] = [];

    @property(cc.Node)
    public happyTimeEffect: cc.Node = null;

    public upgradeBtns: UpgradeBtn[] = null;

    @property(cc.ScrollView)
    public scrollView: cc.ScrollView = null;
    @property(cc.Node)
    protected gameContent: cc.Node = null;

    public world: WorldScene = null;
    @property(GameView)
    protected gameViews: GameView[] = [];
    /**桌子对象池列表 */
    @property({ type: NodePool, tooltip: "桌子对象池列表" })
    public tableNodePools: NodePool[] = [];

    /**烧烤桌对象池 */
    @property({ type: NodePool, tooltip: "烧烤桌对象池" })
    public BBQTablePools: NodePool = null;

    /**订单桌对象池 */
    @property({ type: NodePool, tooltip: "订单桌对象池" })
    public orderTablePool: NodePool = null;

    /**特色菜桌子对象池 */
    @property({ type: NodePool, tooltip: "特色菜桌子对象池" })
    public featureTablePool: NodePool = null;

    protected tablePosConf: TablePosConf[] = null;
    protected GameUiView

    @property(cc.Node)
    public bottomBtns: cc.Node = null;
    onLoad() {
        if (cc.winSize.width / cc.winSize.height > 0.57) {
            // App.SceneManager.getCurrScene().getComponent(cc.Canvas).fitHeight = true;
            this.mask.enabled = true;
        }
        App.SoundManager.playBg("bg");
        // CC_DEBUG && Log.trace("BBQTablePools:", cc.loader.getDependsRecursively(this.BBQTablePools.prefab as cc.Prefab));
        // App.TimerManager.setTimeOut(1000, () => { }, this)
        // this.scrollView.node.on(cc.Node.EventType.TOUCH_MOVE, this.scrollviewMove, this);

        this.scrollView.node.on("scroll-began", this.scrollViewStart, this);
        // this.scrollView.node.on(cc.Node.EventType.TOUCH_END, this.scrollviewEnd, this);
        // this.scrollView.node.on(cc.Node.EventType.TOUCH_CANCEL, this.scrollviewEnd, this);
        // this.scrollView.node.on(cc.Node.EventType.TOUCH_START, this.scrollViewStart, this);
    }
    scrollViewStart(event: cc.Event.EventTouch) {
        CC_DEBUG && Log.trace("scrollViewStart");
        this.isNextOrPre = false;
        this.scrollView.node.on("scrolling", this.scrollviewMove, this);
        this.scrollView.node.on("scroll-ended", this.scrollviewEnd, this);
        // this.scrollView.vertical = true;
        // this.scrollView.elastic = true;
    }

    public startHappyTime() {
        this.happyTimeEffect.active = true;
        this.happyTimeEffect.getComponent(cc.Animation).play();
        this.happyTimeEffect.getChildByName("mpx").getComponent(cc.ParticleSystem).resetSystem();
        this.scrollView.vertical = false;
    }
    public stopHappyTime() {

        this.scrollView.vertical = true;
        this.happyTimeEffect.active = false;
        this.happyTimeEffect.getComponent(cc.Animation).stop();
        this.happyTimeEffect.getChildByName("mpx").getComponent(cc.ParticleSystem).stopSystem();
    }

    // public prePaddingY = 300;
    // public nextPaddingY = -300;
    protected isNextOrPre: boolean = false;
    public curId = 0;
    scrollviewMove(event: cc.Event.EventTouch) {
        // if (this.scrollView.isScrolling()) {
        //     let { x, y } = this.scrollView.getScrollOffset();
        //     let curView = this.getView(this.curId);
        //     if (y <= curView.nextY) {//切换到下个场景
        //         this.curId++;
        //         let nexView = this.getView(this.curId);
        //         this.scrollView.node.off("scrolling", this.scrollviewMove, this);
        //         this.isNextOrPre = true;
        //         // this.scrollView.vertical = false;
        //         this.scrollView.scrollToOffset(cc.v2(0, nexView.scrollY), 0.4);
        //         CC_DEBUG && Log.trace("scrollviewMove", "切换到下个场景", nexView.scrollY);
        //     } else if (y >= curView.preY) {//切换回上个场景
        //         // this.scrollView.node.off("scroll-ended", this.scrollviewEnd, this);
        //         this.isNextOrPre = true;
        //         this.scrollView.node.off("scrolling", this.scrollviewMove, this);
        //         // this.scrollView.vertical = false;
        //         this.curId--;
        //         let preView = this.getView(this.curId);
        //         CC_DEBUG && Log.trace("scrollviewMove", "切换回上个场景", preView.scrollY);
        //         this.scrollView.scrollToOffset(cc.v2(0, preView.scrollY), 0.4);
        //     } else {
        //         // this.scrollView.node.off("scrolling", this.scrollviewMove, this);
        //     }
        // }
    }



    scrollviewEnd(event: cc.Event.EventTouch) {
        let { x, y } = this.scrollView.getScrollOffset();
        let curView = this.getView(this.curId);
        if (y <= curView.nextY) {//切换到下个场景
            // this.curId++;
            // let nexView = this.getView(this.curId);
            // this.scrollView.scrollToOffset(cc.v2(0, nexView.scrollY), 0.4);
            // App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.SCORLLE_TO_SCENE, this.curId, this.curId - 1);
            this.scrollToScene(this.curId + 1);
        } else if (y >= curView.preY) {//切换回上个场景
            this.scrollToScene(this.curId - 1);
        } else {
            this.scrollView.scrollToOffset(cc.v2(0, curView.scrollY), 0.4);
            this.scrollView.node.off("scroll-ended", this.scrollviewEnd, this);
            this.scrollView.node.off("scrolling", this.scrollviewMove, this);
        }
    }
    // let view = this.getView(this.world.sceneMgr.nowSceneId);
    // CC_DEBUG && Log.trace("view", this.world.sceneMgr.nowSceneId, view.scrollY);
    // this.curId = this.world.sceneMgr.nowSceneId;
    // this.scrollView.scrollToOffset(cc.v2(0, view.scrollY));
    /**
     * 滚动到某个场景
     * @param id 场景id
     * @param isAni 是否播放滚动动画
     */
    public scrollToScene(id: number, isAni: boolean = true) {
        CC_DEBUG && Log.trace("滚动到场景:", id);
        let preId = this.curId;
        this.curId = id;
        let preView = this.getView(id);
        if (isAni) {
            this.isNextOrPre = true;
            this.scrollView.scrollToOffset(cc.v2(0, preView.scrollY), 0.4);
            this.scrollView.node.off("scroll-ended", this.scrollviewEnd, this);
            this.scrollView.node.off("scrolling", this.scrollviewMove, this);
        } else {
            this.scrollView.scrollToOffset(cc.v2(0, preView.scrollY));
        }
        App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.SCORLLE_TO_SCENE, this.curId, preId);
    }

    public getView(sceneId: number): GameView {
        return this.gameViews[sceneId];
    }


    public initUpGradeBtn() {
        this.upgradeBtns = this.bottomBtns.getComponentsInChildren(UpgradeBtn);
        let initData = [
            {
                name: GameText.getText(lang.home_ui_waiter),
                confKey: 1,
            },
            {
                name: GameText.getText(lang.home_ui_chef),
                confKey: 2,
            },
            {
                name: GameText.getText(lang.home_ui_guest),
                confKey: 3,
            },
        ];
        let arrLen = this.upgradeBtns.length;
        for (let i = 0; i < arrLen; i++) {
            let btn = this.upgradeBtns[i];
            btn.switchTypeIcon.switch(i);
            btn.type = i;
            btn.nameLab.string = initData[i].name;
            btn.showAdBtn.confKey = initData[i].confKey;
            btn.showAdBtn.init();
            // btn.showAdBtn.
        }
        this.updateUpgadeBtn();
    }
    public updateUpgadeBtn() {
        let arrLen = this.upgradeBtns.length;
        for (let i = 0; i < arrLen; i++) {
            let btn = this.upgradeBtns[i];
            let chefMsr = this.world.sceneMgr.nowScene.getUpgradeMsrByType(i);
            // chefMsr.updateZonePreData(1);
            btn.setData(chefMsr.detailInfo as any);
        }
    }



    public reset() {
        this.updateUpgadeBtn();
        this.resetFoodBtn();
    }
    public initUI() {
        let changeY = 400;//当前场景拖动多少距离后,会自动切换到上一个或者下一个场景
        let arrLen = App.ConfigManager.getConfig("SceneDataMsr").dataCnt;
        let height = this.gameViews[0].node.height;
        let maxHeight = arrLen * height;
        let paddingY = height - cc.winSize.height;
        this.gameContent.height = maxHeight;
        maxHeight -= cc.winSize.height;
        maxHeight -= (1664 - cc.winSize.height) * 0.5;//将场景垂直居中,如果想要调整场景居中位置,修改这个就可以
        // cc.OriginalContainer
        this.gameViews[0].scrollY = maxHeight;
        this.gameViews[0].preY = maxHeight + changeY + 50;
        this.gameViews[0].nextY = maxHeight - paddingY - changeY;
        this.gameViews[0].scene = this.world.sceneMgr.allScene[0];
        maxHeight -= height;
        let y = 0;
        for (let i = 1; i < arrLen; i++) {
            let viewNode = cc.instantiate(this.gameViews[0].node);
            this.gameContent.addChild(viewNode);
            y += height;
            viewNode.y = y;
            let view = viewNode.getComponent(GameView);
            view.scene = this.world.sceneMgr.allScene[i];
            view.scrollY = maxHeight;
            view.sceneId = i;
            view.preY = maxHeight + changeY + 50;
            view.nextY = maxHeight - paddingY - changeY;
            maxHeight -= height;
            this.gameViews.push(view);
        }
        for (const view of this.gameViews) {
            view.mainView = this;
        }
    }

    public intFoodBtn() {
        this.foodBtnList.length = 0;
        let foods = this.world.sceneMgr.nowScene.foodMsr.foods;
        for (let i = 0; i < 5; i++) {
            let foodBtnNode = this.foodBtns.children[i];
            let foodBtn = foodBtnNode.getComponent(FoodBtn);
            if (foods[i]) {
                this.foodBtnList.push(foodBtn);
                foodBtn.setData(foods[i]);

                foodBtnNode.active = true;
            } else {
                foodBtnNode.active = false;
            }
            foodBtn.showAdBtn.init();
        }
    }
    public resetFoodBtn() {
        this.foodBtnList.length = 0;
        let foods = this.world.sceneMgr.nowScene.foodMsr.foods;
        for (let i = 0; i < 5; i++) {
            let foodBtnNode = this.foodBtns.children[i];
            if (foods[i]) {
                let foodBtn = foodBtnNode.getComponent(FoodBtn);
                this.foodBtnList.push(foodBtn);
                foodBtn.setData(foods[i]);
                foodBtnNode.active = true;
            } else {
                foodBtnNode.active = false;
            }
        }
    }
    public init() {
        this.initUpGradeBtn();
        this.intFoodBtn();
        App.TimerManager.doFrame(2, 1, () => {//延迟2帧设置滚动位置,否则无法生效
            let view = this.getView(this.world.sceneMgr.nowSceneId);
            CC_DEBUG && Log.trace("view", this.world.sceneMgr.nowSceneId, view.scrollY);
            this.curId = this.world.sceneMgr.nowSceneId;
            this.scrollView.scrollToOffset(cc.v2(0, view.scrollY));
        }, this)
    }
    public updateMoney() {
        for (const iterator of this.foodBtnList) {
            iterator.updateMoney();
        }
        let arrLen = this.upgradeBtns.length;
        for (let i = 0; i < arrLen; i++) {
            let btn = this.upgradeBtns[i];
            let chefMsr = this.world.sceneMgr.nowScene.getUpgradeMsrByType(i);
            chefMsr.checkUpgradeMoneyIsEnough();
            btn.updateBtnBgImg();
        }
    }


    /**
     * 主界面滑动指定位置
     * @param y 主界面滑动到指定位置
     * @param time 滑动时间 不填表示立即滚动到偏移位置
     */
    public jumpToPos(y: number, time?: number) {
        let v2 = this.scrollView.getScrollOffset();
        v2.y = y;
        let maxV2 = this.scrollView.getMaxScrollOffset();
        if (y > maxV2.y) {
            y = maxV2.y;
        }
        if (y < 0) {
            y = 0;
        }
        this.scrollView.vertical = true;
        this.scrollView.scrollToOffset(v2, time);
        this.scrollView.vertical = false;
    }

    /** 
     * 主界面滑动到底部
     * @param time 滑动时间 不填表示立即滚动到偏移位置
     */
    public jumpToBottom(time?: number) {
        let maxV2 = this.scrollView.getMaxScrollOffset();
        this.scrollView.scrollToOffset(maxV2, time);
    }
}