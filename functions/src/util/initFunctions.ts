import { login } from '@/functions/auth';
import { FirebaseFunction } from '@/models/firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const httpsCall = (fn: FirebaseFunction) =>
  functions.https.onCall(async (data, context) => await fn(admin, data, context));

export const isCalled = (name: string) =>
  !process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === name;
export const initFunction = (name: string) => httpsCall(functionMap[name]);

const functionMap: { [idx: string]: FirebaseFunction } = {
  login,
};
