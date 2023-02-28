import { GameText } from "./GameText";
function debounce(func: Function, wait: number, immediate?: boolean) {
    var timeout;
    return function () {
        GameText.init();
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
// const LangEnum = cc.Enum({});
const { ccclass, property, menu, executeInEditMode } = cc._decorator;
@ccclass
@menu("UI/LocalizedLabel")
@executeInEditMode()
export default class LocalizedLabel extends cc.Component {
    protected label: cc.Label = null;
    protected _debouncedUpdateLabel: Function = null;
    @property()
    protected _dataID: string = "";
    @property({
        tooltip: "字符串对应的key值"
    })
    public get dataID(): string {
        return this._dataID;
    }
    public set dataID(val: string) {
        if (this._dataID !== val) {
            this._dataID = val;
            if (CC_EDITOR) {
                this._debouncedUpdateLabel();
            } else {
                this.updateLabel();
            }
        }
    }

    onLoad() {
        if (CC_EDITOR) {
            this._debouncedUpdateLabel = debounce(this.updateLabel, 200);
        }
        this.fetchRender();
    }

    fetchRender() {
        let label = this.getComponent(cc.Label);
        if (label) {
            this.label = label;
            this.updateLabel();
            return;
        }
    }

    updateLabel() {
        if (!this.label) {
            cc.error('Failed to update localized label, label component is invalid!');
            return;
        }
        let localizedString = GameText.getTextByStr(this.dataID);
        if (localizedString) {
            this.label.string = localizedString;
        }
    }
}
// if (CC_EDITOR) {

    // cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {
    //     let list = [];
    //     for (const key in lang) {
    //         let value = parseInt(key);
    //         if (!isNaN(value)) {
    //             cc.log("key", value, lang[key])
    //             list.push({
    //                 name: lang[key],
    //                 value: value
    //             })
    //         }
    //     }
    //     cc.Class.Attr.setClassAttr(LocalizedLabel, 'strKey', 'enumList', list);

    // })
// }