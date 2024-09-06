import type { User } from '../../types/user';
import type {
  LoginResponse,
  AuthCredentials,
  OTPRequest,
  OTPValidate,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../../types/login';

interface IAuthAPI {
  login(credentials: AuthCredentials): Promise<LoginResponse>;
  register(user: User): Promise<User>;
  logout(): Promise<void>;
  requestOTP(otpRequest: OTPRequest): Promise<void>;
  validateOTP(otpValidate: OTPValidate): Promise<LoginResponse>;
  refreshAccessToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse>;
}

export type { IAuthAPI };
