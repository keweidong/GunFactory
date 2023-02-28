import List from '../../../core/component/List';
import BaseView from '../../../core/mvc/view/BaseView';
import FriendCircleItem from './FriendCircleItem';
import { ControllerConst } from '../../consts/ControllerConst';
import { HappyConst } from '../Happy/HappyConst';
import App from '../../../core/App';
import { Platform } from '../../platform/Platform';
import { ViewConst } from '../../consts/ViewConst';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendCircleView extends BaseView {

    @property(List)
    protected list: List = null;

    @property(cc.Prefab)
    protected item: cc.Prefab = null;

    @property(cc.ScrollView)
    protected scrollview: cc.ScrollView = null;

    @property(cc.Node)
    protected ShotBtn: cc.Node = null;

    protected datas: FriendCircleShowData[] = null;

    // bgType: BG_TYPE = BG_TYPE.GRAY;
    initUI() {
        super.initUI();
        // this.setIsAutoScale(true);
    }

    open(data: FriendCircleShowData) {
        super.open();
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            this.ShotBtn.active = true;
        }
    }
    onListRender(item: cc.Node, idx: number) {
        let friendCircleItem = item.getComponent(FriendCircleItem);
        friendCircleItem.setData(idx, this.datas[idx]);

        let layout = item.getComponent(cc.Layout);
        layout.updateLayout();
        // item.height = item.height;
    }

    public setData(datas: FriendCircleShowData[]) {
        this.datas = datas;
        this.list.numItems = datas.length;
        // for(let i = 0; i < datas.length; i++){
        //     let item = cc.instantiate(this.item);
        //     let friendCircleItem = item.getComponent(FriendCircleItem)
        //     friendCircleItem.setData(i, datas[i])
        //     this.scrollview.content.addChild(item);
        // }
    }
    close() {
        super.close();
        // this.scrollview.content.removeAllChildren()
        // this.ShotBtn.active = false;
    }

    public Frame() {
        if (cc.sys.platform == cc.sys.QQ_GAME) {
            App.ViewManager.open(ViewConst.ShotView, false);
        }
    }

}
