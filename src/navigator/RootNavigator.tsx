import { RootState } from '@/redux/store'
import AuthScreen from '@/screens/Auth'
import HomeScreen from '@/screens/Home'
import ProfileScreen from '@/screens/Profile'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { navigatorScreenOptions } from './Navigator.styles'
import { RootNavigatorProps, RootStackParamList } from './Navigator.types'

const RootNavigator: React.FC<RootNavigatorProps> = () => {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>()
  const { userObj } = useSelector((state: RootState) => state.user)

  return userObj?.id ? (
    <Navigator screenOptions={navigatorScreenOptions}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  ) : (
    <AuthScreen />
  )
}

export default RootNavigator
