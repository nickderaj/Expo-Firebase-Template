import { Animated } from 'react-native'

export const animateVal = (
  val: Animated.Value,
  toValue: number,
  duration: number = 500,
  useNativeDriver: boolean = true,
) => Animated.timing(val, { toValue, duration, useNativeDriver }).start()
