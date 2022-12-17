import { colors } from '@/util/styles'
import { StackCardStyleInterpolator } from '@react-navigation/stack'

export const pageFade: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: { opacity: current.progress },
})

export const cardStyle = { backgroundColor: colors.neutral900 }
