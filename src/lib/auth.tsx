import { AuthCredentials } from '@/app/types/shared';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';

export const handleRegister = async ({ email, password }: AuthCredentials) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    } else {
      alert('An unknown error occured');
    }
  }
};

export const handleLogin = async ({ email, password }: AuthCredentials) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    } else {
      alert('An unknown error occured');
    }
  }
};
