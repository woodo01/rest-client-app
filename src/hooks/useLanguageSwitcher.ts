'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import app from '@/app';
import isLocale from '@/lib/isLocale';

interface UseLanguageSwitcherReturn {
  localesList: typeof app.locale;
  currentLocale: (typeof app.locale)[number];
  changeLanguage: (lang: (typeof app.locale)[number]) => void;
}

const useLanguageSwitcher = (): UseLanguageSwitcherReturn => {
  const router = useRouter();
  const localesList = app.locale;
  const locale = useLocale();

  const currentLocale: (typeof app.locale)[number] = isLocale(locale)
    ? (locale as (typeof app.locale)[number])
    : app.defaultLocale;

  const changeLanguage = (lang: (typeof app.locale)[number]): void => {
    const date = new Date();

    date.setFullYear(9999);

    document.cookie = `NEXT_LOCALE=${lang}; expires=${date.toUTCString()}; path=/`;
    router.refresh();
  };

  return {
    localesList,
    currentLocale,
    changeLanguage,
  };
};

export default useLanguageSwitcher;
