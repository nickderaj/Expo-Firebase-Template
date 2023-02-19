import { animateVal } from '@/util/helpers'
import { genericStyles } from '@/util/styles'
import LottieView from 'lottie-react-native'
import React, { useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'
import { styles } from './Loading.styles'

type Props = {
  isLoading: boolean
}

const Loading: React.FC<Props> = ({ isLoading }) => {
  const animation = useRef<LottieView>(null)
  const finishRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!isLoading) animateVal(finishRef, 1, 500)
  }, [isLoading])

  return (
    <View style={[genericStyles.fullCenter, styles.bgColor]}>
      <Animated.View
        style={[
          genericStyles.fullCenter,
          {
            opacity: styles.opacityAnim(finishRef),
            transform: [{ scale: styles.scaleAnim(finishRef) }],
          },
        ]}
      >
        <LottieView
          source={require('@/images/animations/cat_loader.json')}
          autoPlay
          loop
          ref={animation}
          style={styles.animation}
        />
        <Text style={styles.text}>Loading...</Text>
      </Animated.View>
    </View>
  )
}

export default Loading
