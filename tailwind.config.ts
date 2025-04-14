import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/**/**.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',

        primary: 'oklch(var(--primary) / <alpha-value>)',
        'primary-foreground':
          'oklch(var(--primary-foreground) / <alpha-value>)',

        secondary: 'oklch(var(--secondary) / <alpha-value>)',
        'secondary-foreground':
          'oklch(var(--secondary-foreground) / <alpha-value>)',

        accent: 'oklch(var(--accent) / <alpha-value>)',
        'accent-foreground': 'oklch(var(--accent-foreground) / <alpha-value>)',

        muted: 'oklch(var(--muted) / <alpha-value>)',
        'muted-foreground': 'oklch(var(--muted-foreground) / <alpha-value>)',

        destructive: 'oklch(var(--destructive) / <alpha-value>)',

        input: 'oklch(var(--input) / <alpha-value>)',
        border: 'oklch(var(--border) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',

        card: 'oklch(var(--card) / <alpha-value>)',
        'card-foreground': 'oklch(var(--card-foreground) / <alpha-value>)',

        popover: 'oklch(var(--popover) / <alpha-value>)',
        'popover-foreground':
          'oklch(var(--popover-foreground) / <alpha-value>)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require('tailwindcss-animate')],
};

export default config;
