import { colors, deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = {
  ...StyleSheet.create({
    text: {
      color: colors.neutral900,
      fontFamily: 'Bold',
      fontSize: 18,
    },
    animation: {
      width: deviceWidth * 0.8,
      height: deviceWidth * 0.8,
      maxWidth: 400,
      maxHeight: 400,
    },
  }),
  bgColor: [StyleSheet.absoluteFill, { backgroundColor: colors.neutral50 }],
  opacityAnim: (animRef: Animated.Value) =>
    animRef.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
  scaleAnim: (animRef: Animated.Value) =>
    animRef.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }),
}
