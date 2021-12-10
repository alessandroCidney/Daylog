import { Middleware } from '@nuxt/types';
import { StoreUser } from '@/types/users';

const theme: Middleware = ({ store, app }) => {
  function setTheme (option: 'light' | 'dark' | undefined) {
    if (!app.vuetify) {
      return;
    };

    if (!option || option === 'light') {
      app.vuetify.framework.theme.dark = false;
    } else if (option === 'dark') {
      app.vuetify.framework.theme.dark = true;
    };
  };
  
  const user = store.getters.user as StoreUser | null;

  if (!user) {
    return;
  };

  const userTheme = user.firestoreUser.theme;
  setTheme(userTheme);
};

export default theme;