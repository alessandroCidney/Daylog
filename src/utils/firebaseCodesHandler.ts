export type TFirebaseCodesHandler = (code: string) => string;

function firebaseCodesHandler (code: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'The email entered is invalid.';
      break;
    case 'auth/wrong-password':
      return 'The data entered is invalid.';
      break;
    default:
      return '';
  }
};

export default firebaseCodesHandler;