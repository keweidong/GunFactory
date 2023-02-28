import App from '../../../core/App';
import { ControllerConst } from '../../consts/ControllerConst';
import { ExploreConst } from './ExploreConst';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;



/**
 * 动画帧事件
 */
@ccclass
export default class ExploreAni extends cc.Component {

    private isSelect: boolean = null;

    setIsSelect(isSelect: boolean) {
        this.isSelect = isSelect;
    }


    getAwardShowNode() {
        // Log.trace("点击翻图>>>>>")
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.OpenExploreitemAni, this.isSelect);
    }

    overAwardHideNode() {

    }

    /**
     * 打开爆炸
     * card2动画帧事件
     */
    openBombAni() {
        Log.trace("播放爆炸特效")
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.ShowBomb, this.isSelect);
    }


    /**爆炸 */
    getBomoOver() {
        Log.trace("爆炸特效结束")
        App.ControllerManager.applyFunc(ControllerConst.Explore, ExploreConst.ChoseBomb, this.isSelect);
    }


}