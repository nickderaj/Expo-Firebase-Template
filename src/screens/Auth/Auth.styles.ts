import { colors } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    shadowColor: colors.neutral900,
    shadowOpacity: 1,
    shadowOffset: { width: -5, height: 5 },
    shadowRadius: 5,
  },
})

export const backgroundFade = (val: Animated.Value) =>
  val.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0, 0,0,0.5)'],
  })

export const imageFade = (val: Animated.Value) =>
  val.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  })

export const menuFade = (val: Animated.Value) =>
  val.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  })
