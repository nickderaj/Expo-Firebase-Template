import { handleError } from '@/helpers/helpers';
import { updateExpoFunction } from '@/models/Notifications';

const updateExpoToken: updateExpoFunction = async (admin, data) => {
  // Check for params
  const { uid, expoToken } = data;
  if (!uid) throw new Error('User id is required');
  const db = admin.firestore();

  try {
    return await db.runTransaction(async transaction => {
      // Check if user exists
      const userDocRef = db.doc(`users/${uid}`);
      const userDocSnap = await transaction.get(userDocRef);
      const petDocRef = db.doc(`users/${uid}/pet/pet_data`);
      if (!userDocSnap.data()) throw new Error('Profile not found');
      if (!expoToken) {
        transaction.set(petDocRef, { notifications: false }, { merge: true });

        return {
          status: 200,
          data: { message: 'notifications rejected.', token: null },
        };
      }
      // Update expo token
      const userPublicRef = userDocRef.collection('public').doc('data');
      transaction.set(userPublicRef, { expoToken }, { merge: true });
      transaction.set(petDocRef, { notifications: true }, { merge: true });

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
