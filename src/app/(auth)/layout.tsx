'use client';

import { useEffect, useState } from 'react';
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

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default AuthLayout;
