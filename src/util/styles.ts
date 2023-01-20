import { Dimensions } from 'react-native'

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
  primary50: '#ffe4e5',
  primary100: '#f59b9e',
  primary500: '#981d26',
  primary900: '#500E10',
  facebook: '#1977f2',
}
