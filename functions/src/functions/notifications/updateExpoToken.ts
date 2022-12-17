import { handleError, userExists } from '@/helpers/helpers';
import { updateExpoFunction } from '@/models/Notifications';

const updateExpoToken: updateExpoFunction = async (admin, data) => {
  // Check for params
  const { uid, expoToken } = data;
  if (!uid) throw new Error('User id is required');
  if (!(await userExists(admin, uid))) throw new Error('Profile not found');
  const db = admin.firestore();

  try {
    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const publicRef = userRef.collection('public').doc('data');

      if (!expoToken) {
        transaction.set(publicRef, { notifications: false }, { merge: true });

        return {
          status: 200,
          data: { message: 'notifications rejected.', token: null },
        };
      }
      // Update expo token
      transaction.set(publicRef, { expoToken }, { merge: true });
      transaction.set(publicRef, { notifications: true }, { merge: true });

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
