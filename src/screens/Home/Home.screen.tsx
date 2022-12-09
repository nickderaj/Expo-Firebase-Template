import Title from '@/components/Title'
import { logOut } from '@/util/auth'
import { animateVal, loadAssetsAsync } from '@/util/helpers'
import { useEffect, useRef } from 'react'
import { Animated, ImageBackground, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const opacity = useRef(new Animated.Value(0.4)).current
  const dispatch = useDispatch()

  useEffect(() => {
    animateVal(opacity, 1, 1000)
  }, [])

  const handleLogout = async () => {
    await loadAssetsAsync({ images: [require('@/images/app/splash.png')] })
    logOut(dispatch)
  }

  return (
    <Animated.View style={{ ...styles.container, opacity }}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        source={require('@/images/app/splash.png')}>
        <SafeAreaView>
          <Title>Home Screen</Title>
          <Pressable onPress={handleLogout}>
            <Text>Logout</Text>
          </Pressable>
        </SafeAreaView>
      </ImageBackground>
    </Animated.View>
  )
}

export default HomeScreen
