import { removeFromArray } from '../util/helpers';

export enum LoginEnum {
  GOOGLE = 'google',
  APPLE = 'apple',
  GUEST = 'guest',
}

export const loginMap = removeFromArray(Object.values(LoginEnum), LoginEnum.GUEST) as Exclude<
  LoginEnum,
  LoginEnum.GUEST
>[];
