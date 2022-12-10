import { colors, deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: deviceWidth * 0.6,
    maxWidth: deviceWidth * 0.8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.neutral100,
    marginVertical: 8,
    position: 'relative',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 4,
  },
  text: {
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'AbaddonBold',
    fontSize: 20,
    color: colors.neutral900,
    marginHorizontal: 4,
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
