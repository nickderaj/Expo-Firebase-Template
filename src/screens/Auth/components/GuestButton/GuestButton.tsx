import React from 'react'
import { Animated, Pressable, PressableProps } from 'react-native'
import { styles } from './GuestButton.styles'

type Props = PressableProps

const GuestButton: React.FC<Props> = ({ onPress, disabled }) => {
  return (
    <Pressable style={styles.container} onPress={onPress} disabled={disabled}>
      <Animated.Text style={styles.text}>Skip</Animated.Text>
    </Pressable>
  )
}

export default GuestButton
