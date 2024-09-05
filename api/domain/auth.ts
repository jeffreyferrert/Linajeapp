import { IAuthAPI } from './ports/api/auth';
import { User } from './types/user';
import { IAuthAdapter } from './ports/spi/iauth-adapter';
import { LoginResponse, AuthCredentials } from './types/login';
import { validateUserData } from './utils';

class AuthAPI implements IAuthAPI {
  constructor(private authAdapter: IAuthAdapter) {}

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    validateUserData(credentials);
    const response = await this.authAdapter.login(credentials);
    return response;
  }

  async register(user: User): Promise<User> {
    return this.authAdapter.register(user);
  }

  async logout(): Promise<void> {
    return this.authAdapter.logout();
  }
}

export { AuthAPI };
