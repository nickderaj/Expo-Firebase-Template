import { FirebaseFunction, HttpErrorResponse, StatusEnum } from './Firebase';

export enum FriendEnum {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  REJECTED = 'rejected',
  BLOCKED = 'blocked',
}

// sendFriendRequest //
export type friendRequestReq = { uid: string; friendId: string };
export type friendRequestRes = {
  status: StatusEnum.OK;
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
