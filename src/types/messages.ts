export type TSnackbarMessage = {
  active: boolean;
  status: 'none' | 'success' | 'error';
  message: string;
};

export type TApplicationMessage = {
  status: 'success' | 'error';
  message: string;
};