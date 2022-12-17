import { handleError, userExists } from '@/helpers/helpers';
import { StatusEnum } from '@/models/Firebase';
import { FriendEnum, friendRequestFunction } from '@/models/Friends';
import { addFriend } from './util/addFriend';

const friendRequest: friendRequestFunction = async (admin, data, context) => {
  try {
    const { uid, friendId } = data; // add email to userObj
    if (!uid || !friendId) throw new Error('Required params: uid, friendId');
    if (uid === friendId) throw new Error('uid & friendId are the same.');
    const db = admin.firestore();

    if (!(await userExists(admin, uid))) throw new Error('Profile not found.');
    if (!(await userExists(admin, friendId))) throw new Error('User not found.');

    return await db.runTransaction(async transaction => {
      const userRef = db.doc(`users/${uid}`);
      const logRef = userRef
        .collection('user_data')
        .doc('logs')
        .collection('friend_log')
        .doc(friendId);

      // 1. Check if a request has already been sent
      const logs = await transaction.get(logRef);
      if (logs.data()?.status === 'pending') {
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

      const pendingRef = db.doc(`users/${uid}/friend_requests/${friendId}`);
      const pending = await transaction.get(pendingRef);
      const timeNow = admin.firestore.FieldValue.serverTimestamp();

      // 3. Check if friend send a request to user already - then add as friends
      if (pending.exists) {
        return addFriend(uid, friendId, admin, transaction, pendingRef);
      } else {
        // 4. Log new request
        transaction.set(logRef, {
          friend_id: friendId,
          status: FriendEnum.PENDING,
          created_at: timeNow,
        });
      }

      // 5. Send request
      const friendRequestRef = db.doc(`users/${friendId}/friend_requests/${uid}`);
      transaction.set(friendRequestRef, {
        friend_id: uid,
        status: FriendEnum.PENDING,
        created_at: timeNow,
      });

      return {
        status: StatusEnum.CREATED,
        data: {
          message: 'Friend request sent!',
        },
      };
    });
  } catch (error) {
    return handleError(error);
  }
};

export default friendRequest;
