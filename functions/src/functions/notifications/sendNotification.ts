import { handleError, splitArray, userExists } from '@/helpers/helpers';
import { sendNotiFunction } from '@/models/Notifications';

const fetch = require('node-fetch');
const sendNotification: sendNotiFunction = async (admin, data) => {
  try {
    // Check for params
    const { users, title, body } = data;
    if (!users || !Array.isArray(users) || users.length === 0 || !title || !body) {
      throw new Error('users array, title & body are required');
    }
    const db = admin.firestore();

    const tokens: { to: string; title: string; body: string }[] = [];
    await Promise.all(
      users.map(async user => {
        if (!userExists(admin, user)) return;

        // Get expo token
        const userDocRef = db.doc(`users/${user}`);
        const userDataRef = await userDocRef.collection('public').doc('data').get();
        const userData = userDataRef.data();
        if (!userData?.expoToken) return;

        // Store expo token
        tokens.push({ to: userData.expoToken, title, body });
      }),
    );
    if (tokens.length === 0) throw new Error('No users or tokens found');

    // Can only send 100 at a time through Expo backend, create batches of 100
    let batchTokens = [];
    if (tokens.length > 100) {
      batchTokens = splitArray(tokens, 100);
    } else batchTokens.push(tokens);

    await Promise.all(
      batchTokens.map(async batch => {
        // Send PNS through expo
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(batch),
        });
      }),
    );

    return { status: 200 };
  } catch (error) {
    return handleError(error);
  }
};

export default sendNotification;
