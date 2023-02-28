// TypeScript file
declare namespace tt {
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

        code?: string;
        anonymousCode?: string;
        isLogin?: boolean;
        errCode?: string;
        errMsg?: string;
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
     * 授权参数
     * scope	string	是	需要获取权限的 scope，详见 scope 列表
        success	function	否	成功回调函数
        fail	function	否	失败回调函数
        complete	function	否	接口调用完成的回调函数（接口成功、失败都会执行）

        scope列表:
        scope	            对应接口	       描述
        scope.userInfo	swan.getUserInfo	用户信息
        scope.userLocation	swan.getLocation, swan.chooseLocation	地理位置
        scope.writePhotosAlbum	swan.saveImageToPhotosAlbum	保存到相册
        scope.address	swan.chooseAddress	收货地址
        scope.invoiceTitle	swan.chooseInvoiceTitle	发票抬头
        scope.record	swan.getRecorderManager	录音功能
        scope.camera		摄像头
     */
    interface authorizeParams extends Params<any> {
        scope: string,
    }

    /**
     * 授权
     */
    function authorize(Params: authorizeParams);

    /**
     * 获取所有已经获取的权限信息
     */
    function getSetting(param: Params<{
        authSetting: {
            "scope.userInfo": boolean,
            "scope.userLocation": boolean
        }
    }>);

    /**
     * 登录
     */
    function login(params: loginParams);
    interface loginParams extends Params<DefaultResult> {
        force: boolean
    }
    function vibrateShort(Params: Params): Params;
    /**
      * 通过上述接口获得的用户登录态拥有一定的时效性，用户越久未使用小游戏，用户登录态越有可能失效；
      反之如果用户一直在使用小游戏，则用户登录态一直保持有效。具体时效逻辑由头条 App 维护，对开发者透明。
      开发者可以调用 swan.checkSession() 接口检测当前用户登录态是否有效，登录态过期后开发者可以再调用 swan.login() 获取新的用户登录态。
     */
    function checkSession(params: Params<DefaultResult>);

    /**
     * 获取用户信息，withCredentials 为 true 时需要先调用 swan.login 接口。需要用户授权 scope.userInfo  [注:这api在头条小程序中]
     */
    function getUserInfo(params: UserInfoParams);
    /**
     * 拉起实名认证窗口
     * @param params 
     */
    function authenticateRealName(params: Params);
    function onRealNameAuthenticationComplete(params: (params: { state: "complete" }) => void);
    // 
    interface UserInfoParams extends Params<GetUserInfoResult> {
        /**
         * 是否需要返回用户实名认证状态
         */
        withRealNameAuthenticationInfo: boolean;
        /**
         * 是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 
         * 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；
         * 当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息
         */
        withCredentials?: boolean;
        /**
         * 显示用户信息的语言
         */
        lang?: string;
    }

    /** 用户信息 */
    interface userInfo {
        /** 用户头像 */
        avatarUrl: string,
        /** 用户所在城市 */
        city: string,
        /** 用户所在国家 */
        country: string,
        /** 用户性别：值为1时是男性，值为2时是女性 */
        gender: number,
        /** 用户名 */
        nickName: string,
        /** 用户所在省份 */
        province: string,
        /** 展示用户信息所用的语言 */
        language: string
    }


    interface GetUserInfoResult {
        /**
         * "certified"	object	当前用户已经通过实名认证
        *  "uncertified" object	当前用户未通过实名认证
         */
        realNameAuthenticationStatus?: "certified" | "uncertified";
        /**
         * 用户使用智能小程序时的标识符，开发者可以通过 swanid 来区分用户的唯一性
         */
        swanid: string,
        /**
        * 用户信息对象，不包含 openid 等敏感信息
        */
        userInfo: userInfo;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
         */
        data: string;
        /**
         * 加密算法的初始向量，详细见加密数据解密算法
         */
        iv: string;
    }

    /**
     * 小游戏更新
     * 获取全局唯一对更新进行管理的对象，建议开发者将对象的获取以及事件回调的监听写在 onShow 周期当中
     */
    function getUpdateManager(): UpdateManager;

    interface UpdateManager {
        /**
         * 在 UpdateManager 对象上进行调用，监听检查更新结果事件，检查更新不需要开发者主动触发，会在小游戏首次被打开或被客户端主动销毁后再次打开时自动进行检查。
         */
        onCheckForUpdate(callback: (res: { hasUpdate: boolean }) => void);
        /**
         * 在 UpdateManager 对象上进行调用，监听小游戏有新版本可以更新的事件（新版本下载完成），客户端下载好新版本后触发回调函数。
         */
        onUpdateReady(callback: () => void);
        /**
         * 在 UpdateManager 对象上进行调用，监听小游戏更新失败的事件（新版本下载失败），客户端在下载失败时触发回调函数。
         */
        onUpdateFailed(callback: () => void);
        /**
         * 该方法在 updateManager.onUpdateReady 的回调中调用，用来强制重启并使用新版本。
         */
        applyUpdate();
    }

    /**
     * 获取全局唯一的 GameRecorderManager。注意，开发者工具不支持录屏调试，请在真机上调试录屏相关功能。
     */
    function getGameRecorderManager(): GameRecorderManager;
    interface GameRecorderManager {
        /**
         * 开始录屏。可以通过 onStart 接口监听录屏开始事件。
         */
        start({ duration: number });
        /**
         * 监听录屏开始事件
         */
        onStart(callback: Function);
        /**
         * 停止录屏。可以通过 onStop 接口监听录屏结束事件，获得录屏地址。
         */
        stop();
        /**
         * 监听录屏结束事件。可以通过 onStop 接口监听录屏结束事件，获得录屏地址。
         */
        onStop(callback: (res: { videoPath: string }) => void);

        onError(callback: Function);
    }

    /**
     * 分享视频
     */
    function shareVideo(param: shareVideoParams);

    interface shareVideoParams extends Params<any> {
        videoPath: string,
    }

    /**
     * 监听小游戏回到前台的事件
     */
    function onShow(callback: (res: OnShowResultParams) => void);
    type OnShowResultParams = {
        //场景值
        scene: number;
        //启动参数
        query: Map<string, any>;
        shareTicket: string
        //由从另一个小程序或小游戏打开此小游戏时，返回此字段
        referrerInfo: {
            //来源小程序或小游戏的 appKey
            appKey: string;
            //来源小程序或小游戏传过来的信息，scene=1037或1038时支持][这是微信的,头条未知]
            extraData: Object;
        }
    }
    /**
     * 返回小程序启动参数
     * @see https://developers.weixin.qq.com/minigame/dev/document/system/life-cycle/wx.getLaunchOptionsSync.html?search-key=getLaunchInfoSync
     */
    function getLaunchOptionsSync(): launchOption;
    /**
     * 微信小游戏启动参数
     */
    type launchOption = {
        /**场景值*/
        scene: number;
        /**启动参数*/
        query: Map<string, any>;
        /**来源信息*/
        referrerInfo: referrerInfo;
    }
    type referrerInfo = {
        /**调起小游戏的 appId*/
        appId: string;
        /**来源小程序传过来的数据，scene=1037或1038时支持[这是微信的,头条未知]*/
        extraData: any;
    }
    /**
     * 退出小游戏。
     */
    function exit(param: Params<any>);


    /**
     * 用户点击分享按钮的时候会调用  [似乎不是属于内部方法,要用户自定义在一个页面中,具体不知]
     * from:分享事件来源。button：页面内转发按钮；menu：右上角分享菜单 。
     * target:如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined 。
     *         为兼容使用了3.10.16(手百11.2)以下版本的基础库，原使用 currentTarget 的获取方式保留至2月15日下线。
     */
    function onShareAppMessage(from: string, target: eui.Button): ToutiaoShareData;
    /**
     * 分享数据
     */
    interface ToutiaoShareData extends Params<any> {
        /**转发标题，不传则默认使用当前小游戏的昵称*/
        title?: string;
        /** 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4*/
        imageUrl?: string;
        /** 查询字符串，必须是 key1= val1 & key2=val2 的格式。从这条转发消息进入后，可通过 wx.getLaunchOptionSync() 或 wx.onShow() 获取启动参数中的 query。*/
        query?: string;
        /** 分享内容 */
        content?: string;
        /** 页面 path ，必须是以 / 开头的完整路径。 */
        path?: string;
    }

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

        //onShow(callback: Function);
        //offShow();
        /**banner 隐藏回调 */
        //onHide(callback: Function);
        /**移除banner 隐藏回调 */
        //offHide();
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
     * 创建插屏广告
     * @param 
     */
    function createInterstitialAd(obj: {
        /**
        * 广告id
        */
        adUnitId: string;
    }): InterstitialAd
    /**插屏广告
     * 插屏广告组件。插屏广告组件是一个原生组件，层级比普通组件高。插屏广告组件每次创建都会返回一个全新的实例，默认是隐藏的，需要调用 InterstitialAd.show() 将其显示。
     */
    interface InterstitialAd {
        /**
         * 显示插屏广告。 */
        show(object: {
            success: Function,
            fail: Function,
            complete: Function
        })

        /**加载插屏广告。 */
        load(object?: {
            success?: Function,
            fail?: Function,
            complete?: Function
        })

        /**销毁插屏广告实例。 */
        destroy()

        /** 监听插屏广告加载事件。*/
        onLoad(callback: function)

        /**取消监听插屏广告加载事件 */
        offLoad(callback: function)

        /**监听插屏错误事件。 */
        onError(callback: function)

        /**取消监听插屏错误事件 */
        offError(callback: function)

        /**监听插屏广告关闭事件。 */
        onClose(callback: function)

        /**取消监听插屏广告关闭事件 */
        offClose(callback: function)

    }
    /**
     * 创建激励视频广告组件。
     * 请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     * @param {object} 入参对象
     * @returns {VideoAd} 激励视频广告组件
     */
    function createRewardedVideoAd(object: {
        /**
         * 广告单元ID
         */
        adUnitId: string
    }): VideoAd;

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
     * 系统信息
     */
    function getSystemInfoSync(): {
        SDKVersion: string;//客户端基础库版本
        screenWidth: number;//屏幕宽度
        screenHeight: number;//屏幕高度
        brand: string;//手机品牌
        model: string;//手机型号
        version: string;//头条 App 版本号
        system: string;//操作系统版本
        platform: string;
    };
    /**
     * 显示模态对话框。
     */
    function showModal(obj: {
        title: string	//是	提示的标题
        content: string//是	提示的内容
        showCancel?: boolean	//否	是否显示取消按钮，默认为 'true'
        cancelText?: string	//否	取消按钮的文字，最多 4 个字符，默认为 '取消'
        cancelColor?: string	//否	取消按钮的文字颜色，默认为 '#000000'
        confirmText?: string	//否	确定按钮的文字，最多 4 个字符，默认为 '确定'
        confirmColor?: string	//否	确定按钮的文字颜色，默认为 '#3c76ff'
        //否	成功回调函数
        success?: (res: {
            confirm: boolean, //为 true 时，表示用户点击了确定按钮
            cancel: boolean  //为 true 时，表示用户点击了取消按钮
        }) => void
        //否	失败回调函数
        fail?: () => void
        //否	接口调用完成的回调函数（接口成功、失败都会执行）
        complete?: () => void
    });


    /**
     * 创建并返回内部 audio 上下文 innerAudioContext 实例对象。
     */
    function createInnerAudioContext(): InnerAudioContext;

    /**
     * audio 上下文 innerAudioContext 实例对象。
     */
    export class InnerAudioContext {
        src: string	//否	音频的数据链接，用于直接播放。
        startTime: number	//否	开始播放的位置（单位：s），默认 0
        autoplay: boolean	//否	是否自动开始播放，默认 false
        loop: boolean	//否	是否循环播放，默认 false
        duration: number	//是	当前音频的长度（单位：s），只有在当前有合法的 src 时返回
        currentTime: number	//是	当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，结果保留不超过 6 位小数的浮点数或者整数
        paused: boolean	//是	当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
        buffered: number	//是	音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲
        volume: number	//否	音量，范围 0~1，默认 1
        /** 音频播放事件。 */
        play();
        /** 监听音频播放事件。 */
        onPlay(callback: () => void);
        /** 取消监听音频播放事件。 */
        offPlay(callback?: () => void);
        /** 监听音频进入可以播放状态的事件，但不保证后面可以流畅播放。 */
        onCanplay(callback: () => void);
        /** 取消监听音频进入可以播放状态的事件。 */
        offCanplay(callback?: () => void);
        /** 停止播放事件。 */
        stop();
        /** 监听音频停止事件。 */
        onStop(callback: () => void);
        /** 取消监听音频停止事件。 */
        offStop(callback?: () => void);
        /** 监听音频自然播放至结束的事件。 */
        onEnded(callback: () => void);
        /** 取消监听音频自然播放至结束的事件。 */
        offEnded(callback?: () => void);
        /** 暂停播放事件。 */
        pause();
        /** 监听音频暂停事件。 */
        onPause(callback: () => void);
        /** 取消监听音频暂停事件。 */
        offPause(callback?: () => void);
        /** 监听音频播放错误事件。 */
        onError(callback: (res: DefaultResult) => void);
        /** 取消监听音频播放错误事件。 */
        offError(callback?: () => void);
        /** 跳转到指定位置。 */
        seek();
        /** 监听音频完成跳转操作的事件。 */
        onSeeked(callback: () => void);
        /** 取消监听音频完成跳转操作的事件。 */
        offSeeked(callback?: () => void);
        /** 监听音频进行跳转操作的事件。 */
        onSeeking(callback: () => void);
        /** 取消监听音频进行跳转操作的事件。 */
        offSeeking(callback?: () => void);
        /** 监听音频播放进度更新事件。 */
        onTimeUpdate(callback: (res: {
            /** 当前音频的播放位置，单位 s。只有在当前有合法的 src 时返回，时间不取整，结果保留不超过 6 位小数的浮点数或者整数 */
            currentTime: number,
            /** 当前音频的长度，单位 s。只有在当前有合法的 src 时返回 */
            duration: number
        }) => void);
        /**取消监听音频播放进度更新事件。 */
        offTimeUpdate(callback?: () => void);
        /**监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发。 */
        onWaiting(callback: () => void);
        /**取消监听音频播放进度更新事件。 */
        offWaiting(callback?: () => void);
        /**销毁当前音频实例。 */
        destroy();

    }

    /**
     * 设置系统剪贴板的内容
     */
    function setClipboardData(Object: {
        data: string,
        success?: Function,
        fail?: Function,
        complete?: Function
    });
    function setClipboardData(params: ClipboardData);
    function getClipboardData(params: Params<string>);

    /**
     * 打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。要求在用户发生过至少一次 touch 事件后才能调用。
     */
    function navigateToMiniProgram(params: navigateData);
    interface navigateData extends Params<any> {
        /** 要打开的小程序 appId */
        appId: string,
        /** 打开的页面路径，如果为空则打开首页 */
        path?: string,
        /** 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据 */
        extraData?: Object,
    };
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

    /**长震动 */
    function vibrateLong(object: {
        success: Function,
        fail: Function,
        complete: Function
    })

    /**短震动 */
    function vibrateShort(object: {
        success: Function,
        fail: Function,
        complete: Function
    })

    function showShareMenu(object: {
        withShareTicket: boolean,
        success?: Function,
        fail?: Function,
        complete?: Function
    })
}