import { useState, useCallback } from 'react';

interface APIRequestState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

export function useAPIRequest<
  M extends { [key: string]: (...args: any[]) => Promise<any> },
>(apiMethods: M) {
  const [state, setState] = useState<APIRequestState<any>>({
    loading: false,
    error: null,
    data: null,
  });

  const [loadingCount, setLoadingCount] = useState(0);

  const execute = useCallback(
    async <K extends keyof M>(
      methodName: K,
      ...args: Parameters<M[K]>
    ): Promise<ReturnType<M[K]>> => {
      setLoadingCount((count) => count + 1);
      try {
        const data = await apiMethods[methodName](...args);
        setState({ loading: false, error: null, data });
        return data;
      } catch (error) {
        setState({ loading: false, error: error as Error, data: null });
        throw error;
      } finally {
        setLoadingCount((count) => count - 1);
      }
    },
    [apiMethods],
  );

  const loading = loadingCount > 0;

  return { ...state, loading, execute };
}
