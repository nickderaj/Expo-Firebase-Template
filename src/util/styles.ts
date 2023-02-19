import { DefaultTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'

export const deviceHeight = Dimensions.get('window').height
export const deviceWidth = Dimensions.get('window').width
export const colors: { [idx: string]: string } = {
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  primary50: '#ecfafe',
  primary100: '#c7eff9',
  primary500: '#7bbad4',
  primary900: '#19414e',
  facebook: '#1977f2',
}

export const appTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.neutral900,
    text: colors.neutral900,
    border: colors.neutral300,
    card: colors.neutral100,
    background: colors.neutral100,
  },
}

export const genericStyles = StyleSheet.create({
  fullCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
  },
})
