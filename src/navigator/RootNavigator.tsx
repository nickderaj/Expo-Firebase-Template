import { RootState } from '@/redux/store'
import AuthScreen from '@/screens/Auth'
import HomeScreen from '@/screens/Home'
import ProfileScreen from '@/screens/Profile'
import { logEvent } from '@/util/helpers'
import { createStackNavigator } from '@react-navigation/stack'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { navigatorScreenOptions } from './Navigator.styles'
import { RootNavigatorProps, RootStackParamList } from './Navigator.types'

const RootNavigator: React.FC<RootNavigatorProps> = () => {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>()
  const { userObj } = useSelector((state: RootState) => state.user)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [currScreen, setCurrScreen] = useState<string>('')

  return userObj?.id ? (
    <Navigator
      screenOptions={navigatorScreenOptions}
      initialRouteName="Home"
      screenListeners={{
        state: (e: any) => {
          if (currScreen)
            logEvent('screen_change', {
              from: currScreen,
              to: e.data?.state?.routes?.slice(-1)[0]?.name,
              duration: Math.ceil((Date.now() - startTime) / 1000) + 's',
            })
          setStartTime(Date.now())
          setCurrScreen(e.data?.state?.routes?.slice(-1)[0]?.name)
        },
      }}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  ) : (
    <AuthScreen />
  )
}

export default RootNavigator
