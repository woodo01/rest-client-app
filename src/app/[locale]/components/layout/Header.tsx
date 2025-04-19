'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/app/[locale]/components/ui/button';
import Image from 'next/image';
import clsx from 'clsx';
import SelectDropdown from '../ui/select-dropdown';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { handleSignOut } from '@/app/[locale]/lib/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const Header = (): JSX.Element => {
  const t = useTranslations('header');
  const locale = useLocale();
  const [headercolor, setHeaderColor] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const changeColor = (): void => {
    if (window.scrollY >= 56) {
      setHeaderColor(true);
    } else {
      setHeaderColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeColor);

    return (): void => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  const onSignOut = async (): Promise<void> => {
    await handleSignOut();
    router.push(`/${locale}`);
  };

  const switchLocale = (next: string): void => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${next}`);
    router.push(newPath);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <header
      className={clsx(
        headercolor ? 'bg-muted-foreground' : 'bg-background',
        'flex justify-around p-2 fixed top-0 right-0 left-0 transition-colors duration-300'
      )}
    >
      <Image src="/rest-api.svg" alt="Logo" width={40} height={40} />
      <SelectDropdown
        label={t('language')}
        value={locale}
        onChange={switchLocale}
        menuitems={[
          { label: 'English', value: 'en' },
          { label: 'Deutsch', value: 'de' },
        ]}
      />
      <div className="flex gap-4">
        {user ? (
          <Button onClick={onSignOut}>{t('logOut')}</Button>
        ) : (
          <>
            <Link href={`/${locale}/sign-in`}>
              <Button>{t('signIn')}</Button>
            </Link>
            <Link href={`/${locale}/sign-up`}>
              <Button>{t('signUp')}</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
