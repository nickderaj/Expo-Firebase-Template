import AppLayout from '@/components/AppLayout'
import Loading from '@/components/Loading'
import RootNavigator from '@/navigator/RootNavigator'
import { persistor, store } from '@/redux/store'
import { colors } from '@/util/styles'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

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
      <PersistGate persistor={persistor} loading={<Loading />}>
        <AppLayout>
          <NavigationContainer theme={theme}>
            <RootNavigator />
          </NavigationContainer>
        </AppLayout>
      </PersistGate>
    </Provider>
  )
}
