package com.grigor.ygdriver;

import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "YG-Driver";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this, R.style.BootTheme);
    super.onCreate(null);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}
