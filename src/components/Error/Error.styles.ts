import { colors, deviceWidth } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  animation: {
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.8,
    maxWidth: 400,
    maxHeight: 400,
  },
  text: {
    fontFamily: 'Bold',
    fontSize: deviceWidth * 0.05,
  },
  button: {
    marginTop: 16,
    backgroundColor: colors.primary50,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderColor: colors.primary500,
    borderWidth: 2,
    borderRadius: 8,
  },
})
