import { StatusEnum } from '../models/Firebase';

export const handleError = (error: unknown) => {
  console.log('Error: ', error);

  let message = 'Something went wrong';
  if (error instanceof Error) message = error.message;

  return {
    status: StatusEnum.ERROR,
    error: message,
  };
};
