import { handleError } from '../../helpers';
import { StatusEnum } from '../../models/firebase';
import { LoginFunction } from './auth.types';

const login: LoginFunction = async (admin, data, context) => {
  const { uid } = data;
  try {
    return {
      status: StatusEnum.OK,
      data: `Hello ${uid}`,
    };
  } catch (error) {
    return handleError(error);
  }
};

export default login;
