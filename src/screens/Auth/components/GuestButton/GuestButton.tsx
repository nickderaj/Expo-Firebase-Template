import Button from '@/components/Button'
import React from 'react'
import { Animated, PressableProps } from 'react-native'
import { styles } from './GuestButton.styles'

type Props = PressableProps

const GuestButton: React.FC<Props> = ({ onPress, disabled }) => {
  return (
    <Button style={styles.container} onPress={onPress} disabled={disabled}>
      <Animated.Text style={styles.text}>Skip</Animated.Text>
    </Button>
  )
}

export default GuestButton
