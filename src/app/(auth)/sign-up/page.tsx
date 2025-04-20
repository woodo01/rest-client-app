'use client';
import AuthForm from '@/auth/AuthForm';
import { handleRegister } from '@/auth/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

const SignUp = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <h2>Sign Up</h2>
      <AuthForm onSubmit={handleRegister} />
    </div>
  );
};
export default SignUp;
