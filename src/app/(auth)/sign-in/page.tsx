'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { auth } from '@/firebaseConfig';
import AuthForm from '@/components/auth/AuthForm';
import { handleLogin } from '@/lib/auth';

const SignIn = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <h2>Sign In</h2>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default SignIn;
