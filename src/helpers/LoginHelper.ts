import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Messages } from '../constants';
import {IRegister} from '../interface/ILogin';
import LoginStore from '../mobx-store/LoginStore';
import RootStore from '../mobx-store/RootStore';
import {RootStackParams} from '../navigation/StackNavigator';
import {AuthService} from '../services/Service';
import Function from '../utils/Function';

class LoginHelper {
  loginStore: LoginStore;

  constructor() {
    this.loginStore = RootStore.loginStore;
  }

  registration = async (navigation: NativeStackNavigationProp<RootStackParams>) => {
    var resRegisterUser: any = {};
    var data: IRegister = {
      full_name: this.loginStore.full_name,
      email: this.loginStore.email,
      password: this.loginStore.password,
    };
    this.loginStore.isLoading = true;
    resRegisterUser = await AuthService().postResponse('registration', 'POST', data);
    this.loginStore.isLoading = false;
    if (resRegisterUser && resRegisterUser.detail) {
      this.loginStore.resetRegisterPostData();
      Function.toast(resRegisterUser.detail);
      navigation.navigate('OTPVerification');
    }
  };

  verifyRegisterOTP = async (navigation: NativeStackNavigationProp<RootStackParams>) => {
    var resVerifyOTP: any = {};
    var data: any = {
      email: this.loginStore.email,
      register_passcode: this.loginStore.register_otp,
    };
    this.loginStore.isLoading = true;
    resVerifyOTP = await AuthService().postResponse('verify-register-otp', 'POST', data);
    this.loginStore.isLoading = false;
    if (resVerifyOTP && resVerifyOTP.detail) {
      this.loginStore.resetLoginOTPPostData();
      Function.toast(resVerifyOTP.detail);
      navigation.navigate('Login');
    }
  };

  login = async (navigation: NativeStackNavigationProp<RootStackParams>) => {
    var resLogin: any = {};
    var data: any = {
      email: this.loginStore.email,
      password: this.loginStore.password,
      device_id: this.loginStore.device_id,
    };
    this.loginStore.isLoading = true;
    console.log("data",data)
    resLogin = await AuthService().postResponse('login', 'POST', data);
    console.log("resLogin",resLogin)
    this.loginStore.password = '';
    this.loginStore.isLoading = false;
    if (resLogin && resLogin.token) {
      this.loginStore.resetLoginPostData();
      Function.toast(Messages.loginSuccess);
      this.loginStore.setProfileInfo(resLogin);
      navigation.reset({ index: 0, routes: [{ name: 'Religions' }] });
      // navigation.replace('Religions');
    }
  };

  forgotPassword = async (navigation: NativeStackNavigationProp<RootStackParams>) => {
    var resForgotPassword: any = {};
    var data: any = {
      email: this.loginStore.email,
    };
    this.loginStore.isLoading = true;
    resForgotPassword = await AuthService().postResponse('request-password-reset', 'POST', data);
    this.loginStore.isLoading = false;
    if (resForgotPassword && resForgotPassword.detail) {
      this.loginStore.resetForgotPasswordPostData();
      // Function.toast('success', resForgotPassword.detail);
      navigation.navigate('ForgotPassword');
    }
  };

  resetPassword = async (navigation: NativeStackNavigationProp<RootStackParams>) => {
    var resResetPassword: any = {};
    var data: any = {
      email: this.loginStore.email,
      passcode: this.loginStore.password_otp,
      password: this.loginStore.password,
    };
    this.loginStore.isLoading = true;
    resResetPassword = await AuthService().postResponse(
      'reset-password',
      'PATCH',
      data,
    );
    this.loginStore.password = '';
    this.loginStore.isLoading = false;
    if (resResetPassword && resResetPassword.detail) {
      this.loginStore.resetResetPasswordPostData();
      // Function.toast('success', resResetPassword.detail);
      navigation.navigate('Login');
    }
  };
}

export default new LoginHelper();
