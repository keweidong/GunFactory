package org.cocos2dx.javascript.SDK.TTAD;

import android.content.Context;
import android.widget.RelativeLayout;

import com.bytedance.sdk.openadsdk.TTAdConfig;
import com.bytedance.sdk.openadsdk.TTAdConstant;
import com.bytedance.sdk.openadsdk.TTAdManager;
import com.bytedance.sdk.openadsdk.TTAdSdk;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.service.SDKClass;

/**
 * 穿山甲广告sdk
 */
public class TTSDK extends SDKClass {
    RewardVideoAd mttRewardVideoAd;
    InteractionExpressAd interactionExpressAd;
    FullScreenVideoAd mttFullScreenVideoAd;
    SplashAd splashAd;

    private RelativeLayout mContainer;

    NativeExpressAd nativeExpressAd;
    public  static   TTAdManager manager;
    private static TTSDK mInstace = null;
    private static  boolean _isInit = false;
    public static TTSDK getInstance() {
        return mInstace;
    }
    public RelativeLayout getContainer(){
        if(mContainer == null){
            mContainer = this.getContext().creatrView();
        }
        return mContainer;
    }
    /**
     * 展示激励广告
     */
    public static  void  showRewardVideoAd(){
        // 一定要在 GL 线程中执行
        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mInstace.mttRewardVideoAd.showRewardVideoAd();
            }
        });
    }
    /**
     * 初始化激励广告
     * @param id 广告id
     * @param adCnt 预加载广告数量
     */
    public static void initRewardVideoAd(final String id,final int adCnt){

        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mInstace.mttRewardVideoAd = new RewardVideoAd();
                mInstace.mttRewardVideoAd.initRewardVideoAd(id, adCnt);
            }
        });
    }


    /**
     * 初始化插屏广告
     * @param id 广告id
     * @param adCnt 预加载广告数量
     */
    public static void initInteractionExpressAd(final String id,final int adCnt,final int expressViewWidth,final int expressViewHeight){
        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mInstace.interactionExpressAd = new InteractionExpressAd();
                mInstace.interactionExpressAd.initAd(id, adCnt, expressViewWidth,expressViewHeight );
            }
        });
    }

    /**
     * 展示插屏广告
     */
    public static  void  showInteractionExpressAd(){
        // 一定要在 GL 线程中执行
        System.out.println("插屏广告-展示");
        mInstace.interactionExpressAd.showAd();
    }

//    InteractionExpressAd

    public  static  void loadRewardVideoAd(){
        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mInstace.mttRewardVideoAd.loadRewardVideoAd();
            }
        });

    }
    /**
     * 根据屏幕的分辨率从 dp 的单位 转成为 px(像素)
     */
    public static int dip2px(float dpValue) {
        final float scale = mInstace.getContext().getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据屏幕的分辨率从 px(像素) 的单位 转成为 dp
     */
    public static int px2dip( float pxValue) {
        final float scale = mInstace.getContext().getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

    public static void showSplashAd(){
//        mInstace.splashAd =  new SplashAd();
//        mInstace.splashAd.initSplashAd("");
//        mInstace.splashAd.loadSplashAd();


    }

    /**
     * 展示全屏广告
     */
    public static  void  showFullScreenVideoAd(){
        // 一定要在 GL 线程中执行
        System.out.println("全屏广告-展示");
        mInstace.mttFullScreenVideoAd.showFullScreenVideoAd();
    }

    /**
     * 初始化信息流广告
     * @param id 广告id
     * @param width
     * @param height
     */
    public static void initExpressAd(String id, int width, int height){
        mInstace.nativeExpressAd = new NativeExpressAd();

        mInstace.nativeExpressAd.init(id, 1, px2dip(width),px2dip(height));
//        mInstace.nativeExpressAd.loadAd();
    }
    /***
     * 初始化全屏广告
     * @param id 广告id
     * @param adCnt 预加载广告数量
     */
    public static void initFullScreenVideoAd(String id, int adCnt){
        System.out.println("全屏广告-初始化");
        mInstace.mttFullScreenVideoAd = new FullScreenVideoAd();
        mInstace.mttFullScreenVideoAd.initFullScreenVideoAd(id, adCnt);
    }
    public  static  void loadFullScreenVideoAd(){
        System.out.println("全屏广告-加载化");
        mInstace.mttFullScreenVideoAd.loadFullScreenVideoAd();
    }

    public static void  requestPermissionIfNecessary(){
        mInstace.manager.requestPermissionIfNecessary(mInstace.getContext());
    }

    public static void initTTSDK(final String id,final boolean isDebug,final boolean isMultiProcess){
//        TTAdSdk.requestPermissionIfNecessary(mInstace.getContext());
//        id = "5036167";5036596
//        id = "5036167";
        if(_isInit){
            return;
        }
        _isInit = true;
        System.out.println("ttt初始化广告sdk");
//        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
//            @Override
//            public void run() {
//                mInstace.manager = TTAdSdk.init(mInstace.getContext(),
//                        new TTAdConfig.Builder()
//                                .appId(id)
//                                .useTextureView(true) //使用TextureView控件播放视频,默认为SurfaceView,当有SurfaceView冲突的场景，可以使用TextureView                                          `
//                                .appName("天天美食街")
//                                .titleBarTheme(TTAdConstant.TITLE_BAR_THEME_DARK)
//                                .allowShowNotify(true) //是否允许sdk展示通知栏提示
//                                .allowShowPageWhenScreenLock(true) //是否在锁屏场景支持展示广告落地页
//                                .debug(true) //测试阶段打开，可以通过日志排查问题，上线时去除该调用
//                                .directDownloadNetworkType(TTAdConstant.NETWORK_STATE_WIFI, TTAdConstant.NETWORK_STATE_3G, TTAdConstant.NETWORK_STATE_4G) //允许直接下载的网络状态集合
//                                .supportMultiProcess(isMultiProcess) //是否支持多进程，true支持
//                                //.httpStack(new MyOkStack3())//自定义网络库，demo中给出了okhttp3版本的样例，其余请自行开发或者咨询工作人员。
//                                .build());
//
//                mInstace.manager.requestPermissionIfNecessary(mInstace.getContext());
////                showSplashAd();
////                mInstace.mttRewardVideoAd = new RewardVideoAd();
////                mInstace.mttRewardVideoAd.initRewardVideoAd("936167584", 1);
////                mInstace.mttRewardVideoAd.loadRewardVideoAd();
//            }
//        });
    }

    @Override
    public void init(AppActivity context){
        super.init(context);
        mInstace = this;
        System.out.println("穿山甲输入日志信息");

//        initTTSDK("5036167", false, false);
    }
}
