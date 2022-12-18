import { FirebaseFunction, HttpErrorResponse, StatusEnum } from './Firebase';

export enum FriendEnum {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  BLOCKED = 'blocked',
}

export type FriendItem = {
  username: string;
  id: string;
};

// friendRequest //
export type friendRequestReq = { uid: string; friendId: string };
export type friendRequestRes = {
  status: StatusEnum.OK | StatusEnum.CREATED;
  data: {
    message:
      | 'Request already pending.'
      | 'Already friends.'
      | 'Friend request sent!'
      | 'Added friend.';
  };
};

export type friendRequestFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: friendRequestReq,
  context: Parameters<FirebaseFunction>[2],
) => Promise<friendRequestRes | HttpErrorResponse>;

// getFriends //
export type getFriendsReq = { uid: string };
export type getFriendsRes = {
  status: StatusEnum.OK;
  data: {
    friends: FriendItem[];
    requests: FriendItem[];
    pending: FriendItem[];
  };
};

export type getFriendsFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: getFriendsReq,
  context: Parameters<FirebaseFunction>[2],
) => Promise<getFriendsRes | HttpErrorResponse>;

// rejectFriend //
export type rejectFriendReq = { uid: string; friendId: string };
export type rejectFriendRes = {
  status: StatusEnum.OK;
  data: {
    message: 'Request not found.' | 'Already friends.' | 'Rejected friend request.';
  };
};

export type rejectFriendFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: rejectFriendReq,
  context: Parameters<FirebaseFunction>[2],
) => Promise<rejectFriendRes | HttpErrorResponse>;
