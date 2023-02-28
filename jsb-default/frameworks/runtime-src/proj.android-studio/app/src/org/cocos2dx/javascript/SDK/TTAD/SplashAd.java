package org.cocos2dx.javascript.SDK.TTAD;
import android.graphics.PixelFormat;
import android.support.annotation.MainThread;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTSplashAd;

public class SplashAd {
    TTAdNative mTTAdNative;
    private String adId;
    //开屏广告是否已经加载
    private boolean mHasLoaded;
    private static final  String TAG  = "SplashAd";
    private static final int AD_TIME_OUT = 3000;

    private  RelativeLayout mSplashContainer;
    //开屏广告加载发生超时但是SDK没有及时回调结果的时候，做的一层保护。
//    private final WeakHandler mHandler = new WeakHandler(this);
    /**
     * 开屏广告
     * @param id 广告id
     */
    public  void initSplashAd(String id){
        this.adId = id;
        mSplashContainer = TTSDK.getInstance().getContainer();
        this.mTTAdNative =TTSDK.getInstance().manager.createAdNative(TTSDK.getInstance().getContext().getApplicationContext());//baseContext建议为activity
    }

    /**
     * 展示激励广告
     */
    public  void  loadSplashAd(){
        AdSlot adSlot = new AdSlot.Builder()
                .setCodeId("887305904")
                .setSupportDeepLink(true)
                .setImageAcceptedSize(1080, 1920)
                .build();
        mTTAdNative.loadSplashAd(adSlot, new TTAdNative.SplashAdListener() {
            @Override
            @MainThread
            public void onError(int code, String message) {
                Log.d(TAG, message);
                mHasLoaded = true;
//                showToast(message);
//                goToMainActivity();
            }

            @Override
            @MainThread
            public void onTimeout() {
                mHasLoaded = true;
//                showToast("开屏广告加载超时");
//                goToMainActivity();
            }

            @Override
            @MainThread
            public void onSplashAdLoad(TTSplashAd ad) {
                Log.d(TAG, "开屏广告请求成功");
                mHasLoaded = true;
//                mHandler.removeCallbacksAndMessages(null);
                if (ad == null) {
                    return;
                }
                //获取SplashView
                View view = ad.getSplashView();

                mSplashContainer.removeAllViews();
                //把SplashView 添加到ViewGroup中
                mSplashContainer.addView(view);
                //设置SplashView的交互监听器
                ad.setSplashInteractionListener(new TTSplashAd.AdInteractionListener() {
                    @Override
                    public void onAdClicked(View view, int type) {
                        Log.d(TAG, "onAdClicked");
//                        showToast("开屏广告点击");
                    }

                    @Override
                    public void onAdShow(View view, int type) {
                        Log.d(TAG, "onAdShow");
//                        showToast("开屏广告展示");
                    }

                    @Override
                    public void onAdSkip() {
                        Log.d(TAG, "onAdSkip");
//                        mSplashContainer.removeAllViews();
//                        showToast("开屏广告跳过");
                        goToMainActivity();

                    }

                    @Override
                    public void onAdTimeOver() {
                        Log.d(TAG, "onAdTimeOver");
//                        showToast("开屏广告倒计时结束");
                        goToMainActivity();
                    }
                });
            }
        }, AD_TIME_OUT);
        // 一定要在 GL 线程中执行
//        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
//            @Override
//            public void run() {
//
//            }
//        });

    }

    /**
     * 跳转到主页面
     */
    private void goToMainActivity() {
        mSplashContainer.removeAllViews();
    }
    public void loadRewardVideoAd(){

    }
}
