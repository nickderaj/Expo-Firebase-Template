import React from 'react'
import { Animated, Pressable, PressableProps } from 'react-native'
import { styles } from './GuestButton.styles'

type GuestButtonProps = PressableProps

const GuestButton: React.FC<GuestButtonProps> = ({ onPress, disabled }) => {
  return (
    <Pressable style={styles.container} onPress={onPress} disabled={disabled}>
      <Animated.Text style={styles.text}>Skip</Animated.Text>
    </Pressable>
  )
}

export default GuestButton
