import { Asset } from 'expo-asset'
import { loadAsync } from 'expo-font'
import { Animated, Platform } from 'react-native'

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
