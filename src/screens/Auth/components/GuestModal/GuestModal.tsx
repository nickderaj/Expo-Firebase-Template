import Title from '@/components/Title'
import { LoginEnum } from '@/models/Auth'
import { animateVal } from '@/util/helpers'
import { colors } from '@/util/styles'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { containerFade, styles } from './GuestModal.styles'

type Props = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  guestLogin: () => void
  isLoading?: LoginEnum
  setIsLoading: Dispatch<SetStateAction<LoginEnum | undefined>>
}

const GuestModal: React.FC<Props> = ({ show, setShow, guestLogin, isLoading, setIsLoading }) => {
  const animRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (show) animateVal(animRef, 1, 500)
  }, [show])

  const handleCancel = () => {
    animateVal(animRef, 0, 500)
    setTimeout(() => setShow(false), 500)
  }

  return (
    <Pressable onPress={handleCancel} style={styles.container} disabled={isLoading !== undefined}>
      <Animated.View style={{ ...styles.overlay, opacity: animRef }}>
        <Animated.View
          style={{ ...styles.modal, transform: [{ translateY: containerFade(animRef) }] }}>
          <Title>Continue as Guest?</Title>

          <Text style={styles.text}>
            All your progress will be <Text style={{ color: colors.orange900 }}>permanently</Text>{' '}
            lost.
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={{
                ...styles.button,
                borderColor: colors.orange100,
                backgroundColor: colors.orange100,
              }}
              onPress={handleCancel}
              disabled={isLoading !== undefined}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={guestLogin}
              style={styles.button}
              disabled={isLoading !== undefined}>
              <Text style={{ ...styles.buttonText }}>Continue</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

export default GuestModal
