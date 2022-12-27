import { deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: deviceWidth * 0.3,
    width: deviceWidth * 0.3,
  },
})

export const backgroundFade = (val: Animated.Value) =>
  val.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0, 0,0,0.5)'], // for faded background
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
