import { checkAuth, checkParams, handleError, userExists } from '@/helpers/helpers';
import { StatusEnum } from '@/models/Firebase';
import { FriendEnum, rejectFriendFunction } from '@/models/Friends';
import { alreadyFriends } from './util/alreadyFriends';

const rejectFriend: rejectFriendFunction = async (admin, data, context) => {
  try {
    const { uid, friendId } = data; // add email to userObj
    checkParams({ uid, friendId });
    checkAuth(uid, context);

    if (uid === friendId) throw new Error('uid & friendId are the same.');
    const db = admin.firestore();

    if (!(await userExists(admin, uid))) throw new Error('Profile not found.');
    if (!(await userExists(admin, friendId))) throw new Error('User not found.');

    return await db.runTransaction(async transaction => {
      // 1. Check if a request exists
      const pendingRef = db.doc(`users/${uid}/friend_requests/${friendId}`);
      const pending = await transaction.get(pendingRef);
      if (!pending.exists) {
        return {
          status: StatusEnum.OK,
          data: { message: 'Request not found.' },
        };
      }

      // 2. Check if they are already friends
      if (await alreadyFriends(admin, transaction, uid, friendId)) {
        return {
          status: StatusEnum.OK,
          data: { message: 'Already friends.' },
        };
      }

      // 3. Mark log as rejected & delete pending request
      const existingLog = db.doc(`users/${friendId}/user_data/logs/friend_log/${uid}`);
      transaction.set(existingLog, { status: FriendEnum.REJECTED }, { merge: true });
      transaction.delete(pendingRef);

      return {
        status: StatusEnum.OK,
        data: {
          message: 'Rejected friend request.',
        },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default rejectFriend;
