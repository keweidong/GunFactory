declare namespace cc {
    export class loader extends Pipeline {
        static onProgress: Function;
    }
    export function tween(target?): Tween;
    interface RawAsset {
        _uuid: string;
        _owner: cc.Component;
    }
    interface Node {
        _touchListener;
        _hitTest(pos: cc.Vec2, node: cc.Node);
    }
    interface Mask {
        _createGraphics();
        _graphics: cc.Graphics;
    }

    interface Button {
        _onTouchBegan(event);
        _onTouchMove(event);
        _onTouchEnded(event);
        /**
         * 是否不播放点击声音
         */
        isNotPlayClickBtn: boolean;
        /**
         * 是否未开启
         */
        isNotOpen: boolean;
    }
    /** !#en Material Asset.
	!#zh 材质资源类。 */
    interface Material extends Asset {
        effectAsset: Asset;
        define(name: string, val: any): void;
        setProperty(name: string, val: any);

    }
    export class EffectAsset extends Asset {
    }
    export class Class {
        /**
         *
         */
        // constructor(d);
        static Attr
    }
    export class Enum {
        /**
         *
         */
        // constructor(d);
        static getList(enumDef)
    }
    export namespace _widgetManager {
        /**
         * 刷新节点布局
         * @param node 
         */
        export function refreshWidgetOnResized(node: cc.Node);
    }

}
namespace js {
    /**
     * !#en
     * A simple wrapper of `Object.create(null)` which ensures the return object have no prototype (and thus no inherited members). So we can skip `hasOwnProperty` calls on property lookups. It is a worthwhile optimization than the `{}` literal when `hasOwnProperty` calls are necessary.
     * !#zh
     * 该方法是对 `Object.create(null)` 的简单封装。`Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断。在需要频繁判断 `hasOwnProperty` 时，使用这个方法性能会比 `{}` 更高。
     *
     * @method createMap
     * @param {Boolean} [forceDictMode=false] - Apply the delete operator to newly created map object. This causes V8 to put the object in "dictionary mode" and disables creation of hidden classes which are very expensive for objects that are constantly changing shape.
     * @return {Object}
     */
    export function createMap();
}
declare let require;
namespace Editor {
    export let Utils;
    export let assetdb;
}

/**微信平台 start*/
declare class WXDownloader {
    REMOTE_SERVER_ROOT: string;
    cacheDir: string;
    getCachedFileList(): { [key: string]: number };
}
declare const wxDownloader: WXDownloader;

interface FsUtils {
    downloadFile(remoteUrl: string, filePath: string, callback?: (error, path: string) => void);
    readJsonSync(path: string);
    exists(filePath: string, callback: (isExists: boolean) => void);
}
//2.1.3版本用这个
declare let wxFsUtils:FsUtils;
//2.2.2版本用这个
declare let fsUtils:FsUtils;
/**微信平台 end*/

