import {
  IAuthAdapter,
  LoginResponse,
  User,
  OTPRequest,
  OTPValidate,
  RefreshTokenResponse,
  RefreshTokenRequest,
  AuthCredentials,
} from '../domain';
import { HttpClient, httpClient } from './http-client';

class AuthRestAdapter implements IAuthAdapter {
  private httpClient: HttpClient = httpClient;

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    const response = await this.httpClient.post('auth/login', credentials);
    return response.data;
  }

  async register(user: User): Promise<User> {
    const response = await this.httpClient.post('auth/register', user);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.httpClient.post('auth/logout', {});
  }

  async requestOTP(otpRequest: OTPRequest): Promise<void> {
    await this.httpClient.post('auth/request-otp-code', otpRequest);
  }

  async validateOTP(otpValidate: OTPValidate): Promise<LoginResponse> {
    const response = await this.httpClient.post(
      'auth/login/otp-validate',
      otpValidate,
    );
    return response.data;
  }

  async refreshAccessToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    const response = await this.httpClient.post('auth/refresh', request);
    return response.data;
  }
}

export { AuthRestAdapter };
