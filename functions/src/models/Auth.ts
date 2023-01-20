import { removeFromArray } from '../helpers/helpers';
import { FirebaseFunction, HttpErrorResponse, StatusEnum } from './firebase';
import { IUser } from './User';

export enum LoginEnum {
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  GUEST = 'guest',
}

export const loginMap = removeFromArray(Object.values(LoginEnum), LoginEnum.GUEST) as Exclude<
  LoginEnum,
  LoginEnum.GUEST
>[];

// login //
export type loginReq = { uid: string; loginMethod: LoginEnum; expoToken?: string };
export type loginRes = {
  status: StatusEnum.OK;
  data: { userObj: IUser };
};

export type loginFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: loginReq,
  context: Parameters<FirebaseFunction>[2],
) => Promise<loginRes | HttpErrorResponse>;
