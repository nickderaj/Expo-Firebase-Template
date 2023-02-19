import Button from '@/components/Button'
import SettingsModal from '@/components/Modal/SettingsModal'
import { logEvent } from '@/util/helpers'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Animated, Image } from 'react-native'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) logEvent('view_home')
  }, [isFocused])

  return (
    <Animated.View style={styles.container}>
      <Button onPress={() => navigation.navigate('Profile')} style={styles.catWrapper}>
        <Image source={require('@/images/characters/cat.gif')} style={styles.cat} />
      </Button>
      <SettingsModal show={showModal} setShow={setShowModal} />
    </Animated.View>
  )
}

export default HomeScreen
