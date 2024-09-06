import { IUserAdapter } from '../domain';
import {
  User,
  RegisterUserSchema,
  UpdateUserSchema,
  MeResponse,
} from '../domain/';
import { HttpClient, httpClient } from './http-client';

class UserRestAdapter implements IUserAdapter {
  private httpClient: HttpClient = httpClient;

  async getCurrentUser(): Promise<MeResponse> {
    const response = await this.httpClient.get('user/', null, true);
    return response.data;
  }

  async register(user: RegisterUserSchema): Promise<User> {
    const response = await this.httpClient.post('user/register', user, false);
    return response.data;
  }

  async updateUser(user: UpdateUserSchema): Promise<User> {
    const response = await this.httpClient.put('user/update', user, true);
    return response.data;
  }

  async validateEmail(otpCode: string, email: string): Promise<void> {
    await this.httpClient.post(
      'user/validate-email/',
      { otp_code: otpCode, email },
      false,
    );
  }

  async validatePhone(otpCode: string, phone: string): Promise<void> {
    await this.httpClient.post(
      'user/validate-phone/',
      { otp_code: otpCode, phone },
      false,
    );
  }
}

export { UserRestAdapter };
