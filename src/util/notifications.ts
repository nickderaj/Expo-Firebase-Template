import { isDevice } from 'expo-device'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications'
import { Platform } from 'react-native'
import { updateExpoToken } from 'src/api/notification.api'

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

export const receivedNotificationListener = addNotificationReceivedListener(notification => {
  console.log('notification', notification)
})

export const notificationClickListener = addNotificationResponseReceivedListener(response => {
  console.log('clicked notification', response)
})
