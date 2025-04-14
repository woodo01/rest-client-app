import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const handleSignOut = async (): Promise<void> => {
  await signOut(auth);
};
