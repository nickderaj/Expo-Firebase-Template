import { handleError } from '../../helpers';
import { FirebaseFunction, StatusEnum } from '../../models/firebase';

const helloWorld: FirebaseFunction = async (admin, data, context) => {
  try {
    return {
      status: StatusEnum.OK,
      data: `Hello world`,
    };
  } catch (error) {
    return handleError(error);
  }
};

export default helloWorld;
