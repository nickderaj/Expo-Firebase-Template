import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Title from '@/components/Title'
import { LoginEnum } from '@/models/Auth'
import { animateVal } from '@/util/helpers'
import { colors } from '@/util/styles'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Text, View } from 'react-native'
import { loadingFadeIn, loadingFadeOut, styles } from './GuestModal.styles'

type Props = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  guestLogin: () => void
  isLoading?: LoginEnum
}

const GuestModal: React.FC<Props> = ({ show, setShow, guestLogin, isLoading }) => {
  const opacityRef = useRef(new Animated.Value(0)).current
  const loadingRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isLoading) animateVal(loadingRef, 1, 500)
    if (!isLoading) animateVal(loadingRef, 0, 500)
  }, [isLoading])

  const handleCancel = () => {
    animateVal(opacityRef, 0, 500)
    setTimeout(() => setShow(false), 500)
  }

  return (
    <Modal
      opacityRef={opacityRef}
      show={show}
      onClose={() => setShow(false)}
      disabled={isLoading !== undefined}>
      <Animated.View style={{ ...styles.activityIndicator, opacity: loadingFadeIn(loadingRef) }}>
        <ActivityIndicator color={colors.neutral900} />
      </Animated.View>
      <Animated.View style={{ opacity: loadingFadeOut(loadingRef) }}>
        <Title>Continue as Guest?</Title>

        <Text style={styles.text}>
          All your progress will be <Text style={{ color: colors.primary900 }}>permanently</Text>{' '}
          lost.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            style={{
              ...styles.button,
              borderColor: colors.primary100,
              backgroundColor: colors.primary100,
            }}
            onPress={handleCancel}
            disabled={isLoading !== undefined}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Button>
          <Button onPress={guestLogin} style={styles.button} disabled={isLoading !== undefined}>
            <Text style={{ ...styles.buttonText }}>Continue</Text>
          </Button>
        </View>
      </Animated.View>
    </Modal>
  )
}

export default GuestModal
