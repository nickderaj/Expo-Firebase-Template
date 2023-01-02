import AppLayout from '@/components/AppLayout'
import RootNavigator from '@/navigator/RootNavigator'
import { store } from '@/redux/store'
import { colors } from '@/util/styles'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { preventAutoHideAsync } from 'expo-splash-screen'
import { Provider } from 'react-redux'

preventAutoHideAsync() // show splash screen
const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.neutral900,
    text: colors.neutral900,
    border: colors.neutral300,
    card: colors.neutral100,
    background: colors.neutral100,
  },
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Thin: require('./assets/fonts/RobotoMono-Thin.ttf'),
    Regular: require('./assets/fonts/RobotoMono-Regular.ttf'),
    Bold: require('./assets/fonts/RobotoMono-Bold.ttf'),
  })

  if (!fontsLoaded) return null
  return (
    <Provider store={store}>
      <AppLayout>
        <NavigationContainer theme={theme}>
          <RootNavigator />
        </NavigationContainer>
      </AppLayout>
    </Provider>
  )
}
