import { deviceHeight, deviceWidth } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  catWrapper: {
    position: 'absolute',
    left: deviceWidth * 0.1,
    bottom: deviceHeight * 0.1,
  },
  cat: {
    height: deviceWidth * 0.2,
    width: deviceWidth * 0.2,
  },
})
