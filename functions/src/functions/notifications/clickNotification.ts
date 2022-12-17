import { handleError, userExists } from '@/helpers/helpers';
import { clickNotiFunction } from '@/models/Notifications';

const clickNotification: clickNotiFunction = async (admin, data) => {
  try {
    return await admin.firestore().runTransaction(async transaction => {
      const { uid, notificationObj } = data;
      if (!uid || !notificationObj) throw new Error('uid & notificationObj are required');
      if (!(await userExists(admin, uid))) throw new Error('Profile not found');
      const db = admin.firestore();

      // Store notification
      const userRef = db.doc(`users/${uid}`);
      const createdTime = admin.firestore.FieldValue.serverTimestamp();
      const notificationRef = userRef.collection('notifications').doc();
      transaction.set(notificationRef, {
        ...notificationObj,
        created_at: createdTime,
      });

      return { status: 200 };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default clickNotification;
