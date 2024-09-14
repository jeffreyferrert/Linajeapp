import {
  AuthRestAdapter,
  UserRestAdapter,
  AnimalRestAdapter,
} from '../adapter';
import {
  // Auth
  IAuthAPI,
  AuthAPI,
  IAuthAdapter,
  // User
  IUserAPI,
  UserAPI,
  IUserAdapter,
  // Animal
  IAnimalAPI,
  AnimalAPI,
  IAnimalAdapter,
} from '../domain';

namespace AppLoader {
  const authAdapter: IAuthAdapter = new AuthRestAdapter();
  const authAPI = new AuthAPI(authAdapter);

  const userAdapter: IUserAdapter = new UserRestAdapter();
  const userAPI = new UserAPI(userAdapter);

  const animalAdapter: IAnimalAdapter = new AnimalRestAdapter();
  const animalAPI = new AnimalAPI(animalAdapter);

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

  /**
   * Returns the animal object
   * @returns {IAnimalAPI} - The animal object
   **/

  export function getAnimalAPI(): IAnimalAPI {
    return animalAPI;
  }
}

const authInstance = AppLoader.getAuthAPI();

const userInstance = AppLoader.getUserAPI();

const animalInstance = AppLoader.getAnimalAPI();

export { AppLoader, authInstance, userInstance, animalInstance };
