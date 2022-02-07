export type AuthUser = {
  displayName: string | null;
  email: string | null;
};

export type FirestoreUser = {
  id: string;
  name: string;
  email: string;
  profile_photo: string;
  profile_background: string;
  username: string;
  acepted_terms: string;
  acepted_privacy: string;
  theme: 'dark' | 'light' | undefined;
  savedPosts: string[] | undefined;
};

export type StoreUser = {
  authUser: AuthUser;
  firestoreUser: FirestoreUser;
};