const { ccclass, property, menu, requireComponent } = cc._decorator;
/**
 * 参考白鹭eui的Image写的一个组件
 */
// export namespace UI {

@ccclass
@menu("tool/DagonBonesCompent")
// @requireComponent(dragonBones.ArmatureDisplay)
export class DagonBonesCompent extends dragonBones.ArmatureDisplay {
    // @property({
    //     type: dragonBones.DragonBonesAtlasAsset,
    //     tooltip: "骨骼数据所需的 Atlas Texture 数据"
    // })
    protected _atlasAsset: any = null;
    protected _curAni: string = "Idle";
    // dragonAtlasAsset: DragonBonesAtlasAsset;

    public set curAni(ani: string) {
        this._curAni = ani;
    }
    public set atlasAsset(value: string | dragonBones.DragonBonesAtlasAsset) {
        if (value === "") {
            this._atlasAsset = value;
            this.playAnimation(this._curAni, 0);
            return;
        }

        if (value === this._atlasAsset) {
            this.playAnimation(this._curAni, 0);
            return;
        }

        this._atlasAsset = value;
        if (this.node && this.node.activeInHierarchy) {
            this.parseSource();
        }
        else {
            this.sourceChanged = true;
        }
    }

    protected sourceChanged: boolean = false;


    onLoad() {
        if (this.sourceChanged) {
            this.parseSource();
        }
    }
    onEnable() {
        super.onEnable();
        if (this.sourceChanged) {
            this.parseSource();
        }
    }

    /**
   * @private
   * 解析source
   */
    private parseSource(): void {
        this.sourceChanged = false;
        let atlasAsset = this._atlasAsset;
        if (atlasAsset && typeof atlasAsset == "string") {
            ////////////////////////////////////
            // 2.2.2版本bug 导致渲染组件为null 
            this.enabled = false;
            this.enabled = true;
            this.enabled = false;
            ////////////////////////////////////
            let url = atlasAsset;
            let asset = cc.loader.getRes(url, dragonBones.DragonBonesAtlasAsset);
            if (asset) {
                // this.enabled = false;
                this.dragonAtlasAsset = asset;
                this.playAnimation(this._curAni, 0)
                this.enabled = true;
            }
            else {
                cc.loader.loadRes(url, dragonBones.DragonBonesAtlasAsset, (error: Error, atlasJson: any) => {
                    Log.trace("加载资源图片完成：", url)
                    // this.enabled = false;
                    if (error) {
                        Log.trace("DagonBonesCompent error", error);
                    }
                    else {
                        this.dragonAtlasAsset = atlasJson;
                        this.playAnimation(this._curAni, 0);
                    }
                    this.enabled = true;

                });
            }

        }
        else {
            this.dragonAtlasAsset = atlasAsset;
            this.playAnimation(this._curAni, 0);
        }
    }
}
// }