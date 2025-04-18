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

describe('Header Component', () => {
  it('renders sign in and sign up buttons when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Header />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
