import Title from '@/components/Title'
import { View } from 'react-native'
import { styles } from './Home.styles'
import { HomeScreenProps } from './Home.types'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Title>Home Screen</Title>
    </View>
  )
}

export default HomeScreen
