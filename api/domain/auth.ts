import { IAuthAPI } from './ports/api/auth';
import { RegisterUserSchema, User } from './types/user';
import { IAuthAdapter } from './ports/spi/iauth-adapter';
import {
  LoginResponse,
  AuthCredentials,
  OTPRequest,
  OTPValidate,
  RefreshTokenResponse,
  RefreshTokenRequest,
} from './types/login';
import { validateUserData, formatPhoneToE164 } from './utils';
import { SessionAdapter } from '../adapter/session-adapter';
import { SecureSessionStorage } from '../adapter/secure-session-adapter';

class AuthAPI implements IAuthAPI {
  constructor(private authAdapter: IAuthAdapter) {}

  sessionAdapter = new SessionAdapter();
  secureSessionStorage = new SecureSessionStorage();

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    validateUserData(credentials);
    const response = await this.authAdapter.login(credentials);
    return response;
  }

  async register(user: RegisterUserSchema): Promise<User> {
    user.phone = formatPhoneToE164(user.phone, user.country);
    return this.authAdapter.register(user);
  }

  async logout(): Promise<boolean> {
    const response = await this.authAdapter.logout();
    if (response) {
      await this.sessionAdapter.flush();
    }
    return response;
  }

  async requestOTP(otpRequest: OTPRequest): Promise<void> {
    return this.authAdapter.requestOTP(otpRequest);
  }

  async validateOTP(otpValidate: OTPValidate): Promise<LoginResponse> {
    return this.authAdapter.validateOTP(otpValidate);
  }

  async refreshAccessToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return this.authAdapter.refreshAccessToken(request);
  }
}

export { AuthAPI };
