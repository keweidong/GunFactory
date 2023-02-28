import App from '../../../core/App';
import BaseController from '../../../core/mvc/controller/BaseController';
import Toast from '../../../core/utils/Toast';
import { ControllerConst } from '../../consts/ControllerConst';
import { NotificationConst } from '../../consts/NotificationConst';
import { Platform } from '../../platform/Platform';
import { GameConst } from '../GameMain/GameConst';
import WorldScene from '../GameMain/object/scene/WorldScene';
import { GameUIConst } from '../GameUI/GameUIConst';
import { GameRecorderConst } from './GameRecorderConst';
import { CostType } from '../bag/BagController';

export default class GameRecorderController extends BaseController {
    public world: WorldScene;
    protected state: boolean = false;

    /**记录录屏的时间 */
    protected startRecordertime: number = 0;

    /**录屏文件的存放路径 */
    protected recorder_path: any = null;

    /**0:通常，1：按钮录屏，2欢乐时光录屏，3明星录屏 */
    public static lupingType: number = 0;


    initModuleEvent() {
        this.registerFunc(GameRecorderConst.START, this.onStart, this);
        this.registerFunc(GameRecorderConst.STOP, this.stopRecorder, this);
        this.registerFunc(GameRecorderConst.ShareRecorder, this.shareRecorder, this);
        this.registerFunc(GameRecorderConst.rewardRecorder, this.Add_SUPER_CASH, this);
    }
    initSelfEvent() {

    }
    protected initNotificationEvent() {
        // let notificationCenter = App.NotificationCenter;
        // notificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.initGame, this);

    }
    public constructor() {
        super();

        App.NotificationCenter.addListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
    }

    init() {
        this.world = App.ControllerManager.applyFunc(ControllerConst.Game, GameConst.GET_WORLD_SCENE);
        App.NotificationCenter.removeListener(NotificationConst.INIT_GAME_FINISH, this.init, this);
        this.initModuleEvent();
        this.initNotificationEvent();
    }
    initGame() {

    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    /**
	 * 开启录屏
	 */
    protected onStart() {
        if (cc.sys.platform == cc.sys.TOUTIAO_GAME) {
            Platform.instance.startGameRecorder();
            App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.RecorderOpen);
            this.state = true;
            this.startRecordertime = 0;
            App.TimerManager.doTimer(1000, 0, this.recorderUpdate, this);
        }
    }

    /**录屏时间的update */
    public recorderUpdate() {
        Log.trace("已录制", this.startRecordertime);
        Log.trace("GameRecorderController.lupingType>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + GameRecorderController.lupingType)
        if (this.startRecordertime < 60) {
            this.startRecordertime += 1;
        } else {
            Toast.launch("录屏已超过时长,自动停止");
            this.stopRecorder();
        }
    }
    
    /**录屏停止 */
    public stopRecorder() {
        if (cc.sys.platform == cc.sys.TOUTIAO_GAME) {
            if (this.startRecordertime <= 3) {
                Toast.launch("录制时间太短啦....");
            } else {
                Platform.instance.stopGameRecorder();
                App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.RecorderClose);
                this.state = false;
                this.startRecordertime = 0;
                App.TimerManager.remove(this.recorderUpdate, this);
            }
        }
    }
    /**分享录屏 */
    shareRecorder(isProtogenesis?:number) {
        Platform.instance.shareRecorder(isProtogenesis);
    }

    /**分享录屏成功加5钻石 */
    Add_SUPER_CASH() {
        this.world.superCash += 20;
        // App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, money);
        App.NotificationCenter.dispatch(NotificationConst.UPDATE_SUPER_CASH, this.world.superCash, 20);
        App.ControllerManager.applyFunc(ControllerConst.GameUI, GameUIConst.PLAY_JB_ANI, CostType.diamond);
    }

}
