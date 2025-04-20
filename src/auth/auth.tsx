import { AuthCredentials } from '@/app/types/shared';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { FirebaseError } from '@firebase/app';
import { toast } from '@/hooks/useToast';

export const handleRegister = async ({
  email,
  password,
}: AuthCredentials): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast({
        title: error.code,
        description: error.message,
        variant: 'destructive',
        duration: 3000,
        color: 'red',
      });
    }
  }
};

export const handleLogin = async ({
  email,
  password,
}: AuthCredentials): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast({
        title: error.code,
        description: error.message,
        variant: 'destructive',
        duration: 3000,
        color: 'red',
      });
    }
  }
};

export const handleSignOut = async (): Promise<void> => {
  await signOut(auth);
};
