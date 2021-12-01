import { User } from 'firebase/auth';

export type FirestoreUser = {
  name: string;
  email: string;
};

export type StoreUser = {
  authUser: User;
  firestoreUser: FirestoreUser;
};