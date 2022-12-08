import { FirebaseFunction, HttpErrorResponse, StatusEnum } from './firebase';
import { IUser } from './User';

export enum LoginEnum {
  GOOGLE = 'google',
  APPLE = 'apple',
  GUEST = 'guest',
}

const removeFromArray = (array: any[], value: any) => {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
  return array;
};

export const loginMap = removeFromArray(Object.values(LoginEnum), LoginEnum.GUEST) as Exclude<
  LoginEnum,
  LoginEnum.GUEST
>[];

// Functions
export type loginReq = { uid: string; userObj: IUser; nonce: number; expoToken?: string };
export type loginRes = {
  status: StatusEnum.OK;
  data: { userObj: IUser; token: string };
};

export type loginFunction = (
  admin: Parameters<FirebaseFunction>[0],
  data: loginReq,
  context: Parameters<FirebaseFunction>[2],
) => Promise<loginRes | HttpErrorResponse>;
