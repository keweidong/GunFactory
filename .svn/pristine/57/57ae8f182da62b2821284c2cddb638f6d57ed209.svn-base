declare namespace jsb {
    export const enum EventAssetsManager {
        /**
         * 没有本地热更新版本文件
         */
        ERROR_NO_LOCAL_MANIFEST = 0,
        /**
         * 下载热更新版本文件失败
         */
        ERROR_DOWNLOAD_MANIFEST = 1,
        /**
         * 解析热更新版本文件失败
         */
        ERROR_PARSE_MANIFEST = 2,
        /**
         * 有新的版本需要更新
         */
        NEW_VERSION_FOUND = 3,
        /**
        * 不需要热更新
        */
        ALREADY_UP_TO_DATE = 4,

        /**
         * 热更新下载进度事件
         */
        UPDATE_PROGRESSION = 5,

        ASSET_UPDATED = 6,
        /**
        * 热更新过程出错
        */
        ERROR_UPDATING = 7,

        /**
         * 热更新完成
         */
        UPDATE_FINISHED = 8,
        /**
         * 热更新失败
         */
        UPDATE_FAILED = 9,

        /**
         * 
         */
        ERROR_DECOMPRESS = 10
    }
    export const reflection;
    export const fileUtils: FileUtils;
    class FileUtils {
        /**
         * 获取搜索路径
         */
        getSearchPaths();
        /**
         * 设置搜索路径
         * @param paths 搜索路径
         */
        setSearchPaths(paths: any);
        getWritablePath(): string;
        getStringFromFile(path: string);
        fullPathForFilename(filename: string): string;
    }
    export class Manifest {
        constructor(content: string, manifestRoot?: string)
        getSearchPaths();
        getVersion();
        /** @brief Gets remote package url.
        */
        getPackageUrl(): string;

        /** @brief Gets remote manifest file url.
         */
        getManifestFileUrl(): string;

        /** @brief Gets remote version file url.
         */
        getVersionFileUrl(): string;
        /**
        *  @brief Check whether the manifest have been fully loaded
         */
        isLoaded(): boolean;
    }
    export class AssetsManager {
        /**
         * 
         * @param manifestUrl 本地Manifest 文件路径。
         * @param storagePath 
         * @param handle 
         */
        constructor(manifestUrl: string, storagePath: string, handle: Function);
        public static State;
        /**
         * 设置事件回调
         * @param cb 回调函数
         */
        setEventCallback(cb: Function);
        /**
         * 获取本地的热更新文件
         */
        getLocalManifest(): Manifest;
        /**
         * 获取远程的热更新文件
         */
        getRemoteManifest(): Manifest;
        getState();
        /**
         * 加载本地版本控制资源文件
         * @param url 版本资源文件路径
         */
        loadLocalManifest(manifest: Manifest | string, manifestRoot: string);
        loadLocalManifest(manifest: Manifest, manifestRoot: string);
        loadLocalManifest(url: string);
        /**
         * 加载远程热更新资源配置文件
         * @param remoteManifest
         */
        loadRemoteManifest(remoteManifest: Manifest);
        /**
         *这个接口调用之后，会重新进入热更新流程，
          仅下载之前失败的资源，整个流程是和正常的热更新流程一致的。
         */
        downloadFailedAssets();
        /**
         * 检查是否需要更新
         */
        checkUpdate();
        /**
         * 开始热更新资源
         */
        update();
        /**
         * 由于下载过程中仍然有小概率可能由于网络原因或其他网络库的问题导致下载的文件内容有问题，
         * 所以我们提供了用户文件校验接口，
         * 在文件下载完成后热更新管理器会调用这个接口（用户实现的情况下），
         * 如果返回 true 表示文件正常，返回 false 表示文件有问题
         * @param func 校验函数
         */
        setVerifyCallback(func: (path: string, asset: AssetItem) => boolean);
        /**
         * 热更新管理器添加了控制下载并发数量的 API，使用方式如下：
         * @param taskCnt 多少条线程
         */
        setMaxConcurrentTask(taskCnt: number);
        protected downloadVersion();
    }
    export interface ManifestData {
        packageUrl: string;
        remoteManifestUrl: string;
        remoteVersionUrl: string;
        version: string;
        packageVersion: string;
        assets: string;
        searchPaths: string;[];
    }
}
interface AssetItem {
    /**
     * 是否压缩文件
     */
    compressed: boolean;
    md5: string;
    path: string;
    size: number;
}