import Title from '@/components/Title'
import { View } from 'react-native'
import { styles } from './Auth.styles'
import { AuthScreenProps } from './Auth.types'

const AuthScreen: AuthScreenProps = () => {
  return (
    <View style={styles.container}>
      <Title>Auth Screen</Title>
    </View>
  )
}

export default AuthScreen
