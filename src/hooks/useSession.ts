'use server';

import { cookies } from 'next/headers';
import app from "@/app";

export async function createSession(uid: string): Promise<void> {
  (await cookies()).set(app.SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function removeSession(): Promise<void> {
  (await cookies()).delete(app.SESSION_COOKIE_NAME);
}
