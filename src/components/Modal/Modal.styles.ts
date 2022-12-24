import { colors, deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modal: {
    backgroundColor: colors.neutral100,
    padding: 24,
    borderRadius: 8,
    width: deviceWidth * 0.8,
  },
})

export const containerFade = (value: Animated.Value) =>
  value.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  })
