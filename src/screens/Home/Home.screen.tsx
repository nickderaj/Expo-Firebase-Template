import { animateVal } from '@/util/helpers'
import { useEffect, useRef } from 'react'
import { Animated, Image, ImageBackground, Pressable } from 'react-native'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    animateVal(opacity, 1, 1000)
  }, [])

  return (
    <Animated.View style={{ ...styles.container, opacity }}>
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('@/images/app/splash.png')}>
        <Pressable onPress={() => navigation.navigate('Profile')} style={styles.catWrapper}>
          <Image source={require('@/images/characters/cat.gif')} style={styles.cat} />
        </Pressable>
      </ImageBackground>
    </Animated.View>
  )
}

export default HomeScreen
