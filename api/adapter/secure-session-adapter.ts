import * as SecureStore from 'expo-secure-store';
import { ISessionAdapter } from '../domain';

class SecureSessionStorage implements ISessionAdapter {
  async storeValue(
    key: string,
    value: string,
    duration?: number,
  ): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  async removeValue(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  async flush(): Promise<void> {
    // SecureStore no tiene un método para borrar todo, tendrías que implementar un borrado manual si es necesario.
  }
}

export { SecureSessionStorage };
