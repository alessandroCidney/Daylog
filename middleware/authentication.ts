import { Middleware } from '@nuxt/types';

const authentication: Middleware = (context) => {
  console.log('Authentication', context);
};

export default authentication;