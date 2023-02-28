package org.cocos2dx.javascript.service;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.opengl.GLSurfaceView;
import android.os.Bundle;

import org.cocos2dx.javascript.AppActivity;

public abstract class SDKClass implements SDKInterface {
    private AppActivity mainActive = null;
    public AppActivity getContext(){ return mainActive;}
    @Override
    public void init(AppActivity context){ this.mainActive = context; }
    @Override
    public void setGLSurfaceView(GLSurfaceView view){}
    @Override
    public void onResume(){}
    @Override
    public void onPause(){}
    @Override
    public void onDestroy(){}
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data){}
    @Override
    public void onNewIntent(Intent intent){}
    @Override
    public void onRestart(){}
    @Override
    public void onStop(){}
    @Override
    public void onBackPressed(){}
    @Override
    public void onConfigurationChanged(Configuration newConfig){}
    @Override
    public void onRestoreInstanceState(Bundle savedInstanceState){}
    @Override
    public void onSaveInstanceState(Bundle outState){}
    @Override
    public void onStart(){}
}
