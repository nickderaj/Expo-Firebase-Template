import { FriendItem } from '@/models/Friends';

export const fillUsernames = async (
  friend: FirebaseFirestore.QueryDocumentSnapshot,
  output: FriendItem[],
  db: FirebaseFirestore.Firestore,
) => {
  const uid = friend.data().friend_id;
  const user = await db.doc(`users/${uid}`).get();
  output.push({ username: user.data()?.username, id: uid });
};
