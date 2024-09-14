import { ISessionAdapter } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
class SessionAdapter implements ISessionAdapter {
  async storeValue(
    key: string,
    value: string,
    duration: number | null,
  ): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }
  async getValue(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }
  async removeValue(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
  async flush(): Promise<void> {
    await AsyncStorage.clear();
  }
}

export { SessionAdapter };
