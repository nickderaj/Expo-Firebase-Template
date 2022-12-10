import { Asset } from 'expo-asset'
import { isDevice } from 'expo-device'
import { loadAsync } from 'expo-font'
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications'
import { Animated, Platform } from 'react-native'
import { updateExpoToken } from 'src/api/notification.api'

export const loadAssetsAsync = async ({
  images = [],
  fonts = [],
  videos = [],
}: {
  images?: string[]
  fonts?: string[]
  videos?: string[]
}) => {
  const cacheImages = () => images.map(image => Asset.fromModule(image).downloadAsync())
  const cacheVideos = () => videos.map(video => Asset.fromModule(video).downloadAsync())
  const cacheFonts = () => fonts.map(font => loadAsync(font))

  return await Promise.all([...cacheImages(), ...cacheFonts(), ...cacheVideos()])
}

export const animateVal = (
  val: Animated.Value,
  toValue: number,
  duration: number = 500,
  useNativeDriver: boolean = true,
) => Animated.timing(val, { toValue, duration, useNativeDriver }).start()

export const logEvent = async (name: string, data: object = {}) => {
  const dataToTrack = Object.assign({ device: Platform.OS, app: 'Komo Valley' }, data)
  if (__DEV__) return console.log('logEvent:', name, dataToTrack)
}

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
