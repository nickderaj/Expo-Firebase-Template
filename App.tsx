import AppLayout from '@/components/AppLayout'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import RootNavigator from '@/navigator/RootNavigator'
import { persistor, store } from '@/redux/store'
import { appTheme } from '@/util/styles'
import Bugsnag from '@bugsnag/expo'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

if (!__DEV__) Bugsnag.start()

export default function App() {
  const [fontsLoaded] = useFonts({
    Thin: require('./assets/fonts/RobotoMono-Thin.ttf'),
    Regular: require('./assets/fonts/RobotoMono-Regular.ttf'),
    Bold: require('./assets/fonts/RobotoMono-Bold.ttf'),
  })

  if (!fontsLoaded) return null

  const app = (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <AppLayout>
          <NavigationContainer theme={appTheme}>
            <RootNavigator />
          </NavigationContainer>
        </AppLayout>
      </PersistGate>
    </Provider>
  )

  if (__DEV__) return app

  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)
  return <ErrorBoundary FallbackComponent={Error}>{app}</ErrorBoundary>
}
