// TypeScript file
declare namespace qg {
    /**
     * 获取全局唯一的文件管理器
     */
    function getFileSystemManager(): FileSystemManager;

    interface FileSystemManager {
        /**
         * 判断文件/目录是否存在
         */
        access(object: { path: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.access 的同步版本
         */
        //accessSync(path: string): void;
        /**
         * 复制文件
         */
        copyFile(object: { srcPath: string, destPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.copyFile 的同步版本
         */
        //copyFileSync(srcPath: string, destPath: string): void;
        /**
         * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
         */
        //getFileInfo(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 获取该小程序下已保存的本地缓存文件列表
         */
        //getSavedFileList(object: { success?: (res: FileItem[]) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
        /**
         * 创建目录
         */
        //mkdir(object: { dirPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.mkdir 的同步版本
         */
        //mkdirSync(dirPath: string): void;
        /**
         * 删除该小程序下已保存的本地缓存文件
         */
        //removeSavedFile(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 读取本地文件内容
         */
        //readFile(object: { filePath: string, encoding: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 重命名文件，可以把文件从 oldPath 移动到 newPath
         */
        //rename(object: { oldPath: string, newPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 删除目录
         */
        //rmdir(object: { dirPath: Object, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 读取目录内文件列表
         */
        //readdir(object: { dirPath: string, success: (res: string[]) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.readdir 的同步版本
         */
        //readdirSync(dirPath: string): string[];
        /**
         * FileSystemManager.rename 的同步版本
         */
        //renameSync(oldPath: string, newPath: string): void;
        /**
         * FileSystemManager.rmdir 的同步版本
         */
        //rmdirSync(dirPath: {}): void;
        /**
         * FileSystemManager.readFile 的同步版本
         */
        //readFileSync(filePath: string, encoding: string): string[];
        /**
         * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
         */
        //saveFile(object: { tempFilePath: string, filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 获取文件 Stats 对象
         */

    }

    // interface Stats {
    //     /**
    //      * 判断当前文件是否一个目录
    //      */
    //     isDirectory(): boolean;
    //     /**
    //      * 判断当前文件是否一个普通文件
    //      */
    //     isFile(): boolean;
    // }

    // interface DownloadTask {
    //     abort(): void;
    //     onProgressUpdate(callback: () => void): void;
    // }

    interface DefaultResult {

        uid: string;//	用户唯一Id
        token: string;
        nickName: string;
        avatar: string;//头像
        sex: string;//性别，M：男，F：女
        birthday: string;
        phoneNum: string;
        location: string;//地理位置
    }
    interface Params<T> {
        /**
         * 接口调用成功的回调函数
         */
        success?: (data: T) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (data: T) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (data: T) => void;
    }

    /**
     * 设置游戏加载进度页面
     * qg.setLoadingProgress({    progress: 50        });
     */
    function setLoadingProgress(object: {
        progress: number,//	是	0-100的整数
        success?: Function,//否	接口调用成功的回调函数
        fail?: Function,//否	接口调用失败的回调函数
        complete?: Function,//否	接口调用结束的回调函数(无论成功失败都会执行)
    });
    function vibrateLong(object: {
        success?: Function,//否	接口调用成功的回调函数
        fail?: Function,//否	接口调用失败的回调函数
        complete?: Function,//否	接口调用结束的回调函数(无论成功失败都会执行)
    });
    /**
     * 隐藏游戏加载进度页面
     */
    function loadingComplete(object: {
        success?: Function,//否	接口调用成功的回调函数
        fail?: Function,//否	接口调用失败的回调函数
        complete?: Function,//否	接口调用结束的回调函数(无论成功失败都会执行)
    });
    /**
       * 激励视频广告组件。激励视频广告组件是一个原生组件，并且是一个全局单例。
       * 层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。
       * 激励视频 广告组件默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
       */
    export class VideoAd {
        /**
         * 广告单元 id
         */
        public adUnitId: string;

        load();
        /**视频广告组件默认是隐藏的，调用show方法展示广告，成功回调onVideoStart,失败回调onError
         * 开发者不可控制视频广告的关闭，只有用户主动点击关闭按钮才会关闭广告。
        */
        show();
        /**设置视频广告加载成功回调*/
        onLoad(callback: Function);
        /**移除视频广告加载成功回调*/
        offLoad(callback: Function);

        /**设置视频广告开始播放回调*/
        //onVideoStart(callback: Function);
        /**移除视频广告开始播放回调*/
        //offVideoStart();

        /**设置视频广告出错回调*/
        onError(callback: Function);
        // videoAd.onError((err) => {
        //     console.log(err)
        // })
        /**移除视频广告出错回调*/
        offError(callback: Function);

        /**设置视频关闭回调*/
        onClose(callback: Function);
        /**移除视频关闭回调*/
        offClose(callback: Function);

        /**销毁组件，释放资源*/
        //destroy();


    }
    /**
     * 返回 OPPO 小游戏启动参数
     *返回值
     *类型：string || object || Array
     */
    function getLaunchOptionsSync(): {} | string | number[];;

    /**
     * 退出当前 OPPO 小游戏
     */
    function exitQuickGame(object: {
        success: Function,//(res) => {},
        fail: Function,//(res) => {},
        complete: Function,
    });

    /**
     * 登录
     */
    function login(object: {

        pkgName?: string,
        success: Function,
        fail: Function,
        complete: Function,

    });

    function getUserInfo(object: {
        success?: Function,//否	接口调用成功的回调函数
        fail?: Function,//否	接口调用失败的回调函数
        complete?: Function,//否	接口调用结束的回调函数(无论成功失败都会执行)

    });

    /**
     * 创建激励视频广告组件。
     * 请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     * @param {object} 入参对象
     * @returns {RewardedVideoAd} 激励视频广告组件
     */
    function createRewardedVideoAd(object: {
        /**
         * 广告单元ID
         */
        adUnitId: string
    }): RewardedVideoAd;

    /**
     * 激励视频广告组件。激励视频广告组件是一个原生组件，并且是一个全局单例。
     * 层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。
     * 激励视频 广告组件默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
     */
    export class RewardedVideoAd {
        /**
         * 广告单元 id
         */
        public adUnitId: string;

        load();
        /**视频广告组件默认是隐藏的，调用show方法展示广告，成功回调onVideoStart,失败回调onError
         * 开发者不可控制视频广告的关闭，只有用户主动点击关闭按钮才会关闭广告。
        */
        show();
        /**设置视频广告加载成功回调*/
        onLoad(callback: Function);
        /**移除视频广告加载成功回调*/
        offLoad(callback: Function);

        /**设置视频广告开始播放回调*/
        onVideoStart(callback: Function);
        /**移除视频广告开始播放回调*/
        offVideoStart();

        /**设置视频广告出错回调*/
        onError(callback: Function);
        // videoAd.onError((err) => {
        //     console.log(err)
        // })
        /**移除视频广告出错回调*/
        offError(callback: Function);

        /**设置视频关闭回调*/
        onClose(callback: Function);
        /**移除视频关闭回调*/
        offClose(callback: Function);

        /**销毁组件，释放资源*/
        destroy();


    }

    // export interface GameClubButton {
    //     /**
    //      * 按钮的类型
    //      */
    //     type: string;
    //     /**
    //      * 按钮上的文本，仅当 type 为 text 时有效
    //      */
    //     text: string;
    //     /**
    //      * 按钮的背景图片，仅当 type 为 image 时有效
    //      */
    //     image: string;
    //     /**
    //      * 按钮的样式
    //      */
    //     style: {
    //         /**
    //          * 左上角横坐标
    //          */
    //         left: number,
    //         /**
    //          * 左上角纵坐标
    //          */
    //         top: number,
    //         /**
    //          * 宽度
    //          */
    //         width: number,
    //         /**
    //          * 高度
    //          */
    //         height: number,
    //         /**
    //          * 背景颜色
    //          */
    //         backgroundColor: string,
    //         /**
    //          * 边框颜色
    //          */
    //         borderColor: string,
    //         /**
    //          * 边框宽度
    //          */
    //         borderWidth: number,
    //         /**
    //          * 边框圆角
    //          */
    //         borderRadius: number,
    //         /**
    //          * 文本的水平居中方式
    //          */
    //         textAlign: string,
    //         /**
    //          * 字号
    //          */
    //         fontSize: number,
    //         /**
    //          * 文本的行高
    //          */
    //         lineHeight: number,
    //     };
    //     /**
    //      * 游戏圈按钮的图标，仅当 object.type 参数为 image 时有效。
    //      */
    //     icon: string;
    //     /**
    //      * 显示按钮
    //      */
    //     show();
    //     /**
    //      * 隐藏按钮
    //      */
    //     hide();
    //     /**
    //      * 销毁按钮
    //      */
    //     destroy();
    // }

    /**
     * 广告服务初始化
     */
    function initAdService(obj: {
        /**OPPO 联盟广告后台分配的应用 ID*/
        appId: string;
        /**是否打开广告组件 Log：true：打开广告组件 Log；false：关闭广告组件 Log；默认关闭广告组件 Log*/
        isDebug: boolean;
        success: Function;
        fail: Function;
        complete: Function;
    });

    /**
     * Banner 广告组件是由客户端原生的图片、文本控件组成的原生组件，
     * 层级最高，会覆盖在上屏 Canvas 上。
     * 开发者可以调用 wx.createBannerAd 创建 Banner 广告组件。
     * Banner 广告组件在创建后会自动拉取广告数据并进行渲染，
     * 开发者只需要控制 Banner 广告组件的位置和显示/隐藏即可。
     */
    function createBannerAd(obj: {
        /**
         * 广告id
         */
        adUnitId: string;
        style: {
            left?: number;
            top?: number;
            width?: number;
            // bottom?: number;
            height?: number;

        }
    }): BannerAd;

    /**
     * 创建Banner广告组件
     */
    interface BannerAd {
        /**修改广告的展示位置，参数必须保证广告能够在屏幕完全展示，否则设置不生效 */
        style();
        /**调用load方法请求展示banner，成功的时候回调onShow，出错的时候回调onError*/
        show();
        /**隐藏 banner */
        hide();
        /**设置 banner 成功展示回调 */
        onLoad(callback: Function);
        /**移除 banner 加载成功回调 */
        offLoad(callback: Function);

        onShow(callback: Function);
        offShow();
        /**banner 隐藏回调 */
        onHide(callback: Function);
        /**移除banner 隐藏回调 */
        offHide();
        /** 设置失败回调*/
        onError(callback: Function);
        /**Banner 移除失败回调*/
        offError();
        /**设置广告显示宽高变化回调 */
        onResize(callback: Function);
        /**移除广告显示宽高变化回调 */
        offResize();

        /**销毁组件，释放资源 */
        destroy();
    }

    /**
     * 创建插屏广告组件，同一个 posId，如果已经创建，并且未 destroy，会复用之前的对象
     * 确保广告服务已经初始化完毕
     */
    function createInsertAd(obj: {
        adUnitId: string
    });

    /**
     * 插屏广告
     */
    interface insertAd {
        /**拉取插屏广告资源，成功回调 onLoad，失败回调 onError*/
        load();
        /**展示插屏广告，成功回调 onShow，失败回调 onError*/
        show();
        /**设置插屏广告加载成功回调*/
        onLoad(call: Function);
        /**移除插屏广告加载成功回调*/
        offLoad();
        /**设置插屏广告展示成功回调*/
        onShow(callback: Function);
        /**移除插屏广告展示成功回调*/
        offShow();
        /**设置插屏广告失败回调*/
        onError(callback: Function);
        /**移除插屏广告失败回调*/
        offError();
        /**销毁组件，释放资源*/
        destroy();
    }


    function getSystemInfoSync(): {
        COREVersion: string;//	版本号
        brand: string//	手机品牌
        language: string;//	当前环境设置的语言
        model: string;//	手机型号
        pixelRatio: number;//	设备像素比
        platform: string;//	客户端平台
        screenHeight: number;//	屏幕高度
        screenWidth: number;//	屏幕宽度
        system: string;//	操作系统版本
        windowHeight: number;//	可使用窗口高度
        windowWidth: number;//	可使用窗口宽度
    };
    function showModal(obj: Object);
    function aldSendEvent(eventName: string, data: Object);

    /**
     * 设置系统剪贴板的内容
     */
    function setClipboardData(Object: {
        data: string,
        success?: Function,
        fail?: Function,
        complete?: Function
    });

    /**
     * 获取系统剪贴板的内容
     */
    function getClipboardData(Object: {
        success?: Function,
        fail?: Function,
        complete?: Function
    });

    /**
     * 打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。要求在用户发生过至少一次 touch 事件后才能调用。
     */
    function navigateToMiniGame(Object: {
        /** 要打开的小程序 appId */
        pkgName: string,
        /** 打开的页面路径，如果为空则打开首页 */
        path?: string,
        /** 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据 */
        extraData?: Object,

        success?: Function,
        fail?: Function,
        complete?: Function,
    });
    /**
     * 获取网络类型
     */
    function getNetworkType(Object: {

        success?: function;
        fail?: function;
        complete?: function;

    });

    type OnShowResultParams = {
        //场景值
        scene: number;
        query: Object;
        shareTicket: string
        //当场景为由从另一个小程序或公众号或App打开时，返回此字段
        referrerInfo: {
            //来源小程序或公众号或App的 appId
            appId: string;
            //来源小程序传过来的数据，scene=1037或1038时支持
            extraData: Object;
        }
    }

    function getAccountInfoSync(): AccountInfo;
    type AccountInfo = {
        /**
         * 	小程序帐号信息
         */
        miniProgram: {
            /**
             * 插件 appId
             */
            appId: string;
        };
        /**
         * 插件帐号信息（仅在插件中调用时包含这一项）
         */
        plugin: {
            /**
             * 插件 appId
             */
            appId: string;
            /**
             * 插件版本号
             */
            version: string;
        };
    }
}