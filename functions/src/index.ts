import * as admin from 'firebase-admin';
import { initFunction, isCalled, scheduleFunction } from './helpers/initFunctions';

const serviceAccount = require('../service.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const httpFunctions = [
  'login',
  'clickNotification',
  'queueNotification',
  'sendGlobalNotification',
  'sendQueuedNotifications',
  'updateExpoToken',
];
httpFunctions.forEach((fn: string) => {
  if (isCalled(fn)) exports[fn] = initFunction(fn);
});

const cronFrunctions = [
  { fn: 'sendQueuedNotifications', schedule: '*/10 * * * *' },
  { fn: 'sendDailyNotifications', schedule: '0 12 * * *' },
];
cronFrunctions.forEach(({ fn, schedule }) => {
  if (isCalled(fn)) exports[fn] = scheduleFunction(fn, schedule);
});
