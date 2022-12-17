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
    primary: colors.neutral100,
    text: colors.neutral100,
    border: colors.neutral700,
    card: colors.neutral900,
    background: colors.neutral900,
  },
}

export default function App() {
  const [fontsLoaded] = useFonts({ M5X7: require('./assets/fonts/Habbo.ttf') })

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
