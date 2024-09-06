import { AuthRestAdapter, UserRestAdapter } from '../adapter';
import {
  // Auth
  IAuthAPI,
  AuthAPI,
  IAuthAdapter,
  // User
  IUserAPI,
  UserAPI,
  IUserAdapter,
} from '../domain';

namespace AppLoader {
  const authAdapter: IAuthAdapter = new AuthRestAdapter();
  const authAPI = new AuthAPI(authAdapter);

  const userAdapter: IUserAdapter = new UserRestAdapter();
  const userAPI = new UserAPI(userAdapter);

  /**
   * Returns the auth object
   * @returns {IAuthAPI} - The auth object
   **/

  export function getAuthAPI(): IAuthAPI {
    return authAPI;
  }

  /**
   * Returns the user object
   * @returns {IUserAPI} - The user object
   **/

  export function getUserAPI(): IUserAPI {
    return userAPI;
  }
}

const authInstance = AppLoader.getAuthAPI();

export { AppLoader, authInstance };
