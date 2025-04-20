'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { handleSignOut } from '@/auth/auth';
import { useRouter } from 'next/navigation';
import LocaleDropDown from "@/components/LocaleSelect";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = (): JSX.Element => {
  const [position, setPosition] = React.useState('top');
  const [headercolor, setHeaderColor] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

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
    router.push('/');
  };

  const t = useTranslations('shared');

  return (
    <header
      className={clsx(
        headercolor ? 'bg-muted-foreground' : 'bg-background',
        'flex justify-around p-2 fixed top-0 right-0 left-0 transition-colors duration-300'
      )}
    >
      <Link href="/">
        <Image src="/rest-api.svg" alt="Logo" width={40} height={40} />
      </Link>
      <ThemeToggle />
      <LocaleDropDown />
      <div className="flex gap-4">
        {user ? (
          <Button onClick={onSignOut}>{t('logout')}</Button>
        ) : (
          <>
            <Link href={'/sign-in'}>
              <Button>{t('login')}</Button>
            </Link>
            <Link href={'/sign-up'}>
              <Button>{t('register')}</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
