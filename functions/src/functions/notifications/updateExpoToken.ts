import { handleError, userExists } from '@/helpers/helpers';
import { updateExpoFunction } from '@/models/Notifications';

const updateExpoToken: updateExpoFunction = async (admin, data) => {
  try {
    const { uid, expoToken } = data;
    if (!uid) throw new Error('uid is required');
    if (!(await userExists(admin, uid))) throw new Error('Profile not found.');
    const db = admin.firestore();

    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const privateRef = userRef.collection('user_data').doc('user_private');

      if (!expoToken) {
        transaction.set(privateRef, { notifications: false }, { merge: true });

        return {
          status: 200,
          data: { message: 'notifications rejected.', token: null },
        };
      }
      // Update expo token
      transaction.set(privateRef, { expoToken, notifications: true }, { merge: true });

      return {
        status: 200,
        data: { message: 'notifications allowed.', token: expoToken },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default updateExpoToken;
