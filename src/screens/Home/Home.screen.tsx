import Title from '@/components/Title'
import { logOut } from '@/util/auth'
import { animateVal, loadAssetsAsync } from '@/util/helpers'
import { useEffect, useRef } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const opacity = useRef(new Animated.Value(0)).current
  const dispatch = useDispatch()

  useEffect(() => {
    animateVal(opacity, 1, 1000)
  }, [])

  const handleLogout = async () => {
    animateVal(opacity, 0, 500)
    await loadAssetsAsync({ images: [require('@/images/app/splash.png')] })

    setTimeout(() => logOut(dispatch), 500)
  }

  return (
    <Animated.View style={{ ...styles.container, opacity }}>
      <Title>Home Screen</Title>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </Animated.View>
  )
}

export default HomeScreen
