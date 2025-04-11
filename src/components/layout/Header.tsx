'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import clsx from 'clsx';

const Header = (): JSX.Element => {
  const [position, setPosition] = React.useState('top');
  const [headercolor, setHeaderColor] = useState(false);

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

  return (
    <header
      className={clsx(
        headercolor ? 'bg-muted-foreground' : 'bg-background',
        'flex justify-around p-2 fixed top-0 right-0 left-0 transition-colors duration-300'
      )}
    >
      <Image src="/rest-api.svg" alt="Logo" width={40} height={40} />
      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 border rounded-sm border-blue-950">
          Languages
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Deutsch
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-4">
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
};

export default Header;
