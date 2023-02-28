
// TypeScript file


interface IAdObject {
    /**广告加载完毕调用 */
    onLoadAdComplete?: Function;
    /**广告加载失败调用 */
    onLoadAdFail?: Function;
    /**广告展示完毕调用 */
    onShowAdComplete?: (result: {
        /**播放广告结果，code为0表示播放成功 */
        code: number;
    }) => void;
    /**
     * 广告状态
     */
    adState: number;

    
    /**
     * 加载广告
     */
    load(...args);
    /**
     * 播放广告
     */
    show(index?: number);
    /**
     * 初始化
     */
    init(...args);

    close?();
}
