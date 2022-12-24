import { colors, deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  image: {
    marginVertical: 12,
    marginHorizontal: 8,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Regular',
    fontSize: deviceWidth * 0.045,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: colors.neutral900,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const loadingFade = (value: Animated.Value) =>
  value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

export const textFade = (value: Animated.Value) =>
  value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.2],
  })
