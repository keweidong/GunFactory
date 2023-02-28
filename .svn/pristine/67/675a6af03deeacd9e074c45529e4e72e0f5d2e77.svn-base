package org.cocos2dx.javascript.SDK.TTAD;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.TTAdConstant;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTAdSdk;
import com.bytedance.sdk.openadsdk.TTFullScreenVideoAd;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

public class FullScreenVideoAd implements TTAdNative.FullScreenVideoAdListener {
    TTFullScreenVideoAd mttFullScreenVideoAd;
    AdSlot videoAdSlot;
    TTAdNative mTTAdNative;

    /**
     * 初始化全屏广告
     *
     * @param id    广告id
     * @param adCnt 预加载广告数量
     */
    public void initFullScreenVideoAd(String id, int adCnt) {
        System.out.println("全屏广告广告展示-initFullScreen");
        this.videoAdSlot = new AdSlot.Builder()
                .setCodeId(id)
                .setSupportDeepLink(true)
                .setAdCount(adCnt)
                .setImageAcceptedSize(1080, 1920)
                .setOrientation(TTAdConstant.VERTICAL)
                .build();
        //.setRewardName("金币") //奖励的名称
//                .setRewardAmount(3)   //奖励的数量
        //必传参数，表来标识应用侧唯一用户；若非服务器回调模式或不需sdk透传
        //可设置为空字符串
        //.setUserID("")
//                .setOrientation(orientation)  //设置期望视频播放的方向，为TTAdConstant.HORIZONTAL或TTAdConstant.VERTICAL
//                .setMediaExtra("media_extra") //用户透传的信息，可不传
        //.build();
        this.mTTAdNative = TTAdSdk.getAdManager().createAdNative(TTSDK.getInstance().getContext());//baseContext建议为activity
    }

    /**
     * 展示全屏广告
     */
    public void showFullScreenVideoAd() {
        System.out.println("全屏广告广告展示-展示全屏");
        // 一定要在 GL 线程中执行
        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (FullScreenVideoAd.this.mttFullScreenVideoAd != null) {
                    FullScreenVideoAd.this.mttFullScreenVideoAd.showFullScreenVideoAd(TTSDK.getInstance().getContext());
                } else {
                    //Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADCloesCallBack(1);");
                }
            }
        });
    }

    public void loadFullScreenVideoAd() {
        mTTAdNative.loadFullScreenVideoAd(videoAdSlot, this);
    }

    @Override
    public void onError(int code, String message) {
        System.out.println("全屏广告广告展示-Error");
        TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADloadFailCallBack();");
            }
        });
    }

    //视频广告加载后的视频文件资源缓存到本地的回调
    @Override
    public void onFullScreenVideoCached() {
        //加载成功回调
        //Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADLoadSuccessCallBack();");
    }

    //视频广告素材加载到，如title,视频url等，不包括视频文件
    @Override
    public void onFullScreenVideoAdLoad(TTFullScreenVideoAd ad) {
//        TToast.show(FullScreenVideoActivity.this, "FullVideoAd loaded");
        mttFullScreenVideoAd = ad;
        mttFullScreenVideoAd.setFullScreenVideoAdInteractionListener(new TTFullScreenVideoAd.FullScreenVideoAdInteractionListener() {

            @Override
            public void onAdShow() {
                    //广告展示
                System.out.println("全屏广告广告展示-展示");
            }

            @Override
            public void onAdVideoBarClick() {
                //
            }

            @Override
            public void onAdClose() {
                //
                System.out.println("全屏广告广告展示-关闭");
                TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADCloesCallBack(0);");
                    }
                });
            }

            @Override
            public void onVideoComplete() {
                    //完成
                System.out.println("全屏广告广告展示-完成");
                //Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADCloesCallBack(0);");
            }

            @Override
            public void onSkippedVideo() {
                //跳过
                System.out.println("全屏广告广告展示-跳过");
                TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADSkinCallBack(true);");
                    }
                });
                //Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADloadFailCallBack();");
                //Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.fullScreenVideo.addADSkinCallBack(true);");

            }

        });
    }
}

