import { clickSFX } from '@/util/audio'
import { clickHaptic, logEvent } from '@/util/helpers'
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native'

interface Props extends PressableProps {
  name?: string
}

const Button: React.FC<Props> = props => {
  const { onPress, children, name } = props

  const handlePress = (event: GestureResponderEvent) => {
    clickHaptic()
    clickSFX()
    if (name) logEvent(`${name}_button_tapped`)
    if (onPress) onPress(event)
  }

  return (
    <Pressable {...props} onPress={handlePress}>
      {children}
    </Pressable>
  )
}

export default Button
