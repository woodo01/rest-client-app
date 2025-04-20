'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/auth/AuthContext';
import { useTranslations } from 'next-intl';
import routes from "@/routes";

export default function Home(): JSX.Element {
  const { user } = useAuth();
  const t = useTranslations('shared');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center pr-8 pl-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {user ? (
          <>
            <h1>{t('welcome-back')}, {user?.email ?? ''}</h1>
            <div className="flex gap-4">
              <Link href={routes.rest({ method: 'GET' })}>{t('rest-client')}</Link>
              <Link href={routes.history}>{t('requests-history')}</Link>
              <Link href={routes.history}>{t('requests-variables')}</Link>
            </div>
          </>
        ) : (
          <>
            <h1>{t('welcome')}!</h1>
            <Link href={routes.login}>
              <Button variant="outline">{t('login')}</Button>
            </Link>
            <Link href={routes.register}>
              <Button variant="outline">{t('register')}</Button>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
