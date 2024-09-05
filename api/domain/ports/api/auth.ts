import type { User } from '../../types/user';
import type { LoginResponse, AuthCredentials } from '../../types/login';

interface IAuthAPI {
  login(credentials: AuthCredentials): Promise<LoginResponse>;
  register(user: User): Promise<User>;
  logout(): Promise<void>;
}

export type { IAuthAPI };
