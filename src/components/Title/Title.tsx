import { colors } from '@/util/styles'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { styles } from './Title.styles'

type Props = { children: React.ReactNode; variant?: string; style?: StyleProp<TextStyle> }
const Title: React.FC<Props> = ({ children, variant, style }) => {
  const color = () => {
    switch (variant) {
      case 'light':
        return colors.neutral100
      case 'orange':
        return colors.orange100
      default:
        return colors.neutral800
    }
  }

  return (
    <Text
      style={StyleSheet.flatten([
        {
          ...styles.title,
          color: color(),
        },
        style && style,
      ])}>
      {children}
    </Text>
  )
}

export default Title
