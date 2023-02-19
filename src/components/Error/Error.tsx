import { genericStyles } from '@/util/styles'
import LottieView from 'lottie-react-native'
import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import Button from '../Button'
import { styles } from './Error.styles'

type Props = {
  clearError: () => void
}

const Error: React.FC<Props> = ({ clearError }) => {
  const animation = useRef<LottieView>(null)

  const handlePress = () => {
    clearError()
  }

  return (
    <View style={genericStyles.fullCenter}>
      <LottieView
        source={require('@/images/animations/cat_error.json')}
        autoPlay={true}
        loop={false}
        ref={animation}
        style={styles.animation}
      />
      <Text style={styles.text}>Something went wrong! {':('}</Text>
      <Button name="restart" onPress={handlePress} style={styles.button}>
        <Text style={styles.text}>Restart App</Text>
      </Button>
    </View>
  )
}

export default Error
