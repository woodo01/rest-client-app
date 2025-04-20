'use client';

import * as React from 'react';
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): React.ReactNode {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
