import { colors } from '@/util/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    marginVertical: 8,
    position: 'absolute',
    bottom: 24,
  },
  text: {
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Radiance',
    fontSize: 16,
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
