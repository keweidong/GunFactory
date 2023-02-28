import { ConfigManager } from "../game/ConfigManager";
import { GameDataMsr } from "../game/GameDataMsr";
import NodePoolMsr from "../game/module/NodePoolMsr";
import ControllerManager from "./mvc/ControllerManager";
import ViewManager from "./mvc/ViewManager";
import ResManager from "./res/ResManager";
import SaveManage from "./SaveManage";
import { SceneManager } from "./SceneManager";
import SoundManager from "./sound/SoundManager";
import { DebugUtils } from "./utils/DebugUtils";
import { EasyLoading } from "./utils/EasyLoading";
import { MathUtils } from "./utils/MathUtils";
import MessageCenter from "./utils/MessageCenter";
import { TimerManager } from "./utils/TimeManager";
export default class App {
    public static isInit: boolean = false;
    public static init() {
        if (this.isInit) {
            return;
        }
        this.isInit = true;
        this.ObjectPool = new ObjectPool();
        this.NotificationCenter = new MessageCenter(1);
        this.MessageCenter = new MessageCenter(1);
        this.DateUtils = new DateUtils();
        this.CommonUtils = new CommonUtils();
        this.SaveManage = new SaveManage();
        this.MathUtils = new MathUtils();
        this.RandomUtils = new RandomUtils();
        this.Http = new Http();
        this.TimerManager = new TimerManager();
        this.SoundManager = new SoundManager();
        this.ResManager = new ResManager();

        this.ControllerManager = new ControllerManager();
        this.ViewManager = new ViewManager();
        this.ConfigManager = new ConfigManager();
        this.GameDataMsr = new GameDataMsr();
        this.SceneManager = new SceneManager();
        this.StringUtil = new StringUtil();
        this.Bass64 = new Base64();
        this.DebugUtils = new DebugUtils();

    }
    public static EasyLoading: EasyLoading = null;
    public static DebugUtils: DebugUtils = null;
    public static ObjectPool: ObjectPool = null;
    public static SaveManage: SaveManage = null;
    public static CommonUtils: CommonUtils = null;
    public static DateUtils: DateUtils = null;
    public static MathUtils: MathUtils = null;
    public static RandomUtils: RandomUtils = null;
    public static Http: Http = null;
    public static TimerManager: TimerManager = null;
    public static NotificationCenter: MessageCenter = null;
    public static MessageCenter: MessageCenter = null;
    public static ResManager: ResManager = null;
    public static ControllerManager: ControllerManager = null;
    /**声音管理器 */
    public static SoundManager: SoundManager = null;
    public static ViewManager: ViewManager = null;
    /**配置文件管理器*/
    public static ConfigManager: ConfigManager = null;
    public static GameDataMsr: GameDataMsr = null;
    public static SceneManager: SceneManager = null;
    public static NodePoolMsr: NodePoolMsr = null;
    public static StringUtil: StringUtil = null;
    public static Bass64: Base64 = null;


}
window["App"] = App;//方便原生端调用
// if (CC_EDITOR) {
//     App.init();
// }