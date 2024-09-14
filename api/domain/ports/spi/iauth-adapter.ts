import type { User, RegisterUserSchema } from '../../types/user';
import type {
  AuthCredentials,
  LoginResponse,
  OTPRequest,
  OTPValidate,
  RefreshTokenResponse,
  RefreshTokenRequest,
} from '../../types/login';

interface IAuthAdapter {
  login(credentials: AuthCredentials): Promise<LoginResponse>;
  register(user: RegisterUserSchema): Promise<User>;
  logout(): Promise<boolean>;
  requestOTP(otpRequest: OTPRequest): Promise<void>; // Nuevo
  validateOTP(otpValidate: OTPValidate): Promise<LoginResponse>; // Nuevo
  refreshAccessToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse>; // Nuevo
}

export type { IAuthAdapter };
