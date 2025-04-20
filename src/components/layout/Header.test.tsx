import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('../../firebaseConfig', () => ({
  auth: {},
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="mock-image">Image</div>,
}));

jest.mock('../ui/select-dropdown', () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="mock-dropdown">Dropdown</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }): React.ReactNode =>
    children,
}));

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: string): string =>
      key,
}));

jest.mock('../../components/LocaleSelect', () => ({
  __esModule: true,
  default: (): JSX.Element => (
    <div data-testid="locale-dropdown">Locale Dropdown</div>
  ),
}));

jest.mock('../../components/ThemeToggle', () => ({
  ThemeToggle: (): JSX.Element => (
    <div data-testid="theme-toggle">Theme Toggle</div>
  ),
}));

describe('Header Component', () => {
  it('renders sign in and sign up buttons when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Header />);

    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });
});
