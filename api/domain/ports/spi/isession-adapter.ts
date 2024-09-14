interface ISessionAdapter {
  storeValue(key: string, value: string, duration: number): Promise<void>;
  getValue(key: string): Promise<string | null>;
  removeValue(key: string): Promise<void>;
  flush(): Promise<void>;
}

export type { ISessionAdapter };
