package com.eachock.agentshop;

import android.app.Application;

import com.eachock.agentshop.BuildConfig;
import com.facebook.react.ReactApplication;
import com.yunpeng.alipay.AlipayPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.lmy.smartrefreshlayout.SmartRefreshLayoutPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactlibrary.RNSyanImagePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.theweflex.react.WeChatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AlipayPackage(),
            new LottiePackage(),
            new SmartRefreshLayoutPackage(),
            new ReactVideoPackage(),
            new SplashScreenReactPackage(),
            new RNSyanImagePickerPackage(),
            new ImagePickerPackage(),
            new WeChatPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
