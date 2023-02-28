const { ccclass, property, menu } = cc._decorator;
/**
 * 参考白鹭eui的Image写的一个组件
 */
export namespace UI {
    @ccclass
    @menu("tool/Image")
    export class Image extends cc.Sprite {
        @property({
            type: cc.SpriteFrame,
            tooltip: "资源路径"
        })
        protected _source: any = null;
        protected sourceChanged: boolean = false;

        // public set spriteFrame(value) {
        //     Log.trace("value:", super.spriteFrame )
        //     // super.spriteFrame = value;
        // }

        @property({
            type: cc.SpriteFrame,
            tooltip: "资源路径"
        })
        public set source(value: string | cc.SpriteFrame) {
            if (value === "") {
                this._source = value;
                this.spriteFrame = null;
                return;
            }
            if (value == this._source) {
                return;
            }
            this._source = value;
            if (this.node && this.node.activeInHierarchy) {
                this.parseSource();
            }
            else {
                this.sourceChanged = true;
            }
        }
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
        public get source() {
            return this._source;
        }
        private $setTexture(value: cc.SpriteFrame) {
            if (value == this.spriteFrame) {
                return false;
            }
            this.spriteFrame = value;
            this.sourceChanged = false;
        }
        protected static cacheList: { [url: string]: cc.SpriteFrame } = {};
        /**
       * @private
       * 解析source
       */
        private parseSource(): void {
            this.sourceChanged = false;
            let source = this._source;
            if (source && typeof source == "string") {
                let spriteFrame: cc.SpriteFrame = Image.cacheList[source] || cc.loader.getRes(source, cc.SpriteFrame);
                if (spriteFrame) {
                    // Log.trace("source:", source, spriteFrame.textureLoaded)
                    this.$setTexture(spriteFrame);
                    // if (spriteFrame instanceof cc.SpriteFrame)
                    // else
                    //     this.$setTexture(new cc.SpriteFrame(spriteFrame))
                } else {
                    if (source.indexOf("http") == -1) {
                        cc.loader.loadRes(source, cc.SpriteFrame, (error: Error, resource: any) => {
                            if (source !== this._source)
                                return;
                            if (error) {
                                Log.error(`图片不存在:${source}`, error);
                            } else {
                                this.$setTexture(resource);
                            }
                        })
                    }
                    else {
                        let reg = /(\.jpg)$/;
                        let type = 'png';
                        if (reg.test(source)) {
                            type = 'jpg';
                        }
                        cc.loader.load({ url: source, type: type }, (err, texture) => {
                            if (source !== this._source) {
                                return;
                            }
                            if (err) {
                                Log.error(`图片不存在:${source}`, err);
                            }
                            else {
                                Image.cacheList[source] = new cc.SpriteFrame(texture);
                                this.$setTexture(Image.cacheList[source]);
                            }
                        })
                    }
                }
            }
            else {
                this.$setTexture(<cc.SpriteFrame>source);
            }
        }
    }
}