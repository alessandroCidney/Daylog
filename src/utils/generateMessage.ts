import { TApplicationMessage } from '@/types/messages';

export function generateErrorMessage (message: string): TApplicationMessage {
  
  return ({
    status: 'error',
    message,
  })
};

export function generareSuccessMessage (message: string): TApplicationMessage {
  
  return ({
    status: 'success',
    message,
  })
}
