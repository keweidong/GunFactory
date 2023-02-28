package com.gzqidong.bbqgame.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.cocos2dx.javascript.SDK.WXSDK.WXSDK;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
    private IWXAPI api;
    public static BaseResp resp = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("Config.WX_APP_ID", WXSDK.getInstance().APP_ID);
        api = WXAPIFactory.createWXAPI(this, WXSDK.getInstance().APP_ID, false);
        api.handleIntent(getIntent(), this);
    }

    // 微信发送请求到第三方应用时，会回调到该方法
    @Override
    public void onReq(BaseReq req) {
        finish();
    }

    // 第三方应用发送到微信的请求处理后的响应结果，会回调到该方法
    @Override
    public void onResp(BaseResp _resp) {
        String result = "";
        String codes = "";
        final JSONObject obj = new JSONObject();
        System.out.println("第三方应用发送到微信的请求处理后的响应结果，会回调到该方法==>");
        if (_resp != null) {
            resp = _resp;
        }
        //跳转小程序
        if (resp.getType() == ConstantsAPI.COMMAND_LAUNCH_WX_MINIPROGRAM) {
            System.out.println("微信sdk返回信息：跳转小程序返回");
            WXLaunchMiniProgram.Resp launchMiniProResp = (WXLaunchMiniProgram.Resp) resp;
            System.out.println("微信sdk返回信息：跳转小程序返回launchMiniProResp::"+launchMiniProResp);
            System.out.println("微信sdk返回信息：跳转小程序返回 errStr::"+launchMiniProResp.errStr);
            System.out.println("微信sdk返回信息：跳转小程序返回 errCode::"+launchMiniProResp.errCode+"::extMsg::"+launchMiniProResp.extMsg+"::openid::"+launchMiniProResp.openId);
            System.out.println("微信sdk返回信息：跳转小程序返回 errCode::"+launchMiniProResp.checkArgs());

            String extraData =launchMiniProResp.extMsg; //对应小程序组件 <button open-type="launchApp"> 中的 app-parameter 属性
            System.out.println("微信sdk返回信息：跳转小程序返回对应小程序组件 <button open-type=\"launchApp\"> 中的 app-parameter 属性::"+extraData);
        }
        //微信授权
        if (resp.getType() == ConstantsAPI.COMMAND_SENDAUTH){
            switch(_resp.errCode) {
                case BaseResp.ErrCode.ERR_OK:
                    System.out.println("微信sdk返回信息：同意授权");
                    result ="0";
                    codes = ((SendAuth.Resp)_resp).code;
                    break;
                case BaseResp.ErrCode.ERR_USER_CANCEL:
                    System.out.println("微信sdk返回信息：取消授权");
                    result = "1";
                    break;
                case BaseResp.ErrCode.ERR_AUTH_DENIED:
                    System.out.println("微信sdk返回信息：拒绝授权");
                    result = "1";
                    break;
                default:
                    System.out.println("微信sdk返回信息：无返回");
                    result = "1";
                    break;
            }
            try {
                obj.put("result", result);
                obj.put("code", codes);
                //todo 改成平台调用
                System.out.println("微信sdk返回信息："+obj.toString());
                System.out.println("微信sdk返回信息11："+"NativeBridge.WXSDK.nativeCallSync(\"wxLogin\",'"+obj.toString()+"');");
                WXSDK.getInstance().getContext().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        System.out.println("微信sdk返回信息1："+obj.toString());
                        Cocos2dxJavascriptJavaBridge.evalString("NativeBridge.WXSDK.nativeCallSync(\"wxLogin\",'"+obj.toString()+"');");
                        System.out.println("微信sdk返回信息2："+obj.toString());
                    }
                });
            } catch (JSONException e) {
                Log.d("QD_DEBUG", "wxLoginCb ==>json构建失败!!");
            }
        }

        switch (resp.errCode) {
            case BaseResp.ErrCode.ERR_OK:
                switch (resp.getType()) {
                    case ConstantsAPI.COMMAND_SENDAUTH:
//						auth(resp);
                        break;
                    case ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX: // 分享给好友、朋友圈
                    case ConstantsAPI.COMMAND_PAY_BY_WX:
                    default:
//					Wechat.instance.getCurrentCallbackContext().success();
                        break;
                }
                break;
            case BaseResp.ErrCode.ERR_USER_CANCEL:
//				 Wechat.instance.getCurrentCallbackContext().error(Wechat.ERROR_WECHAT_RESPONSE_USER_CANCEL);
                break;
            case BaseResp.ErrCode.ERR_AUTH_DENIED:
//				Wechat.instance.getCurrentCallbackContext().error(Wechat.ERROR_WECHAT_RESPONSE_AUTH_DENIED);
                break;
            case BaseResp.ErrCode.ERR_SENT_FAILED:
//				Wechat.instance.getCurrentCallbackContext().error(Wechat.ERROR_WECHAT_RESPONSE_SENT_FAILED);
                break;
            case BaseResp.ErrCode.ERR_UNSUPPORT:
//				Wechat.instance.getCurrentCallbackContext().error(Wechat.ERROR_WECHAT_RESPONSE_UNSUPPORT);
                break;
            case BaseResp.ErrCode.ERR_COMM:
//				Wechat.instance.getCurrentCallbackContext().error(Wechat.ERROR_WECHAT_RESPONSE_COMMON);
                break;
            default:
//				Wechat.instance.getCurrentCallbackContext().error(Wechat.ERROR_WECHAT_RESPONSE_UNKNOWN);
                break;
        }
        finish();
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        api.handleIntent(intent, this);
        finish();
    }
}
