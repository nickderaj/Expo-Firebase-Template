import { Admin, StatusEnum, Transaction } from '@/models/Firebase';

export const addToFriendList = (
  uid: string,
  friendId: string,
  admin: Admin,
  transaction: Transaction,
  pendingRef: FirebaseFirestore.DocumentReference,
): { status: StatusEnum.OK; data: { message: 'Added friend.' } } => {
  const timeNow = admin.firestore.FieldValue.serverTimestamp();
  const db = admin.firestore();

  const currentUserFriends = db.doc(`users/${uid}/friends/${friendId}`);
  transaction.set(currentUserFriends, {
    friend_id: friendId,
    created_at: timeNow,
  });

  const targetUserFriends = db.doc(`users/${friendId}/friends/${uid}`);
  transaction.set(targetUserFriends, {
    friend_id: friendId,
    created_at: timeNow,
  });

  transaction.delete(pendingRef);

  return {
    status: StatusEnum.OK,
    data: {
      message: 'Added friend.',
    },
  };
};
