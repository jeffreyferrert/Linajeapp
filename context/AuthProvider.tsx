import { useContext, createContext, type PropsWithChildren } from 'react';
import { authInstance } from '@/api/loader/';
import { useStorageState } from '@/utils/useStorageState';

const AuthContext = createContext<{
  signIn: (form: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession debe estar envuelto en un <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('token');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (form: { email: string; password: string }) => {
          const loginResponse = await authInstance.login({
            provider: 'email',
            email: form.email,
            password: form.password,
          });
          setSession(loginResponse.access_token);
        },
        signOut: async () => {
          const logoutResponse = await authInstance.logout();
          if (logoutResponse) {
            console.log('logoutResponse', logoutResponse);
            setSession(null);
          }
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
