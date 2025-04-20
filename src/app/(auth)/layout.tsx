'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { app } from '@/firebaseConfig';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });

    return unsubscribe;
  }, [auth, router]);

  return <>{children}</>;
};

export default AuthLayout;
