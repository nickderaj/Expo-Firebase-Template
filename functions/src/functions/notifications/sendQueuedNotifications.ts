import { handleError } from '@/helpers/helpers';
import { sendQueueFunction } from '@/models/Notifications';
import sendNotification from './sendNotification';

const sendQueuedNotifications: sendQueueFunction = async admin => {
  try {
    // Fetch all users to send notification to
    const dateNow = new Date();
    const users = await admin
      .firestore()
      .collection('mobile_announcements')
      .where('send_date', '<=', dateNow)
      .where('sent', '==', false)
      .get();

    // Extract uid, title & body
    type notification = { id: string; title: string; body: string };
    const ungroupedNotifications: notification[] = [];
    users.forEach(user => {
      const { title, body } = user.data();
      if (!title || !body || !user.id) return;

      ungroupedNotifications.push({ id: user.id, title, body });
    });

    const groupBy = (data: notification[]) =>
      data.reduce((storage: { [idx: string]: notification[] }, item) => {
        storage[item.title] = storage[item.title] || [];
        storage[item.title].push(item);
        return storage;
      }, {});

    const groupedNotifications: notification[][] = Object.values(groupBy(ungroupedNotifications));
    // Send notifications
    await Promise.all(
      groupedNotifications.map(async (group, idx) => {
        const userIds = group.map(a => a.id);
        await sendNotification(admin, {
          users: userIds, // Send in batches to minimise API calls
          title: group[idx].title,
          body: group[idx].body,
        });
      }),
    );

    // Mark users as sent: true & log in sent notifications collection
    await Promise.all(
      ungroupedNotifications.map(async user => {
        admin.firestore().collection('mobile_announcements').doc(user.id).update({
          sent: true,
        });
        admin.firestore().collection('notifications').doc('sent').collection('komo_valley').add({
          user: user.id,
          title: user.title,
          body: user.body,
          created_at: new Date(),
        });
      }),
    );
    return {
      status: 200,
    };
  } catch (error) {
    return handleError(error);
  }
};

export default sendQueuedNotifications;
