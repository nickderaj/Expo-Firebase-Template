import { handleError, userExists } from '@/helpers/helpers';
import { loginFunction } from '@/models/Auth';
import { StatusEnum } from '@/models/Firebase';
import { IUser } from '@/models/User';

const login: loginFunction = async (admin, data, context) => {
  const { uid, userObj, expoToken } = data; // add email to userObj
  if (!uid || !userObj) throw new Error('Required params: uid, userObj, nonce');
  const db = admin.firestore();

  try {
    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const publicRef = userRef.collection('public').doc('data');
      const loginRef = userRef.collection('login_log').doc();

      const userDoc = await transaction.get(userRef);
      const timeNow = admin.firestore.FieldValue.serverTimestamp();

      // 1. Create new user if they don't exist
      if (!userExists(admin, uid)) {
        const nonce = Math.floor(Math.random() * 1000000);

        transaction.set(userRef, { ...userObj });
        transaction.set(publicRef, { nonce });
        transaction.set(loginRef, { created_at: timeNow, path: 'app' });
      } else transaction.set(loginRef, { created_at: timeNow, path: 'app' });

      // 2. Set notification token
      if (expoToken) transaction.set(publicRef, { expoToken }, { merge: true });

      const userData = (userDoc.data() as IUser) || userObj;
      return {
        status: StatusEnum.OK,
        data: {
          userObj: userData,
        },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default login;
