// TypeScript file
declare namespace wx {
    /**
     * 获取全局唯一的文件管理器
     */
    function getFileSystemManager(): FileSystemManager;
    interface FileItem {

    }
    interface FileSystemManager {
        /**
         * 判断文件/目录是否存在
         */
        access(object: { path: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.access 的同步版本
         */
        accessSync(path: string): void;
        /**
         * 复制文件
         */
        copyFile(object: { srcPath: string, destPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.copyFile 的同步版本
         */
        copyFileSync(srcPath: string, destPath: string): void;
        /**
         * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
         */
        getFileInfo(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 获取该小程序下已保存的本地缓存文件列表
         */
        getSavedFileList(object: { success?: (res: FileItem[]) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
        /**
         * 创建目录
         */
        mkdir(object: { dirPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.mkdir 的同步版本
         */
        mkdirSync(dirPath: string): void;
        /**
         * 删除该小程序下已保存的本地缓存文件
         */
        removeSavedFile(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 读取本地文件内容
         */
        readFile(object: { filePath: string, encoding: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 重命名文件，可以把文件从 oldPath 移动到 newPath
         */
        rename(object: { oldPath: string, newPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 删除目录
         */
        rmdir(object: { dirPath: Object, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 读取目录内文件列表
         */
        readdir(object: { dirPath: string, success: (res: string[]) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.readdir 的同步版本
         */
        readdirSync(dirPath: string): string[];
        /**
         * FileSystemManager.rename 的同步版本
         */
        renameSync(oldPath: string, newPath: string): void;
        /**
         * FileSystemManager.rmdir 的同步版本
         */
        rmdirSync(dirPath: {}): void;
        /**
         * FileSystemManager.readFile 的同步版本
         */
        readFileSync(filePath: string, encoding: string): string[];
        /**
         * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
         */
        saveFile(object: { tempFilePath: string, filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 获取文件 Stats 对象
         */
        stat(object: { path: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): Stats;
        /**
         * FileSystemManager.saveFile 的同步版本
         */
        saveFileSync(tempFilePath: string, filePath: string): number;
        /**
         * FileSystemManager.stat 的同步版本
         */
        statSync(path: string): Stats;
        /**
         * 删除文件
         */
        unlink(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * 解压文件
         */
        unzip(object: { zipFilePath: string, targetPath: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.unlink 的同步版本
         */
        unlinkSync(filePath: string): void;
        /**
         * 写文件
         */
        writeFile(object: { filePath: string, data: any[], encoding: string, success: (res: any) => void, fail: (res: any) => void, complete: (res: any) => void }): void;
        /**
         * FileSystemManager.writeFile 的同步版本
         */
        writeFileSync(filePath: string, data: string | ArrayBuffer, encoding: string): void;
    }

    interface Stats {
        /**
         * 判断当前文件是否一个目录
         */
        isDirectory(): boolean;
        /**
         * 判断当前文件是否一个普通文件
         */
        isFile(): boolean;
    }

    interface DownloadTask {
        abort(): void;
        onProgressUpdate(callback: () => void): void;
    }

    interface DefaultResult {
        code: string;
        errMsg: string;
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
    function triggerGC();
    interface AuthorizeParams extends Params<DefaultResult> {
        scope: string;
    }
    interface GetUserInfoResult {
        /**
        * 用户信息对象，不包含 openid 等敏感信息
        */
        userInfo: UserInfo;
        /**
         * 不包括敏感信息的原始数据字符串，用于计算签名
         */
        rawData: string;
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档signature
         */
        signature: string;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量，详细见加密数据解密算法
         */
        iv: string;
    }
    interface wxShareInfo {
        /**
         * 错误信息
         */
        errMsg: string;
        /**
         * 包括敏感数据在内的完整转发信息的加密数据，详细见加密数据解密算法
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量，详细见加密数据解密算法
         */
        iv: string;
    }
    interface UserInfoParams extends Params<GetUserInfoResult> {
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
    /**
     * 返回小程序启动参数
     * @see https://developers.weixin.qq.com/minigame/dev/document/system/life-cycle/wx.getLaunchOptionsSync.html?search-key=getLaunchInfoSync
     */
    function getLaunchOptionsSync(): launchOption;

    /**
     * 调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid） 
     * 及本次登录的 会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。
     */
    function login(params: Params<DefaultResult>): void;
    /**
     * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。
     * 反之如果用户一直在使用小程序，则用户登录态一直保持有效。
     * 具体时效逻辑由微信维护，对开发者透明。
     * 开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。
     * 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。
     */
    function checkSession(params: Params<DefaultResult>);
    /**
     * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。
     * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
     */
    function authorize(params: AuthorizeParams);
    /**
     * 获取用户信息，withCredentials 为 true 时需要先调用 wx.login 接口。需要用户授权 scope.userInfo
     */
    function getUserInfo(params: UserInfoParams);

    function createUserInfoButton(params: {
        /**
         * string		是	按钮的类型
         */
        type: string;
        /**
         * 按钮上的文本，仅当 type 为 text 时有效
         */
        text?: string;
        /**
         * 按钮的背景图片，仅当 type 为 image 时有效
         */
        image?: string;
        /**
         * 按钮的样式
         */
        style: {
            left?: number,
            top?: number,
            width?: number,
            height?: number,
            lineHeight?: number,
            backgroundColor?: string,
            color?: string,
            textAlign?: string,
            /**
             * 字号
             */
            fontSize?: number,
            /**
             * 边框圆角
             */
            borderRadius?: number
        };
        /**
         * 是否带上登录态信息。当 withCredentials 为 true 时，
         * 要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；
         * 当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
         */
        withCredentials: boolean;
        /**
         * 描述用户信息的语言
         */
        lang?: string;
    });

    /**
     * 
     * 游戏冷启动时如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地已有的包进行启动，
     * 即新版本的小游戏需要等下一次冷启动才会应用上。 
     * 如果需要马上应用最新版本，可以使用 wx.getUpdateManager() API 进行处理。
     * v1.9.90 基础库以后，可以通过 wx.getUpdateManager() 获取全局唯一的版本更新管理器，用于管理小游戏更新；
     * 另外请下载最新版本的开发者工具(1.02.1803130 以上)才支持在开发者工具上调试。
     * 由于是新版本才支持的 API，请在使用前先判断是否支持，例如：
     * if (wx.getUpdateManager) {
     *      console.log('支持 wx.getUpdateManager')
     * }
     */
    function getUpdateManager(): UpdateManager;
    interface UpdateManager {
        /**
         * 当向微信后台请求完新版本信息，会进行回调
         * 注： Android 6.6.6 及以下版本存在 onCheckForUpdate 在某些情况没有回调的 BUG，Android 下建议 6.6.7 版才使用该回调
         * 检查更新操作由微信在小游戏冷启动时自动触发，不需由开发者主动触发，开发者只需监听检查结果即可
         */
        onCheckForUpdate(callback: (res: { hasUpdate: boolean }) => void);
        /**
         * 当新版本下载完成，会进行回调
         * 当微信检查到小游戏有新版本，会主动触发下载操作（无需开发者触发），当下载完成后，会通过 onUpdateReady 告知开发者。
         */
        onUpdateReady(callback: () => void);
        /**
         * 当新版本下载失败，会进行回调
         * 当微信检查到小游戏有新版本，会主动触发下载操作（无需开发者触发），如果下载失败（可能是网络原因等），会通过 onUpdateFailed 告知开发者
         */
        onUpdateFailed(callback: () => void);
        /**
         * 当新版本下载完成，调用该方法会强制当前小游戏应用上新版本并重启
         * 当小游戏新版本已经下载时（即收到 onUpdateReady 回调），可以通过这个方法强制重启小游戏并应用上最新版本。
         */
        applyUpdate();
    }

    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     * @param object {Array.<UserGameData>}
     */
    function getFriendCloudStorage(object: FriendCloudStorageParam);

    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     */
    function getUserCloudStorage(Object: UserCloudStorageParam);

    /**
     * 主动拉起转发，进入选择通讯录界面
     * @param {object} 入参对象
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.shareAppMessage.html
     */
    function shareAppMessage(object: {
        /**
         * 转发标题，不传则默认使用当前小游戏的昵称
         */
        title: string,
        /**
         * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
         */
        imageUrl: string,
        /**
         * 查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
         */
        query: string,
        /**
         * 接口调用成功的回调函数
         */
        success?: Function,
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function,
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function,
        /**
         * 分享关闭回调
         */
        cancel?: Function
    });
    /**
     * 阿拉丁分享接口
     */
    function aldShareAppMessage(object: {
        /**
         * 转发标题，不传则默认使用当前小游戏的昵称
         */
        title: string,
        /**
         * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
         */
        imageUrl: string,
        /**
         * 查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
         */
        query: string,
        /**
         * 接口调用成功的回调函数
         */
        success?: Function,
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function,
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function
    });


    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param {Function} callback 监听事件的回调函数,此函数包含一个返回值,详见: WxShareData
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.onShareAppMessage.html
     */
    function onShareAppMessage(callback: () => WxShareData);
    /**
     * 阿拉丁分享接口
     */
    function aldOnShareAppMessage(callback: () => WxShareData);

    /**
     * 取消监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param {Function} callback 监听事件的回调函数,此函数包含一个返回值,详见: WxShareData
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.offShareAppMessage.html
     */
    function offShareAppMessage(callback: () => WxShareData);

    /**
     * 显示当前页面的转发按钮
     * @param {object} 入参对象
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.showShareMenu.html
     */
    function showShareMenu(object: {
        /**
         * 是否使用带 shareTicket 的转发,必填
         */
        withShareTicket: boolean,
        /**
         * 接口调用成功的回调函数
         */
        success?: Function,
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function,
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function
    });

    /**
     * 更新转发属性
     * @param {object} 入参对象
     * @see https://developers.weixin.qq.com/minigame/dev/document/share/wx.updateShareMenu.html
     */
    function updateShareMenu(object: {
        /**
         * 是否使用带 shareTicket 的转发,必填
         */
        withShareTicket: boolean,
        /**
         * 接口调用成功的回调函数
         */
        success?: Function,
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function,
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function
    });

    /**
     * 创建激励视频广告组件。
     * 请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。
     * 同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     * @param {object} 入参对象
     * @returns {RewardedVideoAd} 激励视频广告组件
     * @see https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html
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
     * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.html
     */
    export class RewardedVideoAd {
        /**
         * 广告单元 id
         */
        public adUnitId: string;

        /**
         * 隐藏激励视频广告
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.load.html
         */
        load(): Promise<any>;

        /**
         * 显示激励视频广告。
         * 激励视频广告将从屏幕下方推入。
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.show.html
         */
        show(): Promise<any>;

        /**
         * 监听激励视频广告加载事件
         * @param {Function} callback 回调函数
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.onLoad.html
         */
        onLoad(callback: Function);

        /**
         * 取消监听激励视频广告加载事件
         * @param {Function} callback 回调函数
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.offLoad.html
         */
        offLoad(callback: Function);

        /**
         * 监听激励视频错误事件
         * @param {Function} callback 回调函数
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.onError.html
         */
        onError(callback: Function);

        /**
         * 取消监听激励视频错误事件
         * @param {Function} callback 回调函数
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.offError.html
         */
        offError(callback: Function);

        /**
         * 监听用户点击 关闭广告 按钮的事件
         * @param {Function} callback 回调函数
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.onClose.html
         */
        onClose(callback: (res: { isEnded: boolean }) => void);

        /**
         * 取消监听用户点击 关闭广告 按钮的事件
         * @param {Function} callback 回调函数
         * @see https://developers.weixin.qq.com/minigame/dev/document/ad/RewardedVideoAd.offClose.html
         */
        offClose(callback: Function);


    }

    /**
     * 进入客服会话，要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致，详见 客服消息接入
     * @param {Object} object
     * @see https://developers.weixin.qq.com/minigame/dev/document/open-api/customer-message/wx.openCustomerServiceConversation.html
     */
    function openCustomerServiceConversation(object: {
        /**
         * 会话来源
         */
        sessionFrom?: string,
        /**
         * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话之后会收到一个消息卡片，通过以下三个参数设置卡片的内容
         */
        showMessageCard?: boolean,
        /**
         * 会话内消息卡片标题
         */
        sendMessageTitle?: string,
        /**
         * 会话内消息卡片路径
         */
        sendMessagePath?: string,
        /**
         * 会话内消息卡片图片路径
         */
        sendMessageImg?: string,
        /**
         * 接口调用成功的回调函数
         */
        success?: Function,
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function,
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function,
    });

    export interface GameClubButton {
        /**
         * 按钮的类型
         */
        type: string;
        /**
         * 按钮上的文本，仅当 type 为 text 时有效
         */
        text: string;
        /**
         * 按钮的背景图片，仅当 type 为 image 时有效
         */
        image: string;
        /**
         * 按钮的样式
         */
        style: {
            /**
             * 左上角横坐标
             */
            left: number,
            /**
             * 左上角纵坐标
             */
            top: number,
            /**
             * 宽度
             */
            width: number,
            /**
             * 高度
             */
            height: number,
            /**
             * 背景颜色
             */
            backgroundColor: string,
            /**
             * 边框颜色
             */
            borderColor: string,
            /**
             * 边框宽度
             */
            borderWidth: number,
            /**
             * 边框圆角
             */
            borderRadius: number,
            /**
             * 文本的水平居中方式
             */
            textAlign: string,
            /**
             * 字号
             */
            fontSize: number,
            /**
             * 文本的行高
             */
            lineHeight: number,
        };
        /**
         * 游戏圈按钮的图标，仅当 object.type 参数为 image 时有效。
         */
        icon: string;
        /**
         * 显示按钮
         */
        show();
        /**
         * 隐藏按钮
         */
        hide();
        /**
         * 销毁按钮
         */
        destroy();
    }

    function createGameClubButton(object: {
        /**
         * 按钮的类型
         */
        type?: string;
        /**
         * 按钮上的文本，仅当 type 为 text 时有效
         */
        text?: string;
        /**
         * 按钮的背景图片，仅当 type 为 image 时有效
         */
        image?: string;
        /**
         * 按钮的样式
         */
        style: {
            /**
             * 左上角横坐标
             */
            left?: number,
            /**
             * 左上角纵坐标
             */
            top?: number,
            /**
             * 宽度
             */
            width?: number,
            /**
             * 高度
             */
            height?: number,
            /**
             * 背景颜色
             */
            backgroundColor?: string,
            /**
             * 边框颜色
             */
            borderColor?: string,
            /**
             * 边框宽度
             */
            borderWidth?: number,
            /**
             * 边框圆角
             */
            borderRadius?: number,
            /**
             * 文本的水平居中方式
             */
            textAlign?: string,
            /**
             * 字号
             */
            fontSize?: number,
            /**
             * 文本的行高
             */
            lineHeight?: number,
        };
        /**
         * 游戏圈按钮的图标，仅当 object.type 参数为 image 时有效。
         */
        icon?: string;
    });
    /**
     * Banner 广告组件是由客户端原生的图片、文本控件组成的原生组件，
     * 层级最高，会覆盖在上屏 Canvas 上。
     * 开发者可以调用 wx.createBannerAd 创建 Banner 广告组件。
     * Banner 广告组件在创建后会自动拉取广告数据并进行渲染，
     * 开发者只需要控制 Banner 广告组件的位置和显示/隐藏即可。
     */
    function createBannerAd(params: {
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
    }): AdBannerHandle;
    interface AdBannerHandle {
        show(): Promise<any>;
        destroy();
        hide();
        onLoad(callback: (error) => void);
        onError(callback: (error) => void);
        onResize(callback: (res: { width: number, height: number }) => void);
        style: { width: number, height: number, top: number, left: number }
    }
    interface SystemInfoSync {
        SDKVersion: string;
        screenWidth: number;
        screenHeight: number;
        brand: string;//手机品牌
        model: string;//手机型号
        version: string;//微信版本号
        system: string;
        /**是否已打开调试。可通过右上角菜单或 wx.setEnableDebug 打开调试。 */
        enableDebug: boolean;
        platform: "ios" | "android" | "windows" | "mac" | "devtools";
        /**设备性能等级（仅 Android）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50） */
        benchmarkLevel: number;
        safeArea: {
            left: number;//	安全区域左上角横坐标
            right: number;//	安全区域右下角横坐标
            top: number;//	安全区域左上角纵坐标
            bottom: number;//	安全区域右下角纵坐标
            width: number;//	安全区域的宽度，单位逻辑像素
            height: number;//	安全区域的高度，单位逻辑像素
        };
    }
    function getSystemInfoSync(): SystemInfoSync;
    // {
    //     SDKVersion: string;
    //     screenWidth: number;
    //     screenHeight: number;
    //     brand: string;//手机品牌
    //     model: string;//手机型号
    //     version: string;//微信版本号
    //     system: string;
    //     platform: string;
    // };
    function showModal(obj: Object);
    function aldSendEvent(eventName: string, data: Object);

    /**
     * 设置系统剪贴板的内容
     */
    function setClipboardData(Object: { data: string, success?: Function, fail?: Function, complete?: Function });

    /**
     * 获取系统剪贴板的内容
     */
    function getClipboardData(Object: { success?: Function, fail?: Function, complete?: Function });

    /**
     * 打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。要求在用户发生过至少一次 touch 事件后才能调用。
     */
    function navigateToMiniProgram(Object: {
        /** 要打开的小程序 appId */
        appId: string,
        /** 打开的页面路径，如果为空则打开首页 */
        path?: string,
        /** 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据 */
        extraData?: Object,
        /** 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。*/
        envVersion?: string,
        success?: Function,
        fail?: Function,
        complete?: Function,
    });
    /**
     * 打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。要求在用户发生过至少一次 touch 事件后才能调用。
     */
    function getShareInfo(params: {
        shareTicket: string;
        success: (res: {
            /**
             * 错误信息
             */
            errMsg: string;
            /**
             * 包括敏感数据在内的完整转发信息的加密数据，详细见加密数据解密算法
             */
            encryptedData: string;
            /**
             * 加密算法的初始向量，详细见加密数据解密算法
             */
            iv: string;
        }) => void;
        fail: () => void;
        complete: () => void;
    });
    /**
     * 获取所有已经获取的权限信息
     */
    function getSetting(param: Params<{
        authSetting: {
            "scope.userInfo": boolean,
            "scope.userLocation": boolean
        }
    }>);
    interface UserInfoButton {
        destroy: Function;
        style: {
            left: number;
            top: number;
            width: number;
            height: number;

        };
        image: string;
        show();
        hide();
    }
    /**
     * 获取网络类型
     */
    function getNetworkType(param: Params<{ networkType: string }>);
    /**
     * 监听小游戏回到前台的事件
     */
    function onShow(callback: (res: OnShowResultParams) => void);
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


