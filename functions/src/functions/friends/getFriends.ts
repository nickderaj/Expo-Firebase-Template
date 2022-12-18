import { checkAuth, checkParams, handleError, userExists } from '@/helpers/helpers';
import { StatusEnum } from '@/models/Firebase';
import { FriendItem, getFriendsFunction } from '@/models/Friends';
import { fillUsernames } from './util/getUsername';

const getFriends: getFriendsFunction = async (admin, data, context) => {
  try {
    const { uid } = data; // add email to userObj
    checkParams({ uid });
    checkAuth(uid, context);
    if (!(await userExists(admin, uid))) throw new Error('Profile not found.');

    const db = admin.firestore();
    const friends: FriendItem[] = [];
    const requests: FriendItem[] = [];
    const pending: FriendItem[] = [];

    // 1. Get list of friends & requests
    const friendCol = await db.collection(`users/${uid}/friends`).get();
    const requestCol = await db.collection(`users/${uid}/friend_requests`).get();

    // 2. Get list of pending requests
    const pendingCol = await db
      .collection(`users/${uid}/user_data/logs/friend_log`)
      .where('status', '==', 'pending')
      .get();

    // 3. Get usernames
    await Promise.allSettled(
      friendCol.docs.map(async friend => await fillUsernames(friend, friends, db)),
    );
    await Promise.allSettled(
      requestCol.docs.map(async friend => await fillUsernames(friend, requests, db)),
    );
    await Promise.allSettled(
      pendingCol.docs.map(async friend => await fillUsernames(friend, pending, db)),
    );

    return {
      status: StatusEnum.OK,
      data: {
        friends,
        requests,
        pending,
      },
    };
  } catch (error) {
    return handleError(error);
  }
};

export default getFriends;
