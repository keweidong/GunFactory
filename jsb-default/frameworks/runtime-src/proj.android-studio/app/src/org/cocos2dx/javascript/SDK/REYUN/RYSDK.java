package org.cocos2dx.javascript.SDK.REYUN;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.javascript.service.SDKClass;


import com.gzqidong.bbqgame.BuildConfig;
import com.reyun.tracking.sdk.Tracking;
import android.provider.Settings;



public class RYSDK extends SDKClass {
    private static RYSDK mInstace = null;
    public static RYSDK getInstance() {
        return mInstace;
    }

    //用户新建存档(用户注册)
    public  static  void newUser(){

        Tracking.setRegisterWithAccountID(Tracking.getDeviceId());
//        Tracking.setLoginSuccessBusiness(Tracking.getDeviceId());
        //System.out.println("Tracking输入日志信息--注册");
    }

    /**
     * 自定义事件
     * @param eventName 事件名
     */
    public  static  void setEvent(String eventName){
        System.out.println("自定义事件1:"+eventName);
        Tracking.setEvent(eventName);
//        Tracking.setLoginSuccessBusiness(Tracking.getDeviceId());
        System.out.println("自定义事件2:"+eventName);
    }


    //用户登录
    public  static  void register(){
        Tracking.setLoginSuccessBusiness(Tracking.getDeviceId());
        //System.out.println("Tracking输入日志信息--登录");
    }

    @Override
    public void init(AppActivity context){
        super.init(context);
        System.out.println("Tracking输入日志信息--注册1:");
        mInstace = this;
        //热云初始化
        Tracking.initWithKeyAndChannelId(context.getApplication(), BuildConfig.RY_KEY,"_default_");
//        Tracking.setRegisterWithAccountID(Tracking.getDeviceId());
//        Tracking.setLoginSuccessBusiness(Tracking.getDeviceId());
        //Tracking.setRegisterWithAccountID(Tracking.getDeviceId());
       // Tracking.setLoginSuccessBusiness(Tracking.getDeviceId());
//       System.out.println("Tracking输入日志信息--注册2:"+ Tracking.getDeviceId());
        //热云测试
//        Tracking.setDebugMode(true);
        //热云登录
        //Tracking.setLoginSuccessBusiness(Tracking.getDeviceId());
        //System.out.println("Tracking输入日志信息，初始化");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        SDKWrapper.getInstance().onDestroy();
        //热云退出sdk
        Tracking.exitSdk();
        //Tracking.setDebugMode(true);
        //System.out.println("Tracking输入日志信息，退出游戏");
    }


}
