import { colors } from '@/util/styles'
import { StackCardStyleInterpolator } from '@react-navigation/stack'

const pageFade: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: { opacity: current.progress },
})
const cardStyle = { backgroundColor: colors.neutral900 }

export const navigatorScreenOptions = {
  headerShown: false,
  cardStyle,
  cardStyleInterpolator: pageFade,
}
