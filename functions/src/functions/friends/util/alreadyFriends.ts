import { Admin, Transaction } from '@/models/Firebase';

export const alreadyFriends = async (
  admin: Admin,
  transaction: Transaction,
  uid: string,
  friendId: string,
) => {
  const db = admin.firestore();

  const friendsRef = db.collection(`users/${uid}/friends`).where('friend_id', '==', friendId);
  const friends = await transaction.get(friendsRef);
  return !friends.empty && friends.docs[0].exists;
};
