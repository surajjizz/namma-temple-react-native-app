export interface IRegister {
  full_name: string;
  email: string;
  password: string;
}

export interface ILoginOTP {
  register_otp: string;
}

export interface IPasswordResetEmail {
  email: string;
}

export interface IResetPassword {
  password_otp: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserInfo {
  id: number;
  email: string;
  full_name: string;
  token: string;
  last_login: Date;
  is_superuser: boolean;
  is_staff: boolean;
}
