import MaskedView from '@react-native-masked-view/masked-view'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Animated, Easing, StatusBar, View } from 'react-native'
import { appFade, imageScale, styles } from './Splash.styles'

type Props = {
  children: React.ReactNode
}

const Splash: React.FC<Props> = ({ children }) => {
  const animationRef = useRef(new Animated.Value(0)).current
  const [animationDone, setAnimationDone] = useState<boolean>(false)

  useLayoutEffect(() => {
    Animated.timing(animationRef, {
      toValue: 1,
      easing: Easing.back(2),
      duration: 1500,
      useNativeDriver: true,
      delay: 400,
    }).start(() => setAnimationDone(true))
  }, [])

  return (
    <Animated.View style={styles.flex}>
      <StatusBar animated={true} hidden={!animationDone} />
      {!animationDone && <View style={styles.bgColor} />}
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View style={styles.centered}>
            <Animated.Image
              source={require('@/images/app/logo.png')}
              style={[styles.image, imageScale(animationRef)]}
              resizeMode="contain"
            />
          </View>
        }
      >
        {!animationDone && <View style={styles.maskColor} />}
        <Animated.View style={[{ flex: 1 }, appFade(animationRef)]}>{children}</Animated.View>
      </MaskedView>
    </Animated.View>
  )
}

export default Splash
