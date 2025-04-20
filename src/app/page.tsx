'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/auth/AuthContext';
import { useTranslations } from "next-intl";

export default function Home(): JSX.Element {
  const { user } = useAuth();
  const t = useTranslations('shared');


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center pr-8 pl-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
              <Button variant="outline">{t('login')}</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline">{t('register')}</Button>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
