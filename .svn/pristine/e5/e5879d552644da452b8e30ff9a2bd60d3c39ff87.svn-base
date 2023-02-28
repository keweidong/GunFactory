package org.cocos2dx.javascript;


import android.app.Application;
import android.util.Log;

import com.bytedance.sdk.openadsdk.TTAdConfig;
import com.bytedance.sdk.openadsdk.TTAdConstant;
import com.bytedance.sdk.openadsdk.TTAdSdk;

import org.cocos2dx.javascript.SDK.TTAD.TTSDK;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        System.out.println("MyApplication 初始化");
        TTSDK.manager =  TTAdSdk.init(getApplicationContext(),
                new TTAdConfig.Builder()
                        .appId("5078305")
                        .useTextureView(true) //使用TextureView控件播放视频,默认为SurfaceView,当有SurfaceView冲突的场景，可以使用TextureView                                          `
                        .appName("有间烧烤店")
                        .titleBarTheme(TTAdConstant.TITLE_BAR_THEME_DARK)
                        .allowShowNotify(true) //是否允许sdk展示通知栏提示
                        .allowShowPageWhenScreenLock(true) //是否在锁屏场景支持展示广告落地页
                        .debug(false) //测试阶段打开，可以通过日志排查问题，上线时去除该调用
                        .directDownloadNetworkType(TTAdConstant.NETWORK_STATE_WIFI, TTAdConstant.NETWORK_STATE_3G, TTAdConstant.NETWORK_STATE_4G) //允许直接下载的网络状态集合
                        .supportMultiProcess(true) //是否支持多进程，true支持
                        //.httpStack(new MyOkStack3())//自定义网络库，demo中给出了okhttp3版本的样例，其余请自行开发或者咨询工作人员。
                        .build());
    }
}