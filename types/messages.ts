export type TSnackbarMessage = {
  active: boolean;
  status: 'none' | 'success' | 'error';
  content: string;
};