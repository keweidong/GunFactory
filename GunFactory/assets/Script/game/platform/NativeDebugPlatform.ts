import NativePlatform from "./NativePlatform";

/** GM包专用平台类 安卓Android */
export default class NativeDebugPlatform extends NativePlatform {
    /**
     *
     */
    constructor() {
        super();
    }
    public init(){
        super.init();
        Log.trace("平台为2---------", cc.sys.platform);
        // cc.debug.setDisplayStats(true);
        /** 测试服地址 */
        // App.ConfigManager.gameConf.serverInfos.interface = "https://skewer.gzqidong.cn/App/Interface";
    }
}