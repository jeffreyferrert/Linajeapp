import { ISessionAdapter } from '../domain';

class SessionAdapter implements ISessionAdapter {
  storeValue(key: string, value: string, duration: number | null): void {
    localStorage.setItem(key, value);
  }
  getValue(key: string): string | null {
    return localStorage.getItem(key);
  }
  removeValue(key: string): void {
    localStorage.removeItem(key);
  }
  flush(): void {
    localStorage.clear();
  }
}

export { SessionAdapter };
