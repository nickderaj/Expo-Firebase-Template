import { colors, deviceWidth } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    width: 0.3 * deviceWidth,
    height: 0.3 * deviceWidth,
    position: 'absolute',
    bottom: -(0.15 * deviceWidth),
    backgroundColor: colors.neutral100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.neutral200,
  },
  image: {
    width: 0.22 * deviceWidth,
    height: 0.22 * deviceWidth,
  },
})
