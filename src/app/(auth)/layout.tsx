'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { app } from '@/firebaseConfig';
import Spinner from '@/components/ui/spinner';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const auth = getAuth(app);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [auth, router]);

  if (loading) return <Spinner />;

  return <>{children}</>;
};

export default AuthLayout;
