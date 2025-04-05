'use client';
import AuthForm from '@/components/AuthForm';
import { handleRegister } from '@/lib/auth';

const signUp = () => {
  return (
    <div className="pt-32">
      <h2>Sign In</h2>
      <AuthForm onSubmit={handleRegister} />
    </div>
  );
};
export default signUp;
