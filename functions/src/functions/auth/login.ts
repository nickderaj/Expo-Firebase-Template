import { projectName } from '@/constants/firebase.constants';
import { handleError, randomFromArray, userExists } from '@/helpers/helpers';
import { nameArray } from '@/helpers/nameArray';
import { loginFunction } from '@/models/Auth';
import { StatusEnum } from '@/models/Firebase';
import { IUser } from '@/models/User';

const login: loginFunction = async (admin, data, context) => {
  const { uid, loginMethod, expoToken } = data; // add email to userObj
  if (!uid || !loginMethod) throw new Error('Required params: uid, loginMethod, nonce');
  const db = admin.firestore();

  try {
    const userObj: IUser = {
      id: uid,
      username: `${randomFromArray(nameArray)}_${uid.substring(0, 5)}`,
      login_method: loginMethod,
      created_at: new Date(),
    };

    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const publicRef = userRef.collection('public').doc('data');
      const loginRef = userRef.collection('login_log').doc();

      const userDoc = await transaction.get(userRef);
      const timeNow = admin.firestore.FieldValue.serverTimestamp();

      // 1. Create new user if they don't exist
      if (!(await userExists(admin, uid))) {
        const nonce = Math.floor(Math.random() * 1000000);

        transaction.set(userRef, { ...userObj });
        transaction.set(publicRef, { nonce });
        transaction.set(loginRef, { created_at: timeNow, path: projectName });
      } else transaction.set(loginRef, { created_at: timeNow, path: projectName });

      // 2. Set notification token
      if (expoToken) transaction.set(publicRef, { expoToken }, { merge: true });

      return {
        status: StatusEnum.OK,
        data: {
          userObj: (userDoc.data() as IUser) || userObj,
        },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default login;
