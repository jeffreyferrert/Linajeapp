interface ISessionAdapter {
  storeValue(key: string, value: string, duration: number): void;
  getValue(key: string): string | null;
  removeValue(key: string): void;
  flush(): void;
}

export type { ISessionAdapter };
