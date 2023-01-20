import { projectName } from '@/constants/project.constants';
import {
  checkAuth,
  checkParams,
  handleError,
  randomFromArray,
  userExists,
} from '@/helpers/helpers';
import { nameArray } from '@/helpers/nameArray';
import { loginFunction } from '@/models/Auth';
import { StatusEnum } from '@/models/Firebase';
import { IUser } from '@/models/User';

const login: loginFunction = async (admin, data, context) => {
  try {
    const { uid, loginMethod } = data; // add email to userObj
    checkParams({ uid, loginMethod });
    checkAuth(uid, context);

    const db = admin.firestore();

    const userObj: IUser = {
      id: uid,
      username: `${randomFromArray(nameArray)}_${uid.substring(0, 5)}`,
      login_method: loginMethod,
      created_at: new Date(),
    };

    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const dataRef = userRef.collection('user_data');
      const publicRef = dataRef.doc('user_public');
      const loginRef = dataRef.doc('logs').collection('login_log').doc();

      const userDoc = await transaction.get(userRef);
      const timeNow = admin.firestore.FieldValue.serverTimestamp();

      // 1. Create new user if they don't exist
      if (!(await userExists(admin, uid))) {
        transaction.set(userRef, { ...userObj });
        transaction.set(publicRef, { nonce: Math.floor(Math.random() * 1000000) });
        transaction.set(loginRef, { created_at: timeNow, path: projectName });
      } else transaction.set(loginRef, { created_at: timeNow, path: projectName });

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
