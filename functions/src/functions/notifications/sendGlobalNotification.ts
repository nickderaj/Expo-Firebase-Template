import { handleError } from '@/helpers/helpers';
import { StatusEnum } from '@/models/Firebase';
import { globalNotiFunction } from '@/models/Notifications';
import sendNotification from './sendNotification';

const sendGlobalNotification: globalNotiFunction = async (admin, data) => {
  // TODO: password protect this function
  const { title, body } = data;
  if (!title || !body) throw new Error('title and body required.');

  try {
    const userArr: string[] = [];
    const users = await admin.firestore().collectionGroup('pet').get();
    users.forEach(data => userArr.push(data.ref.path.split('/')[1]));
    const uniqueUsers = [...new Set(userArr)];

    const res = await sendNotification(admin, {
      users: uniqueUsers,
      title,
      body,
    });

    if (res.status !== StatusEnum.OK) {
      return {
        error: res.error,
        status: StatusEnum.ERROR,
      };
    } else {
      return {
        data: res.data,
        status: StatusEnum.OK,
      };
    }
  } catch (error) {
    return handleError(error);
  }
};

export default sendGlobalNotification;
