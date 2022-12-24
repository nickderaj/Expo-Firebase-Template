import { colors, deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  text: {
    fontFamily: 'Regular',
    fontSize: deviceWidth * 0.04,
    color: colors.neutral800,
    marginVertical: 24,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.neutral200,
  },
  buttonText: {
    fontFamily: 'Regular',
    fontSize: deviceWidth * 0.045,
    color: colors.neutral800,
    textAlign: 'center',
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

export const loadingFadeIn = (value: Animated.Value) =>
  value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

export const loadingFadeOut = (value: Animated.Value) =>
  value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  })
