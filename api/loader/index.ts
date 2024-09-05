import { AuthRestAdapter } from '../adapter';
import {
  // Auth
  IAuthAPI,
  AuthAPI,
  IAuthAdapter,
  // User
} from '../domain';

namespace AppLoader {
  const authAdapter: IAuthAdapter = new AuthRestAdapter();
  const authAPI = new AuthAPI(authAdapter);

  /**
   * Returns the auth object
   * @returns {IAuthAPI} - The auth object
   **/

  export function getAuthAPI(): IAuthAPI {
    return authAPI;
  }
}

const authInstance = AppLoader.getAuthAPI();

export { AppLoader, authInstance };
