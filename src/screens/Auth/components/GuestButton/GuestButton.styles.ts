import { colors, deviceWidth } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    position: 'absolute',
    bottom: 24,
  },
  text: {
    textAlign: 'center',
    marginTop: 2,
    paddingVertical: 8,
    fontFamily: 'Regular',
    fontSize: deviceWidth * 0.045,
    marginHorizontal: 4,
    color: colors.neutral100,
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
