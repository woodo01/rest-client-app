import app from '@/app';

function isLocale(value: string | undefined): boolean {
  if (value === undefined) return false;

  return app.locale.includes(value as (typeof app.locale)[number]);
}

export default isLocale;
