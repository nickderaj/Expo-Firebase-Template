import { functions } from '@/firebase/config'
import { httpsCallable } from 'firebase/functions'

// Store expo token for notifications
export const updateExpoToken = async (uid: string, expoToken?: string) => {
  if (!uid) return
  const updateExpoToken = httpsCallable(functions, 'updateExpoToken')
  const res = await updateExpoToken({ uid, expoToken })
  return res.data
}

// Log when a user clicks a notification
export const clickNotification = async (uid: string, notificationObj: any) => {
  try {
    const fetchConfig = httpsCallable<{ uid: string; notificationObj: any }, { data: any }>(
      functions,
      'clickNotification',
    )
    const res = (await fetchConfig({ uid, notificationObj })).data
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// Queues a notification to be sent after a delay (in hours)
export const queueNotification = async (
  uid: string,
  delay: number,
  title: string,
  body: string,
) => {
  const sendDate = Date.now() + 3600000 * delay

  try {
    const fetchConfig = httpsCallable<
      { uid: string; sendDate: number; title: string; body: string },
      { data: any }
    >(functions, 'queueNotification')
    const res = (await fetchConfig({ uid, sendDate, title, body })).data
    return res.data
  } catch (error) {
    console.log(error)
  }
}
