import { projectName } from '@/constants/project.constants'
import { track } from '@amplitude/analytics-react-native'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import { loadAsync } from 'expo-font'
import * as Haptics from 'expo-haptics'
import { Animated, Image, Platform } from 'react-native'

export const loadAssetsAsync = async ({
  images = [],
  fonts = [],
  videos = [],
}: {
  images?: string[]
  fonts?: string[]
  videos?: string[]
}) => {
  const cacheImages = () =>
    images.map(image => {
      if (typeof image === 'string') return Image.prefetch(image)
      return Asset.fromModule(image).downloadAsync()
    })
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
  try {
    if (__DEV__) return console.log('logEvent:', name, Object.keys(data).length === 0 ? '' : data)
    const dataToTrack = Object.assign(
      { device: Platform.OS, app: projectName, version: Constants.manifest?.version },
      data,
    )

    // Amplitude Tracking
    track(name, dataToTrack)
  } catch (error) {
    console.log(`Error logging event: ${name}`, error)
  }
}

type clickTypes = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'
export const clickHaptic = (type?: clickTypes) => {
  switch (type) {
    case 'light':
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    case 'medium':
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    case 'heavy':
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    case 'success':
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    case 'warning':
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    case 'error':
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    default:
      return Haptics.selectionAsync()
  }
}
