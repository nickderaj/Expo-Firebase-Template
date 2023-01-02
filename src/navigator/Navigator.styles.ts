import { colors } from '@/util/styles'
import { StackCardStyleInterpolator } from '@react-navigation/stack'

const pageFade: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
    transform: [
      {
        scale: current.progress.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.95, 0.95, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  },
})
const cardStyle = { backgroundColor: colors.neutra100 }

export const navigatorScreenOptions = {
  headerShown: false,
  cardStyle,
  cardStyleInterpolator: pageFade,
}
