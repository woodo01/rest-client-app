import { handleRegister, handleLogin, handleSignOut } from './auth';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

jest.mock('../hooks/useToast', () => ({
  toast: jest.fn(),
}));

jest.mock('../firebaseConfig', () => ({
  auth: {},
  db: {},
}));

jest.mock('@firebase/app', () => {
  interface MockFirebaseErrorInstance {
    code: string;
    message: string;
    name: string;
  }

  const MockFirebaseError = function (
    this: MockFirebaseErrorInstance,
    code: string,
    message: string
  ): void {
    this.code = code;
    this.message = message;
    this.name = 'FirebaseError';
  };

  MockFirebaseError.prototype = Object.create(Error.prototype);
  MockFirebaseError.prototype.constructor = MockFirebaseError;

  return {
    FirebaseError: MockFirebaseError,
  };
});

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from '@/hooks/useToast';
import { FirebaseError } from '@firebase/app';

describe('Auth Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleRegister', () => {
    it('should register a user successfully', async () => {
      const mockUser = { uid: 'test-uid' };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
        user: mockUser,
      });
      (collection as jest.Mock).mockReturnValueOnce('users-collection');
      (addDoc as jest.Mock).mockResolvedValueOnce({});

      await handleRegister({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'users');
      expect(addDoc).toHaveBeenCalledWith('users-collection', {
        uid: 'test-uid',
        authProvider: 'local',
        email: 'test@example.com',
      });
      expect(toast).not.toHaveBeenCalled();
    });

    it('should handle registration error', async () => {
      const error = new FirebaseError(
        'auth/email-already-in-use',
        'Email already in use'
      );
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
        error
      );

      await handleRegister({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(toast).toHaveBeenCalledWith({
        title: 'auth/email-already-in-use',
        description: 'Email already in use',
        variant: 'destructive',
        duration: 3000,
        color: 'red',
      });
    });
  });

  describe('handleLogin', () => {
    it('should login a user successfully', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});

      await handleLogin({ email: 'test@example.com', password: 'password123' });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(toast).not.toHaveBeenCalled();
    });

    it('should handle login error', async () => {
      const error = new FirebaseError('auth/wrong-password', 'Wrong password');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);

      await handleLogin({ email: 'test@example.com', password: 'password123' });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(toast).toHaveBeenCalledWith({
        title: 'auth/wrong-password',
        description: 'Wrong password',
        variant: 'destructive',
        duration: 3000,
        color: 'red',
      });
    });
  });

  describe('handleSignOut', () => {
    it('should sign out a user successfully', async () => {
      (signOut as jest.Mock).mockResolvedValueOnce({});

      await handleSignOut();

      expect(signOut).toHaveBeenCalledWith(expect.anything());
    });
  });
});
