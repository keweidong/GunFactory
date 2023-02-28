import BaseController from "../controller/BaseController";
import ViewAni from "../../../game/component/ViewAni";

/**
 * Created by yangsong on 2014/11/24.
 * View基类接口
 */
export interface IBaseView extends cc.Component {
    /**
     * 面板的id
     */
    // id?: number;
    /**
     * 背景
     */
    bgType: BG_TYPE;
    bgImg?: cc.Node;
    viewAni: ViewAni;
    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    isInit(): boolean;

    /**
     * 面板是否显示
     * @return
     *
     */
    isShow(): boolean;

    /**
     * 添加到父级
     */
    addToParent(): void;

    /**
     * 从父级移除
     */
    removeFromParent(): void;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    initUI(): void;

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    initData(): void;

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    open(...param: any[]): void;
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    close(...param: any[]): void;

    /**
     * 销毁
     */
    destroyView(): void;

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    applyFunc(key: any, ...param: any[]): any;
    myParent: string;
    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any;

    /**
     * 设置是否隐藏
     * @param value
     */
    setVisible(value: boolean): void;

    /**
     * 分模块加载资源
     */
    loadResource(loadComplete: Function, initComplete: Function): void;
    /**
     * 面板id
     */
    viewId: number;
    /**
     * 这个面板是否全屏大小
     */
    isFullScreen(): boolean;
    controller: BaseController;
}

export const enum BG_TYPE {
    /**
     * 没有背景
     */
    NONE,
    /**
     * 灰色透明的背景
     */
    GRAY,
    /**
     * 背景图片1
     */
    IMG1,
    /**
     * 背景图片2
     */
    IMG2,
    /**
     * 透明的背景,用于触发点击关闭事件
     */
    LUCENCY

}