package org.cocos2dx.javascript.SDK.TTAD;

import android.content.Context;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTNativeExpressAd;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.util.List;

public class NativeExpressAd {
    TTNativeExpressAd mttRewardVideoAd;
    AdSlot videoAdSlot;
    private RelativeLayout mExpressContainer;
    TTAdNative mTTAdNative = null;
    private String adId;
    /**
     * 初始化激励广告
     * @param id 广告id
     * @param adCnt 预加载广告数量
     * @param expressViewWidth
     * @param expressViewHeight
     */
    public  void init(String id, int adCnt,int expressViewWidth,int expressViewHeight){
        this.adId = id;

        this.videoAdSlot = new AdSlot.Builder()
                .setCodeId(id) //广告位id
                .setSupportDeepLink(true)
                .setAdCount(1) //请求广告数量为1到3条
                .setExpressViewAcceptedSize(expressViewWidth,expressViewHeight) //必填：期望个性化模板广告view的size,单位dp
                .setImageAcceptedSize(640,320) //这个参数设置即可，不影响个性化模板广告的size
                .build();
        if(this.mTTAdNative == null){
            this.mTTAdNative =TTSDK.getInstance().manager.createAdNative(TTSDK.getInstance().getContext().getApplicationContext());//baseContext建议为activity
            mExpressContainer = TTSDK.getInstance().getContainer();
        }
    }

    /**
     * 加载广告
     */
    public void loadAd(final int y){
//        mTTAdNative.loadRewardVideoAd(videoAdSlot, this);
        mTTAdNative.loadNativeExpressAd(videoAdSlot, new TTAdNative.NativeExpressAdListener() {
            @Override
            public void onNativeExpressAdLoad(List<TTNativeExpressAd> ads) {
                if (ads == null || ads.size() == 0){
                    return;
                }
                mttRewardVideoAd = ads.get(0);
                bindAdListener(mttRewardVideoAd, y);
                mttRewardVideoAd.render();//调用render开始渲染广告
            }
            @Override
            public void onError(int code, String message) {
                TTSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.TTSDK.rewardVideo.addADloadFailCallBack();");
                    }
                });
            }
        });
    }

    /**
     * 展示广告
     */
    public void showAd(){
//        bindAdListener(mttRewardVideoAd);
//        mttRewardVideoAd.render();//调用render开始渲染广告
    }
    //绑定广告行为
    private void bindAdListener(TTNativeExpressAd ad,final int y) {
        ad.setExpressInteractionListener(new TTNativeExpressAd.ExpressAdInteractionListener() {
            @Override
            public void onAdClicked(View view, int type) {
//                TToast.show(mContext, "广告被点击");
            }

            @Override
            public void onAdShow(View view, int type) {
//                TToast.show(mContext, "广告展示");
            }

            @Override
            public void onRenderFail(View view, String msg, int code) {
                Log.e("ExpressView",msg+" code:"+code);
//                TToast.show(mContext, msg+" code:"+code);
            }

            @Override
            public void onRenderSuccess(View view, float width, float height) {
                //在渲染成功回调时展示广告，提升体验
                mExpressContainer.removeAllViews();
                RelativeLayout.LayoutParams layoutParams = (RelativeLayout.LayoutParams)mExpressContainer.getLayoutParams();
                layoutParams.topMargin = y;
                WindowManager wm = (WindowManager)TTSDK.getInstance().getContext().getSystemService(Context.WINDOW_SERVICE);
                layoutParams.leftMargin =  wm.getDefaultDisplay().getWidth() / 2;

//                mExpressContainer.setLayoutParams(layoutParams);
                mExpressContainer.addView(view);
//                mExpressContainer.set
            }
        });
        //dislike设置
//        bindDislike(ad, false);
//        if (ad.getInteractionType() != TTAdConstant.INTERACTION_TYPE_DOWNLOAD){
//            return;
//        }
//        //可选，下载监听设置
//        ad.setDownloadListener(new TTAppDownloadListener() {
//            @Override
//            public void onIdle() {
//                TToast.show(NativeExpressActivity.this, "点击开始下载", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onDownloadActive(long totalBytes, long currBytes, String fileName, String appName) {
//                if (!mHasShowDownloadActive) {
//                    mHasShowDownloadActive = true;
//                    TToast.show(NativeExpressActivity.this, "下载中，点击暂停", Toast.LENGTH_LONG);
//                }
//            }
//
//            @Override
//            public void onDownloadPaused(long totalBytes, long currBytes, String fileName, String appName) {
//                TToast.show(NativeExpressActivity.this, "下载暂停，点击继续", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onDownloadFailed(long totalBytes, long currBytes, String fileName, String appName) {
//                TToast.show(NativeExpressActivity.this, "下载失败，点击重新下载", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onInstalled(String fileName, String appName) {
//                TToast.show(NativeExpressActivity.this, "安装完成，点击图片打开", Toast.LENGTH_LONG);
//            }
//
//            @Override
//            public void onDownloadFinished(long totalBytes, String fileName, String appName) {
//                TToast.show(NativeExpressActivity.this, "点击安装", Toast.LENGTH_LONG);
//            }
//        });
    }
}
