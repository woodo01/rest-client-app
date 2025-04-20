const app = {
  locale: ['ru', 'en', 'de'] as const,
  defaultLocale: 'en' as const,
  SESSION_COOKIE_NAME: 'FIREBASE_SESSION' as const,
  HISTORY_KEY: '@app/history' as const,
  VARIABLES_KEY: '@app/variables' as const,
};

export default app;
