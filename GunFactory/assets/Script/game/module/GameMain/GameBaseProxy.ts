import BaseProxy from "../../../core/mvc/proxy/BaseProxy";
import WorldScene from "./object/scene/WorldScene";
import BaseController from "../../../core/mvc/controller/BaseController";
import App from "../../../core/App";
import { MoneyType } from "../Define";

export abstract class GameBaseProxy extends BaseProxy {
	protected worldScene: WorldScene;
	public constructor($controller: BaseController) {
		super($controller);
		// this.initEvent();
	}
	public setWorldScene(worldScene: WorldScene) {
		this.worldScene = worldScene;
	}
	public initEvent() {

	}
	public clearEvent() {
		App.MessageCenter.removeAll(this);
	}
	public getCurMineId() {
		return this.worldScene.sceneMgr.nowSceneId;
	}
	public getNowMoney() {
		return this.worldScene.sceneMgr.nowScene.getNowMoney();
	}

	public checkMoneyEnough(cmpMoney: MyBigLong): boolean {
		return this.worldScene.sceneMgr.nowScene.cmpNowMoney(cmpMoney) <= 0;
	}
	/**
	 * 获取超级现金
	 */
	public getSuperCash() {
		// if (this.worldScene.superCash) {
		// 	return this.worldScene.superCash;
		// } else {
		// 	return 0;
		// }
	}
	/**
	 * 获取闲置现金
	 */
	public getIdle() {
		return this.worldScene.sceneMgr.nowScene.idleMoneyRate;
	}
	public getLevel(index?: number) {
		let zone = this.worldScene.sceneMgr.nowScene.getOperatorZone(index);
		if (zone) {
			return zone.attrObj.level;
		} else {
			return null;
		}
	}

}
