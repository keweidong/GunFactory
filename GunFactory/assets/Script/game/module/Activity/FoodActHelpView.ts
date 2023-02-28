import BaseView from "../../../core/mvc/view/BaseView";


import NodePoolMsr from "../NodePoolMsr";
import { AdData } from "../../config/AdDataManager";
import { AdType, AdShareStatus } from "../AD/ADController";
import { AdState } from "../AD/ADManageBase";
import List from "../../../core/component/List";

import { UI } from "../../../core/utils/Image";
import App from "../../../core/App";
import { BG_TYPE } from "../../../core/mvc/view/IBaseView";



const { ccclass, property } = cc._decorator;

@ccclass
export default class RankHelpView extends BaseView {
    public bgType: BG_TYPE = BG_TYPE.GRAY;
    open() {
        super.open();
    }

    init() {

    }

    initUI() {
        super.initUI();
        this.init();
    }
}