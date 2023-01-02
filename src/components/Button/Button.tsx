import { clickSFX } from '@/util/audio'
import { clickHaptic } from '@/util/helpers'
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native'

interface Props extends PressableProps {}

const Button: React.FC<Props> = props => {
  const { onPress, children } = props

  const handlePress = (event: GestureResponderEvent) => {
    clickHaptic()
    clickSFX()
    if (onPress) onPress(event)
  }
  return (
    <Pressable {...props} onPress={handlePress}>
      {children}
    </Pressable>
  )
}

export default Button
