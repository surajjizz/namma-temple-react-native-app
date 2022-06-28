import { action, makeObservable, observable } from "mobx";
import { Messages } from "../constants";
import { IUserInfo } from "../interface/ILogin";
import AppStorage from "../storage/AppStorage";
import Function from "../utils/Function";

export default class LoginStore {
    @observable id: number = 0;
    @observable email: string = '';
    @observable password: string = '';
    @observable device_id: string = '';
    @observable full_name: string = '';
    @observable token: string = '';
    @observable last_login: Date | undefined = undefined;
    @observable is_superuser: boolean = false;
    @observable is_staff: boolean = false;
    @observable register_otp: string = '';
    @observable password_otp: string = '';
    @observable formLoginErrors: any = {};
    @observable formRegisterErrors: any = {};
    @observable formLoginOTPErrors: any = {};
    @observable formForgotPasswordErrors: any = {};
    @observable formResetPasswordErrors: any = {};
    @observable isLoading: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action resetLoginPostData() {
        this.formLoginErrors = {};
    }

    @action resetRegisterPostData() {
        this.formRegisterErrors = {};
    }

    @action resetLoginOTPPostData() {
        this.formLoginOTPErrors = {};
        this.register_otp = '';
    }

    @action resetForgotPasswordPostData() {
        this.formForgotPasswordErrors = {};
    }

    @action resetResetPasswordPostData() {
        this.formResetPasswordErrors = {};
        this.password_otp = '';
        this.password = '';
    }

    @action resetData() {
        this.id = 0;
        this.email = '';
        this.device_id = '';
        this.full_name = '';
        this.token = '';
        this.last_login = undefined;
        this.is_superuser = false;
        this.is_staff = false;
        this.register_otp = '';
        this.password_otp = '';
        this.formLoginErrors = {};
        this.formRegisterErrors = {};
        this.formLoginOTPErrors = {};
        this.formForgotPasswordErrors = {};
        this.formResetPasswordErrors = {};
        this.isLoading = false;
    }

    @action async init() {
        var userInfo: any = await AppStorage.getUserDetails();
        if (userInfo && userInfo.token) {
            this.setProfileInfo(userInfo);
        }
    }

    @action isValidLoginForm() {
        this.formLoginErrors = {};

        if (!this.email) {
            this.formLoginErrors.email = Messages.emptyEmail;
        } else if (!Function.isValidEmail(this.email)) {
            this.formLoginErrors.email = Messages.invalidEmail;
        }

        if (!this.password) {
            this.formLoginErrors.password = Messages.emptyPassword;
        } else if (this.password.length < 6) {
            this.formLoginErrors.password = Messages.invalidPassword;
        }

        if (Object.keys(this.formLoginErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidRegisterForm() {
        this.formRegisterErrors = {};

        if (!this.full_name) {
            this.formRegisterErrors.full_name = Messages.emptyFullName
        }

        if (!this.email) {
            this.formRegisterErrors.email = Messages.emptyEmail;
        } else if (!Function.isValidEmail(this.email)) {
            this.formRegisterErrors.email = Messages.invalidEmail;
        }

        if (!this.password) {
            this.formRegisterErrors.password = Messages.emptyPassword;
        } else if (this.password.length < 6) {
            this.formRegisterErrors.password = Messages.invalidPassword;
        }

        if (Object.keys(this.formRegisterErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidRegisterOTPForm() {
        this.formLoginOTPErrors = {};

        if (!this.register_otp) {
            this.formLoginOTPErrors.register_otp = Messages.emptyLoginOTP;
        } else if (this.register_otp.length < 5) {
            this.formLoginOTPErrors.register_otp = Messages.invalidLoginOTP
        }

        if (Object.keys(this.formLoginOTPErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidForgotPasswordForm() {
        this.formForgotPasswordErrors = {};

        if (!this.email) {
            this.formForgotPasswordErrors.email = Messages.emptyEmail;
        } else if (!Function.isValidEmail(this.email)) {
            this.formForgotPasswordErrors.email = Messages.invalidEmail;
        }

        if (Object.keys(this.formForgotPasswordErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidResetPasswordForm() {
        this.formResetPasswordErrors = {};

        if (!this.password_otp) {
            this.formResetPasswordErrors.password_otp = 'Please enter password reset OTP';
        } else if (this.password_otp.length < 5) {
            this.formResetPasswordErrors.password_otp = 'OTP must be 5 characters long';
        }

        if (!this.password) {
            this.formResetPasswordErrors.password = 'Please enter password';
        } else if (this.password.length < 6) {
            this.formResetPasswordErrors.password = 'Password must be 6 characters long';
        }

        if (Object.keys(this.formResetPasswordErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action setProfileInfo(userInfo: IUserInfo) {
        this.id = userInfo?.id;
        this.full_name = userInfo?.full_name;
        this.email = userInfo?.email;
        this.token = userInfo?.token;
        this.last_login = userInfo?.last_login;
        this.is_superuser = userInfo?.is_superuser;
        this.is_staff = userInfo?.is_staff;
        AppStorage.setUserDetails(userInfo);
    }
}
