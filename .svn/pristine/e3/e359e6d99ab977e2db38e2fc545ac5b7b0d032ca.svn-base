package org.cocos2dx.javascript.SDK.TTAD;

import android.util.Log;
import android.widget.FrameLayout;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTAdSdk;
import com.bytedance.sdk.openadsdk.TTAppDownloadListener;
import com.bytedance.sdk.openadsdk.TTRewardVideoAd;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

public class RewardVideoAd {
    TTRewardVideoAd mttRewardVideoAd;
    AdSlot videoAdSlot;
    private FrameLayout mExpressContainer;
    TTAdNative mTTAdNative;
    private String adId;
    /**
     * 初始化激励广告
     * @param id 广告id
     * @param adCnt 预加载广告数量
     */
    public  void initRewardVideoAd(String id, int adCnt){
//        id = "936167584";
//                id = "945015032";
        this.adId = id;
//        this.videoAdSlot = new AdSlot.Builder()
//                .setCodeId(id)
//                .setSupportDeepLink(true)
//                .setAdCount(adCnt)
//                .setImageAcceptedSize(1080, 1920)
//                .setRewardName("金币") //奖励的名称
////                .setRewardAmount(3)   //奖励的数量
//                //必传参数，表来标识应用侧唯一用户；若非服务器回调模式或不需sdk透传
//                //可设置为空字符串
//                .setUserID("")
////                .setOrientation(orientation)  //设置期望视频播放的方向，为TTAdConstant.HORIZONTAL或TTAdConstant.VERTICAL
////                .setMediaExtra("media_extra") //用户透传的信息，可不传
//                .build();

        this.mTTAdNative =TTSDK.getInstance().manager.createAdNative(TTSDK.getInstance().getContext().getApplicationContext());//baseContext建议为activity
    }

    /**
     * 展示激励广告
     */
    public  void  showRewardVideoAd(){

        // 一定要在 GL 线程中执行
        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(RewardVideoAd.this.mttRewardVideoAd != null){
                    RewardVideoAd.this.mttRewardVideoAd.showRewardVideoAd(TTSDK.getInstance().getContext());
                    RewardVideoAd.this.mttRewardVideoAd = null;
                }else{
                    TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                        @Override
                        public void run() {
                            Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADCloesCallBack(1);");
                        }
                    });
                }
            }
        });

    }
    public void loadRewardVideoAd(){
        videoAdSlot = new AdSlot.Builder()
                .setCodeId(adId)
                .setSupportDeepLink(true)
                .setAdCount(1)
                .setImageAcceptedSize(1080, 1920)
                .setRewardName("金币") //奖励的名称
                //必传参数，表来标识应用侧唯一用户；若非服务器回调模式或不需sdk透传
                //可设置为空字符串
                .setUserID("")
                .build();
//        mTTAdNative.loadRewardVideoAd(videoAdSlot, this);
        mTTAdNative.loadRewardVideoAd(videoAdSlot, new TTAdNative.RewardVideoAdListener() {
            @Override
            public void onError(int code, String message) {
                TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADloadFailCallBack();");
                    }
                });
            }

            //视频广告加载后，视频资源缓存到本地的回调，在此回调后，播放本地视频，流畅不阻塞。
            @Override
            public void onRewardVideoCached() {
                TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADLoadSuccessCallBack();");
                    }
                });
            }

            //视频广告的素材加载完毕，比如视频url等，在此回调后，可以播放在线视频，网络不好可能出现加载缓冲，影响体验。
            @Override
            public void onRewardVideoAdLoad(TTRewardVideoAd ad) {
                mttRewardVideoAd = ad;
                mttRewardVideoAd.setRewardAdInteractionListener(new TTRewardVideoAd.RewardAdInteractionListener() {
                    @Override
                    public void onAdShow() { }
                    @Override
                    public void onAdVideoBarClick() { }
                    @Override
                    public void onAdClose() {
                        TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                System.out.println("ttt关闭广告");
                                Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADCloesCallBack(-1);");
                            }
                        });
                    }
                    @Override
                    public void onVideoComplete() {
                        System.out.println("ttt观看广告完毕");
                        TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.onShowAdCompleteCb(0);");
                            }
                        });
//
                    }
                    @Override
                    public void onVideoError() {
                        TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADCloesCallBack(1);");
                            }
                        });
                    }
                    @Override
                    public void onRewardVerify(boolean rewardVerify, int rewardAmount, String rewardName) {  }
                    @Override
                    public void onSkippedVideo() {}
                });
                mttRewardVideoAd.setDownloadListener(new TTAppDownloadListener() {
                    @Override
                    public void onIdle() {}
                    @Override
                    public void onDownloadActive(long totalBytes, long currBytes, String fileName, String appName) { }

                    @Override
                    public void onDownloadPaused(long totalBytes, long currBytes, String fileName, String appName) { }

                    @Override
                    public void onDownloadFailed(long totalBytes, long currBytes, String fileName, String appName) {
//                TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
//                    @Override
//                    public void run() {
//                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADloadFailCallBack();");
//                    }
//                });

                    }
                    @Override
                    public void onDownloadFinished(long totalBytes, String fileName, String appName) {}
                    @Override
                    public void onInstalled(String fileName, String appName) {}
                });
            }
        });
    }
}
