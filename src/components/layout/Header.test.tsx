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

jest.mock('../LocaleSelect', () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="mock-dropdown">Dropdown</div>,
}));

jest.mock('../../components/ThemeToggle', () => ({
  ThemeToggle: (): JSX.Element => <div data-testid="mock-theme-toggle">Theme Toggle</div>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }): React.ReactNode =>
    children,
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string): string => key === 'login' ? 'Sign In' : key === 'register' ? 'Sign Up' : key === 'logout' ? 'Log Out' : key,
}));

describe('Header Component', () => {
  it('renders sign in and sign up buttons when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Header />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders logout button when user is logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([{ uid: '123' }, false]);

    render(<Header />);

    expect(screen.getByText('Log Out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
