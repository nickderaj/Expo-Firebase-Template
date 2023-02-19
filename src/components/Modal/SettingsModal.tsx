import React, { useRef } from 'react'
import { Animated, Text } from 'react-native'
import Modal from './Modal'

type Props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsModal: React.FC<Props> = ({ show, setShow }) => {
  const opacityRef = useRef(new Animated.Value(0)).current

  const handleClose = () => {
    setShow(false)
  }

  if (!show) return null
  return (
    <Modal opacityRef={opacityRef} show={show} onClose={handleClose} disabled={false}>
      <Text>Hi</Text>
    </Modal>
  )
}

export default SettingsModal
