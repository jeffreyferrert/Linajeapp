import type { User } from '../../types/user';
import type { AuthCredentials, LoginResponse } from '../../types/login';

interface IAuthAdapter {
  login(credentials: AuthCredentials): Promise<LoginResponse>;
  register(user: User): Promise<User>;
  logout(): Promise<void>;
}

export type { IAuthAdapter };
