import { animateVal } from '@/util/helpers'
import React, { useEffect } from 'react'
import { Animated, Pressable } from 'react-native'
import { containerFade, styles } from './Modal.styles'

type Props = {
  opacityRef: Animated.Value
  show: boolean
  onClose: () => void
  disabled: boolean
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ opacityRef, show, onClose, disabled, children }) => {
  useEffect(() => {
    if (show) animateVal(opacityRef, 1, 500)
  }, [show])

  const handleClose = () => {
    animateVal(opacityRef, 0, 500)
    setTimeout(() => onClose(), 500)
  }

  return (
    <Animated.View style={{ ...styles.overlay, opacity: opacityRef }}>
      <Pressable onPress={handleClose} style={styles.container} disabled={disabled} />
      <Animated.View
        style={{ ...styles.modal, transform: [{ translateY: containerFade(opacityRef) }] }}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}

export default Modal
