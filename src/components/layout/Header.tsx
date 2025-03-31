'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';

const Header = () => {
  const [position, setPosition] = React.useState('top');
  return (
    <header className="flex justify-around p-2">
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
