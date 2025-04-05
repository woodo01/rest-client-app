'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
export default function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {user ? (
          <>
            <h1>Welcome back!</h1>
            <p>REST Client | History | Variables</p>
          </>
        ) : (
          <>
            <h1>Welcome!</h1>
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
