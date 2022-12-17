import { handleError, splitArray, userExists } from '@/helpers/helpers';
import { sendNotiFunction } from '@/models/Notifications';
const fetch = require('node-fetch');

const sendNotification: sendNotiFunction = async (admin, data) => {
  try {
    const { users, title, body } = data;
    if (!users || !Array.isArray(users) || users.length === 0 || !title || !body) {
      throw new Error('users array, title & body are required');
    }
    const db = admin.firestore();

    // 1. Store expo tokens to send notifications too
    const tokens: { to: string; title: string; body: string }[] = [];
    await Promise.all(
      users.map(async user => {
        if (!(await userExists(admin, user))) return;

        const dataRef = db.doc(`users/${user}`).collection('user_data');
        const privateRef = await dataRef.doc('user_private').get();
        const userData = privateRef.data();
        if (!userData?.expoToken) return;

        tokens.push({ to: userData.expoToken, title, body });
      }),
    );
    if (tokens.length === 0) throw new Error('No users or tokens found');

    // 2. Create batches of 100 (limit on Expo side)
    let batchTokens = [];
    if (tokens.length > 100) {
      batchTokens = splitArray(tokens, 100);
    } else batchTokens.push(tokens);

    //  3. Send PNS through Expo
    await Promise.all(
      batchTokens.map(async batch => {
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
