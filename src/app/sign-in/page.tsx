'use client';
import AuthForm from '@/components/AuthForm';
import { handleLogin } from '@/lib/auth';

const signIn = () => {
  return <h2>Sign In</h2>;
  <AuthForm onSubmit={handleLogin} />;
};

export default signIn;
