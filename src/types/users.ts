export type AuthUser = {
  displayName: string | null;
  email: string | null;
};

export type FirestoreUser = {
  id: string;
  name: string | null;
  email: string;
  profile_photo: string | null;
  profile_background: string | null;
  username: string | null;
  acepted_terms: string;
  acepted_privacy: string;
  theme: 'dark' | 'light' | null;
  savedPosts: string[] | null;
};

export type StoreUser = {
  authUser: AuthUser | null;
  firestoreUser: FirestoreUser | null;
};