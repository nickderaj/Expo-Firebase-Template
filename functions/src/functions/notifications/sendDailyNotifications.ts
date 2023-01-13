import { handleError } from '@/helpers/helpers';
import { StatusEnum } from '@/models/Firebase';
import { globalNotiFunction } from '@/models/Notifications';
import { DAILY_MESSAGES } from '../../sourceOfTruth/notifications.sot';
import sendNotification from './sendNotification';

const sendDailyNotifications: globalNotiFunction = async admin => {
  try {
    // Users who have the "pet" collection (Komo Valley only)
    const userArr: string[] = [];
    const userRef = await admin.firestore().collectionGroup('pet').get();
    userRef.forEach(data => userArr.push(data.ref.path.split('/')[1]));
    const uniqueUsers = [...new Set(userArr)];

    // Users who are inactive for more than a day
    const queryDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    const userCollection = await admin
      .firestore()
      .collection('users')
      .where('last_login', '>', queryDate)
      .get();

    // Remove non-KV users
    const users: string[] = [];
    userCollection.forEach(user => {
      if (uniqueUsers.includes(user.data().id)) users.push(user.data().id);
    });

    // Get random title & body
    const randomMessage = () => {
      const keys = Object.keys(DAILY_MESSAGES);
      return DAILY_MESSAGES[+keys[(keys.length * Math.random()) << 0]];
    };
    const { title, body } = randomMessage();

    // Send notifications
    const res = await sendNotification(admin, {
      users: users, // Send in batches to minimise API calls
      title,
      body,
    });

    if (res.status !== StatusEnum.OK) {
      return {
        error: res.error,
        status: StatusEnum.ERROR,
      };
    } else {
      return {
        data: res.data,
        status: StatusEnum.OK,
      };
    }
  } catch (error) {
    return handleError(error);
  }
};

export default sendDailyNotifications;
