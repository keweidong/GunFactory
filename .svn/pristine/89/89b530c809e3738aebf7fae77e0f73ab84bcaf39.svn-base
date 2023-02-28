import App from "../../../core/App";
import BaseController from "../../../core/mvc/controller/BaseController";
import { IBaseView } from "../../../core/mvc/view/IBaseView";
// import { OpenConst, OpenTypeConst } from "./SystemOpenConst";
import { ControllerConst } from "../../consts/ControllerConst";
// import { ControllerConst } from "../../consts/ControllerConst";
import { NotificationConst } from "../../consts/NotificationConst";
import { GameConst } from "../GameMain/GameConst";
import WorldScene from "../GameMain/object/scene/WorldScene";
import FriendShareView from "./FriendShareView";





export default class FriendShareController extends BaseController {
	public worldScene: WorldScene;

	public fiensSharview:FriendShareView;

	public constructor() {
		super();
		// App.ViewManager.register(ViewConst.FriendShareView, {
		// 	prefabName: "FriendShareView",
		// 	parent: LayerManager.UI_Popup,
		// 	controller: this
		// });
		// this.setModel(new FriendCircleModel(this));
		let notificationCenter = App.NotificationCenter;

		notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this, 100);

	}
	public initGame() {
		this.worldScene = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
		App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);

		// this._model.init();
		this.initModuleEvent();
		this.initNotificationEvent();

		if (cc.sys.platform === cc.sys.QQ_GAME) {
			let openDataContext = qq.getOpenDataContext()
			openDataContext.postMessage({
				command: "getPf",
			});
		}
	}

	/**
	 *注册模块消息
	*/
	protected initModuleEvent() {
		// this.registerFunc(FriendCircleConst.OpenView, this.openFriendCircle, this);
		// this.registerFunc(FriendCircleConst.OpenTick, this.openTick, this);
		// this.registerFunc(FriendCircleConst.CreateFriend, this.guideFriendCircle, this);
	}

	protected initNotificationEvent() {
		let notificationCenter = App.NotificationCenter;
		// notificationCenter.addListener(NotificationConst.SYS_OPEN, this.checkOpen, this);
	}

	protected nextTick: number = null;
	public tick() {

	}

	onOpenView(view: IBaseView) {
		switch (view.viewId) {
		}
	}

}