import { isDevice } from 'expo-device'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  Notification,
  NotificationResponse,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications'
import { Platform } from 'react-native'
import { clickNotification, updateExpoToken } from 'src/api/notification.api'
import { logEvent } from './helpers'

export const registerForPNS = async (uid: string) => {
  try {
    let token

    if (isDevice) {
      const { status: existingStatus } = await getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') return updateExpoToken(uid)
      token = (await getExpoPushTokenAsync()).data

      if (Platform.OS === 'android') {
        await setNotificationChannelAsync('default', {
          name: 'default',
          importance: AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }
    } else {
      throw new Error('Must use physical device for Push Notifications')
    }

    return updateExpoToken(uid, token)
  } catch (error) {
    console.log(error)
  }
}

export const receivedNotificationListener = (uid: string) =>
  addNotificationReceivedListener((notification: Notification) => {
    logEvent('notification_click_received', {
      user: uid,
      notification: {
        title: notification.request.content.title,
        body: notification.request.content.body,
      },
    })
  })

export const clickNotificationListener = (uid: string) =>
  addNotificationResponseReceivedListener((response: NotificationResponse) => {
    logEvent('notification_click', {
      user: uid,
      notification: {
        title: response.notification.request.content.title,
        body: response.notification.request.content.body,
      },
    })
    clickNotification(uid, response.notification.request)
  })
