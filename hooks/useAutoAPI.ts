import { useMemo, useState } from 'react';
import { useAPIRequest } from './useAPIRequest';
import * as apiLoader from '@/api/loader';

type APIInstance = (typeof apiLoader)[keyof typeof apiLoader];

// Extraer los métodos que son funciones que retornan promesas
type ExtractAPIInstanceMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => Promise<any>
    ? K
    : never]: Extract<T[K], (...args: any[]) => Promise<any>>;
};

export function useAutoAPI<T extends APIInstance>(instance: T) {
  const [results, setResults] = useState<Record<string, any>>({});

  const apiMethods = useMemo(() => {
    const methods = {} as Record<string, (...args: any[]) => Promise<any>>;
    const prototypeMethods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(instance),
    );

    for (const key of prototypeMethods) {
      const value = (instance as any)[key];
      if (typeof value === 'function' && key !== 'constructor') {
        methods[key] = value.bind(instance);
      }
    }

    return methods;
  }, [instance]);

  const { loading, error, execute } = useAPIRequest(apiMethods);

  const wrappedMethods = useMemo(() => {
    const wrapped = {} as Record<string, (...args: any[]) => Promise<any>>;
    for (const key in apiMethods) {
      wrapped[key] = async (...args: any[]) => {
        const result = await execute(key, ...args);
        setResults((prev) => ({ ...prev, [key]: result }));
        return result;
      };
    }
    return wrapped;
  }, [apiMethods, execute]);

  return {
    loading,
    error,
    results,
    ...wrappedMethods,
  } as {
    loading: boolean;
    error: Error | null;
    results: Record<string, any>;
  } & ExtractAPIInstanceMethods<T>;
}
