import { handleError } from '@/helpers/helpers';
import { loginFunction } from '@/models/Auth';
import { StatusEnum } from '@/models/Firebase';
import { IUser } from '@/models/User';

const login: loginFunction = async (admin, data, context) => {
  const { uid, userObj, nonce, expoToken } = data; // add email to userObj
  if (!uid || !userObj || !nonce) throw new Error('Required params: uid, userObj, nonce');

  const db = admin.firestore();
  try {
    return await db.runTransaction(async transaction => {
      const userDocRef = db.doc(`users/${uid}`);
      const userPublicRef = userDocRef.collection('public').doc('data');
      const userLoginLogRef = userDocRef.collection('login_log').doc();

      const userDocSnap = await transaction.get(userDocRef);
      const timeNow = admin.firestore.FieldValue.serverTimestamp();

      // 1. Create new user if they don't exist
      if (!userDocSnap.data()) {
        transaction.set(userDocRef, { ...userObj });
        transaction.set(userPublicRef, { nonce }, { merge: true });
        transaction.set(userLoginLogRef, { created_at: timeNow, path: 'app' });
      } else transaction.set(userLoginLogRef, { created_at: timeNow, path: 'app' });

      // 2. Set notification token
      if (expoToken) {
        const userPublicRef = userDocRef.collection('public').doc('data');
        transaction.set(userPublicRef, { expoToken }, { merge: true });
      }

      // 3. Generate custom token
      const firebaseToken = await admin.auth().createCustomToken(data.uid);

      const userData = (userDocSnap.data() as IUser) || userObj;
      return {
        status: StatusEnum.OK,
        data: {
          userObj: userData,
          token: firebaseToken,
        },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default login;
