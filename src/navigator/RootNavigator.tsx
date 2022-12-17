import { RootState } from '@/redux/store'
import AuthScreen from '@/screens/Auth'
import HomeScreen from '@/screens/Home'
import ProfileScreen from '@/screens/Profile'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { pageFade, cardStyle } from './Navigator.styles'
import { RootNavigatorProps, RootStackParamList } from './Navigator.types'

const RootNavigator: React.FC<RootNavigatorProps> = () => {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>()
  const { userObj } = useSelector((state: RootState) => state.user)

  return userObj?.id ? (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle,
        cardStyleInterpolator: pageFade,
      }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  ) : (
    <AuthScreen />
  )
}

export default RootNavigator
