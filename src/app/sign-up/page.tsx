'use client';
import AuthForm from '@/components/AuthForm';
import { handleRegister } from '@/lib/auth';

const SignUp = () => {
  return (
    <div className="pt-32">
      <h2>Sign Up</h2>
      <AuthForm onSubmit={handleRegister} />
    </div>
  );
};
export default SignUp;
