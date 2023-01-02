import { colors } from '@/util/styles'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { styles } from './Title.styles'

type Props = { children: React.ReactNode; variant?: string; style?: StyleProp<TextStyle> }
const Title: React.FC<Props> = ({ children, variant, style }) => {
  const color = () => {
    switch (variant) {
      case 'neutral100':
        return colors.neutral100
      case 'primary100':
        return colors.primary100
      case 'primary500':
        return colors.primary500
      case 'primary900':
        return colors.primary900
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
