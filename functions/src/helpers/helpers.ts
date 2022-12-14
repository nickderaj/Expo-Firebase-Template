/* eslint-disable @typescript-eslint/no-explicit-any */

import { Admin, StatusEnum } from '@/models/Firebase';
import { CallableContext } from 'firebase-functions/v1/https';

// Firebase Helpers
export const handleError = (error: unknown): { status: StatusEnum.ERROR; error: string } => {
  console.log('Error: ', error);

  let message = 'Something went wrong';
  if (error instanceof Error) message = error.message;

  return {
    status: StatusEnum.ERROR,
    error: message,
  };
};

export const userExists = async (admin: Admin, uid: string) => {
  const userRef = admin.firestore().doc(`users/${uid}`);
  const user = await userRef.get();
  if (!user.exists) return false;
  return true;
};

export const checkAuth = (uid: string, context?: CallableContext) => {
  if (!context?.auth || context.auth.uid !== uid) throw new Error('User not authenticated');
};

export const checkParams = (paramObj: { [idx: string]: any }) => {
  for (const i in paramObj) {
    if (!paramObj[i]) throw new Error(`${i} is a required parameter.`);
  }
};

// Misc. Helpers
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];
// example: RequireAtLeastOne<{ id: string, click?: number, component?: string }, 'click' | 'component'>;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
// example: Range<1,6> means 1 | 2 | 3 | 4 | 5

export const removeFromArray = (array: any[], value: any) => {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
  return array;
};

export const splitArray = (arr: any[], chunkSize: number) => {
  if (chunkSize <= 0) throw new Error('Invalid chunk size');
  const tempArr = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    tempArr.push(arr.slice(i, i + chunkSize));
  }
  return tempArr;
};

export const randomFromArray = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
