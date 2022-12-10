import { handleError } from '@/helpers/helpers';
import { clickNotiFunction } from '@/models/Notifications';

const clickNotification: clickNotiFunction = async (admin, data) => {
  try {
    return await admin.firestore().runTransaction(async transaction => {
      // Check for params
      const { uid, notificationObj } = data;
      if (!uid) throw new Error('User id is required');
      if (!notificationObj) throw new Error('Expo Token is required');

      // Check if user exists
      const userDocRef = admin.firestore().doc(`users/${uid}`);
      const userDocSnap = await transaction.get(userDocRef);
      if (!userDocSnap.data()) throw new Error('Profile not found');

      // Store notification
      const createdTime = admin.firestore.FieldValue.serverTimestamp();
      const userNotificationRef = userDocRef.collection('notifications').doc(notificationObj.id);
      transaction.set(userNotificationRef, {
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
