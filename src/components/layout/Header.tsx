'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import clsx from 'clsx';
import SelectDropdown from '../ui/select-dropdown';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { handleSignOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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
      <SelectDropdown
        label="Languages"
        value={position}
        onChange={setPosition}
        menuitems={[
          { label: 'English', value: 'top' },
          { label: 'Deutsch', value: 'bottom' },
        ]}
      />
      <div className="flex gap-4">
        {user ? (
          <Button onClick={onSignOut}>Log Out</Button>
        ) : (
          <>
            <Link href={'/sign-in'}>
              <Button>Sign In</Button>
            </Link>
            <Link href={'/sign-up'}>
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
