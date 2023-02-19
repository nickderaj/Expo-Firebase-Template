import { genericStyles } from '@/util/styles'
import { reloadAsync } from 'expo-updates'
import LottieView from 'lottie-react-native'
import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import Button from '../Button'
import { styles } from './Error.styles'

const Error = () => {
  const animation = useRef<LottieView>(null)

  const handlePress = async () => {
    try {
      reloadAsync()
    } catch (error) {
      console.error('restart app error: ', error)
    }
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
      <Button name="restart" onPress={handlePress}>
        <Text>Something went wrong!</Text>
        <Text>Restart</Text>
      </Button>
    </View>
  )
}

export default Error
