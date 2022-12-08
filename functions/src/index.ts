import { initFunction, isCalled } from '@/util/initFunctions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../service.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const functionNames = ['login'];
functionNames.forEach((fn: string) => {
  if (isCalled(fn)) exports[fn] = initFunction(fn);
});
