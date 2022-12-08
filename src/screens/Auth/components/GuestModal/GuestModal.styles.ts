import { colors, deviceWidth } from '@/util/styles'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.neutral100,
    padding: 24,
    borderRadius: 8,
    maxWidth: deviceWidth * 0.8,
  },
  text: {
    fontFamily: 'Radiance',
    fontSize: 16,
    color: colors.neutral800,
    marginVertical: 12,
  },
  buttonContainer: {
    display: 'flex',
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
    fontFamily: 'Radiance',
    fontSize: 16,
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

export const containerFade = (value: Animated.Value) =>
  value.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
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
