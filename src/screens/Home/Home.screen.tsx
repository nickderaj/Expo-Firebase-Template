import Button from '@/components/Button'
import { logEvent } from '@/util/helpers'
import { useEffect } from 'react'
import { Animated, Image } from 'react-native'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    logEvent('view_home')
  }, [])

  return (
    <Animated.View style={styles.container}>
      <Button onPress={() => navigation.replace('Profile')} style={styles.catWrapper}>
        <Image source={require('@/images/characters/cat.gif')} style={styles.cat} />
      </Button>
    </Animated.View>
  )
}

export default HomeScreen
