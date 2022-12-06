import { FirebaseFunction } from '@/models/firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { login } from '../functions/auth';
import { helloWorld } from '../functions/test';

const httpsCall = (fn: FirebaseFunction) => {
  return functions.https.onCall(async (data, context) => {
    console.log(process.env.FUNCTION_TARGET);
    return await fn(admin, data, context);
  });
};

export const initFunction = (name: string) => {
  if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === name) {
    exports[name] = httpsCall(functionMap[name]);
  }
};

const functionMap: { [idx: string]: FirebaseFunction } = {
  login,
  helloWorld,
};
