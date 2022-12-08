import { Animated, Platform } from 'react-native'

export const animateVal = (
  val: Animated.Value,
  toValue: number,
  duration: number = 500,
  useNativeDriver: boolean = true,
) => Animated.timing(val, { toValue, duration, useNativeDriver }).start()

export const logEvent = async (name: string, data: object = {}) => {
  const dataToTrack = Object.assign({ device: Platform.OS, app: 'Komo Valley' }, data)
  if (__DEV__) return console.log('Development Log: ', name, dataToTrack)
}
