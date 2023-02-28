const { ccclass, property, menu, requireComponent, executeInEditMode } = cc._decorator;
/**
 * 用于切换精灵纹理对象的组件
 */
@ccclass
@menu("UI/SwitchFrame")
@requireComponent(cc.Sprite)
@executeInEditMode
export default class SwitchFrame extends cc.Component {
    @property({ type: cc.SpriteFrame, tooltip: "可切换的纹理列表" })
    protected fames: cc.SpriteFrame[] = [];

    // protected fameIndex: number = 0;

    @property
    protected _frameIndex: number = 0;
    @property()
    public set frameIndex(v: number) {
        if (v !== this._frameIndex) {
            this.switch(v);
        }
    }
    public get frameIndex(): number {
        return this._frameIndex;
    }
    @property(cc.Sprite)
    protected sprite: cc.Sprite = null;

    // @property({ editorOnly: true })
    // _test: number = 0;
    // @property({})
    // public set test(v: number) {
    //     this._test = v;
    //     this.sprite = this.getComponent(cc.Sprite);
    //     this.switch(v);
    // }
    // public get test() {
    //     return this._test;
    // }

    onLoad() {
        // if (CC_EDITOR) {
        // }
        if (!this.sprite) {
            this.sprite = this.getComponent(cc.Sprite);
        }
    }



    /**
     * 切换渲染纹理
     * @param index 序号 
     */
    public switch(index: number) {
        if (this.sprite) {
            this.sprite.spriteFrame = this.fames[index];
            this._frameIndex = index;
        }
    }
}