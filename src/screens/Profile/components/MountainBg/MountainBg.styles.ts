import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
  },
  imageLayer: {
    position: 'absolute',
    width: '100%',
  },
  cloudLayer: {
    position: 'absolute',
    height: '130%',
    width: '130%',
    bottom: 0,
  },
})

export const cloudMove = (val: Animated.Value) =>
  val.interpolate({
    inputRange: [0, 10],
    outputRange: ['-30%', `0%`],
  })
