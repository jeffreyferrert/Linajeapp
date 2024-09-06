import { IUserAPI } from './ports/api/user';
import { IUserAdapter } from './ports/spi/iuser-adapter';
import {
  User,
  RegisterUserSchema,
  UpdateUserSchema,
  MeResponse,
} from './types/user';

class UserAPI implements IUserAPI {
  constructor(private userAdapter: IUserAdapter) {}

  async getCurrentUser(): Promise<MeResponse> {
    return this.userAdapter.getCurrentUser();
  }

  async register(user: RegisterUserSchema): Promise<User> {
    return this.userAdapter.register(user);
  }

  async updateUser(user: UpdateUserSchema): Promise<User> {
    return this.userAdapter.updateUser(user);
  }

  async validateEmail(otpCode: string, email: string): Promise<void> {
    return this.userAdapter.validateEmail(otpCode, email);
  }

  async validatePhone(otpCode: string, phone: string): Promise<void> {
    return this.userAdapter.validatePhone(otpCode, phone);
  }
}

export { UserAPI };
