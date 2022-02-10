import { Middleware } from '@nuxt/types';
import { FirestoreUser } from '@/types/users';

type TGetters = {
  firestoreUser: FirestoreUser | undefined;
};

const theme: Middleware = ({ store, app }) => {
  function setTheme (option: 'light' | 'dark' | null) {
    if (!app.vuetify) {
      return;
    };

    if (!option || option === 'light') {
      app.vuetify.framework.theme.dark = false;
    } else if (option === 'dark') {
      app.vuetify.framework.theme.dark = true;
    };
  };
  
  const { firestoreUser } = store.getters as TGetters;

  if (!firestoreUser) {
    return;
  };

  const userTheme = firestoreUser.theme;
  setTheme(userTheme);
};

export default theme;