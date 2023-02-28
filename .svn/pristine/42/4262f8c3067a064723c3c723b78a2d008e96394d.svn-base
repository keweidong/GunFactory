package org.cocos2dx.javascript.SDK;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.service.SDKClass;
import org.cocos2dx.javascript.utils.CheckNotch;

import android.content.Intent;
import android.net.Uri;
import android.os.Vibrator;

import com.gzqidong.bbqgame.BuildConfig;


/**
 * 用于被js端调用的静态类
 */
public class GameBridge extends SDKClass {
    private static GameBridge mInstace = null;
    @Override
    public void init(AppActivity context) {
        super.init(context);
        mInstace = this;
    }


    public  static  boolean checkNotch(){
        return  CheckNotch.hasNotchScreen(mInstace.getContext());
    }

    /**
     * 震动
     * @param time 多少毫秒
     */
    public static void vibrator(int time){
        Vibrator vibrator = (Vibrator)mInstace.getContext().getSystemService(mInstace.getContext().VIBRATOR_SERVICE);
        vibrator.vibrate(time);
    }
    /**
     * 是否允许自动弹出插屏广告
     */
    public static boolean isAutoShowInteractionAd(){
        return  BuildConfig.SHOW_INTERATION;
    }

    /**
     * 退出游戏
     */
    public static void exitGame(){
//        for (Activity activity : ParameterSetActivity.activityList) {
//            mInstace.getContext().finish();
//        }
//        System.exit(0);
    }

    /**
     * 获取游戏渠道名
     * @return 渠道名
     */
    public  static String getChannel(){
        return BuildConfig.CHANNEL;
    }

    /**
     * 在浏览器打开链接
     * @param url 要打开的链接
     */
    public static void openUrl(String url){
        Intent intent = new Intent();
        intent.setAction("android.intent.action.VIEW");
        Uri content_url = Uri.parse(url);
        intent.setData(content_url);
        mInstace.getContext().startActivity(intent);
    }

    /**
     * 获取包体的版本号
     */
    public  static String getPacketVersion(){
        return "";
    }
}
