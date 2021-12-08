import { User } from 'firebase/auth';

export type FirestoreUser = {
  id: string;
  name: string;
  email: string;
  profile_photo: string;
  profile_background: string;
  username: string;
  acepted_terms: string;
  acepted_privacy: string
};

export type StoreUser = {
  authUser: User;
  firestoreUser: FirestoreUser;
};