import { handleError, userExists } from '@/helpers/helpers';
import { StatusEnum } from '@/models/Firebase';
import { FriendEnum, friendRequestFunction } from '@/models/Friends';
import { addToFriendList } from './common/friendHelpers';

const sendFriendRequest: friendRequestFunction = async (admin, data, context) => {
  try {
    const { uid, friendId } = data; // add email to userObj
    if (!uid || !friendId) throw new Error('Required params: uid, friendId');
    if (uid === friendId) throw new Error('uid & friendId are the same.');
    const db = admin.firestore();

    if (!(await userExists(admin, uid))) throw new Error('Profile not found.');
    if (!(await userExists(admin, friendId))) throw new Error('User not found.');

    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const dataRef = userRef.collection('user_data');
      const logRef = dataRef.doc('logs').collection('friend_log');

      // 1. Check if a request has already been sent
      const existingLog = logRef
        .where('friend_id', '==', friendId)
        .orderBy('created_at', 'desc')
        .limit(1);
      const logs = await transaction.get(existingLog);
      if (!logs.empty && logs.docs[0].data().status === 'pending') {
        return {
          status: StatusEnum.OK,
          data: { message: 'Request already pending.' },
        };
      }

      // 2. Check if they are already friends
      const friendsRef = userRef.collection('friends').where('friend_id', '==', friendId);
      const friends = await transaction.get(friendsRef);
      if (!friends.empty && friends.docs[0].exists) {
        return {
          status: StatusEnum.OK,
          data: { message: 'Already friends.' },
        };
      }

      // 3. Log new request
      const timeNow = admin.firestore.FieldValue.serverTimestamp();

      const newLogRef = logRef.doc();
      transaction.set(newLogRef, {
        friend_id: friendId,
        status: FriendEnum.PENDING,
        created_at: timeNow,
      });

      // 4. Check if friend send a request to user already - then add as friends

      const pendingRef = db.doc(`users/${uid}/friend_requests/${friendId}`);
      const pending = await transaction.get(pendingRef);
      if (pending.exists) {
        return addToFriendList(uid, friendId, admin, transaction, pendingRef);
      }

      // 5. Send request
      const friendRequestRef = db.doc(`users/${friendId}/friend_requests/${uid}`);
      transaction.set(friendRequestRef, {
        friend_id: uid,
        status: FriendEnum.PENDING,
        created_at: timeNow,
      });

      return {
        status: StatusEnum.OK,
        data: {
          message: 'Friend request sent!',
        },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default sendFriendRequest;
