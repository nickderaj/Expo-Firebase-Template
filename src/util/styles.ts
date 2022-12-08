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
  orange100: '#f9b07f',
  orange900: '#df7126',
}
