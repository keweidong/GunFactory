package org.cocos2dx.javascript.SDK.WXSDK;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.widget.Toast;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.javascript.service.SDKClass;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;


public class WXSDK extends SDKClass {
    private static WXSDK mInstace = null;
    public static WXSDK getInstance() {
        return mInstace;
    }
    // APP_ID 替换为你的应用从官方网站申请到的合法appID
    public static final String APP_ID = "wx915b9535bfe872d0";
    // IWXAPI 是第三方app和微信通信的openApi接口
    private IWXAPI api;
    public IWXAPI getIWXAPI(){
        System.out.println("微信 获取微信sdk API");
        return api;
    }
    private void regToWx(AppActivity context) {
        // 通过WXAPIFactory工厂，获取IWXAPI的实例
        api = WXAPIFactory.createWXAPI(context, APP_ID, true);

        // 将应用的appId注册到微信
        api.registerApp(APP_ID);

        //建议动态监听微信启动广播进行注册到微信
        context.registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                // 将该app注册到微信
                api.registerApp(WXSDK.APP_ID);
            }
        }, new IntentFilter(ConstantsAPI.ACTION_REFRESH_WXAPP));
    }
    public static void wxLogin(){
        System.out.println("微信sdk输入日志信息:调起登录");
        SendAuth.Req req = new SendAuth.Req();
        req.scope = "snsapi_userinfo";
        req.state = "longli_wx_login";
        WXSDK.getInstance().getIWXAPI().sendReq(req);    //此方法将调起微信
    }
//    public static void goToWX(String upplayerid){
////        String appId = WXSDK.getInstance().APP_ID;//"wx5e1eeff8a20c06eb"; // 填应用AppId
////        IWXAPI api = WXAPIFactory.createWXAPI(WXSDK.getInstance().getContext(), appId);
////        System.out.println("微信sdk输入日志信息，调用跳转公众号");
////        WXLaunchMiniProgram.Req req = new WXLaunchMiniProgram.Req();
////        req.userName = "gh_0d5785c54abe"; // 填小程序原始id
//////        req.path = path;                  ////拉起小程序页面的可带参路径，不填默认拉起小程序首页，对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"。
////        req.miniprogramType = WXLaunchMiniProgram.Req.MINIPTOGRAM_TYPE_RELEASE;// 可选打开 开发版，体验版和正式版
////        api.sendReq(req);
////      Toast.makeText(WXSDK.getInstance().getContext(),"微信未安装", Toast.LENGTH_SHORT).show();
//        //小程序类分享
////        WXMiniProgramObject miniProgramObj = new WXMiniProgramObject();
////        miniProgramObj.webpageUrl = "https://wxweb.gzqidong.cn"; // 兼容低版本的网页链接
////        miniProgramObj.miniprogramType = WXMiniProgramObject.MINIPTOGRAM_TYPE_RELEASE;// 正式版:0，测试版:1，体验版:2
////        miniProgramObj.userName = "gh_6ecd40cd8506";     // 小程序原始id
//////        miniProgramObj.path = "";            //小程序页面路径；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"
////        WXMediaMessage msg = new WXMediaMessage(miniProgramObj);
////        Bitmap thumb = BitmapFactory.decodeResource(WXSDK.getInstance().getContext().getResources(), R.mipmap.share_icon);
////        Bitmap thumbImg = Bitmap.createScaledBitmap(thumb, 72, 72, true);
////        msg.thumbData =  WXSDK.getInstance().bmpToByteArray(thumbImg, true);
////        msg.title = "小程序消息Title";                    // 小程序消息title
////        msg.description = "小程序消息Desc";               // 小程序消息desc
//////        msg.thumbData = getThumb();                      // 小程序消息封面图片，小于128k
////
////        SendMessageToWX.Req req = new SendMessageToWX.Req();
////        req.transaction = WXSDK.getInstance().buildTransaction("miniProgram");
////        req.message = msg;
////        req.scene = SendMessageToWX.Req.WXSceneSession;  // 目前只支持会话
////        WXSDK.getInstance().getIWXAPI().sendReq(req);
//        //网页类分享
//        //初始化一个WXWebpageObject，填写url
//        WXWebpageObject webpage = new WXWebpageObject();
//        webpage.webpageUrl ="https://cudeadmin.gzqidong.cn/wxweb/public/index.php/main/login/index?upplayerid="+upplayerid;
//
////用 WXWebpageObject 对象初始化一个 WXMediaMessage 对象
//        WXMediaMessage msg = new WXMediaMessage(webpage);
//        msg.title ="方块消消 ";
//        msg.description ="方块消消助手：受邀玩家进入游戏微信登录授权后，邀请方可增加积分提现哦！";
//        Bitmap thumbBmp = BitmapFactory.decodeResource(WXSDK.getInstance().getContext().getResources(), R.mipmap.share_icon);
//        msg.thumbData =WXSDK.getInstance().bmpToByteArray(thumbBmp, true);
//
////构造一个Req
//        SendMessageToWX.Req req1 = new SendMessageToWX.Req();
//        req1.transaction = WXSDK.getInstance().buildTransaction("webpage");
//        req1.message =msg;
//        req1.scene =SendMessageToWX.Req.WXSceneSession;;
////        req1.userOpenId = getOpenId();
//
////调用api接口，发送数据到微信
//        WXSDK.getInstance().getIWXAPI().sendReq(req1);
//        System.out.println("微信sdk输入日志信息，调用跳转公众号完成");
//    }
    public static boolean isWXAppInstalled(){
        System.out.println("微信sdk输入日志信息:是否安装微信");
        if (!WXSDK.getInstance().getIWXAPI().isWXAppInstalled()) {    //调用此方法判断是否安装了微信
//            Toast.makeText(this, '未安装微信客户端，无法使用微信登录', Toast.LENGTH_SHORT).show();
            System.out.println("微信sdk输入日志信息:没有安装微信");
            return false;
        }
        System.out.println("微信sdk输入日志信息:安装微信");
        return true;
    }
//    public static void shareWx(String message) {
//        try {
////            let sendWXInfo = {   // todo 本地传过来的结构
////                    type:type,
////                    //安卓微信sdk分享:类型:1,txt 文本;2,img 图片;
////                    // type ========  txt/img
////                    // [txt]  text  文本(不超过10k)		 安卓内判断字段:暂无,直接给title,description
////                    // [img]  imagePath  图片的本地路径   安卓内判断字段:path
////                    type:shareMode,
////                    // title  标题
////                    title: title,
////                    // description  描述
////                    description: shareInfo.description,
////                    // scene 0:好友,1:朋友圈
////                    scene:sharePath,
////                    // url  分享携带连接,当前只在txt有用,图片以后再补充
////                    url: url
////			}
//            JSONObject json = new JSONObject(message);
//            String shareMode = json.getString("type");
//
//            System.out.println("debug_log=>"+message);
//            if (shareMode.equals("txt")) {
//                //文字分享
//                WXWebpageObject webpage = new WXWebpageObject();
//                int scene = json.getInt("scene");
//                WXMediaMessage msg = new WXMediaMessage(webpage);
//                webpage.webpageUrl = json.getString("url");
//                if (scene == SendMessageToWX.Req.WXSceneSession) {//分享给好友
//                    msg.description = json.getString("description");
//                    msg.title = json.getString("title");
//                } else {//分享到朋友圈
//                    msg.title = json.getString("description");
//                }
//
//                Bitmap thumb = BitmapFactory.decodeResource(WXSDK.getInstance().getContext().getResources(), R.mipmap.share_icon);
//                Bitmap thumbImg = Bitmap.createScaledBitmap(thumb, 72, 72, true);
//                msg.thumbData =  WXSDK.getInstance().bmpToByteArray(thumbImg, true);
//                thumb.recycle();
//                SendMessageToWX.Req req = new SendMessageToWX.Req();
//                req.transaction =  WXSDK.getInstance().buildTransaction("webpage");
//                req.message = msg;
//                req.scene = scene;
//                WXSDK.getInstance().getIWXAPI().sendReq(req);
//            } else if (shareMode.equals("img")) {
//                //图片分享
//                String filename = json.getString("url");
//                String path = filename;
//                File file = new File(path);
//                if (!file.exists()) {
//                    System.out.println("debug_log=>"+"图片不存在！");
//                    Toast.makeText( WXSDK.getInstance().getContext(), "图片不存在！", Toast.LENGTH_LONG).show();
//                    return;
//                }
//                WXImageObject imgObj = new WXImageObject();
//                imgObj.setImagePath(path);
//                WXMediaMessage msg = new WXMediaMessage();
//                msg.mediaObject = imgObj;
//                Bitmap bmp = BitmapFactory.decodeFile(path);
//                double scale = 50.0 / bmp.getHeight();
//                Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, (int) (bmp.getWidth() * scale), 72, true);
//                bmp.recycle();
//                msg.thumbData = WXSDK.getInstance().bmpToByteArray(thumbBmp, true);
//                SendMessageToWX.Req req = new SendMessageToWX.Req();
//                req.transaction = WXSDK.getInstance().buildTransaction("img");
//                req.message = msg;
//                req.scene = SendMessageToWX.Req.WXSceneSession;
//                WXSDK.getInstance().getIWXAPI().sendReq(req);
//            }else if(shareMode.equals("web")){
//                //网页类分享
//                //初始化一个WXWebpageObject，填写url
//                WXWebpageObject webpage = new WXWebpageObject();
//                webpage.webpageUrl =json.getString("url");
//
//                //用 WXWebpageObject 对象初始化一个 WXMediaMessage 对象
//                WXMediaMessage msg = new WXMediaMessage(webpage);
//                msg.title =json.getString("title");
//                msg.description =json.getString("description");
//                Bitmap thumbBmp = BitmapFactory.decodeResource(WXSDK.getInstance().getContext().getResources(), R.mipmap.share_icon);
//                msg.thumbData =WXSDK.getInstance().bmpToByteArray(thumbBmp, true);
//
//                //构造一个Req
//                SendMessageToWX.Req req1 = new SendMessageToWX.Req();
//                req1.transaction = WXSDK.getInstance().buildTransaction("webpage");
//                req1.message =msg;
//                req1.scene =SendMessageToWX.Req.WXSceneSession;;
//            }
//        } catch (JSONException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//    }
    private String buildTransaction(final String type) {
        return (type == null) ? String.valueOf(System.currentTimeMillis()) : type + System.currentTimeMillis();
    }
    public static byte[] bmpToByteArray(final Bitmap bmp, final boolean needRecycle) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.PNG, 100, output);
        if (needRecycle) {
            bmp.recycle();
        }

        byte[] result = output.toByteArray();
        try {
            output.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
    @Override
    public void init(AppActivity context){
        super.init(context);
        System.out.println("微信sdk输入日志信息:");
        mInstace = this;
        regToWx(context);
        //System.out.println("Tracking输入日志信息，初始化");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        SDKWrapper.getInstance().onDestroy();
        System.out.println("微信sdk输入日志信息，退出游戏");
    }
}
