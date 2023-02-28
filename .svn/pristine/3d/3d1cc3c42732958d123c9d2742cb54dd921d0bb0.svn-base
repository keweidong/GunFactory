import { IMyComponent } from "./IMyComponent"; import MyBehaviorTree from "../../../../../../../core/behavior/BehaviorTree"; import GameObject from "../GameObject"; import Customer from "../Customer"; import { Platform } from "../../../../../../platform/Platform"; import App from "../../../../../../../core/App"; import { Actions } from "../../../../../../../core/behavior/Actions";


let test = true;
const { ccclass, property } = cc._decorator;
@ccclass
export default class AiComponent extends cc.Component implements IMyComponent {
    @property({ tooltip: "行为树数据", type: cc.JsonAsset })
    protected data: cc.JsonAsset = null;
    protected tree: MyBehaviorTree = null;
    protected blackboard: b3.Blackboard = null;
    public entity: GameObject = null;
    public nextTime = -1;
    public curTick = 0;
    onLoad() {


        // this.enabled = false;
    }


    public loadRemote(url: string): Promise<cc.JsonAsset> {
        return new Promise((resolve: Function, reject: Function) => {
            cc.loader.load({ url: "https://wxclient.gzqidong.cn/gameConf/CatCafe/" + versionInfo.packVersion + "/" + url + ".json?v=" + Date.now(), type: 'text' }, function (err, texture) {
                if (err) {
                    Log.error("loadRemote:", err)

                    reject(err);
                } else {
                    resolve(JSON.parse(texture))
                }
            });
        })
    }

    // async loadLocalAiFile() {
    //     var conf: cc.JsonAsset = await App.ResManager.getResAsync(`BehaviorData/${this.entity.conf.aiFile}`);
    //     this.data = conf;
    // }

    async loadAiFile() {
        if (this.entity.aiFile !== this.entity.conf.aiFile) {
            this.tree = null;
            this.entity.aiFile = this.entity.conf.aiFile;
        }
        if (this.tree) {
            return;
        }
        // let aiFile = this.entity.aiFile;
        if (this.entity.aiFile) {
            // if (Platform.instance.isGetRemoteRes()) {
            //     var conf: cc.JsonAsset = new cc.JsonAsset();
            //     conf.json = await this.loadRemote(`${aiFile}`);
            //     this.data = conf;
            // } else {
            var conf: cc.JsonAsset = await App.ResManager.getResAsync(`BehaviorData/${this.entity.aiFile}`);
            this.data = conf;
            // }
        }
        if (this.data) {
            this.tree = new MyBehaviorTree();
            // if (test) {
            this.tree.isDebug = this.entity.isDebug;
            //     test = false;
            //     this.tree.isDebug = true;
            // }
            this.tree.load(this.data.json, Actions);
        }
        if (this.enabled) {
            this.addRoutineObj();
        }
    }

    init() {
        this.loadAiFile();
        this.blackboard = new b3.Blackboard();
        this.enabled = true;
    }

    addRoutineObj() {
        if (CC_PREVIEW) {
            if (this.entity && this.entity.roleMsr) {
                this.entity.roleMsr.addRoutineObj(this);
            }
        } else {
            this.entity.roleMsr.addRoutineObj(this);
        }
    }

    onEnable() {
        if (this.tree) {
            this.addRoutineObj();
        }
    }
    onDisable() {

        if (CC_PREVIEW) {
            if (this.entity && this.entity.roleMsr) {
                this.entity.roleMsr.removeRoutineObj(this);
            }
        } else {
            this.entity.roleMsr.removeRoutineObj(this);
        }
        // this.tree = null;
        if (this.tree)
            this.tree.tick(this.entity, this.blackboard);
    }

    exit() {
        this.enabled = false;
    }
    routine(tick: number) {
        this.curTick += tick;
        if (this.curTick < this.nextTime) {
            return;
        }
        this.nextTime = this.curTick + 1000 / 12;
        // this.entity.
        this.tree.tick(this.entity, this.blackboard);
    }
}