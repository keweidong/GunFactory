
const { ccclass, property, executeInEditMode } = cc._decorator;
let ImgList = cc.Class({
    name: "ImgList",
    properties: {
        imgs: [cc.SpriteFrame],
        names: [cc.String],
        imgPaths: [cc.String],
    }
})
@ccclass
@executeInEditMode
export default class Reslist extends cc.Component {
    /**预加载列表 */
    @property({ type: [cc.Asset], tooltip: "资源预加载列表" })
    public preloadList: cc.Asset[] = [];
    @property([ImgList])
    public cellImgs: {
        imgs: cc.SpriteFrame[];
        imgPaths: string[];
        names: string[];
    }[] = [];
    @property(cc.SpriteFrame)
    public bgBottomImg: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    public bgImg: cc.SpriteFrame = null;

    public isLoad: boolean = false;



    public loadPrelist() {
        if (this.isLoad) {
            return Promise.resolve();
        }
        return new Promise((resolve: Function, reject: Function) => {
            let list = this.getPrelistList();
            if (list.length) {
                cc.loader.loadResArray(list, cc.SpriteFrame, (error, resources: cc.SpriteFrame[]) => {
                    if (error) {
                        Log.error("加载出错")
                        Log.trace(error);
                    }
                    for (const iterator of this.cellImgs) {
                        let arrLen = iterator.imgPaths.length;
                        for (let i = 0; i < arrLen; i++) {
                            iterator.imgs[i] = cc.loader.getRes(iterator.imgPaths[i], cc.SpriteFrame);
                        }
                    }
                    this.isLoad = true;
                    resolve();
                })
            } else {
                Log.error("加载的资源列表长度为空,重新加载资源");
                for (const iterator of this.cellImgs) {
                    let arrLen = iterator.imgPaths.length;
                    for (let i = 0; i < arrLen; i++) {
                        iterator.imgs[i] = cc.loader.getRes(iterator.imgPaths[i], cc.SpriteFrame);
                    }
                }
                resolve();
            }
        })
    }
    /**资源列表 */
    public getPrelistList() {
        let list = [];
        for (const iterator of this.cellImgs) {
            let arrLen = iterator.imgPaths.length;
            for (let i = 0; i < arrLen; i++) {
                if (list.indexOf(iterator.imgPaths[i]) === -1) {
                    if (!cc.loader.getRes(iterator.imgPaths[i], cc.SpriteFrame)) {
                        list.push(iterator.imgPaths[i]);
                    }
                }
            }
        }
        return list;
    }

    // onLoad() {
    //     if (this.cellImgs) {
    //         for (const iterator of this.cellImgs) {
    //             if (!iterator.imgPaths) {
    //                 iterator.imgPaths = [];
    //             }
    //             let arrLen = iterator.imgs.length;
    //             for (let i = 0; i < arrLen; i++) {
    //                 iterator.imgPaths[i] = "Texture/game/street1/build/" + iterator.imgs[i]["_name"];
    //             }
    //             iterator.imgs = [];
    //         }
    //     }
    // }
}