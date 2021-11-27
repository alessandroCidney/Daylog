import { Middleware } from '@nuxt/types';

const authentication: Middleware = ({ store }) => {
  if (store.getters.isAuthenticated) {
    alert('Está autenticado!');
  } else {
    alert('Não está autenticado');
  }
};

export default authentication;