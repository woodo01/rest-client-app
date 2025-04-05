'use client';
import AuthForm from '@/components/AuthForm';
import { handleLogin } from '@/lib/auth';

const signIn = () => {
  return (
    <div className="pt-32">
      <h2>Sign In</h2>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default signIn;
