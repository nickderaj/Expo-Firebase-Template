import Title from '@/components/Title'
import { logOut } from '@/util/auth'
import { Pressable, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Title>Home Screen</Title>
      <Pressable onPress={() => logOut(dispatch)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen
