'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Spinner from "@/components/ui/spinner";
import Loading from "@/components/ui/loading";

export default function GlobalLoading({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const handleStart = (): void => setIsLoading(true);
    const handleComplete = (): void => setIsLoading(false);
    
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);
    
    return (): void => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);
  
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);
  
  return (
    <>{ isLoading ? <Loading /> : children}</>
  );
} 