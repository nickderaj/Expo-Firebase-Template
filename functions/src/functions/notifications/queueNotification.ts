import { handleError } from '@/helpers/helpers';
import { queueNotiFunction } from '@/models/Notifications';

const queueNotification: queueNotiFunction = async (admin, data) => {
  try {
    return await admin.firestore().runTransaction(async transaction => {
      // Check for params
      const { uid, sendDate, title, body } = data;
      if (!uid || !sendDate || !title || !body) throw new Error('uid & sendDate are required');

      // Check if user exists
      const userDocRef = admin.firestore().doc(`users/${uid}`);
      const userDocSnap = await transaction.get(userDocRef);
      if (!userDocSnap.data()) throw new Error('Profile not found.');

      // Queue notification
      const createdTime = new Date();
      const userNotificationRef = admin.firestore().doc(`mobile_announcements/${uid}`);
      transaction.set(userNotificationRef, {
        send_date: new Date(sendDate),
        created_at: createdTime,
        sent: false, // set to true once notification sent out
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
