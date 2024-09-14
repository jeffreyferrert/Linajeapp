type AuthCredentials = {
  provider: 'email' | 'phone';
  email: string;
  password: string;
};

type OTPRequest = {
  contact: string;
  method: 'sms' | 'whatsapp' | 'email';
};

type OTPValidate = {
  contact: string;
  otp_code: string;
  method: 'sms' | 'whatsapp' | 'email';
};

type LoginResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};

type RefreshTokenRequest = {
  refresh_token: string;
};

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export type {
  AuthCredentials,
  OTPRequest,
  OTPValidate,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
};
