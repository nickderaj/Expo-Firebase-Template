import { RootState } from '@/redux/store'
import AuthScreen from '@/screens/Auth'
import HomeScreen from '@/screens/Home'
import ProfileScreen from '@/screens/Profile'
import { authListener } from '@/util/auth'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootNavigatorProps, RootStackParamList } from './Navigator.types'

const RootNavigator: React.FC<RootNavigatorProps> = () => {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>()
  const { userObj } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = authListener(dispatch)
    return unsubscribe
  }, [])

  return userObj?.id ? (
    <Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        cardStyle: { backgroundColor: '#171717' },
        headerShown: false,
      }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  ) : (
    <AuthScreen />
  )
}

export default RootNavigator
