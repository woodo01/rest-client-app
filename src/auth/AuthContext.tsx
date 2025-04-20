'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, signOut, User } from '@firebase/auth';
import { useTranslations } from 'next-intl';
import { createSession, removeSession } from '@/hooks/useSession';
import { useToast } from '@/hooks/useToast';

interface AuthContextType {
  isAuth: boolean;
  logout: () => Promise<void>;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
  initialData?: {
    isAuth?: boolean;
    user?: User | null;
  };
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
  logout: async () => {},
});

export function AuthProvider({
  children,
  initialData: { isAuth: initialIsAuth = false, user: initialUser = null } = {
    isAuth: false,
    user: null,
  },
}: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isAuth, setIsAuth] = useState(initialIsAuth);
  const t = useTranslations('auth');
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        await createSession(_user.uid);
      } else {
        await removeSession();
      }

      setUser(_user);
      setIsAuth(!!_user);
    });

    return (): void => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    await removeSession();
    setIsAuth(false);
    setUser(null);
    toast({
      title: t('logout-success'),
      variant: 'default',
      duration: 3000,
    });
  }, [t, toast]);

  const value = useMemo(() => {
    return { user, logout, isAuth };
  }, [user, logout, isAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
