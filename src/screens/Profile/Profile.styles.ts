import { colors, deviceWidth } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  menuWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: deviceWidth * 0.225,
  },
})
