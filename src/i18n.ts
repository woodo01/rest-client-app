import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import app from '@/app';
import isLocale from '@/lib/isLocale';

export default getRequestConfig(async () => {
  const cookiesLocale = (await cookies()).get('NEXT_LOCALE')?.value;
  const locale: (typeof app.locale)[number] = isLocale(cookiesLocale)
    ? (cookiesLocale as (typeof app.locale)[number])
    : app.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
