export type AuthUser = {
  displayName: string | null;
  email: string | null;
  authProviders: string[];
};

export type FirestoreUser = {
  id: string;
  name: string | null;
  email: string;
  profile_photo: string | null;
  profile_background: string | null;
  username: string;
  acepted_terms: string;
  acepted_privacy: string;
  theme: 'dark' | 'light' | null;
  savedPosts: string[] | null;
  created_at: number;
};

export type StoreUser = {
  authUser: AuthUser | null;
  firestoreUser: FirestoreUser | null;
};