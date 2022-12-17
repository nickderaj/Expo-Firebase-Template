import { projectName } from '@/constants/firebase.constants';
import { handleError, userExists } from '@/helpers/helpers';
import { queueNotiFunction } from '@/models/Notifications';

const queueNotification: queueNotiFunction = async (admin, data) => {
  try {
    return await admin.firestore().runTransaction(async transaction => {
      const { uid, sendDate, title, body } = data;
      if (!uid || !sendDate || !title || !body) {
        throw new Error('uid, sendDate, title & body are required');
      }
      if (!userExists(admin, uid)) throw new Error('Profile not found.');
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
