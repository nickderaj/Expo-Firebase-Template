import Title from '@/components/Title'
import { LoginEnum } from '@/models/Auth'
import { animateVal } from '@/util/helpers'
import { colors } from '@/util/styles'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Pressable, Text, View } from 'react-native'
import { containerFade, loadingFadeIn, loadingFadeOut, styles } from './GuestModal.styles'

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
    if (show) animateVal(opacityRef, 1, 500)
  }, [show])

  useEffect(() => {
    if (isLoading) animateVal(loadingRef, 1, 500)
    if (!isLoading) animateVal(loadingRef, 0, 500)
  }, [isLoading])

  const handleCancel = () => {
    animateVal(opacityRef, 0, 500)
    setTimeout(() => setShow(false), 500)
  }

  return (
    <Pressable onPress={handleCancel} style={styles.container} disabled={isLoading !== undefined}>
      <Animated.View style={{ ...styles.overlay, opacity: opacityRef }}>
        <Animated.View
          style={{ ...styles.modal, transform: [{ translateY: containerFade(opacityRef) }] }}>
          <Animated.View
            style={{ ...styles.activityIndicator, opacity: loadingFadeIn(loadingRef) }}>
            <ActivityIndicator color={colors.neutral900} />
          </Animated.View>
          <Animated.View style={{ opacity: loadingFadeOut(loadingRef) }}>
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
                onPress={async () => await guestLogin()}
                style={styles.button}
                disabled={isLoading !== undefined}>
                <Text style={{ ...styles.buttonText }}>Continue</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

export default GuestModal
