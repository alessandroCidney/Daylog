import { Middleware } from "@nuxt/types";
import { FirestoreUser } from "~/types/users";

type TGetters = {
  isAuthenticated: boolean;
  firestoreUser: FirestoreUser;
};

const definedUsername: Middleware = ({ store, redirect }) => {
  const { isAuthenticated, firestoreUser } = store.getters as TGetters;

  if (isAuthenticated && !firestoreUser.username) {
    return redirect('/set/username');
  };
};

export default definedUsername;