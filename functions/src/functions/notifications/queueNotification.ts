import { projectName } from '@/constants/project.constants';
import { checkAuth, checkParams, handleError, userExists } from '@/helpers/helpers';
import { queueNotiFunction } from '@/models/Notifications';

const queueNotification: queueNotiFunction = async (admin, data, context) => {
  try {
    return await admin.firestore().runTransaction(async transaction => {
      const { uid, sendDate, title, body } = data;
      checkParams({ uid, sendDate, title, body });
      checkAuth(uid, context);

      if (!(await userExists(admin, uid))) throw new Error('Profile not found.');
      const db = admin.firestore();

      // Queue notification
      const createdTime = new Date();
      const pendingRef = db.collection('notifications').doc(projectName).collection('pending');
      const notificationRef = pendingRef.doc(uid);
      transaction.set(notificationRef, {
        send_date: new Date(sendDate),
        created_at: createdTime,
        sent: false,
        title: data.title,
        body: data.body,
      });

      return {
        status: 200,
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default queueNotification;
