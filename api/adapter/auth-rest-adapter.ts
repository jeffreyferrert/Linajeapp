import { IAuthAdapter, LoginResponse, User } from '../domain';
import { HttpClient, httpClient } from './http-client';

class AuthRestAdapter implements IAuthAdapter {
  private httpClient: HttpClient = httpClient;

  async login(credentials: any): Promise<LoginResponse> {
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
}

export { AuthRestAdapter };
