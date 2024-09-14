import {
  IAuthAdapter,
  LoginResponse,
  User,
  OTPRequest,
  OTPValidate,
  RefreshTokenResponse,
  RefreshTokenRequest,
  AuthCredentials,
  RegisterUserSchema,
} from '../domain';
import { HttpClient, httpClient } from './http-client';

class AuthRestAdapter implements IAuthAdapter {
  private httpClient: HttpClient = httpClient;

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    const response = await this.httpClient.post(
      'auth/login/',
      credentials,
      false,
    );
    return response.data;
  }

  async register(user: RegisterUserSchema): Promise<User> {
    const response = await this.httpClient.post('user/register', user, false);
    return response.data;
  }

  async logout(): Promise<boolean> {
    console.log('logout1');
    const response = await this.httpClient.post('auth/logout/', {});
    console.log('logout2', response);
    return response.status === 204;
  }

  async requestOTP(otpRequest: OTPRequest): Promise<void> {
    await this.httpClient.post('auth/request-otp-code/', otpRequest);
  }

  async validateOTP(otpValidate: OTPValidate): Promise<LoginResponse> {
    const response = await this.httpClient.post(
      'auth/login/otp-validate/',
      otpValidate,
    );
    return response.data;
  }

  async refreshAccessToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    const response = await this.httpClient.post('auth/refresh/', request);
    return response.data;
  }
}

export { AuthRestAdapter };
