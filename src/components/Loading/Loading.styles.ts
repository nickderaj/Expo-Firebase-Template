import { colors } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = {
  ...StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.neutral900,
      fontFamily: 'Bold',
      fontSize: 18,
    },
  }),
  bgColor: [StyleSheet.absoluteFill, { backgroundColor: colors.neutral50 }],
}
