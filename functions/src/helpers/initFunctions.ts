import { projectRegion } from '@/constants/project.constants';
import auth from '@/functions/auth';
import { FirebaseFunction } from '@/models/firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const httpsCall = (fn: FirebaseFunction) =>
  functions.https.onCall(async (data, context) => await fn(admin, data, context));

export const isCalled = (name: string) =>
  !process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === name;
export const initFunction = (name: string) => httpsCall(functionMap[name]);
export const scheduleFunction = (name: string, schedule: string) => {
  return functions
    .region(projectRegion)
    .pubsub.schedule(schedule) // in utc time
    .timeZone('UTC')
    .onRun(() => {
      return functionMap[name](admin);
    });
};

const functionMap: { [idx: string]: FirebaseFunction } = {
  login: auth.login,
};
