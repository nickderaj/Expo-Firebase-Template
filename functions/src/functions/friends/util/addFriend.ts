import { Admin, StatusEnum, Transaction } from '@/models/Firebase';
import { FriendEnum } from '@/models/Friends';

export const addFriend = (
  uid: string,
  friendId: string,
  admin: Admin,
  transaction: Transaction,
  pendingRef: FirebaseFirestore.DocumentReference,
): { status: StatusEnum.CREATED; data: { message: 'Added friend.' } } => {
  const timeNow = admin.firestore.FieldValue.serverTimestamp();
  const db = admin.firestore();

  // 1. Mark friend's request as accepted
  const existingLog = db.doc(`users/${friendId}/user_data/logs/friend_log/${uid}`);
  transaction.set(existingLog, { status: FriendEnum.ACCEPTED }, { merge: true });

  // 2. Add to user's friends list
  const currentUserFriends = db.doc(`users/${uid}/friends/${friendId}`);
  transaction.set(currentUserFriends, {
    friend_id: friendId,
    created_at: timeNow,
  });

  // 3. Add to friend's friend list
  const targetUserFriends = db.doc(`users/${friendId}/friends/${uid}`);
  transaction.set(targetUserFriends, {
    friend_id: friendId,
    created_at: timeNow,
  });

  // 4. Delete pending request
  transaction.delete(pendingRef);

  return {
    status: StatusEnum.CREATED,
    data: {
      message: 'Added friend.',
    },
  };
};
