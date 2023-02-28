package org.cocos2dx.javascript.SDK.TTAD;

import android.view.View;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTNativeExpressAd;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.util.List;

public class InteractionExpressAd {
    private String adId = null;
    AdSlot adSlot;
    TTAdNative mTTAdNative;

    private TTNativeExpressAd mTTAd;
    /**
     * 初始化激励广告
     * @param id 广告id
     * @param adCnt 预加载广告数量
     */
    public  void initAd(String id, int adCnt, int expressViewWidth, int expressViewHeight){
//        id = "936167584";
//                id = "945015032";
        this.adId = id;
        adSlot = new AdSlot.Builder()
                .setCodeId(id) //广告位id
                .setSupportDeepLink(true)
                .setAdCount(1) //请求广告数量为1到3条
                .setExpressViewAcceptedSize(expressViewWidth,expressViewHeight) //期望个性化模板广告view的size,单位dp
                .setImageAcceptedSize(640,320 )//这个参数设置即可，不影响个性化模板广告的size
                .build();
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

        mTTAdNative =TTSDK.getInstance().manager.createAdNative(TTSDK.getInstance().getContext().getApplicationContext());//baseContext建议为activity

    }
    /**
     * 展示激励广告
     */
    public  void  showAd(){
        if(mTTAd != null){
            return;
        }
        // 一定要在 GL 线程中执行
        TTSDK.getInstance().getContext().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mTTAdNative.loadInteractionExpressAd(adSlot, new TTAdNative.NativeExpressAdListener() {
                    @Override
                    public void onError(int code, String message) {
//                TToast.show(InteractionExpressActivity.this, "load error : " + code + ", " + message);
                    }

                    @Override
                    public void onNativeExpressAdLoad(List<TTNativeExpressAd> ads) {
                        if (ads == null || ads.size() == 0){
                            return;
                        }
                        mTTAd = ads.get(0);
                        bindAdListener(mTTAd);
        //                startTime = System.currentTimeMillis();
                        mTTAd.render();
                    }
                });
//                if(RewardVideoAd.this.mttRewardVideoAd != null){
//                    RewardVideoAd.this.mttRewardVideoAd.showRewardVideoAd(TTSDK.getInstance().getContext());
//                    RewardVideoAd.this.mttRewardVideoAd = null;
//                }else{
//                    TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
//                        @Override
//                        public void run() {
//                            Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADCloesCallBack(1);");
//                        }
//                    });
//                }
            }
        });

    }

    private void bindAdListener(TTNativeExpressAd ad) {
        ad.setExpressInteractionListener(new TTNativeExpressAd.AdInteractionListener() {
            @Override
            public void onAdDismiss() {
                if (mTTAd != null) {
                    //调用destroy()方法释放
                    mTTAd.destroy();
                    mTTAd = null;
                }
            }

            @Override
            public void onAdClicked(View view, int type) {

            }

            @Override
            public void onAdShow(View view, int type) {

            }

            @Override
            public void onRenderFail(View view, String msg, int code) {
//                Log.e("ExpressView","render fail:"+(System.currentTimeMillis() - startTime));
//                TToast.show(mContext, msg+" code:"+code);
                if (mTTAd != null) {
                    //调用destroy()方法释放
                    mTTAd.destroy();
                    mTTAd = null;
                }
            }

            @Override
            public void onRenderSuccess(View view, float width, float height) {
//                Log.e("ExpressView","render suc:"+(System.currentTimeMillis() - startTime));
                //返回view的宽高 单位 dp
//                TToast.show(mContext, "渲染成功");
                mTTAd.showInteractionExpressAd(TTSDK.getInstance().getContext());

            }
        });

//        if (ad.getInteractionType() != TTAdConstant.INTERACTION_TYPE_DOWNLOAD){
//            return;
//        }
//        ad.setDownloadListener(new TTAppDownloadListener() {
//            @Override
//            public void onIdle() {
//                TToast.show(InteractionExpressActivity.this, "点击开始下载", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onDownloadActive(long totalBytes, long currBytes, String fileName, String appName) {
//                if (!mHasShowDownloadActive) {
//                    mHasShowDownloadActive = true;
//                    TToast.show(InteractionExpressActivity.this, "下载中，点击暂停", Toast.LENGTH_LONG);
//                }
//            }
//
//            @Override
//            public void onDownloadPaused(long totalBytes, long currBytes, String fileName, String appName) {
//                TToast.show(InteractionExpressActivity.this, "下载暂停，点击继续", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onDownloadFailed(long totalBytes, long currBytes, String fileName, String appName) {
//                TToast.show(InteractionExpressActivity.this, "下载失败，点击重新下载", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onInstalled(String fileName, String appName) {
//                TToast.show(InteractionExpressActivity.this, "安装完成，点击图片打开", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onDownloadFinished(long totalBytes, String fileName, String appName) {
//                TToast.show(InteractionExpressActivity.this, "点击安装", Toast.LENGTH_LONG);
//            }
//        });
    }
}
