import { colors } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = {
  ...StyleSheet.create({
    flex: {
      flex: 1,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 150,
    },
  }),
  bgColor: [StyleSheet.absoluteFill, { backgroundColor: colors.primary100 }],
  maskColor: [StyleSheet.absoluteFill, { backgroundColor: colors.neutral50 }],
}

export const imageScale = (val: Animated.Value) => {
  return {
    transform: [
      {
        scale: val.interpolate({
          inputRange: [0, 0.1, 1],
          outputRange: [1, 0.8, 70],
        }),
      },
    ],
  }
}

export const appFade = (val: Animated.Value) => {
  return {
    opacity: val.interpolate({
      inputRange: [0, 0.15, 0.3],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: val.interpolate({
          inputRange: [0, 1],
          outputRange: [1.2, 1],
        }),
      },
    ],
  }
}
