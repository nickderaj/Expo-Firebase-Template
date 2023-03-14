import Constants from 'expo-constants'
import OneSignal from 'react-native-onesignal'

export const notificationInit = () => {
  if (!Constants?.manifest?.extra?.oneSignalAppId) return

  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId)
  OneSignal.promptForPushNotificationsWithUserResponse() // replace with in-app prompt layer
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    // Foreground notifications
    let notification = notificationReceivedEvent.getNotification()
    const data = notification.additionalData
    notificationReceivedEvent.complete(notification) // Complete with null means don't show a notification.
  })

  OneSignal.setNotificationOpenedHandler(notification => {
    // Opening notifications
    console.log('OneSignal: notification opened:', notification)
  })
}